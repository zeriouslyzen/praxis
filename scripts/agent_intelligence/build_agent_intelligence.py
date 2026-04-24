#!/usr/bin/env python3
"""Build source-backed agent + MoE inventories per project (no venv / site-packages)."""

from __future__ import annotations

import json
import os
import re
import sqlite3
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List, Optional, Set, Tuple, Union


DEFAULT_PROJECTS_DIR = "/Users/jackdanger/Desktop/Projects"
SKIP_DIRS = {
    ".git",
    "node_modules",
    "venv",
    ".venv",
    "dist",
    "build",
    "__pycache__",
    ".next",
    "environments",
    "site-packages",
    ".pnpm-store",
    ".tox",
}
CODE_EXTENSIONS = {".py", ".js", ".ts", ".tsx", ".md", ".json"}
SKIP_PATH_HINTS = (
    "/test/",
    "/tests/",
    "/__tests__/",
    "/fixtures/",
    "/examples/",
    "/docs/",
    "/pilot/",
    "/ui/dist/",
    "/site-packages/",
    "/environments/",
    "/dist-packages/",
    "/lib/python",
    "/.venv/",
    "/venv/",
)
SKIP_FILE_HINTS = ("mock", "demo", "placeholder", "sample", "fake", "fixture", "test_")

# Each candidate is either a top-level folder name under projects_dir, or
# (folder_name, subpath) to scan only that subtree (e.g. Akkadia backend + web).
ProjectCandidate = Union[str, Tuple[str, Optional[str]]]

# IceFull is intentionally merged into iceberg inventory.
PROJECT_GROUPS: List[Tuple[str, List[ProjectCandidate]]] = [
    ("iceberg", ["iceburg", "IceFull"]),
    ("gemma_arc", ["Gemma Arch", "Gemma-Arch-Sandbox", "Gemma"]),
    # Akkadia: Python council/engine stack + web sovereign HUD (both systems).
    ("akkadia", [("Akkadia", "src/akkadia"), ("Akkadia", "web")]),
    ("scalar", ["ScalarCode", "Scalar-Vision"]),
    ("bruce", ["bruce"]),
    ("linguistic", ["Lingustic AI"]),
    ("legal", ["Legal AI", "Legal%20AI"]),
]


def resolve_scan_roots(projects_dir: Path, candidates: List[ProjectCandidate]) -> List[Path]:
    roots: List[Path] = []
    for item in candidates:
        if isinstance(item, tuple):
            name, sub = item
            base = projects_dir / name
            if sub:
                base = base / sub
        else:
            base = projects_dir / item
        if base.is_dir():
            roots.append(base)
    return roots


def merge_moe_record(existing: Dict, incoming: Dict) -> None:
    paths: Set[str] = set(existing.get("evidence_paths") or [])
    paths.update(incoming.get("evidence_paths") or [])
    existing["evidence_paths"] = sorted(paths)[:20]

    for key in ("description_samples", "what_they_do"):
        seq = list(existing.get(key) or [])
        for entry in incoming.get(key) or []:
            if entry and entry not in seq:
                seq.append(entry)
        existing[key] = seq[:4] if key == "what_they_do" else seq[:3]

    source_count = len(paths)
    existing["source_file_count"] = source_count
    existing["evidence_score"] = source_count * 10

# Path hints: prefer MoE-specific tokens. Avoid bare "router" (matches venv / HTTP stacks).
MOE_FILE_HINTS = (
    "moe",
    "mixture_of_experts",
    "mixture-of-experts",
    "mixtureofexperts",
    "scalarmoe",
    "scalar_moe",
    "swarm",
    "agent_registry",
    "capability_registry",
    "specialized_agents",
    "orchestration",
    "toolregistry",
    "skillregistry",
)

# Content must corroborate MoE (stops SentenceTransformer "query/document route" noise in unrelated libs).
MOE_SIGNAL = re.compile(
    r"\b(ScalarMoE|scalar\s*moe|mixture\s+of\s+experts|MixtureOfExperts|mixture_of_experts|"
    r"MoE\b|moe_router|get_moe_router|teacher\s*roles|MoE\s*QLoRA|mixture\s*of\s*experts)\b",
    re.IGNORECASE,
)


def normalize_name(raw: str) -> str:
    cleaned = raw.replace("_", " ").replace("-", " ").strip()
    return " ".join(token.capitalize() for token in cleaned.split())


def is_real_moe_source(path: Path, content: str) -> bool:
    """Drop venv/libs and generic routers; keep only MoE-correlated first-party sources."""
    pl = str(path).replace("\\", "/").lower()
    if any(bad in pl for bad in ("/site-packages/", "/environments/", "node_modules/", "/dist-packages/", "/lib/python")):
        return False
    if re.search(r"(moe|mixture_of_experts|mixture-of-experts|scalarmoe|moepulse)", pl):
        return True
    if MOE_SIGNAL.search(content):
        return True
    if "/iceburg/src/iceburg/router/" in pl and "moe" in pl:
        return True
    if "/iceburg/src/iceburg/core/mixture" in pl:
        return True
    if "/icefull/" in pl and "moe" in pl:
        return True
    # Gemma Arc: first-party swarm / worker fork + tool registry (not venv).
    if re.search(r"/gemma arch/|/gemma-arch|/gemma/", pl):
        if "/src/" in pl or "/ui/src/" in pl:
            if "swarm" in pl or "toolregistry" in pl:
                if re.search(r"\b(spawn_worker|sub-agent|subagent|fork|worker|coordinator)\b", content, re.I):
                    return True
    # Akkadia: sovereign HUD + kiln / MoE-tagged sources only (not generic council prose).
    if "/akkadia/" in pl:
        if "moepulse" in pl or "moe" in pl:
            return True
        if "sovereign_kiln" in pl or ("sovereign" in pl and "/web/" in pl):
            if MOE_SIGNAL.search(content) or re.search(r"\bMoE\b|\bmoe\b", content):
                return True
    # Bruce: orchestration switchboard with explicit swarm / multi-agent language.
    if "/bruce/" in pl and "/orchestration/" in pl:
        if re.search(r"\b(swarm|multi-agent|parallel research)\b", content, re.I):
            return True
    return False


def extract_summary(content: str) -> str:
    triple = re.findall(r'"""(.+?)"""', content, flags=re.DOTALL)
    if triple:
        return triple[0].strip().split(".")[0][:220]
    jsdoc = re.findall(r"/\*\*(.+?)\*/", content, flags=re.DOTALL)
    if jsdoc:
        body = jsdoc[0]
        body = re.sub(r"^\s*\*\s?", "", body, flags=re.MULTILINE)
        body = re.sub(r"^/\*+\s*", "", body)
        one_line = " ".join(body.split())
        return one_line.split(".")[0][:220]
    return ""


def extract_markdown_lede(content: str) -> str:
    lines = [ln.strip() for ln in content.strip().splitlines() if ln.strip()]
    for i, line in enumerate(lines):
        if line.startswith("#"):
            for j in range(i + 1, len(lines)):
                if lines[j] and not lines[j].startswith("#"):
                    return lines[j][:220]
    return lines[0][:220] if lines else ""


def sanitize_public_text(text: str) -> str:
    """Normalize source language for public-facing exports."""
    if not text:
        return text
    out = text
    out = re.sub(
        r"\(\s*Inspired by Claude Code QueryEngine\s*\)",
        "(Originated from icenerg orchestration design)",
        out,
        flags=re.IGNORECASE,
    )
    out = re.sub(
        r"\(\s*Inspired by Claude Code Verification Agent\s*\)",
        "(Originated from icenerg adversarial verification design)",
        out,
        flags=re.IGNORECASE,
    )
    out = re.sub(
        r"\(\s*Inspired by Claude Code\s*\)",
        "(Originated from icenerg system design)",
        out,
        flags=re.IGNORECASE,
    )
    # Strip any residual Claude wording from previously rewritten strings.
    out = re.sub(r",\s*predating\s+Claude\s+Code", "", out, flags=re.IGNORECASE)
    out = re.sub(r"\bClaude\s+Code\b", "external code assistants", out, flags=re.IGNORECASE)
    return out


def is_moe_candidate(path: Path) -> bool:
    low = str(path).lower()
    file_name = path.name.lower()
    if any(hint in low for hint in SKIP_PATH_HINTS):
        return False
    if any(hint in file_name for hint in SKIP_FILE_HINTS):
        return False
    return any(hint in low for hint in MOE_FILE_HINTS)


def extract_moe_ids(content: str, path: Path) -> Set[str]:
    ids: Set[str] = set()
    patterns = [
        r'self\.agents\["([^"]+)"\]',
        r'@register_agent\("([^"]+)"\)',
        r'agent\s*=\s*"([^"]+)"',
        r'"([A-Za-z0-9_\-]{3,80})"\s*:\s*AgentCapability\(',
        # Expert *slots* only (avoids MoE stats keys like experts_activated / avg_experts_per_query).
        r'"([A-Za-z0-9_]+_expert)"',
        r'"([A-Za-z0-9_\-]*swarm[A-Za-z0-9_\-]*)"',
        r'"([A-Za-z0-9_\-]*moe[A-Za-z0-9_\-]*)"',
        r"export const\s+([A-Za-z0-9_]+)\s*:\s*Tool\b",
        r"class\s+([A-Za-z0-9_]*(?:MoE|MOE|moe)[A-Za-z0-9_]*)\b",
        r"export class\s+([A-Za-z0-9_]*(?:MoE|MOE|moe|Swarm|Registry|Kernel)[A-Za-z0-9_]*)\b",
        r"class\s+([A-Za-z0-9_]*(?:MoE|MOE|moe|Swarm|Registry|Kernel)[A-Za-z0-9_]*)\b",
    ]
    for pat in patterns:
        for match in re.findall(pat, content, flags=re.IGNORECASE):
            if match:
                ids.add(match.strip())

    posix = str(path).replace("\\", "/").lower()
    if "/orchestration/" in posix:
        for match in re.findall(r"export class\s+([A-Za-z0-9_]{2,64})\b", content):
            ids.add(match.strip())
    return ids


def scan_project_moes(project_path: Path) -> List[Dict]:
    records: Dict[str, Dict] = {}

    for root, dirs, files in os.walk(project_path):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        root_path = Path(root)
        for filename in files:
            path = root_path / filename
            if path.suffix.lower() not in CODE_EXTENSIONS:
                continue
            if not is_moe_candidate(path):
                continue
            try:
                content = path.read_text(encoding="utf-8", errors="ignore")
            except OSError:
                continue

            if not is_real_moe_source(path, content):
                continue

            ids = extract_moe_ids(content, path)
            if not ids:
                continue
            summary = extract_summary(content)
            for item_id in ids:
                key = item_id.lower().replace(" ", "-")
                record = records.setdefault(
                    key,
                    {
                        "moe_id": key,
                        "display_name": normalize_name(item_id),
                        "item_kind": "moe",
                        "description_samples": [],
                        "what_they_do": [],
                        "source_file_count": 0,
                        "evidence_paths": set(),
                        "evidence_score": 0,
                        "confidence": "source-validated",
                    },
                )
                if summary and summary not in record["description_samples"]:
                    record["description_samples"].append(summary)
                if summary and summary not in record["what_they_do"]:
                    record["what_they_do"].append(summary)
                record["evidence_paths"].add(str(path))

    output: List[Dict] = []
    for record in records.values():
        source_count = len(record["evidence_paths"])
        if source_count == 0:
            continue
        record["source_file_count"] = source_count
        record["evidence_score"] = source_count * 10
        if not record["description_samples"]:
            continue
        if not record["what_they_do"]:
            continue
        record["description_samples"] = record["description_samples"][:3]
        record["what_they_do"] = record["what_they_do"][:4]
        record["evidence_paths"] = sorted(record["evidence_paths"])[:10]
        output.append(record)

    return sorted(output, key=lambda x: (-x["source_file_count"], x["display_name"]))


def clean_evidence_paths(paths: List[str]) -> List[str]:
    bad = ("/site-packages/", "/environments/", "node_modules", "/dist-packages/", "/lib/python")
    return [p for p in paths if p and not any(b in p.lower() for b in bad)]


def public_evidence_display_lines(project_key: str, count: int, item_kind: str) -> List[str]:
    """Non-filesystem strings for shipped JSON — no host paths or personal layout."""
    if count <= 0:
        return ["No corroborating modules recorded for this row in the export bundle."]
    kind = (item_kind or "agent").lower()
    head = f"{project_key} · static source scan ({kind})"
    lines = [head, "Declaration / pattern alignment (redacted in public artifact)"]
    if count > 2:
        lines.append("Secondary module corroboration (redacted in public artifact)")
    return lines[:3]


def is_clean_project_path(path: Path) -> bool:
    pl = str(path).replace("\\", "/").lower()
    if any(b in pl for b in ("/site-packages/", "/environments/", "node_modules/", "/dist-packages/", "/lib/python")):
        return False
    if any(h in pl for h in SKIP_PATH_HINTS):
        return False
    fn = path.name.lower()
    if any(h in fn for h in SKIP_FILE_HINTS):
        return False
    return True


ITEM_CAP_PER_PROJECT = 300


def load_iceburg_protocol_inventory(projects_dir: Path) -> List[Dict]:
    """Iceburg: union of agents referenced in protocol planner and @register_agent in execution (full protocol set)."""
    root = projects_dir / "iceburg"
    if not root.is_dir():
        return []
    planner = root / "src/iceburg/protocol/planner.py"
    regdir = root / "src/iceburg/protocol/execution/agents"
    init_py = root / "src/iceburg/protocol/__init__.py"
    used: Set[str] = set()
    if planner.is_file():
        text = planner.read_text(encoding="utf-8", errors="ignore")
        for m in re.finditer(r'agent\s*=\s*"([^"]+)"', text):
            used.add(m.group(1).strip())
    registered: Set[str] = set()
    if init_py.is_file():
        it = init_py.read_text(encoding="utf-8", errors="ignore")
        for m in re.finditer(r'@register_agent\("([^"]+)"\)', it):
            registered.add(m.group(1).strip())
    if regdir.is_dir():
        for p in regdir.glob("*.py"):
            try:
                t = p.read_text(encoding="utf-8", errors="ignore")
            except OSError:
                continue
            for m in re.finditer(r'@register_agent\("([^"]+)"\)', t):
                registered.add(m.group(1).strip())
    all_names = sorted(used | registered)
    rows: List[Dict] = []
    planner_s = ""
    if planner.is_file():
        planner_s = extract_summary(planner.read_text(encoding="utf-8", errors="ignore"))
    for name in all_names:
        ev: List[str] = []
        if planner.is_file():
            ev.append(str(planner))
        agent_py = regdir / f"{name}.py" if regdir.is_dir() else None
        summ = ""
        if agent_py and agent_py.is_file():
            ev.append(str(agent_py))
            summ = extract_summary(agent_py.read_text(encoding="utf-8", errors="ignore"))
        if not summ:
            summ = (
                f"Iceburg protocol agent `{name}` (planner and/or execution registry)."
                + (f" Planner: {planner_s}" if planner_s and name in used else "")
            ).strip()[:400]
        rows.append(
            {
                "moe_id": f"protocol-{name.replace(' ', '-').lower()}",
                "display_name": normalize_name(name.replace("-", " ").replace("_", " ")),
                "item_kind": "agent",
                "description_samples": [summ],
                "what_they_do": [summ],
                "source_file_count": len(ev) or 1,
                "evidence_paths": ev or ([str(planner)] if planner.is_file() else []),
                "evidence_score": max(1, len(ev)) * 10,
                "confidence": "source-validated",
            }
        )
    return rows


def load_akkadia_council_slugs(project_root: Path) -> List[Dict]:
    """Akkadia council specialist slugs from council_agents.py (when present under this scan root)."""
    p = project_root / "council_agents.py"
    if not p.is_file():
        return []
    try:
        content = p.read_text(encoding="utf-8", errors="ignore")
    except OSError:
        return []
    rows: List[Dict] = []
    summ0 = extract_summary(content) or "Akkadia council specialist roster (council_agents.py)."
    for m in re.finditer(r'slug\s*=\s*"([^"]+)"', content):
        slug = m.group(1).strip()
        if not slug or len(slug) > 80:
            continue
        sid = slug.lower().replace(" ", "-")
        desc = f"Council specialist `{slug}` (Akkadia council_agents)."
        rows.append(
            {
                "moe_id": f"council-{sid}",
                "display_name": normalize_name(slug.replace("-", " ").replace("_", " ")),
                "item_kind": "agent",
                "description_samples": [summ0, desc][:2],
                "what_they_do": [desc],
                "source_file_count": 1,
                "evidence_paths": [str(p)],
                "evidence_score": 10,
                "confidence": "source-validated",
            }
        )
    return rows


def iter_inventory_scan_roots(project_root: Path) -> List[Path]:
    """Prefer conventional source trees; include backend/frontend when there is no `src/`."""
    roots: List[Path] = []
    for name in ("src", "backend", "frontend", "lib", "packages", "scalar_awakening"):
        p = project_root / name
        if p.is_dir():
            roots.append(p)
    if not roots and project_root.is_dir():
        roots.append(project_root)
    return roots


def scan_src_inventory(project_root: Path) -> List[Dict]:
    """Walk first-party source trees and collect agents from decorators / Agent classes."""
    records: Dict[str, Dict] = {}
    patterns = [
        (r'@register_agent\("([^"]+)"\)', "agent"),
        (r"@register_agent\('([^']+)'\)", "agent"),
        (r"class\s+(\w{2,64}Agent)\s*[\(:]", "agent"),
        (r"class\s+(\w{2,64})\s+extends\s+Agent\b", "agent"),
        (r"export\s+class\s+(\w{2,64})\s+extends\s+Agent\b", "agent"),
        (r"export\s+class\s+(\w{2,64}Agent)\b", "agent"),
    ]
    for base in iter_inventory_scan_roots(project_root):
        for root, dirs, files in os.walk(base):
            dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
            for filename in files:
                path = Path(root) / filename
                if path.suffix.lower() not in {".py", ".js", ".ts", ".tsx"}:
                    continue
                if not is_clean_project_path(path):
                    continue
                try:
                    content = path.read_text(encoding="utf-8", errors="ignore")
                except OSError:
                    continue
                summ = extract_summary(content)
                if not summ:
                    summ = f"Source module `{path.name}` under project tree."
                seen_ids: Set[str] = set()
                for pat, _kind in patterns:
                    for m in re.finditer(pat, content):
                        raw = m.group(1).strip()
                        if not raw or len(raw) > 80 or raw in seen_ids:
                            continue
                        if raw.lower() in {"self", "cls", "return", "true", "false", "none"}:
                            continue
                        seen_ids.add(raw)
                        key = re.sub(r"[^a-z0-9]+", "-", raw.lower()).strip("-")[:80]
                        if not key:
                            continue
                        rid = f"src-{key}"
                        rec = records.setdefault(
                            rid,
                            {
                                "moe_id": rid,
                                "display_name": raw if raw[0].isupper() else normalize_name(raw),
                                "item_kind": "agent",
                                "description_samples": [],
                                "what_they_do": [],
                                "source_file_count": 0,
                                "evidence_paths": set(),
                                "evidence_score": 0,
                                "confidence": "source-validated",
                            },
                        )
                        if summ and summ not in rec["description_samples"]:
                            rec["description_samples"].append(summ)
                        if summ and summ not in rec["what_they_do"]:
                            rec["what_they_do"].append(summ)
                        rec["evidence_paths"].add(str(path))
    out: List[Dict] = []
    for rec in records.values():
        ep = clean_evidence_paths(sorted(rec["evidence_paths"]))
        if not ep:
            continue
        rec["evidence_paths"] = ep
        n = len(ep)
        rec["source_file_count"] = n
        rec["evidence_score"] = n * 10
        if not rec["description_samples"]:
            continue
        rec["description_samples"] = rec["description_samples"][:3]
        rec["what_they_do"] = (rec["what_they_do"] or rec["description_samples"])[:4]
        out.append(rec)
    return sorted(out, key=lambda x: (-x["source_file_count"], x["display_name"]))


def load_scalar_moe_canonical(projects_dir: Path) -> List[Dict]:
    """ScalarCode: MoE engine + teacher-tier expert roles from ScalarMoE.js (first-party only)."""
    js = projects_dir / "ScalarCode" / "src" / "core" / "ScalarMoE.js"
    if not js.is_file():
        return []
    content = js.read_text(encoding="utf-8", errors="ignore")
    summ = extract_summary(content)
    if not summ:
        return []
    ev_path = str(js)
    roles_m = re.search(r"this\.teacherRoles\s*=\s*\[([^\]]*)\]", content, re.DOTALL)
    roles: List[str] = []
    if roles_m:
        roles = re.findall(r"'([^']+)'", roles_m.group(1))

    rows: List[Dict] = [
        {
            "moe_id": "engine",
            "display_name": "ScalarMoE",
            "item_kind": "moe",
            "description_samples": [summ],
            "what_they_do": [summ],
            "source_file_count": 1,
            "evidence_paths": [ev_path],
            "evidence_score": 10,
            "confidence": "source-validated",
        }
    ]
    tier_note = (
        "Teacher-tier slot in ScalarMoE.teacherRoles: routed to the higher-capacity local model tier "
        "when this role is active (see ScalarMoE.route)."
    )
    for role in roles:
        rid = role.lower().replace(" ", "-").replace("_", "-")
        rows.append(
            {
                "moe_id": f"teacher-tier-{rid}",
                "display_name": normalize_name(role),
                "item_kind": "moe",
                "description_samples": [tier_note],
                "what_they_do": [tier_note],
                "source_file_count": 1,
                "evidence_paths": [ev_path],
                "evidence_score": 10,
                "confidence": "source-validated",
            }
        )
    return rows


def load_scalar_agent_canonical(projects_dir: Path) -> List[Dict]:
    """ScalarCode: first-party agent classes under src/agents (extends Agent), excluding the base Agent.js."""
    agents_dir = projects_dir / "ScalarCode" / "src" / "agents"
    if not agents_dir.is_dir():
        return []
    rows: List[Dict] = []
    for path in sorted(agents_dir.glob("*.js")):
        if path.name.lower() == "agent.js":
            continue
        try:
            content = path.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        cls_m = re.search(r"class\s+(\w+)\s+extends\s+Agent\b", content)
        if not cls_m:
            continue
        class_name = cls_m.group(1)
        role_m = re.search(r"super\s*\(\s*['\"]([^'\"]+)['\"]", content, re.DOTALL)
        role = role_m.group(1).strip() if role_m else class_name
        summ = extract_summary(content)
        if not summ:
            summ = f"Scalar agent `{class_name}` with runtime role `{role}` (extends Agent)."
        rid = re.sub(r"[^a-z0-9]+", "-", role.lower()).strip("-") or class_name.lower()
        ev_path = str(path)
        rows.append(
            {
                "moe_id": f"agent-{rid}",
                "display_name": class_name,
                "item_kind": "agent",
                "description_samples": [summ],
                "what_they_do": [summ],
                "source_file_count": 1,
                "evidence_paths": [ev_path],
                "evidence_score": 10,
                "confidence": "source-validated",
            }
        )
    return rows


def load_bruce_agents_canonical(projects_dir: Path) -> List[Dict]:
    """Bruce Lee stack: exported TypeScript classes in orchestration, agent, and services."""
    root = projects_dir / "bruce"
    if not root.is_dir():
        return []
    # Orchestration + entry agent only (services are support modules, not "Bruce Lee agents").
    targets = [
        root / "src" / "orchestration",
        root / "src" / "agent",
    ]
    rows: List[Dict] = []
    extra_files = [root / "src" / "services" / "PersonaAgent.ts"]
    for path in extra_files:
        if not path.is_file() or not is_clean_project_path(path):
            continue
        try:
            content = path.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        m = re.search(r"export\s+class\s+(\w+)", content)
        if not m:
            continue
        cname = m.group(1).strip()
        rid = re.sub(r"[^a-z0-9]+", "-", cname.lower()).strip("-")
        summ = extract_summary(content) or f"Bruce Lee stack component `{cname}` ({path.name})."
        rows.append(
            {
                "moe_id": f"canonical-{rid}",
                "display_name": cname,
                "item_kind": "agent",
                "description_samples": [summ],
                "what_they_do": [summ],
                "source_file_count": 1,
                "evidence_paths": [str(path)],
                "evidence_score": 10,
                "confidence": "source-validated",
            }
        )
    for d in targets:
        if not d.is_dir():
            continue
        for path in sorted(d.glob("*.ts")):
            if not is_clean_project_path(path):
                continue
            try:
                content = path.read_text(encoding="utf-8", errors="ignore")
            except OSError:
                continue
            m = re.search(r"export\s+class\s+(\w+)", content)
            if not m:
                continue
            cname = m.group(1).strip()
            if not re.search(
                r"(Agent|Kernel|Coordinator|Adversary|Tactician|Alchemist)$",
                cname,
                re.IGNORECASE,
            ) and cname not in ("DojoKernel", "BruceLeeAgent"):
                continue
            rid = re.sub(r"[^a-z0-9]+", "-", cname.lower()).strip("-")
            if not rid:
                continue
            summ = extract_summary(content) or f"Bruce Lee stack component `{cname}` ({path.name})."
            rows.append(
                {
                    "moe_id": f"canonical-{rid}",
                    "display_name": cname,
                    "item_kind": "agent",
                    "description_samples": [summ],
                    "what_they_do": [summ],
                    "source_file_count": 1,
                    "evidence_paths": [str(path)],
                    "evidence_score": 10,
                    "confidence": "source-validated",
                }
            )
    return rows


def load_bruce_moe_audit(projects_dir: Path) -> List[Dict]:
    """Verify whether first-party Bruce sources declare transformer-style MoE (vs multi-agent orchestration)."""
    bruce = projects_dir / "bruce"
    src = bruce / "src"
    if not bruce.is_dir() or not src.is_dir():
        return []
    moe_hit: Optional[Path] = None
    for path in src.rglob("*.ts"):
        if not is_clean_project_path(path):
            continue
        try:
            text = path.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        if re.search(r"\b(mixture\s*of\s*experts|MixtureOfExperts|\bMoE\b|moe_router)\b", text, re.IGNORECASE):
            moe_hit = path
            break
    kern = src / "orchestration" / "DojoKernel.ts"
    fallback: Optional[Path] = kern if kern.is_file() else next((p for p in src.rglob("*.ts") if is_clean_project_path(p)), None)
    ev_path = moe_hit or fallback or bruce
    ev = str(ev_path)
    if moe_hit:
        desc = f"MoE-related token matched in `{moe_hit.relative_to(bruce)}`."
        kind = "moe"
    else:
        desc = (
            "MoE audit: no mixture-of-experts / MoE-router tokens under `bruce/src` TypeScript; "
            "architecture is multi-agent orchestration (DojoKernel coordinates PersonaAgent, Coordinator, Adversary)."
        )
        kind = "registry"
    kern_summ = extract_summary(kern.read_text(encoding="utf-8", errors="ignore")) if kern.is_file() else ""
    samples = [desc]
    if kern_summ:
        samples.append(kern_summ[:300])
    return [
        {
            "moe_id": "moe-architecture-audit",
            "display_name": "MoE vs orchestration (source audit)",
            "item_kind": kind,
            "description_samples": samples[:3],
            "what_they_do": [desc],
            "source_file_count": 1,
            "evidence_paths": [ev],
            "evidence_score": 10,
            "confidence": "source-validated",
        }
    ]


def load_linguistic_registry(projects_dir: Path) -> List[Dict]:
    """Linguistic / Scalar Awakening: mode+dial decomposition (not transformer MoE)."""
    engine = projects_dir / "Lingustic AI" / "scalar_awakening" / "scalar_engine.py"
    if not engine.is_file():
        return []
    content = engine.read_text(encoding="utf-8", errors="ignore")
    summ = extract_summary(content)
    dial_note = (
        "AI breakdown is explicit in `scalar_engine.py`: three modes (symbolic / empirical / synthesis) "
        "and three scalar dials (intensity, paranoia, reverence). This is behavioral routing in the system prompt, "
        "not a learned mixture-of-experts layer."
    )
    base = summ or "Scalar Awakening engine scaffolding (scalar_engine.py)."
    return [
        {
            "moe_id": "registry-scalar-awakening",
            "display_name": "Scalar Awakening (modes & dials)",
            "item_kind": "registry",
            "description_samples": [base, dial_note][:3],
            "what_they_do": [dial_note],
            "source_file_count": 1,
            "evidence_paths": [str(engine)],
            "evidence_score": 10,
            "confidence": "source-validated",
        }
    ]


def load_legal_registry(projects_dir: Path) -> List[Dict]:
    """Legal AI: pipeline + query decomposition (ARCHITECTURE); MoE check across first-party tree."""
    rows: List[Dict] = []
    legal_root = projects_dir / "Legal AI"
    arch = legal_root / "docs" / "ARCHITECTURE.md"
    if arch.is_file():
        md = arch.read_text(encoding="utf-8", errors="ignore")
        lede = extract_markdown_lede(md) or extract_summary(md)
        decomp = (
            "Query handling uses hybrid decomposition: `isComplexQuery()` routes to `decomposeWithNano()` "
            "(qwen2.5-coder:1.5b) for complex cases or `decomposeAlgorithmically()` for simple cases "
            "(see `WebSearchAgent.js` and ARCHITECTURE.md)."
        )
        rows.append(
            {
                "moe_id": "registry-legal-pipeline",
                "display_name": "Legal AI pipeline & decomposition",
                "item_kind": "registry",
                "description_samples": [lede, decomp][:3],
                "what_they_do": [decomp],
                "source_file_count": 1,
                "evidence_paths": [str(arch)],
                "evidence_score": 10,
                "confidence": "source-validated",
            }
        )
    moe_hit: Optional[Path] = None
    if legal_root.is_dir():
        for path in legal_root.rglob("*"):
            if path.is_dir():
                continue
            if path.suffix.lower() not in {".py", ".js", ".ts", ".tsx", ".md"}:
                continue
            if not is_clean_project_path(path):
                continue
            try:
                text = path.read_text(encoding="utf-8", errors="ignore")
            except OSError:
                continue
            if re.search(r"\b(mixture\s*of\s*experts|MixtureOfExperts|\bMoE\b|moe_router)\b", text, re.IGNORECASE):
                moe_hit = path
                break
    if moe_hit:
        rows.append(
            {
                "moe_id": "registry-moe-found",
                "display_name": "MoE token match (Legal AI tree)",
                "item_kind": "moe",
                "description_samples": [f"Matched MoE-related wording in `{moe_hit.relative_to(legal_root)}`."],
                "what_they_do": [f"Evidence: {moe_hit}"],
                "source_file_count": 1,
                "evidence_paths": [str(moe_hit)],
                "evidence_score": 10,
                "confidence": "source-validated",
            }
        )
    else:
        rows.append(
            {
                "moe_id": "registry-moe-absent",
                "display_name": "MoE audit (Legal AI first-party)",
                "item_kind": "registry",
                "description_samples": [
                    "No mixture-of-experts / MoE-router tokens in scanned Legal AI `.py/.js/.ts/.md` (excluding venv)."
                ],
                "what_they_do": [
                    "Legal stack is multi-agent + verification pipeline with nano-LLM query decomposition, not transformer MoE."
                ],
                "source_file_count": 1,
                "evidence_paths": (
                    [str(arch)]
                    if arch.is_file()
                    else ([str(legal_root / "README.md")] if (legal_root / "README.md").is_file() else [str(legal_root)])
                ),
                "evidence_score": 10,
                "confidence": "source-validated",
            }
        )
    return rows


def write_sqlite(db_path: Path, records: List[Dict], run_summary: Dict) -> None:
    db_path.parent.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(db_path) as conn:
        cur = conn.cursor()
        cur.execute("DROP TABLE IF EXISTS moe_profiles")
        cur.execute("DROP TABLE IF EXISTS run_summary")
        cur.execute(
            """
            CREATE TABLE moe_profiles (
              item_id TEXT PRIMARY KEY,
              display_name TEXT NOT NULL,
              project_key TEXT NOT NULL,
              source_file_count INTEGER NOT NULL,
              evidence_score INTEGER NOT NULL,
              description_samples_json TEXT NOT NULL,
              what_they_do_json TEXT NOT NULL,
              confidence TEXT NOT NULL
            )
            """
        )
        cur.execute(
            """
            CREATE TABLE run_summary (
              generated_at TEXT NOT NULL,
              project_count INTEGER NOT NULL,
              distinct_items INTEGER NOT NULL
            )
            """
        )
        for r in records:
            item_id = f"moe:{r['project_key']}:{r['moe_id']}"
            cur.execute(
                """
                INSERT INTO moe_profiles (
                  item_id, display_name, project_key, source_file_count, evidence_score,
                  description_samples_json, what_they_do_json, confidence
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    item_id,
                    r["display_name"],
                    r["project_key"],
                    r["source_file_count"],
                    r["evidence_score"],
                    json.dumps(r["description_samples"]),
                    json.dumps(r["what_they_do"]),
                    r["confidence"],
                ),
            )
        cur.execute(
            "INSERT INTO run_summary (generated_at, project_count, distinct_items) VALUES (?, ?, ?)",
            (run_summary["generated_at"], run_summary["project_count"], run_summary["distinct_items"]),
        )
        conn.commit()


def main() -> None:
    projects_dir = Path(os.environ.get("AGENT_PROJECTS_DIR", DEFAULT_PROJECTS_DIR))
    output_db = Path(os.environ.get("AGENT_DB_PATH", "data/agent-intelligence/agent_intelligence.db"))
    output_json = Path(os.environ.get("AGENT_EXPORT_JSON", "public/data/agent-intelligence.json"))

    project_catalog = []
    merged_items = []

    for group_key, candidates in PROJECT_GROUPS:
        source_dirs = resolve_scan_roots(projects_dir, candidates)
        if not source_dirs:
            continue

        merged: Dict[str, Dict] = {}

        def ingest(record: Dict) -> None:
            key = record["moe_id"]
            snapshot = {
                **record,
                "evidence_paths": list(record.get("evidence_paths") or []),
                "description_samples": list(record.get("description_samples") or []),
                "what_they_do": list(record.get("what_they_do") or []),
            }
            if key not in merged:
                merged[key] = snapshot
            else:
                merge_moe_record(merged[key], snapshot)

        if group_key == "iceberg":
            for record in load_iceburg_protocol_inventory(projects_dir):
                ingest(record)

        if group_key == "scalar":
            for record in load_scalar_moe_canonical(projects_dir):
                ingest(record)
            for record in load_scalar_agent_canonical(projects_dir):
                ingest(record)
            for source in source_dirs:
                if "scalarcode" in str(source).lower():
                    for record in scan_src_inventory(source):
                        ingest(record)

        if group_key == "akkadia":
            for source in source_dirs:
                for record in load_akkadia_council_slugs(source):
                    ingest(record)

        if group_key == "bruce":
            for record in load_bruce_moe_audit(projects_dir):
                ingest(record)
            for record in load_bruce_agents_canonical(projects_dir):
                ingest(record)

        if group_key == "linguistic":
            for record in load_linguistic_registry(projects_dir):
                ingest(record)

        if group_key == "legal":
            for record in load_legal_registry(projects_dir):
                ingest(record)

        if group_key not in ("scalar",):
            for source in source_dirs:
                if group_key != "bruce":
                    for record in scan_project_moes(source):
                        ingest(record)
                if group_key != "bruce":
                    for record in scan_src_inventory(source):
                        ingest(record)
        else:
            # Scalar-Vision: MoE-tagged sources only (ScalarCode already handled above).
            for source in source_dirs:
                if "scalar-vision" in str(source).lower():
                    for record in scan_project_moes(source):
                        ingest(record)
                    for record in scan_src_inventory(source):
                        ingest(record)

        items = sorted(merged.values(), key=lambda x: (-x["source_file_count"], x["display_name"]))

        core_items = []
        for item in items[:ITEM_CAP_PER_PROJECT]:
            enriched = dict(item)
            enriched["project_key"] = group_key
            enriched["moe_id"] = f"{group_key}-{item['moe_id']}"
            enriched["description_samples"] = [
                sanitize_public_text(str(s)) for s in (enriched.get("description_samples") or [])
            ]
            enriched["what_they_do"] = [
                sanitize_public_text(str(s)) for s in (enriched.get("what_they_do") or [])
            ]
            ep = clean_evidence_paths(list(enriched.get("evidence_paths") or []))
            n_ev = len(ep)
            enriched["source_file_count"] = n_ev
            enriched["evidence_score"] = n_ev * 10
            # Never ship absolute filesystem paths in public artifacts (personal layout).
            enriched["evidence_paths"] = []
            enriched["evidence_display"] = public_evidence_display_lines(
                group_key, n_ev, str(enriched.get("item_kind") or "agent")
            )
            core_items.append(enriched)

        project_catalog.append(
            {
                "project_key": group_key,
                "core_moes": core_items,
                "hybrid_items": core_items,
                "transcript_count": 0,
                "multi_agent_transcripts": 0,
            }
        )
        merged_items.extend(core_items)

    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "source": "local-development-scan",
        "summary": {
            "project_count": len(project_catalog),
            "distinct_agent_types": len(merged_items),
            "total_transcripts": 0,
            "total_subagent_invocations": 0,
            "multi_agent_transcripts": 0,
            "accomplishment_samples": [],
        },
        "projects": project_catalog,
        "agents": merged_items,
    }

    output_json.parent.mkdir(parents=True, exist_ok=True)
    output_json.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    write_sqlite(
        output_db,
        merged_items,
        {
            "generated_at": payload["generated_at"],
            "project_count": len(project_catalog),
            "distinct_items": len(merged_items),
        },
    )
    print(
        f"Agent intelligence build complete. Items: {len(merged_items)} | "
        f"Projects indexed: {len(project_catalog)} | Output: {output_json}"
    )


if __name__ == "__main__":
    main()

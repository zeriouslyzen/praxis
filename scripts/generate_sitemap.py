#!/usr/bin/env python3
from datetime import datetime, timezone
from pathlib import Path

BASE_URL = "https://praxis-research.com"
OUTPUT = Path(__file__).resolve().parents[1] / "public" / "sitemap.xml"

ROUTES = [
    ("/", "weekly", "1.0"),
    ("/research", "weekly", "0.9"),
    ("/research/publications", "weekly", "0.8"),
    ("/engineering", "weekly", "0.9"),
    ("/services", "weekly", "0.9"),
    ("/algorithm-research", "weekly", "0.8"),
    ("/development-platform", "weekly", "0.8"),
    ("/innovation-lab", "weekly", "0.8"),
    ("/small-business", "weekly", "0.9"),
    ("/about", "monthly", "0.8"),
    ("/demo", "monthly", "0.8"),
]


def build_sitemap() -> str:
    lastmod = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for path, changefreq, priority in ROUTES:
        lines.extend(
            [
                "  <url>",
                f"    <loc>{BASE_URL}{path}</loc>",
                f"    <lastmod>{lastmod}</lastmod>",
                f"    <changefreq>{changefreq}</changefreq>",
                f"    <priority>{priority}</priority>",
                "  </url>",
            ]
        )
    lines.append("</urlset>")
    return "\n".join(lines) + "\n"


if __name__ == "__main__":
    OUTPUT.write_text(build_sitemap(), encoding="utf-8")
    print(f"Generated sitemap: {OUTPUT}")

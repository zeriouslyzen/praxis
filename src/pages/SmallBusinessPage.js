import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/AppContext';
import { Header, Footer } from '../components/Layout';
import { SEO, usePageSEO, faqStructuredData } from '../components/SEO';

const DRAFT_STYLES = `
  @keyframes sb-trace {
    to { stroke-dashoffset: 0; }
  }
  @keyframes sb-node-pulse {
    0%, 100% { opacity: 0.35; transform: scale(1); }
    50% { opacity: 0.95; transform: scale(1.08); }
  }
  @keyframes sb-flow {
    0% { stroke-dashoffset: 24; }
    100% { stroke-dashoffset: 0; }
  }
  .sb-trace-path {
    stroke-dasharray: 140;
    stroke-dashoffset: 140;
    animation: sb-trace 2.4s ease forwards;
  }
  .sb-trace-path-delay {
    stroke-dasharray: 120;
    stroke-dashoffset: 120;
    animation: sb-trace 2s ease 0.6s forwards;
  }
  .sb-node {
    animation: sb-node-pulse 3.2s ease-in-out infinite;
  }
  .sb-node-d {
    animation: sb-node-pulse 3.2s ease-in-out 0.8s infinite;
  }
  .sb-dashed-flow {
    stroke-dasharray: 6 6;
    animation: sb-flow 1.2s linear infinite;
  }
  @keyframes sb-bar-shimmer {
    0%, 100% { opacity: 0.55; }
    50% { opacity: 1; }
  }
  .sb-bar-anim rect:nth-child(odd) {
    animation: sb-bar-shimmer 2.4s ease-in-out infinite;
  }
  .sb-bar-anim rect:nth-child(even) {
    animation: sb-bar-shimmer 2.4s ease-in-out 0.4s infinite;
  }
`;

/** Cycles blue → orange → brown (light) / sky → amber → orange (dark) */
const accent = (light, i) => {
  const k = ((i % 3) + 3) % 3;
  if (light) {
    const strokes = ['#1d4ed8', '#ff6b00', '#92400e'];
    const rings = ['#1e3a8a', '#cc4f00', '#78350f'];
    const fills = ['rgba(29, 78, 216, 0.09)', 'rgba(255, 107, 0, 0.16)', 'rgba(146, 64, 14, 0.11)'];
    return { stroke: strokes[k], ring: rings[k], fill: fills[k] };
  }
  const strokes = ['#38bdf8', '#ffb020', '#fbbf24'];
  const rings = ['#0c4a6e', '#f97316', '#b45309'];
  const fills = ['rgba(56, 189, 248, 0.12)', 'rgba(255, 176, 32, 0.2)', 'rgba(251, 191, 36, 0.14)'];
  return { stroke: strokes[k], ring: rings[k], fill: fills[k] };
};

const AccentCheck = ({ className = 'w-5 h-5 shrink-0', light, accentIndex = 0 }) => {
  const a = accent(light, accentIndex);
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="10" cy="10" r="8.5" stroke={a.ring} strokeWidth="1.25" fill={a.fill} />
      <path
        d="M6 10.2 8.8 13 14 6.8"
        stroke={a.stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const EngineeringOrnament = ({ light, className }) => {
  const gradId = React.useId().replace(/:/g, '');
  const g1 = light ? '#1d4ed8' : '#38bdf8';
  const g2 = light ? '#ff7a18' : '#ffb347';
  const g3 = light ? '#92400e' : '#d97706';
  return (
    <svg className={className} viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={g1} stopOpacity="0.35" />
          <stop offset="52%" stopColor={g2} stopOpacity="0.82" />
          <stop offset="100%" stopColor={g3} stopOpacity="0.32" />
        </linearGradient>
      </defs>
      <path
        d="M8 52 H88 L100 40 L112 52 L180 52"
        stroke={`url(#${gradId})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        className="sb-trace-path"
      />
      <path
        d="M180 52 L188 44 L196 52 L204 44 L212 52 H312"
        stroke={light ? '#57534e' : '#a8a29e'}
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity={light ? 0.45 : 0.45}
        className="sb-trace-path-delay"
      />
      <rect x="130" y="46" width="24" height="12" rx="1" stroke={light ? '#78350f' : '#d6d3d1'} strokeWidth="1" fill="none" opacity="0.55" />
      <path d="M136 52 h12" stroke={g2} strokeWidth="1" opacity="0.9" />
      <circle cx="88" cy="52" r="3" fill={g1} className="sb-node" />
      <circle cx="180" cy="52" r="3" fill={g3} className="sb-node-d" />
      <path d="M248 52 v16 M242 60 h12" stroke={light ? '#78716c' : '#a8a29e'} strokeWidth="1" opacity="0.55" />
    </svg>
  );
};

const DraftSignalLine = ({ light, accentIndex = 1 }) => {
  const { stroke } = accent(light, accentIndex);
  return (
    <svg className="w-40 sm:w-56 h-3 mt-6" viewBox="0 0 200 6" fill="none" aria-hidden>
      <line
        x1="0"
        y1="3"
        x2="200"
        y2="3"
        stroke={stroke}
        strokeWidth="1.25"
        strokeOpacity="0.55"
        strokeLinecap="round"
        className="sb-dashed-flow"
        strokeDasharray="6 6"
      />
    </svg>
  );
};

const SPARK_SETS = [
  [0.52, 0.44, 0.58, 0.4, 0.62, 0.48, 0.72, 0.56, 0.78],
  [0.68, 0.55, 0.6, 0.42, 0.5, 0.58, 0.45, 0.62, 0.52],
  [0.45, 0.5, 0.38, 0.55, 0.48, 0.65, 0.58, 0.7, 0.82],
  [0.55, 0.62, 0.5, 0.68, 0.55, 0.72, 0.65, 0.58, 0.7],
];

const MicroSparkline = ({ light, variant = 0, className = 'w-full h-10' }) => {
  const pts = SPARK_SETS[variant % SPARK_SETS.length];
  const w = 100;
  const h = 28;
  const pad = 4;
  const d = pts
    .map((py, i) => {
      const x = pad + (i / (pts.length - 1)) * (w - pad * 2);
      const y = pad + (1 - py) * (h - pad * 2);
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  const { stroke } = accent(light, variant);
  const grid = light ? 'rgba(120, 113, 108, 0.11)' : 'rgba(168, 162, 158, 0.14)';
  return (
    <svg className={className} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden>
      <line x1="0" y1={h - pad} x2={w} y2={h - pad} stroke={grid} strokeWidth="0.5" />
      <line x1="0" y1={h / 2} x2={w} y2={h / 2} stroke={grid} strokeWidth="0.35" strokeDasharray="2 3" opacity="0.7" />
      <path d={d} stroke={stroke} strokeWidth="1.25" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
    </svg>
  );
};

const MicroSpecBars = ({ light, variant = 0, className = 'w-full h-8' }) => {
  const heights = [
    [0.45, 0.72, 0.55, 0.88, 0.62],
    [0.6, 0.5, 0.75, 0.55, 0.7],
    [0.5, 0.65, 0.45, 0.7, 0.58],
  ][variant % 3];
  const fg = light ? '#78716c' : '#78716e';
  const warm = light ? '#a8a29e' : '#57534e';
  const hiIdx = variant % 5;
  const hiColors = [
    accent(light, 0).stroke,
    accent(light, 1).stroke,
    accent(light, 2).stroke,
    accent(light, 1).stroke,
    accent(light, 0).stroke,
  ];
  return (
    <svg className={`sb-bar-anim ${className}`} viewBox="0 0 72 20" fill="none" aria-hidden>
      {heights.map((r, i) => {
        const isHi = i === hiIdx;
        const fill = isHi ? hiColors[hiIdx] : i % 2 === 0 ? fg : warm;
        return (
          <rect
            key={i}
            x={4 + i * 14}
            y={16 - r * 14}
            width="8"
            height={r * 14}
            fill={fill}
            opacity={isHi ? 0.82 : 0.38}
            rx="0.5"
          />
        );
      })}
    </svg>
  );
};

const SectionMicroDivider = ({ light, variant }) => (
  <div className={`flex items-center gap-4 py-8 sm:py-10 ${light ? 'opacity-90' : 'opacity-80'}`} aria-hidden>
    <div className={`h-px flex-1 ${light ? 'bg-stone-400/35' : 'bg-stone-500/40'}`} />
    <div className="w-24 sm:w-32 shrink-0">
      <MicroSparkline light={light} variant={variant} className="w-full h-8" />
    </div>
    <div className={`h-px flex-1 ${light ? 'bg-stone-400/35' : 'bg-stone-500/40'}`} />
  </div>
);

const TELEMETRY_ACCENT = (light, i) => {
  const borders = light
    ? ['border-l-blue-800/35', 'border-l-[#ff6b00]/75', 'border-l-amber-900/40', 'border-l-stone-700/45']
    : ['border-l-sky-500/35', 'border-l-[#ffb020]/80', 'border-l-amber-400/50', 'border-l-stone-400/30'];
  return borders[i % 4];
};

const TelemetryStrip = ({ light }) => {
  const ink = light ? 'text-stone-700' : 'text-stone-300';
  const sub = light ? 'text-stone-500' : 'text-stone-500';
  const cardBase = light
    ? 'border border-stone-400/25 bg-stone-50/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] border-l-[3px]'
    : 'border border-stone-600/40 bg-stone-800/40 border-l-[3px]';
  const tiles = [
    { k: 'SPEC · ITEMS', v: '12–48', n: 'per slice', vnt: 0 },
    { k: 'INTEGRATION · NODES', v: '4–22', n: 'typical POS/web', vnt: 1 },
    { k: 'TEST · GATES', v: '≥ 3', n: 'before handoff', vnt: 2 },
    { k: 'ALLY · CADENCE', v: 'Q', n: 'roadmap reviews', vnt: 3 },
  ];
  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-14 sm:mb-16`}>
      {tiles.map((t, ti) => (
        <div key={t.k} className={`rounded-md px-3 py-3 sm:px-4 sm:py-4 ${cardBase} ${TELEMETRY_ACCENT(light, ti)}`}>
          <p className={`text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.14em] ${sub} mb-2`}>{t.k}</p>
          <p className={`text-lg sm:text-xl font-semibold tabular-nums ${ink}`}>{t.v}</p>
          <p className={`text-[0.6rem] ${sub} mt-0.5 mb-2`}>{t.n}</p>
          <MicroSparkline light={light} variant={t.vnt} className="w-full h-7 opacity-95" />
        </div>
      ))}
    </div>
  );
};

const PhaseTimelineGraphic = ({ light }) => {
  const stroke = light ? '#78716c' : '#78716e';
  const fill = light ? '#fafaf9' : '#1c1917';
  return (
    <svg className="w-full max-w-3xl mx-auto h-14 mb-8 hidden sm:block" viewBox="0 0 400 48" fill="none" aria-hidden>
      <line x1="24" y1="24" x2="376" y2="24" stroke={stroke} strokeWidth="1" strokeDasharray="3 2" opacity="0.45" />
      {[64, 152, 240, 328].map((cx, i) => (
        <g key={cx}>
          <circle cx={cx} cy="24" r="7" stroke={accent(light, i).stroke} strokeWidth="1.5" fill={fill} />
          <text x={cx} y="42" textAnchor="middle" fill={light ? '#78716c' : '#a8a29e'} fontSize="8" fontFamily="ui-monospace, monospace">
            {i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
};

const ContractSealSvg = ({ light, className }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <circle
      cx="60"
      cy="60"
      r="54"
      stroke={light ? '#44403c' : '#d6d3d1'}
      strokeWidth="1.5"
      strokeDasharray="4 3"
      opacity="0.5"
    />
    <circle cx="60" cy="60" r="46" stroke={light ? '#ff6b00' : '#ffb020'} strokeWidth="1.25" opacity={light ? 0.55 : 0.65} />
    <path
      d="M60 28 v64 M36 60 h48"
      stroke={light ? '#57534e' : '#e7e5e4'}
      strokeWidth="0.75"
      opacity="0.22"
    />
    <path d="M44 44 L76 76" stroke={light ? '#ff6b00' : '#ffb020'} strokeWidth="1" opacity="0.55" />
    <path d="M76 44 L44 76" stroke={light ? '#92400e' : '#d97706'} strokeWidth="0.75" opacity="0.4" />
  </svg>
);

const SmallBusinessPage = () => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const seo = usePageSEO('small-business');
  const light = !isDarkMode;

  const pageShell = light
    ? 'min-h-screen relative bg-[#e4ddd0] text-stone-900'
    : 'min-h-screen relative bg-stone-950 text-stone-100';

  const gridOverlay = light
    ? `pointer-events-none absolute inset-0 opacity-[0.42] [background-image:linear-gradient(rgba(120,113,108,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(120,113,108,0.07)_1px,transparent_1px)] bg-[length:24px_24px]`
    : `pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(251,146,60,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.06)_1px,transparent_1px)] bg-[length:24px_24px]`;

  const vignette = light
    ? 'pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.5)_0%,transparent_55%)]'
    : 'pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(30,58,138,0.12)_0%,transparent_50%)]';

  const sheet =
    light &&
    'relative bg-[#fdfcfa] shadow-[0_1px_0_rgba(28,25,23,0.06),0_32px_64px_-24px_rgba(28,25,23,0.18)] border border-stone-800/12 border-l-[3px] border-l-stone-800 ring-1 ring-stone-900/[0.04]';

  const sheetDark =
    !light &&
    'relative bg-stone-900/80 shadow-2xl shadow-black/40 border border-stone-700/50 border-l-[3px] border-l-amber-500/35 ring-1 ring-white/[0.04] backdrop-blur-sm';

  const muted = light ? 'text-stone-500' : 'text-stone-400';
  const ink = light ? 'text-stone-800' : 'text-stone-100';
  const displayInk = light ? 'text-stone-900' : 'text-stone-50';
  const rule = light ? 'border-stone-800/10' : 'border-stone-600/30';
  const theadBg = light ? 'bg-stone-100/90' : 'bg-stone-800/50';

  /* Safety / traffic-cone orange — high visibility like field engineering markers */
  const primaryBtn = light
    ? 'bg-[#ff6600] text-white border-2 border-[#e65100] hover:bg-[#ff8533] hover:border-[#ff6600] shadow-[0_2px_0_rgba(180,52,0,0.35)] active:translate-y-[1px] active:shadow-none'
    : 'bg-[#ff7700] text-stone-950 font-semibold border-2 border-[#ffb84d] hover:bg-[#ff9830] hover:border-[#ffd699] shadow-[0_2px_0_rgba(0,0,0,0.25)] active:translate-y-[1px] active:shadow-none';
  const secondaryBtn = light
    ? 'bg-white text-[#cc4f00] border-2 border-[#ff6600] hover:bg-orange-50 hover:text-[#b84400] shadow-sm'
    : 'bg-stone-900 text-[#ffb020] border-2 border-[#ff7700] hover:bg-stone-800 hover:border-[#ff9830]';

  const objectives = [
    'Turn concepts into shipped software with the same rigor as hardware: specs, interfaces, tests, and sign-off.',
    'Unify commercial systems—especially POS, inventory, and retail ops—so stores and back-office stay in sync.',
    'Stand up marketing and growth software (attribution, campaigns, CRM handoffs) without duct-taped spreadsheets.',
    'Offer a long-term engineering ally: not a one-off vendor, but a partner as you iterate from MVP to scale.',
  ];

  const capabilities = [
    {
      head: 'Custom software',
      items: [
        'Internal consoles, ops tools, and customer portals',
        'APIs, workers, and scheduled jobs with logging and rollback',
        'Deterministic validation where AI is optional, not mandatory',
      ],
    },
    {
      head: 'Hardware × software',
      items: [
        'Device provisioning, calibration, and field-update flows',
        'Telemetry ingestion, alarms, and thresholding',
        'Bench / production test software and data capture',
      ],
    },
    {
      head: 'Commercial & customer-facing',
      items: [
        'POS systems: terminals, catalog sync, multi-location inventory, reconciliation with accounting',
        'Marketing software: campaign tooling, lead routing, content ops, analytics pipelines you control',
        'Web presence: brochure and landing sites through full product surfaces and authenticated apps',
      ],
    },
  ];

  const impactRows = [
    {
      situation: 'Retail chain; POS and inventory disagree nightly',
      deliverable: 'Integration hub, idempotent sync jobs, exception queue, ops dashboard',
      impact: 'Fewer stockouts and refunds; managers stop reconciling in spreadsheets',
    },
    {
      situation: 'Growth team; leads scattered across ads, forms, and inboxes',
      deliverable: 'Marketing data layer, CRM rules, event taxonomy, lightweight reporting',
      impact: 'Faster follow-up; repeatable measurement; less tool sprawl',
    },
    {
      situation: 'Hardware product; firmware and cloud disagree',
      deliverable: 'Versioned device schema, signed releases, staged rollout, health telemetry',
      impact: 'Lower RMA rate; faster root-cause on field issues; repeatable release sign-off',
    },
    {
      situation: 'Climate / ag / energy pilot; field data and compliance reports manual',
      deliverable: 'Ingest → validation → regulatory or partner-ready export bundles',
      impact: 'Auditable trail; shorter grant or partner cycles; same pipeline as you scale sites',
    },
  ];

  const phases = [
    { step: '1 · Scope', text: 'Fixed objectives, interfaces, risks, acceptance tests—written, not implied.' },
    { step: '2 · Build / integrate', text: 'Ship in slices: each slice demoable and measurable against the spec.' },
    { step: '3 · Commission', text: 'Runbooks, ownership map, on-call handoff—your team owns the runtime.' },
    { step: '4 · Ally', text: 'Optional long-term partnership: roadmap reviews, upgrades, and access to new methods from our R&D pipeline.' },
  ];

  const workTogether = [
    'Accelerator-style cadence: sharp milestones, demo days, and clear kill/continue criteria—so capital and time go to what works.',
    'We help you innovate in regulated and mission-heavy domains: environmental monitoring, health workflows, agriculture, energy, and adjacent infrastructure—not only generic SaaS.',
    'From napkin sketch to production: same partner for discovery, build, hardening, and the next feature wave.',
    'When you need credibility with investors or customers, you get engineering artifacts: architecture notes, test evidence, and operational runbooks—not slideware alone.',
  ];

  const intelligenceLayer = [
    'Privacy-first by default: data minimization, tenancy boundaries, and deployment options that keep sensitive workloads under your control.',
    'Custom AI and LLMs: task-specific models, retrieval over your corpus, evaluation harnesses—not one-size chat wrappers.',
    'Fine-tuning and alignment passes where domain vocabulary and safety constraints actually matter.',
    'AI agents and multi-agent orchestration patterns drawn from our active research projects—productized only when stable enough to stand behind.',
    'Forward pipeline: as internal projects mature (new protocols, tooling, benchmarks), qualified partners get early, structured access—not hype drops.',
  ];

  const fit = [
    'Founders and operators in environment, health, agriculture, energy, or civic infrastructure who need software that matches physical reality',
    'Retail and commercial teams modernizing POS, inventory, and omnichannel without ripping out the store',
    'Marketing-led startups that have outgrown no-code glue and need owned pipelines and clear attribution',
    'Teams who want a long-term technical ally plus privacy-respecting custom AI—not a revolving door of contractors',
  ];

  const faqSchema = faqStructuredData([
    {
      question: 'What does PRAXIS build for small businesses?',
      answer:
        'PRAXIS builds engineering-grade business systems including POS and retail workflows, marketing automation, web platforms, and hardware-adjacent software where operations touch physical environments.'
    },
    {
      question: 'Can PRAXIS deliver privacy-first AI?',
      answer:
        'Yes. PRAXIS supports privacy-first AI deployments with scoped data boundaries, domain-specific model behavior, retrieval over your internal corpus, and evaluation gates before rollout.'
    },
    {
      question: 'Do you support health, environment, and field operations?',
      answer:
        'Yes. PRAXIS supports deployments for health-related engineering, environmental systems, agriculture, energy, and other field-heavy operations that require strong reliability and traceable delivery.'
    },
    {
      question: 'How does engagement work?',
      answer:
        'Engagement is milestone-based with explicit deliverables, technical checkpoints, and long-term roadmap support so teams can scale systems without losing architectural control.'
    }
  ]);

  return (
    <div className={pageShell}>
      <style>{DRAFT_STYLES}</style>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        url="https://praxis-research.com/small-business"
        structuredData={[...(Array.isArray(seo.structuredData) ? seo.structuredData : [seo.structuredData]), faqSchema]}
      />
      <Header />

      <div className={gridOverlay} />
      <div className={vignette} />

      {/* Corner engineering marks */}
      <div className="pointer-events-none absolute top-28 right-4 sm:right-10 w-[min(100%,320px)] opacity-90 hidden sm:block">
        <EngineeringOrnament light={light} className="w-full h-auto" />
      </div>
      <div className="pointer-events-none absolute bottom-32 left-4 w-24 opacity-40 hidden md:block">
        <ContractSealSvg light={light} className="w-full h-auto" />
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-5 sm:px-10 lg:px-14 pt-28 sm:pt-32 pb-28 sm:pb-36 font-mono">
        <div className={`rounded-sm ${light ? sheet : sheetDark} px-8 sm:px-12 lg:px-16 py-14 sm:py-16 lg:py-20`}>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-16 mb-14">
            <div className="min-w-0 flex-1 space-y-8">
              <div>
                <p className={`text-[0.65rem] uppercase tracking-[0.32em] ${muted} mb-3`}>
                  Small business · technical pathway
                </p>
                <h1 className={`text-2xl sm:text-3xl md:text-[2.15rem] font-bold ${displayInk} tracking-tight leading-[1.2] max-w-2xl`}>
                  Electrical-engineering-grade software for real operators
                </h1>
                <DraftSignalLine light={light} accentIndex={1} />
              </div>
              <p className={`text-sm sm:text-base ${muted} max-w-2xl leading-relaxed`}>
                We operate like an engineering-heavy startup accelerator: help you sharpen the idea, ship the software,
                and stay on call as you grow. Commercial coverage centers on{' '}
                <span className={displayInk}>POS and retail systems</span>,{' '}
                <span className={displayInk}>marketing software</span>, and
                the full web arc from basic sites to full product surfaces—plus hardware-adjacent and field systems in
                environment, health, agriculture, energy, and similar sectors. Scoped work, named deliverables, evidence
                you can file.
              </p>
            </div>
            <div className="shrink-0 w-full max-w-[200px] mx-auto lg:mx-0 opacity-80">
              <ContractSealSvg light={light} className="w-full h-auto" />
            </div>
          </div>

          <TelemetryStrip light={light} />

          <div
            className={`flex flex-col sm:flex-row flex-wrap gap-4 p-6 sm:p-8 rounded-md border-2 ${light ? 'border-stone-400/30 bg-stone-50/90' : 'border-stone-600/30 bg-stone-800/30'} mb-16 sm:mb-20`}
          >
            <p className={`w-full text-[0.65rem] uppercase tracking-[0.28em] ${muted} mb-1`}>Primary actions</p>
            <Link to="/services" className={`inline-flex justify-center px-6 py-3 rounded-md text-sm font-semibold ${primaryBtn}`}>
              Request a scoped engagement
            </Link>
            <Link to="/engineering" className={`inline-flex justify-center px-6 py-3 rounded-md text-sm font-semibold ${secondaryBtn}`}>
              View engineering capabilities
            </Link>
            <Link to="/demo" className={`inline-flex justify-center px-6 py-3 rounded-md text-sm font-semibold ${secondaryBtn}`}>
              Book a technical demo
            </Link>
          </div>

          <section className={`mb-16 sm:mb-20 pb-16 sm:pb-20 border-b ${rule}`}>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <h2 className={`text-[0.65rem] uppercase tracking-[0.28em] ${muted}`}>Objectives</h2>
              <div className="w-full max-w-[200px] sm:max-w-[240px]">
                <MicroSparkline light={light} variant={1} className="w-full h-9" />
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {objectives.map((o, idx) => (
                <li
                  key={o}
                  className={`flex flex-col gap-3 rounded-md border p-4 sm:p-5 ${
                    light
                      ? 'border-stone-400/25 bg-stone-50/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]'
                      : 'border-stone-600/35 bg-stone-800/25'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <AccentCheck light={light} accentIndex={idx % 3} className="w-5 h-5 shrink-0 mt-0.5" />
                    <div className="w-20 shrink-0 opacity-90">
                      <MicroSparkline light={light} variant={idx} className="w-full h-7" />
                    </div>
                  </div>
                  <span className={`text-sm sm:text-[0.9375rem] leading-relaxed ${ink}`}>{o}</span>
                </li>
              ))}
            </ul>
          </section>

          <SectionMicroDivider light={light} variant={2} />

          <div className="mb-12 sm:mb-16 overflow-hidden rounded-sm opacity-80">
            <EngineeringOrnament light={light} className="w-full max-w-2xl h-auto mx-auto sm:hidden" />
          </div>

          <section className={`mb-16 sm:mb-24 pb-16 sm:pb-20 border-b ${rule}`}>
            <h2 className={`text-[0.65rem] uppercase tracking-[0.28em] ${muted} mb-10 sm:mb-12`}>What we deliver</h2>
            <div className="grid gap-12 sm:gap-14 lg:grid-cols-3 lg:gap-16">
              {capabilities.map((block, bi) => (
                <div key={block.head} className="space-y-5">
                  <div className="space-y-3">
                    <h3 className={`text-sm font-semibold ${displayInk} tracking-wide border-b ${rule} pb-2`}>{block.head}</h3>
                    <MicroSpecBars light={light} variant={bi} className="w-28 h-7 opacity-90" />
                  </div>
                  <ul className={`space-y-4 text-xs sm:text-sm ${muted}`}>
                    {block.items.map((item, ii) => (
                      <li key={item} className="flex gap-3 items-start leading-relaxed">
                        <AccentCheck light={light} accentIndex={(bi + ii) % 3} className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <SectionMicroDivider light={light} variant={0} />

          <section className={`mb-16 sm:mb-24 pb-16 sm:pb-20 border-b ${rule}`}>
            <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12 mb-8">
              <div className="lg:w-2/3">
                <h2 className={`text-[0.65rem] uppercase tracking-[0.28em] ${muted} mb-3`}>How we work together</h2>
                <p className={`text-xs sm:text-sm ${muted} leading-relaxed`}>
                  Accelerator-style milestones and demos; integrator-grade systems; long-term ally—not a one-and-done vendor.
                </p>
              </div>
              <div className="lg:w-1/3 lg:pt-6">
                <MicroSpecBars light={light} variant={2} className="w-full max-w-[200px] lg:ml-auto h-10" />
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {workTogether.map((line, idx) => (
                <li
                  key={line}
                  className={`rounded-md border p-4 sm:p-5 flex flex-col gap-3 ${
                    light
                      ? 'border-stone-400/25 bg-white/70'
                      : 'border-stone-600/35 bg-stone-900/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <AccentCheck light={light} accentIndex={idx % 3} className="w-5 h-5 shrink-0" />
                    <MicroSparkline light={light} variant={idx + 1} className="w-16 h-6 shrink-0 opacity-90" />
                  </div>
                  <span className={`text-sm leading-relaxed ${ink}`}>{line}</span>
                </li>
              ))}
            </ul>
          </section>

          <SectionMicroDivider light={light} variant={3} />

          <section className={`mb-16 sm:mb-24 pb-16 sm:pb-20 border-b ${rule}`}>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <h2 className={`text-[0.65rem] uppercase tracking-[0.28em] ${muted} mb-3`}>
                  Privacy-first intelligence &amp; what is next
                </h2>
                <p className={`text-xs sm:text-sm ${muted} max-w-2xl leading-relaxed`}>
                  Research surfaces agents, orchestration, and evaluation tooling—folded in only when production-ready.
                </p>
              </div>
              <div className="w-full max-w-[180px] sm:max-w-[220px]">
                <MicroSparkline light={light} variant={2} className="w-full h-9" />
              </div>
            </div>
            <ul className="grid gap-4 sm:gap-5">
              {intelligenceLayer.map((line, idx) => (
                <li
                  key={line}
                  className={`flex gap-4 items-start rounded-md border p-4 sm:p-4 ${
                    light ? 'border-stone-400/20 bg-stone-50/60' : 'border-stone-600/30 bg-stone-800/20'
                  }`}
                >
                  <AccentCheck light={light} accentIndex={idx % 3} className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1 flex flex-col sm:flex-row sm:items-center sm:gap-6">
                    <span className={`text-sm leading-relaxed flex-1 ${ink}`}>{line}</span>
                    <div className="w-full sm:w-24 shrink-0 mt-3 sm:mt-0">
                      <MicroSpecBars light={light} variant={idx} className="w-full h-6 opacity-80" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <SectionMicroDivider light={light} variant={1} />

          <section className={`mb-16 sm:mb-24 pb-16 sm:pb-20 border-b ${rule}`}>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <h2 className={`text-[0.65rem] uppercase tracking-[0.28em] ${muted} mb-2`}>Example engagements → impact</h2>
                <p className={`text-xs ${muted}`}>Illustrative patterns; every scope is written to your stack.</p>
              </div>
              <MicroSparkline light={light} variant={0} className="w-36 sm:w-44 h-8 shrink-0 opacity-90" />
            </div>
            <div className={`overflow-x-auto rounded-md border ${light ? 'border-stone-400/25' : 'border-stone-600/40'}`}>
              <table className="w-full text-left text-xs sm:text-sm min-w-[640px]">
                <thead>
                  <tr className={theadBg}>
                    <th className={`p-4 sm:p-5 font-semibold ${displayInk} border-b ${rule}`}>Situation</th>
                    <th className={`p-4 sm:p-5 font-semibold ${displayInk} border-b ${rule}`}>Deliverable</th>
                    <th className={`p-4 sm:p-5 font-semibold ${displayInk} border-b ${rule}`}>Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {impactRows.map((row, ri) => (
                    <tr
                      key={row.situation}
                      className={`${light ? (ri % 2 === 0 ? 'bg-white/75' : 'bg-stone-50/90') : ri % 2 === 0 ? 'bg-stone-900/35' : 'bg-stone-900/50'} ${
                        light
                          ? ['border-l-2 border-l-[#ff6b00]/70', 'border-l-2 border-l-amber-900/32', 'border-l-2 border-l-blue-800/22'][
                              ri % 3
                            ]
                          : ['border-l-2 border-l-[#ffb020]/75', 'border-l-2 border-l-amber-400/45', 'border-l-2 border-l-sky-500/22'][ri % 3]
                      }`}
                    >
                      <td className={`p-4 sm:p-5 align-top ${muted} border-b ${rule} max-w-[11rem]`}>{row.situation}</td>
                      <td className={`p-4 sm:p-5 align-top ${ink} border-b ${rule}`}>{row.deliverable}</td>
                      <td className={`p-4 sm:p-5 align-top ${muted} border-b ${rule}`}>{row.impact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={`mb-16 sm:mb-24 pb-16 sm:pb-20 border-b ${rule}`}>
            <h2 className={`text-[0.65rem] uppercase tracking-[0.28em] ${muted} mb-6`}>Engagement shape</h2>
            <PhaseTimelineGraphic light={light} />
            <ul className="space-y-6 sm:space-y-8">
              {phases.map((p, pi) => (
                <li key={p.step} className="flex gap-4 items-start text-sm sm:text-[0.9375rem]">
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                      light
                        ? [
                            'border-blue-800 text-blue-900 bg-blue-50/90',
                            'border-[#ff6b00] text-orange-900 bg-orange-50',
                            'border-amber-900 text-amber-950 bg-amber-50/85',
                            'border-stone-700 text-stone-900 bg-stone-100',
                          ][pi % 4]
                        : [
                            'border-sky-500 text-sky-100 bg-sky-950/55',
                            'border-[#ffb020] text-orange-50 bg-orange-950/55 ring-1 ring-orange-400/30',
                            'border-amber-500 text-amber-100 bg-amber-950/35',
                            'border-stone-500 text-stone-200 bg-stone-800/60',
                          ][pi % 4]
                    }`}
                  >
                    {p.step.charAt(0)}
                  </span>
                  <div>
                    <span className={`font-semibold ${ink}`}>{p.step}</span>
                    <span className={`${muted} block mt-1 leading-relaxed`}>{p.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className={`mb-16 sm:mb-20 pb-16 sm:pb-20 border-b ${rule}`}>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <h2 className={`text-[0.65rem] uppercase tracking-[0.28em] ${muted}`}>Fit checklist</h2>
              <MicroSpecBars light={light} variant={1} className="w-32 h-8 opacity-90" />
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {fit.map((f, idx) => (
                <li
                  key={f}
                  className={`flex gap-3 items-start rounded-md border p-4 ${
                    light ? 'border-stone-400/25 bg-stone-50/70' : 'border-stone-600/35 bg-stone-800/25'
                  }`}
                >
                  <AccentCheck light={light} accentIndex={idx % 3} className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <span className={`text-sm leading-relaxed block ${light ? 'text-stone-700' : 'text-stone-300'}`}>
                      {f}
                    </span>
                    <div className="mt-3 w-full max-w-[140px]">
                      <MicroSparkline light={light} variant={idx} className="w-full h-6 opacity-85" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="pt-4">
            <h2 className={`text-[0.65rem] uppercase tracking-[0.28em] ${muted} mb-8`}>Next step</h2>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <Link to="/services" className={`inline-flex justify-center px-6 py-3 rounded-md text-sm font-semibold ${primaryBtn}`}>
                Open services catalog
              </Link>
              <Link to="/engineering" className={`inline-flex justify-center px-6 py-3 rounded-md text-sm font-semibold ${secondaryBtn}`}>
                Engineering detail
              </Link>
              <Link to="/" className={`inline-flex justify-center px-6 py-3 rounded-md text-sm ${muted} hover:underline`}>
                Home
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SmallBusinessPage;

import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeContext } from '../contexts/AppContext';

const kindBadgeClass = (kind, isDarkMode) => {
    const k = (kind || 'agent').toLowerCase();
    if (k === 'moe') {
        return isDarkMode
            ? 'bg-violet-500/15 text-violet-200 ring-1 ring-violet-400/25'
            : 'bg-violet-600/[0.08] text-violet-900 ring-1 ring-violet-700/20';
    }
    if (k === 'registry') {
        return isDarkMode
            ? 'bg-amber-500/10 text-amber-200/95 ring-1 ring-amber-400/20'
            : 'bg-amber-700/[0.07] text-amber-950 ring-1 ring-amber-800/15';
    }
    return isDarkMode
        ? 'bg-cyan-500/10 text-cyan-200 ring-1 ring-cyan-400/25'
        : 'bg-cyan-800/[0.08] text-cyan-950 ring-1 ring-cyan-800/20';
};

const AgentIntelligenceSection = ({ title = 'Agent Research Capabilities' }) => {
    const { isDarkMode } = React.useContext(ThemeContext);
    const [dataset, setDataset] = useState(null);
    const [loadError, setLoadError] = useState('');
    const [selectedProjectKey, setSelectedProjectKey] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        let mounted = true;
        fetch('/data/agent-intelligence.json')
            .then((res) => res.json())
            .then((data) => {
                if (mounted) {
                    setDataset(data);
                    setLoadError('');
                }
            })
            .catch(() => {
                if (mounted) {
                    setDataset(null);
                    setLoadError('Unable to load the source-validated intelligence registry.');
                }
            });

        return () => {
            mounted = false;
        };
    }, []);

    const projects = useMemo(() => dataset?.projects || [], [dataset]);
    const activeProject = useMemo(
        () => projects.find((p) => p.project_key === selectedProjectKey) || projects[0] || null,
        [projects, selectedProjectKey]
    );
    const agents = useMemo(
        () => activeProject?.hybrid_items || activeProject?.core_agents || [],
        [activeProject]
    );
    const summary = dataset?.summary || {};
    const filteredAgents = agents;

    useEffect(() => {
        if (!selectedProjectKey && projects.length) {
            setSelectedProjectKey(projects[0].project_key);
        }
    }, [projects, selectedProjectKey]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [agents]);

    useEffect(() => {
        if (selectedIndex > filteredAgents.length - 1) {
            setSelectedIndex(0);
        }
    }, [filteredAgents, selectedIndex]);

    const isDark = isDarkMode;
    const frameClass = isDark
        ? 'border-white/[0.12] bg-[linear-gradient(145deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.01)_45%,rgba(0,0,0,0.2)_100%)] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_80px_-24px_rgba(0,0,0,0.85)]'
        : 'border-black/[0.08] bg-[linear-gradient(145deg,rgba(255,255,255,0.95)_0%,rgba(248,250,252,0.98)_50%,rgba(241,245,249,1)_100%)] shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_20px_60px_-20px_rgba(15,23,42,0.12)]';

    const textPrimary = isDark ? 'text-white' : 'text-slate-950';
    const textMuted = isDark ? 'text-slate-400' : 'text-slate-600';
    const textFaint = isDark ? 'text-slate-500' : 'text-slate-500';
    const accentLine = isDark ? 'bg-cyan-400/70' : 'bg-cyan-600/80';

    const selectedAgent = filteredAgents[selectedIndex] || null;
    const hasAgents = filteredAgents.length > 0;

    const handlePrev = () => {
        if (!hasAgents) return;
        setSelectedIndex((prev) => (prev - 1 + filteredAgents.length) % filteredAgents.length);
    };

    const handleNext = () => {
        if (!hasAgents) return;
        setSelectedIndex((prev) => (prev + 1) % filteredAgents.length);
    };

    const evidenceLinesForAgent = (agent) => {
        if (!agent) return null;
        const fromBundle = (agent.evidence_display || []).filter(Boolean);
        if (fromBundle.length) return fromBundle.slice(0, 3);
        const n = Number(agent.source_file_count) || 0;
        if (n > 0) {
            return [
                `${n} corroborating module(s) — filesystem paths are not included in the public artifact.`,
            ];
        }
        return ['No corroboration metadata for this row in the public bundle.'];
    };

    return (
        <section className="mb-20 relative">
            <div
                className={`pointer-events-none absolute inset-0 -z-10 opacity-[0.35] ${isDark ? 'mix-blend-screen' : 'mix-blend-multiply'}`}
                style={{
                    backgroundImage: isDark
                        ? 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(34,211,238,0.14), transparent 55%)'
                        : 'radial-gradient(ellipse 70% 45% at 50% -15%, rgba(14,165,233,0.08), transparent 50%)',
                }}
            />

            <div className="text-center mb-10 max-w-4xl mx-auto px-2">
                <p
                    className={`text-[0.65rem] font-mono uppercase tracking-[0.38em] ${textFaint} mb-3`}
                >
                    Live registry
                </p>
                <h2
                    className={`text-2xl sm:text-3xl font-semibold tracking-tight ${textPrimary} mb-4 font-mono`}
                >
                    {title}
                </h2>
                <p className={`${textMuted} text-sm sm:text-[0.9375rem] leading-relaxed font-mono max-w-3xl mx-auto`}>
                    Source-validated inventory of agents, MoE components, and architecture registries from linked
                    research codebases. Built for client-safe review: corroboration strength, validation tier, and
                    per-project isolation. The public bundle never includes host filesystem paths.
                </p>
            </div>

            <div className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl ${frameClass}`}>
                <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${accentLine}`} aria-hidden />
                <div className="p-6 sm:p-8 pl-7 sm:pl-10">
                    <div className="grid gap-px rounded-xl overflow-hidden sm:grid-cols-2 lg:grid-cols-4 bg-black/[0.06] dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.06]">
                        {[
                            { value: agents.length || 0, label: 'Entries · active project', sub: 'Selectable rows' },
                            {
                                value: activeProject?.hybrid_items?.length || 0,
                                label: 'Project total',
                                sub: activeProject?.project_key || '—',
                            },
                            { value: summary.project_count || 0, label: 'Indexed programs', sub: 'Logical groups' },
                            {
                                value: (dataset?.agents?.length ?? 0) || 0,
                                label: 'Global rows',
                                sub: 'Across all projects',
                            },
                        ].map((cell) => (
                            <div
                                key={cell.label}
                                className={`px-4 py-4 sm:px-5 sm:py-5 ${isDark ? 'bg-slate-950/80' : 'bg-white/90'}`}
                            >
                                <div
                                    className={`text-2xl sm:text-3xl font-mono font-semibold tabular-nums tracking-tight ${textPrimary}`}
                                >
                                    {cell.value}
                                </div>
                                <div className={`mt-1.5 text-[0.65rem] font-mono uppercase tracking-[0.18em] ${textFaint}`}>
                                    {cell.label}
                                </div>
                                <div className={`mt-0.5 text-xs font-mono ${textMuted}`}>{cell.sub}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <div className={`flex items-center gap-2 mb-3 ${textFaint}`}>
                            <span className={`h-px flex-1 max-w-[4rem] ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
                            <span className="text-[0.6rem] font-mono uppercase tracking-[0.28em]">Program</span>
                            <span className={`h-px flex-1 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
                        </div>
                        <div className="overflow-x-auto pb-1 -mx-1 px-1">
                            <div className="flex gap-2 min-w-max">
                                {projects.map((project) => {
                                    const active = activeProject?.project_key === project.project_key;
                                    return (
                                        <button
                                            key={project.project_key}
                                            type="button"
                                            onClick={() => {
                                                setSelectedProjectKey(project.project_key);
                                                setSelectedIndex(0);
                                            }}
                                            className={`snap-start shrink-0 px-4 py-2.5 rounded-lg font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-200 border ${
                                                active
                                                    ? isDark
                                                        ? 'border-cyan-400/50 bg-cyan-500/10 text-cyan-100 shadow-[0_0_24px_-8px_rgba(34,211,238,0.35)]'
                                                        : 'border-cyan-700/35 bg-cyan-50 text-cyan-950 shadow-sm'
                                                    : isDark
                                                      ? 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:bg-white/[0.06]'
                                                      : 'border-slate-200/90 bg-white/60 text-slate-700 hover:border-slate-300 hover:bg-white'
                                            }`}
                                        >
                                            {project.project_key}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className={`flex items-center gap-2 mb-3 ${textFaint}`}>
                            <span className={`h-px flex-1 max-w-[4rem] ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
                            <span className="text-[0.6rem] font-mono uppercase tracking-[0.28em]">Inventory</span>
                            <span className={`h-px flex-1 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
                        </div>
                        <div className="overflow-x-auto pb-1 -mx-1 px-1">
                            <div className="flex gap-2 min-w-max">
                                {filteredAgents.map((agent, index) => {
                                    const active = index === selectedIndex;
                                    return (
                                        <button
                                            type="button"
                                            key={
                                                agent.moe_id ||
                                                agent.agent_type ||
                                                agent.tool_type ||
                                                `${agent.display_name}-${index}`
                                            }
                                            onClick={() => setSelectedIndex(index)}
                                            className={`snap-start shrink-0 max-w-[220px] text-left px-3.5 py-2.5 rounded-lg border font-mono text-[11px] leading-snug transition-all duration-200 ${
                                                active
                                                    ? isDark
                                                        ? 'border-white/25 bg-white/[0.08] text-white ring-1 ring-white/10'
                                                        : 'border-slate-900/15 bg-slate-900/[0.04] text-slate-900 ring-1 ring-slate-900/10'
                                                    : isDark
                                                      ? 'border-white/[0.08] bg-transparent text-slate-400 hover:border-white/20 hover:text-slate-200'
                                                      : 'border-transparent bg-transparent text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                            }`}
                                        >
                                            <span className="block truncate tracking-tight">{agent.display_name}</span>
                                            <span className={`block mt-0.5 text-[9px] uppercase tracking-wider ${textFaint}`}>
                                                {agent.item_kind || 'agent'}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-4">
                        <button
                            type="button"
                            onClick={handlePrev}
                            disabled={!hasAgents}
                            className={`min-w-[7.5rem] px-4 py-2.5 rounded-lg font-mono text-[11px] uppercase tracking-[0.16em] border transition-all duration-200 disabled:opacity-35 disabled:pointer-events-none ${
                                isDark
                                    ? 'border-white/15 text-slate-200 hover:border-cyan-400/40 hover:bg-cyan-500/5'
                                    : 'border-slate-300 text-slate-800 hover:border-slate-900/25 hover:bg-slate-900/[0.03]'
                            }`}
                        >
                            Prev
                        </button>
                        <div className="text-center">
                            <p className={`text-[10px] font-mono uppercase tracking-[0.35em] ${textFaint}`}>Position</p>
                            <p className={`text-sm font-mono tabular-nums ${textPrimary} mt-0.5`}>
                                {hasAgents ? `${String(selectedIndex + 1).padStart(2, '0')} / ${String(filteredAgents.length).padStart(2, '0')}` : '00 / 00'}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={!hasAgents}
                            className={`min-w-[7.5rem] px-4 py-2.5 rounded-lg font-mono text-[11px] uppercase tracking-[0.16em] border transition-all duration-200 disabled:opacity-35 disabled:pointer-events-none ${
                                isDark
                                    ? 'border-white/15 text-slate-200 hover:border-cyan-400/40 hover:bg-cyan-500/5'
                                    : 'border-slate-300 text-slate-800 hover:border-slate-900/25 hover:bg-slate-900/[0.03]'
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                {!hasAgents && (
                    <div
                        className={`rounded-2xl border px-6 py-8 text-center ${isDark ? 'border-white/10 bg-white/[0.02]' : 'border-slate-200 bg-slate-50/80'}`}
                    >
                        <p className={`${textMuted} font-mono text-sm max-w-lg mx-auto leading-relaxed`}>
                            {loadError || 'No registry rows for this program. Rebuild the dataset or select another project.'}
                        </p>
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {selectedAgent && (
                        <motion.div
                            key={`${selectedAgent.moe_id || selectedAgent.agent_type || selectedAgent.tool_type}-${selectedIndex}`}
                            initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -10, filter: 'blur(3px)' }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl mt-6 ${frameClass}`}
                        >
                            <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${accentLine}`} aria-hidden />
                            <div className="p-6 sm:p-8 pl-7 sm:pl-10">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                                    <div className="min-w-0 flex-1">
                                        <p className={`text-[0.6rem] font-mono uppercase tracking-[0.3em] ${textFaint} mb-2`}>
                                            {activeProject?.project_key || '—'}
                                        </p>
                                        <h3 className={`text-xl sm:text-2xl font-semibold tracking-tight ${textPrimary} font-mono break-words`}>
                                            {selectedAgent.display_name}
                                        </h3>
                                        {selectedAgent.moe_id && (
                                            <p className={`mt-2 font-mono text-[10px] sm:text-xs ${textMuted} truncate`} title={selectedAgent.moe_id}>
                                                ID · {selectedAgent.moe_id}
                                            </p>
                                        )}
                                    </div>
                                    <span
                                        className={`shrink-0 self-start text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1.5 rounded-md ${kindBadgeClass(selectedAgent.item_kind, isDark)}`}
                                    >
                                        {selectedAgent.item_kind || 'agent'}
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
                                    {[
                                        { v: selectedAgent.source_file_count ?? 0, l: 'Corroboration depth' },
                                        { v: selectedAgent.evidence_score ?? 0, l: 'Weight score' },
                                        { v: selectedAgent.confidence || '—', l: 'Validation' },
                                    ].map((cell) => (
                                        <div
                                            key={cell.l}
                                            className={`rounded-xl border px-3 py-3 sm:px-4 sm:py-4 ${isDark ? 'border-white/[0.08] bg-white/[0.03]' : 'border-slate-200/80 bg-white/70'}`}
                                        >
                                            <div className={`text-lg sm:text-xl font-mono font-semibold tabular-nums ${textPrimary}`}>
                                                {cell.v}
                                            </div>
                                            <div className={`mt-1 text-[0.6rem] font-mono uppercase tracking-[0.16em] ${textFaint}`}>{cell.l}</div>
                                        </div>
                                    ))}
                                </div>

                                {(selectedAgent.primary_labs || []).length > 0 && (
                                    <div className="mb-6">
                                        <p className={`text-[0.6rem] font-mono uppercase tracking-[0.22em] ${textFaint} mb-2`}>Labs</p>
                                        <div className="flex flex-wrap gap-2">
                                            {(selectedAgent.primary_labs || []).map((lab) => (
                                                <span
                                                    key={lab}
                                                    className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md ${
                                                        isDark ? 'bg-white/10 text-slate-200 ring-1 ring-white/10' : 'bg-slate-900/[0.06] text-slate-800 ring-1 ring-slate-900/10'
                                                    }`}
                                                >
                                                    {lab}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className={`space-y-4 border-t pt-6 ${isDark ? 'border-white/[0.08]' : 'border-slate-200/90'}`}>
                                    {!!(selectedAgent.description_samples || []).length && (
                                        <div>
                                            <p className={`text-[0.6rem] font-mono uppercase tracking-[0.22em] ${textFaint} mb-1.5`}>Summary</p>
                                            <p className={`text-sm font-mono leading-relaxed ${textMuted}`}>{(selectedAgent.description_samples || [])[0]}</p>
                                        </div>
                                    )}
                                    {!!(selectedAgent.what_they_do || []).length && (
                                        <div>
                                            <p className={`text-[0.6rem] font-mono uppercase tracking-[0.22em] ${textFaint} mb-1.5`}>Role</p>
                                            <p className={`text-sm font-mono leading-relaxed ${textMuted}`}>{(selectedAgent.what_they_do || [])[0]}</p>
                                        </div>
                                    )}
                                    {!!(selectedAgent.accomplishments || []).length && (
                                        <div>
                                            <p className={`text-[0.6rem] font-mono uppercase tracking-[0.22em] ${textFaint} mb-1.5`}>Outcome</p>
                                            <p className={`text-sm font-mono leading-relaxed ${textMuted}`}>{(selectedAgent.accomplishments || [])[0]}</p>
                                        </div>
                                    )}
                                    <div>
                                        <p className={`text-[0.6rem] font-mono uppercase tracking-[0.22em] ${textFaint} mb-1.5`}>
                                            Corroboration (public bundle)
                                        </p>
                                        <ul className="space-y-1">
                                            {evidenceLinesForAgent(selectedAgent).map((line, idx) => (
                                                <li
                                                    key={`${idx}-${line.slice(0, 48)}`}
                                                    className={`font-mono text-[10px] sm:text-[11px] ${textMuted} leading-snug`}
                                                >
                                                    {line}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default AgentIntelligenceSection;

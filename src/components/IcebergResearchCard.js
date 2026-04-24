import React from 'react';
import { ThemeContext } from '../contexts/AppContext';

// Real ICEBURG Research Card Component
const IcebergResearchCard = ({ study }) => {
    const { isDarkMode } = React.useContext(ThemeContext);

    const textColorClass = isDarkMode ? 'text-white' : 'text-black';
    const mutedTextColorClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
    const cardBgColorClass = isDarkMode ? 'bg-white/5' : 'bg-black/5';
    const borderColorClass = isDarkMode ? 'border-white/10' : 'border-black/10';
    const hoverBorderColorClass = isDarkMode ? 'hover:border-white/30' : 'hover:border-black/30';
    const hoverBgColorClass = isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10';

    // Determine badge color based on status
    const getStatusBadge = (status) => {
        const colors = {
            'Active': isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-500/10 text-green-600',
            'Documented': isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/10 text-blue-600',
            'Hypothesis': isDarkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-500/10 text-yellow-600'
        };
        return colors[status] || (isDarkMode ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-500/10 text-gray-600');
    };

    // Determine confidence badge color
    const getConfidenceBadge = (confidence) => {
        if (confidence >= 0.9) return isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-500/10 text-green-600';
        if (confidence >= 0.8) return isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/10 text-blue-600';
        return isDarkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-500/10 text-yellow-600';
    };

    return (
        <div className={`${cardBgColorClass} backdrop-blur-sm border ${borderColorClass} rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${hoverBorderColorClass} ${hoverBgColorClass} group cursor-pointer`}>
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <h3 className={`text-lg font-bold ${textColorClass} font-mono leading-tight flex-1 pr-2`}>
                    {study.title}
                </h3>
                <span className={`text-xs px-2 py-1 rounded ${getStatusBadge(study.status)} font-mono flex-shrink-0`}>
                    {study.status}
                </span>
            </div>

            {/* Lab & Date */}
            <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs ${mutedTextColorClass} font-mono`}>
                    🔬 {study.lab}
                </span>
                <span className={`text-xs ${mutedTextColorClass} font-mono`}>
                    📅 {study.date}
                </span>
            </div>

            {/* Abstract */}
            <p className={`text-sm ${mutedTextColorClass} leading-relaxed mb-4 font-mono line-clamp-3`}>
                {study.abstract}
            </p>

            {/* Metrics Section */}
            {study.key_findings && (
                <div className="mb-4 space-y-2">
                    <h4 className={`text-xs font-bold ${textColorClass} font-mono mb-2`}>Key Findings:</h4>
                    {study.key_findings.slice(0, 2).map((finding, idx) => (
                        <div key={idx} className={`text-xs ${mutedTextColorClass} font-mono flex items-start gap-2`}>
                            <span className={`${textColorClass} flex-shrink-0`}>•</span>
                            <span className="line-clamp-1">{finding}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Confidence Score */}
            {study.confidence && (
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs ${mutedTextColorClass} font-mono`}>Confidence</span>
                        <span className={`text-xs px-2 py-1 rounded ${getConfidenceBadge(study.confidence)} font-mono`}>
                            {(study.confidence * 100).toFixed(0)}%
                        </span>
                    </div>
                    <div className={`w-full h-1 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${study.confidence >= 0.9 ? 'bg-green-500' :
                                study.confidence >= 0.8 ? 'bg-blue-500' :
                                    'bg-yellow-500'
                                }`}
                            style={{ width: `${study.confidence * 100}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Domains */}
            {study.domains && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {study.domains.slice(0, 3).map((domain, idx) => (
                        <span
                            key={idx}
                            className={`text-xs px-2 py-1 rounded ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} ${textColorClass} font-mono`}
                        >
                            {domain.replace(/_/g, ' ')}
                        </span>
                    ))}
                </div>
            )}

            {/* Footer - View in ICEBURG Button */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className={`text-xs ${mutedTextColorClass} font-mono`}>
                    {study.agents_involved ? `${study.agents_involved.length} agents` : 'Multi-agent research'}
                </span>
                <a
                    href={study.iceburg_link || 'https://1cebrg.com/research.html'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs ${textColorClass} hover:${isDarkMode ? 'text-white' : 'text-black'} transition-colors font-mono font-semibold flex items-center gap-1 group-hover:gap-2 transition-all`}
                    onClick={(e) => e.stopPropagation()}
                >
                    View in ICEBURG
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default IcebergResearchCard;

import React from 'react';
import { ThemeContext } from '../App';

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative ${className}`}>
    <div className="max-w-4xl mx-auto relative z-10">
      {children}
    </div>
  </section>
);

const SectionTitle = ({ children, className = "" }) => (
  <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-mono font-bold text-center text-white tracking-tight mb-6 ${className}`}>
    {children}
  </h2>
);

const SectionSubtitle = ({ children, className = "" }) => (
  <p className={`mt-4 max-w-2xl mx-auto text-center text-sm md:text-base text-gray-400 leading-relaxed font-mono ${className}`}>
    {children}
  </p>
);

const CaseStudies = () => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const studies = [
    {
      title: "Algorithm Research",
      improvement: "95%",
      field: "efficiency gain",
      color: "white",
      gradient: isDarkMode ? "from-white/10 to-white/5" : "from-black/10 to-black/5"
    },
    {
      title: "Neural Networks",
      improvement: "400%",
      field: "performance boost",
      color: "white",
      gradient: isDarkMode ? "from-white/10 to-white/5" : "from-black/10 to-black/5"
    },
    {
      title: "Development",
      improvement: "75%",
      field: "faster iteration",
      color: "white",
      gradient: isDarkMode ? "from-white/10 to-white/5" : "from-black/10 to-black/5"
    },
  ];

  const bgColorClass = isDarkMode ? 'bg-black' : 'bg-white';
  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const borderColorClass = isDarkMode ? 'border-white/20' : 'border-black/20';
  const cardBgColorClass = isDarkMode ? 'bg-white/5' : 'bg-black/5';
  const hoverBorderColorClass = isDarkMode ? 'hover:border-white/40' : 'hover:border-black/40';
  const hoverBgColorClass = isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10';
  const mutedTextColorClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const descriptionTextColorClass = isDarkMode ? 'text-gray-500' : 'text-gray-700';

  return (
    <Section id="casestudies" className={bgColorClass}>
      <SectionTitle className={textColorClass}>Research Outcomes</SectionTitle>
      <SectionSubtitle className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
        Measurable results from our research and development initiatives.
      </SectionSubtitle>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {studies.map((study, index) => (
          <div
            key={study.title}
            className={`group relative border-t ${borderColorClass} ${cardBgColorClass} backdrop-blur-sm rounded-xl p-6 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${hoverBorderColorClass} ${hoverBgColorClass} overflow-hidden`}
          >
            {/* Animated background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

            <h3 className={`text-lg font-bold ${textColorClass} mb-4 group-hover:${textColorClass} transition-colors duration-300 font-mono`}>
              {study.title}
            </h3>

            <p className={`text-4xl font-bold mb-2 ${textColorClass}`}>
              {study.improvement}
            </p>

            <p className={`${mutedTextColorClass} text-sm mb-4 font-mono`}>{study.field}</p>

            <p className={`${descriptionTextColorClass} leading-relaxed font-mono text-sm`}>
              Research breakthrough demonstrating significant performance improvements.
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default CaseStudies;

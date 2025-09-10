import React from 'react';
import { ThemeContext } from '../contexts/AppContext';

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

const Services = () => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const services = [
    {
      title: "Algorithm Research",
      features: ["Neural network optimization", "Quantum algorithm design", "Pattern recognition"],
      gradient: isDarkMode ? "from-white/10 to-white/5" : "from-black/10 to-black/5"
    },
    {
      title: "Development Platform",
      features: ["High-performance computing", "Distributed processing", "Real-time analytics"],
      gradient: isDarkMode ? "from-white/10 to-white/5" : "from-black/10 to-black/5"
    },
    {
      title: "Innovation Lab",
      features: ["Research & development", "Prototype development", "Technology integration"],
      gradient: isDarkMode ? "from-white/10 to-white/5" : "from-black/10 to-black/5"
    },
  ];

  const bgColorClass = isDarkMode ? 'bg-black' : 'bg-white';
  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColorClass = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const hoverTextColorClass = isDarkMode ? 'hover:text-white' : 'hover:text-black';
  const cardBgColorClass = isDarkMode ? 'bg-white/5' : 'bg-black/5';
  const cardBorderColorClass = isDarkMode ? 'border-white/10' : 'border-black/10';
  const hoverBorderColorClass = isDarkMode ? 'hover:border-white/30' : 'hover:border-black/30';
  const hoverBgColorClass = isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10';
  const shadowColorClass = isDarkMode ? 'hover:shadow-white/10' : 'hover:shadow-black/10';
  const checkmarkBgColorClass = isDarkMode ? 'bg-white/20' : 'bg-black/20';
  const checkmarkHoverBgColorClass = isDarkMode ? 'group-hover/item:bg-white/30' : 'group-hover/item:bg-black/30';
  const buttonBgColorClass = isDarkMode ? 'bg-white/10' : 'bg-black/10';
  const buttonHoverBgColorClass = isDarkMode ? 'hover:bg-white/20' : 'hover:bg-black/20';
  const buttonBorderColorClass = isDarkMode ? 'border-white/20' : 'border-black/20';

  return (
    <Section id="services" className={bgColorClass}>
      <SectionTitle className={textColorClass}>Development Platform</SectionTitle>
      <SectionSubtitle className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
        Modular tools for research and development challenges.
      </SectionSubtitle>

      <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={service.title}
            className={`group relative ${cardBgColorClass} backdrop-blur-sm border ${cardBorderColorClass} rounded-xl p-8 flex flex-col transform transition-all duration-500 hover:-translate-y-2 ${hoverBorderColorClass} ${hoverBgColorClass} hover:shadow-2xl ${shadowColorClass} overflow-hidden`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {/* Animated background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

            <h3 className={`text-xl font-bold ${textColorClass} mb-6 group-hover:${textColorClass} transition-colors duration-300 font-mono`}>
              {service.title}
            </h3>

            <ul className={`space-y-4 ${mutedTextColorClass} flex-grow`}>
              {service.features.map(feature => (
                <li key={feature} className="flex items-start group/item">
                  <div className={`flex-shrink-0 h-5 w-5 rounded-full ${checkmarkBgColorClass} flex items-center justify-center mr-3 mt-0.5 ${checkmarkHoverBgColorClass} transition-colors duration-300`}>
                    <svg className={`h-3 w-3 ${textColorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className={`group-hover/item:${textColorClass} transition-colors duration-300 font-mono text-sm`}>{feature}</span>
                </li>
              ))}
            </ul>

            <a href="#services" className={`mt-6 block text-center ${buttonBgColorClass} backdrop-blur-sm ${textColorClass} px-6 py-3 rounded-lg font-semibold ${buttonHoverBgColorClass} transition-all duration-300 transform hover:scale-105 font-mono text-sm ${buttonBorderColorClass}`}>
              Learn More
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Services;

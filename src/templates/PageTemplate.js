import React from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../contexts/AppContext';
import { Header, Footer } from '../components/Layout';
import { SEO, usePageSEO } from '../components/SEO';
import { OptimizedMotion, OptimizedHover } from '../components/OptimizedAnimations';
import { LoadingOverlay } from '../components/LoadingStates';
import { useApp } from '../contexts/AppContext';

// Reusable Page Template Component
export const PageTemplate = ({ 
  children, 
  pageKey,
  title,
  description,
  keywords,
  structuredData,
  isLoading = false,
  loadingMessage = "Loading...",
  className = "",
  showHeader = true,
  showFooter = true
}) => {
  const { state } = useApp();
  const { isDarkMode } = state.theme;
  const bgColor = isDarkMode ? 'bg-black' : 'bg-white';
  
  // Get page-specific SEO config
  const seoConfig = usePageSEO(pageKey);
  
  // Merge with custom SEO data
  const finalSEO = {
    ...seoConfig,
    title: title || seoConfig.title,
    description: description || seoConfig.description,
    keywords: keywords || seoConfig.keywords,
    structuredData: structuredData || seoConfig.structuredData
  };

  return (
    <div className={`min-h-screen ${bgColor} relative ${className}`}>
      <SEO {...finalSEO} />
      
      {showHeader && <Header />}
      
      <LoadingOverlay isLoading={isLoading} message={loadingMessage}>
        <main className={showHeader ? 'pt-16' : ''}>
          {children}
        </main>
      </LoadingOverlay>
      
      {showFooter && <Footer />}
    </div>
  );
};

// Section Template for consistent spacing and animations
export const SectionTemplate = ({ 
  children, 
  className = "",
  id,
  animate = true,
  delay = 0
}) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const bgColor = isDarkMode ? 'bg-black' : 'bg-white';
  
  if (!animate) {
    return (
      <section id={id} className={`py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative ${bgColor} ${className}`}>
        <div className="max-w-6xl mx-auto relative z-10">
          {children}
        </div>
      </section>
    );
  }

  return (
    <OptimizedMotion
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative ${bgColor} ${className}`}
    >
      <section id={id} className="max-w-6xl mx-auto relative z-10">
        {children}
      </section>
    </OptimizedMotion>
  );
};

// Content Block Template for consistent content styling
export const ContentBlock = ({ 
  title,
  subtitle,
  children,
  className = "",
  titleSize = "text-3xl md:text-4xl lg:text-5xl",
  subtitleSize = "text-base md:text-lg"
}) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`text-center mb-12 ${className}`}>
      {title && (
        <OptimizedMotion
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className={`${titleSize} font-mono font-bold ${textColor} tracking-tight leading-tight mb-4`}>
            {title}
          </h1>
        </OptimizedMotion>
      )}
      
      {subtitle && (
        <OptimizedMotion
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className={`max-w-3xl mx-auto ${subtitleSize} ${mutedTextColor} leading-relaxed font-mono`}>
            {subtitle}
          </p>
        </OptimizedMotion>
      )}
      
      <OptimizedMotion
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {children}
      </OptimizedMotion>
    </div>
  );
};

// Card Grid Template for consistent card layouts
export const CardGrid = ({ 
  children, 
  columns = 3,
  className = "",
  gap = "gap-6"
}) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <div className={`grid ${gridCols[columns]} ${gap} ${className}`}>
      {children}
    </div>
  );
};

// Feature Card Template
export const FeatureCard = ({ 
  title,
  description,
  icon,
  features = [],
  index = 0,
  className = ""
}) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDarkMode ? 'bg-white/5' : 'bg-black/5';
  const borderColor = isDarkMode ? 'border-white/10' : 'border-black/10';
  const hoverBorderColor = isDarkMode ? 'hover:border-white/30' : 'hover:border-black/30';
  const hoverBg = isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10';
  const iconBg = isDarkMode ? 'bg-white/10' : 'bg-black/10';

  // Default professional icon if none provided
  const defaultIcon = (
    <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center mb-4`}>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    </div>
  );

  return (
    <OptimizedHover
      className={`${cardBg} backdrop-blur-sm border ${borderColor} rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${hoverBorderColor} ${hoverBg} ${className}`}
      hoverScale={1.02}
      hoverY={-4}
    >
      <OptimizedMotion
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        {icon ? (
          <div className="mb-4">
            {icon}
          </div>
        ) : (
          defaultIcon
        )}
        
        <h3 className={`text-xl font-bold ${textColor} mb-3 font-mono`}>
          {title}
        </h3>
        
        <p className={`${mutedTextColor} mb-4 leading-relaxed font-mono text-sm`}>
          {description}
        </p>
        
        {features.length > 0 && (
          <ul className="space-y-2">
            {features.map((feature, featureIndex) => (
              <li key={featureIndex} className={`flex items-start ${mutedTextColor} group/item`}>
                <div className={`flex-shrink-0 h-4 w-4 rounded-full ${isDarkMode ? 'bg-white/15' : 'bg-black/15'} flex items-center justify-center mr-3 mt-0.5 ${isDarkMode ? 'group-hover/item:bg-white/25' : 'group-hover/item:bg-black/25'} transition-colors duration-300`}>
                  <svg className={`h-2.5 w-2.5 ${textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className={`group-hover/item:${textColor} transition-colors duration-300 font-mono text-xs`}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        )}
      </OptimizedMotion>
    </OptimizedHover>
  );
};

// Stats Grid Template
export const StatsGrid = ({ 
  stats = [],
  columns = 4,
  className = ""
}) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`grid grid-cols-2 md:grid-cols-${columns} gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <OptimizedMotion
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="text-center"
        >
          <div className={`text-3xl md:text-4xl font-bold ${textColor} mb-2 font-mono`}>
            {stat.value}
          </div>
          <div className={`text-sm ${mutedTextColor} font-mono`}>
            {stat.label}
          </div>
        </OptimizedMotion>
      ))}
    </div>
  );
};

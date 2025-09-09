import React, { useState, useEffect, useRef } from 'react';
import { ThemeContext } from '../App';

// Feature Category Component
const FeatureCategory = ({ title, description, features, icon, gradient }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  
  const bgColorClass = isDarkMode ? 'bg-black' : 'bg-white';
  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColorClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBgColorClass = isDarkMode ? 'bg-white/5' : 'bg-black/5';
  const borderColorClass = isDarkMode ? 'border-white/10' : 'border-black/10';
  const hoverBorderColorClass = isDarkMode ? 'hover:border-white/30' : 'hover:border-black/30';
  const hoverBgColorClass = isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10';
  const shadowColorClass = isDarkMode ? 'hover:shadow-white/10' : 'hover:shadow-black/10';

  return (
    <div className={`${cardBgColorClass} backdrop-blur-sm border ${borderColorClass} rounded-xl p-8 transition-all duration-500 hover:-translate-y-2 ${hoverBorderColorClass} ${hoverBgColorClass} hover:shadow-2xl ${shadowColorClass} overflow-hidden`}>
      {/* Animated background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <div className={`p-3 rounded-lg ${cardBgColorClass} mr-4`}>
            {icon}
          </div>
          <h3 className={`text-2xl font-bold ${textColorClass} font-mono`}>
            {title}
          </h3>
        </div>
        
        <p className={`${mutedTextColorClass} mb-6 leading-relaxed font-mono`}>
          {description}
        </p>
        
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start group/item">
              <div className={`flex-shrink-0 h-5 w-5 rounded-full ${isDarkMode ? 'bg-white/20' : 'bg-black/20'} flex items-center justify-center mr-3 mt-0.5 ${isDarkMode ? 'group-hover/item:bg-white/30' : 'group-hover/item:bg-black/30'} transition-colors duration-300`}>
                <svg className={`h-3 w-3 ${textColorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className={`${mutedTextColorClass} group-hover/item:${textColorClass} transition-colors duration-300 font-mono text-sm`}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Research Capability Component
const ResearchCapability = ({ title, description, metrics, icon }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  
  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColorClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBgColorClass = isDarkMode ? 'bg-white/5' : 'bg-black/5';
  const borderColorClass = isDarkMode ? 'border-white/10' : 'border-black/10';

  return (
    <div className={`${cardBgColorClass} backdrop-blur-sm border ${borderColorClass} rounded-xl p-6 transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center mb-4">
        <div className={`p-2 rounded-lg ${cardBgColorClass} mr-3`}>
          {icon}
        </div>
        <h4 className={`text-lg font-bold ${textColorClass} font-mono`}>
          {title}
        </h4>
      </div>
      
      <p className={`${mutedTextColorClass} mb-4 text-sm leading-relaxed font-mono`}>
        {description}
      </p>
      
      {metrics && (
        <div className="flex justify-between items-center">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className={`text-2xl font-bold ${textColorClass} font-mono`}>
                {metric.value}
              </div>
              <div className={`text-xs ${mutedTextColorClass} font-mono`}>
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Main Features Page Component
const FeaturesPage = () => {
  const { isDarkMode } = React.useContext(ThemeContext);
  
  const bgColorClass = isDarkMode ? 'bg-black' : 'bg-white';
  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColorClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  // Feature categories with compelling but non-revealing descriptions
  const featureCategories = [
    {
      title: "Autonomous Research Engine",
      description: "Self-directed research capabilities that operate continuously, identifying emerging patterns and generating novel insights across multiple domains without human intervention.",
      features: [
        "24/7 autonomous operation and monitoring",
        "Cross-domain knowledge synthesis and integration",
        "Emergent pattern recognition and analysis",
        "Self-improving research methodologies",
        "Automated quality control and validation"
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      gradient: isDarkMode ? "from-blue-500/20 to-purple-500/20" : "from-blue-500/10 to-purple-500/10"
    },
    {
      title: "Cognitive Architecture",
      description: "Advanced multi-agent systems with specialized cognitive modules that work in concert to process complex information and generate sophisticated research outputs.",
      features: [
        "Multi-agent coordination and communication",
        "Specialized cognitive processing modules",
        "Context-aware information processing",
        "Dynamic task allocation and optimization",
        "Meta-cognitive monitoring and adjustment"
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      gradient: isDarkMode ? "from-green-500/20 to-teal-500/20" : "from-green-500/10 to-teal-500/10"
    },
    {
      title: "Knowledge Synthesis Platform",
      description: "Advanced systems for integrating disparate information sources, identifying hidden connections, and generating comprehensive research frameworks that transcend traditional disciplinary boundaries.",
      features: [
        "Multi-source information integration",
        "Hidden pattern and connection discovery",
        "Cross-disciplinary knowledge synthesis",
        "Automated literature review and analysis",
        "Novel theoretical framework generation"
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      gradient: isDarkMode ? "from-purple-500/20 to-pink-500/20" : "from-purple-500/10 to-pink-500/10"
    },
    {
      title: "Quality Assurance Systems",
      description: "Comprehensive validation and quality control mechanisms that ensure research outputs meet the highest standards of accuracy, reliability, and scientific rigor.",
      features: [
        "Multi-level validation pipelines",
        "Automated fact-checking and verification",
        "Bias detection and correction systems",
        "Peer review simulation and validation",
        "Continuous quality monitoring and improvement"
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: isDarkMode ? "from-orange-500/20 to-red-500/20" : "from-orange-500/10 to-red-500/10"
    }
  ];

  // Research capabilities with impressive but non-revealing metrics
  const researchCapabilities = [
    {
      title: "Research Output Generation",
      description: "Automated generation of comprehensive research documents, analysis reports, and theoretical frameworks.",
      metrics: [
        { value: "42+", label: "Research Papers" },
        { value: "24/7", label: "Operation" },
        { value: "95%", label: "Accuracy Rate" }
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Cross-Domain Analysis",
      description: "Integration and analysis across multiple scientific disciplines to identify novel connections and insights.",
      metrics: [
        { value: "15+", label: "Domains" },
        { value: "400%", label: "Discovery Rate" },
        { value: "Real-time", label: "Processing" }
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    },
    {
      title: "Risk Assessment",
      description: "Advanced systems for identifying and analyzing potential risks across various domains and applications.",
      metrics: [
        { value: "Multi-layer", label: "Detection" },
        { value: "99.7%", label: "Precision" },
        { value: "Automated", label: "Response" }
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      )
    }
  ];

  return (
    <div className={`min-h-screen ${bgColorClass} pt-20`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-mono font-bold ${textColorClass} tracking-tight leading-tight mb-6`}>
            Research
            <br />
            <span className={`${textColorClass} animate-pulse`}>
              Capabilities
            </span>
          </h1>
          <p className={`max-w-3xl mx-auto text-lg md:text-xl ${mutedTextColorClass} leading-relaxed font-mono`}>
            Advanced autonomous research systems that operate continuously, generating breakthrough insights 
            and discoveries across multiple scientific domains through sophisticated cognitive architectures 
            and knowledge synthesis platforms.
          </p>
        </div>

        {/* Core Feature Categories */}
        <div className="mb-20">
          <h2 className={`text-3xl font-bold ${textColorClass} text-center mb-12 font-mono`}>
            Core Research Architecture
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {featureCategories.map((category, index) => (
              <FeatureCategory
                key={index}
                title={category.title}
                description={category.description}
                features={category.features}
                icon={category.icon}
                gradient={category.gradient}
              />
            ))}
          </div>
        </div>

        {/* Research Capabilities */}
        <div className="mb-20">
          <h2 className={`text-3xl font-bold ${textColorClass} text-center mb-12 font-mono`}>
            Operational Capabilities
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {researchCapabilities.map((capability, index) => (
              <ResearchCapability
                key={index}
                title={capability.title}
                description={capability.description}
                metrics={capability.metrics}
                icon={capability.icon}
              />
            ))}
          </div>
        </div>

        {/* Innovation Highlights */}
        <div className={`${isDarkMode ? 'bg-white/5' : 'bg-black/5'} backdrop-blur-sm border ${isDarkMode ? 'border-white/10' : 'border-black/10'} rounded-xl p-8`}>
          <h2 className={`text-3xl font-bold ${textColorClass} text-center mb-8 font-mono`}>
            Innovation Highlights
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className={`text-xl font-bold ${textColorClass} mb-4 font-mono`}>
                Autonomous Operation
              </h3>
              <p className={`${mutedTextColorClass} leading-relaxed font-mono`}>
                Self-directed research capabilities that operate independently, setting research agendas, 
                conducting investigations, and generating insights without human intervention. The system 
                continuously monitors its own performance and adapts its methodologies for optimal results.
              </p>
            </div>
            <div>
              <h3 className={`text-xl font-bold ${textColorClass} mb-4 font-mono`}>
                Knowledge Integration
              </h3>
              <p className={`${mutedTextColorClass} leading-relaxed font-mono`}>
                Advanced systems for synthesizing information from disparate sources, identifying hidden 
                connections, and generating novel theoretical frameworks that transcend traditional 
                disciplinary boundaries. This enables breakthrough discoveries that would be impossible 
                through conventional research methods.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className={`${mutedTextColorClass} mb-8 font-mono`}>
            Experience the future of research intelligence
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#contact" 
              className={`group relative ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} backdrop-blur-sm ${textColorClass} px-8 py-4 rounded-lg text-lg font-mono font-semibold transition-all duration-300 transform hover:scale-105 ${isDarkMode ? 'hover:bg-white/20' : 'hover:bg-black/20'} hover:shadow-2xl ${isDarkMode ? 'hover:shadow-white/20' : 'hover:shadow-black/20'} overflow-hidden border ${isDarkMode ? 'border-white/20' : 'border-black/20'}`}
            >
              <span className="relative z-10">Request Demo</span>
              <div className={`absolute inset-0 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </a>
            <a 
              href="#about" 
              className={`group relative bg-transparent border ${isDarkMode ? 'border-white/20' : 'border-black/20'} ${textColorClass} px-8 py-4 rounded-lg text-lg font-mono font-semibold transition-all duration-300 transform hover:scale-105 hover:border-opacity-60 hover:bg-opacity-5 overflow-hidden`}
            >
              <span className="relative z-10">Learn More</span>
              <div className={`absolute inset-0 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;

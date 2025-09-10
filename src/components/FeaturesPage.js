import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ThemeContext } from '../contexts/AppContext';

// Feature Category Component with Advanced Animations
const FeatureCategory = ({ title, description, features, icon, gradient, index }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const bgColorClass = isDarkMode ? 'bg-black' : 'bg-white';
  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColorClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBgColorClass = isDarkMode ? 'bg-white/3' : 'bg-black/3';
  const borderColorClass = isDarkMode ? 'border-white/5' : 'border-black/5';
  const hoverBorderColorClass = isDarkMode ? 'hover:border-white/20' : 'hover:border-black/20';
  const hoverBgColorClass = isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5';
  const shadowColorClass = isDarkMode ? 'hover:shadow-white/5' : 'hover:shadow-black/5';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className={`group relative ${cardBgColorClass} backdrop-blur-xl border ${borderColorClass} rounded-2xl p-6 transition-all duration-500 ${hoverBorderColorClass} ${hoverBgColorClass} hover:shadow-2xl ${shadowColorClass} overflow-hidden`}
    >
      {/* Animated background with glassmorphism */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0`}
        whileHover={{ opacity: 0.1 }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Floating particles effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${isDarkMode ? 'bg-white/30' : 'bg-black/30'} rounded-full`}
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>
      
      <div className="relative z-10">
        <motion.div 
          className="flex items-center mb-4"
          initial={{ x: -20, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
        >
          <motion.div 
            className={`p-2 rounded-xl ${cardBgColorClass} mr-3`}
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
          <h3 className={`text-xl font-bold ${textColorClass} font-mono`}>
            {title}
          </h3>
        </motion.div>
        
        <motion.p 
          className={`${mutedTextColorClass} mb-5 leading-relaxed font-mono text-sm`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
        >
          {description}
        </motion.p>
        
        <div className="space-y-3">
          {features.map((feature, featureIndex) => (
            <motion.div 
              key={featureIndex} 
              className="flex items-start group/item"
              initial={{ x: -20, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ 
                delay: index * 0.1 + 0.4 + featureIndex * 0.1, 
                duration: 0.4 
              }}
            >
              <motion.div 
                className={`flex-shrink-0 h-4 w-4 rounded-full ${isDarkMode ? 'bg-white/15' : 'bg-black/15'} flex items-center justify-center mr-3 mt-0.5 ${isDarkMode ? 'group-hover/item:bg-white/25' : 'group-hover/item:bg-black/25'} transition-colors duration-300`}
                whileHover={{ scale: 1.2, rotate: 180 }}
                transition={{ duration: 0.2 }}
              >
                <svg className={`h-2.5 w-2.5 ${textColorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <span className={`${mutedTextColorClass} group-hover/item:${textColorClass} transition-colors duration-300 font-mono text-xs`}>
                {feature}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Research Capability Component with Subtle Animations
const ResearchCapability = ({ title, description, metrics, icon, index }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColorClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBgColorClass = isDarkMode ? 'bg-white/2' : 'bg-black/2';
  const borderColorClass = isDarkMode ? 'border-white/5' : 'border-black/5';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
      className={`${cardBgColorClass} backdrop-blur-xl border ${borderColorClass} rounded-xl p-5 transition-all duration-300`}
    >
      <motion.div 
        className="flex items-center mb-3"
        initial={{ x: -10, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
        transition={{ delay: index * 0.1 + 0.1, duration: 0.4 }}
      >
        <motion.div 
          className={`p-1.5 rounded-lg ${cardBgColorClass} mr-3`}
          whileHover={{ rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.div>
        <h4 className={`text-base font-bold ${textColorClass} font-mono`}>
          {title}
        </h4>
      </motion.div>
      
      <motion.p 
        className={`${mutedTextColorClass} mb-3 text-xs leading-relaxed font-mono`}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
      >
        {description}
      </motion.p>
      
      {metrics && (
        <motion.div 
          className="flex justify-between items-center"
          initial={{ y: 10, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
        >
          {metrics.map((metric, metricIndex) => (
            <motion.div 
              key={metricIndex} 
              className="text-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`text-xl font-bold ${textColorClass} font-mono`}>
                {metric.value}
              </div>
              <div className={`text-xs ${mutedTextColorClass} font-mono`}>
                {metric.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

// Main Features Page Component with Advanced Effects
const FeaturesPage = () => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColorClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  
  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

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
    <div ref={containerRef} className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-white'} pt-20 pb-48 relative`}>
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 opacity-5 -z-10"
        style={{ y }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 0%, transparent 50%),
                          radial-gradient(circle at 80% 80%, ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 0%, transparent 50%)`,
          backgroundSize: '400px 400px'
        }}></div>
      </motion.div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header Section with Advanced Animations */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className={`text-3xl md:text-4xl lg:text-5xl font-mono font-bold ${textColorClass} tracking-tight leading-tight mb-4`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Research
            <br />
            <motion.span 
              className={`${textColorClass}`}
              animate={{ 
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Capabilities
            </motion.span>
          </motion.h1>
          <motion.p 
            className={`max-w-2xl mx-auto text-base md:text-lg ${mutedTextColorClass} leading-relaxed font-mono`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Advanced autonomous research systems that operate continuously, generating breakthrough insights 
            and discoveries across multiple scientific domains through sophisticated cognitive architectures 
            and knowledge synthesis platforms.
          </motion.p>
        </motion.div>

        {/* Core Feature Categories */}
        <motion.div 
          className="mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className={`text-2xl font-bold ${textColorClass} text-center mb-8 font-mono`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Core Research Architecture
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2 py-8">
            {featureCategories.map((category, index) => (
              <FeatureCategory
                key={index}
                title={category.title}
                description={category.description}
                features={category.features}
                icon={category.icon}
                gradient={category.gradient}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Research Capabilities - UNCHANGED as requested */}
        <div className="mb-24">
          <h2 className={`text-2xl font-bold ${textColorClass} text-center mb-8 font-mono`}>
            Operational Capabilities
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {researchCapabilities.map((capability, index) => (
              <ResearchCapability
                key={index}
                title={capability.title}
                description={capability.description}
                metrics={capability.metrics}
                icon={capability.icon}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Innovation Highlights with Advanced Effects */}
        <motion.div 
          className={`${isDarkMode ? 'bg-white/3' : 'bg-black/3'} backdrop-blur-xl border ${isDarkMode ? 'border-white/5' : 'border-black/5'} rounded-2xl p-6`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ 
            scale: 1.01,
            transition: { duration: 0.3 }
          }}
        >
          <motion.h2 
            className={`text-2xl font-bold ${textColorClass} text-center mb-6 font-mono`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Innovation Highlights
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className={`text-lg font-bold ${textColorClass} mb-3 font-mono`}>
                Autonomous Operation
              </h3>
              <p className={`${mutedTextColorClass} leading-relaxed font-mono text-sm`}>
                Self-directed research capabilities that operate independently, setting research agendas, 
                conducting investigations, and generating insights without human intervention. The system 
                continuously monitors its own performance and adapts its methodologies for optimal results.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className={`text-lg font-bold ${textColorClass} mb-3 font-mono`}>
                Knowledge Integration
              </h3>
              <p className={`${mutedTextColorClass} leading-relaxed font-mono text-sm`}>
                Advanced systems for synthesizing information from disparate sources, identifying hidden 
                connections, and generating novel theoretical frameworks that transcend traditional 
                disciplinary boundaries. This enables breakthrough discoveries that would be impossible 
                through conventional research methods.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action with Advanced Effects */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p 
            className={`${mutedTextColorClass} mb-6 font-mono text-sm`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Experience the future of research intelligence
          </motion.p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.a 
              href="#contact" 
              className={`group relative ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} backdrop-blur-xl ${textColorClass} px-6 py-3 rounded-xl text-sm font-mono font-semibold transition-all duration-300 ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'} hover:shadow-2xl ${isDarkMode ? 'hover:shadow-white/10' : 'hover:shadow-black/10'} overflow-hidden border ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}
              whileHover={{ 
                scale: 1.05,
                y: -2,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="relative z-10">Request Demo</span>
              <motion.div 
                className={`absolute inset-0 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            <motion.a 
              href="#about" 
              className={`group relative bg-transparent border ${isDarkMode ? 'border-white/10' : 'border-black/10'} ${textColorClass} px-6 py-3 rounded-xl text-sm font-mono font-semibold transition-all duration-300 overflow-hidden`}
              whileHover={{ 
                scale: 1.05,
                y: -2,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <span className="relative z-10">Learn More</span>
              <motion.div 
                className={`absolute inset-0 ${isDarkMode ? 'bg-white/3' : 'bg-black/3'}`}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesPage;

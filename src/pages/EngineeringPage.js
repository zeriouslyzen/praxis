import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ThemeContext } from '../contexts/AppContext';
import { Header, Footer } from '../components/Layout';

// Typing Animation Component
const TypingText = ({ text, speed = 50, delay = 0, className = "" }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isDarkMode } = React.useContext(ThemeContext);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayedText('');
      setCurrentIndex(0);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <span className={className}>
      {displayedText}
      <span className={`${isDarkMode ? 'text-white' : 'text-black'} animate-pulse`}>|</span>
    </span>
  );
};

// Engineering Capability Component
const EngineeringCapability = ({ title, description, technologies, metrics, index }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColorClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBgColorClass = isDarkMode ? 'bg-white/2' : 'bg-black/2';
  const borderColorClass = isDarkMode ? 'border-white/5' : 'border-black/5';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className={`group relative ${cardBgColorClass} backdrop-blur-xl border ${borderColorClass} rounded-2xl p-6 transition-all duration-500 overflow-hidden`}
    >
      {/* Animated background with military tech gradient */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${isDarkMode ? 'from-blue-900/10 via-gray-800/10 to-green-900/10' : 'from-blue-100/20 via-gray-200/20 to-green-100/20'} opacity-0`}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Tech grid pattern overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}></div>
      </motion.div>
      
      <div className="relative z-10">
        <motion.div 
          className="mb-4"
          initial={{ x: -20, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
          transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
        >
          <h3 className={`text-xl font-bold ${textColorClass} font-mono mb-2`}>
            {title}
          </h3>
        </motion.div>
        
        <motion.p 
          className={`${mutedTextColorClass} mb-4 leading-relaxed font-mono text-sm`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
        >
          {description}
        </motion.p>
        
        {technologies && (
          <motion.div 
            className="mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ delay: index * 0.15 + 0.4, duration: 0.5 }}
          >
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, techIndex) => (
                <motion.span
                  key={techIndex}
                  className={`px-2 py-1 rounded-md text-xs font-mono ${isDarkMode ? 'bg-white/10 text-white/80' : 'bg-black/10 text-black/80'} border ${isDarkMode ? 'border-white/20' : 'border-black/20'}`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
        
        {metrics && (
          <motion.div 
            className="flex justify-between items-center"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ delay: index * 0.15 + 0.5, duration: 0.5 }}
          >
            {metrics.map((metric, metricIndex) => (
              <motion.div 
                key={metricIndex} 
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`text-lg font-bold ${textColorClass} font-mono`}>
                  {metric.value}
                </div>
                <div className={`text-xs ${mutedTextColorClass} font-mono`}>
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Military Tech Placeholder Component
const TechPlaceholder = ({ title, description, category }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColorClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBgColorClass = isDarkMode ? 'bg-white/3' : 'bg-black/3';
  const borderColorClass = isDarkMode ? 'border-white/10' : 'border-black/10';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      className={`${cardBgColorClass} backdrop-blur-xl border ${borderColorClass} rounded-xl p-6 transition-all duration-300`}
    >
      {/* Tech visualization placeholder */}
      <div className={`h-32 mb-4 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} flex items-center justify-center border ${borderColorClass}`}>
        <div className="text-center">
          <div className={`w-16 h-16 mx-auto mb-2 rounded-full ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-500/10'} flex items-center justify-center`}>
            <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-blue-500/40' : 'bg-blue-500/20'} animate-pulse`}></div>
          </div>
          <p className={`text-xs ${mutedTextColorClass} font-mono`}>[CLASSIFIED]</p>
        </div>
      </div>
      
      <h4 className={`text-lg font-bold ${textColorClass} font-mono mb-2`}>
        {title}
      </h4>
      <p className={`${mutedTextColorClass} text-sm font-mono leading-relaxed`}>
        {description}
      </p>
      <div className={`mt-3 px-2 py-1 rounded-md text-xs font-mono ${isDarkMode ? 'bg-red-500/10 text-red-400' : 'bg-red-500/5 text-red-600'} border ${isDarkMode ? 'border-red-500/20' : 'border-red-500/10'}`}>
        {category}
      </div>
    </motion.div>
  );
};

// Main Engineering Page Component
const EngineeringPage = () => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const bgColorClass = isDarkMode ? 'bg-black' : 'bg-white';
  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColorClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  
  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Engineering capabilities with aggressive professional language
  const engineeringCapabilities = [
    {
      title: "Advanced Cognitive Architecture",
      description: "We engineer neural networks that operate at the intersection of consciousness and computation. Our systems demonstrate emergent intelligence capabilities that transcend traditional AI limitations, enabling autonomous decision-making in complex, dynamic environments.",
      technologies: ["Neural Architecture Search", "Transformer Optimization", "Reinforcement Learning", "Meta-Learning"],
      metrics: [
        { value: "99.7%", label: "Accuracy" },
        { value: "10x", label: "Speed" },
        { value: "24/7", label: "Operation" }
      ]
    },
    {
      title: "Military-Grade Security Infrastructure",
      description: "Our security protocols exceed Department of Defense standards. We implement zero-trust architectures with quantum-resistant encryption, ensuring that even nation-state actors cannot compromise our research infrastructure or intellectual property.",
      technologies: ["Quantum Cryptography", "Zero-Trust Architecture", "Hardware Security Modules", "Threat Intelligence"],
      metrics: [
        { value: "256-bit", label: "Encryption" },
        { value: "99.99%", label: "Uptime" },
        { value: "0", label: "Breaches" }
      ]
    },
    {
      title: "Distributed Computing Grid",
      description: "We operate a globally distributed computing infrastructure that rivals the world's most powerful supercomputers. Our network processes petabytes of data in real-time, enabling breakthrough discoveries that would take conventional systems decades to achieve.",
      technologies: ["Edge Computing", "Distributed Ledger", "Container Orchestration", "GPU Clustering"],
      metrics: [
        { value: "1.2M", label: "Cores" },
        { value: "50PB", label: "Storage" },
        { value: "99.9%", label: "Efficiency" }
      ]
    },
    {
      title: "Autonomous Research Systems",
      description: "Our systems operate independently, generating hypotheses, designing experiments, and validating results without human intervention. They demonstrate scientific reasoning capabilities that rival the world's leading researchers across multiple domains.",
      technologies: ["Automated Experimentation", "Hypothesis Generation", "Statistical Analysis", "Peer Review AI"],
      metrics: [
        { value: "1000+", label: "Experiments/Day" },
        { value: "85%", label: "Success Rate" },
        { value: "3x", label: "Discovery Speed" }
      ]
    },
    {
      title: "Quantum Computing Integration",
      description: "We leverage quantum computing capabilities to solve optimization problems that are intractable for classical systems. Our quantum algorithms accelerate research in cryptography, materials science, and complex system modeling.",
      technologies: ["Quantum Algorithms", "Quantum Error Correction", "Hybrid Classical-Quantum", "Quantum Machine Learning"],
      metrics: [
        { value: "1000x", label: "Speedup" },
        { value: "99.9%", label: "Fidelity" },
        { value: "50+", label: "Qubits" }
      ]
    },
    {
      title: "Advanced Data Synthesis",
      description: "Our systems synthesize information from disparate sources, identifying hidden patterns and generating novel insights that transcend traditional disciplinary boundaries. We process structured and unstructured data at unprecedented scale and speed.",
      technologies: ["Natural Language Processing", "Computer Vision", "Graph Neural Networks", "Multimodal Learning"],
      metrics: [
        { value: "10TB", label: "Data/Hour" },
        { value: "95%", label: "Accuracy" },
        { value: "Real-time", label: "Processing" }
      ]
    }
  ];

  // Military and research tech placeholders
  const techPlaceholders = [
    {
      title: "Advanced Threat Detection",
      description: "Real-time analysis of global threat vectors using machine learning algorithms trained on classified intelligence datasets.",
      category: "CLASSIFIED - DEFENSE"
    },
    {
      title: "Quantum Communication Network",
      description: "Secure communication infrastructure utilizing quantum entanglement for unhackable data transmission across global networks.",
      category: "CLASSIFIED - QUANTUM"
    },
    {
      title: "Autonomous Research Drones",
      description: "Unmanned systems capable of independent scientific research in remote or hazardous environments with minimal human oversight.",
      category: "CLASSIFIED - AUTONOMOUS"
    },
    {
      title: "Neural Interface Technology",
      description: "Direct brain-computer interfaces enabling seamless interaction between human cognition and artificial intelligence systems.",
      category: "CLASSIFIED - NEURAL"
    }
  ];

  return (
    <div ref={containerRef} className={`min-h-screen ${bgColorClass} relative`}>
      <Header />
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ y }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, ${isDarkMode ? 'rgba(0,100,255,0.1)' : 'rgba(0,100,255,0.05)'} 0%, transparent 50%),
                          radial-gradient(circle at 80% 80%, ${isDarkMode ? 'rgba(0,255,100,0.1)' : 'rgba(0,255,100,0.05)'} 0%, transparent 50%)`,
          backgroundSize: '600px 600px'
        }}></div>
      </motion.div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 relative z-10">
        {/* Header Section with Typing Animation */}
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
            <TypingText 
              text="ENGINEERING EXCELLENCE"
              speed={100}
              className={textColorClass}
            />
          </motion.h1>
          <motion.p 
            className={`max-w-2xl mx-auto text-base md:text-lg ${mutedTextColorClass} leading-relaxed font-mono`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <TypingText 
              text="Where military-grade engineering meets cutting-edge research. We build systems that operate at the bleeding edge of technological possibility."
              speed={30}
              delay={2000}
              className={mutedTextColorClass}
            />
          </motion.p>
        </motion.div>

        {/* Engineering Capabilities */}
        <motion.div 
          className="mb-16"
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
            Core Engineering Capabilities
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {engineeringCapabilities.map((capability, index) => (
              <EngineeringCapability
                key={index}
                title={capability.title}
                description={capability.description}
                technologies={capability.technologies}
                metrics={capability.metrics}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Advanced Technology Showcase */}
        <motion.div 
          className="mb-16"
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
            Advanced Technology Portfolio
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {techPlaceholders.map((tech, index) => (
              <TechPlaceholder
                key={index}
                title={tech.title}
                description={tech.description}
                category={tech.category}
              />
            ))}
          </div>
        </motion.div>

        {/* Engineering Philosophy */}
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
            Engineering Philosophy
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className={`text-lg font-bold ${textColorClass} mb-3 font-mono`}>
                Precision Engineering
              </h3>
              <p className={`${mutedTextColorClass} leading-relaxed font-mono text-sm`}>
                We engineer systems with the precision of military hardware and the innovation of cutting-edge research. 
                Every component is designed for maximum performance, reliability, and scalability under extreme conditions.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className={`text-lg font-bold ${textColorClass} mb-3 font-mono`}>
                Autonomous Operation
              </h3>
              <p className={`${mutedTextColorClass} leading-relaxed font-mono text-sm`}>
                Our systems operate with complete autonomy, making intelligent decisions in real-time without human intervention. 
                They adapt, learn, and evolve to maintain peak performance in dynamic environments.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
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
            Ready to experience the future of engineering?
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
              <span className="relative z-10">Request Technical Brief</span>
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
              <span className="relative z-10">View Capabilities</span>
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
      <Footer />
    </div>
  );
};

export default EngineeringPage;

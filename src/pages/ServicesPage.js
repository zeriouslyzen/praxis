import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ThemeContext } from '../contexts/AppContext';
import { Header, Footer } from '../components/Layout';

// Service Category Component
const ServiceCategory = ({ title, description, features, index }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColorClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBgColorClass = isDarkMode ? 'bg-white/2' : 'bg-black/2';
  const borderColorClass = isDarkMode ? 'border-white/5' : 'border-black/5';
  const hoverBorderColorClass = isDarkMode ? 'hover:border-white/20' : 'hover:border-black/20';
  const hoverBgColorClass = isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5';
  const shadowColorClass = isDarkMode ? 'hover:shadow-white/10' : 'hover:shadow-black/10';

  // Different gradients for each service
  const gradients = [
    'from-blue-900/10 via-purple-900/10 to-indigo-900/10',
    'from-green-900/10 via-teal-900/10 to-cyan-900/10',
    'from-orange-900/10 via-red-900/10 to-pink-900/10'
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -12, 
        scale: 1.03,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      className={`group relative ${cardBgColorClass} backdrop-blur-xl border ${borderColorClass} rounded-2xl p-8 transition-all duration-500 ${hoverBorderColorClass} ${hoverBgColorClass} hover:shadow-2xl ${shadowColorClass} overflow-hidden`}
    >
      {/* Animated background with service-specific gradient */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0`}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Tech pattern overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(${isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}></div>
      </motion.div>
      
      {/* Floating particles effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${isDarkMode ? 'bg-white/20' : 'bg-black/20'} rounded-full`}
            style={{
              left: `${15 + i * 25}%`,
              top: `${20 + i * 15}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 2.5 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </motion.div>
      
      <div className="relative z-10">
        <motion.div 
          className="mb-6"
          initial={{ x: -20, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
          transition={{ delay: index * 0.2 + 0.2, duration: 0.5 }}
        >
          <h3 className={`text-2xl font-bold ${textColorClass} font-mono mb-3`}>
            {title}
          </h3>
        </motion.div>
        
        <motion.p 
          className={`${mutedTextColorClass} mb-6 leading-relaxed font-mono text-sm`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
        >
          {description}
        </motion.p>
        
        <motion.div 
          className="space-y-3 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: index * 0.2 + 0.4, duration: 0.5 }}
        >
          {features.map((feature, featureIndex) => (
            <motion.div 
              key={featureIndex} 
              className="flex items-center group/item"
              initial={{ x: -20, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ 
                delay: index * 0.2 + 0.5 + featureIndex * 0.1, 
                duration: 0.4 
              }}
            >
              <motion.div 
                className={`flex-shrink-0 h-5 w-5 rounded-full ${isDarkMode ? 'bg-white/15' : 'bg-black/15'} flex items-center justify-center mr-4 ${isDarkMode ? 'group-hover/item:bg-white/25' : 'group-hover/item:bg-black/25'} transition-colors duration-300`}
                whileHover={{ scale: 1.2, rotate: 180 }}
                transition={{ duration: 0.2 }}
              >
                <svg className={`h-3 w-3 ${textColorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <span className={`${mutedTextColorClass} group-hover/item:${textColorClass} transition-colors duration-300 font-mono text-sm`}>
                {feature}
              </span>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: index * 0.2 + 0.6, duration: 0.5 }}
        >
          <motion.a
            href={index === 0 ? "/algorithm-research" : index === 1 ? "/development-platform" : "/innovation-lab"}
            className={`group/btn relative ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} backdrop-blur-xl ${textColorClass} px-6 py-3 rounded-xl text-sm font-mono font-semibold transition-all duration-300 ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'} hover:shadow-2xl ${isDarkMode ? 'hover:shadow-white/10' : 'hover:shadow-black/10'} overflow-hidden border ${isDarkMode ? 'border-white/10' : 'border-black/10'} w-full block text-center`}
            whileHover={{ 
              scale: 1.02,
              y: -2,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Learn More</span>
            <motion.div 
              className={`absolute inset-0 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main Services Page Component
const ServicesPage = () => {
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

  // Service categories
  const services = [
    {
      title: "Algorithm Research",
      description: "Advanced algorithmic research and development services that push the boundaries of computational intelligence. Our research teams develop cutting-edge algorithms for complex problem-solving across multiple domains.",
      features: [
        "Neural network optimization",
        "Quantum algorithm design", 
        "Pattern recognition",
        "Machine learning architectures"
      ]
    },
    {
      title: "Development Platform",
      description: "Enterprise-grade development infrastructure designed for high-performance computing and real-time processing. Our platform provides the robust foundation necessary for mission-critical applications.",
      features: [
        "High-performance computing",
        "Distributed processing",
        "Real-time analytics",
        "Scalable infrastructure"
      ]
    },
    {
      title: "Innovation Lab",
      description: "Cutting-edge research and development laboratory focused on prototype development and technology integration. We transform theoretical concepts into practical solutions through rapid prototyping and iterative development.",
      features: [
        "Research & development",
        "Prototype development",
        "Technology integration",
        "Rapid iteration cycles"
      ]
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
          backgroundImage: `radial-gradient(circle at 25% 25%, ${isDarkMode ? 'rgba(0,100,255,0.1)' : 'rgba(0,100,255,0.05)'} 0%, transparent 50%),
                          radial-gradient(circle at 75% 75%, ${isDarkMode ? 'rgba(0,255,100,0.1)' : 'rgba(0,255,100,0.05)'} 0%, transparent 50%)`,
          backgroundSize: '600px 600px'
        }}></div>
      </motion.div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 relative z-10">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
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
            Professional
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
              Services
            </motion.span>
          </motion.h1>
          <motion.p 
            className={`max-w-2xl mx-auto text-base md:text-lg ${mutedTextColorClass} leading-relaxed font-mono`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Comprehensive research and development services designed to accelerate innovation 
            and deliver breakthrough solutions for complex technological challenges.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCategory
                key={index}
                title={service.title}
                description={service.description}
                features={service.features}
                index={index}
              />
            ))}
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
            Ready to accelerate your research and development?
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
              <span className="relative z-10">Request Consultation</span>
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

export default ServicesPage;

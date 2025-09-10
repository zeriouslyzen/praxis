import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ThemeContext } from '../contexts/AppContext';
import { Header, Footer } from '../components/Layout';

// Unfolding Animation Component
const UnfoldingText = ({ text, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode } = React.useContext(ThemeContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, height: 0 }}
      animate={isVisible ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {text}
    </motion.span>
  );
};


// Mission Statement Component
const MissionStatement = ({ title, content, index }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColorClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.8, delay: index * 0.3 }}
      className="mb-8"
    >
      <h3 className={`text-xl font-bold ${textColorClass} font-mono mb-3`}>
        <UnfoldingText text={title} delay={index * 300} className={textColorClass} />
      </h3>
      <p className={`${mutedTextColorClass} leading-relaxed font-mono text-sm`}>
        <UnfoldingText text={content} delay={index * 300 + 500} className={mutedTextColorClass} />
      </p>
    </motion.div>
  );
};

// Main About Page Component
const AboutPage = () => {
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

  // Mission statements
  const missionStatements = [
    {
      title: "Our Mission",
      content: "We are engineering the future of human knowledge. Our mission is to create autonomous research systems that operate at the intersection of artificial intelligence and human ingenuity, pushing the boundaries of what's possible in scientific discovery and technological innovation."
    },
    {
      title: "Our Vision",
      content: "We envision a world where artificial intelligence and human researchers work in perfect harmony, accelerating the pace of discovery and solving humanity's greatest challenges. Our systems will operate with the precision of military hardware and the creativity of the world's greatest minds."
    },
    {
      title: "Our Values",
      content: "Excellence, innovation, and integrity drive everything we do. We believe in the power of technology to transform the world for the better, and we are committed to building systems that are not only powerful but also ethical, secure, and beneficial to humanity."
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
          backgroundImage: `radial-gradient(circle at 30% 30%, ${isDarkMode ? 'rgba(0,100,255,0.1)' : 'rgba(0,100,255,0.05)'} 0%, transparent 50%),
                          radial-gradient(circle at 70% 70%, ${isDarkMode ? 'rgba(0,255,100,0.1)' : 'rgba(0,255,100,0.05)'} 0%, transparent 50%)`,
          backgroundSize: '800px 800px'
        }}></div>
      </motion.div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 relative z-10">
        {/* Header Section with Unfolding Animation */}
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
            <UnfoldingText 
              text="ABOUT PRAXIS"
              delay={500}
              className={textColorClass}
            />
          </motion.h1>
          <motion.p 
            className={`max-w-2xl mx-auto text-base md:text-lg ${mutedTextColorClass} leading-relaxed font-mono`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <UnfoldingText 
              text="We are the architects of the future, building the next generation of research intelligence systems that will transform how humanity discovers, learns, and innovates."
              delay={1500}
              className={mutedTextColorClass}
            />
          </motion.p>
        </motion.div>

        {/* Mission Statements */}
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
            Our Foundation
          </motion.h2>
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
            {missionStatements.map((statement, index) => (
              <MissionStatement
                key={index}
                title={statement.title}
                content={statement.content}
                index={index}
              />
            ))}
          </div>
        </motion.div>


        {/* Company Stats */}
        <motion.div 
          className={`${isDarkMode ? 'bg-white/3' : 'bg-black/3'} backdrop-blur-xl border ${isDarkMode ? 'border-white/5' : 'border-black/5'} rounded-2xl p-6 mb-16`}
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
            className={`text-2xl font-bold ${textColorClass} text-center mb-8 font-mono`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            By the Numbers
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { value: "50+", label: "Research Papers Published" },
              { value: "15+", label: "Years Combined Experience" },
              { value: "99.9%", label: "System Uptime" },
              { value: "24/7", label: "Autonomous Operation" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`text-3xl font-bold ${textColorClass} font-mono mb-2`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${mutedTextColorClass} font-mono`}>
                  {stat.label}
                </div>
              </motion.div>
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
            Ready to join the future of research?
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
              <span className="relative z-10">Get in Touch</span>
              <motion.div 
                className={`absolute inset-0 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            <motion.a 
              href="#engineering" 
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
              <span className="relative z-10">View Engineering</span>
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

export default AboutPage;

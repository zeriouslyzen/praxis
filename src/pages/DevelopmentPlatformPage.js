import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ThemeContext } from '../contexts/AppContext';
import { Header, Footer } from '../components/Layout';

// Application Card Component
const ApplicationCard = ({ title, description, useCases, benefits, index }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColorClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBgColorClass = isDarkMode ? 'bg-white/3' : 'bg-black/3';
  const borderColorClass = isDarkMode ? 'border-white/10' : 'border-black/10';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className={`${cardBgColorClass} backdrop-blur-xl border ${borderColorClass} rounded-2xl p-6 transition-all duration-500 overflow-hidden`}
    >
      <motion.h3 
        className={`text-xl font-bold ${textColorClass} font-mono mb-4`}
        initial={{ x: -20, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
        transition={{ delay: index * 0.2 + 0.2, duration: 0.5 }}
      >
        {title}
      </motion.h3>
      
      <motion.p 
        className={`${mutedTextColorClass} mb-4 leading-relaxed font-mono text-sm`}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
      >
        {description}
      </motion.p>
      
      <motion.div 
        className="mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{ delay: index * 0.2 + 0.4, duration: 0.5 }}
      >
        <h4 className={`text-sm font-semibold ${textColorClass} font-mono mb-2`}>Real-World Applications:</h4>
        <ul className="space-y-1">
          {useCases.map((useCase, useCaseIndex) => (
            <li key={useCaseIndex} className={`${mutedTextColorClass} font-mono text-xs flex items-start`}>
              <span className={`mr-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>•</span>
              {useCase}
            </li>
          ))}
        </ul>
      </motion.div>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
      >
        <h4 className={`text-sm font-semibold ${textColorClass} font-mono mb-2`}>Key Benefits:</h4>
        <ul className="space-y-1">
          {benefits.map((benefit, benefitIndex) => (
            <li key={benefitIndex} className={`${mutedTextColorClass} font-mono text-xs flex items-start`}>
              <span className={`mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>•</span>
              {benefit}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

// Main Development Platform Applications Page
const DevelopmentPlatformPage = () => {
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

  // Real-world applications for Development Platform
  const applications = [
    {
      title: "Marketing & Customer Analytics",
      description: "Process massive amounts of customer data in real-time to deliver personalized experiences and optimize marketing campaigns instantly.",
      useCases: [
        "Real-time customer behavior analysis",
        "Instant personalization of marketing content",
        "Live campaign performance optimization",
        "Dynamic pricing and recommendation engines",
        "Real-time fraud detection and prevention"
      ],
      benefits: [
        "Increase conversion rates by 30-50%",
        "Reduce customer acquisition costs",
        "Improve customer satisfaction and loyalty",
        "Enable instant response to market changes"
      ]
    },
    {
      title: "Business Intelligence & Operations",
      description: "Transform raw business data into actionable insights that help companies make faster, smarter decisions across all operations.",
      useCases: [
        "Real-time business performance monitoring",
        "Automated financial reporting and analysis",
        "Supply chain optimization and tracking",
        "Predictive maintenance for equipment",
        "Dynamic resource allocation and planning"
      ],
      benefits: [
        "Reduce operational costs by 20-40%",
        "Improve decision-making speed by 60%",
        "Minimize downtime and inefficiencies",
        "Enable proactive problem-solving"
      ]
    },
    {
      title: "Data Processing & Research",
      description: "Handle enormous datasets that would take traditional systems months to process, delivering insights in hours or minutes.",
      useCases: [
        "Process petabytes of research data",
        "Real-time scientific data analysis",
        "Automated data quality assessment",
        "Large-scale pattern recognition",
        "Instant data visualization and reporting"
      ],
      benefits: [
        "Accelerate research timelines by 70-80%",
        "Enable analysis of previously impossible datasets",
        "Improve research accuracy and reliability",
        "Facilitate breakthrough discoveries"
      ]
    },
    {
      title: "Innovation & Product Development",
      description: "Accelerate product development cycles through high-performance computing that can simulate and test thousands of scenarios simultaneously.",
      useCases: [
        "Rapid product design iteration",
        "Real-time performance simulation",
        "Automated testing and quality assurance",
        "Market response prediction modeling",
        "Supply chain optimization for new products"
      ],
      benefits: [
        "Reduce product development time by 50-60%",
        "Lower development costs through simulation",
        "Increase product success rates",
        "Enable rapid market adaptation"
      ]
    },
    {
      title: "Community Building & Social Platforms",
      description: "Power large-scale social platforms and community networks that can handle millions of users while maintaining personal connections.",
      useCases: [
        "Real-time community engagement analysis",
        "Automated content moderation and safety",
        "Dynamic community recommendation systems",
        "Large-scale event coordination and management",
        "Social impact measurement and optimization"
      ],
      benefits: [
        "Scale community platforms to millions of users",
        "Improve user engagement and retention",
        "Reduce moderation costs and improve safety",
        "Enable data-driven community growth"
      ]
    },
    {
      title: "Intelligence & Security Systems",
      description: "Process vast amounts of security data in real-time to detect threats, prevent attacks, and protect critical infrastructure.",
      useCases: [
        "Real-time threat detection and response",
        "Large-scale surveillance data analysis",
        "Automated security incident investigation",
        "Predictive security risk assessment",
        "Intelligence data correlation and analysis"
      ],
      benefits: [
        "Improve threat detection accuracy by 85-95%",
        "Reduce response time to security incidents",
        "Prevent costly security breaches",
        "Enhance overall safety and protection"
      ]
    },
    {
      title: "Governance & Public Services",
      description: "Support government operations and public services with high-performance systems that can process citizen data and optimize service delivery.",
      useCases: [
        "Real-time citizen service optimization",
        "Large-scale policy impact analysis",
        "Automated public resource allocation",
        "Emergency response coordination systems",
        "Transparency and accountability reporting"
      ],
      benefits: [
        "Improve government efficiency by 40-50%",
        "Enhance citizen satisfaction with services",
        "Reduce government waste and costs",
        "Enable data-driven policy decisions"
      ]
    }
  ];

  return (
    <div ref={containerRef} className={`min-h-screen ${bgColorClass} relative overflow-hidden`}>
      <Header />
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ y }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${isDarkMode ? 'rgba(0,255,100,0.1)' : 'rgba(0,255,100,0.05)'} 0%, transparent 50%),
                          radial-gradient(circle at 75% 75%, ${isDarkMode ? 'rgba(0,100,255,0.1)' : 'rgba(0,100,255,0.05)'} 0%, transparent 50%)`,
          backgroundSize: '600px 600px'
        }}></div>
      </motion.div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 relative z-10">
        {/* Header Section */}
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
            Development Platform
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
              Applications
            </motion.span>
          </motion.h1>
          <motion.p 
            className={`max-w-3xl mx-auto text-base md:text-lg ${mutedTextColorClass} leading-relaxed font-mono`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Experience the power of high-performance computing and real-time analytics. 
            Our development platform processes massive amounts of data instantly, enabling 
            businesses to make faster decisions, deliver better services, and stay ahead of the competition.
          </motion.p>
        </motion.div>

        {/* Applications Grid */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {applications.map((application, index) => (
              <ApplicationCard
                key={index}
                title={application.title}
                description={application.description}
                useCases={application.useCases}
                benefits={application.benefits}
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
            Ready to supercharge your operations with high-performance computing?
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
              <span className="relative z-10">Get Started</span>
              <motion.div 
                className={`absolute inset-0 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            <motion.a 
              href="/services" 
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
              <span className="relative z-10">View All Services</span>
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

export default DevelopmentPlatformPage;

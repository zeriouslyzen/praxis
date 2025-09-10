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

// Main Algorithm Research Applications Page
const AlgorithmResearchPage = () => {
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

  // Real-world applications for Algorithm Research
  const applications = [
    {
      title: "Marketing & Customer Intelligence",
      description: "Transform how businesses understand and connect with their customers through advanced pattern recognition and predictive analytics.",
      useCases: [
        "Predict customer behavior and preferences",
        "Optimize marketing campaigns in real-time",
        "Personalize product recommendations",
        "Detect fraud and security threats",
        "Analyze social media sentiment and trends"
      ],
      benefits: [
        "Increase customer engagement by 40-60%",
        "Reduce marketing costs through targeted campaigns",
        "Improve customer satisfaction and retention",
        "Gain competitive advantage through data insights"
      ]
    },
    {
      title: "Business Operations & Decision Making",
      description: "Empower business leaders with intelligent systems that process vast amounts of data to make better, faster decisions.",
      useCases: [
        "Automate routine business processes",
        "Optimize supply chain and logistics",
        "Predict market trends and opportunities",
        "Streamline financial analysis and reporting",
        "Enhance risk assessment and management"
      ],
      benefits: [
        "Reduce operational costs by 25-35%",
        "Accelerate decision-making processes",
        "Minimize human error in critical operations",
        "Scale business operations efficiently"
      ]
    },
    {
      title: "Data Analysis & Research",
      description: "Revolutionize how organizations extract insights from complex datasets, making research faster and more accurate.",
      useCases: [
        "Process and analyze large datasets automatically",
        "Identify hidden patterns in research data",
        "Accelerate scientific discovery processes",
        "Improve data quality and accuracy",
        "Enable real-time data monitoring and alerts"
      ],
      benefits: [
        "Reduce research time by 50-70%",
        "Improve accuracy of findings and predictions",
        "Enable analysis of previously impossible datasets",
        "Facilitate breakthrough discoveries"
      ]
    },
    {
      title: "Innovation & Product Development",
      description: "Accelerate innovation cycles and product development through intelligent systems that can simulate, test, and optimize ideas rapidly.",
      useCases: [
        "Simulate product performance before manufacturing",
        "Optimize design parameters automatically",
        "Predict market acceptance of new products",
        "Accelerate prototype development and testing",
        "Identify new product opportunities and gaps"
      ],
      benefits: [
        "Reduce product development time by 40-50%",
        "Lower development costs through simulation",
        "Increase success rate of new products",
        "Enable rapid iteration and improvement"
      ]
    },
    {
      title: "Community Building & Social Impact",
      description: "Foster stronger communities and drive social change through intelligent systems that understand human behavior and social dynamics.",
      useCases: [
        "Match people with shared interests and goals",
        "Optimize community engagement strategies",
        "Predict and prevent social problems",
        "Facilitate knowledge sharing and collaboration",
        "Measure and improve social impact initiatives"
      ],
      benefits: [
        "Strengthen community bonds and engagement",
        "Increase participation in social programs",
        "Improve outcomes for community initiatives",
        "Create more inclusive and connected societies"
      ]
    },
    {
      title: "Intelligence & Security",
      description: "Enhance security and intelligence operations through advanced pattern recognition and threat detection systems.",
      useCases: [
        "Detect and prevent security threats in real-time",
        "Analyze communication patterns for intelligence",
        "Predict and prevent cyber attacks",
        "Optimize security resource allocation",
        "Enhance surveillance and monitoring systems"
      ],
      benefits: [
        "Improve threat detection accuracy by 80-90%",
        "Reduce response time to security incidents",
        "Prevent costly security breaches",
        "Enhance overall safety and security"
      ]
    },
    {
      title: "Governance & Public Policy",
      description: "Support better governance and policy-making through intelligent systems that can analyze complex social and economic data.",
      useCases: [
        "Analyze policy impact before implementation",
        "Optimize resource allocation for public services",
        "Predict social and economic trends",
        "Improve citizen engagement and participation",
        "Enhance transparency and accountability"
      ],
      benefits: [
        "Improve policy effectiveness and outcomes",
        "Reduce government waste and inefficiency",
        "Increase citizen satisfaction with services",
        "Enable data-driven governance decisions"
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
          backgroundImage: `radial-gradient(circle at 30% 30%, ${isDarkMode ? 'rgba(0,100,255,0.1)' : 'rgba(0,100,255,0.05)'} 0%, transparent 50%),
                          radial-gradient(circle at 70% 70%, ${isDarkMode ? 'rgba(0,255,100,0.1)' : 'rgba(0,255,100,0.05)'} 0%, transparent 50%)`,
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
            Algorithm Research
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
            Discover how advanced algorithms are transforming industries and solving real-world problems. 
            From marketing to governance, see how intelligent systems are making businesses smarter, 
            communities stronger, and decision-making more effective.
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
            Ready to transform your business with intelligent algorithms?
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
              <span className="relative z-10">Start Your Project</span>
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

export default AlgorithmResearchPage;

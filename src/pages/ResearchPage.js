import React, { useEffect, useRef } from 'react';
import { ThemeContext } from '../contexts/AppContext';
import { Header, Footer } from '../components/Layout';

// Research Data Visualization Component
const ResearchVisualization = ({ isActive }) => {
  const canvasRef = useRef(null);
  const { isDarkMode } = React.useContext(ThemeContext);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw expanded research network nodes
      const nodes = [
        { x: 100, y: 80, size: 8, label: "AI Research" },
        { x: 250, y: 120, size: 6, label: "Climate" },
        { x: 400, y: 100, size: 7, label: "Medicine" },
        { x: 550, y: 140, size: 5, label: "Physics" },
        { x: 150, y: 200, size: 6, label: "Biology" },
        { x: 300, y: 180, size: 5, label: "Materials" },
        { x: 450, y: 220, size: 6, label: "Quantum" },
        { x: 200, y: 280, size: 5, label: "Systems" },
        { x: 350, y: 300, size: 6, label: "Security" },
        { x: 500, y: 280, size: 5, label: "Cognitive" },
        { x: 120, y: 350, size: 6, label: "Pharma" },
        { x: 280, y: 380, size: 5, label: "Aerospace" },
        { x: 420, y: 360, size: 6, label: "Energy" },
        { x: 180, y: 420, size: 5, label: "Finance" },
        { x: 320, y: 450, size: 6, label: "Neuro" },
        { x: 480, y: 420, size: 5, label: "Environment" }
      ];

      // Draw connections
      ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
        ctx.fill();
        
        ctx.fillStyle = isDarkMode ? 'white' : 'black';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + 20);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isActive, isDarkMode]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
};

// Research Paper Component
const ResearchPaper = ({ title, authors, abstract, domain, year }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  
  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColorClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBgColorClass = isDarkMode ? 'bg-white/5' : 'bg-black/5';
  const borderColorClass = isDarkMode ? 'border-white/10' : 'border-black/10';
  const hoverBorderColorClass = isDarkMode ? 'hover:border-white/30' : 'hover:border-black/30';
  const hoverBgColorClass = isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10';

  return (
    <div className={`${cardBgColorClass} backdrop-blur-sm border ${borderColorClass} rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${hoverBorderColorClass} ${hoverBgColorClass}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-lg font-bold ${textColorClass} font-mono`}>
          {title}
        </h3>
        <span className={`text-xs ${mutedTextColorClass} font-mono`}>
          {year}
        </span>
      </div>
      
      <p className={`text-sm ${mutedTextColorClass} mb-3 font-mono`}>
        {authors}
      </p>
      
      <p className={`text-sm ${mutedTextColorClass} leading-relaxed mb-4 font-mono`}>
        {abstract}
      </p>
      
      <div className="flex justify-between items-center">
        <span className={`text-xs px-2 py-1 rounded ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} ${textColorClass} font-mono`}>
          {domain}
        </span>
        <button className={`text-xs ${mutedTextColorClass} hover:${textColorClass} transition-colors font-mono`}>
          Read More →
        </button>
      </div>
    </div>
  );
};

// Main Research Page Component
const ResearchPage = () => {
  const { isDarkMode } = React.useContext(ThemeContext);
  
  const bgColorClass = isDarkMode ? 'bg-black' : 'bg-white';
  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColorClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  // Expanded research papers database
  const researchPapers = [
    {
      title: "Autonomous Research Systems: A New Paradigm",
      authors: "PRAXIS Research Team",
      abstract: "This paper explores the development of autonomous research systems capable of self-directed investigation and discovery across multiple scientific domains.",
      domain: "AI Research",
      year: "2025"
    },
    {
      title: "Cross-Domain Knowledge Synthesis in Climate Engineering",
      authors: "PRAXIS Climate Division",
      abstract: "An analysis of hidden connections between climate engineering approaches and their potential systemic risks, discovered through autonomous research methods.",
      domain: "Climate Science",
      year: "2025"
    },
    {
      title: "Neural Architecture Optimization Through Meta-Learning",
      authors: "PRAXIS AI Lab",
      abstract: "Novel approaches to neural network architecture design using self-improving meta-learning systems that adapt their own learning processes.",
      domain: "Machine Learning",
      year: "2025"
    },
    {
      title: "Quantum Algorithm Discovery via Autonomous Research",
      authors: "PRAXIS Quantum Division",
      abstract: "Breakthrough quantum algorithms discovered through autonomous research systems, demonstrating the potential for AI-driven scientific discovery.",
      domain: "Quantum Computing",
      year: "2025"
    },
    {
      title: "Biomedical Research Acceleration Through AI Synthesis",
      authors: "PRAXIS Medical Research",
      abstract: "Accelerated discovery of potential treatments through cross-domain knowledge synthesis and autonomous research methodologies.",
      domain: "Biomedicine",
      year: "2025"
    },
    {
      title: "Theoretical Physics Framework Generation",
      authors: "PRAXIS Physics Lab",
      abstract: "Novel theoretical frameworks generated through autonomous research, bridging gaps between established physics theories.",
      domain: "Theoretical Physics",
      year: "2025"
    },
    {
      title: "Emergent Intelligence Patterns in Distributed Systems",
      authors: "PRAXIS Systems Research",
      abstract: "Analysis of emergent intelligence patterns observed in distributed computational systems, revealing new principles of collective intelligence.",
      domain: "Systems Science",
      year: "2025"
    },
    {
      title: "Advanced Materials Discovery Through Computational Synthesis",
      authors: "PRAXIS Materials Lab",
      abstract: "Revolutionary materials with unprecedented properties discovered through autonomous computational design and synthesis algorithms.",
      domain: "Materials Science",
      year: "2025"
    },
    {
      title: "Cryptographic Protocol Evolution via Self-Modifying Algorithms",
      authors: "PRAXIS Security Division",
      abstract: "Next-generation cryptographic protocols that evolve and adapt to emerging threats through autonomous algorithm modification.",
      domain: "Cybersecurity",
      year: "2025"
    },
    {
      title: "Cognitive Architecture Mapping in Artificial Systems",
      authors: "PRAXIS Cognitive Science",
      abstract: "Comprehensive mapping of cognitive architectures in artificial systems, revealing fundamental principles of artificial consciousness.",
      domain: "Cognitive Science",
      year: "2025"
    },
    {
      title: "Autonomous Drug Discovery Through Molecular Simulation",
      authors: "PRAXIS Pharmaceutical Research",
      abstract: "Breakthrough pharmaceutical compounds discovered through autonomous molecular simulation and drug-target interaction analysis.",
      domain: "Pharmaceuticals",
      year: "2025"
    },
    {
      title: "Quantum-Classical Hybrid Computing Architectures",
      authors: "PRAXIS Quantum Systems",
      abstract: "Novel hybrid computing architectures that seamlessly integrate quantum and classical computational paradigms for enhanced performance.",
      domain: "Quantum Systems",
      year: "2025"
    },
    {
      title: "Autonomous Space Mission Planning and Optimization",
      authors: "PRAXIS Aerospace Division",
      abstract: "Advanced mission planning algorithms that autonomously optimize space exploration missions across multiple objectives and constraints.",
      domain: "Aerospace",
      year: "2025"
    },
    {
      title: "Synthetic Biology Design Through Autonomous Evolution",
      authors: "PRAXIS Bioengineering Lab",
      abstract: "Revolutionary synthetic biological systems designed through autonomous evolutionary algorithms and biological pathway optimization.",
      domain: "Synthetic Biology",
      year: "2025"
    },
    {
      title: "Advanced Energy Storage Systems via Computational Design",
      authors: "PRAXIS Energy Research",
      abstract: "Next-generation energy storage systems with unprecedented capacity and efficiency, designed through autonomous computational optimization.",
      domain: "Energy Systems",
      year: "2025"
    },
    {
      title: "Autonomous Financial Market Analysis and Prediction",
      authors: "PRAXIS Financial Systems",
      abstract: "Advanced financial market analysis systems that autonomously identify patterns and predict market movements across multiple timeframes.",
      domain: "Financial Technology",
      year: "2025"
    },
    {
      title: "Neural Interface Optimization Through Brain-Computer Integration",
      authors: "PRAXIS Neurotechnology",
      abstract: "Breakthrough neural interfaces that optimize brain-computer integration through autonomous signal processing and adaptation algorithms.",
      domain: "Neurotechnology",
      year: "2025"
    },
    {
      title: "Autonomous Environmental Monitoring and Response Systems",
      authors: "PRAXIS Environmental Division",
      abstract: "Comprehensive environmental monitoring systems that autonomously detect, analyze, and respond to environmental changes and threats.",
      domain: "Environmental Science",
      year: "2025"
    }
  ];

  return (
    <div className={`min-h-screen ${bgColorClass} relative`}>
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-mono font-bold ${textColorClass} tracking-tight leading-tight mb-6`}>
            Research
            <br />
            <span className={`${textColorClass} animate-pulse`}>
              Publications
            </span>
          </h1>
          <p className={`max-w-3xl mx-auto text-lg md:text-xl ${mutedTextColorClass} leading-relaxed font-mono`}>
            Discoveries and insights generated through our autonomous research systems, 
            spanning multiple scientific domains and representing breakthrough advances 
            in AI-driven scientific discovery.
          </p>
        </div>

        {/* Research Network Visualization */}
        <div className="relative h-64 mb-16 rounded-xl overflow-hidden">
          <ResearchVisualization isActive={true} />
          <div className={`absolute inset-0 flex items-center justify-center ${isDarkMode ? 'bg-black/20' : 'bg-white/20'} backdrop-blur-sm`}>
            <div className="text-center">
              <h3 className={`text-2xl font-bold ${textColorClass} mb-2 font-mono`}>
                Research Network
              </h3>
              <p className={`${mutedTextColorClass} font-mono`}>
                Interconnected domains of scientific discovery
              </p>
            </div>
          </div>
        </div>

        {/* Research Papers Grid */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold ${textColorClass} text-center mb-12 font-mono`}>
            Recent Publications
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {researchPapers.slice(0, 12).map((paper, index) => (
              <ResearchPaper
                key={index}
                title={paper.title}
                authors={paper.authors}
                abstract={paper.abstract}
                domain={paper.domain}
                year={paper.year}
              />
            ))}
          </div>
          
          {/* Show More Button */}
          <div className="text-center mt-8">
            <button className={`${isDarkMode ? 'bg-white/10' : 'bg-black/10'} backdrop-blur-sm ${textColorClass} px-6 py-3 rounded-lg text-sm font-mono font-semibold transition-all duration-300 transform hover:scale-105 ${isDarkMode ? 'hover:bg-white/20' : 'hover:bg-black/20'} hover:shadow-2xl ${isDarkMode ? 'hover:shadow-white/20' : 'hover:shadow-black/20'} border ${isDarkMode ? 'border-white/20' : 'border-black/20'}`}>
              View All Publications ({researchPapers.length} total)
            </button>
          </div>
        </div>

        {/* Research Statistics */}
        <div className={`${isDarkMode ? 'bg-white/5' : 'bg-black/5'} backdrop-blur-sm border ${isDarkMode ? 'border-white/10' : 'border-black/10'} rounded-xl p-8 mb-16`}>
          <h2 className={`text-3xl font-bold ${textColorClass} text-center mb-8 font-mono`}>
            Research Impact
          </h2>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className={`text-4xl font-bold ${textColorClass} mb-2 font-mono`}>
                18+
              </div>
              <div className={`${mutedTextColorClass} font-mono`}>
                Research Papers
              </div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold ${textColorClass} mb-2 font-mono`}>
                16+
              </div>
              <div className={`${mutedTextColorClass} font-mono`}>
                Scientific Domains
              </div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold ${textColorClass} mb-2 font-mono`}>
                95%
              </div>
              <div className={`${mutedTextColorClass} font-mono`}>
                Accuracy Rate
              </div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold ${textColorClass} mb-2 font-mono`}>
                24/7
              </div>
              <div className={`${mutedTextColorClass} font-mono`}>
                Research Operation
              </div>
            </div>
          </div>
        </div>

        {/* Research Domains Breakdown */}
        <div className={`${isDarkMode ? 'bg-white/5' : 'bg-black/5'} backdrop-blur-sm border ${isDarkMode ? 'border-white/10' : 'border-black/10'} rounded-xl p-8 mb-16`}>
          <h2 className={`text-3xl font-bold ${textColorClass} text-center mb-8 font-mono`}>
            Research Domains
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { domain: "AI Research", papers: 2, impact: "High" },
              { domain: "Climate Science", papers: 1, impact: "Critical" },
              { domain: "Machine Learning", papers: 1, impact: "High" },
              { domain: "Quantum Computing", papers: 2, impact: "Breakthrough" },
              { domain: "Biomedicine", papers: 1, impact: "High" },
              { domain: "Theoretical Physics", papers: 1, impact: "High" },
              { domain: "Systems Science", papers: 1, impact: "Medium" },
              { domain: "Materials Science", papers: 1, impact: "High" },
              { domain: "Cybersecurity", papers: 1, impact: "Critical" },
              { domain: "Cognitive Science", papers: 1, impact: "Breakthrough" },
              { domain: "Pharmaceuticals", papers: 1, impact: "High" },
              { domain: "Aerospace", papers: 1, impact: "High" },
              { domain: "Synthetic Biology", papers: 1, impact: "High" },
              { domain: "Energy Systems", papers: 1, impact: "Critical" },
              { domain: "Financial Technology", papers: 1, impact: "Medium" },
              { domain: "Neurotechnology", papers: 1, impact: "Breakthrough" },
              { domain: "Environmental Science", papers: 1, impact: "Critical" }
            ].map((item, index) => (
              <div key={index} className={`${isDarkMode ? 'bg-white/5' : 'bg-black/5'} backdrop-blur-sm border ${isDarkMode ? 'border-white/10' : 'border-black/10'} rounded-lg p-4`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`text-sm font-bold ${textColorClass} font-mono`}>
                    {item.domain}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    item.impact === 'Breakthrough' ? (isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-500/10 text-green-600') :
                    item.impact === 'Critical' ? (isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-500/10 text-red-600') :
                    item.impact === 'High' ? (isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/10 text-blue-600') :
                    (isDarkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-500/10 text-yellow-600')
                  } font-mono`}>
                    {item.impact}
                  </span>
                </div>
                <p className={`text-xs ${mutedTextColorClass} font-mono`}>
                  {item.papers} paper{item.papers !== 1 ? 's' : ''} published
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Research Timeline */}
        <div className={`${isDarkMode ? 'bg-white/5' : 'bg-black/5'} backdrop-blur-sm border ${isDarkMode ? 'border-white/10' : 'border-black/10'} rounded-xl p-8 mb-16`}>
          <h2 className={`text-3xl font-bold ${textColorClass} text-center mb-8 font-mono`}>
            Research Timeline
          </h2>
          <div className="space-y-6">
            {[
              { month: "January 2025", milestone: "Autonomous Research Engine Deployment", status: "Completed" },
              { month: "February 2025", milestone: "Cross-Domain Knowledge Synthesis Framework", status: "Completed" },
              { month: "March 2025", milestone: "Quantum Algorithm Discovery System", status: "Completed" },
              { month: "April 2025", milestone: "Biomedical Research Acceleration Platform", status: "Completed" },
              { month: "May 2025", milestone: "Materials Science Discovery Engine", status: "Completed" },
              { month: "June 2025", milestone: "Cybersecurity Protocol Evolution System", status: "Completed" },
              { month: "July 2025", milestone: "Cognitive Architecture Mapping Project", status: "Completed" },
              { month: "August 2025", milestone: "Pharmaceutical Discovery Automation", status: "Completed" },
              { month: "September 2025", milestone: "Aerospace Mission Planning AI", status: "In Progress" },
              { month: "October 2025", milestone: "Energy Systems Optimization Platform", status: "Planned" },
              { month: "November 2025", milestone: "Neurotechnology Interface Development", status: "Planned" },
              { month: "December 2025", milestone: "Environmental Monitoring AI System", status: "Planned" }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`flex-shrink-0 w-3 h-3 rounded-full ${
                  item.status === 'Completed' ? (isDarkMode ? 'bg-green-500' : 'bg-green-600') :
                  item.status === 'In Progress' ? (isDarkMode ? 'bg-yellow-500' : 'bg-yellow-600') :
                  item.status === 'Planned' ? (isDarkMode ? 'bg-blue-500' : 'bg-blue-600') :
                  (isDarkMode ? 'bg-gray-500' : 'bg-gray-400')
                }`}></div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className={`text-sm font-bold ${textColorClass} font-mono`}>
                      {item.milestone}
                    </h3>
                    <span className={`text-xs ${mutedTextColorClass} font-mono`}>
                      {item.month}
                    </span>
                  </div>
                  <p className={`text-xs ${mutedTextColorClass} font-mono`}>
                    Status: {item.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className={`${mutedTextColorClass} mb-8 font-mono`}>
            Access our complete research database
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#contact" 
              className={`group relative ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} backdrop-blur-sm ${textColorClass} px-8 py-4 rounded-lg text-lg font-mono font-semibold transition-all duration-300 transform hover:scale-105 ${isDarkMode ? 'hover:bg-white/20' : 'hover:bg-black/20'} hover:shadow-2xl ${isDarkMode ? 'hover:shadow-white/20' : 'hover:shadow-black/20'} overflow-hidden border ${isDarkMode ? 'border-white/20' : 'border-black/20'}`}
            >
              <span className="relative z-10">Request Access</span>
              <div className={`absolute inset-0 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </a>
            <a 
              href="/" 
              className={`group relative bg-transparent border ${isDarkMode ? 'border-white/20' : 'border-black/20'} ${textColorClass} px-8 py-4 rounded-lg text-lg font-mono font-semibold transition-all duration-300 transform hover:scale-105 hover:border-opacity-60 hover:bg-opacity-5 overflow-hidden`}
            >
              <span className="relative z-10">Back to Home</span>
              <div className={`absolute inset-0 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResearchPage;

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/AppContext';
import { OptimizedMatrixRain, OptimizedNeuralNetwork, OptimizedFloatingCode } from './OptimizedAnimations';


// --- Theme Toggle Component ---
const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = React.useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
        isDarkMode
          ? 'bg-white/10 hover:bg-white/20 text-white'
          : 'bg-black/10 hover:bg-black/20 text-black'
      }`}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDarkMode ? (
        // Sun icon for light mode
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        // Moon icon for dark mode
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
};

// --- Advanced Animation Components ---

// Matrix Code Rain Effect
const MatrixRain = ({ className = "" }) => {
  const canvasRef = useRef(null);
  const { isDarkMode } = React.useContext(ThemeContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = isDarkMode ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = isDarkMode ? '#fff' : '#000';
      ctx.font = `${fontSize}px 'Courier New', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDarkMode]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ opacity: 0.1 }}
    />
  );
};

// Advanced Neural Network Visualization
const NeuralNetwork = ({ className = "" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isActive = true;

    const resizeCanvas = () => {
      if (!canvas.offsetWidth || !canvas.offsetHeight) return;
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };

    class Node {
      constructor(x, y, layer) {
        this.x = x;
        this.y = y;
        this.layer = layer;
        this.connections = [];
        this.value = Math.random();
        this.targetValue = Math.random();
      }

      update() {
        this.value += (this.targetValue - this.value) * 0.1;
        if (Math.abs(this.value - this.targetValue) < 0.01) {
          this.targetValue = Math.random();
        }
      }

      draw() {
        const intensity = this.value * 255;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${intensity}, ${intensity}, ${intensity})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.value * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }

    class Connection {
      constructor(from, to) {
        this.from = from;
        this.to = to;
        this.weight = Math.random() * 2 - 1;
      }

      draw() {
        if (!this.from || !this.to) return;
        const intensity = Math.abs(this.weight) * 255;
        ctx.beginPath();
        ctx.moveTo(this.from.x, this.from.y);
        ctx.lineTo(this.to.x, this.to.y);
        ctx.strokeStyle = `rgba(${intensity}, ${intensity}, ${intensity}, ${Math.abs(this.weight) * 0.3})`;
        ctx.lineWidth = Math.abs(this.weight) * 2;
        ctx.stroke();
      }
    }

    const layers = [4, 6, 4, 3];
    const nodes = [];
    const connections = [];

    const createNetwork = () => {
      nodes.length = 0;
      connections.length = 0;

      if (canvas.width <= 0 || canvas.height <= 0) return;

      const layerWidth = canvas.width / 4;
      const maxNodes = Math.max(...layers);

      layers.forEach((layerSize, layerIndex) => {
        const x = layerWidth * (layerIndex + 0.5);
        const nodeSpacing = canvas.height / (maxNodes + 1);

        for (let i = 0; i < layerSize; i++) {
          const y = (i + 1) * nodeSpacing;
          const node = new Node(x, y, layerIndex);
          nodes.push(node);

          if (layerIndex > 0) {
            const prevLayerStart = layers.slice(0, layerIndex).reduce((sum, size) => sum + size, 0);
            const prevLayerSize = layers[layerIndex - 1];

            for (let j = 0; j < prevLayerSize; j++) {
              const fromNode = nodes[prevLayerStart + j];
              connections.push(new Connection(fromNode, node));
            }
          }
        }
      });
    };

    const animate = () => {
      if (!isActive) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (nodes.length > 0) {
        nodes.forEach(node => node.update());
        connections.forEach(conn => conn.draw());
        nodes.forEach(node => node.draw());
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createNetwork();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createNetwork();
    });

    return () => {
      isActive = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
};

// Floating Code Elements
const FloatingCode = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const elements = container.children;

    const animate = () => {
      Array.from(elements).forEach((el, index) => {
        const time = Date.now() * 0.001;
        const delay = index * 0.5;
        const y = Math.sin(time + delay) * 10;
        const x = Math.cos(time * 0.5 + delay) * 8;
        const rotation = Math.sin(time * 0.3 + delay) * 3;
        
        el.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
      });
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <div className="absolute top-16 left-16 text-cyan-400 font-mono text-xs opacity-60">consciousness.emergence()</div>
      <div className="absolute top-32 right-24 text-purple-400 font-mono text-xs opacity-50">synthesis.quantum()</div>
      <div className="absolute bottom-24 left-24 text-green-400 font-mono text-xs opacity-55">intelligence.scale()</div>
      <div className="absolute bottom-16 right-16 text-blue-400 font-mono text-xs opacity-45">reasoning.abstract()</div>
      <div className="absolute top-48 left-1/3 text-yellow-400 font-mono text-xs opacity-40">understanding.deep()</div>
      <div className="absolute bottom-32 right-1/3 text-pink-400 font-mono text-xs opacity-35">creativity.generative()</div>
      <div className="absolute top-1/3 right-16 text-orange-400 font-mono text-xs opacity-50">learning.continuous()</div>
      <div className="absolute bottom-1/3 left-8 text-indigo-400 font-mono text-xs opacity-45">perception.multimodal()</div>
    </div>
  );
};

// --- Layout Components ---

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode } = React.useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerBgClass = isScrolled
    ? isDarkMode
      ? 'bg-black/90 backdrop-blur-xl border-b border-white/10'
      : 'bg-white/90 backdrop-blur-xl border-b border-black/10'
    : 'bg-transparent';

  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const hoverTextColorClass = isDarkMode ? 'hover:text-white' : 'hover:text-black';
  const mutedTextColorClass = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const borderColorClass = isDarkMode ? 'border-white/20' : 'border-black/20';
  const bgColorClass = isDarkMode ? 'bg-white/10' : 'bg-black/10';
  const hoverBgColorClass = isDarkMode ? 'hover:bg-white/20' : 'hover:bg-black/20';
  const shadowColorClass = isDarkMode ? 'hover:shadow-white/20' : 'hover:shadow-black/20';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBgClass}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className={`text-lg font-mono font-bold tracking-wider relative group ${textColorClass}`}>
              <span className={`${textColorClass} animate-pulse`}>PRAXIS</span>
              <div className={`absolute -bottom-1 left-0 w-0 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-black'} transition-all duration-300 group-hover:w-full shadow-lg ${isDarkMode ? 'shadow-white/50' : 'shadow-black/50'}`}></div>
            </Link>
          </div>
          <nav className="hidden md:block">
            <div className="ml-8 flex items-baseline space-x-6">
              <Link to="/about" className={`${mutedTextColorClass} ${hoverTextColorClass} px-2 py-1 rounded text-sm font-mono transition-all duration-300 relative group`}>
                About
                <div className={`absolute -bottom-1 left-0 w-0 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-black'} transition-all duration-300 group-hover:w-full`}></div>
              </Link>
              <Link to="/research" className={`${mutedTextColorClass} ${hoverTextColorClass} px-2 py-1 rounded text-sm font-mono transition-all duration-300 relative group`}>
                Research
                <div className={`absolute -bottom-1 left-0 w-0 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-black'} transition-all duration-300 group-hover:w-full`}></div>
              </Link>
              <Link to="/engineering" className={`${mutedTextColorClass} ${hoverTextColorClass} px-2 py-1 rounded text-sm font-mono transition-all duration-300 relative group`}>
                Engineering
                <div className={`absolute -bottom-1 left-0 w-0 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-black'} transition-all duration-300 group-hover:w-full`}></div>
              </Link>
              <Link to="/services" className={`${mutedTextColorClass} ${hoverTextColorClass} px-2 py-1 rounded text-sm font-mono transition-all duration-300 relative group`}>
                Services
                <div className={`absolute -bottom-1 left-0 w-0 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-black'} transition-all duration-300 group-hover:w-full`}></div>
              </Link>
            </div>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/demo" className={`relative ${bgColorClass} backdrop-blur-sm ${textColorClass} px-4 py-2 rounded-lg text-sm font-mono font-semibold transition-all duration-300 transform hover:scale-105 ${hoverBgColorClass} hover:shadow-2xl ${shadowColorClass} group overflow-hidden ${borderColorClass}`}>
              <span className="relative z-10">Demo</span>
              <div className={`absolute inset-0 ${bgColorClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </Link>
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${mutedTextColorClass} ${hoverTextColorClass} p-2`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden ${isDarkMode ? 'bg-black/95' : 'bg-white/95'} backdrop-blur-xl border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/about" className={`block px-3 py-2 ${mutedTextColorClass} ${hoverTextColorClass} transition-colors font-mono text-sm`}>About</Link>
            <Link to="/research" className={`block px-3 py-2 ${mutedTextColorClass} ${hoverTextColorClass} transition-colors font-mono text-sm`}>Research</Link>
            <Link to="/engineering" className={`block px-3 py-2 ${mutedTextColorClass} ${hoverTextColorClass} transition-colors font-mono text-sm`}>Engineering</Link>
            <Link to="/services" className={`block px-3 py-2 ${mutedTextColorClass} ${hoverTextColorClass} transition-colors font-mono text-sm`}>Services</Link>
            <Link to="/demo" className={`block px-3 py-2 ${textColorClass} font-semibold font-mono text-sm`}>Demo</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export const Hero = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { isDarkMode } = React.useContext(ThemeContext);
  const heroTexts = [
    "Super",
    "Intelligence",
    "Research"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroTexts.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
  };

  const bgColorClass = isDarkMode ? 'bg-black' : 'bg-white';
  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColorClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const placeholderColorClass = isDarkMode ? 'placeholder-gray-400' : 'placeholder-gray-600';
  const borderColorClass = isDarkMode ? 'border-white/20' : 'border-black/20';
  const focusBorderColorClass = isDarkMode ? 'focus:border-white/40' : 'focus:border-black/40';
  const hoverBorderColorClass = isDarkMode ? 'group-hover:border-white/30' : 'group-hover:border-black/30';
  const bgOpacityClass = isDarkMode ? 'bg-white/5' : 'bg-black/5';
  const focusBgOpacityClass = isDarkMode ? 'focus:bg-white/10' : 'focus:bg-black/10';
  const hoverBgOpacityClass = isDarkMode ? 'group-hover:bg-white/8' : 'group-hover:bg-black/8';
  const buttonBgOpacityClass = isDarkMode ? 'bg-white/10' : 'bg-black/10';
  const buttonHoverBgOpacityClass = isDarkMode ? 'hover:bg-white/20' : 'hover:bg-black/20';
  const shadowColorClass = isDarkMode ? 'hover:shadow-white/20' : 'hover:shadow-black/20';
  const gridBgColor = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  return (
    <section id="home" className={`relative min-h-screen flex items-center justify-center text-center overflow-hidden ${bgColorClass} pt-16`}>
      <OptimizedMatrixRain />
      <OptimizedNeuralNetwork className="opacity-20" />
      <OptimizedFloatingCode />

      {/* Grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(${gridBgColor} 1px, transparent 1px),
                          linear-gradient(90deg, ${gridBgColor} 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="relative z-10 px-4 max-w-2xl mx-auto">
        <div className="mb-12">
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-mono font-bold ${textColorClass} tracking-tight leading-tight mb-6`}>
            Advanced
            <br />
            <span className={`${textColorClass} animate-pulse`}>
              {heroTexts[textIndex]}
            </span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
            <div className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search algorithms, research, development..."
                className={`w-full ${bgOpacityClass} backdrop-blur-sm border ${borderColorClass} rounded-xl px-6 py-4 ${textColorClass} ${placeholderColorClass} font-mono text-sm focus:outline-none ${focusBorderColorClass} ${focusBgOpacityClass} transition-all duration-300 ${hoverBorderColorClass} ${hoverBgOpacityClass}`}
              />
              <button
                type="submit"
                className={`absolute right-2 top-1/2 -translate-y-1/2 ${buttonBgOpacityClass} backdrop-blur-sm ${textColorClass} p-2 rounded-lg ${buttonHoverBgOpacityClass} transition-all duration-300`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        <p className={`mb-8 max-w-lg mx-auto text-sm md:text-base ${mutedTextColorClass} leading-relaxed font-mono`}>
          Research-driven development platform for advanced algorithms and computational systems.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/#features" className={`group relative ${buttonBgOpacityClass} backdrop-blur-sm ${textColorClass} px-6 py-3 rounded-lg text-sm font-mono font-semibold transition-all duration-300 transform hover:scale-105 ${buttonHoverBgOpacityClass} hover:shadow-2xl ${shadowColorClass} overflow-hidden ${borderColorClass}`}>
            <span className="relative z-10">Explore Features</span>
            <div className={`absolute inset-0 ${buttonBgOpacityClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
          </Link>
          <Link to="/research" className={`group relative bg-transparent border ${borderColorClass} ${textColorClass} px-6 py-3 rounded-lg text-sm font-mono font-semibold transition-all duration-300 transform hover:scale-105 hover:border-opacity-60 hover:bg-opacity-5 overflow-hidden`}>
            <span className="relative z-10">View Research</span>
            <div className={`absolute inset-0 ${bgOpacityClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const [openDropdown, setOpenDropdown] = React.useState(null);

  const bgColorClass = isDarkMode ? 'bg-black/50' : 'bg-white/50';
  const borderColorClass = isDarkMode ? 'border-white/10' : 'border-black/10';
  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const linkColorClass = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const hoverLinkColorClass = isDarkMode ? 'hover:text-white' : 'hover:text-black';
  const copyrightColorClass = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const radialBgColor = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
  const dropdownBgClass = isDarkMode ? 'bg-black/80' : 'bg-white/80';
  const dropdownBorderClass = isDarkMode ? 'border-white/20' : 'border-black/20';

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Iceberg Overview", href: "/iceberg-overview" },
        { name: "Iceberg AGI Protocol", href: "/iceberg-protocol" },
        { name: "Platform", href: "/platform" },
        { name: "Enterprise", href: "/enterprise" }
      ]
    },
    {
      title: "Research",
      links: [
        { name: "Research Overview", href: "/research" },
        { name: "Index", href: "/research-index" },
        { name: "Publications", href: "/research/publications" },
        { name: "Methodology", href: "/research/methodology" }
      ]
    },
    {
      title: "Models",
      links: [
        { name: "Thesidia", href: "/models/thesidia" },
        { name: "ICEBERG", href: "/models/iceberg" },
        { name: "Katana", href: "/models/katana" },
        { name: "Ice-nano", href: "/models/ice-nano" }
      ]
    },
    {
      title: "Transparency",
      links: [
        { name: "Data Non-Collection", href: "/transparency/data" },
        { name: "Scaling Responsibly", href: "/transparency/scaling" },
        { name: "Safety and Security", href: "/transparency/safety" },
        { name: "Ethics Framework", href: "/transparency/ethics" }
      ]
    },
    {
      title: "Solutions",
      links: [
        { name: "Education", href: "/solutions/education" },
        { name: "Financial Services", href: "/solutions/financial" },
        { name: "Government", href: "/solutions/government" },
        { name: "Community", href: "/solutions/community" }
      ]
    },
    {
      title: "Learn",
      links: [
        { name: "Praxis Labs", href: "/learn/labs" },
        { name: "Global Engineers Alliance", href: "/learn/alliance" },
        { name: "Partner Directory", href: "/learn/partners" },
        { name: "People's Stories", href: "/learn/stories" }
      ]
    },
    {
      title: "Explore",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Events", href: "/events" },
        { name: "News", href: "/news" }
      ]
    },
    {
      title: "Terms & Policy",
      links: [
        { name: "Integrity", href: "/terms/integrity" },
        { name: "Honesty", href: "/terms/honesty" },
        { name: "Transparency", href: "/terms/transparency" },
        { name: "Privacy Policy", href: "/terms/privacy" }
      ]
    }
  ];

  return (
    <footer className={`${bgColorClass} backdrop-blur-xl border-t ${borderColorClass} relative overflow-hidden`}>
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${radialBgColor} 0%, transparent 50%)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 mb-12">
          {footerSections.map((section, index) => (
            <div key={index} className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                className={`w-full text-left ${textColorClass} hover:opacity-80 transition-all duration-300 group`}
              >
                <h3 className={`text-sm font-mono font-semibold tracking-wider uppercase flex items-center justify-between`}>
                  {section.title}
                  <span className={`transform transition-transform duration-300 ${openDropdown === index ? 'rotate-180' : 'rotate-0'} text-xs`}>
                    ▼
                  </span>
                </h3>
              </button>
              
              {/* Dropdown Content */}
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openDropdown === index ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
              }`}>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} className={`transform transition-all duration-300 ${
                      openDropdown === index 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-2 opacity-0'
                    }`} style={{ transitionDelay: `${linkIndex * 50}ms` }}>
                      <Link 
                        to={link.href} 
                        className={`${linkColorClass} ${hoverLinkColorClass} transition-colors duration-300 font-mono text-xs hover:underline block py-1`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className={`border-t ${borderColorClass} pt-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <Link to="/" className={`text-xl font-mono font-bold ${textColorClass} tracking-wider`}>
                PRAXIS
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link to="/about" className={`${linkColorClass} ${hoverLinkColorClass} transition-colors duration-300 font-mono text-sm`}>About</Link>
                <Link to="/research" className={`${linkColorClass} ${hoverLinkColorClass} transition-colors duration-300 font-mono text-sm`}>Research</Link>
                <Link to="/engineering" className={`${linkColorClass} ${hoverLinkColorClass} transition-colors duration-300 font-mono text-sm`}>Engineering</Link>
                <Link to="/services" className={`${linkColorClass} ${hoverLinkColorClass} transition-colors duration-300 font-mono text-sm`}>Services</Link>
              </div>
            </div>
            <p className={`text-xs ${copyrightColorClass} font-mono`}>
              &copy; {new Date().getFullYear()} Praxis Research & Development. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

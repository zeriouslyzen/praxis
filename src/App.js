import React, { useState, useEffect, useRef } from 'react';

// --- Helper Components ---

// Icon component for consistent styling
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={path} />
  </svg>
);

// --- SVG Icons (as components for clarity) ---
const BrainCircuitIcon = () => <Icon path="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.89 1.53 2.34 1.09 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.94c0-1.1.39-1.99 1.03-2.69c-.1-.25-.45-1.27.1-2.65c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.38.2 2.4.1 2.65c.64.7 1.03 1.6 1.03 2.69c0 3.84-2.34 4.68-4.57 4.93c.36.31.69.92.69 1.85V21.5c0 .27.18.58.69.48A10 10 0 0 0 22 12A10 10 0 0 0 12 2Z" />;
const ShieldCheckIcon = () => <Icon path="M9 12.75L11.25 15L15 9.75M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0Z" />;
const NetworkIcon = () => <Icon path="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />;
const ChartBarIcon = () => <Icon path="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />;

// --- Advanced Animation Components ---

// Matrix Code Rain Effect
const MatrixRain = ({ className = "" }) => {
  const canvasRef = useRef(null);

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
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#fff';
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
  }, []);

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

// --- Section Components ---

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <a href="#home" className="text-white text-lg font-mono font-bold tracking-wider relative group">
                           <span className="text-white animate-pulse">PRAXIS</span>
                           <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full shadow-lg shadow-white/50"></div>
                        </a>
                    </div>
                    <nav className="hidden md:block">
                        <div className="ml-8 flex items-baseline space-x-6">
                            <a href="#about" className="text-gray-300 hover:text-white px-2 py-1 rounded text-sm font-mono transition-all duration-300 relative group">
                                About
                                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
                            </a>
                            <a href="#services" className="text-gray-300 hover:text-white px-2 py-1 rounded text-sm font-mono transition-all duration-300 relative group">
                                Services
                                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
                            </a>
                            <a href="#technology" className="text-gray-300 hover:text-white px-2 py-1 rounded text-sm font-mono transition-all duration-300 relative group">
                                Technology
                                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
                            </a>
                        </div>
                    </nav>
                    <div className="hidden md:block">
                        <a href="#contact" className="relative bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-mono font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-white/20 hover:shadow-2xl hover:shadow-white/20 group overflow-hidden border border-white/20">
                            <span className="relative z-10">Demo</span>
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </a>
                    </div>
                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-300 hover:text-white p-2"
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
                <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <a href="#about" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors font-mono text-sm">About</a>
                        <a href="#services" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors font-mono text-sm">Services</a>
                        <a href="#technology" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors font-mono text-sm">Technology</a>
                        <a href="#contact" className="block px-3 py-2 text-white font-semibold font-mono text-sm">Demo</a>
                    </div>
                </div>
            )}
        </header>
    );
};

const Hero = () => {
    const [textIndex, setTextIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const heroTexts = [
        "Research",
        "Development",
        "Innovation"
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

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-black pt-16">
            <MatrixRain />
            <NeuralNetwork className="opacity-20" />
            <FloatingCode />
            
            {/* Grid background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                }}></div>
            </div>

            <div className="relative z-10 px-4 max-w-2xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-white tracking-tight leading-tight mb-6">
                        Advanced
                        <br />
                        <span className="text-white animate-pulse">
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
                                className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 text-white placeholder-gray-400 font-mono text-sm focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/8"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/20 transition-all duration-300"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
                
                <p className="mb-8 max-w-lg mx-auto text-sm md:text-base text-gray-400 leading-relaxed font-mono">
                    Research-driven development platform for advanced algorithms and computational systems.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="#services" className="group relative bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg text-sm font-mono font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-white/20 hover:shadow-2xl hover:shadow-white/20 overflow-hidden border border-white/20">
                        <span className="relative z-10">Explore</span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </a>
                    <a href="#contact" className="group relative bg-transparent border border-white/20 text-white px-6 py-3 rounded-lg text-sm font-mono font-semibold transition-all duration-300 transform hover:scale-105 hover:border-white/40 hover:bg-white/5 overflow-hidden">
                        <span className="relative z-10">Demo</span>
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </a>
                </div>
            </div>
        </section>
    );
};

const Section = ({ id, children, className = "" }) => (
    <section id={id} className={`py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative ${className}`}>
        <div className="max-w-4xl mx-auto relative z-10">
            {children}
        </div>
    </section>
);

const SectionTitle = ({ children, className = "" }) => (
    <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-mono font-bold text-center text-white tracking-tight mb-6 ${className}`}>
        {children}
    </h2>
);

const SectionSubtitle = ({ children, className = "" }) => (
    <p className={`mt-4 max-w-2xl mx-auto text-center text-sm md:text-base text-gray-400 leading-relaxed font-mono ${className}`}>
        {children}
    </p>
);

const About = () => {
    const capabilities = [
        { 
            name: "Algorithms", 
            icon: <BrainCircuitIcon />, 
            desc: "Advanced computational methods for complex problem solving.",
            gradient: "from-white/20 to-white/10"
        },
        { 
            name: "Research", 
            icon: <NetworkIcon />, 
            desc: "Cutting-edge research in neural networks and AI systems.",
            gradient: "from-white/20 to-white/10"
        },
        { 
            name: "Development", 
            icon: <ShieldCheckIcon />, 
            desc: "Rapid prototyping and development of innovative solutions.",
            gradient: "from-white/20 to-white/10"
        },
        { 
            name: "Innovation", 
            icon: <ChartBarIcon />, 
            desc: "Pushing boundaries with next-generation technology.",
            gradient: "from-white/20 to-white/10"
        }
    ];

    return (
        <Section id="about" className="bg-black">
            <SectionTitle>Research & Development</SectionTitle>
            <SectionSubtitle>
                Focused on advancing technology through sophisticated research and development.
            </SectionSubtitle>
            
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {capabilities.map((item, index) => (
                    <div 
                        key={item.name} 
                        className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center transform transition-all duration-500 hover:-translate-y-2 hover:border-white/30 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/10 overflow-hidden"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        {/* Animated background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                        
                        <div className={`mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-white/10 text-white mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                            {item.icon}
                        </div>
                        
                        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-white transition-colors duration-300 font-mono">
                            {item.name}
                        </h3>
                        
                        <p className="text-gray-400 leading-relaxed font-mono text-sm">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </Section>
    );
};

const Services = () => {
    const services = [
        { 
            title: "Algorithm Research",
            features: ["Neural network optimization", "Quantum algorithm design", "Pattern recognition"],
            gradient: "from-white/10 to-white/5"
        },
        { 
            title: "Development Platform",
            features: ["High-performance computing", "Distributed processing", "Real-time analytics"],
            gradient: "from-white/10 to-white/5"
        },
        { 
            title: "Innovation Lab",
            features: ["Research & development", "Prototype development", "Technology integration"],
            gradient: "from-white/10 to-white/5"
        },
    ];

    return (
        <Section id="services" className="bg-black">
            <SectionTitle>Development Platform</SectionTitle>
            <SectionSubtitle>
                Modular tools for research and development challenges.
            </SectionSubtitle>
            
            <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
                {services.map((service, index) => (
                    <div 
                        key={service.title} 
                        className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 flex flex-col transform transition-all duration-500 hover:-translate-y-2 hover:border-white/30 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/10 overflow-hidden"
                        style={{ animationDelay: `${index * 0.2}s` }}
                    >
                        {/* Animated background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                        
                        <h3 className="text-xl font-bold text-white mb-6 group-hover:text-white transition-colors duration-300 font-mono">
                            {service.title}
                        </h3>
                        
                        <ul className="space-y-4 text-gray-300 flex-grow">
                            {service.features.map(feature => (
                                <li key={feature} className="flex items-start group/item">
                                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5 group-hover/item:bg-white/30 transition-colors duration-300">
                                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="group-hover/item:text-white transition-colors duration-300 font-mono text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        
                        <a href="#services" className="mt-6 block text-center bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105 font-mono text-sm border border-white/20">
                            Learn More
                        </a>
                    </div>
                ))}
            </div>
        </Section>
    );
};

const Technology = () => (
    <Section id="technology" className="bg-black">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
                <SectionTitle className="text-left">Research Infrastructure</SectionTitle>
                <p className="mt-4 text-sm md:text-base text-gray-400 leading-relaxed font-mono">
                    Built on cutting-edge technology with enterprise-level scalability and performance for research applications.
                </p>
                <ul className="mt-8 space-y-4">
                    <li className="flex items-center text-gray-300 group">
                        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center mr-4 group-hover:bg-white/20 transition-colors duration-300">
                            <ShieldCheckIcon />
                        </div>
                        <span className="text-sm group-hover:text-white transition-colors duration-300 font-mono">Security & Encryption</span>
                    </li>
                    <li className="flex items-center text-gray-300 group">
                        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center mr-4 group-hover:bg-white/20 transition-colors duration-300">
                            <NetworkIcon />
                        </div>
                        <span className="text-sm group-hover:text-white transition-colors duration-300 font-mono">Distributed Architecture</span>
                    </li>
                    <li className="flex items-center text-gray-300 group">
                        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center mr-4 group-hover:bg-white/20 transition-colors duration-300">
                            <ChartBarIcon />
                        </div>
                        <span className="text-sm group-hover:text-white transition-colors duration-300 font-mono">High-Performance Analytics</span>
                    </li>
                </ul>
            </div>
            <div className="relative h-64">
                <NeuralNetwork />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-mono text-xs space-y-1">
                    <p className="animate-fade-in-1 opacity-0 text-white">[RESEARCH]</p>
                    <p className="animate-fade-in-2 opacity-0 text-white">[DEVELOPMENT]</p>
                    <p className="animate-fade-in-3 opacity-0 text-white">[INNOVATION]</p>
                </div>
            </div>
        </div>
    </Section>
);

const CaseStudies = () => {
    const studies = [
        { 
            title: "Algorithm Research", 
            improvement: "95%", 
            field: "efficiency gain", 
            color: "white",
            gradient: "from-white/10 to-white/5"
        },
        { 
            title: "Neural Networks", 
            improvement: "400%", 
            field: "performance boost", 
            color: "white",
            gradient: "from-white/10 to-white/5"
        },
        { 
            title: "Development", 
            improvement: "75%", 
            field: "faster iteration", 
            color: "white",
            gradient: "from-white/10 to-white/5"
        },
    ];

    return (
        <Section id="casestudies" className="bg-black">
            <SectionTitle>Research Outcomes</SectionTitle>
            <SectionSubtitle>
                Measurable results from our research and development initiatives.
            </SectionSubtitle>
            
            <div className="mt-12 grid gap-6 md:grid-cols-3">
                {studies.map((study, index) => (
                    <div 
                        key={study.title} 
                        className={`group relative border-t border-white/20 bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:border-white/40 hover:bg-white/10 overflow-hidden`} 
                    >
                        {/* Animated background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                        
                        <h3 className="text-lg font-bold text-white mb-4 group-hover:text-white transition-colors duration-300 font-mono">
                            {study.title}
                        </h3>
                        
                        <p className="text-4xl font-bold mb-2 text-white">
                            {study.improvement}
                        </p>
                        
                        <p className="text-gray-400 text-sm mb-4 font-mono">{study.field}</p>
                        
                        <p className="text-gray-500 leading-relaxed font-mono text-sm">
                            Research breakthrough demonstrating significant performance improvements.
                        </p>
                    </div>
                ))}
            </div>
        </Section>
    );
};

const Footer = () => (
    <footer className="bg-black border-t border-white/10 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
                backgroundSize: '50px 50px'
            }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <p className="text-xl font-bold text-white mb-6 font-mono">
                <span className="text-white">PRAXIS</span>
            </p>
            <div className="mt-6 flex justify-center space-x-6">
                <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300 font-mono text-sm">About</a>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors duration-300 font-mono text-sm">Services</a>
                <a href="#technology" className="text-gray-400 hover:text-white transition-colors duration-300 font-mono text-sm">Technology</a>
            </div>
            <p className="mt-8 text-sm text-gray-500 font-mono">
                &copy; {new Date().getFullYear()} Praxis Research & Development. All rights reserved.
            </p>
        </div>
    </footer>
);

// --- Main App Component ---

export default function App() {
    // Effect for scroll-based animations
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('section > div').forEach(el => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="bg-black text-white font-mono overflow-x-hidden">
            <Header />
            <main>
                <Hero />
                <About />
                <Services />
                <Technology />
                <CaseStudies />
            </main>
            <Footer />
        </div>
    );
}

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Research Engine Visualization Component
const ResearchEngine = ({ isActive }) => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const animationRef = useRef(null);
  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer;
    let scene;
    let camera;

    try {
      // Try to create WebGL renderer with fallback options
      renderer = new THREE.WebGLRenderer({ 
        canvas, 
        alpha: true, 
        antialias: true,
        powerPreference: "default",
        failIfMajorPerformanceCaveat: false,
        preserveDrawingBuffer: false
      });
      
      scene = new THREE.Scene();
      sceneRef.current = scene;

      camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
      
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setClearColor(0x000000, 0);

      // Create central hub
      const hubGeometry = new THREE.SphereGeometry(2, 32, 32);
      const hubMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
        transparent: true, 
        opacity: 0.3,
        wireframe: true 
      });
      const hub = new THREE.Mesh(hubGeometry, hubMaterial);
      scene.add(hub);

      // Create domain streams
      const domains = [
        { name: 'Physics', color: 0x0066ff, position: new THREE.Vector3(-8, 4, 0) },
        { name: 'Biology', color: 0x00ff66, position: new THREE.Vector3(8, 4, 0) },
        { name: 'Chemistry', color: 0x9900ff, position: new THREE.Vector3(0, 8, 0) },
        { name: 'Mathematics', color: 0xff6600, position: new THREE.Vector3(-8, -4, 0) },
        { name: 'Engineering', color: 0xff0066, position: new THREE.Vector3(8, -4, 0) }
      ];

      const streams = [];
      domains.forEach((domain, index) => {
        const streamGeometry = new THREE.CylinderGeometry(0.1, 0.1, 6, 8);
        const streamMaterial = new THREE.MeshBasicMaterial({ 
          color: domain.color, 
          transparent: true, 
          opacity: 0.6 
        });
        const stream = new THREE.Mesh(streamGeometry, streamMaterial);
        stream.position.copy(domain.position);
        stream.lookAt(0, 0, 0);
        scene.add(stream);
        streams.push(stream);

        // Add particles flowing along stream
        for (let i = 0; i < 20; i++) {
          const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
          const particleMaterial = new THREE.MeshBasicMaterial({ color: domain.color });
          const particle = new THREE.Mesh(particleGeometry, particleMaterial);
          
          const t = i / 20;
          particle.position.lerpVectors(domain.position, new THREE.Vector3(0, 0, 0), t);
          scene.add(particle);
          
          // Animate particle flow
          gsap.to(particle.position, {
            duration: 3,
            x: 0,
            y: 0,
            z: 0,
            repeat: -1,
            delay: i * 0.1,
            ease: "none"
          });
        }
      });

      // Animate hub
      gsap.to(hub.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: "none"
      });

      // Add pulsing effect to hub
      gsap.to(hub.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

      camera.position.z = 15;

      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        if (renderer) {
          renderer.dispose();
        }
      };

    } catch (error) {
      console.warn('WebGL not available, falling back to 2D visualization:', error);
      setWebglError(true);
      
      // Fallback to 2D canvas animation
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = canvas.clientWidth * 2;
        canvas.height = canvas.clientHeight * 2;
        ctx.scale(2, 2);

        const particles = [];
        for (let i = 0; i < 50; i++) {
          particles.push({
            x: Math.random() * canvas.clientWidth,
            y: Math.random() * canvas.clientHeight,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`
          });
        }

        const animate = () => {
          animationRef.current = requestAnimationFrame(animate);
          
          ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
          
          // Draw central hub
          ctx.beginPath();
          ctx.arc(canvas.clientWidth / 2, canvas.clientHeight / 2, 40, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // Update and draw particles
          particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.clientWidth) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.clientHeight) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Draw connection to center
            const centerX = canvas.clientWidth / 2;
            const centerY = canvas.clientHeight / 2;
            const distance = Math.hypot(particle.x - centerX, particle.y - centerY);
            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(centerX, centerY);
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * (1 - distance / 100)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          });
        };
        animate();
      }

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isActive]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-64 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10"
    />
  );
};

// Pattern Recognition Module
const PatternRecognition = ({ isActive }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.clientWidth * 2;
    canvas.height = canvas.clientHeight * 2;
    ctx.scale(2, 2);

    const particles = [];
    const particleCount = 200;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.clientWidth,
        y: Math.random() * canvas.clientHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 2 + 1,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        phase: Math.random() * Math.PI * 2
      });
    }
    particlesRef.current = particles;

    let time = 0;
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      
      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Add subtle clustering behavior
        const clusteringForce = Math.sin(time * 0.001 + particle.phase) * 0.5;
        particle.vx += clusteringForce * 0.01;
        particle.vy += clusteringForce * 0.01;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.clientWidth) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.clientHeight) particle.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Draw connections
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const distance = Math.hypot(particle.x - otherParticle.x, particle.y - otherParticle.y);
            if (distance < 50) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * (1 - distance / 50)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      });
      
      time++;
    };
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-64 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10"
    />
  );
};

// Hypothesis Generation Module
const HypothesisGeneration = ({ isActive }) => {
  const containerRef = useRef(null);
  const nodesRef = useRef([]);
  const connectionsRef = useRef([]);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    const nodes = [];
    const connections = [];

    // Create hypothesis nodes
    const hypothesisIdeas = [
      'Quantum Computing', 'Neural Networks', 'Machine Learning', 
      'Data Synthesis', 'Pattern Recognition', 'Automated Research',
      'Cross-Domain Analysis', 'Predictive Modeling', 'Knowledge Graphs'
    ];

    // Create a proper grid layout
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const nodeWidth = 120; // Fixed width for consistency
    const nodeHeight = 40; // Fixed height for consistency
    const padding = 20; // Padding from edges
    const gap = 15; // Gap between nodes
    
    // Calculate grid dimensions
    const cols = 3;
    const rows = Math.ceil(hypothesisIdeas.length / cols);
    
    // Calculate available space and centering
    const totalGridWidth = cols * nodeWidth + (cols - 1) * gap;
    const totalGridHeight = rows * nodeHeight + (rows - 1) * gap;
    const startX = (containerWidth - totalGridWidth) / 2;
    const startY = (containerHeight - totalGridHeight) / 2;

    hypothesisIdeas.forEach((idea, index) => {
      const node = document.createElement('div');
      node.className = 'absolute bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-xs text-white font-mono transition-all duration-500';
      node.textContent = idea;
      
      // Calculate grid position
      const row = Math.floor(index / cols);
      const col = index % cols;
      
      // Position node in grid
      const x = startX + col * (nodeWidth + gap);
      const y = startY + row * (nodeHeight + gap);
      
      node.style.left = `${x}px`;
      node.style.top = `${y}px`;
      node.style.width = `${nodeWidth}px`;
      node.style.height = `${nodeHeight}px`;
      node.style.opacity = '0';
      node.style.transform = 'scale(0.8)';
      node.style.display = 'flex';
      node.style.alignItems = 'center';
      node.style.justifyContent = 'center';
      node.style.textAlign = 'center';
      
      container.appendChild(node);
      nodes.push(node);

      // Animate node appearance
      gsap.to(node, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: index * 0.2,
        ease: "back.out(1.7)"
      });

      // Add pulsing effect
      gsap.to(node, {
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: index * 0.2 + 0.8
      });
    });

    nodesRef.current = nodes;
    connectionsRef.current = connections;

    return () => {
      nodes.forEach(node => {
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      });
    };
  }, [isActive]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-64 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 overflow-hidden"
    />
  );
};

// Literature Synthesis Module
const LiteratureSynthesis = ({ isActive }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    const documents = [];

    // Create floating documents
    for (let i = 0; i < 8; i++) {
      const doc = document.createElement('div');
      doc.className = 'absolute bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg w-16 h-20 flex items-center justify-center text-white text-xs font-mono transition-all duration-1000';
      doc.textContent = `Paper ${i + 1}`;
      doc.style.left = `${10 + (i % 4) * 20}%`;
      doc.style.top = `${10 + Math.floor(i / 4) * 40}%`;
      doc.style.opacity = '0';
      doc.style.transform = 'translateY(20px)';
      
      container.appendChild(doc);
      documents.push(doc);

      // Animate document appearance
      gsap.to(doc, {
        opacity: 0.8,
        y: 0,
        duration: 1,
        delay: i * 0.3,
        ease: "power2.out"
      });

      // Add floating animation
      gsap.to(doc, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: i * 0.3 + 1
      });
    }

    return () => {
      documents.forEach(doc => {
        if (doc.parentNode) {
          doc.parentNode.removeChild(doc);
        }
      });
    };
  }, [isActive]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-64 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 overflow-hidden"
    />
  );
};

// Main Animated About Component
const AnimatedAbout = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('animated-about');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Auto-cycle through modules
      const interval = setInterval(() => {
        setActiveModule((prev) => (prev + 1) % 4);
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const modules = [
    {
      title: "Cross-Domain Knowledge Flow",
      description: "Advanced synthesis of research across multiple domains, creating new insights through intelligent data fusion.",
      component: ResearchEngine,
      metrics: ["10,000+ papers analyzed", "5+ domains integrated", "95% accuracy rate"]
    },
    {
      title: "Pattern Recognition",
      description: "Sophisticated algorithms that identify complex patterns in chaotic data, transforming noise into actionable insights.",
      component: PatternRecognition,
      metrics: ["200+ patterns detected", "Real-time processing", "99.7% precision"]
    },
    {
      title: "Hypothesis Generation",
      description: "Autonomous research systems that generate and validate hypotheses, accelerating discovery through intelligent automation.",
      component: HypothesisGeneration,
      metrics: ["50+ hypotheses generated", "Automated validation", "3x faster research"]
    },
    {
      title: "Literature Synthesis",
      description: "Intelligent document processing and synthesis, creating comprehensive knowledge graphs from vast research libraries.",
      component: LiteratureSynthesis,
      metrics: ["Petabyte-scale processing", "Multi-format support", "Instant synthesis"]
    }
  ];

  return (
    <section id="animated-about" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-mono font-bold text-white tracking-tight mb-6">
            Research Intelligence in Motion
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-mono">
            Experience the future of research through our advanced modular animation system, 
            demonstrating real-time intelligence synthesis and pattern recognition.
          </p>
        </div>

        {/* Module Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-2">
            {modules.map((module, index) => (
              <button
                key={index}
                onClick={() => setActiveModule(index)}
                className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${
                  activeModule === index
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {module.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Active Module Display */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-64">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 font-mono">
              {modules[activeModule].title}
            </h3>
            <p className="text-gray-400 mb-6 font-mono leading-relaxed">
              {modules[activeModule].description}
            </p>
            
            {/* Metrics */}
            <div className="space-y-3">
              {modules[activeModule].metrics.map((metric, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-white font-mono text-sm">{metric}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            {modules.map((module, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  activeModule === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <module.component isActive={activeModule === index} />
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
};

export default AnimatedAbout;

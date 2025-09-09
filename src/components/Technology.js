import React from 'react';
import { ThemeContext } from '../App';

// Icon component for consistent styling
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={path} />
  </svg>
);

const ShieldCheckIcon = () => <Icon path="M9 12.75L11.25 15L15 9.75M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0Z" />;
const NetworkIcon = () => <Icon path="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />;
const ChartBarIcon = () => <Icon path="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />;

// Advanced Neural Network Visualization
const NeuralNetwork = ({ className = "" }) => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
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

const Technology = () => {
  const { isDarkMode } = React.useContext(ThemeContext);

  const bgColorClass = isDarkMode ? 'bg-black' : 'bg-white';
  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColorClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const listTextColorClass = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const hoverTextColorClass = isDarkMode ? 'group-hover:text-white' : 'group-hover:text-black';
  const iconBgColorClass = isDarkMode ? 'bg-white/10' : 'bg-black/10';
  const iconHoverBgColorClass = isDarkMode ? 'group-hover:bg-white/20' : 'group-hover:bg-black/20';

  return (
    <Section id="technology" className={bgColorClass}>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionTitle className={`text-left ${textColorClass}`}>Research Infrastructure</SectionTitle>
          <p className={`mt-4 text-sm md:text-base ${mutedTextColorClass} leading-relaxed font-mono`}>
            Built on cutting-edge technology with enterprise-level scalability and performance for research applications.
          </p>
          <ul className="mt-8 space-y-4">
            <li className={`flex items-center ${listTextColorClass} group`}>
              <div className={`flex-shrink-0 h-10 w-10 rounded-lg ${iconBgColorClass} flex items-center justify-center mr-4 ${iconHoverBgColorClass} transition-colors duration-300`}>
                <ShieldCheckIcon />
              </div>
              <span className={`text-sm ${hoverTextColorClass} transition-colors duration-300 font-mono`}>Security & Encryption</span>
            </li>
            <li className={`flex items-center ${listTextColorClass} group`}>
              <div className={`flex-shrink-0 h-10 w-10 rounded-lg ${iconBgColorClass} flex items-center justify-center mr-4 ${iconHoverBgColorClass} transition-colors duration-300`}>
                <NetworkIcon />
              </div>
              <span className={`text-sm ${hoverTextColorClass} transition-colors duration-300 font-mono`}>Distributed Architecture</span>
            </li>
            <li className={`flex items-center ${listTextColorClass} group`}>
              <div className={`flex-shrink-0 h-10 w-10 rounded-lg ${iconBgColorClass} flex items-center justify-center mr-4 ${iconHoverBgColorClass} transition-colors duration-300`}>
                <ChartBarIcon />
              </div>
              <span className={`text-sm ${hoverTextColorClass} transition-colors duration-300 font-mono`}>High-Performance Analytics</span>
            </li>
          </ul>
        </div>
        <div className="relative h-64">
          <NeuralNetwork />
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${textColorClass} font-mono text-xs space-y-1`}>
            <p className="animate-fade-in-1 opacity-0 text-white">[RESEARCH]</p>
            <p className="animate-fade-in-2 opacity-0 text-white">[DEVELOPMENT]</p>
            <p className="animate-fade-in-3 opacity-0 text-white">[INNOVATION]</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Technology;

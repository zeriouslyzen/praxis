import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../contexts/AppContext';
import { useReducedMotion, useIsMobile, usePerformanceMode } from './AccessibilityUtils';

// Optimized Matrix Rain Effect
export const OptimizedMatrixRain = ({ className = "" }) => {
  const canvasRef = useRef(null);
  const { isDarkMode } = React.useContext(ThemeContext);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const isLowPerformance = usePerformanceMode();

  useEffect(() => {
    // Skip animation if user prefers reduced motion or on low-performance devices
    if (prefersReducedMotion || (isMobile && isLowPerformance)) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let lastTime = 0;
    const targetFPS = isMobile ? 30 : 60; // Reduce FPS on mobile
    const frameInterval = 1000 / targetFPS;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = isMobile ? 12 : 14; // Smaller font on mobile
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = (currentTime) => {
      if (currentTime - lastTime < frameInterval) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastTime = currentTime;

      // Smoother fade effect
      ctx.fillStyle = isDarkMode ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = isDarkMode ? '#fff' : '#000';
      ctx.font = `${fontSize}px 'Courier New', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Slower, more consistent reset
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i] += 0.5; // Slower movement
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw(0);

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDarkMode, prefersReducedMotion, isMobile, isLowPerformance]);

  // Return static element if animations are disabled
  if (prefersReducedMotion || (isMobile && isLowPerformance)) {
    return <div className={`absolute inset-0 w-full h-full ${className}`} style={{ opacity: 0.05 }} />;
  }

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ opacity: 0.1 }}
    />
  );
};

// Optimized Neural Network Visualization
export const OptimizedNeuralNetwork = ({ className = "" }) => {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const isLowPerformance = usePerformanceMode();

  useEffect(() => {
    if (prefersReducedMotion || (isMobile && isLowPerformance)) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isActive = true;
    let lastTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const resizeCanvas = () => {
      if (!canvas.offsetWidth || !canvas.offsetHeight) return;
      canvas.width = canvas.offsetWidth * (isMobile ? 1 : 2); // Lower resolution on mobile
      canvas.height = canvas.offsetHeight * (isMobile ? 1 : 2);
      if (!isMobile) {
        ctx.scale(2, 2);
      }
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
        ctx.arc(this.x, this.y, isMobile ? 4 : 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${intensity}, ${intensity}, ${intensity})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.value * 0.5})`;
        ctx.lineWidth = 1;
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
        ctx.lineWidth = Math.abs(this.weight) * (isMobile ? 1 : 2);
        ctx.stroke();
      }
    }

    const layers = isMobile ? [3, 4, 3] : [4, 6, 4, 3]; // Simpler network on mobile
    const nodes = [];
    const connections = [];

    const createNetwork = () => {
      nodes.length = 0;
      connections.length = 0;

      if (canvas.width <= 0 || canvas.height <= 0) return;

      const layerWidth = canvas.width / (layers.length + 1);
      const maxNodes = Math.max(...layers);

      layers.forEach((layerSize, layerIndex) => {
        const x = layerWidth * (layerIndex + 1);
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

    const animate = (currentTime) => {
      if (!isActive) return;
      
      if (currentTime - lastTime < frameInterval) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;
      
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
    animate(0);

    window.addEventListener('resize', () => {
      resizeCanvas();
      createNetwork();
    });

    return () => {
      isActive = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [prefersReducedMotion, isMobile, isLowPerformance]);

  if (prefersReducedMotion || (isMobile && isLowPerformance)) {
    return <div className={`absolute inset-0 w-full h-full ${className}`} style={{ opacity: 0.1 }} />;
  }

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
};

// Optimized Floating Code Elements
export const OptimizedFloatingCode = () => {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const isLowPerformance = usePerformanceMode();

  useEffect(() => {
    if (prefersReducedMotion || (isMobile && isLowPerformance)) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;
    
    const elements = container.children;
    let animationId;
    let startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = (currentTime - startTime) * 0.001; // Convert to seconds

      Array.from(elements).forEach((el, index) => {
        const delay = index * 0.5;
        const time = elapsed + delay;
        
        // Smoother, more gentle movement
        const y = Math.sin(time * 0.8) * (isMobile ? 3 : 6);
        const x = Math.cos(time * 0.6) * (isMobile ? 2 : 4);
        const rotation = Math.sin(time * 0.4) * (isMobile ? 1 : 2);
        
        // Use transform3d for better performance and smoother animation
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
      });
      
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [prefersReducedMotion, isMobile, isLowPerformance]);

  if (prefersReducedMotion || (isMobile && isLowPerformance)) {
    return (
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-16 text-cyan-400 font-mono text-xs opacity-60">consciousness.emergence()</div>
        <div className="absolute top-32 right-24 text-purple-400 font-mono text-xs opacity-50">synthesis.quantum()</div>
        <div className="absolute bottom-24 left-24 text-green-400 font-mono text-xs opacity-55">intelligence.scale()</div>
        <div className="absolute bottom-16 right-16 text-blue-400 font-mono text-xs opacity-45">reasoning.abstract()</div>
      </div>
    );
  }

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

// Optimized Motion Component
export const OptimizedMotion = ({ 
  children, 
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.6 },
  className = "",
  ...props 
}) => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const isLowPerformance = usePerformanceMode();

  // Skip animations if user prefers reduced motion or on low-performance devices
  if (prefersReducedMotion || (isMobile && isLowPerformance)) {
    return <div className={className}>{children}</div>;
  }

  // Reduce animation complexity on mobile
  const optimizedTransition = isMobile 
    ? { duration: 0.3, ease: "easeOut" }
    : transition;

  const optimizedInitial = isMobile 
    ? { opacity: 0 }
    : initial;

  const optimizedAnimate = isMobile 
    ? { opacity: 1 }
    : animate;

  return (
    <motion.div
      className={className}
      initial={optimizedInitial}
      animate={optimizedAnimate}
      transition={optimizedTransition}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Performance-aware hover effects
export const OptimizedHover = ({ 
  children, 
  hoverScale = 1.05,
  hoverY = -2,
  className = "",
  ...props 
}) => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const isLowPerformance = usePerformanceMode();

  if (prefersReducedMotion || (isMobile && isLowPerformance)) {
    return <div className={className}>{children}</div>;
  }

  const optimizedHoverScale = isMobile ? 1.02 : hoverScale;
  const optimizedHoverY = isMobile ? -1 : hoverY;

  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale: optimizedHoverScale,
        y: optimizedHoverY,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

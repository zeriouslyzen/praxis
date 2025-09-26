import React, { useState, useEffect, useRef } from 'react';
import { ThemeContext } from '../../contexts/AppContext';

export const IcebergLogo = ({ isScrolled, className = "" }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Generate nano particles for fine fog effect
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.2 + 0.05,
          size: Math.random() * 0.5 + 0.3
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  // Animate particles
  useEffect(() => {
    if (!isScrolled) return;

    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          x: (particle.x + particle.vx + 100) % 100,
          y: (particle.y + particle.vy + 100) % 100,
          opacity: Math.sin(Date.now() * 0.001 + particle.id) * 0.08 + 0.08
        }))
      );
      animationRef.current = requestAnimationFrame(animateParticles);
    };

    animationRef.current = requestAnimationFrame(animateParticles);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isScrolled]);

  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const outlineColorClass = isDarkMode ? 'text-white' : 'text-black';
  const glowColorClass = isDarkMode ? 'shadow-white/30' : 'shadow-black/30';

  if (!isScrolled) {
    // Normal PRAXIS logo
    return (
      <span className={`${textColorClass} animate-pulse transition-all duration-500 ${className}`}>
        PRAXIS
      </span>
    );
  }

  // Iceberg transformation
  return (
    <div className={`relative inline-block transition-all duration-1000 ${className}`}>
      {/* Particle fog effect */}
      {isScrolled && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map(particle => (
            <div
              key={particle.id}
              className={`absolute rounded-full ${isDarkMode ? 'bg-white' : 'bg-black'}`}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
                transition: 'opacity 0.3s ease'
              }}
            />
          ))}
        </div>
      )}

      {/* Aesthetic Jagged Pyramid Iceberg SVG */}
      <div className="relative">
        <svg
          width="50"
          height="60"
          viewBox="0 0 50 60"
          className={`transition-all duration-1000 ${isScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
        >
          {/* Main aesthetic jagged pyramid - visible part with glow */}
          <path
            d="M25 50 L20 40 L15 35 L18 30 L22 25 L25 20 L28 25 L32 30 L35 35 L30 40 L25 50 Z"
            fill="none"
            stroke={isDarkMode ? 'white' : 'black'}
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className={`transition-all duration-1000 ${isScrolled ? `opacity-100 ${isDarkMode ? 'iceberg-pulse' : 'iceberg-pulse-dark'}` : 'opacity-0'}`}
            style={{
              filter: isScrolled ? `drop-shadow(0 0 4px ${isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'})` : 'none'
            }}
          />

          {/* Left jagged section with glow */}
          <path
            d="M20 40 L15 35 L18 30 L22 25 L25 20 L22 25 L18 30 L15 35 L20 40 Z"
            fill="none"
            stroke={isDarkMode ? 'white' : 'black'}
            strokeWidth="1"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.7"
            className={`transition-all duration-1000 ${isScrolled ? 'opacity-70' : 'opacity-0'}`}
            style={{
              filter: isScrolled ? `drop-shadow(0 0 3px ${isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'})` : 'none'
            }}
          />

          {/* Right jagged section with glow */}
          <path
            d="M30 40 L35 35 L32 30 L28 25 L25 20 L28 25 L32 30 L35 35 L30 40 Z"
            fill="none"
            stroke={isDarkMode ? 'white' : 'black'}
            strokeWidth="1"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.7"
            className={`transition-all duration-1000 ${isScrolled ? 'opacity-70' : 'opacity-0'}`}
            style={{
              filter: isScrolled ? `drop-shadow(0 0 3px ${isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'})` : 'none'
            }}
          />

          {/* Underwater aesthetic pyramid section (hidden) */}
          <path
            d="M25 50 L20 55 L30 55 L25 50 Z"
            fill="none"
            stroke={isDarkMode ? 'white' : 'black'}
            strokeWidth="1.2"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.5"
            strokeDasharray="3,2"
            className={`transition-all duration-1000 ${isScrolled ? 'opacity-50' : 'opacity-0'}`}
          />
          
          {/* Water line */}
          <line
            x1="20"
            y1="50"
            x2="30"
            y2="50"
            stroke={isDarkMode ? 'white' : 'black'}
            strokeWidth="0.8"
            strokeLinecap="square"
            opacity="0.7"
            strokeDasharray="1,1"
            className={`transition-all duration-1000 ${isScrolled ? 'opacity-70' : 'opacity-0'}`}
          />
        </svg>

        {/* Subtle glow effect */}
        <div 
          className={`absolute inset-0 rounded-full transition-all duration-1000 ${
            isScrolled ? `opacity-100 iceberg-glow` : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(circle, ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 0%, transparent 70%)`,
            filter: 'blur(8px)'
          }}
        />
      </div>

    </div>
  );
};

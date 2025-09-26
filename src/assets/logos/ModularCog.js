import React, { useState, useEffect, useRef } from 'react';
import { ThemeContext } from '../../contexts/AppContext';

export const ModularCog = ({ isScrolled, className = "" }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const [scrollRotation, setScrollRotation] = useState(0);
  const [particles, setParticles] = useState([]);
  const animationRef = useRef(null);

  // Track scroll position for rotation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Rotate based on scroll position (360 degrees per 1000px scroll)
      const rotation = (scrollY * 0.36) % 360;
      setScrollRotation(rotation);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate nano particles for fine fog effect
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 12; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.15,
          opacity: Math.random() * 0.15 + 0.05,
          size: Math.random() * 0.4 + 0.2
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
          opacity: Math.sin(Date.now() * 0.001 + particle.id) * 0.06 + 0.06
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

  if (!isScrolled) {
    // Normal PRAXIS logo
    return (
      <span className={`${textColorClass} animate-pulse transition-all duration-500 ${className}`}>
        PRAXIS
      </span>
    );
  }

  // Modular cog transformation
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

      {/* Engineering Cog SVG */}
      <div className="relative">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          className={`transition-all duration-1000 ${isScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
          style={{
            transform: isScrolled ? `rotate(${scrollRotation}deg)` : 'rotate(0deg)',
            transformOrigin: 'center'
          }}
        >
          {/* Main gear body */}
          <circle
            cx="20"
            cy="20"
            r="16"
            fill="none"
            stroke={isDarkMode ? 'white' : 'black'}
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className={`transition-all duration-1000 ${isScrolled ? `opacity-100 ${isDarkMode ? 'cog-pulse' : 'cog-pulse-dark'}` : 'opacity-0'}`}
            style={{
              filter: isScrolled ? `drop-shadow(0 0 4px ${isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'})` : 'none'
            }}
          />

          {/* Center hole */}
          <circle
            cx="20"
            cy="20"
            r="6"
            fill="none"
            stroke={isDarkMode ? 'white' : 'black'}
            strokeWidth="1.2"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className={`transition-all duration-1000 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
            style={{
              filter: isScrolled ? `drop-shadow(0 0 3px ${isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'})` : 'none'
            }}
          />

          {/* Gear teeth - 8 teeth */}
          <rect x="18" y="2" width="4" height="6" fill="none" stroke={isDarkMode ? 'white' : 'black'} strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter" className={`transition-all duration-1000 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
          <rect x="32" y="18" width="6" height="4" fill="none" stroke={isDarkMode ? 'white' : 'black'} strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter" className={`transition-all duration-1000 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
          <rect x="18" y="32" width="4" height="6" fill="none" stroke={isDarkMode ? 'white' : 'black'} strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter" className={`transition-all duration-1000 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
          <rect x="2" y="18" width="6" height="4" fill="none" stroke={isDarkMode ? 'white' : 'black'} strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter" className={`transition-all duration-1000 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
          
          {/* Diagonal teeth */}
          <rect x="28" y="6" width="4" height="4" fill="none" stroke={isDarkMode ? 'white' : 'black'} strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter" transform="rotate(45 30 8)" className={`transition-all duration-1000 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
          <rect x="8" y="28" width="4" height="4" fill="none" stroke={isDarkMode ? 'white' : 'black'} strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter" transform="rotate(45 10 30)" className={`transition-all duration-1000 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
          <rect x="28" y="30" width="4" height="4" fill="none" stroke={isDarkMode ? 'white' : 'black'} strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter" transform="rotate(-45 30 32)" className={`transition-all duration-1000 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
          <rect x="8" y="8" width="4" height="4" fill="none" stroke={isDarkMode ? 'white' : 'black'} strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter" transform="rotate(-45 10 10)" className={`transition-all duration-1000 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
        </svg>

        {/* Subtle glow effect */}
        <div 
          className={`absolute inset-0 rounded-full transition-all duration-1000 ${
            isScrolled ? `opacity-100 cog-glow` : 'opacity-0'
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

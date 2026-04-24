import React, { useState, useEffect } from 'react';
import { ThemeContext } from '../../contexts/AppContext';

export const ModularCog = ({ isScrolled, className = "" }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const [scrollRotation, setScrollRotation] = useState(0);

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

  const textColorClass = isDarkMode ? 'text-white' : 'text-black';

  if (!isScrolled) {
    // Normal PRAXIS logo text when at top
    return (
      <span className={`${textColorClass} font-mono font-bold tracking-wider transition-all duration-500 ${className}`}>
        PRAXIS
      </span>
    );
  }

  // Mechanical Cog Implementation
  return (
    <div className={`relative inline-block transition-all duration-500 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke={isDarkMode ? "white" : "black"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-500 ${isScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
        style={{
          transform: `rotate(${scrollRotation}deg)`,
          transformOrigin: 'center'
        }}
      >
        {/* Hub */}
        <circle cx="12" cy="12" r="3" />

        {/* Teeth */}
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.51 1H15a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    </div>
  );
};

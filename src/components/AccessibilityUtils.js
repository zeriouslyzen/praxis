import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../contexts/AppContext';

// Hook to detect user's motion preferences
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

// Hook to detect if user is on mobile
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

// Hook to detect system performance
export const usePerformanceMode = () => {
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Check for low-end device indicators
    const checkPerformance = () => {
      const isLowEnd = 
        navigator.hardwareConcurrency <= 2 || // Low CPU cores
        navigator.deviceMemory <= 2 || // Low RAM (if available)
        /Android.*Chrome\/[.0-9]* (?!.*Mobile)/.test(navigator.userAgent); // Some Android devices
      
      setIsLowPerformance(isLowEnd);
    };

    checkPerformance();
  }, []);

  return isLowPerformance;
};

// Optimized animation wrapper component
export const OptimizedAnimation = ({ 
  children, 
  animationType = 'fadeIn',
  delay = 0,
  duration = 0.6,
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
  const animationProps = isMobile ? {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3, delay }
  } : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay, ease: "easeOut" }
  };

  return (
    <motion.div
      className={className}
      {...animationProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Focus trap component for accessibility
export const FocusTrap = ({ children, isActive = false }) => {
  const containerRef = React.useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const focusableElements = containerRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements?.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    firstElement?.focus();
    document.addEventListener('keydown', handleTabKey);

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);

  return (
    <div ref={containerRef} tabIndex={-1}>
      {children}
    </div>
  );
};

// Skip link component for keyboard navigation
export const SkipLink = ({ href = "#main", children = "Skip to main content" }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const bgColor = isDarkMode ? 'bg-white' : 'bg-black';
  const textColor = isDarkMode ? 'text-black' : 'text-white';

  return (
    <a
      href={href}
      className={`sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 ${bgColor} ${textColor} px-4 py-2 rounded-lg font-mono text-sm font-semibold z-50 transition-all duration-200`}
    >
      {children}
    </a>
  );
};

// Screen reader only text
export const ScreenReaderOnly = ({ children }) => {
  return <span className="sr-only">{children}</span>;
};

// Enhanced focus styles
export const FocusableElement = ({ children, className = "", ...props }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const focusRing = isDarkMode 
    ? 'focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black'
    : 'focus:ring-2 focus:ring-black/50 focus:ring-offset-2 focus:ring-offset-white';

  return (
    <div className={`focus:outline-none ${focusRing} ${className}`} {...props}>
      {children}
    </div>
  );
};

// ARIA live region for announcements
export const LiveRegion = ({ message, priority = "polite" }) => {
  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
};

// Keyboard navigation hook
export const useKeyboardNavigation = (onEscape, onEnter) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onEscape) {
        onEscape();
      }
      if (e.key === 'Enter' && onEnter) {
        onEnter();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onEscape, onEnter]);
};

// High contrast mode detection
export const useHighContrast = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setIsHighContrast(mediaQuery.matches);

    const handleChange = (e) => {
      setIsHighContrast(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isHighContrast;
};

// Color scheme detection
export const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useState('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setColorScheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e) => {
      setColorScheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return colorScheme;
};

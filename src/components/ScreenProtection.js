import React, { useEffect, useState } from 'react';
import { ThemeContext } from '../contexts/AppContext';

export const ScreenProtection = () => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable common screenshot shortcuts
    const handleKeyDown = (e) => {
      // Block common screenshot shortcuts
      if (
        // Windows/Linux: Print Screen, Alt+Print Screen, Win+Shift+S
        e.key === 'PrintScreen' ||
        (e.altKey && e.key === 'PrintScreen') ||
        (e.metaKey && e.shiftKey && e.key === 'S') ||
        // Mac: Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5
        (e.metaKey && e.shiftKey && e.key === '3') ||
        (e.metaKey && e.shiftKey && e.key === '4') ||
        (e.metaKey && e.shiftKey && e.key === '5') ||
        // Block F12 (DevTools)
        e.key === 'F12' ||
        // Block Ctrl+Shift+I (DevTools)
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        // Block Ctrl+U (View Source)
        (e.ctrlKey && e.key === 'u') ||
        // Block Ctrl+S (Save Page)
        (e.ctrlKey && e.key === 's') ||
        // Block Ctrl+A (Select All)
        (e.ctrlKey && e.key === 'a') ||
        // Block Ctrl+C (Copy)
        (e.ctrlKey && e.key === 'c') ||
        // Block Ctrl+V (Paste)
        (e.ctrlKey && e.key === 'v') ||
        // Block Ctrl+X (Cut)
        (e.ctrlKey && e.key === 'x')
      ) {
        e.preventDefault();
        e.stopPropagation();
        setIsBlurred(true);
        setTimeout(() => setIsBlurred(false), 2000);
        return false;
      }
    };

    // Disable text selection
    const handleSelectStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable drag and drop
    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Block screen recording detection
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, might be recording
        setIsBlurred(true);
        setTimeout(() => setIsBlurred(false), 2000);
      }
    };

    // Block if user tries to open DevTools
    let devtools = { open: false, orientation: null };
    const threshold = 160;

    const detectDevTools = () => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true;
          setIsBlurred(true);
        setTimeout(() => setIsBlurred(false), 2000);
        }
      } else {
        devtools.open = false;
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // DevTools detection
    const devToolsInterval = setInterval(detectDevTools, 500);

    // CSS-based protection
    const style = document.createElement('style');
    style.textContent = `
      /* Disable text selection */
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      
      /* Disable image dragging */
      img {
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
        pointer-events: none !important;
      }
      
      /* Disable text highlighting */
      ::selection {
        background: transparent !important;
      }
      ::-moz-selection {
        background: transparent !important;
      }
      
      /* Hide content when printing */
      @media print {
        * {
          display: none !important;
        }
        body::after {
          content: "Access Denied - This content is protected";
          display: block !important;
        }
      }
      
      /* Disable copy/paste */
      input, textarea {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
    `;
    document.head.appendChild(style);

    // Cleanup function
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(devToolsInterval);
      document.head.removeChild(style);
    };
  }, []);


  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const bgColorClass = isDarkMode ? 'bg-black/95' : 'bg-white/95';
  const borderColorClass = isDarkMode ? 'border-white/20' : 'border-black/20';

  return (
    <>
      {isBlurred && (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          <div className={`absolute inset-0 backdrop-blur-md ${isDarkMode ? 'bg-black/20' : 'bg-white/20'}`} />
        </div>
      )}
    </>
  );
};

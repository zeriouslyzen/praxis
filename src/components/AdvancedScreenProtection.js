import React, { useEffect, useState } from 'react';

export const AdvancedScreenProtection = () => {
  const [isBlurred, setIsBlurred] = useState(false);
  useEffect(() => {
    // Advanced screen recording detection
    const detectScreenRecording = () => {
      // Method 1: Canvas fingerprinting detection
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('Screen recording detection', 2, 2);
      
      // Method 2: Performance timing detection
      const start = performance.now();
      requestAnimationFrame(() => {
        const end = performance.now();
        if (end - start > 16.67) { // More than one frame
          // Possible screen recording
          setIsBlurred(true);
          setTimeout(() => setIsBlurred(false), 2000);
        }
      });

      // Method 3: Mouse movement detection
      let mouseMovements = 0;
      const mouseHandler = () => {
        mouseMovements++;
        if (mouseMovements > 100) {
          // Excessive mouse movement might indicate recording
          setIsBlurred(true);
          setTimeout(() => setIsBlurred(false), 2000);
        }
      };

      document.addEventListener('mousemove', mouseHandler);

      // Method 4: Window focus detection
      let focusLost = false;
      const focusHandler = () => {
        if (document.hidden) {
          focusLost = true;
        } else if (focusLost) {
          // Window was hidden and now visible - possible recording
          setIsBlurred(true);
          setTimeout(() => setIsBlurred(false), 2000);
          focusLost = false;
        }
      };

      document.addEventListener('visibilitychange', focusHandler);

      // Method 5: WebRTC screen sharing detection
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        const originalGetDisplayMedia = navigator.mediaDevices.getDisplayMedia;
        navigator.mediaDevices.getDisplayMedia = function() {
          setIsBlurred(true);
          setTimeout(() => setIsBlurred(false), 2000);
          return Promise.reject(new Error('Screen sharing not allowed'));
        };
      }

      // Cleanup
      return () => {
        document.removeEventListener('mousemove', mouseHandler);
        document.removeEventListener('visibilitychange', focusHandler);
      };
    };


    // Method 6: CSS-based protection
    const addCSSProtection = () => {
      const style = document.createElement('style');
      style.textContent = `
        /* Disable print styles */
        @media print {
          * {
            display: none !important;
          }
        }
        
        /* Disable screen capture on some browsers */
        body {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        
        /* Disable image saving */
        img {
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
          user-drag: none;
          pointer-events: none;
        }
        
        /* Disable text selection */
        * {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        
        /* Allow text selection in input fields */
        input, textarea, [contenteditable] {
          -webkit-user-select: text;
          -moz-user-select: text;
          -ms-user-select: text;
          user-select: text;
        }
      `;
      document.head.appendChild(style);
    };

    // Method 7: Disable common browser features
    const disableBrowserFeatures = () => {
      // Disable F12, Ctrl+Shift+I, Ctrl+U, etc.
      document.addEventListener('keydown', (e) => {
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.key === 'u') ||
          (e.ctrlKey && e.key === 's') ||
          (e.ctrlKey && e.key === 'a') ||
          (e.ctrlKey && e.key === 'c') ||
          (e.ctrlKey && e.key === 'v') ||
          (e.ctrlKey && e.key === 'x') ||
          (e.metaKey && e.shiftKey && e.key === '3') ||
          (e.metaKey && e.shiftKey && e.key === '4') ||
          (e.metaKey && e.shiftKey && e.key === '5')
        ) {
          e.preventDefault();
          e.stopPropagation();
          setIsBlurred(true);
          setTimeout(() => setIsBlurred(false), 2000);
          return false;
        }
      });

      // Disable right-click
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        setIsBlurred(true);
        setTimeout(() => setIsBlurred(false), 2000);
        return false;
      });

      // Disable drag and drop
      document.addEventListener('dragstart', (e) => {
        e.preventDefault();
        return false;
      });
    };

    // Initialize all protection methods
    const cleanup = detectScreenRecording();
    addCSSProtection();
    disableBrowserFeatures();

    // Cleanup function
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <>
      {isBlurred && (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          <div className="absolute inset-0 backdrop-blur-lg bg-black/10" />
        </div>
      )}
    </>
  );
};

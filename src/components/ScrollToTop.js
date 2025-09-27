import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Small delay to ensure page content is loaded
    const timer = setTimeout(() => {
      // Check if we're on mobile
      const isMobile = window.innerWidth <= 768;
      
      // Also check for touch capability
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Use different scroll behavior for mobile vs desktop
      if (isMobile || isTouchDevice) {
        // For mobile/touch devices, use instant scroll to avoid issues
        window.scrollTo(0, 0);
        
        // Also scroll the document element for better compatibility
        if (document.documentElement) {
          document.documentElement.scrollTop = 0;
        }
        if (document.body) {
          document.body.scrollTop = 0;
        }
      } else {
        // For desktop, use smooth scrolling
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    }, 150); // Slightly longer delay to ensure DOM is ready

    return () => clearTimeout(timer);
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;

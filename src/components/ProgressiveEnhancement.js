import React, { useState, useEffect } from 'react';

// Hook to detect if JavaScript is enabled
export const useJavaScriptEnabled = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    setIsEnabled(true);
  }, []);

  return isEnabled;
};

// Hook to detect if CSS is supported
export const useCSSSupported = () => {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Test for CSS support
    const testElement = document.createElement('div');
    testElement.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;';
    document.body.appendChild(testElement);
    
    const computedStyle = window.getComputedStyle(testElement);
    const isCSSWorking = computedStyle.position === 'fixed';
    
    document.body.removeChild(testElement);
    setIsSupported(isCSSWorking);
  }, []);

  return isSupported;
};

// Hook to detect network status
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState('unknown');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check connection type if available
    if ('connection' in navigator) {
      const connection = navigator.connection;
      setConnectionType(connection.effectiveType || 'unknown');
      
      const handleConnectionChange = () => {
        setConnectionType(connection.effectiveType || 'unknown');
      };
      
      connection.addEventListener('change', handleConnectionChange);
      
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        connection.removeEventListener('change', handleConnectionChange);
      };
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, connectionType };
};

// Progressive Enhancement Wrapper
export const ProgressiveEnhancement = ({ 
  children, 
  fallback = null,
  requiresJS = true,
  requiresCSS = true,
  requiresNetwork = false,
  className = ""
}) => {
  const jsEnabled = useJavaScriptEnabled();
  const cssSupported = useCSSSupported();
  const { isOnline } = useNetworkStatus();

  // Check if all requirements are met
  const canRender = 
    (!requiresJS || jsEnabled) &&
    (!requiresCSS || cssSupported) &&
    (!requiresNetwork || isOnline);

  if (!canRender && fallback) {
    return <div className={className}>{fallback}</div>;
  }

  if (!canRender) {
    return null;
  }

  return <div className={className}>{children}</div>;
};

// Enhanced Link Component with Progressive Enhancement
export const EnhancedLink = ({ 
  href, 
  children, 
  className = "",
  onClick = null,
  ...props 
}) => {
  const jsEnabled = useJavaScriptEnabled();

  const handleClick = (e) => {
    if (jsEnabled && onClick) {
      e.preventDefault();
      onClick(e);
    }
    // If JS is disabled, the link will work normally
  };

  return (
    <a 
      href={href} 
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
};

// Enhanced Button Component with Progressive Enhancement
export const EnhancedButton = ({ 
  children, 
  className = "",
  onClick = null,
  type = "button",
  formAction = null,
  ...props 
}) => {
  const jsEnabled = useJavaScriptEnabled();

  const handleClick = (e) => {
    if (jsEnabled && onClick) {
      e.preventDefault();
      onClick(e);
    }
    // If JS is disabled, form actions will work
  };

  return (
    <button 
      type={type}
      className={className}
      onClick={handleClick}
      formAction={formAction}
      {...props}
    >
      {children}
    </button>
  );
};

// Form with Progressive Enhancement
export const EnhancedForm = ({ 
  children, 
  onSubmit = null,
  action = null,
  method = "POST",
  className = "",
  ...props 
}) => {
  const jsEnabled = useJavaScriptEnabled();

  const handleSubmit = (e) => {
    if (jsEnabled && onSubmit) {
      e.preventDefault();
      onSubmit(e);
    }
    // If JS is disabled, form will submit normally
  };

  return (
    <form 
      action={action}
      method={method}
      className={className}
      onSubmit={handleSubmit}
      {...props}
    >
      {children}
    </form>
  );
};

// Image with Progressive Enhancement
export const EnhancedImage = ({ 
  src, 
  alt, 
  className = "",
  onLoad = null,
  onError = null,
  fallbackSrc = null,
  ...props 
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const jsEnabled = useJavaScriptEnabled();

  const handleLoad = (e) => {
    setIsLoading(false);
    if (jsEnabled && onLoad) {
      onLoad(e);
    }
  };

  const handleError = (e) => {
    setHasError(true);
    setIsLoading(false);
    if (jsEnabled && onError) {
      onError(e);
    }
  };

  const imageSrc = hasError && fallbackSrc ? fallbackSrc : src;

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <img 
        src={imageSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        style={{ opacity: isLoading ? 0 : 1 }}
        {...props}
      />
    </div>
  );
};

// Video with Progressive Enhancement
export const EnhancedVideo = ({ 
  src, 
  poster = null,
  className = "",
  onLoad = null,
  onError = null,
  fallbackImage = null,
  ...props 
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const jsEnabled = useJavaScriptEnabled();

  const handleLoad = (e) => {
    setIsLoading(false);
    if (jsEnabled && onLoad) {
      onLoad(e);
    }
  };

  const handleError = (e) => {
    setHasError(true);
    setIsLoading(false);
    if (jsEnabled && onError) {
      onError(e);
    }
  };

  if (hasError && fallbackImage) {
    return (
      <img 
        src={fallbackImage}
        alt="Video fallback"
        className={className}
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <video 
        src={src}
        poster={poster}
        onLoadedData={handleLoad}
        onError={handleError}
        style={{ opacity: isLoading ? 0 : 1 }}
        {...props}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

// Feature Detection Component
export const FeatureDetection = ({ 
  features = [],
  children,
  fallback = null 
}) => {
  const [supportedFeatures, setSupportedFeatures] = useState({});

  useEffect(() => {
    const featureTests = {
      // CSS Grid
      cssGrid: () => {
        const testElement = document.createElement('div');
        testElement.style.display = 'grid';
        return testElement.style.display === 'grid';
      },
      
      // CSS Flexbox
      flexbox: () => {
        const testElement = document.createElement('div');
        testElement.style.display = 'flex';
        return testElement.style.display === 'flex';
      },
      
      // CSS Custom Properties
      customProperties: () => {
        const testElement = document.createElement('div');
        testElement.style.setProperty('--test', 'value');
        return testElement.style.getPropertyValue('--test') === 'value';
      },
      
      // WebGL
      webgl: () => {
        try {
          const canvas = document.createElement('canvas');
          return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        } catch (e) {
          return false;
        }
      },
      
      // Intersection Observer
      intersectionObserver: () => {
        return 'IntersectionObserver' in window;
      },
      
      // Resize Observer
      resizeObserver: () => {
        return 'ResizeObserver' in window;
      },
      
      // Service Worker
      serviceWorker: () => {
        return 'serviceWorker' in navigator;
      },
      
      // Web Animations API
      webAnimations: () => {
        return 'animate' in document.createElement('div');
      }
    };

    const results = {};
    features.forEach(feature => {
      if (featureTests[feature]) {
        results[feature] = featureTests[feature]();
      }
    });

    setSupportedFeatures(results);
  }, [features]);

  const allSupported = features.every(feature => supportedFeatures[feature]);

  if (!allSupported && fallback) {
    return fallback;
  }

  if (!allSupported) {
    return null;
  }

  return children;
};

// Performance-aware component
export const PerformanceAware = ({ 
  children,
  fallback = null,
  maxFPS = 30,
  className = ""
}) => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Simple FPS detection
    let lastTime = performance.now();
    let frameCount = 0;
    let fps = 60;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;
        
        setShouldRender(fps >= maxFPS);
      }
      
      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  }, [maxFPS]);

  if (!shouldRender && fallback) {
    return <div className={className}>{fallback}</div>;
  }

  return <div className={className}>{children}</div>;
};

export default {
  useJavaScriptEnabled,
  useCSSSupported,
  useNetworkStatus,
  ProgressiveEnhancement,
  EnhancedLink,
  EnhancedButton,
  EnhancedForm,
  EnhancedImage,
  EnhancedVideo,
  FeatureDetection,
  PerformanceAware
};

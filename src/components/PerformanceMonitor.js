import React, { useState, useEffect, useRef, useCallback } from 'react';

// Performance monitoring hook
export const usePerformanceMonitor = (options = {}) => {
  const {
    enabled = process.env.NODE_ENV === 'development',
    interval = 1000,
    onMetricsUpdate = null,
    trackMemory = true,
    trackFPS = true,
    trackNetwork = true,
    trackErrors = true
  } = options;

  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: 0,
    networkStatus: 'online',
    connectionType: 'unknown',
    errors: 0,
    renderTime: 0,
    loadTime: 0
  });

  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const animationFrameId = useRef(null);
  const intervalId = useRef(null);
  const errorCount = useRef(0);

  // FPS calculation
  const measureFPS = useCallback(() => {
    if (!trackFPS) return;

    frameCount.current++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime.current >= 1000) {
      const fps = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current));
      setMetrics(prev => ({ ...prev, fps }));
      frameCount.current = 0;
      lastTime.current = currentTime;
    }
    
    animationFrameId.current = requestAnimationFrame(measureFPS);
  }, [trackFPS]);

  // Memory monitoring
  const measureMemory = useCallback(() => {
    if (!trackMemory || !performance.memory) return;

    const memoryInfo = performance.memory;
    const memoryUsage = Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024); // MB
    setMetrics(prev => ({ ...prev, memory: memoryUsage }));
  }, [trackMemory]);

  // Network monitoring
  const measureNetwork = useCallback(() => {
    if (!trackNetwork) return;

    const isOnline = navigator.onLine;
    let connectionType = 'unknown';
    
    if ('connection' in navigator) {
      connectionType = navigator.connection.effectiveType || 'unknown';
    }

    setMetrics(prev => ({ 
      ...prev, 
      networkStatus: isOnline ? 'online' : 'offline',
      connectionType 
    }));
  }, [trackNetwork]);

  // Error tracking
  const trackError = useCallback((error) => {
    if (!trackErrors) return;
    
    errorCount.current++;
    setMetrics(prev => ({ ...prev, errors: errorCount.current }));
    
    // Log error details in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Performance Monitor - Error tracked:', error);
    }
  }, [trackErrors]);

  // Render time measurement
  const measureRenderTime = useCallback((componentName, startTime) => {
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    setMetrics(prev => ({ ...prev, renderTime }));
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance Monitor - ${componentName} render time: ${renderTime.toFixed(2)}ms`);
    }
  }, []);

  // Load time measurement
  const measureLoadTime = useCallback(() => {
    if (performance.timing) {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      setMetrics(prev => ({ ...prev, loadTime }));
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Start FPS monitoring
    if (trackFPS) {
      measureFPS();
    }

    // Start interval monitoring
    intervalId.current = setInterval(() => {
      measureMemory();
      measureNetwork();
    }, interval);

    // Measure initial load time
    measureLoadTime();

    // Global error handler
    const handleError = (event) => {
      trackError(event.error);
    };

    const handleUnhandledRejection = (event) => {
      trackError(event.reason);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [enabled, interval, measureFPS, measureMemory, measureNetwork, measureLoadTime, trackError, trackFPS]);

  // Notify parent component of metrics updates
  useEffect(() => {
    if (onMetricsUpdate) {
      onMetricsUpdate(metrics);
    }
  }, [metrics, onMetricsUpdate]);

  return {
    metrics,
    measureRenderTime,
    trackError
  };
};

// Performance Monitor Component
export const PerformanceMonitor = ({ 
  enabled = process.env.NODE_ENV === 'development',
  position = 'bottom-right',
  showDetails = false,
  className = ""
}) => {
  const { metrics } = usePerformanceMonitor({ enabled });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  };

  const getStatusColor = (value, thresholds) => {
    if (value >= thresholds.good) return 'text-green-400';
    if (value >= thresholds.warning) return 'text-yellow-400';
    return 'text-red-400';
  };

  const fpsColor = getStatusColor(metrics.fps, { good: 50, warning: 30 });
  const memoryColor = getStatusColor(metrics.memory, { good: 50, warning: 100 });

  if (!enabled || !isVisible) return null;

  return (
    <div className={`fixed ${positionClasses[position]} z-50 ${className}`}>
      <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-3 font-mono text-xs">
        {!isExpanded ? (
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${fpsColor}`}></div>
              <span className="text-white">FPS: {metrics.fps}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${memoryColor}`}></div>
              <span className="text-white">{metrics.memory}MB</span>
            </div>
            <button
              onClick={() => setIsExpanded(true)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold">Performance</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${fpsColor}`}></div>
                <span className="text-white">FPS: {metrics.fps}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${memoryColor}`}></div>
                <span className="text-white">Memory: {metrics.memory}MB</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${metrics.networkStatus === 'online' ? 'text-green-400' : 'text-red-400'}`}></div>
                <span className="text-white">Network: {metrics.networkStatus}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${metrics.errors > 0 ? 'text-red-400' : 'text-green-400'}`}></div>
                <span className="text-white">Errors: {metrics.errors}</span>
              </div>
            </div>

            {showDetails && (
              <div className="pt-2 border-t border-white/20 space-y-1">
                <div className="text-white/80">Connection: {metrics.connectionType}</div>
                <div className="text-white/80">Render: {metrics.renderTime.toFixed(2)}ms</div>
                <div className="text-white/80">Load: {metrics.loadTime}ms</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Performance-aware component wrapper
export const withPerformanceTracking = (Component, componentName) => {
  return React.forwardRef((props, ref) => {
    const { measureRenderTime } = usePerformanceMonitor();
    const renderStartTime = useRef(0);

    useEffect(() => {
      renderStartTime.current = performance.now();
    });

    useEffect(() => {
      if (renderStartTime.current > 0) {
        measureRenderTime(componentName, renderStartTime.current);
      }
    });

    return <Component {...props} ref={ref} />;
  });
};

// Performance metrics dashboard
export const PerformanceDashboard = ({ 
  enabled = process.env.NODE_ENV === 'development',
  className = ""
}) => {
  const { metrics } = usePerformanceMonitor({ enabled });
  const [isVisible, setIsVisible] = useState(false);

  if (!enabled) return null;

  return (
    <div className={`fixed top-4 left-4 z-50 ${className}`}>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-2 text-white font-mono text-xs hover:bg-black/90 transition-colors"
      >
        📊 Perf
      </button>

      {isVisible && (
        <div className="absolute top-12 left-0 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg p-4 font-mono text-xs min-w-64">
          <h3 className="text-white font-semibold mb-3">Performance Metrics</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/80">FPS</span>
              <span className={`font-semibold ${metrics.fps >= 50 ? 'text-green-400' : metrics.fps >= 30 ? 'text-yellow-400' : 'text-red-400'}`}>
                {metrics.fps}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/80">Memory</span>
              <span className={`font-semibold ${metrics.memory <= 50 ? 'text-green-400' : metrics.memory <= 100 ? 'text-yellow-400' : 'text-red-400'}`}>
                {metrics.memory}MB
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/80">Network</span>
              <span className={`font-semibold ${metrics.networkStatus === 'online' ? 'text-green-400' : 'text-red-400'}`}>
                {metrics.networkStatus}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/80">Connection</span>
              <span className="text-white">{metrics.connectionType}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/80">Errors</span>
              <span className={`font-semibold ${metrics.errors === 0 ? 'text-green-400' : 'text-red-400'}`}>
                {metrics.errors}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/80">Render Time</span>
              <span className="text-white">{metrics.renderTime.toFixed(2)}ms</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/80">Load Time</span>
              <span className="text-white">{metrics.loadTime}ms</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/20">
            <button
              onClick={() => setIsVisible(false)}
              className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Performance optimization utilities
export const PerformanceUtils = {
  // Debounce function for performance
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for performance
  throttle: (func, limit) => {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Lazy load images
  lazyLoadImage: (img, src) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.src = src;
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(img);
  },

  // Preload critical resources
  preloadResource: (href, as = 'script') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  }
};

export default {
  usePerformanceMonitor,
  PerformanceMonitor,
  withPerformanceTracking,
  PerformanceDashboard,
  PerformanceUtils
};

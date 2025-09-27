import React, { useState, useCallback } from 'react';
import { ThemeContext } from '../contexts/AppContext';
import { VideoSkeleton } from './SkeletonLoaders';

const VideoErrorHandler = ({ 
  children, 
  fallbackImage = null,
  showRetryButton = true,
  onError = null,
  className = ""
}) => {
  const [hasError, setHasError] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { isDarkMode } = React.useContext(ThemeContext);

  const maxRetries = 3;

  const handleError = useCallback((error) => {
    console.warn('Video loading error:', error);
    setHasError(true);
    if (onError) {
      onError(error);
    }
  }, [onError]);

  const handleRetry = useCallback(() => {
    if (retryCount < maxRetries) {
      setIsRetrying(true);
      setRetryCount(prev => prev + 1);
      setHasError(false);
      
      // Simulate retry delay
      setTimeout(() => {
        setIsRetrying(false);
      }, 1000);
    }
  }, [retryCount]);

  const handleVideoLoad = useCallback(() => {
    setHasError(false);
    setRetryCount(0);
  }, []);

  if (hasError) {
    return (
      <VideoErrorFallback 
        isDarkMode={isDarkMode}
        fallbackImage={fallbackImage}
        showRetryButton={showRetryButton && retryCount < maxRetries}
        onRetry={handleRetry}
        retryCount={retryCount}
        maxRetries={maxRetries}
        className={className}
      />
    );
  }

  if (isRetrying) {
    return <VideoSkeleton className={className} />;
  }

  return React.cloneElement(children, {
    onError: handleError,
    onLoadedData: handleVideoLoad,
    onCanPlay: handleVideoLoad
  });
};

const VideoErrorFallback = ({ 
  isDarkMode, 
  fallbackImage, 
  showRetryButton, 
  onRetry, 
  retryCount, 
  maxRetries,
  className 
}) => {
  const bgColor = isDarkMode ? 'bg-black' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColor = isDarkMode ? 'border-white/20' : 'border-black/20';
  const cardBg = isDarkMode ? 'bg-white/5' : 'bg-black/5';

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {fallbackImage ? (
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={fallbackImage} 
            alt="Video fallback" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ) : (
        <div className={`absolute inset-0 w-full h-full ${bgColor} flex items-center justify-center`}>
          <div className={`${cardBg} backdrop-blur-sm border ${borderColor} rounded-xl p-8 text-center max-w-md mx-4`}>
            <div className="mb-6">
              <div className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold ${textColor} font-mono mb-2`}>
                Video Unavailable
              </h3>
              <p className={`${mutedTextColor} font-mono text-sm leading-relaxed`}>
                The video content could not be loaded. This might be due to network issues or browser compatibility.
              </p>
            </div>

            {showRetryButton && (
              <button
                onClick={onRetry}
                className={`${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'} ${textColor} px-6 py-3 rounded-lg font-mono text-sm font-semibold transition-all duration-300 transform hover:scale-105 mb-4`}
              >
                Try Again ({retryCount}/{maxRetries})
              </button>
            )}

            <div className={`text-xs ${mutedTextColor} font-mono`}>
              {retryCount >= maxRetries && (
                <p>Maximum retry attempts reached. Please refresh the page.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced VideoBackground with error handling
export const EnhancedVideoBackground = ({ 
  videoSrc, 
  fallbackImage = null,
  className = "", 
  opacity = 0.3,
  overlay = true,
  overlayColor = "rgba(0, 0, 0, 0.4)",
  onError = null,
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleVideoLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleVideoError = useCallback((error) => {
    console.warn('Video background error:', error);
    setIsLoading(false);
    setHasError(true);
    if (onError) {
      onError(error);
    }
  }, [onError]);

  if (hasError && fallbackImage) {
    return (
      <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
        <img 
          src={fallbackImage} 
          alt="Background fallback" 
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity }}
        />
        {overlay && (
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ 
              backgroundColor: overlayColor,
              zIndex: -2
            }}
          />
        )}
      </div>
    );
  }

  return (
    <VideoErrorHandler 
      fallbackImage={fallbackImage}
      onError={handleVideoError}
      className={className}
    >
      <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
        {isLoading && <VideoSkeleton />}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            opacity: isLoading ? 0 : opacity,
            zIndex: -3
          }}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={handleVideoLoad}
          onCanPlay={handleVideoLoad}
          onError={handleVideoError}
          {...props}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {overlay && (
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ 
              backgroundColor: overlayColor,
              zIndex: -2
            }}
          />
        )}
      </div>
    </VideoErrorHandler>
  );
};

// Network status hook for better error handling
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState('unknown');

  React.useEffect(() => {
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

export default VideoErrorHandler;

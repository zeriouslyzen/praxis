import React, { useRef, useEffect } from 'react';

const VideoBackground = ({ 
  videoSrc, 
  className = "", 
  opacity = 0.3,
  overlay = true,
  overlayColor = "rgba(0, 0, 0, 0.4)"
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video plays automatically and loops
    video.play().catch(error => {
      console.log('Video autoplay prevented:', error);
    });

    // Handle video loading
    const handleLoadedData = () => {
      video.play().catch(error => {
        console.log('Video play failed:', error);
      });
    };

    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          opacity: opacity,
          zIndex: -3 // Behind everything
        }}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {overlay && (
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            backgroundColor: overlayColor,
            zIndex: -2 // Above video, below other effects
          }}
        />
      )}
    </div>
  );
};

export default VideoBackground;

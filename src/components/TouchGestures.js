import React, { useState, useRef, useEffect, useCallback } from 'react';

// Hook for touch gesture detection
export const useTouchGestures = (options = {}) => {
  const {
    onSwipeLeft = null,
    onSwipeRight = null,
    onSwipeUp = null,
    onSwipeDown = null,
    onPinch = null,
    onTap = null,
    onDoubleTap = null,
    onLongPress = null,
    swipeThreshold = 50,
    pinchThreshold = 0.1,
    longPressDelay = 500,
    doubleTapDelay = 300
  } = options;

  const [gestures, setGestures] = useState({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    deltaX: 0,
    deltaY: 0,
    velocity: 0,
    direction: null
  });

  const touchRef = useRef(null);
  const longPressTimer = useRef(null);
  const lastTapTime = useRef(0);
  const lastTapX = useRef(0);
  const lastTapY = useRef(0);

  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    const now = Date.now();

    setGestures(prev => ({
      ...prev,
      isDragging: true,
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
      deltaX: 0,
      deltaY: 0,
      velocity: 0
    }));

    // Long press detection
    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        onLongPress(e);
      }, longPressDelay);
    }

    // Double tap detection
    if (onDoubleTap) {
      const timeDiff = now - lastTapTime.current;
      const xDiff = Math.abs(touch.clientX - lastTapX.current);
      const yDiff = Math.abs(touch.clientY - lastTapY.current);

      if (timeDiff < doubleTapDelay && xDiff < 10 && yDiff < 10) {
        onDoubleTap(e);
        lastTapTime.current = 0; // Reset to prevent triple tap
      } else {
        lastTapTime.current = now;
        lastTapX.current = touch.clientX;
        lastTapY.current = touch.clientY;
      }
    }
  }, [onLongPress, onDoubleTap, longPressDelay, doubleTapDelay]);

  const handleTouchMove = useCallback((e) => {
    if (!gestures.isDragging) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - gestures.startX;
    const deltaY = touch.clientY - gestures.startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Clear long press timer if user moves
    if (longPressTimer.current && distance > 10) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    setGestures(prev => ({
      ...prev,
      currentX: touch.clientX,
      currentY: touch.clientY,
      deltaX,
      deltaY,
      velocity: distance
    }));
  }, [gestures.isDragging, gestures.startX, gestures.startY]);

  const handleTouchEnd = useCallback((e) => {
    if (!gestures.isDragging) return;

    const deltaX = gestures.deltaX;
    const deltaY = gestures.deltaY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Clear long press timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    // Determine swipe direction
    if (absDeltaX > swipeThreshold || absDeltaY > swipeThreshold) {
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight(e);
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft(e);
        }
      } else {
        // Vertical swipe
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown(e);
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp(e);
        }
      }
    } else if (onTap && absDeltaX < 10 && absDeltaY < 10) {
      // Tap detection (small movement)
      onTap(e);
    }

    setGestures(prev => ({
      ...prev,
      isDragging: false,
      deltaX: 0,
      deltaY: 0,
      velocity: 0
    }));
  }, [gestures.isDragging, gestures.deltaX, gestures.deltaY, swipeThreshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onTap]);

  const handleTouchCancel = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    setGestures(prev => ({
      ...prev,
      isDragging: false,
      deltaX: 0,
      deltaY: 0,
      velocity: 0
    }));
  }, []);

  return {
    gestures,
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchCancel
    }
  };
};

// Swipe Navigation Component
export const SwipeNavigation = ({ 
  children, 
  onSwipeLeft = null,
  onSwipeRight = null,
  onSwipeUp = null,
  onSwipeDown = null,
  className = "",
  swipeThreshold = 50,
  ...props 
}) => {
  const { gestures, touchHandlers } = useTouchGestures({
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    swipeThreshold
  });

  return (
    <div 
      className={`touch-gesture-container ${className}`}
      {...touchHandlers}
      {...props}
    >
      {children}
    </div>
  );
};

// Carousel with Swipe Support
export const SwipeCarousel = ({ 
  items = [], 
  currentIndex = 0,
  onIndexChange = null,
  className = "",
  showIndicators = true,
  showArrows = true,
  autoPlay = false,
  autoPlayInterval = 3000,
  ...props 
}) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const nextIndex = (activeIndex + 1) % items.length;
    setActiveIndex(nextIndex);
    if (onIndexChange) onIndexChange(nextIndex);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [activeIndex, items.length, isTransitioning, onIndexChange]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const prevIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(prevIndex);
    if (onIndexChange) onIndexChange(prevIndex);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [activeIndex, items.length, isTransitioning, onIndexChange]);

  const goToIndex = useCallback((index) => {
    if (isTransitioning || index === activeIndex) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    if (onIndexChange) onIndexChange(index);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [activeIndex, isTransitioning, onIndexChange]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && items.length > 1) {
      autoPlayRef.current = setInterval(goToNext, autoPlayInterval);
      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
  }, [autoPlay, autoPlayInterval, goToNext, items.length]);

  const { touchHandlers } = useTouchGestures({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrevious,
    swipeThreshold: 50
  });

  return (
    <div className={`swipe-carousel ${className}`} {...props}>
      <div 
        className="carousel-container relative overflow-hidden"
        {...touchHandlers}
      >
        <div 
          className="carousel-track flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="carousel-item w-full flex-shrink-0">
              {item}
            </div>
          ))}
        </div>

        {showArrows && items.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="carousel-arrow carousel-arrow-left absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
              disabled={isTransitioning}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="carousel-arrow carousel-arrow-right absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
              disabled={isTransitioning}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {showIndicators && items.length > 1 && (
        <div className="carousel-indicators flex justify-center space-x-2 mt-4">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`carousel-indicator w-2 h-2 rounded-full transition-all duration-200 ${
                index === activeIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Pull-to-Refresh Component
export const PullToRefresh = ({ 
  children, 
  onRefresh = null,
  threshold = 80,
  className = "",
  ...props 
}) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef(null);

  const handleTouchStart = useCallback((e) => {
    if (window.scrollY === 0) {
      setIsPulling(true);
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isPulling || window.scrollY > 0) return;

    const touch = e.touches[0];
    const pullDistance = Math.max(0, touch.clientY - e.touches[0].clientY);
    setPullDistance(pullDistance);

    if (pullDistance > threshold) {
      e.preventDefault();
    }
  }, [isPulling, threshold]);

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling) return;

    setIsPulling(false);
    
    if (pullDistance > threshold && onRefresh) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    
    setPullDistance(0);
  }, [isPulling, pullDistance, threshold, onRefresh]);

  return (
    <div 
      ref={containerRef}
      className={`pull-to-refresh ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      {...props}
    >
      <div 
        className="pull-indicator"
        style={{
          transform: `translateY(${Math.min(pullDistance, threshold)}px)`,
          opacity: Math.min(pullDistance / threshold, 1)
        }}
      >
        {isRefreshing ? (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="flex items-center justify-center p-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

// Touch-friendly Button Component
export const TouchButton = ({ 
  children, 
  onClick = null,
  onLongPress = null,
  className = "",
  disabled = false,
  ...props 
}) => {
  const { touchHandlers } = useTouchGestures({
    onTap: onClick,
    onLongPress: onLongPress,
    longPressDelay: 500
  });

  return (
    <button
      className={`touch-button ${className}`}
      disabled={disabled}
      {...touchHandlers}
      {...props}
    >
      {children}
    </button>
  );
};

// Mobile Navigation with Swipe Support
export const SwipeNavigation = ({ 
  sections = [],
  currentSection = 0,
  onSectionChange = null,
  className = "",
  ...props 
}) => {
  const [activeSection, setActiveSection] = useState(currentSection);

  const goToNextSection = useCallback(() => {
    const nextSection = (activeSection + 1) % sections.length;
    setActiveSection(nextSection);
    if (onSectionChange) onSectionChange(nextSection);
  }, [activeSection, sections.length, onSectionChange]);

  const goToPreviousSection = useCallback(() => {
    const prevSection = activeSection === 0 ? sections.length - 1 : activeSection - 1;
    setActiveSection(prevSection);
    if (onSectionChange) onSectionChange(prevSection);
  }, [activeSection, sections.length, onSectionChange]);

  const { touchHandlers } = useTouchGestures({
    onSwipeLeft: goToNextSection,
    onSwipeRight: goToPreviousSection,
    swipeThreshold: 50
  });

  return (
    <div 
      className={`swipe-navigation ${className}`}
      {...touchHandlers}
      {...props}
    >
      <div className="navigation-content">
        {sections[activeSection]}
      </div>
      
      {sections.length > 1 && (
        <div className="navigation-indicators flex justify-center space-x-2 mt-4">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveSection(index);
                if (onSectionChange) onSectionChange(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === activeSection 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default {
  useTouchGestures,
  SwipeNavigation,
  SwipeCarousel,
  PullToRefresh,
  TouchButton,
  SwipeNavigation
};

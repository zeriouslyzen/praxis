import React from 'react';
import { ThemeContext } from '../contexts/AppContext';

// Skeleton Loading Components
export const SkeletonCard = ({ className = "" }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const bgColor = isDarkMode ? 'bg-white/5' : 'bg-black/5';
  const shimmerColor = isDarkMode ? 'bg-white/10' : 'bg-black/10';

  return (
    <div className={`${bgColor} backdrop-blur-sm border ${isDarkMode ? 'border-white/10' : 'border-black/10'} rounded-xl p-6 animate-pulse ${className}`}>
      <div className={`h-4 ${shimmerColor} rounded mb-4 w-3/4`}></div>
      <div className={`h-3 ${shimmerColor} rounded mb-2 w-full`}></div>
      <div className={`h-3 ${shimmerColor} rounded mb-2 w-5/6`}></div>
      <div className={`h-3 ${shimmerColor} rounded mb-4 w-4/6`}></div>
      <div className="flex space-x-2">
        <div className={`h-6 ${shimmerColor} rounded w-16`}></div>
        <div className={`h-6 ${shimmerColor} rounded w-20`}></div>
      </div>
    </div>
  );
};

export const SkeletonText = ({ lines = 3, className = "" }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const shimmerColor = isDarkMode ? 'bg-white/10' : 'bg-black/10';

  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`h-3 ${shimmerColor} rounded mb-2 ${
            index === lines - 1 ? 'w-4/6' : 'w-full'
          }`}
        ></div>
      ))}
    </div>
  );
};

export const SkeletonButton = ({ className = "" }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const shimmerColor = isDarkMode ? 'bg-white/10' : 'bg-black/10';

  return (
    <div className={`h-10 ${shimmerColor} rounded-lg animate-pulse ${className}`}></div>
  );
};

export const SkeletonHeader = ({ className = "" }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const shimmerColor = isDarkMode ? 'bg-white/10' : 'bg-black/10';

  return (
    <div className={`animate-pulse ${className}`}>
      <div className={`h-8 ${shimmerColor} rounded mb-4 w-2/3`}></div>
      <div className={`h-4 ${shimmerColor} rounded mb-2 w-full`}></div>
      <div className={`h-4 ${shimmerColor} rounded w-3/4`}></div>
    </div>
  );
};

// Loading Spinner Component
export const LoadingSpinner = ({ size = "md", className = "" }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} ${textColor} animate-spin`}>
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    </div>
  );
};

// Loading Overlay Component
export const LoadingOverlay = ({ isLoading, children, message = "Loading..." }) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const bgColor = isDarkMode ? 'bg-black/80' : 'bg-white/80';
  const textColor = isDarkMode ? 'text-white' : 'text-black';

  if (!isLoading) return children;

  return (
    <div className="relative">
      {children}
      <div className={`absolute inset-0 ${bgColor} backdrop-blur-sm flex items-center justify-center z-50`}>
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className={`${textColor} font-mono text-sm`}>{message}</p>
        </div>
      </div>
    </div>
  );
};

// Skeleton Grid for Research Papers
export const SkeletonResearchGrid = ({ count = 6 }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

// Skeleton for Feature Categories
export const SkeletonFeatureGrid = ({ count = 4 }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} className="p-8" />
      ))}
    </div>
  );
};

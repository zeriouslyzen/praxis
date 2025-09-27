import React from 'react';

// Base skeleton component with shimmer effect
const SkeletonBase = ({ className = "", width = "100%", height = "1rem", ...props }) => (
  <div
    className={`skeleton-base ${className}`}
    style={{ width, height }}
    {...props}
  />
);

// Card skeleton loader
export const CardSkeleton = ({ count = 3 }) => (
  <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="skeleton-card">
        <SkeletonBase height="2rem" width="60%" className="mb-4" />
        <div className="space-y-3">
          <SkeletonBase height="1rem" />
          <SkeletonBase height="1rem" width="80%" />
          <SkeletonBase height="1rem" width="70%" />
        </div>
        <SkeletonBase height="2.5rem" width="100%" className="mt-6 rounded-lg" />
      </div>
    ))}
  </div>
);

// Hero section skeleton
export const HeroSkeleton = () => (
  <div className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-black pt-16">
    <div className="relative z-10 px-4 max-w-2xl mx-auto">
      <div className="mb-12">
        <SkeletonBase height="4rem" width="80%" className="mx-auto mb-6" />
        <SkeletonBase height="4rem" width="60%" className="mx-auto" />
      </div>
      
      <div className="mb-12">
        <SkeletonBase height="3rem" width="100%" className="mx-auto rounded-xl" />
      </div>
      
      <SkeletonBase height="1.5rem" width="90%" className="mx-auto mb-8" />
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <SkeletonBase height="3rem" width="150px" className="rounded-lg" />
        <SkeletonBase height="3rem" width="120px" className="rounded-lg" />
      </div>
    </div>
  </div>
);

// Navigation skeleton
export const NavigationSkeleton = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <SkeletonBase height="1.5rem" width="100px" />
        <div className="hidden md:flex items-center space-x-6">
          <SkeletonBase height="1rem" width="60px" />
          <SkeletonBase height="1rem" width="80px" />
          <SkeletonBase height="1rem" width="70px" />
          <SkeletonBase height="1rem" width="90px" />
        </div>
        <div className="flex items-center space-x-4">
          <SkeletonBase height="2rem" width="2rem" className="rounded-lg" />
          <SkeletonBase height="2rem" width="80px" className="rounded-lg" />
        </div>
      </div>
    </div>
  </header>
);

// Video background skeleton
export const VideoSkeleton = () => (
  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
  </div>
);

// Text skeleton with multiple lines
export const TextSkeleton = ({ lines = 3, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <SkeletonBase 
        key={index} 
        height="1rem" 
        width={index === lines - 1 ? "60%" : "100%"} 
      />
    ))}
  </div>
);

// Service card skeleton
export const ServiceCardSkeleton = () => (
  <div className="skeleton-card">
    <SkeletonBase height="1.5rem" width="70%" className="mb-6" />
    <div className="space-y-4 flex-grow">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex items-start">
          <SkeletonBase height="1.25rem" width="1.25rem" className="rounded-full mr-3 mt-0.5" />
          <SkeletonBase height="1rem" width="85%" />
        </div>
      ))}
    </div>
    <SkeletonBase height="2.5rem" width="100%" className="mt-6 rounded-lg" />
  </div>
);

// Technology section skeleton
export const TechnologySkeleton = () => (
  <div className="grid md:grid-cols-2 gap-12 items-center">
    <div>
      <SkeletonBase height="2.5rem" width="70%" className="mb-4" />
      <TextSkeleton lines={4} className="mb-8" />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center">
            <SkeletonBase height="2.5rem" width="2.5rem" className="rounded-lg mr-4" />
            <SkeletonBase height="1rem" width="60%" />
          </div>
        ))}
      </div>
    </div>
    <div className="relative h-64">
      <SkeletonBase height="100%" width="100%" className="rounded-lg" />
    </div>
  </div>
);

// Case study skeleton
export const CaseStudySkeleton = () => (
  <div className="grid gap-6 md:grid-cols-3">
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="skeleton-card">
        <SkeletonBase height="1.5rem" width="60%" className="mb-4" />
        <SkeletonBase height="3rem" width="40%" className="mb-2" />
        <SkeletonBase height="1rem" width="50%" className="mb-4" />
        <TextSkeleton lines={3} />
      </div>
    ))}
  </div>
);

// Loading state wrapper
export const LoadingWrapper = ({ isLoading, children, skeleton: SkeletonComponent }) => {
  if (isLoading) {
    return <SkeletonComponent />;
  }
  return children;
};

// Page-level loading skeleton
export const PageSkeleton = () => (
  <div className="font-mono overflow-x-hidden bg-black text-white">
    <NavigationSkeleton />
    <main>
      <HeroSkeleton />
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SkeletonBase height="3rem" width="50%" className="mx-auto mb-6" />
          <TextSkeleton lines={2} className="mb-12" />
          <CardSkeleton count={3} />
        </div>
      </section>
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto">
          <TechnologySkeleton />
        </div>
      </section>
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SkeletonBase height="3rem" width="40%" className="mx-auto mb-6" />
          <TextSkeleton lines={2} className="mb-12" />
          <CaseStudySkeleton />
        </div>
      </section>
    </main>
  </div>
);

export default {
  CardSkeleton,
  HeroSkeleton,
  NavigationSkeleton,
  VideoSkeleton,
  TextSkeleton,
  ServiceCardSkeleton,
  TechnologySkeleton,
  CaseStudySkeleton,
  LoadingWrapper,
  PageSkeleton
};

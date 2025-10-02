"use client";
import { useEffect, useState } from "react";
import { createPerformanceObserver, reportWebVitals } from "@/lib/performance";

export function PerformanceMonitor() {
  useEffect(() => {
    // Initialize performance monitoring
    const observer = createPerformanceObserver();
    
    // Report Web Vitals
    reportWebVitals((metric) => {
      console.log('Web Vital:', metric);
      
      // Send to analytics service in production
      if (process.env.NODE_ENV === 'production') {
        // Example: send to Google Analytics, Vercel Analytics, etc.
        // gtag('event', metric.name, {
        //   value: Math.round(metric.value),
        //   metric_id: metric.id,
        //   metric_delta: Math.round(metric.delta)
        // });
      }
    });

    return () => {
      observer?.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}

// Performance optimization hook
export function usePerformanceOptimization() {
  useEffect(() => {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
      import('@/lib/performance').then(({ lazyLoadImages }) => {
        lazyLoadImages();
      });
    }

    // Preload critical resources
    import('@/lib/performance').then(({ addResourceHints }) => {
      addResourceHints();
    });

    // Initialize focus visible polyfill
    import('@/lib/accessibility').then(({ initFocusVisible }) => {
      initFocusVisible();
    });
  }, []);
}

// Loading performance component
export function LoadingPerformance({ children, fallback }: { 
  children: React.ReactNode; 
  fallback?: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time measurement
    const startTime = performance.now();
    
    const timer = setTimeout(() => {
      const endTime = performance.now();
      console.log(`Loading time: ${endTime - startTime}ms`);
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return fallback || (
      <div className="loading-state">
        <div className="spinner"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return <>{children}</>;
}

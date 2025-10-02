// Performance optimization utilities
export interface PerformanceOptions {
  enableLazyLoading?: boolean;
  enableImageOptimization?: boolean;
  enableCodeSplitting?: boolean;
  enableCaching?: boolean;
  enableCompression?: boolean;
}

// Image optimization utilities
export function optimizeImage(src: string, options: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
} = {}): string {
  const { width, height, quality = 75, format = 'webp' } = options;
  
  // For external images, return as-is
  if (src.startsWith('http')) {
    return src;
  }
  
  // For local images, add optimization parameters
  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  params.set('q', quality.toString());
  params.set('f', format);
  
  return `${src}?${params.toString()}`;
}

// Lazy loading utilities
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };
  
  return new IntersectionObserver(callback, defaultOptions);
}

export function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = createIntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Debounce and throttle utilities
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Memory management utilities
export function createWeakMapCache<K extends object, V>(): WeakMap<K, V> {
  return new WeakMap<K, V>();
}

export function memoize<T extends (...args: any[]) => any>(
  func: T,
  keyGenerator?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>) => {
    const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = func(...args);
    cache.set(key, result);
    
    // Limit cache size to prevent memory leaks
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    return result;
  }) as T;
}

// Bundle size optimization
export function createDynamicImport<T>(
  importFn: () => Promise<T>,
  fallback?: T
): () => Promise<T> {
  let cachedPromise: Promise<T> | null = null;
  
  return () => {
    if (cachedPromise) {
      return cachedPromise;
    }
    
    cachedPromise = importFn().catch(error => {
      cachedPromise = null; // Reset cache on error
      console.error('Dynamic import failed:', error);
      if (fallback) {
        return Promise.resolve(fallback);
      }
      throw error;
    });
    
    return cachedPromise;
  };
}

// Resource hints
export function addResourceHints() {
  if (typeof document === 'undefined') return;
  
  // Preload critical resources
  const criticalResources = [
    '/fonts/inter-var.woff2',
    '/lfa-logo.png'
  ];
  
  criticalResources.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = href.endsWith('.woff2') ? 'font' : 'image';
    if (href.endsWith('.woff2')) {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });
  
  // Prefetch likely next pages
  const likelyPages = ['/browse', '/templates'];
  likelyPages.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  });
}

// Performance monitoring
export function measurePerformance(name: string, fn: () => void): void {
  if (typeof performance === 'undefined') {
    fn();
    return;
  }
  
  const start = performance.now();
  fn();
  const end = performance.now();
  
  console.log(`${name}: ${end - start}ms`);
}

export function createPerformanceObserver(): PerformanceObserver | null {
  if (typeof PerformanceObserver === 'undefined') return null;
  
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach(entry => {
      if (entry.entryType === 'navigation') {
        const navEntry = entry as PerformanceNavigationTiming;
        console.log('Navigation timing:', {
          domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
          loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
          totalTime: navEntry.loadEventEnd - navEntry.fetchStart
        });
      }
      
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('LCP:', entry.startTime);
      }
      
      if (entry.entryType === 'first-input') {
        const inputEntry = entry as PerformanceEventTiming;
        console.log('FID:', inputEntry.processingStart - inputEntry.startTime);
      }
    });
  });
  
  observer.observe({ entryTypes: ['navigation', 'largest-contentful-paint', 'first-input'] });
  
  return observer;
}

// Service Worker utilities
export function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
    return Promise.resolve(null);
  }
  
  return navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('Service Worker registered:', registration);
      return registration;
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error);
      return null;
    });
}

// Critical CSS inlining
export function inlineCriticalCSS(css: string): void {
  if (typeof document === 'undefined') return;
  
  const style = document.createElement('style');
  style.textContent = css;
  style.setAttribute('data-critical', 'true');
  document.head.appendChild(style);
}

// Web Vitals monitoring
export function reportWebVitals(onPerfEntry?: (metric: any) => void) {
  if (!onPerfEntry || typeof window === 'undefined') return;
  
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  });
}

"use client";
import React, { useState, useEffect, useRef } from 'react';

// Micro-interaction utilities
export interface MicroInteractionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  trigger?: 'hover' | 'click' | 'focus' | 'load' | 'scroll';
  animation?: 'fade' | 'slide' | 'scale' | 'bounce' | 'pulse' | 'glow';
  direction?: 'up' | 'down' | 'left' | 'right';
}

// Hover micro-interactions
export function HoverGlow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`hover-glow transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 ${className}`}>
      {children}
    </div>
  );
}

export function HoverLift({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`hover-lift transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${className}`}>
      {children}
    </div>
  );
}

export function HoverScale({ children, className = '', scale = 1.05 }: { children: React.ReactNode; className?: string; scale?: number }) {
  return (
    <div 
      className={`hover-scale transition-transform duration-300 hover:scale-105 ${className}`}
      style={{ '--hover-scale': scale } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

// Click micro-interactions
export function ClickRipple({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <div 
      className={`click-ripple relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute pointer-events-none animate-ripple"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
          }}
        />
      ))}
    </div>
  );
}

// Loading micro-interactions
export function LoadingPulse({ children, isLoading, className = '' }: { 
  children: React.ReactNode; 
  isLoading: boolean; 
  className?: string;
}) {
  return (
    <div className={`loading-pulse ${isLoading ? 'animate-pulse opacity-75' : ''} ${className}`}>
      {children}
    </div>
  );
}

export function LoadingSkeleton({ className = '', lines = 3 }: { className?: string; lines?: number }) {
  return (
    <div className={`loading-skeleton ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className="h-4 bg-gray-200 rounded animate-pulse mb-2"
          style={{ width: `${100 - i * 10}%` }}
        />
      ))}
    </div>
  );
}

// Scroll-triggered animations
export function ScrollReveal({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up'
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const directionClasses = {
    up: 'translate-y-8 opacity-0',
    down: '-translate-y-8 opacity-0',
    left: 'translate-x-8 opacity-0',
    right: '-translate-x-8 opacity-0'
  };

  return (
    <div 
      ref={ref}
      className={`scroll-reveal transition-all duration-700 ease-out ${
        isVisible 
          ? 'translate-y-0 translate-x-0 opacity-100' 
          : directionClasses[direction]
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Staggered animations
export function StaggeredReveal({ 
  children, 
  className = '',
  staggerDelay = 100
}: { 
  children: React.ReactNode; 
  className?: string;
  staggerDelay?: number;
}) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = Array.from(ref.current?.children || []);
          children.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, index]);
            }, index * staggerDelay);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [staggerDelay]);

  return (
    <div ref={ref} className={`staggered-reveal ${className}`}>
      {React.Children.map(children, (child, index) => (
        <div 
          className={`transition-all duration-500 ease-out ${
            visibleItems.includes(index) 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: `${index * staggerDelay}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

// Focus micro-interactions
export function FocusRing({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`focus-ring focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${className}`}>
      {children}
    </div>
  );
}

// Button micro-interactions
export function ButtonPress({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div 
      className={`button-press transition-transform duration-150 ${
        isPressed ? 'scale-95' : 'scale-100'
      } ${className}`}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      {children}
    </div>
  );
}

// Card micro-interactions
export function CardHover({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`card-hover transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 ${className}`}>
      {children}
    </div>
  );
}

// Text micro-interactions
export function Typewriter({ 
  text, 
  speed = 50, 
  className = '',
  onComplete
}: { 
  text: string; 
  speed?: number; 
  className?: string;
  onComplete?: () => void;
}) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className={`typewriter ${className}`}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// Progress micro-interactions
export function ProgressBar({ 
  progress, 
  className = '',
  animated = true
}: { 
  progress: number; 
  className?: string;
  animated?: boolean;
}) {
  return (
    <div className={`progress-bar w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div 
        className={`h-2 bg-blue-600 rounded-full transition-all duration-1000 ease-out ${
          animated ? 'animate-pulse' : ''
        }`}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
}

// Notification micro-interactions
export function NotificationSlide({ 
  children, 
  isVisible, 
  className = '',
  position = 'top-right'
}: { 
  children: React.ReactNode; 
  isVisible: boolean; 
  className?: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}) {
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  };

  return (
    <div 
      className={`notification-slide fixed z-50 transition-all duration-500 ease-out ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-4 opacity-0'
      } ${positionClasses[position]} ${className}`}
    >
      {children}
    </div>
  );
}

// Tooltip micro-interactions
export function Tooltip({ 
  children, 
  content, 
  className = '',
  position = 'top'
}: { 
  children: React.ReactNode; 
  content: string; 
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  return (
    <div 
      className={`tooltip relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div 
          className={`absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg transition-opacity duration-200 ${
            positionClasses[position]
          }`}
        >
          {content}
          <div className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
            position === 'top' ? 'top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2' :
            position === 'bottom' ? 'bottom-full left-1/2 transform -translate-x-1/2 translate-y-1/2' :
            position === 'left' ? 'left-full top-1/2 transform -translate-y-1/2 -translate-x-1/2' :
            'right-full top-1/2 transform -translate-y-1/2 translate-x-1/2'
          }`} />
        </div>
      )}
    </div>
  );
}

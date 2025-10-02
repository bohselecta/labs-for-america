import React from 'react';

// Enhanced loading skeleton components
export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`card p-6 animate-pulse ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="h-6 w-16 bg-gray-200 rounded"></div>
        <div className="h-6 w-20 bg-gray-200 rounded"></div>
      </div>
      <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-full bg-gray-200 rounded mb-4"></div>
      <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
    </div>
  );
}

export function HeroSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white border-b border-gray-200 section-rhythm ${className}`}>
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-10">
        <div className="py-8 md:py-12 animate-pulse">
          <div className="h-12 w-3/4 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-6 w-5/6 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 w-4/5 bg-gray-200 rounded mb-8"></div>
          <div className="flex gap-3">
            <div className="h-12 w-32 bg-gray-200 rounded"></div>
            <div className="h-12 w-28 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5, className = '' }: { rows?: number; className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="h-8 w-full bg-gray-200 rounded mb-4"></div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 mb-3">
          <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
          <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-6 w-1/6 bg-gray-200 rounded"></div>
          <div className="h-6 w-1/6 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}

export function ListSkeleton({ items = 3, className = '' }: { items?: number; className?: string }) {
  return (
    <div className={`space-y-3 animate-pulse ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}

export function FormSkeleton({ fields = 4, className = '' }: { fields?: number; className?: string }) {
  return (
    <div className={`space-y-4 animate-pulse ${className}`}>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i}>
          <div className="h-4 w-1/4 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 w-full bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}

// Loading states for different components
export function LoadingState({ 
  type = 'card', 
  count = 1, 
  className = '' 
}: { 
  type?: 'card' | 'hero' | 'table' | 'list' | 'form';
  count?: number;
  className?: string;
}) {
  switch (type) {
    case 'hero':
      return <HeroSkeleton className={className} />;
    case 'table':
      return <TableSkeleton rows={count} className={className} />;
    case 'list':
      return <ListSkeleton items={count} className={className} />;
    case 'form':
      return <FormSkeleton fields={count} className={className} />;
    default:
      return (
        <div className={`grid gap-6 ${className}`}>
          {Array.from({ length: count }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      );
  }
}

// Loading overlay component
export function LoadingOverlay({ 
  isLoading, 
  children, 
  message = 'Loading...',
  className = ''
}: { 
  isLoading: boolean; 
  children: React.ReactNode;
  message?: string;
  className?: string;
}) {
  if (!isLoading) return <>{children}</>;

  return (
    <div className={`relative ${className}`}>
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
        <div className="flex items-center gap-3">
          <div className="spinner"></div>
          <span className="text-gray-600 font-medium">{message}</span>
        </div>
      </div>
    </div>
  );
}

// Loading button component
export function LoadingButton({ 
  isLoading, 
  children, 
  className = '',
  disabled = false,
  ...props
}: { 
  isLoading: boolean; 
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button 
      className={`relative ${className} ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="spinner w-4 h-4"></div>
        </div>
      )}
      <span className={isLoading ? 'opacity-0' : ''}>
        {children}
      </span>
    </button>
  );
}

// Loading text component
export function LoadingText({ 
  isLoading, 
  children, 
  placeholder = 'Loading...',
  className = ''
}: { 
  isLoading: boolean; 
  children: React.ReactNode;
  placeholder?: string;
  className?: string;
}) {
  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
      </div>
    );
  }
  
  return <span className={className}>{children}</span>;
}

// Loading image component
export function LoadingImage({ 
  src, 
  alt, 
  className = '',
  ...props
}: { 
  src: string;
  alt: string;
  className?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded"></div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        {...props}
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          <span className="text-sm">Image failed to load</span>
        </div>
      )}
    </div>
  );
}

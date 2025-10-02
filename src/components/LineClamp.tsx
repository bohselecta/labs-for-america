import React from 'react';

// Line clamp utility component
export function LineClamp({ 
  children, 
  lines = 3, 
  className = '',
  showMore = false,
  onToggleShowMore
}: { 
  children: React.ReactNode;
  lines?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  showMore?: boolean;
  onToggleShowMore?: () => void;
}) {
  const lineClampClass = `line-clamp-${lines}`;
  
  return (
    <div className={`${lineClampClass} ${className}`}>
      {children}
      {showMore && onToggleShowMore && (
        <button
          onClick={onToggleShowMore}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-1 focus-enhanced"
        >
          Show more
        </button>
      )}
    </div>
  );
}

// Text truncation component
export function TextTruncate({ 
  text, 
  maxLength = 100, 
  className = '',
  showFull = false,
  onToggleShowFull
}: { 
  text: string;
  maxLength?: number;
  className?: string;
  showFull?: boolean;
  onToggleShowFull?: () => void;
}) {
  const shouldTruncate = text.length > maxLength && !showFull;
  const displayText = shouldTruncate ? `${text.slice(0, maxLength)}...` : text;
  
  return (
    <span className={className}>
      {displayText}
      {shouldTruncate && onToggleShowFull && (
        <button
          onClick={onToggleShowFull}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium ml-1 focus-enhanced"
        >
          Show more
        </button>
      )}
    </span>
  );
}

// Responsive line clamp
export function ResponsiveLineClamp({ 
  children, 
  mobileLines = 2,
  desktopLines = 3,
  className = ''
}: { 
  children: React.ReactNode;
  mobileLines?: 1 | 2 | 3 | 4 | 5 | 6;
  desktopLines?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}) {
  return (
    <div className={`line-clamp-${mobileLines} md:line-clamp-${desktopLines} ${className}`}>
      {children}
    </div>
  );
}

// Expandable text component
export function ExpandableText({ 
  text, 
  maxLines = 3,
  className = ''
}: { 
  text: string;
  maxLines?: number;
  className?: string;
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  return (
    <div className={className}>
      <LineClamp 
        lines={isExpanded ? 10 : maxLines}
        showMore={!isExpanded}
        onToggleShowMore={() => setIsExpanded(true)}
      >
        {text}
      </LineClamp>
      {isExpanded && (
        <button
          onClick={() => setIsExpanded(false)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-1 focus-enhanced"
        >
          Show less
        </button>
      )}
    </div>
  );
}

// Card content with line clamp
export function CardContent({ 
  title,
  description,
  maxLines = 3,
  className = ''
}: { 
  title: string;
  description: string;
  maxLines?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="font-semibold text-lg mb-2 text-balance">{title}</h3>
      <LineClamp lines={maxLines}>
        <p className="text-gray-600 text-sm text-pretty">{description}</p>
      </LineClamp>
    </div>
  );
}

// List item with truncation
export function TruncatedListItem({ 
  text, 
  maxLength = 50,
  className = ''
}: { 
  text: string;
  maxLength?: number;
  className?: string;
}) {
  return (
    <li className={`${className}`}>
      <TextTruncate text={text} maxLength={maxLength} />
    </li>
  );
}

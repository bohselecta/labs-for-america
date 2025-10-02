import React, { useState } from 'react';
import { Icon } from '@/components/icons';
import { getResources } from '@/lib/content-guidelines';
import { HoverLift } from '@/components/micro-interactions';

interface ResourcesBoxProps {
  context: 'gettingStarted' | 'community' | 'technical';
  title?: string;
  className?: string;
}

export function ResourcesBox({ 
  context, 
  title = "Helpful Resources",
  className = '' 
}: ResourcesBoxProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const resources = getResources(context);

  const typeIcons = {
    guide: 'chevron-right',
    tips: 'innovation', 
    guidelines: 'democracy',
    process: 'clock',
    technical: 'civic',
    privacy: 'democracy'
  };

  const typeColors = {
    guide: 'text-blue-600',
    tips: 'text-green-600',
    guidelines: 'text-purple-600', 
    process: 'text-orange-600',
    technical: 'text-gray-600',
    privacy: 'text-red-600'
  };

  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left focus-enhanced"
        aria-expanded={isExpanded}
        aria-controls="resources-content"
      >
        <div className="flex items-center gap-2">
          <Icon name="chevron-right" size="sm" className="text-gray-500" />
          <h3 className="font-semibold text-sm font-headline text-gray-900">
            {title}
          </h3>
        </div>
        <Icon 
          name="chevron-down" 
          size="sm" 
          className={`text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>
      
      {isExpanded && (
        <div id="resources-content" className="mt-4 space-y-3">
          {resources.map((resource, index) => (
            <HoverLift key={index}>
              <a
                href={resource.url}
                className="block p-3 bg-white border border-gray-200 rounded-md hover:border-blue-300 transition-colors focus-enhanced"
              >
                <div className="flex items-start gap-3">
                  <Icon 
                    name={typeIcons[resource.type as keyof typeof typeIcons] as any}
                    size="sm"
                    className={`flex-shrink-0 mt-0.5 ${typeColors[resource.type as keyof typeof typeColors]}`}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm font-headline text-gray-900 mb-1">
                      {resource.title}
                    </h4>
                    <p className="text-xs text-gray-600 font-body text-pretty">
                      {resource.description}
                    </p>
                  </div>
                </div>
              </a>
            </HoverLift>
          ))}
        </div>
      )}
    </div>
  );
}

// Compact resources for inline use
export function CompactResources({ 
  context,
  className = '' 
}: { 
  context: 'gettingStarted' | 'community' | 'technical';
  className?: string;
}) {
  const resources = getResources(context);
  
  return (
    <div className={`space-y-2 ${className}`}>
      {resources.slice(0, 2).map((resource, index) => (
        <a
          key={index}
          href={resource.url}
          className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-700 font-body focus-enhanced"
        >
          <Icon name="external-link" size="xs" />
          {resource.title}
        </a>
      ))}
    </div>
  );
}

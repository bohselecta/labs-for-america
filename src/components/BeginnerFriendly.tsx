import React, { useState } from 'react';
import { Icon } from '@/components/icons';
import { CONTENT_GUIDELINES } from '@/lib/content-guidelines';
import { HoverLift } from '@/components/micro-interactions';

interface ExplanationTooltipProps {
  term: string;
  children: React.ReactNode;
  className?: string;
}

export function ExplanationTooltip({ 
  term, 
  children, 
  className = '' 
}: ExplanationTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const explanation = CONTENT_GUIDELINES.explanations[term as keyof typeof CONTENT_GUIDELINES.explanations];

  if (!explanation) return <>{children}</>;

  return (
    <span 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 max-w-xs shadow-lg">
            <div className="font-semibold mb-1">{term}</div>
            <div className="text-pretty">{explanation}</div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </span>
  );
}

// Beginner-friendly section with explanations
export function BeginnerSection({ 
  title,
  children,
  className = ''
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-green-50 border border-green-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon name="award" size="sm" className="text-green-600" />
        <h3 className="font-semibold text-sm font-headline text-green-800">
          {title}
        </h3>
      </div>
      <div className="text-sm text-green-700 font-body text-pretty">
        {children}
      </div>
    </div>
  );
}

// Quick explanation for common terms
export function QuickExplanation({ 
  term,
  className = ''
}: {
  term: string;
  className?: string;
}) {
  const explanation = CONTENT_GUIDELINES.explanations[term as keyof typeof CONTENT_GUIDELINES.explanations];
  
  if (!explanation) return null;

  return (
    <HoverLift>
      <div className={`bg-blue-50 border border-blue-200 rounded-md p-3 ${className}`}>
        <div className="flex items-start gap-2">
          <Icon name="innovation" size="sm" className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-sm font-headline text-blue-900 mb-1">
              What is {term}?
            </div>
            <div className="text-xs text-blue-700 font-body text-pretty">
              {explanation}
            </div>
          </div>
        </div>
      </div>
    </HoverLift>
  );
}

// Step-by-step guide component
export function StepGuide({ 
  steps,
  title = "How to Get Started",
  className = ''
}: {
  steps: Array<{
    number: number;
    title: string;
    description: string;
    icon?: string;
  }>;
  title?: string;
  className?: string;
}) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      <h3 className="font-semibold text-lg font-headline mb-4 text-balance">
        {title}
      </h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
              {step.number}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm font-headline text-gray-900 mb-1">
                {step.title}
              </h4>
              <p className="text-sm text-gray-600 font-body text-pretty">
                {step.description}
              </p>
            </div>
            {step.icon && (
              <Icon 
                name={step.icon as any} 
                size="sm" 
                className="text-gray-400 flex-shrink-0 mt-1" 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

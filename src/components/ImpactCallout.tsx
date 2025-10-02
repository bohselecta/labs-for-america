import React from 'react';
import { Icon } from '@/components/icons';
import { getImpactCallout } from '@/lib/content-guidelines';

interface ImpactCalloutProps {
  type: 'beginner' | 'expert' | 'community' | 'government';
  className?: string;
}

export function ImpactCallout({ type, className = '' }: ImpactCalloutProps) {
  const callout = getImpactCallout(type);
  
  const colorClasses = {
    green: 'bg-green-50 border-green-200 text-green-800',
    blue: 'bg-blue-50 border-blue-200 text-blue-800', 
    purple: 'bg-purple-50 border-purple-200 text-purple-800'
  };

  return (
    <div className={`p-4 rounded-lg border ${colorClasses[callout.color as keyof typeof colorClasses]} ${className}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <Icon 
            name={callout.icon as any} 
            size="md" 
            className={`text-${callout.color}-600`}
          />
        </div>
        <div>
          <h3 className="font-semibold text-sm font-headline mb-1">
            {callout.title}
          </h3>
          <p className="text-sm font-body text-pretty">
            {callout.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// Quick impact callout for inline use
export function QuickImpactCallout({ 
  children, 
  type = 'community',
  className = '' 
}: { 
  children: React.ReactNode; 
  type?: 'beginner' | 'expert' | 'community' | 'government';
  className?: string;
}) {
  const callout = getImpactCallout(type);
  
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-${callout.color}-100 text-${callout.color}-800 ${className}`}>
      <Icon name={callout.icon as any} size="xs" />
      {children}
    </div>
  );
}

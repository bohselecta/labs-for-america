import React, { useState, useEffect } from 'react';

export interface CrisisMode {
  id: string;
  type: 'manhunt' | 'emergency' | 'none';
  title: string;
  description: string;
  isActive: boolean;
  activatedAt?: Date;
  activatedBy?: string;
  liveUpdatesUrl?: string;
}

export interface CrisisBannerProps {
  crisis: CrisisMode | null;
  onDismiss?: () => void;
}

export function CrisisBanner({ crisis, onDismiss }: CrisisBannerProps) {
  if (!crisis || !crisis.isActive) return null;

  const bannerStyles = {
    manhunt: 'bg-red-600 text-white border-red-700',
    emergency: 'bg-orange-600 text-white border-orange-700',
    none: 'bg-gray-600 text-white border-gray-700'
  };

  const bannerCopy = {
    manhunt: 'Active Search in Progress — Get official updates and share tips responsibly.',
    emergency: 'Community Safety Notice — Latest guidance and resources.',
    none: 'Community Notice — Important information for residents.'
  };

  return (
    <div className={`${bannerStyles[crisis.type]} border-b-2 py-3 px-4`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          <div>
            <h2 className="font-semibold text-lg">{crisis.title}</h2>
            <p className="text-sm opacity-90">{bannerCopy[crisis.type]}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {crisis.liveUpdatesUrl && (
            <a
              href={crisis.liveUpdatesUrl}
              className="bg-white text-red-600 px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors"
            >
              Live Updates →
            </a>
          )}
          <a
            href="/tips"
            className="bg-white text-red-600 px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors"
          >
            Share Tips →
          </a>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-white hover:text-gray-200 p-1"
              aria-label="Dismiss banner"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export interface CrisisToggleProps {
  currentCrisis: CrisisMode | null;
  onCrisisChange: (crisis: CrisisMode | null) => void;
}

export function CrisisToggle({ currentCrisis, onCrisisChange }: CrisisToggleProps) {
  const [isLoading, setIsLoading] = useState(false);

  const crisisTypes = [
    {
      id: 'manhunt',
      title: 'Active Search in Progress',
      description: 'Manhunt mode - for active searches and wanted persons',
      color: 'bg-red-600 hover:bg-red-700'
    },
    {
      id: 'emergency',
      title: 'Community Safety Notice',
      description: 'Emergency mode - for community safety alerts',
      color: 'bg-orange-600 hover:bg-orange-700'
    },
    {
      id: 'none',
      title: 'Normal Operations',
      description: 'Deactivate crisis mode',
      color: 'bg-gray-600 hover:bg-gray-700'
    }
  ];

  const handleCrisisToggle = async (type: 'manhunt' | 'emergency' | 'none') => {
    setIsLoading(true);
    try {
      const newCrisis = type === 'none' ? null : {
        id: `crisis-${Date.now()}`,
        type,
        title: crisisTypes.find(c => c.id === type)?.title || '',
        description: crisisTypes.find(c => c.id === type)?.description || '',
        isActive: true,
        activatedAt: new Date(),
        activatedBy: 'admin', // In real app, get from auth context
        liveUpdatesUrl: type !== 'none' ? '/live' : undefined
      };

      // In real app, save to database
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      
      onCrisisChange(newCrisis);
    } catch (error) {
      console.error('Failed to update crisis mode:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Crisis Mode Management</h2>
        <p className="text-gray-600">
          Activate crisis modes to display public banners and enable emergency protocols.
        </p>
      </div>

      {currentCrisis && currentCrisis.isActive && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            <span className="font-semibold text-red-800">Active Crisis Mode</span>
          </div>
          <p className="text-red-700">{currentCrisis.title}</p>
          <p className="text-sm text-red-600">
            Activated: {currentCrisis.activatedAt?.toLocaleString()}
          </p>
        </div>
      )}

      <div className="grid gap-4">
        {crisisTypes.map((crisis) => (
          <div
            key={crisis.id}
            className={`${crisis.color} text-white rounded-lg p-4 cursor-pointer transition-colors ${
              currentCrisis?.type === crisis.id ? 'ring-2 ring-white' : ''
            }`}
            onClick={() => handleCrisisToggle(crisis.id as any)}
          >
            <h3 className="font-semibold text-lg mb-1">{crisis.title}</h3>
            <p className="text-sm opacity-90">{crisis.description}</p>
            {isLoading && (
              <div className="mt-2 text-sm opacity-75">Updating...</div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Crisis Mode Features</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Public banner displays on all pages</li>
          <li>• Live updates feed becomes prominent</li>
          <li>• Tips submission is highlighted</li>
          <li>• Public discussion may be moderated</li>
          <li>• All actions are logged for audit</li>
        </ul>
      </div>
    </div>
  );
}

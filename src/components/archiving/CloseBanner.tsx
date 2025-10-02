import React, { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icons';

export interface LabCloseBannerProps {
  labId: string;
  labTitle: string;
  closedAt: Date;
  closedBy: string;
  reportPath?: string;
  onDismiss?: () => void;
  onViewReport?: () => void;
}

export function LabCloseBanner({ 
  labId, 
  labTitle, 
  closedAt, 
  closedBy, 
  reportPath,
  onDismiss,
  onViewReport
}: LabCloseBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  const handleViewReport = () => {
    onViewReport?.();
  };

  if (isDismissed) return null;

  return (
    <div className="bg-blue-50 border-b border-blue-200 py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Icon name="civic" size="sm" className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-800">
                Lab Closed: {labTitle}
              </h3>
              <p className="text-sm text-blue-600">
                Closed on {closedAt.toLocaleDateString()} by {closedBy}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {reportPath && (
              <Link
                href={`/archive/${labId}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                onClick={handleViewReport}
              >
                <Icon name="external-link" size="sm" className="inline mr-1" />
                View Archive
              </Link>
            )}
            <Link
              href="/archive"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Browse All Archives
            </Link>
            <button
              onClick={handleDismiss}
              className="text-blue-500 hover:text-blue-700 p-1"
              aria-label="Dismiss banner"
            >
              <Icon name="chevron-right" size="sm" className="rotate-45" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface ArchiveNoticeProps {
  labId: string;
  labTitle: string;
  closedAt: Date;
  reportPath?: string;
  onViewReport?: () => void;
}

export function ArchiveNotice({ 
  labId, 
  labTitle, 
  closedAt, 
  reportPath,
  onViewReport
}: ArchiveNoticeProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          <Icon name="civic" size="md" className="text-gray-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            This Lab is Archived
          </h2>
          <p className="text-gray-600">
            {labTitle} was closed on {closedAt.toLocaleDateString()}
          </p>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-2">Archive Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <strong>Lab ID:</strong> {labId}
          </div>
          <div>
            <strong>Closed:</strong> {closedAt.toLocaleString()}
          </div>
          <div>
            <strong>Status:</strong> Archived
          </div>
          <div>
            <strong>Report:</strong> {reportPath ? 'Available' : 'Not available'}
          </div>
        </div>
        
        {reportPath && (
          <div className="mt-4 flex gap-3">
            <Link
              href={`/archive/${labId}`}
              className="btn-primary"
              onClick={onViewReport}
            >
              <Icon name="external-link" size="sm" className="inline mr-1" />
              View Full Archive
            </Link>
            <Link
              href="/archive"
              className="btn-secondary"
            >
              Browse Other Archives
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

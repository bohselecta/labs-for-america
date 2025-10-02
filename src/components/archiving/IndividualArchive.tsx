import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icons';
import { LineClamp } from '@/components/LineClamp';
import { StatusBadge } from '@/lib/status-colors';

export interface ArchiveReport {
  id: string;
  labId: string;
  title: string;
  description: string;
  category: string;
  platform: 'civic' | 'justice' | 'edu' | 'health';
  closedAt: Date;
  closedBy: string;
  participants: number;
  contributions: number;
  outcomes: string[];
  decisions: string[];
  nextSteps: string[];
  reportContent: string;
  attachments: string[];
  tags: string[];
}

export interface IndividualArchivePageProps {
  labId: string;
  report: ArchiveReport;
  onExportReport: () => void;
  onDownloadAttachment: (attachment: string) => void;
}

export function IndividualArchivePage({ 
  labId, 
  report, 
  onExportReport, 
  onDownloadAttachment 
}: IndividualArchivePageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'report' | 'contributions' | 'outcomes'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'report', label: 'Report', icon: '📋' },
    { id: 'contributions', label: 'Contributions', icon: '💬' },
    { id: 'outcomes', label: 'Outcomes', icon: '🎯' }
  ];

  const getPlatformIcon = (platform: string) => {
    const icons = {
      'civic': '🏛️',
      'justice': '🚔',
      'edu': '🎓',
      'health': '🏥'
    };
    return icons[platform as keyof typeof icons] || '📁';
  };

  const getPlatformLabel = (platform: string) => {
    const labels = {
      'civic': 'CivicLabs',
      'justice': 'JusticeLabs',
      'edu': 'EduLabs',
      'health': 'HealthLabs'
    };
    return labels[platform as keyof typeof labels] || platform;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Link
            href="/archive"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            ← Back to Archive
          </Link>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{getPlatformIcon(report.platform)}</span>
          <div className="flex-1">
            <h1 className="text-3xl font-semibold mb-2">{report.title}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <span>{getPlatformLabel(report.platform)}</span>
              <span>•</span>
              <span>{report.category}</span>
              <span>•</span>
              <span>Closed {report.closedAt.toLocaleDateString()}</span>
            </div>
          </div>
          <StatusBadge status="closed" />
        </div>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <strong>Lab ID:</strong> {report.labId}
            </div>
            <div>
              <strong>Closed by:</strong> {report.closedBy}
            </div>
            <div>
              <strong>Participants:</strong> {report.participants}
            </div>
            <div>
              <strong>Contributions:</strong> {report.contributions}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Lab Description</h2>
            <p className="text-gray-700 leading-relaxed">{report.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Participants</span>
                  <span className="font-semibold">{report.participants}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contributions</span>
                  <span className="font-semibold">{report.contributions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">
                    {Math.ceil((Date.now() - report.closedAt.getTime()) / (1000 * 60 * 60 * 24))} days ago
                  </span>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {report.tags.map(tag => (
                  <span key={tag} className="badge badge-secondary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {report.attachments.length > 0 && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Attachments</h3>
              <div className="space-y-2">
                {report.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm font-medium">{attachment}</span>
                    <button
                      onClick={() => onDownloadAttachment(attachment)}
                      className="btn-secondary text-sm px-3 py-1"
                    >
                      <Icon name="external-link" size="sm" className="inline mr-1" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'report' && (
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Lab Report</h2>
              <button
                onClick={onExportReport}
                className="btn-primary"
              >
                <Icon name="external-link" size="sm" className="inline mr-1" />
                Export Report
              </button>
            </div>
            
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: report.reportContent }} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'contributions' && (
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Contributions Summary</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">Contribution Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
                <div>
                  <strong>Total Contributions:</strong> {report.contributions}
                </div>
                <div>
                  <strong>Active Contributors:</strong> {report.participants}
                </div>
                <div>
                  <strong>Average per Participant:</strong> {Math.round(report.contributions / report.participants)}
                </div>
              </div>
            </div>
            
            <div className="text-center py-8 text-gray-500">
              <Icon name="civic" size="xl" className="mx-auto mb-4" />
              <p>Detailed contribution data would be displayed here.</p>
              <p className="text-sm">This includes all submissions, comments, and votes from the Lab.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'outcomes' && (
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Outcomes & Impact</h2>
            
            {report.outcomes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Key Outcomes</h3>
                <ul className="space-y-2">
                  {report.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Icon name="chevron-right" size="sm" className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {report.decisions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Decisions Made</h3>
                <ul className="space-y-2">
                  {report.decisions.map((decision, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Icon name="chevron-right" size="sm" className="text-blue-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{decision}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {report.nextSteps.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Next Steps</h3>
                <ul className="space-y-2">
                  {report.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Icon name="chevron-right" size="sm" className="text-orange-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {report.outcomes.length === 0 && report.decisions.length === 0 && report.nextSteps.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Icon name="civic" size="xl" className="mx-auto mb-4" />
                <p>No specific outcomes documented for this Lab.</p>
                <p className="text-sm">Outcomes and impact data would be displayed here.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

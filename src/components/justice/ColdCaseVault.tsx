import React, { useState } from 'react';

export interface CaseAsset {
  id: string;
  caseId: string;
  title: string;
  description: string;
  publicUrl?: string; // redacted version
  privateUrl?: string; // internal-only
  isRedacted: boolean;
  hash: string; // sha256 of public file for verification
  uploadedAt: Date;
  uploadedBy: string;
  fileType: 'pdf' | 'image' | 'document' | 'video' | 'audio';
  fileSize: number;
}

export interface ColdCase {
  id: string;
  title: string;
  description: string;
  caseNumber: string;
  dateOpened: Date;
  lastActivity: Date;
  status: 'active' | 'closed' | 'archived';
  assets: CaseAsset[];
  timeline: CaseTimelineEvent[];
  isPublic: boolean;
  publishedAt?: Date;
}

export interface CaseTimelineEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
  type: 'incident' | 'investigation' | 'evidence' | 'witness' | 'suspect' | 'other';
  isPublic: boolean;
}

export interface ColdCaseVaultProps {
  cases: ColdCase[];
  onPublishCase: (caseId: string) => void;
  onUploadAsset: (caseId: string, file: File) => Promise<void>;
  onAddTimelineEvent: (caseId: string, event: Omit<CaseTimelineEvent, 'id'>) => void;
}

export function ColdCaseVault({ cases, onPublishCase, onUploadAsset, onAddTimelineEvent }: ColdCaseVaultProps) {
  const [selectedCase, setSelectedCase] = useState<ColdCase | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedCase || !e.target.files?.[0]) return;

    setIsUploading(true);
    try {
      await onUploadAsset(selectedCase.id, e.target.files[0]);
    } catch (error) {
      console.error('Failed to upload asset:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">Cold Case Vault</h1>
        <p className="text-gray-600 mb-4">
          Manage cold case files, create public Labs from redacted materials, and maintain case timelines.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Privacy & Security</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• All public materials are redacted to protect privacy</li>
            <li>• Original files remain private and secure</li>
            <li>• Public assets include integrity verification hashes</li>
            <li>• Timeline events can be marked as public or private</li>
          </ul>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cases List */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Cases</h2>
          <div className="space-y-3">
            {cases.map((case_) => (
              <div
                key={case_.id}
                className={`card p-4 cursor-pointer transition-colors ${
                  selectedCase?.id === case_.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCase(case_)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{case_.title}</h3>
                  <span className={`badge ${
                    case_.isPublic ? 'badge-success' : 'badge-secondary'
                  }`}>
                    {case_.isPublic ? 'Public' : 'Private'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{case_.caseNumber}</p>
                <p className="text-xs text-gray-500">
                  {case_.assets.length} assets • Last activity: {case_.lastActivity.toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Case Details */}
        <div className="lg:col-span-2">
          {selectedCase ? (
            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold">{selectedCase.title}</h2>
                    <p className="text-gray-600">{selectedCase.caseNumber}</p>
                  </div>
                  <div className="flex gap-2">
                    {!selectedCase.isPublic && (
                      <button
                        onClick={() => onPublishCase(selectedCase.id)}
                        className="btn-primary"
                      >
                        Publish Lab
                      </button>
                    )}
                    <span className={`badge ${
                      selectedCase.isPublic ? 'badge-success' : 'badge-secondary'
                    }`}>
                      {selectedCase.isPublic ? 'Public Lab' : 'Private Case'}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{selectedCase.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <strong>Date Opened:</strong> {selectedCase.dateOpened.toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Last Activity:</strong> {selectedCase.lastActivity.toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Assets */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Case Assets</h3>
                  <div>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.mp4,.mp3"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="asset-upload"
                    />
                    <label
                      htmlFor="asset-upload"
                      className="btn-secondary cursor-pointer"
                    >
                      {isUploading ? 'Uploading...' : 'Upload Asset'}
                    </label>
                  </div>
                </div>

                {selectedCase.assets.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No assets uploaded yet.</p>
                    <p className="text-sm">Upload files to create a public Lab.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {selectedCase.assets.map((asset) => (
                      <div key={asset.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{asset.title}</h4>
                          <div className="flex gap-2">
                            <span className={`badge ${
                              asset.isRedacted ? 'badge-success' : 'badge-warning'
                            }`}>
                              {asset.isRedacted ? 'Redacted' : 'Needs Redaction'}
                            </span>
                            <span className="badge badge-secondary">
                              {asset.fileType.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{asset.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Size: {(asset.fileSize / 1024 / 1024).toFixed(1)} MB</span>
                          <span>Uploaded: {asset.uploadedAt.toLocaleDateString()}</span>
                          {asset.hash && (
                            <span>Hash: {asset.hash.substring(0, 8)}...</span>
                          )}
                        </div>
                        <div className="mt-3 flex gap-2">
                          {asset.publicUrl && (
                            <a
                              href={asset.publicUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-secondary text-sm px-3 py-1"
                            >
                              View Public Version
                            </a>
                          )}
                          {asset.privateUrl && (
                            <a
                              href={asset.privateUrl}
                              className="btn-primary text-sm px-3 py-1"
                            >
                              View Private Version
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Timeline */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Case Timeline</h3>
                  <button
                    onClick={() => {
                      const event = {
                        date: new Date(),
                        title: 'New Timeline Event',
                        description: 'Event description',
                        type: 'other' as const,
                        isPublic: false
                      };
                      onAddTimelineEvent(selectedCase.id, event);
                    }}
                    className="btn-secondary"
                  >
                    Add Event
                  </button>
                </div>

                {selectedCase.timeline.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No timeline events yet.</p>
                    <p className="text-sm">Add events to build the case timeline.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedCase.timeline.map((event) => (
                      <div key={event.id} className="flex gap-4">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{event.title}</h4>
                            <span className={`badge ${
                              event.isPublic ? 'badge-success' : 'badge-secondary'
                            }`}>
                              {event.isPublic ? 'Public' : 'Private'}
                            </span>
                            <span className="badge badge-info">{event.type}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{event.description}</p>
                          <p className="text-xs text-gray-500">{event.date.toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>Select a case to view details and manage assets.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

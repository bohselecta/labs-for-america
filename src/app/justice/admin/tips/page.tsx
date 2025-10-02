"use client";
import { useState, useEffect } from 'react';
import { SecureTipList, SecureTip } from '@/components/justice/SecureTips';

export default function JusticeTipsAdmin() {
  const [tips, setTips] = useState<SecureTip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTip, setSelectedTip] = useState<SecureTip | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const fetchTips = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data for demo
        const mockTips: SecureTip[] = [
          {
            id: 'tip-1',
            createdAt: new Date('2024-12-15T10:30:00'),
            incident: 'Case #2024-001',
            contact: 'anonymous@example.com',
            body: 'I saw a suspicious vehicle parked near the school around 3 PM yesterday. It was a blue sedan with tinted windows.',
            attachments: [],
            ipHash: 'hash_abc123',
            status: 'RECEIVED',
            isAnonymous: false,
            referenceId: 'TIP-2024-001'
          },
          {
            id: 'tip-2',
            createdAt: new Date('2024-12-15T14:45:00'),
            incident: 'General',
            contact: undefined,
            body: 'There was unusual activity at the park last night. Multiple people were meeting near the playground after hours.',
            attachments: [],
            ipHash: 'hash_def456',
            status: 'TRIAGED',
            isAnonymous: true,
            referenceId: 'TIP-2024-002'
          },
          {
            id: 'tip-3',
            createdAt: new Date('2024-12-14T09:15:00'),
            incident: 'Case #2024-002',
            contact: 'witness@example.com',
            body: 'I have information about the incident that occurred on Main Street. I was there when it happened and can provide details.',
            attachments: ['witness_statement.pdf'],
            ipHash: 'hash_ghi789',
            status: 'ACTIONED',
            isAnonymous: false,
            referenceId: 'TIP-2024-003'
          }
        ];
        
        setTips(mockTips);
      } catch (error) {
        console.error('Failed to fetch tips:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTips();
  }, []);

  const handleStatusChange = async (tipId: string, status: SecureTip['status']) => {
    try {
      // In real app, make API call to update status
      setTips(tips.map(tip => 
        tip.id === tipId ? { ...tip, status } : tip
      ));
    } catch (error) {
      console.error('Failed to update tip status:', error);
    }
  };

  const handleViewTip = (tipId: string) => {
    const tip = tips.find(t => t.id === tipId);
    setSelectedTip(tip || null);
  };

  const filteredTips = tips.filter(tip => 
    statusFilter === 'all' || tip.status === statusFilter
  );

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-96 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">Secure Tips Management</h1>
        <p className="text-gray-600 mb-4">
          Review and manage secure tips submitted by the community. All tips are encrypted and stored securely.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Privacy & Security</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• All tips are encrypted and stored securely</li>
            <li>• Anonymous submissions are protected</li>
            <li>• Contact information is optional</li>
            <li>• All actions are logged for audit</li>
          </ul>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tips List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Tips ({filteredTips.length})</h2>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-field"
              >
                <option value="all">All Status</option>
                <option value="RECEIVED">Received</option>
                <option value="TRIAGED">Triaged</option>
                <option value="ACTIONED">Actioned</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
          </div>

          <SecureTipList
            tips={filteredTips}
            onStatusChange={handleStatusChange}
            onViewTip={handleViewTip}
          />
        </div>

        {/* Tip Details */}
        <div className="lg:col-span-1">
          {selectedTip ? (
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Tip Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reference ID
                  </label>
                  <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                    {selectedTip.referenceId}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <span className={`badge ${
                    selectedTip.status === 'RECEIVED' ? 'badge-warning' :
                    selectedTip.status === 'TRIAGED' ? 'badge-info' :
                    selectedTip.status === 'ACTIONED' ? 'badge-success' :
                    'badge-secondary'
                  }`}>
                    {selectedTip.status}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Incident
                  </label>
                  <p className="text-sm">{selectedTip.incident || 'General tip'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact
                  </label>
                  <p className="text-sm">
                    {selectedTip.isAnonymous ? 'Anonymous' : (selectedTip.contact || 'Not provided')}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Received
                  </label>
                  <p className="text-sm">{selectedTip.createdAt.toLocaleString()}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tip Content
                  </label>
                  <div className="bg-gray-50 rounded p-3">
                    <p className="text-sm text-gray-700">{selectedTip.body}</p>
                  </div>
                </div>

                {selectedTip.attachments.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Attachments
                    </label>
                    <div className="space-y-2">
                      {selectedTip.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">📎</span>
                          <span className="text-sm">{attachment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">Actions</h4>
                  <div className="space-y-2">
                    <select
                      value={selectedTip.status}
                      onChange={(e) => handleStatusChange(selectedTip.id, e.target.value as SecureTip['status'])}
                      className="form-field w-full"
                    >
                      <option value="RECEIVED">Received</option>
                      <option value="TRIAGED">Triaged</option>
                      <option value="ACTIONED">Actioned</option>
                      <option value="CLOSED">Closed</option>
                    </select>
                    <button className="btn-primary w-full">
                      Add Note
                    </button>
                    <button className="btn-secondary w-full">
                      Export Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card p-6 text-center text-gray-500">
              <p>Select a tip to view details</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

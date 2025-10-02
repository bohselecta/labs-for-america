import React, { useState } from 'react';

export interface SecureTip {
  id: string;
  createdAt: Date;
  incident: string; // labId or incidentId
  contact?: string; // email/phone if provided
  body: string;
  attachments: string[];
  ipHash: string; // hashed IP or device fingerprint
  status: 'RECEIVED' | 'TRIAGED' | 'ACTIONED' | 'CLOSED';
  isAnonymous: boolean;
  referenceId: string;
}

export interface SecureTipFormProps {
  incidentId?: string;
  onSubmit: (tip: Omit<SecureTip, 'id' | 'createdAt' | 'referenceId'>) => Promise<string>;
}

export function SecureTipForm({ incidentId, onSubmit }: SecureTipFormProps) {
  const [formData, setFormData] = useState({
    incident: incidentId || '',
    contact: '',
    body: '',
    isAnonymous: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTipId, setSubmittedTipId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generate IP hash (in real app, use proper hashing)
      const ipHash = `hash_${Date.now()}_${Math.random()}`;
      
      const tipData = {
        incident: formData.incident,
        contact: formData.isAnonymous ? undefined : formData.contact,
        body: formData.body,
        attachments: [], // File upload would be implemented here
        ipHash,
        status: 'RECEIVED' as const,
        isAnonymous: formData.isAnonymous
      };

      const referenceId = await onSubmit(tipData);
      setSubmittedTipId(referenceId);
    } catch (error) {
      console.error('Failed to submit tip:', error);
      alert('Failed to submit tip. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedTipId) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-green-50 border border-green-200 rounded-lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-green-800 mb-2">Tip Received</h2>
          <p className="text-green-700 mb-4">
            Thank you. Your tip was received. Reference ID: <strong>{submittedTipId}</strong>
          </p>
          <p className="text-sm text-green-600 mb-6">
            If this is an emergency, call 911 immediately.
          </p>
          <button
            onClick={() => {
              setSubmittedTipId(null);
              setFormData({ incident: incidentId || '', contact: '', body: '', isAnonymous: false });
            }}
            className="bg-green-600 text-white px-6 py-2 rounded font-medium hover:bg-green-700 transition-colors"
          >
            Submit Another Tip
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">Submit a Secure Tip</h1>
        <p className="text-gray-600 mb-4">
          Share information securely and anonymously. All tips are encrypted and stored securely.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Privacy & Security</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Tips are encrypted and stored securely</li>
            <li>• Anonymous submissions are welcome</li>
            <li>• Your information is protected by law</li>
            <li>• Reference ID provided for follow-up</li>
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="incident" className="block text-sm font-medium text-gray-700 mb-2">
            Related Incident/Case (if known)
          </label>
          <input
            type="text"
            id="incident"
            value={formData.incident}
            onChange={(e) => setFormData({ ...formData, incident: e.target.value })}
            className="form-field"
            placeholder="Case number, incident ID, or description"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isAnonymous"
            checked={formData.isAnonymous}
            onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isAnonymous" className="ml-2 block text-sm text-gray-700">
            Submit anonymously (no contact information required)
          </label>
        </div>

        {!formData.isAnonymous && (
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
              Contact Information (Optional)
            </label>
            <input
              type="text"
              id="contact"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="form-field"
              placeholder="Email or phone number for follow-up"
            />
            <p className="text-xs text-gray-500 mt-1">
              Providing contact information allows us to follow up if needed
            </p>
          </div>
        )}

        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
            Tip Information *
          </label>
          <textarea
            id="body"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            className="form-field"
            rows={6}
            placeholder="Please provide as much detail as possible about what you observed or know..."
            required
          />
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">Important Reminders</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• If this is an emergency, call 911 immediately</li>
            <li>• Provide factual information only</li>
            <li>• Do not include speculation or rumors</li>
            <li>• Your tip will be reviewed by law enforcement</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting || !formData.body.trim()}
            className="btn-primary flex-1"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Secure Tip'}
          </button>
          <button
            type="button"
            onClick={() => setFormData({ incident: incidentId || '', contact: '', body: '', isAnonymous: false })}
            className="btn-secondary"
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}

export interface SecureTipListProps {
  tips: SecureTip[];
  onStatusChange: (tipId: string, status: SecureTip['status']) => void;
  onViewTip: (tipId: string) => void;
}

export function SecureTipList({ tips, onStatusChange, onViewTip }: SecureTipListProps) {
  const statusColors = {
    RECEIVED: 'bg-yellow-100 text-yellow-800',
    TRIAGED: 'bg-blue-100 text-blue-800',
    ACTIONED: 'bg-green-100 text-green-800',
    CLOSED: 'bg-gray-100 text-gray-800'
  };

  const statusLabels = {
    RECEIVED: 'Received',
    TRIAGED: 'Triaged',
    ACTIONED: 'Actioned',
    CLOSED: 'Closed'
  };

  return (
    <div className="space-y-4">
      {tips.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tips received</h3>
          <p className="text-gray-600">Secure tips will appear here when submitted.</p>
        </div>
      ) : (
        tips.map((tip) => (
          <div key={tip.id} className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`badge ${statusColors[tip.status]}`}>
                    {statusLabels[tip.status]}
                  </span>
                  <span className="text-sm text-gray-500">
                    Reference: {tip.referenceId}
                  </span>
                  {tip.isAnonymous && (
                    <span className="badge badge-secondary">Anonymous</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Incident: {tip.incident || 'General tip'}
                </p>
                <p className="text-sm text-gray-500">
                  Received: {tip.createdAt.toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onViewTip(tip.id)}
                  className="btn-secondary text-sm px-3 py-1"
                >
                  View Details
                </button>
                <select
                  value={tip.status}
                  onChange={(e) => onStatusChange(tip.id, e.target.value as SecureTip['status'])}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value="RECEIVED">Received</option>
                  <option value="TRIAGED">Triaged</option>
                  <option value="ACTIONED">Actioned</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded p-3">
              <p className="text-sm text-gray-700 line-clamp-3">
                {tip.body}
              </p>
            </div>
            
            {tip.contact && (
              <div className="mt-3 text-sm text-gray-600">
                <strong>Contact:</strong> {tip.contact}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

import React, { useState } from 'react';

export interface IntakeSubmission {
  id: string;
  labId: string;
  contact?: string; // email/phone if consented
  consent: boolean;
  category: string;
  body: string;
  createdAt: Date;
  status: 'new' | 'reviewed' | 'followed-up' | 'closed';
  assignedTo?: string;
  notes?: string;
}

export interface CommunityIntakeProps {
  labId: string;
  submissions: IntakeSubmission[];
  onSubmit: (submission: Omit<IntakeSubmission, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  onUpdateStatus: (submissionId: string, status: IntakeSubmission['status']) => Promise<void>;
  onAssignTo: (submissionId: string, assignedTo: string) => Promise<void>;
  isAdmin?: boolean;
}

export function CommunityIntake({ 
  labId, 
  submissions, 
  onSubmit, 
  onUpdateStatus,
  onAssignTo,
  isAdmin = false
}: CommunityIntakeProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<IntakeSubmission | null>(null);

  const categories = [
    { value: 'access', label: 'Access to Care', description: 'Barriers to accessing health services' },
    { value: 'cost', label: 'Cost & Affordability', description: 'Financial barriers to healthcare' },
    { value: 'language', label: 'Language Support', description: 'Language barriers and translation needs' },
    { value: 'transport', label: 'Transportation', description: 'Transportation barriers to healthcare' },
    { value: 'awareness', label: 'Health Awareness', description: 'Need for health education and awareness' },
    { value: 'quality', label: 'Service Quality', description: 'Quality of care and service delivery' },
    { value: 'other', label: 'Other', description: 'Other health-related concerns' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      
      const submission = await onSubmit({
        labId,
        contact: formData.get('contact') as string || undefined,
        consent: formData.get('consent') === 'on',
        category: formData.get('category') as string,
        body: formData.get('body') as string
      });

      setSubmittedId(submission.id);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Failed to submit intake:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryLabel = (value: string) => {
    return categories.find(cat => cat.value === value)?.label || value;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'badge-warning';
      case 'reviewed': return 'badge-info';
      case 'followed-up': return 'badge-success';
      case 'closed': return 'badge-secondary';
      default: return 'badge-secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'New';
      case 'reviewed': return 'Reviewed';
      case 'followed-up': return 'Followed Up';
      case 'closed': return 'Closed';
      default: return status;
    }
  };

  if (submittedId) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-green-50 border border-green-200 rounded-lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-green-800 mb-2">Thank You</h2>
          <p className="text-green-700 mb-4">
            Your story has been received. Our team will review it and may follow up if you provided contact information.
          </p>
          <p className="text-sm text-green-600 mb-6">
            <strong>Important:</strong> This is not a substitute for medical care. For emergencies, call 911.
          </p>
          <button
            onClick={() => {
              setSubmittedId(null);
            }}
            className="bg-green-600 text-white px-6 py-2 rounded font-medium hover:bg-green-700 transition-colors"
          >
            Submit Another Story
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">Share Your Health Story</h1>
        <p className="text-gray-600 mb-4">
          Help us understand community health needs by sharing your experiences. Your input helps us design better resources and programs.
        </p>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
          <p className="text-sm text-yellow-700 mb-2">
            <strong>HealthLabs is for community input and resource design. It does not provide medical advice.</strong>
          </p>
          <p className="text-sm text-yellow-700">
            For emergencies, call 911. For medical advice, consult your healthcare provider.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Intake Form */}
        <div>
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Tell Us Your Story</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-field"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label} - {category.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Story *
                </label>
                <textarea
                  id="body"
                  name="body"
                  className="form-field"
                  rows={6}
                  placeholder="Share your experience with healthcare access, barriers you've faced, or suggestions for improvement..."
                  required
                />
              </div>

              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Information (Optional)
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  className="form-field"
                  placeholder="Email or phone number for follow-up"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Providing contact information allows us to follow up if needed
                </p>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="consent" className="text-sm text-gray-700">
                  I consent to being contacted for follow-up regarding my submission. 
                  I understand this is not a substitute for medical care.
                </label>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Privacy & Data Use</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Your information is stored securely and privately</li>
                  <li>• Personal details are only shared with your consent</li>
                  <li>• Data helps improve community health programs</li>
                  <li>• You can request data deletion at any time</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex-1"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Story'}
                </button>
                <button
                  type="button"
                  onClick={() => (document.getElementById('intake-form') as HTMLFormElement)?.reset()}
                  className="btn-secondary"
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Admin Panel */}
        {isAdmin && (
          <div>
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Intake Management</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-lg font-bold text-gray-900">
                      {submissions.filter(s => s.status === 'new').length}
                    </div>
                    <div className="text-gray-600">New</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-lg font-bold text-gray-900">
                      {submissions.filter(s => s.status === 'reviewed').length}
                    </div>
                    <div className="text-gray-600">Reviewed</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">Recent Submissions</h3>
                  {submissions.slice(0, 5).map((submission) => (
                    <div key={submission.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          {getCategoryLabel(submission.category)}
                        </span>
                        <span className={`badge ${getStatusColor(submission.status)}`}>
                          {getStatusLabel(submission.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {submission.body}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{submission.createdAt.toLocaleDateString()}</span>
                        <button
                          onClick={() => setSelectedSubmission(submission)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submission Details Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Submission Details</h2>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <p className="text-sm">{getCategoryLabel(selectedSubmission.category)}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <span className={`badge ${getStatusColor(selectedSubmission.status)}`}>
                    {getStatusLabel(selectedSubmission.status)}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Story
                  </label>
                  <div className="bg-gray-50 rounded p-3">
                    <p className="text-sm text-gray-700">{selectedSubmission.body}</p>
                  </div>
                </div>

                {selectedSubmission.contact && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact
                    </label>
                    <p className="text-sm">{selectedSubmission.contact}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Submitted
                  </label>
                  <p className="text-sm">{selectedSubmission.createdAt.toLocaleString()}</p>
                </div>

                {isAdmin && (
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">Admin Actions</h4>
                    <div className="space-y-2">
                      <select
                        value={selectedSubmission.status}
                        onChange={(e) => onUpdateStatus(selectedSubmission.id, e.target.value as any)}
                        className="form-field"
                      >
                        <option value="new">New</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="followed-up">Followed Up</option>
                        <option value="closed">Closed</option>
                      </select>
                      <button className="btn-primary w-full">
                        Add Notes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

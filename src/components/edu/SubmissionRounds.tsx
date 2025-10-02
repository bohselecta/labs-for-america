import React, { useState } from 'react';

export interface SubmissionRound {
  id: string;
  labId: string;
  name: string;
  opensISO: string;
  closesISO: string;
  required: string[];
  description: string;
  order: number;
}

export interface Submission {
  id: string;
  teamId: string;
  roundId: string;
  title: string;
  links: string[];
  files: string[];
  notes: string;
  createdAt: Date;
  isResubmission: boolean;
}

export interface SubmissionRoundsProps {
  labId: string;
  rounds: SubmissionRound[];
  submissions: Submission[];
  teams: Array<{ id: string; name: string }>;
  currentTeamId?: string;
  onSubmit: (submission: Omit<Submission, 'id' | 'createdAt'>) => Promise<void>;
  onEditSubmission: (submissionId: string, updates: Partial<Submission>) => Promise<void>;
}

export function SubmissionRounds({ 
  labId, 
  rounds, 
  submissions, 
  teams, 
  currentTeamId,
  onSubmit, 
  onEditSubmission 
}: SubmissionRoundsProps) {
  const [selectedRound, setSelectedRound] = useState<SubmissionRound | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCurrentRound = () => {
    const now = new Date();
    return rounds.find(round => {
      const opens = new Date(round.opensISO);
      const closes = new Date(round.closesISO);
      return now >= opens && now <= closes;
    });
  };

  const getRoundStatus = (round: SubmissionRound) => {
    const now = new Date();
    const opens = new Date(round.opensISO);
    const closes = new Date(round.closesISO);

    if (now < opens) return 'upcoming';
    if (now > closes) return 'closed';
    return 'open';
  };

  const getTeamSubmission = (roundId: string) => {
    if (!currentTeamId) return null;
    return submissions.find(sub => sub.roundId === roundId && sub.teamId === currentTeamId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRound || !currentTeamId) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      
      await onSubmit({
        teamId: currentTeamId,
        roundId: selectedRound.id,
        title: formData.get('title') as string,
        links: (formData.get('links') as string).split('\n').filter(link => link.trim()),
        files: [], // File upload would be implemented here
        notes: formData.get('notes') as string,
        isResubmission: !!getTeamSubmission(selectedRound.id)
      });

      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Failed to submit:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentRound = getCurrentRound();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">Submission Rounds</h1>
        <p className="text-gray-600 mb-4">
          Submit your work for each round of this Lab. Each round has specific requirements and deadlines.
        </p>
        
        {currentRound && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
              <span className="font-semibold text-green-800">Current Round Active</span>
            </div>
            <p className="text-green-700">
              <strong>{currentRound.name}</strong> is currently open for submissions.
            </p>
            <p className="text-sm text-green-600">
              Closes: {new Date(currentRound.closesISO).toLocaleString()}
            </p>
          </div>
        )}
      </div>

      {/* Rounds Overview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Submission Timeline</h2>
        <div className="space-y-4">
          {rounds.map((round) => {
            const status = getRoundStatus(round);
            const teamSubmission = getTeamSubmission(round.id);
            
            return (
              <div key={round.id} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{round.name}</h3>
                    <p className="text-gray-600 text-sm">{round.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`badge ${
                      status === 'open' ? 'badge-success' :
                      status === 'upcoming' ? 'badge-warning' :
                      'badge-secondary'
                    }`}>
                      {status === 'open' ? 'Open' :
                       status === 'upcoming' ? 'Upcoming' :
                       'Closed'}
                    </span>
                    {teamSubmission && (
                      <span className="badge badge-info">Submitted</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <strong>Opens:</strong> {new Date(round.opensISO).toLocaleString()}
                  </div>
                  <div>
                    <strong>Closes:</strong> {new Date(round.closesISO).toLocaleString()}
                  </div>
                </div>

                {round.required.length > 0 && (
                  <div className="mb-4">
                    <strong>Required:</strong>
                    <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                      {round.required.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {status === 'open' && currentTeamId && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedRound(round)}
                      className="btn-primary"
                    >
                      {teamSubmission ? 'Resubmit' : 'Submit'}
                    </button>
                    {teamSubmission && (
                      <button
                        onClick={() => setSelectedRound(round)}
                        className="btn-secondary"
                      >
                        View Submission
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Submission Form Modal */}
      {selectedRound && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  Submit for {selectedRound.name}
                </h2>
                <button
                  onClick={() => setSelectedRound(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Submission Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-field"
                    placeholder="Enter submission title"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="links" className="block text-sm font-medium text-gray-700 mb-2">
                    Links (one per line)
                  </label>
                  <textarea
                    id="links"
                    name="links"
                    className="form-field"
                    rows={4}
                    placeholder="https://example.com&#10;https://github.com/username/repo"
                  />
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    className="form-field"
                    rows={4}
                    placeholder="Describe your submission, key features, or any additional information"
                  />
                </div>

                {selectedRound.required.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Required Elements</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      {selectedRound.required.map((req, index) => (
                        <li key={index}>• {req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Academic Integrity</h4>
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="integrity"
                      required
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                    />
                    <label htmlFor="integrity" className="text-sm text-yellow-700">
                      By submitting, you confirm this is original work with proper attribution. 
                      You agree to the chosen license terms for public reuse.
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-primary"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setSelectedRound(null)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

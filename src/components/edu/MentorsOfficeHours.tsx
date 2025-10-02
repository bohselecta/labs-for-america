import React, { useState } from 'react';

export interface Mentor {
  id: string;
  name: string;
  email: string;
  expertise: string[];
  bio: string;
  avatar?: string;
  isAvailable: boolean;
}

export interface OfficeHoursSlot {
  id: string;
  mentorId: string;
  startTime: Date;
  endTime: Date;
  isBooked: boolean;
  bookedBy?: string;
  bookedTeamId?: string;
  notes?: string;
}

export interface OfficeHoursRequest {
  id: string;
  slotId: string;
  teamId: string;
  teamName: string;
  requestNotes: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

export interface MentorsOfficeHoursProps {
  labId: string;
  mentors: Mentor[];
  officeHoursSlots: OfficeHoursSlot[];
  requests: OfficeHoursRequest[];
  currentTeamId?: string;
  onRequestSlot: (slotId: string, teamId: string, notes: string) => Promise<void>;
  onApproveRequest: (requestId: string) => Promise<void>;
  onRejectRequest: (requestId: string) => Promise<void>;
  isMentor?: boolean;
}

export function MentorsOfficeHours({ 
  labId, 
  mentors, 
  officeHoursSlots, 
  requests,
  currentTeamId,
  onRequestSlot,
  onApproveRequest,
  onRejectRequest,
  isMentor = false
}: MentorsOfficeHoursProps) {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [requestNotes, setRequestNotes] = useState('');

  const getMentorSlots = (mentorId: string) => {
    return officeHoursSlots.filter(slot => slot.mentorId === mentorId);
  };

  const getSlotRequest = (slotId: string) => {
    return requests.find(req => req.slotId === slotId);
  };

  const handleRequestSlot = async (slotId: string) => {
    if (!currentTeamId) return;

    try {
      await onRequestSlot(slotId, currentTeamId, requestNotes);
      setRequestNotes('');
    } catch (error) {
      console.error('Failed to request slot:', error);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">Mentors & Office Hours</h1>
        <p className="text-gray-600 mb-4">
          Connect with mentors for guidance and support. Book office hours slots to get personalized help with your project.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">How Office Hours Work</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Request a time slot with a mentor</li>
            <li>• Mentors will approve or reject requests</li>
            <li>• Approved requests receive calendar invites</li>
            <li>• Bring specific questions or challenges</li>
          </ul>
        </div>
      </div>

      {/* Mentors List */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Available Mentors</h2>
        
        {mentors.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No mentors available</h3>
            <p className="text-gray-600">Check back later for mentor availability.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-blue-600">
                      {mentor.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{mentor.name}</h3>
                    <span className={`badge ${
                      mentor.isAvailable ? 'badge-success' : 'badge-secondary'
                    }`}>
                      {mentor.isAvailable ? 'Available' : 'Busy'}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {mentor.bio}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Expertise</h4>
                  <div className="flex flex-wrap gap-1">
                    {mentor.expertise.map((skill) => (
                      <span key={skill} className="badge badge-info text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedMentor(mentor)}
                  className="btn-primary w-full"
                  disabled={!mentor.isAvailable}
                >
                  {mentor.isAvailable ? 'View Office Hours' : 'Not Available'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Office Hours Slots Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">{selectedMentor.name}'s Office Hours</h2>
                  <p className="text-gray-600">{selectedMentor.bio}</p>
                </div>
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Available Slots */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
                  <div className="space-y-3">
                    {getMentorSlots(selectedMentor.id)
                      .filter(slot => !slot.isBooked)
                      .map((slot) => {
                        const request = getSlotRequest(slot.id);
                        const isRequested = request && request.status === 'pending';
                        
                        return (
                          <div key={slot.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">
                                {formatTime(slot.startTime)}
                              </span>
                              <span className="text-sm text-gray-500">
                                {Math.round((slot.endTime.getTime() - slot.startTime.getTime()) / (1000 * 60))} min
                              </span>
                            </div>
                            
                            {isRequested ? (
                              <span className="badge badge-warning">Requested</span>
                            ) : (
                              <button
                                onClick={() => handleRequestSlot(slot.id)}
                                className="btn-primary text-sm px-3 py-1"
                                disabled={!currentTeamId}
                              >
                                Request Slot
                              </button>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Request Form */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Request Notes</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="requestNotes" className="block text-sm font-medium text-gray-700 mb-2">
                        What would you like to discuss?
                      </label>
                      <textarea
                        id="requestNotes"
                        value={requestNotes}
                        onChange={(e) => setRequestNotes(e.target.value)}
                        className="form-field"
                        rows={4}
                        placeholder="Describe your questions, challenges, or what you'd like help with..."
                      />
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Tips for Effective Office Hours</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Come prepared with specific questions</li>
                        <li>• Share your project context and challenges</li>
                        <li>• Be ready to discuss your team's progress</li>
                        <li>• Ask for feedback on your approach</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mentor Admin Panel */}
      {isMentor && (
        <div className="mt-8 card p-6">
          <h2 className="text-xl font-semibold mb-4">Mentor Dashboard</h2>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Pending Requests</h3>
            {requests.filter(req => req.status === 'pending').length === 0 ? (
              <p className="text-gray-500">No pending requests</p>
            ) : (
              <div className="space-y-3">
                {requests
                  .filter(req => req.status === 'pending')
                  .map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-medium">{request.teamName}</span>
                          <span className="text-sm text-gray-500 ml-2">
                            {formatTime(officeHoursSlots.find(slot => slot.id === request.slotId)?.startTime || new Date())}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => onApproveRequest(request.id)}
                            className="btn-success text-sm px-3 py-1"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => onRejectRequest(request.id)}
                            className="btn-danger text-sm px-3 py-1"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{request.requestNotes}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

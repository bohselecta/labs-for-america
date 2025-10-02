import React, { useState } from 'react';

export interface Team {
  id: string;
  labId: string;
  name: string;
  members: string[]; // userIds
  mentors: string[]; // userIds
  createdAt: Date;
  description?: string;
  isPrivate: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'mentor' | 'organizer';
  avatar?: string;
}

export interface TeamWorkspaceProps {
  labId: string;
  teams: Team[];
  members: TeamMember[];
  onCreateTeam: (team: Omit<Team, 'id' | 'createdAt'>) => Promise<void>;
  onJoinTeam: (teamId: string, userId: string) => Promise<void>;
  onLeaveTeam: (teamId: string, userId: string) => Promise<void>;
  currentUserId: string;
}

export function TeamWorkspace({ 
  labId, 
  teams, 
  members, 
  onCreateTeam, 
  onJoinTeam, 
  onLeaveTeam, 
  currentUserId 
}: TeamWorkspaceProps) {
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDescription, setNewTeamDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;

    try {
      await onCreateTeam({
        labId,
        name: newTeamName.trim(),
        members: [currentUserId],
        mentors: [],
        description: newTeamDescription.trim(),
        isPrivate
      });
      
      setNewTeamName('');
      setNewTeamDescription('');
      setIsPrivate(false);
      setIsCreatingTeam(false);
    } catch (error) {
      console.error('Failed to create team:', error);
    }
  };

  const getMemberName = (userId: string) => {
    const member = members.find(m => m.id === userId);
    return member?.name || 'Unknown User';
  };

  const getMemberRole = (userId: string) => {
    const member = members.find(m => m.id === userId);
    return member?.role || 'student';
  };

  const isUserInTeam = (team: Team) => {
    return team.members.includes(currentUserId) || team.mentors.includes(currentUserId);
  };

  const canJoinTeam = (team: Team) => {
    return !isUserInTeam(team) && team.members.length < 6; // Max 6 members
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">Team Workspaces</h1>
        <p className="text-gray-600 mb-4">
          Join a team or create your own to collaborate on this Lab. Teams can work together on submissions and share resources.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">How Teams Work</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Teams can have up to 6 members</li>
            <li>• Each team can have mentors assigned</li>
            <li>• Teams can submit collaborative work</li>
            <li>• Private teams are only visible to members</li>
          </ul>
        </div>
      </div>

      {/* Create Team Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Create a New Team</h2>
          <button
            onClick={() => setIsCreatingTeam(!isCreatingTeam)}
            className="btn-primary"
          >
            {isCreatingTeam ? 'Cancel' : 'Create Team'}
          </button>
        </div>

        {isCreatingTeam && (
          <div className="card p-6">
            <form onSubmit={handleCreateTeam} className="space-y-4">
              <div>
                <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-2">
                  Team Name *
                </label>
                <input
                  type="text"
                  id="teamName"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="form-field"
                  placeholder="Enter team name"
                  required
                />
              </div>

              <div>
                <label htmlFor="teamDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Team Description
                </label>
                <textarea
                  id="teamDescription"
                  value={newTeamDescription}
                  onChange={(e) => setNewTeamDescription(e.target.value)}
                  className="form-field"
                  rows={3}
                  placeholder="Describe your team's focus or goals"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPrivate"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isPrivate" className="ml-2 block text-sm text-gray-700">
                  Private team (only visible to members)
                </label>
              </div>

              <div className="flex gap-3">
                <button type="submit" className="btn-primary">
                  Create Team
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsCreatingTeam(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Teams List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Teams</h2>
        
        {teams.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No teams yet</h3>
            <p className="text-gray-600 mb-4">Be the first to create a team for this Lab!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <div key={team.id} className="card p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{team.name}</h3>
                  {team.isPrivate && (
                    <span className="badge badge-secondary">Private</span>
                  )}
                </div>

                {team.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {team.description}
                  </p>
                )}

                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-600">
                    <strong>Members:</strong> {team.members.length}/6
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Mentors:</strong> {team.mentors.length}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Team Members</h4>
                  <div className="space-y-1">
                    {team.members.slice(0, 3).map((memberId) => (
                      <div key={memberId} className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-blue-600">
                            {getMemberName(memberId).charAt(0)}
                          </span>
                        </div>
                        <span className="text-gray-700">{getMemberName(memberId)}</span>
                        <span className="badge badge-info text-xs">
                          {getMemberRole(memberId)}
                        </span>
                      </div>
                    ))}
                    {team.members.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{team.members.length - 3} more members
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  {isUserInTeam(team) ? (
                    <button
                      onClick={() => onLeaveTeam(team.id, currentUserId)}
                      className="btn-danger text-sm px-3 py-1"
                    >
                      Leave Team
                    </button>
                  ) : canJoinTeam(team) ? (
                    <button
                      onClick={() => onJoinTeam(team.id, currentUserId)}
                      className="btn-primary text-sm px-3 py-1"
                    >
                      Join Team
                    </button>
                  ) : (
                    <span className="text-sm text-gray-500">Team Full</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

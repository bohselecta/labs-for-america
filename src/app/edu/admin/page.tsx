"use client";
import { useState, useEffect } from 'react';
import { TeamWorkspace } from '@/components/edu/TeamWorkspace';
import { SubmissionRounds } from '@/components/edu/SubmissionRounds';
import { MentorsOfficeHours } from '@/components/edu/MentorsOfficeHours';
import { RubricsJudging } from '@/components/edu/RubricsJudging';
import { Team, TeamMember, SubmissionRound, Submission, Mentor, OfficeHoursSlot, OfficeHoursRequest, Rubric, Score } from '@/components/edu/TeamWorkspace';

export default function EduLabsAdmin() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demo
  const [teams, setTeams] = useState<Team[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [rounds, setRounds] = useState<SubmissionRound[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [officeHoursSlots, setOfficeHoursSlots] = useState<OfficeHoursSlot[]>([]);
  const [requests, setRequests] = useState<OfficeHoursRequest[]>([]);
  const [rubrics, setRubrics] = useState<Rubric[]>([]);
  const [scores, setScores] = useState<Score[]>([]);
  const [judges, setJudges] = useState<Array<{ id: string; name: string; email: string }>>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data
        setTeams([
          {
            id: 'team-1',
            labId: 'ai-education-challenge',
            name: 'AI Innovators',
            members: ['user-1', 'user-2', 'user-3'],
            mentors: ['mentor-1'],
            createdAt: new Date('2024-12-01'),
            description: 'Focused on AI applications in education',
            isPrivate: false
          },
          {
            id: 'team-2',
            labId: 'ai-education-challenge',
            name: 'EduTech Solutions',
            members: ['user-4', 'user-5'],
            mentors: ['mentor-2'],
            createdAt: new Date('2024-12-02'),
            description: 'Building educational technology solutions',
            isPrivate: false
          }
        ]);

        setMembers([
          { id: 'user-1', name: 'Alice Johnson', email: 'alice@university.edu', role: 'student' },
          { id: 'user-2', name: 'Bob Smith', email: 'bob@university.edu', role: 'student' },
          { id: 'user-3', name: 'Carol Davis', email: 'carol@university.edu', role: 'student' },
          { id: 'user-4', name: 'David Wilson', email: 'david@university.edu', role: 'student' },
          { id: 'user-5', name: 'Eva Brown', email: 'eva@university.edu', role: 'student' },
          { id: 'mentor-1', name: 'Dr. Sarah Chen', email: 'sarah@university.edu', role: 'mentor' },
          { id: 'mentor-2', name: 'Prof. Mike Rodriguez', email: 'mike@university.edu', role: 'mentor' }
        ]);

        setRounds([
          {
            id: 'round-1',
            labId: 'ai-education-challenge',
            name: 'Idea Submission',
            opensISO: '2024-12-01T00:00:00Z',
            closesISO: '2024-12-15T23:59:59Z',
            required: ['Project concept', 'Target audience', 'Technology stack'],
            description: 'Submit your initial project idea and concept',
            order: 1
          },
          {
            id: 'round-2',
            labId: 'ai-education-challenge',
            name: 'Prototype Demo',
            opensISO: '2024-12-16T00:00:00Z',
            closesISO: '2025-01-15T23:59:59Z',
            required: ['Working prototype', 'Demo video', 'Technical documentation'],
            description: 'Submit a working prototype with demonstration',
            order: 2
          },
          {
            id: 'round-3',
            labId: 'ai-education-challenge',
            name: 'Final Submission',
            opensISO: '2025-01-16T00:00:00Z',
            closesISO: '2025-02-15T23:59:59Z',
            required: ['Final product', 'User testing results', 'Deployment guide'],
            description: 'Submit final product with complete documentation',
            order: 3
          }
        ]);

        setMentors([
          {
            id: 'mentor-1',
            name: 'Dr. Sarah Chen',
            email: 'sarah@university.edu',
            expertise: ['AI/ML', 'Education Technology', 'User Experience'],
            bio: 'Professor of Computer Science with expertise in AI applications in education',
            isAvailable: true
          },
          {
            id: 'mentor-2',
            name: 'Prof. Mike Rodriguez',
            email: 'mike@university.edu',
            expertise: ['Software Engineering', 'Project Management', 'Innovation'],
            bio: 'Industry veteran with 15+ years in tech startups and education',
            isAvailable: true
          }
        ]);

        setRubrics([
          {
            id: 'rubric-1',
            labId: 'ai-education-challenge',
            name: 'AI Education Challenge Rubric',
            criteria: [
              {
                name: 'Innovation',
                weight: 1.5,
                description: 'How innovative and creative is the solution?',
                maxScore: 10
              },
              {
                name: 'Technical Quality',
                weight: 2.0,
                description: 'How well is the solution implemented technically?',
                maxScore: 10
              },
              {
                name: 'Educational Impact',
                weight: 1.8,
                description: 'How much impact will this have on education?',
                maxScore: 10
              },
              {
                name: 'User Experience',
                weight: 1.2,
                description: 'How user-friendly and accessible is the solution?',
                maxScore: 10
              }
            ],
            createdAt: new Date('2024-12-01')
          }
        ]);

        setJudges([
          { id: 'judge-1', name: 'Dr. Sarah Chen', email: 'sarah@university.edu' },
          { id: 'judge-2', name: 'Prof. Mike Rodriguez', email: 'mike@university.edu' },
          { id: 'judge-3', name: 'Dr. Lisa Wang', email: 'lisa@university.edu' }
        ]);

      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCreateTeam = async (teamData: Omit<Team, 'id' | 'createdAt'>) => {
    const newTeam: Team = {
      ...teamData,
      id: `team-${Date.now()}`,
      createdAt: new Date()
    };
    setTeams([...teams, newTeam]);
  };

  const handleJoinTeam = async (teamId: string, userId: string) => {
    setTeams(teams.map(team => 
      team.id === teamId 
        ? { ...team, members: [...team.members, userId] }
        : team
    ));
  };

  const handleLeaveTeam = async (teamId: string, userId: string) => {
    setTeams(teams.map(team => 
      team.id === teamId 
        ? { ...team, members: team.members.filter(id => id !== userId) }
        : team
    ));
  };

  const handleSubmit = async (submissionData: Omit<Submission, 'id' | 'createdAt'>) => {
    const newSubmission: Submission = {
      ...submissionData,
      id: `submission-${Date.now()}`,
      createdAt: new Date()
    };
    setSubmissions([...submissions, newSubmission]);
  };

  const handleEditSubmission = async (submissionId: string, updates: Partial<Submission>) => {
    setSubmissions(submissions.map(sub => 
      sub.id === submissionId ? { ...sub, ...updates } : sub
    ));
  };

  const handleRequestSlot = async (slotId: string, teamId: string, notes: string) => {
    const newRequest: OfficeHoursRequest = {
      id: `request-${Date.now()}`,
      slotId,
      teamId,
      teamName: teams.find(t => t.id === teamId)?.name || 'Unknown Team',
      requestNotes: notes,
      status: 'pending',
      createdAt: new Date()
    };
    setRequests([...requests, newRequest]);
  };

  const handleApproveRequest = async (requestId: string) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: 'approved' } : req
    ));
  };

  const handleRejectRequest = async (requestId: string) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: 'rejected' } : req
    ));
  };

  const handleCreateRubric = async (rubricData: Omit<Rubric, 'id' | 'createdAt'>) => {
    const newRubric: Rubric = {
      ...rubricData,
      id: `rubric-${Date.now()}`,
      createdAt: new Date()
    };
    setRubrics([...rubrics, newRubric]);
  };

  const handleScoreSubmission = async (scoreData: Omit<Score, 'id' | 'createdAt'>) => {
    const newScore: Score = {
      ...scoreData,
      id: `score-${Date.now()}`,
      createdAt: new Date()
    };
    setScores([...scores, newScore]);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'teams', label: 'Teams', icon: '👥' },
    { id: 'rounds', label: 'Rounds', icon: '📝' },
    { id: 'mentors', label: 'Mentors', icon: '🎓' },
    { id: 'rubrics', label: 'Rubrics', icon: '📋' }
  ];

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-96 bg-gray-200 rounded mb-8"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">EduLabs Admin Dashboard</h1>
        <p className="text-gray-600 mb-4">
          Manage teams, submission rounds, mentors, and rubrics for your educational Labs.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">{teams.length}</div>
              <div className="text-sm text-gray-600">Active Teams</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">{members.length}</div>
              <div className="text-sm text-gray-600">Total Students</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">{rounds.length}</div>
              <div className="text-sm text-gray-600">Submission Rounds</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">{mentors.length}</div>
              <div className="text-sm text-gray-600">Available Mentors</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">New team "AI Innovators" created</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Submission round "Idea Submission" opened</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Mentor Dr. Sarah Chen added office hours</span>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('teams')}
                  className="btn-primary w-full"
                >
                  Manage Teams
                </button>
                <button
                  onClick={() => setActiveTab('rounds')}
                  className="btn-secondary w-full"
                >
                  View Submissions
                </button>
                <button
                  onClick={() => setActiveTab('mentors')}
                  className="btn-secondary w-full"
                >
                  Mentor Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('rubrics')}
                  className="btn-secondary w-full"
                >
                  Create Rubric
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'teams' && (
        <TeamWorkspace
          labId="ai-education-challenge"
          teams={teams}
          members={members}
          onCreateTeam={handleCreateTeam}
          onJoinTeam={handleJoinTeam}
          onLeaveTeam={handleLeaveTeam}
          currentUserId="admin-user"
        />
      )}

      {activeTab === 'rounds' && (
        <SubmissionRounds
          labId="ai-education-challenge"
          rounds={rounds}
          submissions={submissions}
          teams={teams.map(t => ({ id: t.id, name: t.name }))}
          currentTeamId="team-1"
          onSubmit={handleSubmit}
          onEditSubmission={handleEditSubmission}
        />
      )}

      {activeTab === 'mentors' && (
        <MentorsOfficeHours
          labId="ai-education-challenge"
          mentors={mentors}
          officeHoursSlots={officeHoursSlots}
          requests={requests}
          currentTeamId="team-1"
          onRequestSlot={handleRequestSlot}
          onApproveRequest={handleApproveRequest}
          onRejectRequest={handleRejectRequest}
          isMentor={true}
        />
      )}

      {activeTab === 'rubrics' && (
        <RubricsJudging
          labId="ai-education-challenge"
          rubrics={rubrics}
          submissions={submissions}
          scores={scores}
          judges={judges}
          currentJudgeId="judge-1"
          onCreateRubric={handleCreateRubric}
          onScoreSubmission={handleScoreSubmission}
          isOrganizer={true}
        />
      )}
    </main>
  );
}

"use client";
import { useState, useEffect } from 'react';
import { ProgramTypes } from '@/components/health/ProgramTypes';
import { ResourceLibrary } from '@/components/health/ResourceLibrary';
import { CommunityIntake } from '@/components/health/CommunityIntake';
import { HealthProgram, HealthResource, IntakeSubmission } from '@/components/health/ProgramTypes';

export default function HealthLabsAdmin() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demo
  const [programs, setPrograms] = useState<HealthProgram[]>([]);
  const [resources, setResources] = useState<HealthResource[]>([]);
  const [intakeSubmissions, setIntakeSubmissions] = useState<IntakeSubmission[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data
        setPrograms([
          {
            id: 'program-1',
            type: 'outreach',
            title: 'Community Health Outreach',
            description: 'Connect with communities to understand health needs and provide resources.',
            status: 'active',
            startDate: new Date('2024-12-01'),
            endDate: new Date('2025-03-15'),
            participants: 25,
            resources: 12
          },
          {
            id: 'program-2',
            type: 'resource-design',
            title: 'Mental Health Resource Design',
            description: 'Create and improve mental health resources for community use.',
            status: 'active',
            startDate: new Date('2024-12-01'),
            endDate: new Date('2025-02-28'),
            participants: 18,
            resources: 8
          },
          {
            id: 'program-3',
            type: 'data-challenge',
            title: 'Health Data Analysis Challenge',
            description: 'Analyze community health data to identify patterns and opportunities.',
            status: 'upcoming',
            startDate: new Date('2025-01-01'),
            endDate: new Date('2025-04-01'),
            participants: 0,
            resources: 0
          }
        ]);

        setResources([
          {
            id: 'resource-1',
            labId: 'program-1',
            title: 'Health Access Guide',
            url: '/resources/health-access-guide.pdf',
            lang: 'en',
            readingLevel: 'adult',
            tags: ['access', 'guide', 'healthcare'],
            description: 'Comprehensive guide to accessing healthcare services in your community.',
            fileType: 'pdf',
            fileSize: 2048576,
            uploadedAt: new Date('2024-12-01'),
            uploadedBy: 'admin',
            isPublic: true
          },
          {
            id: 'resource-2',
            labId: 'program-1',
            title: 'Guía de Acceso a la Salud',
            url: '/resources/health-access-guide-es.pdf',
            lang: 'es',
            readingLevel: 'adult',
            tags: ['access', 'guide', 'healthcare', 'translation'],
            description: 'Guía completa para acceder a servicios de salud en su comunidad.',
            fileType: 'pdf',
            fileSize: 2048576,
            uploadedAt: new Date('2024-12-01'),
            uploadedBy: 'admin',
            isPublic: true
          },
          {
            id: 'resource-3',
            labId: 'program-2',
            title: 'Mental Health Resources',
            url: '/resources/mental-health-resources.pdf',
            lang: 'en',
            readingLevel: 'adult',
            tags: ['mental-health', 'resources', 'support'],
            description: 'Collection of mental health resources and support information.',
            fileType: 'pdf',
            fileSize: 1536000,
            uploadedAt: new Date('2024-12-02'),
            uploadedBy: 'admin',
            isPublic: true
          }
        ]);

        setIntakeSubmissions([
          {
            id: 'intake-1',
            labId: 'program-1',
            contact: 'user@example.com',
            consent: true,
            category: 'access',
            body: 'I have difficulty accessing healthcare due to transportation barriers. I live in a rural area and don\'t have reliable transportation to get to medical appointments.',
            createdAt: new Date('2024-12-10'),
            status: 'new',
            assignedTo: undefined,
            notes: undefined
          },
          {
            id: 'intake-2',
            labId: 'program-1',
            contact: undefined,
            consent: false,
            category: 'language',
            body: 'My family needs health information in Spanish. Many of the health materials are only available in English, which makes it difficult for us to understand our health options.',
            createdAt: new Date('2024-12-09'),
            status: 'reviewed',
            assignedTo: 'admin',
            notes: 'Translation needed for health materials'
          },
          {
            id: 'intake-3',
            labId: 'program-2',
            contact: 'user2@example.com',
            consent: true,
            category: 'cost',
            body: 'The cost of mental health services is a major barrier for my family. We need more affordable options for counseling and therapy.',
            createdAt: new Date('2024-12-08'),
            status: 'followed-up',
            assignedTo: 'admin',
            notes: 'Referred to low-cost counseling services'
          }
        ]);

      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCreateProgram = async (programData: Omit<HealthProgram, 'id'>) => {
    const newProgram: HealthProgram = {
      ...programData,
      id: `program-${Date.now()}`
    };
    setPrograms([...programs, newProgram]);
  };

  const handleProgramSelect = (program: HealthProgram) => {
    console.log('Selected program:', program);
  };

  const handleUploadResource = async (resourceData: Omit<HealthResource, 'id' | 'uploadedAt'>) => {
    const newResource: HealthResource = {
      ...resourceData,
      id: `resource-${Date.now()}`,
      uploadedAt: new Date()
    };
    setResources([...resources, newResource]);
  };

  const handleDeleteResource = async (resourceId: string) => {
    setResources(resources.filter(r => r.id !== resourceId));
  };

  const handleUpdateResource = async (resourceId: string, updates: Partial<HealthResource>) => {
    setResources(resources.map(r => 
      r.id === resourceId ? { ...r, ...updates } : r
    ));
  };

  const handleSubmitIntake = async (submissionData: Omit<IntakeSubmission, 'id' | 'createdAt' | 'status'>) => {
    const newSubmission: IntakeSubmission = {
      ...submissionData,
      id: `intake-${Date.now()}`,
      createdAt: new Date(),
      status: 'new'
    };
    setIntakeSubmissions([...intakeSubmissions, newSubmission]);
    return newSubmission;
  };

  const handleUpdateIntakeStatus = async (submissionId: string, status: IntakeSubmission['status']) => {
    setIntakeSubmissions(intakeSubmissions.map(s => 
      s.id === submissionId ? { ...s, status } : s
    ));
  };

  const handleAssignIntake = async (submissionId: string, assignedTo: string) => {
    setIntakeSubmissions(intakeSubmissions.map(s => 
      s.id === submissionId ? { ...s, assignedTo } : s
    ));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'programs', label: 'Programs', icon: '🏥' },
    { id: 'resources', label: 'Resources', icon: '📚' },
    { id: 'intake', label: 'Intake', icon: '📝' }
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
        <h1 className="text-3xl font-semibold mb-4">HealthLabs Admin Dashboard</h1>
        <p className="text-gray-600 mb-4">
          Manage health programs, resources, and community intake submissions for your health initiatives.
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
              <div className="text-2xl font-bold text-blue-600 mb-2">{programs.length}</div>
              <div className="text-sm text-gray-600">Active Programs</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">{resources.length}</div>
              <div className="text-sm text-gray-600">Resources</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">{intakeSubmissions.length}</div>
              <div className="text-sm text-gray-600">Intake Submissions</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">
                {intakeSubmissions.filter(s => s.status === 'new').length}
              </div>
              <div className="text-sm text-gray-600">New Submissions</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">New intake submission received</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Health resource uploaded</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Community outreach program launched</span>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('programs')}
                  className="btn-primary w-full"
                >
                  Manage Programs
                </button>
                <button
                  onClick={() => setActiveTab('resources')}
                  className="btn-secondary w-full"
                >
                  Upload Resources
                </button>
                <button
                  onClick={() => setActiveTab('intake')}
                  className="btn-secondary w-full"
                >
                  Review Intake
                </button>
                <button className="btn-secondary w-full">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'programs' && (
        <ProgramTypes
          programs={programs}
          onProgramSelect={handleProgramSelect}
          onCreateProgram={handleCreateProgram}
        />
      )}

      {activeTab === 'resources' && (
        <ResourceLibrary
          labId="health-programs"
          resources={resources}
          onUploadResource={handleUploadResource}
          onDeleteResource={handleDeleteResource}
          onUpdateResource={handleUpdateResource}
          isAdmin={true}
        />
      )}

      {activeTab === 'intake' && (
        <CommunityIntake
          labId="health-programs"
          submissions={intakeSubmissions}
          onSubmit={handleSubmitIntake}
          onUpdateStatus={handleUpdateIntakeStatus}
          onAssignTo={handleAssignIntake}
          isAdmin={true}
        />
      )}
    </main>
  );
}

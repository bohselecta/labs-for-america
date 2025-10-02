import React, { useState } from 'react';

export interface HealthProgram {
  id: string;
  type: 'outreach' | 'resource-design' | 'data-challenge' | 'feedback-loop';
  title: string;
  description: string;
  status: 'active' | 'upcoming' | 'completed';
  startDate: Date;
  endDate: Date;
  participants: number;
  resources: number;
}

export interface ProgramTypeConfig {
  type: 'outreach' | 'resource-design' | 'data-challenge' | 'feedback-loop';
  name: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
  focus: string;
}

export interface ProgramTypesProps {
  programs: HealthProgram[];
  onProgramSelect: (program: HealthProgram) => void;
  onCreateProgram: (program: Omit<HealthProgram, 'id'>) => Promise<void>;
}

export function ProgramTypes({ programs, onProgramSelect, onCreateProgram }: ProgramTypesProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const programTypes: ProgramTypeConfig[] = [
    {
      type: 'outreach',
      name: 'Community Outreach',
      description: 'Connect with communities to understand health needs and provide resources.',
      icon: '🤝',
      color: 'bg-blue-100 text-blue-800',
      features: ['Community events', 'Resource distribution', 'Health education', 'Partnership building'],
      focus: 'Community engagement and health education'
    },
    {
      type: 'resource-design',
      name: 'Resource Design',
      description: 'Create and improve health resources, materials, and tools for community use.',
      icon: '📋',
      color: 'bg-green-100 text-green-800',
      features: ['Material creation', 'Tool development', 'Accessibility design', 'Translation support'],
      focus: 'Resource creation and improvement'
    },
    {
      type: 'data-challenge',
      name: 'Data Challenge',
      description: 'Analyze health data to identify patterns, trends, and opportunities for improvement.',
      icon: '📊',
      color: 'bg-purple-100 text-purple-800',
      features: ['Data analysis', 'Pattern recognition', 'Trend identification', 'Insight generation'],
      focus: 'Data-driven health insights'
    },
    {
      type: 'feedback-loop',
      name: 'Feedback Loop',
      description: 'Collect and analyze community feedback to improve health services and programs.',
      icon: '🔄',
      color: 'bg-orange-100 text-orange-800',
      features: ['Feedback collection', 'Service improvement', 'Quality assurance', 'Community input'],
      focus: 'Continuous improvement through feedback'
    }
  ];

  const getProgramsByType = (type: string) => {
    return programs.filter(program => program.type === type);
  };

  const handleCreateProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType) return;

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    
    try {
      await onCreateProgram({
        type: selectedType as any,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        status: 'upcoming',
        startDate: new Date(formData.get('startDate') as string),
        endDate: new Date(formData.get('endDate') as string),
        participants: 0,
        resources: 0
      });
      
      setIsCreating(false);
      setSelectedType(null);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Failed to create program:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">Health Program Types</h1>
        <p className="text-gray-600 mb-4">
          Choose the right program type for your health initiative. Each type has specific features and focus areas.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Program Type Overview</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Each type has tailored features and UI elements</li>
            <li>• Programs can be customized based on community needs</li>
            <li>• Different types emphasize different aspects of health work</li>
            <li>• Choose the type that best fits your initiative</li>
          </ul>
        </div>
      </div>

      {/* Program Types Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {programTypes.map((type) => (
          <div
            key={type.type}
            className={`card p-6 cursor-pointer transition-all hover:shadow-lg ${
              selectedType === type.type ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => setSelectedType(type.type)}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">{type.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{type.name}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{type.description}</p>
              
              <div className="mb-4">
                <span className={`badge ${type.color}`}>{type.focus}</span>
              </div>
              
              <div className="text-sm text-gray-500 mb-4">
                <strong>Features:</strong>
                <ul className="mt-1 space-y-1">
                  {type.features.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="text-sm text-gray-600">
                <strong>Active Programs:</strong> {getProgramsByType(type.type).length}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Programs */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Active Programs</h2>
        
        {programs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No programs yet</h3>
            <p className="text-gray-600 mb-4">Create your first health program to get started.</p>
            <button
              onClick={() => setIsCreating(true)}
              className="btn-primary"
            >
              Create Program
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => {
              const typeConfig = programTypes.find(t => t.type === program.type);
              
              return (
                <div
                  key={program.id}
                  className="card p-6 cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => onProgramSelect(program)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{typeConfig?.icon}</span>
                    <div>
                      <h3 className="font-semibold">{program.title}</h3>
                      <span className={`badge ${typeConfig?.color}`}>
                        {typeConfig?.name}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {program.description}
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={`badge ${
                        program.status === 'active' ? 'badge-success' :
                        program.status === 'upcoming' ? 'badge-warning' :
                        'badge-secondary'
                      }`}>
                        {program.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Participants:</span>
                      <span>{program.participants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Resources:</span>
                      <span>{program.resources}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>
                        {program.startDate.toLocaleDateString()} - {program.endDate.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Program Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Create New Program</h2>
                <button
                  onClick={() => setIsCreating(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleCreateProgram} className="space-y-4">
                <div>
                  <label htmlFor="programType" className="block text-sm font-medium text-gray-700 mb-2">
                    Program Type *
                  </label>
                  <select
                    id="programType"
                    value={selectedType || ''}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="form-field"
                    required
                  >
                    <option value="">Select program type</option>
                    {programTypes.map((type) => (
                      <option key={type.type} value={type.type}>
                        {type.name} - {type.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Program Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-field"
                    placeholder="Enter program title"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-field"
                    rows={4}
                    placeholder="Describe the program goals and objectives"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      className="form-field"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      className="form-field"
                      required
                    />
                  </div>
                </div>

                {selectedType && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      {programTypes.find(t => t.type === selectedType)?.name} Features
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      {programTypes.find(t => t.type === selectedType)?.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-3">
                  <button type="submit" className="btn-primary">
                    Create Program
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsCreating(false)}
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

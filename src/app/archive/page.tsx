"use client";
import { useState, useEffect } from 'react';
import { ArchivePage } from '@/components/archiving/ArchivePage';
import { ArchivedLab } from '@/components/archiving/ArchivePage';

export default function ArchiveIndexPage() {
  const [labs, setLabs] = useState<ArchivedLab[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArchivedLabs = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data for demo
        const mockLabs: ArchivedLab[] = [
          {
            id: 'civic-park-improvement',
            title: 'Community Park Improvement Initiative',
            description: 'A collaborative effort to improve local park facilities and accessibility for all community members.',
            category: 'Community Engagement',
            closedAt: new Date('2024-11-15'),
            closedBy: 'City Manager',
            reportPath: '/archive/civic-park-improvement/report.md',
            participants: 45,
            contributions: 127,
            status: 'completed',
            tags: ['parks', 'accessibility', 'community'],
            platform: 'civic'
          },
          {
            id: 'justice-cold-case-review',
            title: 'Cold Case Review Program',
            description: 'Community-assisted review of unsolved cases to identify new leads and evidence.',
            category: 'Public Safety',
            closedAt: new Date('2024-10-30'),
            closedBy: 'Detective Smith',
            reportPath: '/archive/justice-cold-case-review/report.md',
            participants: 23,
            contributions: 89,
            status: 'completed',
            tags: ['cold-case', 'investigation', 'community'],
            platform: 'justice'
          },
          {
            id: 'edu-stem-challenge',
            title: 'STEM Innovation Challenge',
            description: 'Student-led STEM projects focused on solving real-world problems through technology and innovation.',
            category: 'Education',
            closedAt: new Date('2024-12-01'),
            closedBy: 'Dr. Johnson',
            reportPath: '/archive/edu-stem-challenge/report.md',
            participants: 67,
            contributions: 203,
            status: 'completed',
            tags: ['stem', 'innovation', 'students'],
            platform: 'edu'
          },
          {
            id: 'health-mental-wellness',
            title: 'Mental Wellness Resource Design',
            description: 'Community-driven creation of mental health resources and support materials.',
            category: 'Healthcare',
            closedAt: new Date('2024-11-20'),
            closedBy: 'Health Director',
            reportPath: '/archive/health-mental-wellness/report.md',
            participants: 34,
            contributions: 156,
            status: 'completed',
            tags: ['mental-health', 'resources', 'wellness'],
            platform: 'health'
          },
          {
            id: 'civic-transportation-study',
            title: 'Public Transportation Accessibility Study',
            description: 'Community input on improving public transportation accessibility and routes.',
            category: 'Accessibility',
            closedAt: new Date('2024-09-15'),
            closedBy: 'Transportation Manager',
            reportPath: '/archive/civic-transportation-study/report.md',
            participants: 28,
            contributions: 94,
            status: 'cancelled',
            tags: ['transportation', 'accessibility', 'public-transit'],
            platform: 'civic'
          }
        ];
        
        setLabs(mockLabs);
      } catch (error) {
        console.error('Failed to load archived labs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArchivedLabs();
  }, []);

  const handleFilterChange = (filters: {
    platform: string;
    category: string;
    status: string;
    dateRange: string;
    tags: string[];
  }) => {
    // In real app, this would trigger API calls with filters
    console.log('Filters changed:', filters);
  };

  const handleExportArchive = (labId: string) => {
    // In real app, this would trigger archive export
    console.log('Exporting archive for lab:', labId);
    alert(`Exporting archive for ${labId}`);
  };

  const handleViewReport = (labId: string) => {
    // In real app, this would navigate to the report
    console.log('Viewing report for lab:', labId);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-96 bg-gray-200 rounded mb-8"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <main>
      <ArchivePage
        labs={labs}
        onFilterChange={handleFilterChange}
        onExportArchive={handleExportArchive}
        onViewReport={handleViewReport}
      />
    </main>
  );
}
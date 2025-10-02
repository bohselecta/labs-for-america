"use client";
import { useState, useEffect } from 'react';
import { ColdCaseVault, ColdCase, CaseAsset, CaseTimelineEvent } from '@/components/justice/ColdCaseVault';

export default function JusticeColdCasesAdmin() {
  const [cases, setCases] = useState<ColdCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data for demo
        const mockCases: ColdCase[] = [
          {
            id: 'case-1',
            title: 'Missing Person - Sarah Johnson',
            description: 'Cold case investigation into the disappearance of Sarah Johnson in 2019.',
            caseNumber: 'MP-2019-001',
            dateOpened: new Date('2019-03-15'),
            lastActivity: new Date('2024-12-10'),
            status: 'active',
            isPublic: false,
            assets: [
              {
                id: 'asset-1',
                caseId: 'case-1',
                title: 'Last Known Photo',
                description: 'Photo of Sarah taken 2 days before disappearance',
                publicUrl: '/assets/case-1/photo-redacted.jpg',
                privateUrl: '/assets/case-1/photo-original.jpg',
                isRedacted: true,
                hash: 'sha256:abc123def456',
                uploadedAt: new Date('2024-12-01'),
                uploadedBy: 'Detective Smith',
                fileType: 'image',
                fileSize: 2048576
              }
            ],
            timeline: [
              {
                id: 'event-1',
                date: new Date('2019-03-13'),
                title: 'Last Seen',
                description: 'Sarah was last seen leaving work at 5:30 PM',
                type: 'incident',
                isPublic: true
              },
              {
                id: 'event-2',
                date: new Date('2019-03-15'),
                title: 'Missing Person Report',
                description: 'Report filed by family after 48 hours',
                type: 'investigation',
                isPublic: true
              }
            ]
          },
          {
            id: 'case-2',
            title: 'Unsolved Homicide - Downtown District',
            description: 'Investigation into unsolved homicide from 2020.',
            caseNumber: 'HOM-2020-003',
            dateOpened: new Date('2020-07-22'),
            lastActivity: new Date('2024-12-05'),
            status: 'active',
            isPublic: true,
            publishedAt: new Date('2024-11-15'),
            assets: [
              {
                id: 'asset-2',
                caseId: 'case-2',
                title: 'Crime Scene Photos',
                description: 'Redacted crime scene photographs',
                publicUrl: '/assets/case-2/scene-redacted.jpg',
                privateUrl: '/assets/case-2/scene-original.jpg',
                isRedacted: true,
                hash: 'sha256:def456ghi789',
                uploadedAt: new Date('2024-11-10'),
                uploadedBy: 'Detective Johnson',
                fileType: 'image',
                fileSize: 5120000
              }
            ],
            timeline: [
              {
                id: 'event-3',
                date: new Date('2020-07-22'),
                title: 'Incident Reported',
                description: 'Homicide reported at 2:30 AM',
                type: 'incident',
                isPublic: true
              }
            ]
          }
        ];
        
        setCases(mockCases);
      } catch (error) {
        console.error('Failed to fetch cases:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCases();
  }, []);

  const handlePublishCase = async (caseId: string) => {
    try {
      // In real app, make API call to publish case
      setCases(cases.map(case_ => 
        case_.id === caseId 
          ? { ...case_, isPublic: true, publishedAt: new Date() }
          : case_
      ));
    } catch (error) {
      console.error('Failed to publish case:', error);
    }
  };

  const handleUploadAsset = async (caseId: string, file: File) => {
    try {
      // In real app, upload file and create asset record
      const newAsset: CaseAsset = {
        id: `asset-${Date.now()}`,
        caseId,
        title: file.name,
        description: `Uploaded file: ${file.name}`,
        isRedacted: false,
        hash: `sha256:${Math.random().toString(36).substring(7)}`,
        uploadedAt: new Date(),
        uploadedBy: 'Current User',
        fileType: file.type.startsWith('image/') ? 'image' : 
                  file.type.includes('pdf') ? 'pdf' : 'document',
        fileSize: file.size
      };

      setCases(cases.map(case_ => 
        case_.id === caseId 
          ? { ...case_, assets: [...case_.assets, newAsset], lastActivity: new Date() }
          : case_
      ));
    } catch (error) {
      console.error('Failed to upload asset:', error);
    }
  };

  const handleAddTimelineEvent = async (caseId: string, event: Omit<CaseTimelineEvent, 'id'>) => {
    try {
      // In real app, create timeline event
      const newEvent: CaseTimelineEvent = {
        ...event,
        id: `event-${Date.now()}`
      };

      setCases(cases.map(case_ => 
        case_.id === caseId 
          ? { ...case_, timeline: [...case_.timeline, newEvent], lastActivity: new Date() }
          : case_
      ));
    } catch (error) {
      console.error('Failed to add timeline event:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-96 bg-gray-200 rounded mb-8"></div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
            <div className="lg:col-span-2 space-y-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ColdCaseVault
      cases={cases}
      onPublishCase={handlePublishCase}
      onUploadAsset={handleUploadAsset}
      onAddTimelineEvent={handleAddTimelineEvent}
    />
  );
}
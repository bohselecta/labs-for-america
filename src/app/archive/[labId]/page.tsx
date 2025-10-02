"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import { IndividualArchivePage } from '@/components/archiving/IndividualArchive';
import { ArchiveReport } from '@/components/archiving/IndividualArchive';

export default function IndividualArchivePage({ params }: { params: { labId: string } }) {
  const [report, setReport] = useState<ArchiveReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArchiveReport = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data for demo
        const mockReport: ArchiveReport = {
          id: params.labId,
          labId: params.labId,
          title: 'Community Park Improvement Initiative',
          description: 'A collaborative effort to improve local park facilities and accessibility for all community members. This initiative brought together residents, city officials, and local organizations to identify key areas for improvement and develop actionable solutions.',
          category: 'Community Engagement',
          platform: 'civic',
          closedAt: new Date('2024-11-15'),
          closedBy: 'City Manager',
          participants: 45,
          contributions: 127,
          outcomes: [
            'Identified 12 key improvement areas across 3 local parks',
            'Secured $50,000 in funding for accessibility improvements',
            'Created community garden space with 20 plots',
            'Established monthly park maintenance volunteer program'
          ],
          decisions: [
            'Approved installation of wheelchair-accessible playground equipment',
            'Decided to create dedicated dog park area',
            'Chose to implement solar-powered lighting system',
            'Selected native plant species for landscaping'
          ],
          nextSteps: [
            'Begin construction on accessibility improvements (Q1 2025)',
            'Launch community garden plot registration system',
            'Establish park maintenance volunteer schedule',
            'Plan community celebration event for park reopening'
          ],
          reportContent: `
            <h2>Executive Summary</h2>
            <p>The Community Park Improvement Initiative successfully engaged 45 community members over a 3-month period, resulting in 127 contributions and actionable recommendations for improving local park facilities.</p>
            
            <h2>Key Findings</h2>
            <p>The initiative identified several critical areas for improvement:</p>
            <ul>
              <li>Accessibility barriers preventing wheelchair users from accessing playground equipment</li>
              <li>Insufficient lighting creating safety concerns for evening park users</li>
              <li>Lack of community garden space despite high demand</li>
              <li>Need for better maintenance coordination between city and volunteers</li>
            </ul>
            
            <h2>Community Impact</h2>
            <p>This initiative demonstrates the power of collaborative community engagement in addressing local infrastructure needs. The diverse participation from residents, city officials, and local organizations ensured comprehensive input and buy-in for proposed solutions.</p>
            
            <h2>Implementation Timeline</h2>
            <p>The approved improvements will be implemented in phases over the next 12 months, with accessibility improvements taking priority due to their immediate impact on community inclusion.</p>
          `,
          attachments: [
            'park-improvement-proposal.pdf',
            'accessibility-assessment.pdf',
            'community-feedback-summary.pdf',
            'funding-application.pdf'
          ],
          tags: ['parks', 'accessibility', 'community', 'infrastructure']
        };
        
        setReport(mockReport);
      } catch (error) {
        console.error('Failed to load archive report:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArchiveReport();
  }, [params.labId]);

  const handleExportReport = () => {
    // In real app, this would trigger report export
    console.log('Exporting report for lab:', params.labId);
    alert(`Exporting report for ${params.labId}`);
  };

  const handleDownloadAttachment = (attachment: string) => {
    // In real app, this would trigger file download
    console.log('Downloading attachment:', attachment);
    alert(`Downloading ${attachment}`);
  };

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

  if (!report) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Archive Not Found</h1>
          <p className="text-gray-600 mb-4">The requested archive could not be found.</p>
          <Link href="/archive" className="btn-primary">
            Back to Archive
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main>
      <IndividualArchivePage
        labId={params.labId}
        report={report}
        onExportReport={handleExportReport}
        onDownloadAttachment={handleDownloadAttachment}
      />
    </main>
  );
}

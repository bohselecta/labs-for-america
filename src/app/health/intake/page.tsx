"use client";
import { useState } from 'react';
import { CommunityIntake } from '@/components/health/CommunityIntake';

export default function HealthIntakePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (submissionData: any): Promise<any> => {
    setIsSubmitting(true);
    try {
      // In real app, submit to secure API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Return mock submission
      return {
        id: `intake-${Date.now()}`,
        ...submissionData,
        createdAt: new Date(),
        status: 'new'
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <CommunityIntake 
        labId="health-intake"
        submissions={[]}
        onSubmit={handleSubmit}
        onUpdateStatus={async () => {}}
        onAssignTo={async () => {}}
        isAdmin={false}
      />
    </main>
  );
}

"use client";
import { useState } from 'react';
import { SecureTipForm } from '@/components/justice/SecureTips';

export default function SecureTipsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (tipData: any): Promise<string> => {
    setIsSubmitting(true);
    try {
      // In real app, submit to secure API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Generate reference ID
      const referenceId = `TIP-${Date.now().toString().slice(-6)}`;
      
      return referenceId;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <SecureTipForm onSubmit={handleSubmit} />
    </main>
  );
}
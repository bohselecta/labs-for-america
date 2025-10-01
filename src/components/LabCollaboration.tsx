"use client";
import { useState } from "react";
import { ContributionModal } from "./ContributionModal";
import { ContributionsList } from "./ContributionsList";

interface LabCollaborationProps {
  labId: string;
}

export function LabCollaboration({ labId }: LabCollaborationProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        💡 Submit Contribution
      </button>

      <ContributionModal
        labId={labId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Community Contributions</h3>
        <ContributionsList key={refreshKey} labId={labId} />
      </div>
    </>
  );
}

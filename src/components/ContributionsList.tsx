"use client";
import { useState, useEffect } from "react";

interface Contribution {
  id: string;
  title: string;
  content: string;
  type: string;
  author: string;
  status: string;
  voteCount: number;
  createdAt: string;
}

interface ContributionsListProps {
  labId: string;
}

export function ContributionsList({ labId }: ContributionsListProps) {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState<string | null>(null);

  useEffect(() => {
    fetchContributions();
  }, [labId]);

  const fetchContributions = async () => {
    try {
      const response = await fetch(`/api/labs/${labId}/contributions`);
      if (response.ok) {
        const data = await response.json();
        setContributions(data.contributions || []);
      }
    } catch (error) {
      console.error("Error fetching contributions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (contributionId: string) => {
    setVoting(contributionId);
    
    try {
      const voterName = prompt("Enter your name to vote:");
      if (!voterName) return;

      const voterEmail = prompt("Enter your email (optional):") || "";

      const response = await fetch(`/api/contributions/${contributionId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voterName, voterEmail })
      });

      if (response.ok) {
        // Refresh contributions to show updated vote count
        fetchContributions();
      } else {
        const error = await response.text();
        alert(`Failed to vote: ${error}`);
      }
    } catch (error) {
      console.error("Error voting:", error);
      alert("Failed to vote. Please try again.");
    } finally {
      setVoting(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "proposal": return "💡";
      case "document": return "📄";
      case "comment": return "💬";
      case "design": return "🎨";
      default: return "📝";
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">Loading contributions...</div>
      </div>
    );
  }

  if (contributions.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">No contributions yet. Be the first to contribute!</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {contributions.map((contribution) => (
        <div key={contribution.id} className="card p-6">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">{getTypeIcon(contribution.type)}</span>
              <h3 className="font-semibold text-lg">{contribution.title}</h3>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contribution.status)}`}>
              {contribution.status}
            </span>
          </div>

          <div className="text-gray-600 mb-4">
            {contribution.content.length > 200 
              ? `${contribution.content.substring(0, 200)}...` 
              : contribution.content}
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <div>
              <span className="font-medium">{contribution.author}</span>
              <span className="ml-2">
                {new Date(contribution.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleVote(contribution.id)}
                disabled={voting === contribution.id}
                className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                👍 {contribution.voteCount}
                {voting === contribution.id && "..."}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

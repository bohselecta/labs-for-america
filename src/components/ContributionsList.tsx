"use client";
import { useState, useEffect, useCallback } from "react";

interface Contribution {
  id: string;
  title: string;
  content: string;
  type: string;
  author: string;
  authorEmail?: string;
  status: string;
  voteCount: number;
  createdAt: string;
  tags?: string[];
  fileUrl?: string;
}

interface ContributionsListProps {
  labId: string;
}

const STATUS_STYLES = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-review": "bg-blue-100 text-blue-800", 
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800"
} as const;

const TYPE_ICONS = {
  idea: "💡",
  document: "📄", 
  design: "🎨",
  data: "📊",
  link: "🔗"
} as const;

export function ContributionsList({ labId }: ContributionsListProps) {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchContributions = useCallback(async () => {
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
  }, [labId]);

  useEffect(() => {
    fetchContributions();
  }, [fetchContributions]);

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

  const handleStatusChange = async (contributionId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/contributions/${contributionId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchContributions();
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const filteredContributions = contributions.filter(contribution => 
    statusFilter === "all" || contribution.status === statusFilter
  );

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-pulse">
          <div className="h-4 w-48 bg-gray-200 rounded mx-auto mb-4"></div>
          <div className="space-y-4">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (contributions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No contributions yet</h3>
        <p className="text-gray-600 mb-4">Be the first to share your ideas and solutions!</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filter Controls */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex gap-2">
          {["all", "pending", "in-review", "accepted", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                statusFilter === status
                  ? "bg-blue-100 text-blue-700 border border-blue-300"
                  : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
              }`}
            >
              {status === "all" ? "All" : status.replace("-", " ")}
              <span className="ml-1 text-xs">
                ({status === "all" ? contributions.length : contributions.filter(c => c.status === status).length})
              </span>
            </button>
          ))}
        </div>
        <div className="text-sm text-gray-600">
          {filteredContributions.length} contribution{filteredContributions.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Contributions List */}
      <div className="space-y-4" aria-live="polite">
        {filteredContributions.map((contribution) => (
          <div key={contribution.id} className="card p-6">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">{TYPE_ICONS[contribution.type as keyof typeof TYPE_ICONS] || "📝"}</span>
                <div>
                  <h3 className="font-semibold text-lg">{contribution.title}</h3>
                  <div className="text-sm text-gray-500">
                    by <span className="font-medium">{contribution.author}</span> • 
                    {new Date(contribution.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[contribution.status as keyof typeof STATUS_STYLES] || STATUS_STYLES.pending}`}>
                  {contribution.status.replace("-", " ")}
                </span>
                <select
                  value={contribution.status}
                  onChange={(e) => handleStatusChange(contribution.id, e.target.value)}
                  className="text-xs border border-gray-300 rounded px-2 py-1"
                  aria-label="Change status"
                >
                  <option value="pending">Pending</option>
                  <option value="in-review">In Review</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            {contribution.tags && contribution.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {contribution.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="text-gray-600 mb-4">
              {contribution.content.length > 300 
                ? `${contribution.content.substring(0, 300)}...` 
                : contribution.content}
            </div>

            {/* File Link */}
            {contribution.fileUrl && (
              <div className="mb-4">
                <a 
                  href={contribution.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 text-sm"
                >
                  🔗 View File
                </a>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleVote(contribution.id)}
                  disabled={voting === contribution.id}
                  className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  aria-label={`Vote for ${contribution.title}`}
                >
                  👍 {contribution.voteCount}
                  {voting === contribution.id && "..."}
                </button>
                
                <button
                  className="px-3 py-2 text-gray-600 hover:text-gray-800 text-sm"
                  onClick={() => {
                    const fullContent = prompt("Full content:", contribution.content);
                    if (fullContent) {
                      // Could implement edit functionality here
                    }
                  }}
                >
                  View Full
                </button>
              </div>
              
              <div className="text-xs text-gray-500">
                {contribution.voteCount} vote{contribution.voteCount !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredContributions.length === 0 && statusFilter !== "all" && (
        <div className="text-center py-8">
          <p className="text-gray-500">No {statusFilter.replace("-", " ")} contributions found.</p>
          <button
            onClick={() => setStatusFilter("all")}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            View All Contributions
          </button>
        </div>
      )}
    </div>
  );
}

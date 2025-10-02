"use client";
import { useState, useEffect } from "react";

interface ModerationItem {
  id: string;
  type: 'contribution' | 'vote' | 'lab';
  title: string;
  content: string;
  author: string;
  createdAt: string;
  flags: string[];
  status: 'pending' | 'approved' | 'rejected';
  labId?: string;
}

export function ModerationDashboard() {
  const [items, setItems] = useState<ModerationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  useEffect(() => {
    // Mock data for now - would fetch from API
    setItems([
      {
        id: '1',
        type: 'contribution',
        title: 'Lake Cleanup Solution',
        content: 'I think we should use chemical treatment at 123 Main Street...',
        author: 'John Doe',
        createdAt: '2024-01-15T10:30:00Z',
        flags: ['Contains street address', 'Potential PII'],
        status: 'pending',
        labId: 'lake-cleanup-concepts'
      },
      {
        id: '2',
        type: 'contribution',
        title: 'FREE MONEY CLICK HERE!!!',
        content: 'Make money fast! Click this link: bit.ly/freemoney',
        author: 'SpamBot',
        createdAt: '2024-01-15T09:15:00Z',
        flags: ['Suspicious words', 'Too many caps', 'Suspicious domains'],
        status: 'pending',
        labId: 'lake-cleanup-concepts'
      }
    ]);
    setLoading(false);
  }, []);

  const handleModerationAction = async (itemId: string, action: 'approve' | 'reject') => {
    try {
      // API call to update moderation status
      const response = await fetch(`/api/moderation/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });

      if (response.ok) {
        setItems(items.map(item => 
          item.id === itemId 
            ? { ...item, status: action === 'approve' ? 'approved' : 'rejected' }
            : item
        ));
      }
    } catch (error) {
      console.error('Error updating moderation status:', error);
    }
  };

  const filteredItems = items.filter(item => 
    filter === 'all' || item.status === filter
  );

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Content Moderation</h1>
        <p className="text-gray-600">Review and moderate flagged content</p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2 border-b border-gray-200">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              filter === status
                ? "text-blue-600 border-blue-600"
                : "text-gray-500 hover:text-gray-700 border-transparent"
            }`}
          >
            {status === 'all' ? 'All Items' : status.charAt(0).toUpperCase() + status.slice(1)}
            <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {status === 'all' ? items.length : items.filter(item => item.status === status).length}
            </span>
          </button>
        ))}
      </div>

      {/* Moderation Items */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {filter === 'all' ? '' : filter} items found
            </h3>
            <p className="text-gray-600">
              {filter === 'pending' 
                ? 'No items pending moderation review.'
                : 'All content has been reviewed.'}
            </p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="card p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {item.type}
                    </span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      item.status === 'approved' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">
                    by {item.author} • {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                {item.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleModerationAction(item.id, 'approve')}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleModerationAction(item.id, 'reject')}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>

              {/* Content Preview */}
              <div className="mb-4 p-3 bg-gray-50 rounded text-sm">
                <div className="line-clamp-3">{item.content}</div>
              </div>

              {/* Flags */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Flags:</h4>
                <div className="flex flex-wrap gap-1">
                  {item.flags.map((flag, index) => (
                    <span key={index} className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                      {flag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  {item.labId && `Lab: ${item.labId}`}
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-gray-600 hover:text-gray-800 text-sm">
                    View Full
                  </button>
                  <button className="px-3 py-1 text-gray-600 hover:text-gray-800 text-sm">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {items.filter(item => item.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600">Pending Review</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {items.filter(item => item.status === 'approved').length}
          </div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-red-600">
            {items.filter(item => item.status === 'rejected').length}
          </div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
      </div>
    </div>
  );
}

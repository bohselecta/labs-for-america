import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icons';
import { LineClamp } from '@/components/LineClamp';
import { StatusBadge } from '@/lib/status-colors';

export interface ArchivedLab {
  id: string;
  title: string;
  description: string;
  category: string;
  closedAt: Date;
  closedBy: string;
  reportPath?: string;
  participants: number;
  contributions: number;
  status: 'closed' | 'completed' | 'cancelled';
  tags: string[];
  platform: 'civic' | 'justice' | 'edu' | 'health';
}

export interface ArchiveFilters {
  platform: string;
  category: string;
  status: string;
  dateRange: {
    start: string;
    end: string;
  };
  tags: string[];
  search: string;
}

export interface ArchivePageProps {
  labs: ArchivedLab[];
  onFilterChange: (filters: ArchiveFilters) => void;
  onExportArchive: (labId: string) => void;
  onViewReport: (labId: string) => void;
}

export function ArchivePage({ 
  labs, 
  onFilterChange, 
  onExportArchive, 
  onViewReport 
}: ArchivePageProps) {
  const [filters, setFilters] = useState<ArchiveFilters>({
    platform: 'all',
    category: 'all',
    status: 'all',
    dateRange: {
      start: '',
      end: ''
    },
    tags: [],
    search: ''
  });

  const [sortBy, setSortBy] = useState<'closedAt' | 'title' | 'participants' | 'contributions'>('closedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedLabs, setSelectedLabs] = useState<string[]>([]);

  const platforms = [
    { value: 'civic', label: 'CivicLabs', icon: '🏛️' },
    { value: 'justice', label: 'JusticeLabs', icon: '🚔' },
    { value: 'edu', label: 'EduLabs', icon: '🎓' },
    { value: 'health', label: 'HealthLabs', icon: '🏥' }
  ];

  const categories = [
    'Community Engagement', 'Public Safety', 'Education', 'Healthcare',
    'Sustainability', 'Technology', 'Accessibility', 'Innovation'
  ];

  const statuses = [
    { value: 'closed', label: 'Closed', color: 'badge-secondary' },
    { value: 'completed', label: 'Completed', color: 'badge-success' },
    { value: 'cancelled', label: 'Cancelled', color: 'badge-danger' }
  ];

  const allTags = Array.from(new Set(labs.flatMap(lab => lab.tags)));

  const filteredLabs = labs.filter(lab => {
    if (filters.platform !== 'all' && lab.platform !== filters.platform) return false;
    if (filters.category !== 'all' && lab.category !== filters.category) return false;
    if (filters.status !== 'all' && lab.status !== filters.status) return false;
    if (filters.search && !lab.title.toLowerCase().includes(filters.search.toLowerCase()) && 
        !lab.description.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.tags.length > 0 && !filters.tags.some(tag => lab.tags.includes(tag))) return false;
    if (filters.dateRange.start && lab.closedAt < new Date(filters.dateRange.start)) return false;
    if (filters.dateRange.end && lab.closedAt > new Date(filters.dateRange.end)) return false;
    return true;
  }).sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (sortBy === 'closedAt') {
      return sortOrder === 'asc' 
        ? (aValue as Date).getTime() - (bValue as Date).getTime()
        : (bValue as Date).getTime() - (aValue as Date).getTime();
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return sortOrder === 'asc' 
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });

  const handleFilterChange = (newFilters: Partial<ArchiveFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    handleFilterChange({ tags: newTags });
  };

  const handleSelectAll = () => {
    if (selectedLabs.length === filteredLabs.length) {
      setSelectedLabs([]);
    } else {
      setSelectedLabs(filteredLabs.map(lab => lab.id));
    }
  };

  const handleSelectLab = (labId: string) => {
    setSelectedLabs(prev => 
      prev.includes(labId) 
        ? prev.filter(id => id !== labId)
        : [...prev, labId]
    );
  };

  const handleBulkExport = () => {
    selectedLabs.forEach(labId => onExportArchive(labId));
  };

  const getPlatformIcon = (platform: string) => {
    return platforms.find(p => p.value === platform)?.icon || '📁';
  };

  const getPlatformLabel = (platform: string) => {
    return platforms.find(p => p.value === platform)?.label || platform;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">Archive</h1>
        <p className="text-gray-600 mb-4">
          Browse and search through archived Labs. All closed Labs are preserved here with their reports and outcomes.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Archive Features</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Search and filter archived Labs by platform, category, and date</li>
            <li>• View Lab reports and outcomes</li>
            <li>• Export archive data for analysis</li>
            <li>• Preserve all Lab history and contributions</li>
          </ul>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
            <select
              value={filters.platform}
              onChange={(e) => handleFilterChange({ platform: e.target.value })}
              className="form-field"
            >
              <option value="all">All Platforms</option>
              {platforms.map(platform => (
                <option key={platform.value} value={platform.value}>
                  {platform.icon} {platform.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange({ category: e.target.value })}
              className="form-field"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange({ status: e.target.value })}
              className="form-field"
            >
              <option value="all">All Statuses</option>
              {statuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) => handleFilterChange({ 
                dateRange: { ...filters.dateRange, start: e.target.value }
              })}
              className="form-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) => handleFilterChange({ 
                dateRange: { ...filters.dateRange, end: e.target.value }
              })}
              className="form-field"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange({ search: e.target.value })}
            className="form-field"
            placeholder="Search by title or description..."
          />
        </div>

        {allTags.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`badge ${
                    filters.tags.includes(tag) ? 'badge-primary' : 'badge-secondary'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">
            Archived Labs ({filteredLabs.length})
          </h2>
          <p className="text-sm text-gray-600">
            Showing {filteredLabs.length} of {labs.length} archived Labs
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="form-field text-sm"
            >
              <option value="closedAt">Date Closed</option>
              <option value="title">Title</option>
              <option value="participants">Participants</option>
              <option value="contributions">Contributions</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="btn-secondary text-sm px-2 py-1"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
          
          {selectedLabs.length > 0 && (
            <button
              onClick={handleBulkExport}
              className="btn-primary text-sm px-3 py-1"
            >
              Export Selected ({selectedLabs.length})
            </button>
          )}
        </div>
      </div>

      {/* Labs Grid */}
      {filteredLabs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Icon name="civic" size="xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No archived Labs found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your filters or search terms.</p>
          <button
            onClick={() => setFilters({
              platform: 'all',
              category: 'all',
              status: 'all',
              dateRange: { start: '', end: '' },
              tags: [],
              search: ''
            })}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Select All */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              checked={selectedLabs.length === filteredLabs.length}
              onChange={handleSelectAll}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700">
              Select all ({filteredLabs.length} Labs)
            </span>
          </div>

          {/* Labs List */}
          {filteredLabs.map((lab) => (
            <div key={lab.id} className="card p-6">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={selectedLabs.includes(lab.id)}
                  onChange={() => handleSelectLab(lab.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                />
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{getPlatformIcon(lab.platform)}</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{lab.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{getPlatformLabel(lab.platform)}</span>
                        <span>•</span>
                        <span>{lab.category}</span>
                        <span>•</span>
                        <span>Closed {lab.closedAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                    <StatusBadge status={lab.status as any} />
                  </div>
                  
                  <div className="mb-3">
                    <LineClamp lines={2} className="text-gray-600">
                      {lab.description}
                    </LineClamp>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{lab.participants} participants</span>
                    <span>{lab.contributions} contributions</span>
                    <span>Closed by {lab.closedBy}</span>
                  </div>
                  
                  {lab.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {lab.tags.map(tag => (
                        <span key={tag} className="badge badge-secondary text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Link
                      href={`/archive/${lab.id}`}
                      className="btn-primary text-sm px-3 py-1"
                      onClick={() => onViewReport(lab.id)}
                    >
                      <Icon name="external-link" size="sm" className="inline mr-1" />
                      View Archive
                    </Link>
                    <button
                      onClick={() => onExportArchive(lab.id)}
                      className="btn-secondary text-sm px-3 py-1"
                    >
                      <Icon name="external-link" size="sm" className="inline mr-1" />
                      Export
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

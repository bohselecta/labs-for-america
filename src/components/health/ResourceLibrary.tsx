import React, { useState } from 'react';

export interface HealthResource {
  id: string;
  labId: string;
  title: string;
  url: string;
  lang: string;
  readingLevel?: string;
  tags: string[];
  description: string;
  fileType: 'pdf' | 'link' | 'video' | 'audio' | 'image';
  fileSize?: number;
  uploadedAt: Date;
  uploadedBy: string;
  isPublic: boolean;
}

export interface ResourceLibraryProps {
  labId: string;
  resources: HealthResource[];
  onUploadResource: (resource: Omit<HealthResource, 'id' | 'uploadedAt'>) => Promise<void>;
  onDeleteResource: (resourceId: string) => Promise<void>;
  onUpdateResource: (resourceId: string, updates: Partial<HealthResource>) => Promise<void>;
  isAdmin?: boolean;
}

export function ResourceLibrary({ 
  labId, 
  resources, 
  onUploadResource, 
  onDeleteResource, 
  onUpdateResource,
  isAdmin = false
}: ResourceLibraryProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedResource, setSelectedResource] = useState<HealthResource | null>(null);
  const [filters, setFilters] = useState({
    lang: 'all',
    readingLevel: 'all',
    fileType: 'all',
    tags: 'all'
  });

  const languages = ['en', 'es', 'fr', 'zh', 'ar', 'other'];
  const readingLevels = ['elementary', 'middle', 'high', 'adult', 'professional'];
  const fileTypes = ['pdf', 'link', 'video', 'audio', 'image'];
  const commonTags = ['access', 'translation', 'affordability', 'transport', 'awareness', 'prevention', 'treatment', 'support'];

  const filteredResources = resources.filter(resource => {
    if (filters.lang !== 'all' && resource.lang !== filters.lang) return false;
    if (filters.readingLevel !== 'all' && resource.readingLevel !== filters.readingLevel) return false;
    if (filters.fileType !== 'all' && resource.fileType !== filters.fileType) return false;
    if (filters.tags !== 'all' && !resource.tags.includes(filters.tags)) return false;
    return true;
  });

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      
      await onUploadResource({
        labId,
        title: formData.get('title') as string,
        url: formData.get('url') as string,
        lang: formData.get('lang') as string,
        readingLevel: formData.get('readingLevel') as string || undefined,
        tags: (formData.get('tags') as string).split(',').map(tag => tag.trim()).filter(tag => tag),
        description: formData.get('description') as string,
        fileType: formData.get('fileType') as any,
        fileSize: 0, // Would be calculated from actual file
        uploadedBy: 'current-user', // Would come from auth context
        isPublic: formData.get('isPublic') === 'on'
      });

      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Failed to upload resource:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf': return '📄';
      case 'link': return '🔗';
      case 'video': return '🎥';
      case 'audio': return '🎵';
      case 'image': return '🖼️';
      default: return '📁';
    }
  };

  const getLanguageName = (lang: string) => {
    const names: Record<string, string> = {
      'en': 'English',
      'es': 'Spanish',
      'fr': 'French',
      'zh': 'Chinese',
      'ar': 'Arabic',
      'other': 'Other'
    };
    return names[lang] || lang;
  };

  const getReadingLevelName = (level: string) => {
    const names: Record<string, string> = {
      'elementary': 'Elementary',
      'middle': 'Middle School',
      'high': 'High School',
      'adult': 'Adult',
      'professional': 'Professional'
    };
    return names[level] || level;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">Resource Library</h1>
        <p className="text-gray-600 mb-4">
          Access health resources, materials, and tools. All resources include language tags and reading level information.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Resource Features</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Resources tagged by language and reading level</li>
            <li>• Support for multiple file types and formats</li>
            <li>• Bulk upload support for efficient management</li>
            <li>• Public and private resource options</li>
          </ul>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6">
        <h3 className="font-semibold mb-3">Filter Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select
              value={filters.lang}
              onChange={(e) => setFilters({ ...filters, lang: e.target.value })}
              className="form-field"
            >
              <option value="all">All Languages</option>
              {languages.map(lang => (
                <option key={lang} value={lang}>{getLanguageName(lang)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reading Level</label>
            <select
              value={filters.readingLevel}
              onChange={(e) => setFilters({ ...filters, readingLevel: e.target.value })}
              className="form-field"
            >
              <option value="all">All Levels</option>
              {readingLevels.map(level => (
                <option key={level} value={level}>{getReadingLevelName(level)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File Type</label>
            <select
              value={filters.fileType}
              onChange={(e) => setFilters({ ...filters, fileType: e.target.value })}
              className="form-field"
            >
              <option value="all">All Types</option>
              {fileTypes.map(type => (
                <option key={type} value={type}>{type.toUpperCase()}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <select
              value={filters.tags}
              onChange={(e) => setFilters({ ...filters, tags: e.target.value })}
              className="form-field"
            >
              <option value="all">All Tags</option>
              {commonTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      {isAdmin && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Upload Resources</h2>
            <button
              onClick={() => setSelectedResource(null)}
              className="btn-primary"
            >
              Upload New Resource
            </button>
          </div>

          {selectedResource === null && (
            <div className="card p-6">
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Resource Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-field"
                      placeholder="Enter resource title"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="fileType" className="block text-sm font-medium text-gray-700 mb-2">
                      File Type *
                    </label>
                    <select
                      id="fileType"
                      name="fileType"
                      className="form-field"
                      required
                    >
                      <option value="">Select type</option>
                      {fileTypes.map(type => (
                        <option key={type} value={type}>{type.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                    URL or File Path *
                  </label>
                  <input
                    type="url"
                    id="url"
                    name="url"
                    className="form-field"
                    placeholder="https://example.com/resource.pdf"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-field"
                    rows={3}
                    placeholder="Describe the resource content and purpose"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="lang" className="block text-sm font-medium text-gray-700 mb-2">
                      Language *
                    </label>
                    <select
                      id="lang"
                      name="lang"
                      className="form-field"
                      required
                    >
                      <option value="">Select language</option>
                      {languages.map(lang => (
                        <option key={lang} value={lang}>{getLanguageName(lang)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="readingLevel" className="block text-sm font-medium text-gray-700 mb-2">
                      Reading Level
                    </label>
                    <select
                      id="readingLevel"
                      name="readingLevel"
                      className="form-field"
                    >
                      <option value="">Select level</option>
                      {readingLevels.map(level => (
                        <option key={level} value={level}>{getReadingLevelName(level)}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    className="form-field"
                    placeholder="access, translation, affordability"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Common tags: {commonTags.join(', ')}
                  </p>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublic"
                    name="isPublic"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
                    Make this resource public
                  </label>
                </div>

                <div className="flex gap-3">
                  <button 
                    type="submit" 
                    disabled={isUploading}
                    className="btn-primary"
                  >
                    {isUploading ? 'Uploading...' : 'Upload Resource'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setSelectedResource(null)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Resources Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Resources ({filteredResources.length})
        </h2>
        
        {filteredResources.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600">Try adjusting your filters or upload new resources.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{getFileIcon(resource.fileType)}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold line-clamp-2">{resource.title}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className="badge badge-info text-xs">
                        {getLanguageName(resource.lang)}
                      </span>
                      {resource.readingLevel && (
                        <span className="badge badge-secondary text-xs">
                          {getReadingLevelName(resource.readingLevel)}
                        </span>
                      )}
                      {resource.isPublic && (
                        <span className="badge badge-success text-xs">Public</span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {resource.description}
                </p>

                {resource.tags.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.map((tag) => (
                        <span key={tag} className="badge badge-secondary text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm px-3 py-1"
                  >
                    View Resource
                  </a>
                  {isAdmin && (
                    <div className="flex gap-1">
                      <button
                        onClick={() => setSelectedResource(resource)}
                        className="btn-secondary text-sm px-2 py-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteResource(resource.id)}
                        className="btn-danger text-sm px-2 py-1"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-3 text-xs text-gray-500">
                  Uploaded: {resource.uploadedAt.toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

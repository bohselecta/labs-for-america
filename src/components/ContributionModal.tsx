"use client";
import { useState } from "react";
import { createSafeDisplay, containsPII, getPIIWarnings } from "@/lib/pii-masking";
import { checkSpam, sanitizeContent } from "@/lib/spam-protection";

interface ContributionModalProps {
  labId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CONTRIBUTION_TYPES = [
  { value: "idea", label: "💡 Idea", description: "Share a creative solution or approach" },
  { value: "document", label: "📄 Document", description: "Upload a document, report, or analysis" },
  { value: "design", label: "🎨 Design", description: "Share a design, diagram, or visual concept" },
  { value: "data", label: "📊 Data", description: "Provide data, research, or evidence" },
  { value: "link", label: "🔗 Link", description: "Share a relevant resource or reference" }
] as const;

const COMMON_TAGS = [
  "safety", "cost", "accessibility", "sustainability", "community", 
  "technology", "education", "health", "transportation", "environment"
];

export function ContributionModal({ labId, isOpen, onClose, onSuccess }: ContributionModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "idea",
    author: "",
    authorEmail: "",
    tags: [] as string[],
    fileUrl: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customTag, setCustomTag] = useState("");
  const [piiWarnings, setPiiWarnings] = useState<string[]>([]);
  const [spamCheck, setSpamCheck] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleContentChange = (content: string) => {
    setFormData({ ...formData, content });
    
    // Check for PII
    const warnings = getPIIWarnings(content);
    setPiiWarnings(warnings);
    
    // Check for spam
    const spamResult = checkSpam(content);
    setSpamCheck(spamResult);
  };

  const handleTagToggle = (tag: string) => {
    if (formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
    } else if (formData.tags.length < 5) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() && !formData.tags.includes(customTag.trim()) && formData.tags.length < 5) {
      setFormData({ ...formData, tags: [...formData.tags, customTag.trim()] });
      setCustomTag("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final safety checks
    if (spamCheck?.action === 'block') {
      alert('Your contribution was flagged as spam and cannot be submitted. Please revise your content.');
      return;
    }
    
    if (piiWarnings.length > 0) {
      const proceed = confirm(
        `Your contribution contains personal information: ${piiWarnings.join(', ')}. ` +
        'This will be automatically masked for public display. Do you want to proceed?'
      );
      if (!proceed) return;
    }
    
    setIsSubmitting(true);

    try {
      // Sanitize content before submission
      const sanitizedContent = sanitizeContent(formData.content);
      
      const response = await fetch(`/api/labs/${labId}/contributions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          content: sanitizedContent
        })
      });

      if (response.ok) {
        onSuccess();
        onClose();
        setFormData({ 
          title: "", 
          content: "", 
          type: "idea", 
          author: "", 
          authorEmail: "", 
          tags: [],
          fileUrl: ""
        });
        setPiiWarnings([]);
        setSpamCheck(null);
      } else {
        const error = await response.text();
        alert(`Failed to submit contribution: ${error}`);
      }
    } catch (error) {
      console.error("Error submitting contribution:", error);
      alert("Failed to submit contribution. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Submit a Contribution</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Safety Warnings */}
        {piiWarnings.length > 0 && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <div className="flex items-start gap-2">
              <span className="text-yellow-600">⚠️</span>
              <div className="text-sm text-yellow-800">
                <p className="font-medium">Personal Information Detected</p>
                <p>Your content contains: {piiWarnings.join(', ')}. This will be automatically masked for public display.</p>
              </div>
            </div>
          </div>
        )}

        {spamCheck?.isSpam && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-start gap-2">
              <span className="text-red-600">🚫</span>
              <div className="text-sm text-red-800">
                <p className="font-medium">Content Flagged for Review</p>
                <p>Issues: {spamCheck.reasons.join(', ')}</p>
                {spamCheck.action === 'block' && (
                  <p className="font-medium mt-1">This content cannot be submitted.</p>
                )}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contribution Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contribution Type *
            </label>
            <div className="grid grid-cols-1 gap-2">
              {CONTRIBUTION_TYPES.map((type) => (
                <label key={type.value} className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value={type.value}
                    checked={formData.type === type.value}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">{type.label}</div>
                    <div className="text-sm text-gray-600">{type.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="form-field"
              placeholder="Brief, descriptive title for your contribution"
              required
              aria-describedby="title-error"
            />
          </div>

          {/* Author Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="form-field"
                placeholder="Your full name"
                required
                aria-describedby="author-error"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email (optional)
              </label>
              <input
                type="email"
                value={formData.authorEmail}
                onChange={(e) => setFormData({ ...formData, authorEmail: e.target.value })}
                className="form-field"
                placeholder="your.email@example.com"
                aria-describedby="email-error"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (up to 5) - Help categorize your contribution
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {COMMON_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    formData.tags.includes(tag)
                      ? "bg-blue-100 text-blue-700 border border-blue-300"
                      : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                className="form-field text-sm"
                placeholder="Add custom tag..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomTag())}
                aria-label="Add custom tag"
              />
              <button
                type="button"
                onClick={handleAddCustomTag}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
              >
                Add
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                Selected: {formData.tags.join(", ")}
              </div>
            )}
          </div>

          {/* File URL */}
          {(formData.type === "document" || formData.type === "design" || formData.type === "data") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                File URL (optional)
              </label>
              <input
                type="url"
                value={formData.fileUrl}
                onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                className="form-field"
                placeholder="https://example.com/your-file.pdf"
                aria-describedby="file-url-help"
              />
              <p id="file-url-help" className="text-xs text-gray-500 mt-1">
                Share a link to your document, design, or data file
              </p>
            </div>
          )}

          {/* Content */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {showPreview ? 'Edit' : 'Preview'}
              </button>
            </div>
            
            {showPreview ? (
              <div className="border border-gray-300 rounded-md p-3 h-32 bg-gray-50 overflow-y-auto">
                <div className="prose prose-sm">
                  <div dangerouslySetInnerHTML={{ 
                    __html: createSafeDisplay(formData.content) 
                  }} />
                </div>
              </div>
            ) : (
              <textarea
                value={formData.content}
                onChange={(e) => handleContentChange(e.target.value)}
                className="form-field h-32 resize-y"
                placeholder="Describe your contribution in detail. What problem does it solve? How does it work?"
                required
                aria-describedby="content-help"
              />
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={isSubmitting || spamCheck?.action === 'block'}
            >
              {isSubmitting ? "Submitting..." : "Submit Contribution"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

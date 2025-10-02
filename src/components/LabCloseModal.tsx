"use client";
import { useState } from "react";
import { LabCloseBanner } from '@/components/archiving/CloseBanner';

interface LabCloseModalProps {
  labId: string;
  labTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function LabCloseModal({ labId, labTitle, isOpen, onClose, onSuccess }: LabCloseModalProps) {
  const [formData, setFormData] = useState({
    decisions: [] as string[],
    nextSteps: [] as string[],
    highlights: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newDecision, setNewDecision] = useState("");
  const [newNextStep, setNewNextStep] = useState("");
  const [newHighlight, setNewHighlight] = useState("");

  const addDecision = () => {
    if (newDecision.trim()) {
      setFormData({
        ...formData,
        decisions: [...formData.decisions, newDecision.trim()]
      });
      setNewDecision("");
    }
  };

  const addNextStep = () => {
    if (newNextStep.trim()) {
      setFormData({
        ...formData,
        nextSteps: [...formData.nextSteps, newNextStep.trim()]
      });
      setNewNextStep("");
    }
  };

  const addHighlight = () => {
    if (newHighlight.trim()) {
      setFormData({
        ...formData,
        highlights: [...formData.highlights, newHighlight.trim()]
      });
      setNewHighlight("");
    }
  };

  const removeDecision = (index: number) => {
    setFormData({
      ...formData,
      decisions: formData.decisions.filter((_, i) => i !== index)
    });
  };

  const removeNextStep = (index: number) => {
    setFormData({
      ...formData,
      nextSteps: formData.nextSteps.filter((_, i) => i !== index)
    });
  };

  const removeHighlight = (index: number) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/labs/${labId}/close`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onSuccess();
        onClose();
        setFormData({ decisions: [], nextSteps: [], highlights: [] });
      } else {
        const error = await response.text();
        alert(`Failed to close lab: ${error}`);
      }
    } catch (error) {
      console.error("Error closing lab:", error);
      alert("Failed to close lab. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Close Lab & Generate Report</h2>
            <p className="text-gray-600 text-sm mt-1">{labTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Decisions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Decisions Made
            </label>
            <div className="space-y-2">
              {formData.decisions.map((decision, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="flex-1">{decision}</span>
                  <button
                    type="button"
                    onClick={() => removeDecision(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newDecision}
                  onChange={(e) => setNewDecision(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md p-2 text-sm"
                  placeholder="Add a key decision..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDecision())}
                />
                <button
                  type="button"
                  onClick={addDecision}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Next Steps
            </label>
            <div className="space-y-2">
              {formData.nextSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="flex-1">{step}</span>
                  <button
                    type="button"
                    onClick={() => removeNextStep(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNextStep}
                  onChange={(e) => setNewNextStep(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md p-2 text-sm"
                  placeholder="Add a next step..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addNextStep())}
                />
                <button
                  type="button"
                  onClick={addNextStep}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discussion Highlights
            </label>
            <div className="space-y-2">
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="flex-1">{highlight}</span>
                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newHighlight}
                  onChange={(e) => setNewHighlight(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md p-2 text-sm"
                  placeholder="Add a discussion highlight..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                />
                <button
                  type="button"
                  onClick={addHighlight}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Archive Information */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-start gap-2">
              <span className="text-blue-600">📁</span>
              <div className="text-sm text-blue-800">
                <p className="font-medium">Archive Information</p>
                <p>This lab will be archived at <code>/archive/{labId}</code> with a comprehensive report including all contributions, decisions, and outcomes.</p>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <div className="flex items-start gap-2">
              <span className="text-yellow-600">⚠️</span>
              <div className="text-sm text-yellow-800">
                <p className="font-medium">This action cannot be undone.</p>
                <p>Closing the lab will generate a comprehensive report and archive all contributions. The lab will no longer accept new contributions.</p>
              </div>
            </div>
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
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Closing Lab..." : "Close Lab & Generate Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

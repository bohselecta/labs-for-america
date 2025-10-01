"use client";
import { useState } from "react";

export default function ColdCasesPage() {
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert("Case files uploaded successfully! A new Lab will be created for community review.");
    setIsUploading(false);
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Cold Case Vault</h1>
        <p className="text-gray-600 mt-1">
          Upload redacted documents, evidence packets, and case files for public community Labs.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Upload Form */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">Upload Case Files</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Case Files (PDF, Images, Documents)
              </label>
              <input 
                type="file" 
                multiple 
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="w-full border border-gray-300 rounded-md p-2"
                aria-label="Upload case files"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload redacted documents, photos, timelines, and evidence packets
              </p>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Case Title
              </label>
              <input 
                type="text" 
                placeholder="e.g., Unidentified Person 1987 - Doe Street"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Case Summary
              </label>
              <textarea 
                rows={4}
                placeholder="Brief description of the case, what information is needed, and how the community can help..."
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Contact Information
              </label>
              <input 
                type="text" 
                placeholder="Detective name, badge number, or tip line"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <button 
              type="submit"
              disabled={isUploading}
              className="w-full px-5 py-2.5 rounded-md bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50"
            >
              {isUploading ? "Uploading..." : "Publish as Community Lab"}
            </button>
          </form>
        </div>

        {/* Guidelines */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="font-semibold mb-3">📋 Upload Guidelines</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Redact all personal information (names, addresses, SSNs)</li>
              <li>• Remove sensitive investigative details</li>
              <li>• Include only information safe for public viewing</li>
              <li>• Provide clear instructions for community assistance</li>
              <li>• Include contact information for tips</li>
            </ul>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold mb-3">🔒 Privacy & Safety</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• All uploads are reviewed before publication</li>
              <li>• Community responses are monitored</li>
              <li>• Secure tip form available for sensitive information</li>
              <li>• Anonymous chat with PII filtering enabled</li>
              <li>• Heatmap data is clustered and jittered</li>
            </ul>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold mb-3">📊 Community Impact</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex justify-between">
                <span>Cases Published:</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span>Community Tips:</span>
                <span className="font-medium">47</span>
              </div>
              <div className="flex justify-between">
                <span>Cases Resolved:</span>
                <span className="font-medium">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Existing Cases */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Cold Cases</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">Unidentified Person 2009-A</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Found March 15, 2009 in Riverside Park
                </p>
                <div className="mt-2 flex gap-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                    Cold Case
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    Active
                  </span>
                </div>
              </div>
              <div className="text-2xl">📁</div>
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">Missing Person: Sarah Chen</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Last seen March 8, 2024
                </p>
                <div className="mt-2 flex gap-2">
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                    Missing Person
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    Active
                  </span>
                </div>
              </div>
              <div className="text-2xl">🔍</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

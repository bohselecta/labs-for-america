"use client";
import { useState, useEffect } from 'react';
import { CrisisToggle, CrisisBanner } from '@/components/justice/CrisisManagement';
import { CrisisMode } from '@/components/justice/CrisisManagement';

export default function JusticeCrisisAdmin() {
  const [currentCrisis, setCurrentCrisis] = useState<CrisisMode | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In real app, fetch current crisis state from API
    const fetchCrisisState = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        // For demo, no active crisis
        setCurrentCrisis(null);
      } catch (error) {
        console.error('Failed to fetch crisis state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCrisisState();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-96 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      {/* Crisis Banner */}
      <CrisisBanner 
        crisis={currentCrisis} 
        onDismiss={() => setCurrentCrisis(null)} 
      />
      
      {/* Crisis Toggle */}
      <CrisisToggle 
        currentCrisis={currentCrisis}
        onCrisisChange={setCurrentCrisis}
      />
      
      {/* Live Updates Configuration */}
      <div className="mt-8 card p-6">
        <h2 className="text-xl font-semibold mb-4">Live Updates Configuration</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Live Updates URL
            </label>
            <input
              type="url"
              className="form-field"
              placeholder="https://example.com/live-updates"
              defaultValue="/live"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Update Frequency (minutes)
            </label>
            <select className="form-field">
              <option value="5">Every 5 minutes</option>
              <option value="15">Every 15 minutes</option>
              <option value="30">Every 30 minutes</option>
              <option value="60">Every hour</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="auto-updates"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="auto-updates" className="ml-2 block text-sm text-gray-700">
              Enable automatic updates during crisis mode
            </label>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="mt-8 card p-6">
        <h2 className="text-xl font-semibold mb-4">Emergency Contacts</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Contact
              </label>
              <input
                type="text"
                className="form-field"
                placeholder="Emergency contact name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-field"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="form-field"
              placeholder="emergency@department.gov"
            />
          </div>
        </div>
      </div>

      {/* Crisis History */}
      <div className="mt-8 card p-6">
        <h2 className="text-xl font-semibold mb-4">Crisis History</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <div className="font-medium">Manhunt Mode</div>
              <div className="text-sm text-gray-600">Active Search in Progress</div>
            </div>
            <div className="text-sm text-gray-500">
              Dec 15, 2024 - Dec 16, 2024
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <div className="font-medium">Emergency Mode</div>
              <div className="text-sm text-gray-600">Community Safety Notice</div>
            </div>
            <div className="text-sm text-gray-500">
              Dec 10, 2024 - Dec 12, 2024
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
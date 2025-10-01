"use client";
import { useState } from "react";
import { prisma } from "@/lib/prisma";

export default function CrisisDashboard() {
  const [isActivating, setIsActivating] = useState<string | null>(null);

  async function activateCrisisMode(mode: "MANHUNT" | "EMERGENCY") {
    setIsActivating(mode);
    
    try {
      const res = await fetch("/api/crisis", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          mode,
          title: mode === "MANHUNT" ? "MANHUNT ACTIVE" : "EMERGENCY NOTICE",
          msg: mode === "MANHUNT" 
            ? "Do not approach. Call 911. Check shelters and churches for assistance."
            : "Community resources available. Use secure tip form for sensitive information."
        })
      });
      
      if (res.ok) {
        alert(`${mode === "MANHUNT" ? "Manhunt" : "Emergency"} mode activated successfully!`);
        window.location.reload();
      } else {
        alert("Failed to activate crisis mode. Please try again.");
      }
    } catch (error) {
      console.error("Crisis activation error:", error);
      alert("Error activating crisis mode. Please try again.");
    } finally {
      setIsActivating(null);
    }
  }

  async function deactivateCrisisMode() {
    setIsActivating("NORMAL");
    
    try {
      const res = await fetch("/api/crisis", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          mode: "NORMAL",
          title: "",
          msg: ""
        })
      });
      
      if (res.ok) {
        alert("Crisis mode deactivated. System returned to normal operations.");
        window.location.reload();
      } else {
        alert("Failed to deactivate crisis mode. Please try again.");
      }
    } catch (error) {
      console.error("Crisis deactivation error:", error);
      alert("Error deactivating crisis mode. Please try again.");
    } finally {
      setIsActivating(null);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Crisis Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Emergency response coordination and community communication tools.
        </p>
      </div>

      {/* Emergency Activation Buttons */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <div className="card p-6 border-2 border-red-200">
          <div className="text-center">
            <div className="text-4xl mb-4">🚨</div>
            <h2 className="text-xl font-semibold text-red-700 mb-2">Manhunt Mode</h2>
            <p className="text-sm text-gray-600 mb-4">
              Activate when searching for a dangerous suspect. Opens public chat with pre-moderation.
            </p>
            <button 
              onClick={() => activateCrisisMode("MANHUNT")}
              disabled={isActivating !== null}
              className="w-full px-6 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isActivating === "MANHUNT" ? "Activating..." : "🚨 Activate Manhunt Mode"}
            </button>
          </div>
        </div>

        <div className="card p-6 border-2 border-amber-200">
          <div className="text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-amber-700 mb-2">Emergency Notice</h2>
            <p className="text-sm text-gray-600 mb-4">
              Activate for community emergencies, disasters, or public safety alerts.
            </p>
            <button 
              onClick={() => activateCrisisMode("EMERGENCY")}
              disabled={isActivating !== null}
              className="w-full px-6 py-4 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isActivating === "EMERGENCY" ? "Activating..." : "⚠️ Activate Emergency Notice"}
            </button>
          </div>
        </div>
      </div>

      {/* Deactivate Button */}
      <div className="text-center mb-8">
        <button 
          onClick={deactivateCrisisMode}
          disabled={isActivating !== null}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isActivating === "NORMAL" ? "Deactivating..." : "Return to Normal Operations"}
        </button>
      </div>

      {/* Crisis Features */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h3 className="font-semibold mb-3">📱 Public Chat Features</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Anonymous community coordination</li>
            <li>• PII filtering (phone numbers, addresses)</li>
            <li>• Rate limiting (5-second cooldown)</li>
            <li>• Pre-moderation during crisis modes</li>
            <li>• Real-time message updates</li>
          </ul>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold mb-3">🔒 Secure Tip Form</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Confidential information channel</li>
            <li>• Separate from public chat</li>
            <li>• Direct to law enforcement</li>
            <li>• IP logging for safety</li>
            <li>• Available 24/7</li>
          </ul>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold mb-3">🗺️ Heatmap Data</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Privacy-aware location clustering</li>
            <li>• Jittered coordinates (not exact)</li>
            <li>• AI-consumable format</li>
            <li>• Real-time updates</li>
            <li>• Community activity visualization</li>
          </ul>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold mb-3">📊 Crisis Analytics</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Message volume tracking</li>
            <li>• Response time metrics</li>
            <li>• Community engagement levels</li>
            <li>• Tip submission rates</li>
            <li>• Geographic activity patterns</li>
          </ul>
        </div>
      </div>

      {/* Current Status */}
      <div className="mt-8 card p-6">
        <h3 className="font-semibold mb-4">Current System Status</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">Normal</div>
            <div className="text-sm text-gray-600">Crisis Mode</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">23</div>
            <div className="text-sm text-gray-600">Active Chat Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">7</div>
            <div className="text-sm text-gray-600">Secure Tips Today</div>
          </div>
        </div>
      </div>
    </main>
  );
}

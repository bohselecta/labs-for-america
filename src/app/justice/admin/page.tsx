import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function JusticeDashboard() {
  // Handle case where database is not available (e.g., during build)
  let org: { preset: "CITY" | "PD" | "FIRE" | "COUNTY" } | null = null;
  
  if (prisma) {
    try {
      org = await prisma.org.findFirst({
        where: { slug: "city" }
      });
    } catch (error) {
      console.warn("Database not available:", error);
    }
  }

  const preset = org?.preset || "PD";
  const presetName = preset === "PD" ? "Police Department" : 
                    preset === "FIRE" ? "Fire Department" :
                    preset === "COUNTY" ? "County Government" : "City";

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">JusticeLabs Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Law enforcement community engagement and case management
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500">Mode:</div>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {presetName}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Link 
          href="/justice/admin/crisis"
          className="card p-6 hover:shadow-lg transition cursor-pointer"
        >
          <div className="text-2xl mb-2">🚨</div>
          <h3 className="font-semibold">Crisis Modes</h3>
          <p className="text-sm text-gray-600 mt-1">
            Manhunt & Emergency coordination
          </p>
        </Link>

        <Link 
          href="/justice/admin/coldcases"
          className="card p-6 hover:shadow-lg transition cursor-pointer"
        >
          <div className="text-2xl mb-2">📁</div>
          <h3 className="font-semibold">Cold Case Vault</h3>
          <p className="text-sm text-gray-600 mt-1">
            Upload evidence & case files
          </p>
        </Link>

        <Link 
          href="/admin/labs"
          className="card p-6 hover:shadow-lg transition cursor-pointer"
        >
          <div className="text-2xl mb-2">🔍</div>
          <h3 className="font-semibold">Labs Management</h3>
          <p className="text-sm text-gray-600 mt-1">
            Create & manage community Labs
          </p>
        </Link>

        <Link 
          href="/justice/admin/analytics"
          className="card p-6 hover:shadow-lg transition cursor-pointer"
        >
          <div className="text-2xl mb-2">📊</div>
          <h3 className="font-semibold">Community Analytics</h3>
          <p className="text-sm text-gray-600 mt-1">
            Heatmap & engagement data
          </p>
        </Link>
      </div>

      {/* Active Labs */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Active Justice Labs</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">Unidentified Person 2009-A</div>
                <div className="text-sm text-gray-600">Cold Case • Rolling</div>
              </div>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                Justice
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">Missing Person: Sarah Chen</div>
                <div className="text-sm text-gray-600">Active Case • Rolling</div>
              </div>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                Justice
              </span>
            </div>
          </div>
          <Link 
            href="/admin/labs"
            className="block mt-4 text-blue-600 hover:text-blue-500 text-sm"
          >
            View all Labs →
          </Link>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Community Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Public Chat Messages</span>
              <span className="font-medium">23</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Secure Tips Received</span>
              <span className="font-medium">7</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Heatmap Points</span>
              <span className="font-medium">156</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Crisis Mode</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                Normal
              </span>
            </div>
          </div>
          <Link 
            href="/justice/admin/analytics"
            className="block mt-4 text-blue-600 hover:text-blue-500 text-sm"
          >
            View detailed analytics →
          </Link>
        </div>
      </div>
    </main>
  );
}

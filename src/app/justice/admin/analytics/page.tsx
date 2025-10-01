export default function AnalyticsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Community Analytics</h1>
        <p className="text-gray-600 mt-1">
          Real-time community engagement data and activity patterns.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* Key Metrics */}
        <div className="card p-6">
          <h3 className="font-semibold mb-3">📊 Activity Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Chat Messages (24h)</span>
              <span className="font-medium">47</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Secure Tips</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Heatmap Points</span>
              <span className="font-medium">234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Active Users</span>
              <span className="font-medium">18</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold mb-3">🗺️ Geographic Activity</h3>
          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-2xl mb-2">🗺️</div>
              <div className="text-sm">Heatmap Visualization</div>
              <div className="text-xs mt-1">Clustered & Privacy-Safe</div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold mb-3">📈 Engagement Trends</h3>
          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-2xl mb-2">📈</div>
              <div className="text-sm">Activity Chart</div>
              <div className="text-xs mt-1">Last 7 Days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="font-semibold mb-4">🔍 Keyword Analysis</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">&ldquo;shelter&rdquo;</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
                <span className="text-xs text-gray-500">23</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">&ldquo;church&rdquo;</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "70%" }}></div>
                </div>
                <span className="text-xs text-gray-500">19</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">&ldquo;help&rdquo;</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
                <span className="text-xs text-gray-500">16</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">&ldquo;safe&rdquo;</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                </div>
                <span className="text-xs text-gray-500">12</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            * Keywords are scrubbed for PII and personal information
          </p>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold mb-4">⏰ Peak Activity Times</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">6:00 PM - 8:00 PM</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                </div>
                <span className="text-xs text-gray-500">Peak</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">12:00 PM - 2:00 PM</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>
                <span className="text-xs text-gray-500">High</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">9:00 AM - 11:00 AM</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                </div>
                <span className="text-xs text-gray-500">Medium</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">10:00 PM - 6:00 AM</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-400 h-2 rounded-full" style={{ width: "20%" }}></div>
                </div>
                <span className="text-xs text-gray-500">Low</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Integration */}
      <div className="mt-8 card p-6">
        <h3 className="font-semibold mb-4">🤖 AI Integration Ready</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h4 className="font-medium mb-2">Available Data Feeds</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <code>/api/heatmap</code> - Privacy-safe location clusters</li>
              <li>• <code>/api/chat</code> - Filtered community messages</li>
              <li>• <code>/api/tips</code> - Secure tip submissions</li>
              <li>• <code>/api/labs</code> - Active community challenges</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">AI Use Cases</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Pattern recognition in community reports</li>
              <li>• Automated threat assessment</li>
              <li>• Resource allocation optimization</li>
              <li>• Predictive analytics for emergency response</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="mt-6 text-center">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-500">
          Export Analytics Data
        </button>
        <p className="text-xs text-gray-500 mt-2">
          All data is anonymized and privacy-compliant
        </p>
      </div>
    </main>
  );
}

"use client";
import { useState, useEffect } from "react";
import { TEMPLATE_CONFIGS, TemplateKey } from "@/lib/template-configs";
import { STATUS_STYLES } from "@/lib/status-styles";
import Link from "next/link";

type FilterType = "all" | "open" | "upcoming" | "closed";
type SortType = "deadline" | "prize" | "title";

export default function BrowsePage() {
  const [currentTemplate, setCurrentTemplate] = useState<TemplateKey>("civic");
  const [isClient, setIsClient] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortType>("deadline");
  const [selectedLabs, setSelectedLabs] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedTemplate = localStorage.getItem("dev-template") as TemplateKey;
    if (savedTemplate && TEMPLATE_CONFIGS[savedTemplate]) {
      setCurrentTemplate(savedTemplate);
    }
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  const config = TEMPLATE_CONFIGS[currentTemplate];
  const allLabs = config.sampleLabs;

  // Filter and sort labs
  const filteredLabs = allLabs
    .filter(lab => {
      if (activeFilter === "all") return true;
      return lab.status === activeFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "deadline":
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case "prize":
          return b.prize - a.prize;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const handleLabSelect = (labSlug: string) => {
    if (selectedLabs.includes(labSlug)) {
      setSelectedLabs(selectedLabs.filter(slug => slug !== labSlug));
    } else if (selectedLabs.length < 3) {
      setSelectedLabs([...selectedLabs, labSlug]);
    }
  };

  const selectedLabData = filteredLabs.filter(lab => selectedLabs.includes(lab.slug));

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold font-headline mb-2">
          {config.name} Challenges
        </h1>
        <p className="text-gray-600 font-body">
          Browse all active challenges from {config.orgName}. Click any challenge to learn more and contribute.
        </p>
      </div>

      {/* Filters and Controls */}
      <div className="mb-8 space-y-4">
        {/* Filter Tabs */}
        <div className="flex gap-2 border-b border-gray-200">
          {(["all", "open", "upcoming", "closed"] as FilterType[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeFilter === filter
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 hover:text-gray-700 border-transparent"
              }`}
            >
              {filter === "all" ? "All Challenges" : filter.charAt(0).toUpperCase() + filter.slice(1)}
              <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {filter === "all" ? allLabs.length : allLabs.filter(lab => lab.status === filter).length}
              </span>
            </button>
          ))}
        </div>

        {/* Sort and Compare Controls */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="deadline">Deadline</option>
              <option value="prize">Prize Amount</option>
              <option value="title">Title</option>
            </select>
          </div>

          {selectedLabs.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                {selectedLabs.length} selected
              </span>
              <button
                onClick={() => setShowCompare(!showCompare)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
              >
                {showCompare ? "Hide" : "Compare"} Labs
              </button>
              <button
                onClick={() => setSelectedLabs([])}
                className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Compare Panel */}
      {showCompare && selectedLabData.length > 0 && (
        <div className="mb-8 p-6 bg-gray-50 rounded-xl border">
          <h3 className="text-lg font-semibold mb-4">Compare Selected Labs</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {selectedLabData.map((lab) => {
              const deadline = new Date(lab.deadline);
              const daysLeft = Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <div key={lab.slug} className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2">{lab.title}</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div><strong>Category:</strong> {lab.category}</div>
                    <div><strong>Status:</strong> {lab.status}</div>
                    <div><strong>Prize:</strong> {lab.prize > 0 ? `$${lab.prize.toLocaleString()}` : "Recognition"}</div>
                    <div><strong>Deadline:</strong> {deadline.toLocaleDateString()}</div>
                    <div><strong>Days Left:</strong> {daysLeft > 0 ? daysLeft : "Overdue"}</div>
                    <div><strong>Beginner:</strong> {lab.isBeginner ? "Yes" : "No"}</div>
                  </div>
                  <Link
                    href={`/labs/${lab.slug}`}
                    className="block mt-3 text-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Challenges Grid */}
      {filteredLabs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLabs.map((lab) => {
            const deadline = new Date(lab.deadline);
            const daysLeft = Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            const isSelected = selectedLabs.includes(lab.slug);
            
            return (
              <div
                key={lab.slug}
                className={`card p-6 hover:shadow-lg transition cursor-pointer relative ${
                  isSelected ? "ring-2 ring-blue-500 bg-blue-50" : ""
                }`}
                onClick={() => handleLabSelect(lab.slug)}
              >
                {/* Selection Checkbox */}
                <div className="absolute top-4 right-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleLabSelect(lab.slug)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {lab.category}
                  </span>
                  <span className={`text-sm px-2 py-1 rounded ${STATUS_STYLES[lab.status as keyof typeof STATUS_STYLES] || STATUS_STYLES.closed}`}>
                    {lab.status}
                  </span>
                  {lab.isBeginner && (
                    <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                      No experience required
                    </span>
                  )}
                  {daysLeft > 0 && daysLeft <= 7 && (
                    <span className="text-sm bg-orange-100 text-orange-700 px-2 py-1 rounded">
                      Ends soon
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold font-headline mb-2 pr-8">{lab.title}</h3>
                <p className="text-sm text-gray-600 font-body mb-4 line-clamp-3">
                  {lab.summary}
                </p>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="font-medium">
                    {lab.prize > 0 ? `Prize $${lab.prize.toLocaleString()}` : "Recognition"}
                  </span>
                  <span>Due {deadline.toLocaleDateString()}</span>
                </div>

                {/* Quick Action Button */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link
                    href={`/labs/${lab.slug}`}
                    className="block w-full text-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Challenge
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Enhanced Empty State */
        <div className="text-center py-16">
          <div className="text-gray-400 mb-6">
            <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No {activeFilter === "all" ? "" : activeFilter} challenges found
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {activeFilter === "all" 
              ? "No challenges are currently available. Check back later for new opportunities from " + config.orgName + "."
              : `No ${activeFilter} challenges at the moment. Try selecting "All Challenges" to see what's available.`
            }
          </p>
          <div className="flex justify-center gap-3">
            {activeFilter !== "all" && (
              <button
                onClick={() => setActiveFilter("all")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                View All Challenges
              </button>
            )}
            <Link
              href="/"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Back to Home
            </Link>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-12 p-6 bg-blue-50 rounded-xl">
        <h2 className="text-lg font-semibold mb-2">About {config.name}</h2>
        <p className="text-gray-600 text-sm">
          {config.description}. This template is designed for organizations like {config.orgName} 
          to engage their community in collaborative problem-solving.
        </p>
      </div>
    </main>
  );
}
"use client";
import { useState, useEffect } from "react";
import { TEMPLATE_CONFIGS, TemplateKey } from "@/lib/template-configs";
import Link from "next/link";

export default function BrowsePage() {
  const [currentTemplate, setCurrentTemplate] = useState<TemplateKey>("civic");
  const [isClient, setIsClient] = useState(false);

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

      {/* Filter Tabs */}
      <div className="mb-8">
        <div className="flex gap-2 border-b border-gray-200">
          <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
            All Challenges
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
            Open
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
            Upcoming
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
            Closed
          </button>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allLabs.map((lab) => (
          <Link
            key={lab.slug}
            href={`/labs/${lab.slug}`}
            className="card p-6 hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                {lab.category}
              </span>
              <span className={`text-sm px-2 py-1 rounded ${
                lab.status === "open" 
                  ? "bg-green-100 text-green-700" 
                  : lab.status === "upcoming"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
              }`}>
                {lab.status}
              </span>
              {lab.isBeginner && (
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                  Beginner
                </span>
              )}
            </div>
            
            <h3 className="text-lg font-semibold font-headline mb-2">{lab.title}</h3>
            <p className="text-sm text-gray-600 font-body mb-4 line-clamp-3">
              {lab.summary}
            </p>
            
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span className="font-medium">
                {lab.prize > 0 ? `Prize $${lab.prize.toLocaleString()}` : "Recognition"}
              </span>
              <span>Due {lab.deadline.toLocaleDateString()}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {allLabs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No challenges available</div>
          <p className="text-gray-400 mt-2">
            Check back later for new challenges from {config.orgName}.
          </p>
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
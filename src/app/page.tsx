"use client";
import { useState, useEffect } from "react";
import { TEMPLATE_CONFIGS, TemplateKey } from "@/lib/template-configs";
import Link from "next/link";
import { CardSkeleton, HeroSkeleton } from "@/components/LoadingSkeletons";

export default function Home() {
  const [currentTemplate, setCurrentTemplate] = useState<TemplateKey>("civic");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load template from localStorage
    const savedTemplate = localStorage.getItem("dev-template") as TemplateKey;
    if (savedTemplate && TEMPLATE_CONFIGS[savedTemplate]) {
      setCurrentTemplate(savedTemplate);
    }
  }, []);

  if (!isClient) {
    return (
      <main>
        <HeroSkeleton />
        <section className="bg-gray-50 border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="text-center mb-12 animate-pulse">
              <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-4"></div>
              <div className="h-6 w-96 bg-gray-200 rounded mx-auto"></div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </div>
        </section>
      </main>
    );
  }

  const config = TEMPLATE_CONFIGS[currentTemplate];
  const sampleLabs = config.sampleLabs.slice(0, 3); // Show first 3 labs

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200 hero-gradient">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 grid md:grid-cols-2 gap-10">
          <div className="py-8 md:py-12">
            <h1 className="text-3xl md:text-4xl font-semibold font-headline">
              Welcome to <span className="text-blue-600">{config.name}</span>
            </h1>
            <p className="mt-2 text-lg text-gray-600 font-body">
              Sister sites for civic life. Free, open-source portals where communities build together.
            </p>
            <p className="mt-4 text-lg text-gray-700 font-body">
              {config.description}
            </p>
            <p className="mt-3 text-gray-600 font-body">
              Join {config.orgName} in solving community challenges through collaborative innovation.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link 
                href="/browse" 
                className="px-6 py-3 rounded-md btn-primary hover:bg-blue-500 text-center"
              >
                Browse Active Challenges
              </Link>
              <Link 
                href="#how-it-works" 
                className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 font-body text-center"
              >
                How it works →
              </Link>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 h-64 relative overflow-hidden constellation-bg">
            <Image 
              src="/images/hero-civic-skyline.png" 
              alt="Community collaboration and civic engagement"
              fill
              priority
              className="object-cover rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Active Challenges Section */}
      <section className="bg-gray-50 border-b border-gray-200 constellation-bg">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold font-headline mb-4">
              Active Challenges
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              Current challenges from {config.orgName}. Click any challenge to learn more and contribute.
            </p>
          </div>
          
          {sampleLabs.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleLabs.map((lab) => {
                const deadline = new Date(lab.deadline);
                const daysLeft = Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <Link
                    key={lab.slug}
                    href={`/labs/${lab.slug}`}
                    className="card p-6 hover:shadow-lg transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {lab.category}
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
                      {daysLeft <= 0 && (
                        <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded">
                          Overdue
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
                      <span>{deadline.toLocaleDateString()}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No active challenges right now</h3>
              <p className="text-gray-600 mb-4">Explore past Labs in the archive or follow us for updates.</p>
              <Link 
                href="/archive" 
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                See past Labs
              </Link>
            </div>
          )}
          
          {sampleLabs.length > 0 && (
            <div className="text-center mt-8">
              <Link 
                href="/browse" 
                className="px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-medium"
              >
                View All Challenges
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl font-semibold font-headline mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 font-body mb-8">
            Simple, transparent, and community-driven problem solving.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="card p-6">
              <div className="text-2xl mb-3">💡</div>
              <h3 className="font-semibold text-lg mb-2 font-headline">Submit Ideas</h3>
              <p className="text-gray-600 text-sm font-body">
                Share your solutions, documents, or designs. Everything gets proper attribution.
              </p>
            </div>
            
            <div className="card p-6">
              <div className="text-2xl mb-3">🗳️</div>
              <h3 className="font-semibold text-lg mb-2 font-headline">Community Review</h3>
              <p className="text-gray-600 text-sm font-body">
                Vote on contributions, add comments, and help refine the best ideas.
              </p>
            </div>
            
            <div className="card p-6">
              <div className="text-2xl mb-3">📋</div>
              <h3 className="font-semibold text-lg mb-2 font-headline">Generate Reports</h3>
              <p className="text-gray-600 text-sm font-body">
                When Labs close, we automatically create comprehensive reports for your records.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Template Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl font-semibold font-headline mb-4">
            About {config.name}
          </h2>
          <p className="text-lg text-gray-600 font-body mb-8">
            {config.description}
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-2 font-headline">Community Focus</h3>
              <p className="text-gray-600 text-sm font-body">
                Designed specifically for {config.orgName} and similar organizations.
              </p>
            </div>
            
            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-2 font-headline">Collaborative Innovation</h3>
              <p className="text-gray-600 text-sm font-body">
                Bring together community members, experts, and stakeholders to solve real challenges.
              </p>
            </div>
            
            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-2 font-headline">Measurable Impact</h3>
              <p className="text-gray-600 text-sm font-body">
                Track contributions, generate reports, and build institutional memory.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
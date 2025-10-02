"use client";
import { useState, useEffect } from "react";
import { TEMPLATE_CONFIGS, TemplateKey } from "@/lib/template-configs";
import Link from "next/link";
import { CardSkeleton, HeroSkeleton } from "@/components/LoadingSkeletons";
import { Icon } from "@/components/icons";
import { HoverLift, ScrollReveal, StaggeredReveal } from "@/components/micro-interactions";

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
      <ScrollReveal>
        <section className="bg-white border-b border-gray-200 hero-gradient section-rhythm">
          <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-10">
            <div className="py-8 md:py-12 visual-hierarchy">
              <h1 className="text-3xl md:text-4xl font-semibold font-headline text-balance">
                Welcome to <span className="text-blue-600">{config.name}</span>
              </h1>
              <p className="mt-2 text-lg text-gray-600 font-body text-pretty">
                Sister sites for civic life. Free, open-source portals where communities build together.
              </p>
              <p className="mt-4 text-lg text-gray-700 font-body text-pretty">
                {config.description}
              </p>
              <p className="mt-3 text-gray-600 font-body text-pretty">
                Join {config.orgName} in solving community challenges through collaborative innovation.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <HoverLift>
                  <Link 
                    href="/browse" 
                    className="px-6 py-3 rounded-md btn-primary btn-enhanced text-center focus-enhanced"
                  >
                    <Icon name="civic" size="sm" className="inline mr-2" />
                    Browse Active Challenges
                  </Link>
                </HoverLift>
                <HoverLift>
                  <Link 
                    href="#how-it-works" 
                    className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 font-body text-center focus-enhanced link-enhanced"
                  >
                    How it works <Icon name="chevron-right" size="sm" className="inline ml-1" />
                  </Link>
                </HoverLift>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 h-64 relative overflow-hidden constellation-bg card-enhanced">
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
      </ScrollReveal>

      {/* Active Challenges Section */}
      <ScrollReveal>
        <section className="bg-gray-50 border-b border-gray-200 constellation-bg section-rhythm">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12 visual-hierarchy">
              <h2 className="text-2xl md:text-3xl font-semibold font-headline mb-4 text-balance">
                Active Challenges
              </h2>
              <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto text-pretty">
                Current challenges from {config.orgName}. Click any challenge to learn more and contribute.
              </p>
            </div>
          
          {sampleLabs.length > 0 ? (
            <StaggeredReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 grid-rhythm">
              {sampleLabs.map((lab) => {
                const deadline = new Date(lab.deadline);
                const daysLeft = Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <HoverLift key={lab.slug}>
                    <Link
                      href={`/labs/${lab.slug}`}
                      className="card card-enhanced p-6 cursor-pointer focus-enhanced"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded badge-enhanced">
                          <Icon name="civic" size="xs" className="inline mr-1" />
                          {lab.category}
                        </span>
                        {lab.isBeginner && (
                          <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded badge-enhanced">
                            <Icon name="award" size="xs" className="inline mr-1" />
                            No experience required
                          </span>
                        )}
                        {daysLeft > 0 && daysLeft <= 7 && (
                          <span className="text-sm bg-orange-100 text-orange-700 px-2 py-1 rounded badge-enhanced">
                            <Icon name="clock" size="xs" className="inline mr-1" />
                            Ends soon
                          </span>
                        )}
                        {daysLeft <= 0 && (
                          <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded badge-enhanced">
                            <Icon name="status-closed" size="xs" className="inline mr-1" />
                            Overdue
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-semibold font-headline mb-2 text-balance">{lab.title}</h3>
                      <p className="text-sm text-gray-600 font-body mb-4 line-clamp-3 text-pretty">
                        {lab.summary}
                      </p>
                      
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span className="font-medium flex items-center gap-1">
                          <Icon name="award" size="xs" />
                          {lab.prize > 0 ? `Prize $${lab.prize.toLocaleString()}` : "Recognition"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="calendar" size="xs" />
                          {deadline.toLocaleDateString()}
                        </span>
                      </div>
                    </Link>
                  </HoverLift>
                );
              })}
            </StaggeredReveal>
          ) : (
            <ScrollReveal>
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Icon name="civic" size="xl" className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2 text-balance">No active challenges right now</h3>
                <p className="text-gray-600 mb-4 text-pretty">Explore past Labs in the archive or follow us for updates.</p>
                <HoverLift>
                  <Link 
                    href="/archive" 
                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 btn-enhanced focus-enhanced"
                  >
                    <Icon name="chevron-right" size="sm" className="inline mr-1" />
                    See past Labs
                  </Link>
                </HoverLift>
              </div>
            </ScrollReveal>
          )}
          
          {sampleLabs.length > 0 && (
            <ScrollReveal>
              <div className="text-center mt-8">
                <HoverLift>
                  <Link 
                    href="/browse" 
                    className="px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-medium btn-enhanced focus-enhanced"
                  >
                    <Icon name="chevron-right" size="sm" className="inline mr-1" />
                    View All Challenges
                  </Link>
                </HoverLift>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <ScrollReveal>
        <section id="how-it-works" className="py-16 bg-white section-rhythm">
          <div className="mx-auto max-w-4xl px-6 text-center visual-hierarchy">
            <h2 className="text-2xl font-semibold font-headline mb-4 text-balance">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 font-body mb-8 text-pretty">
              Simple, transparent, and community-driven problem solving.
            </p>
            
            <StaggeredReveal className="grid md:grid-cols-3 gap-6 text-left grid-rhythm">
              <HoverLift>
                <div className="card card-enhanced p-6">
                  <div className="text-2xl mb-3">
                    <Icon name="innovation" size="lg" className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 font-headline text-balance">Submit Ideas</h3>
                  <p className="text-gray-600 text-sm font-body text-pretty">
                    Share your solutions, documents, or designs. Everything gets proper attribution.
                  </p>
                </div>
              </HoverLift>
              
              <HoverLift>
                <div className="card card-enhanced p-6">
                  <div className="text-2xl mb-3">
                    <Icon name="vote" size="lg" className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 font-headline text-balance">Community Review</h3>
                  <p className="text-gray-600 text-sm font-body text-pretty">
                    Vote on contributions, add comments, and help refine the best ideas.
                  </p>
                </div>
              </HoverLift>
              
              <HoverLift>
                <div className="card card-enhanced p-6">
                  <div className="text-2xl mb-3">
                    <Icon name="democracy" size="lg" className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 font-headline text-balance">Generate Reports</h3>
                  <p className="text-gray-600 text-sm font-body text-pretty">
                    When Labs close, we automatically create comprehensive reports for your records.
                  </p>
                </div>
              </HoverLift>
            </StaggeredReveal>
          </div>
        </section>
      </ScrollReveal>

      {/* Template Info Section */}
      <ScrollReveal>
        <section className="py-16 bg-gray-50 section-rhythm">
          <div className="mx-auto max-w-4xl px-6 text-center visual-hierarchy">
            <h2 className="text-2xl font-semibold font-headline mb-4 text-balance">
              About {config.name}
            </h2>
            <p className="text-lg text-gray-600 font-body mb-8 text-pretty">
              {config.description}
            </p>
            
            <StaggeredReveal className="grid md:grid-cols-3 gap-6 text-left grid-rhythm">
              <HoverLift>
                <div className="card card-enhanced p-6">
                  <div className="text-2xl mb-3">
                    <Icon name="community" size="lg" className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 font-headline text-balance">Community Focus</h3>
                  <p className="text-gray-600 text-sm font-body text-pretty">
                    Designed specifically for {config.orgName} and similar organizations.
                  </p>
                </div>
              </HoverLift>
              
              <HoverLift>
                <div className="card card-enhanced p-6">
                  <div className="text-2xl mb-3">
                    <Icon name="collaboration" size="lg" className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 font-headline text-balance">Collaborative Innovation</h3>
                  <p className="text-gray-600 text-sm font-body text-pretty">
                    Bring together community members, experts, and stakeholders to solve real challenges.
                  </p>
                </div>
              </HoverLift>
              
              <HoverLift>
                <div className="card card-enhanced p-6">
                  <div className="text-2xl mb-3">
                    <Icon name="impact" size="lg" className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 font-headline text-balance">Measurable Impact</h3>
                  <p className="text-gray-600 text-sm font-body text-pretty">
                    Track contributions, generate reports, and build institutional memory.
                  </p>
                </div>
              </HoverLift>
            </StaggeredReveal>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
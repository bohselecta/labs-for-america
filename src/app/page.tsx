"use client";
import { useState, useEffect } from "react";
import { TEMPLATE_CONFIGS, TemplateKey } from "@/lib/template-configs";
import Link from "next/link";
import Image from "next/image";
import { CardSkeleton, HeroSkeleton } from "@/components/LoadingStates";
import { LineClamp } from "@/components/LineClamp";
import { StatusBadge } from "@/lib/status-colors";
import { Icon } from "@/components/icons";
import { HoverLift, ScrollReveal, StaggeredReveal } from "@/components/micro-interactions";
import { ImpactCallout, QuickImpactCallout } from "@/components/ImpactCallout";
import { ResourcesBox, CompactResources } from "@/components/ResourcesBox";
import { BeginnerSection, QuickExplanation, StepGuide } from "@/components/BeginnerFriendly";

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
              
              {/* Impact Callout */}
              <div className="mt-6">
                <ImpactCallout type="community" />
              </div>
              
              {/* Quick Resources */}
              <div className="mt-4">
                <CompactResources context="gettingStarted" />
              </div>
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
              
              {/* Beginner-friendly explanation */}
              <div className="mt-6 max-w-2xl mx-auto">
                <BeginnerSection title="New to Labs? Here's how it works:">
                  <p className="mb-2">
                    A <strong>Lab</strong> is a community challenge where people work together to solve a problem. 
                    Anyone can participate by sharing ideas, voting on solutions, or helping refine proposals.
                  </p>
                  <p>
                    Contributing is easy: read the challenge, think about solutions, and share your ideas. 
                    You can also vote on other people's contributions and add helpful comments.
                  </p>
                </BeginnerSection>
              </div>
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
                          <QuickImpactCallout type="beginner">
                            No experience needed
                          </QuickImpactCallout>
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
      </ScrollReveal>

      {/* How It Works Section */}
      <ScrollReveal>
        <section id="how-it-works" className="py-16 bg-white section-rhythm">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center visual-hierarchy mb-12">
              <h2 className="text-2xl font-semibold font-headline mb-4 text-balance">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 font-body mb-8 text-pretty">
                Simple, transparent, and community-driven problem solving.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Step Guide */}
              <div>
                <StepGuide
                  title="Get Started in 3 Easy Steps"
                  steps={[
                    {
                      number: 1,
                      title: "Read the Challenge",
                      description: "Browse active Labs and find one that interests you. Read the details to understand what we're looking for.",
                      icon: "civic"
                    },
                    {
                      number: 2,
                      title: "Share Your Ideas",
                      description: "Submit your solutions, documents, or designs. You can also vote on other people's contributions.",
                      icon: "innovation"
                    },
                    {
                      number: 3,
                      title: "See the Impact",
                      description: "Watch as the community votes and experts review ideas. The best solutions get implemented.",
                      icon: "impact"
                    }
                  ]}
                />
              </div>
              
              {/* Resources */}
              <div>
                <ResourcesBox context="gettingStarted" title="Need Help Getting Started?" />
                <div className="mt-4">
                  <ResourcesBox context="community" title="Community Guidelines" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Template Info Section */}
      <ScrollReveal>
        <section className="py-16 bg-gray-50 section-rhythm">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center visual-hierarchy mb-12">
              <h2 className="text-2xl font-semibold font-headline mb-4 text-balance">
                About {config.name}
              </h2>
              <p className="text-lg text-gray-600 font-body mb-8 text-pretty">
                {config.description}
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Impact Callouts */}
              <div className="space-y-4">
                <ImpactCallout type="community" />
                <ImpactCallout type="government" />
                <ImpactCallout type="expert" />
              </div>
              
              {/* Quick Explanations */}
              <div className="space-y-4">
                <QuickExplanation term="whatIsLab" />
                <QuickExplanation term="whyParticipate" />
                <div className="mt-4">
                  <ResourcesBox context="technical" title="Technical Resources" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
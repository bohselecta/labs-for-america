"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CrisisBanner } from '@/components/justice/CrisisManagement';
import { CrisisMode } from '@/components/justice/CrisisManagement';
import { Icon } from '@/components/icons';
import { HoverLift, ScrollReveal, StaggeredReveal } from '@/components/micro-interactions';
import { ImpactCallout, QuickImpactCallout } from '@/components/ImpactCallout';
import { ResourcesBox, CompactResources } from '@/components/ResourcesBox';
import { BeginnerSection, QuickExplanation, StepGuide } from '@/components/BeginnerFriendly';

export default function JusticeLabsHome() {
  const [currentCrisis, setCurrentCrisis] = useState<CrisisMode | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // In real app, fetch current crisis state
    // For demo, no active crisis
  }, []);

  const justiceLabs = [
    {
      id: 'missing-person-sarah',
      title: 'Missing Person - Sarah Johnson',
      summary: 'Help us find Sarah Johnson, last seen March 13, 2019. Share any information about her disappearance.',
      category: 'Missing Person',
      status: 'open',
      deadline: '2025-03-13',
      prize: 0,
      isBeginner: true,
      isPublic: true
    },
    {
      id: 'downtown-homicide',
      title: 'Unsolved Homicide - Downtown District',
      summary: 'Investigation into unsolved homicide from July 2020. We need your help to solve this case.',
      category: 'Homicide',
      status: 'open',
      deadline: '2025-07-22',
      prize: 0,
      isBeginner: false,
      isPublic: true
    }
  ];

  const communityGuidelines = [
    'No PII in public posts — use /tips for sensitive info.',
    'Keep it factual; avoid speculation and accusations.',
    'Be respectful. Posts violating these rules may be limited.'
  ];

  return (
    <main>
      {/* Crisis Banner */}
      {isClient && (
        <CrisisBanner 
          crisis={currentCrisis} 
          onDismiss={() => setCurrentCrisis(null)} 
        />
      )}

      {/* Hero Section */}
      <ScrollReveal>
        <section className="bg-white border-b border-gray-200 hero-gradient section-rhythm">
          <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-10">
            <div className="py-8 md:py-12 visual-hierarchy">
              <h1 className="text-3xl md:text-4xl font-semibold font-headline text-balance">
                Welcome to <span className="text-blue-600">JusticeLabs</span>
              </h1>
              <p className="mt-2 text-lg text-gray-600 font-body text-pretty">
                A sister site for community safety — modern, respectful public collaboration with clear boundaries for privacy.
              </p>
              <p className="mt-4 text-lg text-gray-700 font-body text-pretty">
                Join our law enforcement team in solving cases through collaborative community engagement.
              </p>
              <p className="mt-3 text-gray-600 font-body text-pretty">
                Your contributions help solve cases and keep our community safe.
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
                    href="/justice/browse" 
                    className="px-6 py-3 rounded-md btn-primary btn-enhanced text-center focus-enhanced"
                  >
                    <Icon name="civic" size="sm" className="inline mr-2" />
                    Browse Active Cases
                  </Link>
                </HoverLift>
                <HoverLift>
                  <Link 
                    href="/tips" 
                    className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 font-body text-center focus-enhanced link-enhanced"
                  >
                    <Icon name="external-link" size="sm" className="inline mr-1" />
                    Submit Secure Tip
                  </Link>
                </HoverLift>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 h-64 relative overflow-hidden constellation-bg card-enhanced">
              <Image 
                src="/images/hero-justice-badge.png" 
                alt="Community safety and law enforcement collaboration"
                fill
                priority
                className="object-cover rounded-xl"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Active Cases Section */}
      <ScrollReveal>
        <section className="bg-gray-50 border-b border-gray-200 constellation-bg section-rhythm">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12 visual-hierarchy">
              <h2 className="text-2xl md:text-3xl font-semibold font-headline mb-4 text-balance">
                Active Cases
              </h2>
              <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto text-pretty">
                Current cases where community input is needed. Click any case to learn more and contribute.
              </p>
              
              {/* Beginner-friendly explanation */}
              <div className="mt-6 max-w-2xl mx-auto">
                <BeginnerSection title="How Community Input Helps:">
                  <p className="mb-2">
                    <strong>Community input</strong> is crucial for solving cases. Your observations, 
                    memories, and information can provide the missing pieces investigators need.
                  </p>
                  <p>
                    All contributions are reviewed by law enforcement professionals. 
                    Sensitive information should be submitted through our secure tip system.
                  </p>
                </BeginnerSection>
              </div>
            </div>
          
            {justiceLabs.length > 0 ? (
              <StaggeredReveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 grid-rhythm">
                {justiceLabs.map((lab) => (
                  <HoverLift key={lab.id}>
                    <Link 
                      href={`/justice/labs/${lab.id}`}
                      className="card card-enhanced p-6 block hover:shadow-lg transition-all focus-enhanced"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded">
                          {lab.category}
                        </span>
                        {lab.isBeginner && (
                          <QuickImpactCallout type="beginner">
                            Community Input Needed
                          </QuickImpactCallout>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold mb-2 font-headline text-balance">{lab.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 font-body text-pretty line-clamp-3">
                        {lab.summary}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Status: {lab.status}</span>
                        <span>Public Case</span>
                      </div>
                    </Link>
                  </HoverLift>
                ))}
              </StaggeredReveal>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Icon name="civic" size="xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No active cases</h3>
                <p className="text-gray-600 mb-4">Check back later for new cases that need community input.</p>
                <HoverLift>
                  <Link 
                    href="/tips" 
                    className="btn-primary"
                  >
                    Submit General Tip
                  </Link>
                </HoverLift>
              </div>
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
                Simple, secure, and respectful community collaboration for public safety.
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
                      title: "Review the Case",
                      description: "Read case details and understand what information is needed. All cases are public and safe to discuss.",
                      icon: "civic"
                    },
                    {
                      number: 2,
                      title: "Share Information",
                      description: "Submit your observations, memories, or information through our secure system. Sensitive info goes to /tips.",
                      icon: "innovation"
                    },
                    {
                      number: 3,
                      title: "Help Solve Cases",
                      description: "Your input helps investigators piece together evidence and solve cases that matter to our community.",
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

      {/* Community Guidelines Section */}
      <ScrollReveal>
        <section className="py-16 bg-gray-50 section-rhythm">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center visual-hierarchy mb-12">
              <h2 className="text-2xl font-semibold font-headline mb-4 text-balance">
                Community Guidelines
              </h2>
              <p className="text-lg text-gray-600 font-body mb-8 text-pretty">
                Quick rules to keep our community safe and respectful.
              </p>
            </div>
            
            <div className="card p-8">
              <h3 className="text-lg font-semibold mb-4">Community Guidelines (Quick)</h3>
              <ul className="space-y-3">
                {communityGuidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="chevron-right" size="sm" className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-body text-pretty">{guideline}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">For Sensitive Information</h4>
                <p className="text-sm text-blue-700 mb-2">
                  Use our secure tip system for sensitive information that shouldn&apos;t be public.
                </p>
                <HoverLift>
                  <Link 
                    href="/tips" 
                    className="btn-primary text-sm px-4 py-2"
                  >
                    Submit Secure Tip
                  </Link>
                </HoverLift>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Quick Explanation Section */}
      <ScrollReveal>
        <section className="py-16 bg-white section-rhythm">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center visual-hierarchy mb-12">
              <h2 className="text-2xl font-semibold font-headline mb-4 text-balance">
                Understanding JusticeLabs
              </h2>
              <p className="text-lg text-gray-600 font-body mb-8 text-pretty">
                Learn how community collaboration helps solve cases and keep our community safe.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <QuickExplanation term="whatIsLab" />
                <QuickExplanation term="whyParticipate" />
              </div>
              <div>
                <ResourcesBox context="technical" title="Technical Resources" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}

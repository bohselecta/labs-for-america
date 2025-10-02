"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/icons';
import { HoverLift, ScrollReveal, StaggeredReveal } from '@/components/micro-interactions';
import { ImpactCallout, QuickImpactCallout } from '@/components/ImpactCallout';
import { ResourcesBox, CompactResources } from '@/components/ResourcesBox';
import { BeginnerSection, QuickExplanation, StepGuide } from '@/components/BeginnerFriendly';

export default function HealthLabsHome() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const healthLabs = [
    {
      id: 'community-health-outreach',
      title: 'Community Health Outreach',
      summary: 'Connect with communities to understand health needs and provide resources for better health outcomes.',
      category: 'Outreach',
      status: 'open',
      deadline: '2025-03-15',
      prize: 0,
      isBeginner: true,
      participants: 25,
      resources: 12
    },
    {
      id: 'mental-health-resources',
      title: 'Mental Health Resource Design',
      summary: 'Create and improve mental health resources, materials, and tools for community use.',
      category: 'Resource Design',
      status: 'open',
      deadline: '2025-02-28',
      prize: 0,
      isBeginner: false,
      participants: 18,
      resources: 8
    },
    {
      id: 'health-data-analysis',
      title: 'Health Data Analysis Challenge',
      summary: 'Analyze community health data to identify patterns and opportunities for improvement.',
      category: 'Data Challenge',
      status: 'open',
      deadline: '2025-04-01',
      prize: 0,
      isBeginner: true,
      participants: 32,
      resources: 15
    }
  ];

  const communityGuidelines = [
    'Be respectful and constructive in all interactions.',
    'Avoid sharing others\' health details without permission.',
    'Use the Intake form for personal health stories.',
    'Focus on community health improvement and resource design.'
  ];

  return (
    <main>
      {/* Hero Section */}
      <ScrollReveal>
        <section className="bg-white border-b border-gray-200 hero-gradient section-rhythm">
          <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-10">
            <div className="py-8 md:py-12 visual-hierarchy">
              <h1 className="text-3xl md:text-4xl font-semibold font-headline text-balance">
                Welcome to <span className="text-blue-600">HealthLabs</span>
              </h1>
              <p className="mt-2 text-lg text-gray-600 font-body text-pretty">
                A sister site for community health — design resources and solutions together.
              </p>
              <p className="mt-4 text-lg text-gray-700 font-body text-pretty">
                Join collaborative health initiatives where communities work together to improve health outcomes and access to care.
              </p>
              <p className="mt-3 text-gray-600 font-body text-pretty">
                Share your health story, access resources, and help design better health programs for everyone.
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
                    href="/health/browse" 
                    className="px-6 py-3 rounded-md btn-primary btn-enhanced text-center focus-enhanced"
                  >
                    <Icon name="civic" size="sm" className="inline mr-2" />
                    Browse Health Programs
                  </Link>
                </HoverLift>
                <HoverLift>
                  <Link 
                    href="/health/intake" 
                    className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 font-body text-center focus-enhanced link-enhanced"
                  >
                    <Icon name="external-link" size="sm" className="inline mr-1" />
                    Share Your Story
                  </Link>
                </HoverLift>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 h-64 relative overflow-hidden constellation-bg card-enhanced">
              <Image 
                src="/images/hero-health-community.png" 
                alt="Community health collaboration and support"
                fill
                priority
                className="object-cover rounded-xl"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Active Programs Section */}
      <ScrollReveal>
        <section className="bg-gray-50 border-b border-gray-200 constellation-bg section-rhythm">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12 visual-hierarchy">
              <h2 className="text-2xl md:text-3xl font-semibold font-headline mb-4 text-balance">
                Active Health Programs
              </h2>
              <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto text-pretty">
                Join health initiatives focused on outreach, resource design, data analysis, and community feedback.
              </p>
              
              {/* Beginner-friendly explanation */}
              <div className="mt-6 max-w-2xl mx-auto">
                <BeginnerSection title="How Community Health Works:">
                  <p className="mb-2">
                    <strong>Community health</strong> is about understanding and addressing health needs together. 
                    Your input helps design better resources and programs.
                  </p>
                  <p>
                    Share your health story, access resources in multiple languages, and help improve 
                    health services for everyone in your community.
                  </p>
                </BeginnerSection>
              </div>
            </div>
          
            {healthLabs.length > 0 ? (
              <StaggeredReveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 grid-rhythm">
                {healthLabs.map((lab) => (
                  <HoverLift key={lab.id}>
                    <Link 
                      href={`/health/labs/${lab.id}`}
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
                        <span>{lab.participants} participants</span>
                        <span>{lab.resources} resources</span>
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
                <h3 className="text-lg font-medium text-gray-900 mb-2">No active programs</h3>
                <p className="text-gray-600 mb-4">Check back later for new health initiatives.</p>
                <HoverLift>
                  <Link 
                    href="/health/intake" 
                    className="btn-primary"
                  >
                    Share Your Story
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
                Collaborative health improvement through community input, resource design, and data analysis.
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
                      title: "Share Your Story",
                      description: "Use our intake form to share your health experiences and needs. Your story helps identify community health priorities.",
                      icon: "civic"
                    },
                    {
                      number: 2,
                      title: "Access Resources",
                      description: "Browse health resources in multiple languages and reading levels. Find materials that work for your community.",
                      icon: "innovation"
                    },
                    {
                      number: 3,
                      title: "Join Programs",
                      description: "Participate in health programs focused on outreach, resource design, or data analysis to improve community health.",
                      icon: "impact"
                    }
                  ]}
                />
              </div>
              
              {/* Resources */}
              <div>
                <ResourcesBox context="gettingStarted" title="Health Resources" />
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
                Guidelines to ensure a supportive, respectful environment for health discussions.
              </p>
            </div>
            
            <div className="card p-8">
              <h3 className="text-lg font-semibold mb-4">Health Community Guidelines</h3>
              <ul className="space-y-3">
                {communityGuidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="chevron-right" size="sm" className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-body text-pretty">{guideline}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Privacy & Safety</h4>
                <p className="text-sm text-blue-700 mb-2">
                  Your health information is protected and stored securely. Personal details are only shared with your consent.
                </p>
                <HoverLift>
                  <Link 
                    href="/health/privacy" 
                    className="btn-primary text-sm px-4 py-2"
                  >
                    Learn More
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
                Understanding HealthLabs
              </h2>
              <p className="text-lg text-gray-600 font-body mb-8 text-pretty">
                Learn how community collaboration helps improve health outcomes and access to care.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <QuickExplanation term="whatIsLab" />
                <QuickExplanation term="whyParticipate" />
              </div>
              <div>
                <ResourcesBox context="technical" title="Health Resources" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}

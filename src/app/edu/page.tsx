"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/icons';
import { HoverLift, ScrollReveal, StaggeredReveal } from '@/components/micro-interactions';
import { ImpactCallout, QuickImpactCallout } from '@/components/ImpactCallout';
import { ResourcesBox, CompactResources } from '@/components/ResourcesBox';
import { BeginnerSection, QuickExplanation, StepGuide } from '@/components/BeginnerFriendly';

export default function EduLabsHome() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const eduLabs = [
    {
      id: 'ai-education-challenge',
      title: 'AI in Education Challenge',
      summary: 'Design innovative AI tools to enhance learning experiences for students of all ages.',
      category: 'Technology',
      status: 'open',
      deadline: '2025-02-15',
      prize: 0,
      isBeginner: true,
      teams: 12,
      participants: 45
    },
    {
      id: 'sustainable-campus',
      title: 'Sustainable Campus Initiative',
      summary: 'Create solutions to make our campus more environmentally friendly and sustainable.',
      category: 'Sustainability',
      status: 'open',
      deadline: '2025-03-01',
      prize: 0,
      isBeginner: false,
      teams: 8,
      participants: 32
    },
    {
      id: 'community-outreach',
      title: 'Community Outreach Program',
      summary: 'Develop programs to connect students with local community needs and opportunities.',
      category: 'Community Service',
      status: 'open',
      deadline: '2025-01-30',
      prize: 0,
      isBeginner: true,
      teams: 15,
      participants: 60
    }
  ];

  const communityGuidelines = [
    'Be constructive and supportive in all interactions.',
    'No PII in public threads — use private team channels for personal info.',
    'Respect teammates and mentors — collaboration is key.',
    'Report issues via the "Report" link if you encounter problems.'
  ];

  return (
    <main>
      {/* Hero Section */}
      <ScrollReveal>
        <section className="bg-white border-b border-gray-200 hero-gradient section-rhythm">
          <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-10">
            <div className="py-8 md:py-12 visual-hierarchy">
              <h1 className="text-3xl md:text-4xl font-semibold font-headline text-balance">
                Welcome to <span className="text-blue-600">EduLabs</span>
              </h1>
              <p className="mt-2 text-lg text-gray-600 font-body text-pretty">
                A sister site for student innovation — build, learn, and share with your community.
              </p>
              <p className="mt-4 text-lg text-gray-700 font-body text-pretty">
                Join collaborative Labs where students work together to solve real-world challenges and develop innovative solutions.
              </p>
              <p className="mt-3 text-gray-600 font-body text-pretty">
                Work in teams, learn from mentors, and showcase your creativity through structured projects.
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
                    href="/edu/browse" 
                    className="px-6 py-3 rounded-md btn-primary btn-enhanced text-center focus-enhanced"
                  >
                    <Icon name="civic" size="sm" className="inline mr-2" />
                    Browse Active Labs
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
                src="/images/hero-edu-students.png" 
                alt="Student collaboration and innovation"
                fill
                priority
                className="object-cover rounded-xl"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Active Labs Section */}
      <ScrollReveal>
        <section className="bg-gray-50 border-b border-gray-200 constellation-bg section-rhythm">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12 visual-hierarchy">
              <h2 className="text-2xl md:text-3xl font-semibold font-headline mb-4 text-balance">
                Active Labs
              </h2>
              <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto text-pretty">
                Join collaborative projects where students work together to solve challenges and build innovative solutions.
              </p>
              
              {/* Beginner-friendly explanation */}
              <div className="mt-6 max-w-2xl mx-auto">
                <BeginnerSection title="How Student Collaboration Works:">
                  <p className="mb-2">
                    <strong>Team-based learning</strong> is at the heart of EduLabs. Students form teams, 
                    work with mentors, and submit their solutions through structured rounds.
                  </p>
                  <p>
                    Each Lab has multiple submission rounds, from initial ideas to final prototypes, 
                    with rubrics and judging to recognize the best work.
                  </p>
                </BeginnerSection>
              </div>
            </div>
          
            {eduLabs.length > 0 ? (
              <StaggeredReveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 grid-rhythm">
                {eduLabs.map((lab) => (
                  <HoverLift key={lab.id}>
                    <Link 
                      href={`/edu/labs/${lab.id}`}
                      className="card card-enhanced p-6 block hover:shadow-lg transition-all focus-enhanced"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded">
                          {lab.category}
                        </span>
                        {lab.isBeginner && (
                          <QuickImpactCallout type="beginner">
                            Beginner Friendly
                          </QuickImpactCallout>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold mb-2 font-headline text-balance">{lab.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 font-body text-pretty line-clamp-3">
                        {lab.summary}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{lab.teams} teams</span>
                        <span>{lab.participants} students</span>
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
                <h3 className="text-lg font-medium text-gray-900 mb-2">No active labs</h3>
                <p className="text-gray-600 mb-4">Check back later for new collaborative projects.</p>
                <HoverLift>
                  <Link 
                    href="/edu/browse" 
                    className="btn-primary"
                  >
                    Browse All Labs
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
                Collaborative learning through structured projects, team work, and mentorship.
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
                      title: "Join a Lab",
                      description: "Browse active Labs and find one that interests you. Read the details and requirements.",
                      icon: "civic"
                    },
                    {
                      number: 2,
                      title: "Form a Team",
                      description: "Create your own team or join an existing one. Work with mentors and collaborate with peers.",
                      icon: "innovation"
                    },
                    {
                      number: 3,
                      title: "Submit & Learn",
                      description: "Submit your work through multiple rounds, get feedback, and showcase your solutions.",
                      icon: "impact"
                    }
                  ]}
                />
              </div>
              
              {/* Resources */}
              <div>
                <ResourcesBox context="gettingStarted" title="Need Help Getting Started?" />
                <div className="mt-4">
                  <ResourcesBox context="community" title="Student Resources" />
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
                Guidelines to ensure a positive, collaborative learning environment for all students.
              </p>
            </div>
            
            <div className="card p-8">
              <h3 className="text-lg font-semibold mb-4">Student Community Guidelines</h3>
              <ul className="space-y-3">
                {communityGuidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="chevron-right" size="sm" className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-body text-pretty">{guideline}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Academic Integrity</h4>
                <p className="text-sm text-blue-700 mb-2">
                  All submissions must be original work with proper attribution. 
                  Plagiarism and academic dishonesty are not tolerated.
                </p>
                <HoverLift>
                  <Link 
                    href="/edu/academic-integrity" 
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
                Understanding EduLabs
              </h2>
              <p className="text-lg text-gray-600 font-body mb-8 text-pretty">
                Learn how collaborative learning helps students develop skills and solve real-world problems.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <QuickExplanation term="whatIsLab" />
                <QuickExplanation term="whyParticipate" />
              </div>
              <div>
                <ResourcesBox context="technical" title="Learning Resources" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}

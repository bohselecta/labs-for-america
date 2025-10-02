"use client";
import { useState, useEffect } from "react";
import { TEMPLATE_CONFIGS, TemplateKey } from "@/lib/template-configs";
import Link from "next/link";
import Image from "next/image";
import { LabCloseModal } from "@/components/LabCloseModal";
import { LabCloseBanner, ArchiveNotice } from '@/components/archiving/CloseBanner';
import { LabCollaboration } from "@/components/LabCollaboration";
import { STATUS_STYLES } from "@/lib/status-styles";
import { ImpactCallout, QuickImpactCallout } from "@/components/ImpactCallout";
import { ResourcesBox } from "@/components/ResourcesBox";
import { BeginnerSection, QuickExplanation } from "@/components/BeginnerFriendly";
import { Icon } from "@/components/icons";
import { generateLabMetadata, generateLabStructuredData, generateOrganizationStructuredData } from "@/lib/seo-metadata";
import { StructuredData } from "@/components/StructuredData";
import { BreadcrumbStructuredData } from "@/components/StructuredData";
import type { Metadata } from "next";

// Generate metadata for this page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Find the lab data
  const config = TEMPLATE_CONFIGS["civic"]; // Default to civic for now
  const lab = config.sampleLabs.find(l => l.slug === slug);
  
  if (!lab) {
    return {
      title: "Lab Not Found",
      description: "The requested lab could not be found."
    };
  }
  
  const labSEOData = {
    title: lab.title,
    description: lab.summary,
    category: lab.category,
    deadline: lab.deadline,
    prize: lab.prize,
    status: lab.status,
    slug: lab.slug,
    isBeginner: lab.isBeginner
  };
  
  return generateLabMetadata(labSEOData, "civic");
}

export default function LabDetail({ params }: { params: { slug: string } }) {
  const [currentTemplate, setCurrentTemplate] = useState<TemplateKey>("civic");
  const [lab, setLab] = useState<{
    title: string;
    slug: string;
    category: string;
    summary: string;
    bodyMd: string;
    prize: number;
    deadline: string;
    status: string;
    isBeginner: boolean;
  } | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(null);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedTemplate = localStorage.getItem("dev-template") as TemplateKey;
    if (savedTemplate && TEMPLATE_CONFIGS[savedTemplate]) {
      setCurrentTemplate(savedTemplate);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      // Find the lab by slug
      const config = TEMPLATE_CONFIGS[currentTemplate];
      const foundLab = config.sampleLabs.find(l => l.slug === params.slug);
      setLab(foundLab || null);
    }
  }, [isClient, currentTemplate, params.slug]);

  if (!isClient || !lab) {
    return <div>Loading...</div>;
  }

  const config = TEMPLATE_CONFIGS[currentTemplate];
  const deadline = new Date(lab.deadline);
  const daysLeft = Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const totalDays = 30;
  const timelineProgress = Math.max(0, Math.min(100, ((totalDays - daysLeft) / totalDays) * 100));

  // Correct .ics formatting
  const dtUtc = deadline.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const dtStamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//${config.name}//Lab Deadline//EN
BEGIN:VEVENT
UID:${lab.slug}@${config.orgSlug}
DTSTAMP:${dtStamp}
DTSTART:${dtUtc}
DTEND:${dtUtc}
SUMMARY:${lab.title} - Deadline
DESCRIPTION:${lab.summary}
LOCATION:Online
END:VEVENT
END:VCALENDAR`;

  return (
    <main>
      {/* Structured Data */}
      <StructuredData data={generateLabStructuredData({
        title: lab.title,
        description: lab.summary,
        category: lab.category,
        deadline: lab.deadline,
        prize: lab.prize,
        status: lab.status,
        slug: lab.slug,
        isBeginner: lab.isBeginner
      }, currentTemplate)} />
      
      <StructuredData data={generateOrganizationStructuredData(currentTemplate)} />
      
      <BreadcrumbStructuredData items={[
        { name: 'Home', url: '/' },
        { name: 'Browse Challenges', url: '/browse' },
        { name: lab.title, url: `/labs/${lab.slug}` }
      ]} />

      {/* Archive Banner for Closed Labs */}
      {lab.status === 'closed' && (
        <LabCloseBanner
          labId={lab.slug}
          labTitle={lab.title}
          closedAt={new Date(lab.closedAt || new Date())}
          closedBy="Lab Organizer"
          reportPath={`/archive/${lab.slug}`}
          onViewReport={() => console.log('Viewing report for', lab.slug)}
        />
      )}
      
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded">
              {lab.category}
            </span>
            {lab.isBeginner && (
              <QuickImpactCallout type="beginner">
                No experience needed
              </QuickImpactCallout>
            )}
          </div>
          
          <h1 className="text-3xl font-semibold font-headline">{lab.title}</h1>
          
          <div className="mt-4 flex gap-3">
            <span className="text-sm rounded-full bg-blue-50 text-blue-700 px-3 py-1">
              {lab.prize > 0 ? `Prize $${lab.prize.toLocaleString()}` : "Recognition"}
            </span>
            <span className={`text-sm rounded-full px-3 py-1 ${STATUS_STYLES[lab.status as keyof typeof STATUS_STYLES] || STATUS_STYLES.closed}`}>
              {lab.status}
            </span>
            {daysLeft > 0 && (
              <span className="text-sm rounded-full bg-orange-100 text-orange-700 px-3 py-1">
                {daysLeft} days left
              </span>
            )}
          </div>
          
          {/* Timeline Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Started {new Date().toLocaleDateString()}</span>
              <span>Due {deadline.toLocaleDateString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${timelineProgress}%` }}
              />
            </div>
          </div>
          
                  <div className="mt-6 flex gap-3">
                    <Link 
                      href={`/labs/${lab.slug}/collab`} 
                      className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500"
                    >
                      Open Collab Canvas
                    </Link>
                    {lab.status === "open" && (
                      <LabCollaboration labId={lab.slug} />
                    )}
                    {lab.status === "open" && (
                      <button
                        onClick={() => setIsCloseModalOpen(true)}
                        className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                      >
                        Close Lab
                      </button>
                    )}
                  </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10 grid md:grid-cols-[1fr_320px] gap-10">
        <article className="prose">
          <h2>Summary</h2>
          <p>{lab.summary}</p>
          <h3>Details</h3>
          <div className="prose-sm">
            <div dangerouslySetInnerHTML={{ __html: mdToSafeHtml(lab.bodyMd) }} />
          </div>
        </article>
        
        <aside className="space-y-4">
          {/* Beginner-friendly explanation */}
          {lab.isBeginner && (
            <BeginnerSection title="Perfect for Getting Started">
              <p className="mb-2">
                This challenge is designed for people with no prior experience. 
                Just share your ideas and help your community.
              </p>
              <p>
                Your contributions help shape real decisions that affect everyone.
              </p>
            </BeginnerSection>
          )}
          
          {/* Impact callout */}
          <ImpactCallout type="community" />
          
          <div className="rounded-xl bg-white border border-gray-200 p-4">
            <h4 className="font-medium">Challenge Info</h4>
            <div className="mt-2 text-sm text-gray-600 space-y-1">
              <div><strong>Category:</strong> {lab.category}</div>
              <div><strong>Status:</strong> {lab.status}</div>
              <div><strong>Deadline:</strong> {deadline.toLocaleDateString()}</div>
              <div><strong>Days Left:</strong> {daysLeft > 0 ? daysLeft : "Overdue"}</div>
            </div>
          </div>
          
          {/* Resources */}
          <ResourcesBox context="gettingStarted" title="Need Help?" />
          
          <div className="rounded-xl bg-white border border-gray-200 p-4">
            <h4 className="font-medium">Add to Calendar</h4>
            <div className="mt-2 space-y-2">
              <a 
                href={`data:text/calendar;charset=utf8,${encodeURIComponent(ics)}`}
                className="block w-full text-center px-3 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 text-sm"
                download={`${lab.slug}-deadline.ics`}
              >
                <Icon name="calendar" size="sm" className="inline mr-1" />
                Download .ics
              </a>
            </div>
          </div>
        </aside>
      </section>

      {/* Lab Close Modal */}
      <LabCloseModal
        labId={lab.slug}
        labTitle={lab.title}
        isOpen={isCloseModalOpen}
        onClose={() => setIsCloseModalOpen(false)}
        onSuccess={() => {
          // Refresh the page to show updated status
          window.location.reload();
        }}
      />
    </main>
  );
}
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getDaysLeft, getStatusBadge, getCategoryBadge, getBeginnerBadge, getTimelineProgress } from "@/lib/badges";

export default async function LabDetail({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const lab = await prisma.lab.findUnique({ 
    where: { slug }, 
    include: { org: true, assets: true } 
  });
  
  if (!lab) return notFound();

  const daysLeft = getDaysLeft(lab.deadline);
  const statusBadge = getStatusBadge(lab.status, daysLeft);
  const categoryBadge = getCategoryBadge(lab.category);
  const beginnerBadge = getBeginnerBadge(lab.isBeginner);
  const timelineProgress = getTimelineProgress(lab.deadline, lab.createdAt);

  return (
    <main>
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-sm rounded-full px-3 py-1 ${categoryBadge.color}`}>
              {categoryBadge.text}
            </span>
            {beginnerBadge && (
              <span className={`text-sm rounded-full px-3 py-1 ${beginnerBadge.color}`}>
                {beginnerBadge.text}
              </span>
            )}
          </div>
          
          <h1 className="text-3xl font-semibold">{lab.title}</h1>
          
          <div className="mt-4 flex gap-3">
            <span className="text-sm rounded-full bg-blue-50 text-blue-700 px-3 py-1">
              Prize ${lab.prize.toLocaleString()}
            </span>
            <span className={`text-sm rounded-full px-3 py-1 ${statusBadge.color}`}>
              {statusBadge.text}
            </span>
          </div>
          
          {/* Timeline Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Started {lab.createdAt.toLocaleDateString()}</span>
              <span>Due {lab.deadline.toLocaleDateString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${timelineProgress}%` }}
              />
            </div>
          </div>
          
          <div className="mt-6">
            <a 
              href={`/labs/${lab.slug}/collab`} 
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500"
            >
              Open Collab Canvas
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10 grid md:grid-cols-[1fr_320px] gap-10">
        <article className="prose">
          <h2>Summary</h2>
          <p>{lab.summary}</p>
          <h3>Details</h3>
          <div className="prose-sm">
            <MDXRemote source={lab.bodyMd} />
          </div>
        </article>
        
        <aside className="space-y-4">
          <div className="rounded-xl bg-white border border-gray-200 p-4">
            <h4 className="font-medium">Assets</h4>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              {lab.assets.map(a => (
                <li key={a.id}>
                  <a 
                    className="underline" 
                    href={a.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {a.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="rounded-xl bg-white border border-gray-200 p-4">
            <h4 className="font-medium">Add to Calendar</h4>
            <div className="mt-2 space-y-2">
              <a 
                href={`data:text/calendar;charset=utf8,${encodeURIComponent(`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CivicLabs//Lab Deadline//EN
BEGIN:VEVENT
DTSTART:${lab.deadline.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${lab.deadline.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${lab.title} - Deadline
DESCRIPTION:${lab.summary}
LOCATION:Online
END:VEVENT
END:VCALENDAR`)}`}
                className="block w-full text-center px-3 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 text-sm"
                download={`${lab.slug}-deadline.ics`}
              >
                Download .ics
              </a>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

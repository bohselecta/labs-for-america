import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ArchivePage() {
  if (!prisma) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-2xl font-semibold mb-6">Lab Archive</h1>
        <p className="text-gray-600">Database not available</p>
      </main>
    );
  }

  const closedLabs = await prisma.lab.findMany({
    where: { status: "closed" },
    include: { org: true },
    orderBy: { closedAt: 'desc' }
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Lab Archive</h1>
        <p className="text-gray-600">
          Browse completed Labs and their final reports. Every Lab produces a comprehensive summary 
          of discussions, contributions, and outcomes.
        </p>
      </div>

      {closedLabs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No completed Labs yet</div>
          <p className="text-gray-400 mt-2">
            When Labs are closed, their reports will appear here for future reference.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {closedLabs.map((lab) => (
            <div key={lab.id} className="card p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {lab.category}
                </span>
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                  Completed
                </span>
              </div>
              
              <h3 className="font-semibold text-lg mb-2">{lab.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{lab.summary}</p>
              
              <div className="text-xs text-gray-500 mb-4">
                <div>Opened: {lab.createdAt.toLocaleDateString()}</div>
                <div>Closed: {lab.closedAt?.toLocaleDateString()}</div>
                <div>Organizer: {lab.org.name}</div>
              </div>
              
              <div className="flex gap-2">
                {lab.reportPath ? (
                  <a
                    href={lab.reportPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                  >
                    📄 View Report
                  </a>
                ) : (
                  <span className="flex-1 text-center px-3 py-2 bg-gray-100 text-gray-500 rounded-md text-sm">
                    Report Pending
                  </span>
                )}
                
                <Link
                  href={`/labs/${lab.slug}`}
                  className="flex-1 text-center px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm"
                >
                  View Lab
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 p-6 bg-blue-50 rounded-xl">
        <h2 className="text-lg font-semibold mb-2">About Lab Reports</h2>
        <p className="text-gray-600 text-sm">
          Every completed Lab automatically generates a comprehensive report including participant contributions, 
          discussion highlights, accepted proposals, and next steps. These reports serve as institutional memory 
          and can be referenced for future similar challenges.
        </p>
      </div>
    </main>
  );
}

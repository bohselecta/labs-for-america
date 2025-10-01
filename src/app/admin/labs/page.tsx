import { prisma } from "@/lib/prisma";

export default async function AdminLabs() {
  // Handle case where database is not available (e.g., during build)
  let labs: Array<{
    id: string;
    title: string;
    category: string;
    deadline: Date;
    prize: number;
    org: { name: string };
  }> = [];
  
  if (prisma) {
    try {
      labs = await prisma.lab.findMany({ 
        include: { org: true }, 
        orderBy: { createdAt: "desc" } 
      });
    } catch (error) {
      console.warn("Database not available:", error);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Labs</h1>
        <a 
          href="/admin/labs/new" 
          className="px-4 py-2 rounded-md bg-blue-600 text-white"
        >
          New Lab
        </a>
      </div>
      
      <div className="mt-6 grid gap-4">
        {labs.length > 0 ? (
          labs.map(l => (
            <a 
              key={l.id} 
              href={`/admin/labs/${l.id}/edit`} 
              className="rounded-xl bg-white border border-gray-200 p-4 hover:shadow"
            >
              <div className="text-xs text-gray-500">
                {l.org.name} • {l.category}
              </div>
              <div className="font-medium">{l.title}</div>
              <div className="text-sm text-gray-600">
                Due {new Date(l.deadline).toLocaleDateString()} • ${l.prize.toLocaleString()}
              </div>
            </a>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No labs found. Create your first lab to get started!</p>
            <a 
              href="/admin/labs/new" 
              className="mt-2 inline-block px-4 py-2 rounded-md bg-blue-600 text-white"
            >
              Create First Lab
            </a>
          </div>
        )}
      </div>
    </main>
  );
}

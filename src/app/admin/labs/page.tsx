import { prisma } from "@/lib/prisma";

export default async function AdminLabs() {
  const labs = await prisma.lab.findMany({ 
    include: { org: true }, 
    orderBy: { createdAt: "desc" } 
  });

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
        {labs.map(l => (
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
        ))}
      </div>
    </main>
  );
}

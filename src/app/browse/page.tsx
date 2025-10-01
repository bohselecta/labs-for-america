import { prisma } from "@/lib/prisma";
import { getDaysLeft, getStatusBadge, getCategoryBadge, getBeginnerBadge } from "@/lib/badges";

export default async function Browse() {
  const labs = await prisma.lab.findMany({ 
    include: { org: true }, 
    orderBy: { deadline: "asc" } 
  });

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-headline mb-2">
          National Labs
        </h1>
        <p className="text-lg text-gray-600 font-body mb-4">
          Federal government challenges and innovation opportunities open to all citizens nationwide.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-blue-600 text-xl">ℹ️</div>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">About National Labs</p>
              <p>
                These are federally-sponsored challenges and innovation opportunities. 
                They&apos;re designed for national participation and impact, separate from local 
                community initiatives. Perfect for citizens, researchers, and organizations 
                looking to contribute to federal priorities.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-[260px_1fr]">
        <aside className="bg-white border border-gray-200 rounded-xl p-4 h-fit sticky top-20">
          <input 
            placeholder="Search Labs" 
            className="w-full rounded-md border border-gray-300 p-2"
          />
          <div className="mt-4 text-sm text-gray-700 font-medium">Categories</div>
          {["Federal", "Civic", "Justice", "Health", "Mobility", "Energy"].map(c => (
            <label key={c} className="mt-2 flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-blue-600" /> {c}
            </label>
          ))}
        </aside>
        
        <section>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {labs.map(l => {
              const daysLeft = getDaysLeft(l.deadline);
              const statusBadge = getStatusBadge(l.status, daysLeft);
              const categoryBadge = getCategoryBadge(l.category);
              const beginnerBadge = getBeginnerBadge(l.isBeginner);
              
              return (
                <a 
                  key={l.id} 
                  href={`/labs/${l.slug}`} 
                  className="group rounded-xl bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs rounded-full px-2 py-0.5 ${categoryBadge.color}`}>
                        {categoryBadge.text}
                      </span>
                      {beginnerBadge && (
                        <span className={`text-xs rounded-full px-2 py-0.5 ${beginnerBadge.color}`}>
                          {beginnerBadge.text}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                      {l.title}
                    </h3>
                    
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-blue-50 text-blue-700 px-2 py-0.5">
                        Prize ${l.prize.toLocaleString()}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 ${statusBadge.color}`}>
                        {statusBadge.text}
                      </span>
                    </div>
                    
                    <div className="mt-3 text-sm text-gray-600">
                      Due {l.deadline.toLocaleDateString()}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

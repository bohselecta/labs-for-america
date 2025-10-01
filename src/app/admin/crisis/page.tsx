import { prisma } from "@/lib/prisma";

export default async function CrisisPage() {
  // Handle case where database is not available (e.g., during build)
  let org = {
    crisisMode: "NORMAL" as const,
    crisisTitle: "",
    crisisMsg: ""
  };
  
  if (prisma) {
    try {
      org = await prisma.org.upsert({
        where: { slug: "city" },
        update: {},
        create: { 
          slug: "city", 
          name: "City of Example", 
          logoUrl: "/logo.png",
          crisisMode: "NORMAL"
        }
      });
    } catch (error) {
      console.warn("Database not available:", error);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Public Alert Modes</h1>
      
      <form 
        action="/api/crisis" 
        method="post" 
        className="mt-6 space-y-4 bg-white border border-gray-200 rounded-xl p-5"
      >
        <div>
          <label className="block text-sm text-gray-700">Mode</label>
          <select 
            name="mode" 
            defaultValue={org.crisisMode} 
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
            aria-label="Crisis mode selection"
          >
            <option value="NORMAL">Normal</option>
            <option value="MANHUNT">Manhunt (opens public chat)</option>
            <option value="EMERGENCY">Emergency (opens public chat)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm text-gray-700">Banner Title</label>
          <input 
            name="title" 
            defaultValue={org.crisisTitle ?? ""} 
            className="mt-1 w-full border border-gray-300 rounded-md p-2" 
            placeholder="MANHUNT ACTIVE" 
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-700">Banner Message</label>
          <textarea 
            name="msg" 
            defaultValue={org.crisisMsg ?? ""} 
            rows={3} 
            className="mt-1 w-full border border-gray-300 rounded-md p-2" 
            placeholder="Do not approach. Call 911. Check shelters and churches for assistance." 
          />
        </div>
        
        <button className="px-5 py-2.5 rounded-md bg-blue-600 text-white">
          Save
        </button>
      </form>
      
      <p className="mt-4 text-sm text-gray-600">
        NOTE: The homepage chat is anonymous, rate-limited, and filtered to reduce doxxing/PII. 
        Tips with private info should go through the secure tip form (link shown on the banner).
      </p>
    </main>
  );
}

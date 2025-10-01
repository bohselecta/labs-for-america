import { prisma } from "@/lib/prisma";

export default async function Home() {
  // Handle case where database is not available (e.g., during build)
  if (prisma) {
    try {
      await prisma.org.upsert({
        where: { slug: "city" },
        update: {},
        create: { slug: "city", name: "City of Example" }
      });
    } catch (error) {
      console.warn("Database not available:", error);
    }
  }

  const showAlert = false; // Disable crisis mode for now

  return (
    <main>
      {showAlert && (
        <section className="border-b border-blue-200 bg-blue-50">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold">
                  Community Features Coming Soon
                </div>
                <div className="text-sm mt-1">
                  Crisis coordination and community chat features are in development.
                </div>
              </div>
              <a href="/docs/about" className="text-sm underline">
                Learn more
              </a>
            </div>
          </div>
        </section>
      )}

      <section className="bg-white border-b border-gray-200 hero-gradient">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 grid md:grid-cols-2 gap-10">
          <div className="py-8 md:py-12">
            <h1 className="text-3xl md:text-4xl font-semibold font-headline">
              Sister sites for <span className="text-blue-600">civic life</span>
            </h1>
            <p className="mt-4 text-lg text-gray-700 font-body">
              Sister sites for civic life. Free, open-source portals for every community.
            </p>
            <p className="mt-3 text-gray-600 font-body">
              Free, open-source templates that any community, department, or school can turn into a welcoming public portal. 
              Building together, for all of us.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a 
                href="/templates" 
                className="px-6 py-3 rounded-md btn-primary hover:bg-blue-500 text-center"
              >
                Launch Your Lab
              </a>
              <a 
                href="/docs/about" 
                className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 font-body text-center"
              >
                Learn how it works →
              </a>
            </div>
            <div className="mt-4">
              <a 
                href="/browse" 
                className="text-sm text-blue-600 hover:text-blue-500 font-body"
              >
                Browse Labs
              </a>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 h-64 flex items-center justify-center constellation-bg overflow-hidden">
            <img 
              src="/images/hero-civic-skyline.png" 
              alt="Civic architecture and modern skyline representing the continuity between our civic foundations and modern progress"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Template Showcase Section */}
      <section className="bg-gray-50 border-b border-gray-200 constellation-bg">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold font-headline mb-4">
              Choose Your Template
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              Four specialized templates designed for different types of civic organizations. 
              Each comes with pre-configured features and styling.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">🌳</div>
              <h3 className="text-lg font-semibold font-headline mb-2">CivicLabs</h3>
              <p className="text-sm text-gray-600 font-body mb-4">
                Community challenges and civic engagement for cities and towns.
              </p>
              <a href="/templates" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                Learn more →
              </a>
            </div>
            
            <div className="card p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">🚔</div>
              <h3 className="text-lg font-semibold font-headline mb-2">JusticeLabs</h3>
              <p className="text-sm text-gray-600 font-body mb-4">
                Cold case management and community reporting for law enforcement.
              </p>
              <a href="/templates" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                Learn more →
              </a>
            </div>
            
                    <div className="card p-6 text-center hover:shadow-lg transition">
                      <div className="text-4xl mb-4">🎓</div>
                      <h3 className="text-lg font-semibold font-headline mb-2">EduLabs</h3>
                      <p className="text-sm text-gray-600 font-body mb-4">
                        Student innovation and research challenges for all school types and universities.
                      </p>
                      <a href="/templates" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                        Learn more →
                      </a>
                    </div>
            
            <div className="card p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-lg font-semibold font-headline mb-2">HealthLabs</h3>
              <p className="text-sm text-gray-600 font-body mb-4">
                Health improvement challenges and community wellness initiatives.
              </p>
              <a href="/templates" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                Learn more →
              </a>
            </div>
          </div>
        </div>
      </section>

      {showAlert && (
        <section className="mx-auto max-w-7xl px-6 py-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">Community coordination features coming soon!</p>
          </div>
        </section>
      )}
      
      <section className="bg-white border-b border-gray-200 civic-grid">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-xl font-semibold">Closing soon</h2>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <a className="rounded-xl bg-white border border-gray-200 p-4 hover:shadow">
              <div className="text-xs text-gray-500">Civic • Public Works</div>
              <h3 className="mt-1 font-semibold">Lake Cleanup Concepts</h3>
              <div className="mt-2 text-sm text-gray-600">Prize $5,000 • Due Apr 30</div>
            </a>
            <a className="rounded-xl bg-white border border-gray-200 p-4 hover:shadow">
              <div className="text-xs text-gray-500">Justice • Cold Case</div>
              <h3 className="mt-1 font-semibold">Unidentified Person 2009-A</h3>
              <div className="mt-2 text-sm text-gray-600">Recognition • Rolling</div>
            </a>
            <a className="rounded-xl bg-white border border-gray-200 p-4 hover:shadow">
              <div className="text-xs text-gray-500">Civic • Transportation</div>
              <h3 className="mt-1 font-semibold">Safer Crosswalks</h3>
              <div className="mt-2 text-sm text-gray-600">Prize $2,000 • Due Jun 1</div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
import { PRESETS, PresetKey } from "@/lib/theme-presets";

const templates = {
  civic: {
    name: "CivicLabs",
    description: "Community challenges and civic engagement for cities and towns",
    icon: "🌳",
    preset: "CITY" as PresetKey,
    features: ["Community challenges", "Civic projects", "Open calls for ideas"],
    sampleLabs: [
      { title: "Lake Cleanup Concepts", category: "Public Works", prize: 5000, deadline: "Apr 30, 2024" },
      { title: "Safer Crosswalks", category: "Transportation", prize: 2000, deadline: "Jun 1, 2024" },
      { title: "Smart Lighting Initiative", category: "Infrastructure", prize: 3000, deadline: "May 15, 2024" }
    ]
  },
  justice: {
    name: "JusticeLabs", 
    description: "Cold case management and community reporting for law enforcement",
    icon: "🚔",
    preset: "PD" as PresetKey,
    features: ["Cold case Labs", "Crisis modes", "Community reporting"],
    sampleLabs: [
      { title: "Unidentified Person 2009-A", category: "Cold Case", prize: 0, deadline: "Rolling" },
      { title: "Missing Person: Sarah Chen", category: "Active Case", prize: 0, deadline: "Rolling" },
      { title: "Community Safety Initiative", category: "Prevention", prize: 1000, deadline: "May 30, 2024" }
    ]
  },
  edu: {
    name: "EduLabs",
    description: "Student innovation and research challenges for schools and universities", 
    icon: "🎓",
    preset: "CITY" as PresetKey,
    features: ["Student innovation", "Hackathons", "Research Labs"],
    sampleLabs: [
      { title: "Accessible EdTech Challenge", category: "Innovation", prize: 2500, deadline: "Apr 25, 2024" },
      { title: "Campus Sustainability", category: "Research", prize: 1500, deadline: "May 20, 2024" },
      { title: "Student Mental Health App", category: "Technology", prize: 3000, deadline: "Jun 10, 2024" }
    ]
  },
  health: {
    name: "HealthLabs",
    description: "Health improvement challenges and community wellness initiatives",
    icon: "🏥", 
    preset: "FIRE" as PresetKey,
    features: ["Health challenges", "Access improvement", "Community health"],
    sampleLabs: [
      { title: "Telehealth Innovation", category: "Digital Health", prize: 4000, deadline: "May 5, 2024" },
      { title: "Community Health Outreach", category: "Prevention", prize: 2000, deadline: "Apr 30, 2024" },
      { title: "Mental Health Resources", category: "Wellness", prize: 3500, deadline: "Jun 15, 2024" }
    ]
  }
};

export default function TemplatePreview({ params }: { params: { templateId: string } }) {
  const template = templates[params.templateId as keyof typeof templates];
  
  if (!template) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-2xl font-semibold">Template Not Found</h1>
        <p className="text-gray-600 mt-2">The requested template does not exist.</p>
      </main>
    );
  }

  const preset = PRESETS[template.preset];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">LFA</span>
              </div>
              <div className="text-gray-900 font-semibold">{template.name}</div>
            </div>
            <div className="text-sm text-gray-500">Preview Mode</div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="text-center">
            <div className="text-6xl mb-4">{template.icon}</div>
            <h1 className="text-4xl font-bold mb-4">{template.name}</h1>
            <p className="text-xl text-gray-600 mb-6">{template.description}</p>
            <div className="flex justify-center gap-4">
              <button 
                className="px-6 py-3 rounded-md text-white font-medium"
                style={{ 
                  background: "#2563EB",
                  borderRadius: preset.borderRadius
                }}
              >
                Browse Challenges
              </button>
              <button 
                className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                style={{ borderRadius: preset.borderRadius }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-semibold text-center mb-8">Key Features</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {template.features.map((feature, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-white rounded-xl border border-gray-200"
                style={{ 
                  borderRadius: preset.borderRadius,
                  boxShadow: preset.shadow
                }}
              >
                <div className="text-3xl mb-3">
                  {index === 0 ? "🎯" : index === 1 ? "📋" : "💡"}
                </div>
                <h3 className="font-semibold mb-2">{feature}</h3>
                <p className="text-sm text-gray-600">
                  {index === 0 ? "Engage your community with meaningful challenges" :
                   index === 1 ? "Manage projects and track progress" :
                   "Foster innovation and collaboration"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Labs Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-semibold mb-8">Sample Challenges</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {template.sampleLabs.map((lab, index) => (
              <div 
                key={index}
                className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition"
                style={{ 
                  borderRadius: preset.borderRadius,
                  borderColor: preset.borderColor
                }}
              >
                <div className="text-xs text-gray-500 mb-2">{lab.category}</div>
                <h3 className="font-semibold mb-2">{lab.title}</h3>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{lab.prize > 0 ? `Prize $${lab.prize.toLocaleString()}` : "Recognition"}</span>
                  <span>{lab.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8">
            This is just a preview. Download the full template to customize with your organization&apos;s branding and deploy your own {template.name} portal.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              className="px-8 py-4 rounded-md text-white font-medium"
              style={{ 
                background: "#2563EB",
                borderRadius: preset.borderRadius
              }}
            >
              Download Template
            </button>
            <button 
              className="px-8 py-4 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
              style={{ borderRadius: preset.borderRadius }}
            >
              Deploy to Vercel
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">LFA</span>
            </div>
            <div className="text-gray-900 font-semibold">LabsForAmerica</div>
          </div>
          <p className="text-sm text-gray-600">
            Sister sites for civic life — building together, for all of us.
          </p>
        </div>
      </footer>
    </main>
  );
}

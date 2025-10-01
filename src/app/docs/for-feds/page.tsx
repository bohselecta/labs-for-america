import { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Federal Employees - LabsForAmerica",
  description: "A free civic infrastructure gift for government agencies",
};

export default function ForFedsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-8 font-headline">🏛️ LabsForAmerica: A Free Civic Infrastructure Gift</h1>
        
        <h2 className="text-2xl font-semibold mb-4 font-headline">What it is</h2>
        <p className="text-gray-600 mb-6 font-body">
          LabsForAmerica is a free, open-source template system for civic innovation. It provides ready-to-deploy web portals that any government agency, school, or community group can use immediately.
        </p>

        <p className="text-gray-600 mb-4 font-body"><strong>Templates include:</strong></p>
        <ul className="space-y-2 mb-8">
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body"><strong>CivicLabs</strong> → for city councils & community projects</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body"><strong>JusticeLabs</strong> → for law enforcement (cold cases, emergencies, manhunts)</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body"><strong>EduLabs</strong> → for schools & universities (hackathons, innovation challenges)</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body"><strong>HealthLabs</strong> → for hospitals & public health agencies</span>
          </li>
        </ul>

        <hr className="my-8 border-gray-200" />

        <h2 className="text-2xl font-semibold mb-4 font-headline">Why it matters</h2>
        <ul className="space-y-3 mb-8">
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body"><strong>No cost, no catch</strong>: The templates are open-licensed for public use.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body"><strong>Immediate deployment</strong>: Launch in under 20 minutes via GitHub + Vercel.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body"><strong>Citizen contribution</strong>: Created by private citizens, offered freely to government.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body"><strong>Modern & accessible</strong>: Professional UI, responsive design, logo-based auto-theming.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body"><strong>Scalable</strong>: Supports local, state, or federal adoption.</span>
          </li>
        </ul>

        <hr className="my-8 border-gray-200" />

        <h2 className="text-2xl font-semibold mb-4 font-headline">How to try it</h2>
        <ol className="space-y-3 mb-8">
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
            <span className="font-body">Visit <a href="/templates" className="text-blue-600 hover:text-blue-500">LabsForAmerica.com</a></span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
            <span className="font-body">Choose a template (Civic, Justice, Edu, Health)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
            <span className="font-body">Upload your logo → site auto-themes itself</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">4</span>
            <span className="font-body">Deploy instantly to a <code className="bg-gray-100 px-2 py-1 rounded text-sm">.vercel.app</code> domain or download for internal hosting</span>
          </li>
        </ol>

        <hr className="my-8 border-gray-200" />

        <h2 className="text-2xl font-semibold mb-4 font-headline">Why we built this</h2>
        <p className="text-gray-600 mb-4 font-body">
          The intent is philanthropic: to empower agencies at every level of government with tools that save time, budget, and effort. By lowering the barrier to launch public-facing Labs, we hope to:
        </p>
        <ul className="space-y-2 mb-8">
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body"><strong>Increase citizen engagement</strong></span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body"><strong>Speed up problem-solving</strong></span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body"><strong>Strengthen trust in civic institutions</strong></span>
          </li>
        </ul>

        <hr className="my-8 border-gray-200" />

        <h2 className="text-2xl font-semibold mb-4 font-headline">How to adopt officially</h2>
        <ul className="space-y-3 mb-8">
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body">Any agency may fork, rebrand, or host these templates directly.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body">If adopted federally, the system can be migrated under a <code className="bg-gray-100 px-2 py-1 rounded text-sm">.gov</code> domain.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body">Contribution model is open: agencies may improve templates and submit changes back for the benefit of all.</span>
          </li>
        </ul>

        <hr className="my-8 border-gray-200" />

        <h2 className="text-2xl font-semibold mb-4 font-headline">Contact</h2>
        <p className="text-gray-600 mb-8 font-body">
          This project is released into the public domain.<br />
          No company, vendor, or sales channel.<br />
          Fork freely. Share widely. Use as you see fit.
        </p>

        <hr className="my-8 border-gray-200" />

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-blue-800 font-medium font-accent">
            ⚖️ <strong>LabsForAmerica is a civilian-built contribution to civic infrastructure, offered freely to the United States Government and its agencies for consideration and use.</strong>
          </p>
        </div>
      </div>
    </main>
  );
}

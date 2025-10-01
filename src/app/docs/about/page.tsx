import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - LabsForAmerica",
  description: "Learn about LabsForAmerica's mission to provide free civic templates for communities",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-8 font-headline">🌐 About Us</h1>
        
        <p className="text-xl text-gray-600 mb-8 font-body">
          LabsForAmerica is a civic gift, not a company.
          We build and share free, open-source templates that any community, department, or school can turn into a sister site — a welcoming public portal that connects institutions with the people they serve.
        </p>

        <h2 className="text-2xl font-semibold mb-4 font-headline">Our belief is simple:</h2>
        <ul className="space-y-3 mb-8">
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body"><strong>Every community deserves a place to collaborate.</strong></span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body"><strong>Every department deserves a portal that's modern, accessible, and human.</strong></span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body"><strong>Every citizen deserves to be included in progress.</strong></span>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 font-headline">Why we do this</h2>
        <p className="text-gray-600 mb-8 font-body">
          Technology should nurture, not divide. By making it effortless to launch polished, professional portals, we help governments, schools, and organizations invite the public into meaningful Labs: civic projects, justice efforts, health initiatives, and student innovation.
        </p>

        <h2 className="text-2xl font-semibold mb-4 font-headline">What makes it different</h2>
        <ul className="space-y-3 mb-8">
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body"><strong>Free forever</strong> — open-licensed, public domain templates.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body"><strong>AI-assisted setup</strong> — upload a logo, get an auto-themed site in minutes.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body"><strong>Sister site spirit</strong> — not a replacement for official domains, but a friendly mirror built for engagement.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span className="font-body"><strong>Built with care</strong> — created in hours, offered in good faith, maintained by anyone who cares enough to fork it.</span>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 font-headline">Our reward is simple: seeing it work.</h2>
        <p className="text-gray-600 mb-8 font-body">
          If these portals help communities align, collaborate, and flourish, then the mission is complete.
        </p>

        <hr className="my-8 border-gray-200" />

        <p className="text-gray-500 italic font-accent">
          Sister sites for civic life — building together, for all of us.
        </p>
      </div>
    </main>
  );
}

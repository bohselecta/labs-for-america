import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { FakeAuthProvider } from "@/lib/fake-auth";
import { TemplateSwitcher } from "@/components/TemplateSwitcher";
import "./globals.css";
import { loadTheme } from "@/lib/theme-loader";
import { StructuredData } from "@/components/StructuredData";
import { generateWebsiteStructuredData } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: {
    default: "LabsForAmerica - Free Civic Engagement Platforms",
    template: "%s | LabsForAmerica"
  },
  description: "Free, open-source civic engagement platforms for communities. Sister sites for civic life — building together, for all of us.",
  keywords: [
    "civic engagement",
    "community platform",
    "government innovation",
    "civic technology",
    "public participation",
    "open source",
    "free template",
    "civic labs",
    "community challenges",
    "civic innovation"
  ],
  authors: [{ name: "LabsForAmerica" }],
  creator: "LabsForAmerica",
  publisher: "LabsForAmerica",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://labsforamerica.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'LabsForAmerica - Free Civic Engagement Platforms',
    description: 'Free, open-source civic engagement platforms for communities. Sister sites for civic life — building together, for all of us.',
    siteName: 'LabsForAmerica',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'LabsForAmerica - Civic Engagement Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LabsForAmerica - Free Civic Engagement Platforms',
    description: 'Free, open-source civic engagement platforms for communities. Sister sites for civic life — building together, for all of us.',
    images: ['/images/og-default.png'],
    creator: '@labsforamerica',
    site: '@labsforamerica',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeCss = await loadTheme();

  return (
    <html lang="en" className="bg-[var(--canvas)] text-[var(--canvas-ink)]">
      <head>
        {themeCss && <style id="org-theme">{themeCss}</style>}
        <link rel="preload" as="image" href="/images/hero-civic-skyline.png" />
        <link rel="preload" as="image" href="/lfa-logo.png" />
        <meta name="theme-color" content="#2563EB" />
        <meta name="color-scheme" content="light dark" />
      </head>
              <body className="antialiased">
                {/* Structured Data */}
                <StructuredData data={generateWebsiteStructuredData()} />
                
                {/* Skip Links */}
                <a href="#main-content" className="skip-link">
                  Skip to main content
                </a>
                <a href="#navigation" className="skip-link">
                  Skip to navigation
                </a>
        
        <FakeAuthProvider>
          <TemplateSwitcher />
          <Header />
          <main id="main-content" className="min-h-screen" role="main">
            {children}
          </main>
          <footer className="border-t border-gray-200 bg-white footer-pattern" role="contentinfo">
            <div className="mx-auto max-w-7xl px-6 py-8">
              <div className="grid gap-8 md:grid-cols-3">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center">
                      <img 
                        src="/lfa-logo.png" 
                        alt="LabsForAmerica Logo" 
                        className="h-6 w-6"
                      />
                    </div>
                    <div className="text-gray-900 font-semibold font-headline">LabsForAmerica</div>
                  </div>
                  <p className="text-sm text-gray-600 font-body mb-4">
                    Sister sites for civic life — building together, for all of us.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Quick Links</h3>
                  <nav aria-label="Footer navigation">
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><a href="/docs/about" className="hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">About</a></li>
                      <li><a href="/docs/deploy" className="hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">Docs</a></li>
                      <li><a href="/docs/for-feds" className="hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">For Feds</a></li>
                      <li><a href="/templates" className="hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">Templates</a></li>
                    </ul>
                  </nav>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Templates</h3>
                  <nav aria-label="Template navigation">
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><a href="/templates" className="hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">CivicLabs</a></li>
                      <li><a href="/templates" className="hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">JusticeLabs</a></li>
                      <li><a href="/templates" className="hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">EduLabs</a></li>
                      <li><a href="/templates" className="hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">HealthLabs</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-600">
                © {new Date().getFullYear()} LabsForAmerica. Open civic template. 
                <a href="/docs/for-feds" className="ml-2 text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
                  For federal employees: see our one-pager.
                </a>
              </div>
            </div>
          </footer>
        </FakeAuthProvider>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { FakeAuthProvider } from "@/lib/fake-auth";
import { TemplateSwitcher } from "@/components/TemplateSwitcher";
import "./globals.css";
import { loadTheme } from "@/lib/theme-loader";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: "Civic Labs for community engagement",
  icons: "/favicon.ico"
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
      </head>
      <body className="antialiased">
        <FakeAuthProvider>
          <TemplateSwitcher />
          <Header />
          <div className="min-h-screen">
            {children}
          </div>
          <footer className="border-t border-gray-200 bg-white footer-pattern">
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
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><a href="/docs/about" className="hover:text-gray-900">About</a></li>
                    <li><a href="/docs/deploy" className="hover:text-gray-900">Docs</a></li>
                    <li><a href="/docs/for-feds" className="hover:text-gray-900">For Feds</a></li>
                    <li><a href="/templates" className="hover:text-gray-900">Templates</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Templates</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><a href="/templates" className="hover:text-gray-900">CivicLabs</a></li>
                    <li><a href="/templates" className="hover:text-gray-900">JusticeLabs</a></li>
                    <li><a href="/templates" className="hover:text-gray-900">EduLabs</a></li>
                    <li><a href="/templates" className="hover:text-gray-900">HealthLabs</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-600">
                © {new Date().getFullYear()} LabsForAmerica. Open civic template. 
                <a href="/docs/for-feds" className="ml-2 text-blue-600 hover:text-blue-500">
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
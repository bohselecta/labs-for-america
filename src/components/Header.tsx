"use client";
import { useAuth } from "@/lib/fake-auth";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center">
            <img 
              src="/lfa-logo.png" 
              alt="LabsForAmerica Logo" 
              className="h-5 w-5"
            />
          </div>
          <div className="text-gray-900 font-semibold">
            LabsForAmerica
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 text-sm">
          <a href="/browse" className="text-gray-700 hover:text-gray-900 nav-link font-body">
            Labs
          </a>
          <a href="/templates" className="text-gray-700 hover:text-gray-900 nav-link font-body">
            Templates
          </a>
          <a href="/docs/about" className="text-gray-700 hover:text-gray-900 nav-link font-body">
            About
          </a>
          <a href="/docs/deploy" className="text-gray-700 hover:text-gray-900 nav-link font-body">
            Deploy
          </a>
          {!user ? (
            <a href="/login" className="text-blue-600 hover:text-blue-500 font-body">
              Log in
            </a>
          ) : (
            <>
              <a href="/admin" className="text-gray-700 hover:text-gray-900 nav-link font-body">
                Dashboard
              </a>
              <button
                onClick={signOut}
                className="text-gray-600 hover:text-gray-900 font-body"
              >
                Sign out
              </button>
            </>
          )}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="px-6 py-4 space-y-3">
            <a
              href="/browse"
              className="block text-gray-700 hover:text-gray-900 font-body py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Labs
            </a>
            <a
              href="/templates"
              className="block text-gray-700 hover:text-gray-900 font-body py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Templates
            </a>
            <a
              href="/docs/about"
              className="block text-gray-700 hover:text-gray-900 font-body py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="/docs/deploy"
              className="block text-gray-700 hover:text-gray-900 font-body py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Deploy
            </a>
            {!user ? (
              <a
                href="/login"
                className="block text-blue-600 hover:text-blue-500 font-body py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log in
              </a>
            ) : (
              <>
                <a
                  href="/admin"
                  className="block text-gray-700 hover:text-gray-900 font-body py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </a>
                <button
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-gray-600 hover:text-gray-900 font-body py-2"
                >
                  Sign out
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

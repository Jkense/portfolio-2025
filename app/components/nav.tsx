"use client";

import Link from "next/link";
import { useState } from "react";
import { GeistMono } from "geist/font/mono";

const navItems = {
  "/": {
    name: "Work",
  },
  "https://medium.com/@JasperKense": {
    name: "Blog",
  },
  "/resume.pdf": {
    name: "Resume",
  },
};

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b border-border">
      <div className="max-w-4xl mx-auto w-full px-6 lg:px-0">
        <div
          className={`flex items-center justify-between py-6 text-sm ${GeistMono.className}`}
        >
          {/* Left: Branding */}
          <div className="flex items-center gap-10 flex-1">
            <Link href="/" className="flex items-center gap-10">
              <span className="font-medium text-black dark:text-white">
                Jasper Kense
              </span>
              <span className="text-muted hidden sm:inline">
                Design Engineer
              </span>
            </Link>
          </div>

          {/* Right: Nav links (desktop) */}
          <div className="hidden md:flex items-center gap-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isExternal = path.startsWith("http");
              if (isExternal) {
                return (
                  <a
                    key={path}
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-primary transition-colors"
                  >
                    {name}
                  </a>
                );
              }
              return (
                <Link
                  key={path}
                  href={path}
                  className="text-muted hover:text-primary transition-colors"
                >
                  {name}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {mobileMenuOpen ? (
                <>
                  <path d="M6 6L18 18" />
                  <path d="M6 18L18 6" />
                </>
              ) : (
                <>
                  <path d="M4 8H20" />
                  <path d="M4 16H20" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden pb-6 text-sm ${GeistMono.className}`}>
            <div className="flex flex-col gap-4">
              {Object.entries(navItems).map(([path, { name }]) => {
                const isExternal = path.startsWith("http");
                if (isExternal) {
                  return (
                    <a
                      key={path}
                      href={path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {name}
                    </a>
                  );
                }
                return (
                  <Link
                    key={path}
                    href={path}
                    className="text-muted hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

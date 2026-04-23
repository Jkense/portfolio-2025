"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { GeistMono } from "geist/font/mono";

export type TOCHeading = {
  text: string;
  slug: string;
  level: number;
  isEngineering: boolean;
  kind: "bookmark";
  section: "design" | "engineering";
  domains?: string[];
};

type TableOfContentsProps = {
  headings: TOCHeading[];
};

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeSlug, setActiveSlug] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const visibleEntries = new Map<string, IntersectionObserverEntry>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleEntries.set(entry.target.id, entry);
          } else {
            visibleEntries.delete(entry.target.id);
          }
        }

        if (visibleEntries.size > 0) {
          let topmost: { id: string; top: number } | null = null;
          visibleEntries.forEach((entry) => {
            const top = entry.boundingClientRect.top;
            if (topmost === null || top < topmost.top) {
              topmost = { id: entry.target.id, top };
            }
          });

          if (topmost) {
            setActiveSlug((topmost as { id: string; top: number }).id);
          }
        }
      },
      {
        rootMargin: "-64px 0px -60% 0px",
        threshold: [0, 1],
      }
    );

    const timer = setTimeout(() => {
      headings.forEach(({ slug }) => {
        const el = document.getElementById(slug);
        if (el && observerRef.current) {
          observerRef.current.observe(el);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, [headings]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
      e.preventDefault();
      const el = document.getElementById(slug);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", `#${slug}`);
        setActiveSlug(slug);
      }
    },
    []
  );

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <div className="max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 scrollbar-thin">
        <p
          className={`mb-3 text-[11px] uppercase tracking-widest text-muted ${GeistMono.className}`}
        >
          On this page
        </p>

        <ul className="space-y-1.5 border-l border-border pl-3">
          {headings.map(({ text, slug }) => (
            <li key={slug}>
              <a
                href={`#${slug}`}
                onClick={(e) => handleClick(e, slug)}
                className={`block rounded-md px-2 py-2 -ml-2 text-[12px] leading-[1.45] transition-colors duration-150 ${
                  activeSlug === slug
                    ? "text-primary"
                    : "text-muted hover:text-black dark:hover:text-white"
                }`}
              >
                <span className="block">{text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

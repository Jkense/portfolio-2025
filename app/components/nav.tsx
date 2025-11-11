"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navItems = {
  "/": {
    name: "home",
  },
  "https://medium.com/@JasperKense": {
    name: "blog",
  },
  "/resume": {
    name: "resume",
  },
};

export function Navbar() {
  const [hasBorder, setHasBorder] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When the sentinel is not intersecting (scrolled out of view), content is underneath the nav
          setHasBorder(!entry.isIntersecting);
        });
      },
      {
        threshold: 0,
        rootMargin: "0px",
      }
    );

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <nav
        className={`items-center w-full bg-white dark:bg-black fixed top-0 left-0 right-0 z-40 flex justify-between h-[51px] px-3 sm:px-2 border-b transition-colors duration-150 ${
          hasBorder ? "border-slate-200" : "border-transparent"
        }`}
        id="nav"
        ref={navRef}
      >
        <div className="flex flex-row space-x-0 max-w-4xl mx-auto w-full items-center">
          {Object.entries(navItems).map(([path, { name }]) => {
            return (
              <Link
                key={path}
                href={path}
                className="transition-all hover:text-slate-900 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1 cursor-pointer"
              >
                {name}
              </Link>
            );
          })}
        </div>
      </nav>
      <div ref={sentinelRef} className="h-[51px]" />
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

interface SocialLink {
  label: string;
  href: string;
}

const socialLinks: SocialLink[] = [
  {
    label: "github",
    href: "https://github.com/Jkense",
  },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/jasperkense/",
  },
  {
    label: "start-up",
    href: "https://www.leapfrogapp.com/",
  },
  {
    label: "medium",
    href: "https://medium.com/@JasperKense",
  },
];

export function LetsConnect() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative my-16 bg-white dark:bg-white"
    >
      <div>
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">
          Let&apos;s Connect
        </h2>
        <p className="mb-6 text-slate-700">
          Always interested in new opportunities, collaborations, and
          conversations about technology and design.
        </p>
      </div>

      {/* Links positioned at the bottom - styled like footer */}
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        {socialLinks.map((link, index) => (
          <li
            key={link.href}
            className={
              isVisible ? "animate-fly-in-bottom" : "opacity-0 translate-y-8"
            }
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: "forwards",
            }}
          >
            <a
              className="group flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href={link.href}
            >
              <span className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowIcon />
              </span>
              <p className="ml-2 h-7">{link.label}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}


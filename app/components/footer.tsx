"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Disconnect observer after first trigger so animation only happens once
            if (footerRef.current) {
              observer.unobserve(footerRef.current);
            }
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <footer ref={footerRef} className="mb-16">
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        {socialLinks.map((link, index) => (
          <motion.li
            key={link.href}
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: "easeOut",
            }}
          >
            <a
              className="group flex items-center transition-all hover:text-slate-900 dark:hover:text-neutral-100 cursor-pointer"
              rel="noopener noreferrer"
              target="_blank"
              href={link.href}
            >
              <span className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowIcon />
              </span>
              <p className="ml-2 h-7">{link.label}</p>
            </a>
          </motion.li>
        ))}
      </ul>
      <p className="mt-8 text-neutral-600 dark:text-neutral-300">
        © {new Date().getFullYear()} &middot; made by me
      </p>
    </footer>
  );
}

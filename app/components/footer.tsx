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
      className="ml-2"
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
    label: "Github",
    href: "https://github.com/Jkense",
  },
  {
    label: "Linkedin",
    href: "https://www.linkedin.com/in/jasperkense/",
  },
  {
    label: "Startup",
    href: "https://www.leapfrogapp.com/",
  },
  {
    label: "Medium",
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
    <footer ref={footerRef} className="border-t border-border">
      <div className="max-w-4xl mx-auto w-full px-6 lg:px-0 py-6">
        <ul className="flex gap-9 flex-wrap">
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
                className="group flex items-center text-base hover:text-primary transition-colors"
                rel="noopener noreferrer"
                target="_blank"
                href={link.href}
              >
                <span className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  {link.label}
                </span>
                <span className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowIcon />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

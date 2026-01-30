"use client";

import { useState } from "react";
import { GeistMono } from "geist/font/mono";

export type EducationItem = {
  period: string;
  degree: string;
  university: string;
  title: string;
  highlights?: string[];
};

type Props = {
  items: EducationItem[];
};

export function EducationList({ items }: Props) {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());

  const toggleIndex = (index: number) => {
    setOpenSet((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => {
        const isOpen = openSet.has(index);
        return (
          <div key={index} className="flex flex-col gap-2">
            {/* First line: period + degree + university */}
            <div className={`flex gap-6 text-sm text-muted flex-wrap ${GeistMono.className}`}>
              <span>{item.period}</span>
              <span>{item.degree}</span>
              <span>{item.university}</span>
            </div>
            {/* Second line: title + expand arrow */}
            <button
              onClick={() => toggleIndex(index)}
              className="flex items-center justify-between w-full text-left group cursor-pointer"
            >
              <span className="text-base group-hover:text-primary transition-colors">
                {item.title}
              </span>
              <span
                className={`text-muted transition-transform duration-200 ease-out ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                ▾
              </span>
            </button>
            {/* Expandable content */}
            {isOpen && item.highlights && item.highlights.length > 0 && (
              <ul className="list-disc pl-5 text-sm text-muted mt-2">
                {item.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

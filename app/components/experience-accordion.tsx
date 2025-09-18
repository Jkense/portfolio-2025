"use client";

import { useState } from "react";

export type ExperienceItem = {
  company: string;
  role: string;
  period?: string;
  summary?: string;
  highlights?: string[];
};

type Props = {
  items: ExperienceItem[];
};

export function ExperienceAccordion({ items }: Props) {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set([0]));

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
    <div className="divide-y divide-slate-200 rounded-md border border-slate-200">
      {items.map((item, index) => {
        const isOpen = openSet.has(index);
        const controlId = `experience-section-${index}`;
        return (
          <div key={`${item.company}-${index}`} className="">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              aria-expanded={isOpen}
              aria-controls={controlId}
              onClick={() => toggleIndex(index)}
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-slate-900">
                  {item.role} {item.company ? `· ${item.company}` : ""}
                </div>
                {item.period ? (
                  <div className="text-xs text-slate-500">{item.period}</div>
                ) : null}
              </div>
              <span
                className={`ml-2 inline-block transform text-slate-500 transition-transform ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
                aria-hidden
              >
                ▾
              </span>
            </button>

            <div
              id={controlId}
              role="region"
              aria-labelledby={controlId}
              className={`overflow-hidden px-4 transition-all duration-200 ${
                isOpen ? "max-h-[1000px] py-3" : "max-h-0"
              }`}
            >
              {item.summary ? (
                <p className="mb-2 text-sm text-slate-700">{item.summary}</p>
              ) : null}
              {item.highlights && item.highlights.length > 0 ? (
                <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {item.highlights.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";

export default function ZoomableImage(props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Image
        {...props}
        alt={props.alt}
        className={
          "rounded-lg cursor-zoom-in transition-transform duration-200 " +
          (props.className || "")
        }
        onClick={() => setOpen(true)}
        style={{ maxWidth: "100%", ...props.style }}
      />
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div className="relative max-w-4xl w-full flex items-center justify-center">
            <Image
              {...props}
              alt={props.alt}
              className="rounded-lg shadow-2xl max-h-[90vh] max-w-full cursor-zoom-out bg-white"
              onClick={() => setOpen(false)}
              style={{ width: "auto", height: "auto" }}
              priority
            />
            <button
              className="absolute top-2 right-2 text-white bg-black/60 rounded-full p-2 hover:bg-black/80"
              onClick={() => setOpen(false)}
              aria-label="Close image preview"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

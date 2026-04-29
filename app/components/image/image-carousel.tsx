"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";

type CarouselImage = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

/**
 * Placeholder component used as children of ImageCarousel.
 * Never renders directly — ImageCarousel extracts its props.
 */
export function CarouselSlide(_props: CarouselImage) {
  return null;
}

type ImageCarouselProps = {
  children?: React.ReactNode;
};

export default function ImageCarousel({ children }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const didMoveRef = useRef(false);

  // Extract image data from CarouselSlide children
  const images: CarouselImage[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const props = child.props as CarouselImage;
      if (props.src) {
        images.push(props);
      }
    }
  });

  if (!images.length) {
    return null;
  }

  const current = images[index];
  const fullscreenWidth = current.width ?? 896;
  const fullscreenHeight = current.height ?? 504;

  useEffect(() => {
    if (!isFullscreenOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsFullscreenOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isFullscreenOpen]);

  function prev() {
    setDirection(-1);
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }

  function next() {
    setDirection(1);
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  function goTo(i: number) {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  }

  function openFullscreen() {
    if (didMoveRef.current) {
      didMoveRef.current = false;
      return;
    }

    setIsFullscreenOpen(true);
  }

  function closeFullscreen() {
    setIsFullscreenOpen(false);
  }

  function onPointerDown(event: React.PointerEvent) {
    pointerStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
    didMoveRef.current = false;
  }

  function onPointerMove(event: React.PointerEvent) {
    if (!pointerStartRef.current) return;

    const movedX = Math.abs(event.clientX - pointerStartRef.current.x);
    const movedY = Math.abs(event.clientY - pointerStartRef.current.y);

    if (movedX > 8 || movedY > 8) {
      didMoveRef.current = true;
    }
  }

  function onPointerUp() {
    pointerStartRef.current = null;
  }

  function onDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const swipe = Math.abs(info.offset.x) * info.velocity.x;
    const swipeThreshold = 8000;

    if (swipe < -swipeThreshold) {
      next();
    } else if (swipe > swipeThreshold) {
      prev();
    }
  }

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 88 : -88,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -88 : 88,
      opacity: 0,
    }),
  };

  return (
    <figure className="relative w-full m-0 p-0">
      <div
        className="relative w-full h-[min(70vh,34rem)] overflow-hidden rounded-lg border border-slate-200 bg-white p-0 select-none touch-pan-y dark:border-slate-700 sm:h-[min(75vh,38rem)] lg:h-[min(80vh,42rem)]"
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.button
            key={index}
            className="absolute inset-0 cursor-grab active:cursor-grabbing border-0 bg-transparent p-0 text-left"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            dragMomentum={false}
            onDragEnd={onDragEnd}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onClick={openFullscreen}
            type="button"
            aria-label="Open fullscreen image"
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              className="pointer-events-none select-none object-cover object-center"
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 via-black/0 to-transparent" />
          </motion.button>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <motion.button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex aspect-square w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white shadow-lg shadow-black/10 backdrop-blur-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
              type="button"
              aria-label="Previous image"
              whileHover={{ scale: 1.08, y: -1 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>

            <motion.button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex aspect-square w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white shadow-lg shadow-black/10 backdrop-blur-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
              type="button"
              aria-label="Next image"
              whileHover={{ scale: 1.08, y: -1 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.figcaption
          key={current.caption ?? index}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-snug min-h-[1.5em]"
        >
          {current.caption}
        </motion.figcaption>
      </AnimatePresence>

      {images.length > 1 && (
        <div className="flex justify-center items-center gap-4 mt-3">
          <div className="flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                type="button"
                aria-label={`Show image ${i + 1}`}
                className="relative h-2.5 w-2.5 rounded-full bg-slate-300 transition-colors dark:bg-slate-600"
              >
                {i === index && (
                  <span className="absolute inset-0 rounded-full bg-slate-800 dark:bg-white" />
                )}
              </button>
            ))}
          </div>
          <motion.span
            key={`${index}-${images.length}`}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-slate-500 dark:text-slate-400 tabular-nums"
          >
            {index + 1} / {images.length}
          </motion.span>
        </div>
      )}

      <AnimatePresence>
        {isFullscreenOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFullscreen}
          >
            <motion.div
              className="relative w-full flex items-center justify-center"
              initial={{ scale: 0.98, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={current.alt}
                width={fullscreenWidth}
                height={fullscreenHeight}
                className="rounded-lg shadow-2xl max-h-[90vh] max-w-full cursor-zoom-out bg-white select-none"
                draggable={false}
                priority
                onClick={closeFullscreen}
                style={{ width: "auto", height: "auto" }}
              />
              <button
                className="absolute top-2 right-2 text-white bg-black/60 rounded-full p-2 hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                onClick={closeFullscreen}
                aria-label="Close fullscreen image"
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </figure>
  );
}

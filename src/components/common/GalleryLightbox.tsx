import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/data/gallery";

interface GalleryLightboxProps {
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
}

const SWIPE_THRESHOLD = 50;

export function GalleryLightbox({ images, initialIndex, onClose }: GalleryLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const current = images[index];

  const goTo = useCallback(
    (nextIndex: number) => {
      if (nextIndex < 0 || nextIndex >= images.length) return;
      setIndex(nextIndex);
    },
    [images.length]
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, goPrev, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
  };

  if (!current) return null;

  const transition = prefersReducedMotion ? { duration: 0 } : { duration: 0.25 };

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition}
        className="fixed inset-0 z-[100] flex flex-col bg-black/95"
        role="dialog"
        aria-modal="true"
        aria-label="Image gallery viewer"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 shrink-0">
          <p className="text-sm text-muted-foreground truncate pr-4">
            {current.caption ?? current.alt}
            <span className="text-muted-foreground/60 ml-2">
              {index + 1} / {images.length}
            </span>
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-border bg-card text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close gallery viewer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-12 min-h-0">
          {index > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-2 sm:left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/90 text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={current.id}
              src={current.src}
              alt={current.alt}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
              transition={transition}
              className="max-h-[calc(100vh-8rem)] max-w-full object-contain rounded shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </AnimatePresence>

          {index < images.length - 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-2 sm:right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/90 text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {images.length > 1 && (
          <div
            className="flex justify-center gap-1.5 px-4 pb-4 overflow-x-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => goTo(i)}
                className={cn(
                  "shrink-0 h-12 w-12 sm:h-14 sm:w-14 rounded overflow-hidden border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  i === index ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                )}
                aria-label={`View image ${i + 1}: ${img.alt}`}
                aria-current={i === index ? "true" : undefined}
              >
                <img src={img.src} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

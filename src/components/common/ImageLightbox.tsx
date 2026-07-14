import { useEffect, useCallback, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageLightboxProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  children?: ReactNode;
}

export function ImageLightbox({
  src,
  alt,
  className,
  imgClassName,
}: ImageLightboxProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group relative block w-full h-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
        aria-label={`View ${alt} fullscreen`}
      >
        <img
          src={src}
          alt={alt}
          className={cn("w-full h-full object-cover", imgClassName)}
          loading="lazy"
        />
        {/* Corner brackets on hover */}
        <span
          className="pointer-events-none absolute inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-hidden="true"
        >
          <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
          <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
          <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
          <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
        </span>
      </button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
                onClick={close}
                role="dialog"
                aria-modal="true"
                aria-label={alt}
              >
                <button
                  type="button"
                  onClick={close}
                  className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded border border-border bg-card text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
                <motion.img
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  src={src}
                  alt={alt}
                  className="max-h-[90vh] max-w-[95vw] object-contain rounded shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

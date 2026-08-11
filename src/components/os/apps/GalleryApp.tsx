import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { galleryImages } from "@/data/gallery";
import { AppScreenShell } from "../AppScreenShell";
import { screenMeta } from "@/data/osApps";

export function GalleryApp() {
  const meta = screenMeta.gallery;
  const [lightbox, setLightbox] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative h-full">
      <AppScreenShell title={meta.title} icon={meta.icon}>
        <div className="grid grid-cols-2 gap-2 p-3">
          {galleryImages.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setLightbox(item.src)}
              className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <p className="absolute bottom-1.5 left-1.5 right-1.5 truncate text-[9px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                {item.caption ?? item.alt}
              </p>
            </motion.button>
          ))}
        </div>
      </AppScreenShell>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[90] flex flex-col bg-black"
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
          >
            <div className="flex shrink-0 items-center justify-end px-3 pb-1 pt-3">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setLightbox(null);
                }}
                className="relative z-[91] flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/20 transition-colors hover:bg-white/25"
                aria-label="Close image"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <button
              type="button"
              className="flex min-h-0 flex-1 items-center justify-center p-3"
              onClick={() => setLightbox(null)}
              aria-label="Close preview"
            >
              <motion.img
                initial={{ scale: 0.94 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.94 }}
                src={lightbox}
                alt=""
                className="max-h-full max-w-full rounded-xl object-contain"
                onClick={(e) => e.stopPropagation()}
                draggable={false}
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

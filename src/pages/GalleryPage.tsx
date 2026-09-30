import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { galleryImages } from "@/data/gallery";
import { GalleryLightbox } from "@/components/common/GalleryLightbox";
import { SplitReveal } from "@/components/motion/Text";
import { setScrollLocked } from "@/components/motion/SmoothScroll";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function GalleryPage() {
  const reduced = useReducedMotion();
  const [category, setCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setScrollLocked(lightboxIndex !== null);
  }, [lightboxIndex]);

  const categories = useMemo(() => ["All", ...new Set(galleryImages.map((img) => img.category))], []);
  const images = useMemo(
    () => (category === "All" ? galleryImages : galleryImages.filter((img) => img.category === category)),
    [category]
  );

  return (
    <main className="container-max min-h-screen pb-24 pt-36 md:pt-44">
      <div className="mb-12 flex flex-col gap-10 md:mb-16">
        <div>
          <p className="mb-4 font-mono text-xs text-muted-foreground">{galleryImages.length} frames</p>
          <h1 className="text-[clamp(3rem,9vw,7rem)] font-medium leading-[0.92] tracking-[-0.05em]">
            <SplitReveal text="Visual" immediate delay={0.1} />{" "}
            <span className="font-serif font-normal italic text-primary">
              <SplitReveal text="archive." immediate delay={0.2} />
            </span>
          </h1>
          <p className="mt-6 max-w-md text-sm text-muted-foreground">
            Photos, Flutter project screenshots, certifications and hackathon moments from Abhishek Sharma, Flutter
            developer based in Itahari, Nepal.
          </p>
        </div>

        <div className="no-scrollbar isolate -mx-5 flex gap-1 overflow-x-auto px-5 sm:mx-[-0.25rem] sm:flex-wrap sm:overflow-visible sm:px-1" role="tablist" aria-label="Filter gallery">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2.5 text-[13px] sm:px-3.5 sm:py-1.5 transition-colors duration-300",
                category === c ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {category === c && (
                <motion.span
                  layoutId="gallery-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              {c}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout={!reduced} className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
        <AnimatePresence mode="popLayout">
          {images.map((img, i) => (
            <motion.button
              key={img.id}
              layout={!reduced}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, delay: Math.min(i, 12) * 0.03, ease }}
              onClick={() => setLightboxIndex(i)}
              data-cursor="Open"
              className="group relative mb-3 block w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-card md:mb-4"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/70 to-transparent p-3 text-left text-xs text-white/90 transition-transform duration-500 ease-out group-hover:translate-y-0">
                {img.caption ?? img.category}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {lightboxIndex !== null && (
        <GalleryLightbox images={images} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </main>
  );
}

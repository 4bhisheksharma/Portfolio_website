import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { galleryImages, gallerySizeClasses } from "@/data/gallery";
import { GalleryLightbox } from "@/components/common/GalleryLightbox";
import { Reveal } from "@/components/common/Reveal";
import { cn } from "@/lib/utils";

export function GalleryGrid() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[100px] sm:auto-rows-[120px] md:auto-rows-[140px] gap-2 sm:gap-3">
        {galleryImages.map((image, index) => (
          <Reveal key={image.id} delay={Math.min(index * 0.02, 0.3)}>
            <motion.button
              type="button"
              onClick={() => setLightboxIndex(index)}
              className={cn(
                "group relative w-full h-full overflow-hidden rounded-lg border border-border bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                gallerySizeClasses[image.size]
              )}
              aria-label={`View ${image.alt}`}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200" />
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-200">
                <p className="text-[10px] sm:text-xs text-primary font-medium truncate">
                  {image.category}
                </p>
                {(image.caption ?? image.alt) && (
                  <p className="text-[10px] sm:text-xs text-white/90 truncate mt-0.5">
                    {image.caption ?? image.alt}
                  </p>
                )}
              </div>
            </motion.button>
          </Reveal>
        ))}
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={galleryImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

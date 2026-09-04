import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Info,
  ExternalLink,
  Share2,
  Check,
  Sparkles,
} from "lucide-react";
import { galleryImages, type GalleryImage } from "@/data/gallery";
import { AppScreenShell } from "../AppScreenShell";
import { screenMeta } from "@/data/osApps";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Profile", "About", "Projects", "Certification", "Experience"] as const;

export function GalleryApp() {
  const meta = screenMeta.gallery;
  const prefersReducedMotion = useReducedMotion();

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [copied, setCopied] = useState(false);

  // Filtered images based on active tab
  const filteredImages = useMemo(() => {
    if (activeCategory === "All") return galleryImages;
    if (activeCategory === "Projects") {
      return galleryImages.filter(
        (img) =>
          img.category !== "Profile" &&
          img.category !== "About" &&
          img.category !== "Certification" &&
          img.category !== "Experience"
      );
    }
    return galleryImages.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  const activeImage = selectedIdx !== null ? filteredImages[selectedIdx] : null;

  const handlePrev = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) =>
      prev !== null ? (prev > 0 ? prev - 1 : filteredImages.length - 1) : 0
    );
  }, [selectedIdx, filteredImages.length]);

  const handleNext = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) =>
      prev !== null ? (prev < filteredImages.length - 1 ? prev + 1 : 0) : 0
    );
  }, [selectedIdx, filteredImages.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIdx(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIdx, handlePrev, handleNext]);

  const handleShare = (img: GalleryImage) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + img.src);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative h-full">
      <AppScreenShell title={meta.title} icon={meta.icon}>
        <div className="space-y-2.5 p-3">
          {/* Category Filter Tabs */}
          <div className="flex gap-1.5 overflow-x-auto os-scroll pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={(e) => {
                  setActiveCategory(cat);
                  setSelectedIdx(null);
                  e.currentTarget.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                    block: "nearest",
                  });
                }}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1 text-[10.5px] font-medium transition-all",
                  activeCategory === cat
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "bg-white/[0.08] text-white/60 hover:bg-white/[0.14] hover:text-white"
                )}
              >
                {cat === "Certification" ? "Honors" : cat}
              </button>
            ))}
          </div>

          {/* Album Summary Bar */}
          <div className="flex items-center justify-between px-1 text-[10px] text-white/50">
            <span>
              {filteredImages.length} {filteredImages.length === 1 ? "photo" : "photos"}
            </span>
            <span className="flex items-center gap-1 text-cyan-400/80">
              <Sparkles className="h-2.5 w-2.5" />
              HD Gallery
            </span>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {filteredImages.map((item, i) => (
              <motion.button
                key={item.id}
                type="button"
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.025 }}
                onClick={() => setSelectedIdx(i)}
                className="group relative aspect-square overflow-hidden rounded-[16px] border border-white/10 bg-black/40 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                
                {/* Category Pill Tag */}
                <div className="absolute top-1.5 left-1.5">
                  <span className="rounded-md border border-white/20 bg-black/60 px-1.5 py-0.5 text-[8.5px] font-medium text-white/90 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                <p className="absolute bottom-1.5 left-2 right-2 truncate text-left text-[9.5px] font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {item.caption ?? item.alt}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </AppScreenShell>

      {/* Fullscreen Photo Lightbox / Media Viewer */}
      <AnimatePresence>
        {activeImage && selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-[100] flex flex-col bg-black select-none pointer-events-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Photo Viewer"
          >
            {/* Top Toolbar */}
            <div className="relative z-50 flex shrink-0 items-center justify-between border-b border-white/10 bg-black/70 px-3 py-2.5 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedIdx(null);
                  }}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 active:scale-90"
                  aria-label="Back to gallery"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div>
                  <span className="text-xs font-semibold text-white">
                    {selectedIdx + 1} / {filteredImages.length}
                  </span>
                  <p className="text-[9.5px] text-white/50">{activeImage.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowInfo((v) => !v);
                  }}
                  className={cn(
                    "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors active:scale-90",
                    showInfo ? "bg-cyan-500 text-white" : "bg-white/15 text-white hover:bg-white/25"
                  )}
                  aria-label="Photo Info"
                  title="Photo Information"
                >
                  <Info className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedIdx(null);
                  }}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 active:scale-90"
                  aria-label="Close viewer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Main Interactive Media Stage with backdrop dismiss */}
            <div
              className="relative flex min-h-0 flex-1 cursor-pointer items-center justify-center p-2"
              onClick={() => setSelectedIdx(null)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.18 }}
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.4}
                  onDragEnd={(_, info) => {
                    if (Math.abs(info.offset.y) > 60 || Math.abs(info.velocity.y) > 300) {
                      setSelectedIdx(null);
                    }
                  }}
                  className="relative flex h-full w-full items-center justify-center cursor-default"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={activeImage.src}
                    alt={activeImage.alt}
                    className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Floating Navigation Controls */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/85 shadow-lg backdrop-blur-md transition-all hover:bg-black/90 hover:text-white active:scale-90"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/85 shadow-lg backdrop-blur-md transition-all hover:bg-black/90 hover:text-white active:scale-90"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Info Drawer (Conditional) */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-white/10 bg-[#121217]/95 px-4 py-3 text-white backdrop-blur-xl"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
                    Image Details
                  </p>
                  <p className="mt-1 text-xs font-medium text-white/90">
                    {activeImage.caption ?? activeImage.alt}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-white/60">
                    <span className="rounded bg-white/10 px-2 py-0.5">
                      Album: {activeImage.category}
                    </span>
                    <span className="rounded bg-white/10 px-2 py-0.5">
                      Resolution: High Quality HD
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Controls Bar */}
            <div className="flex shrink-0 items-center justify-between border-t border-white/10 bg-black/70 px-4 py-3 backdrop-blur-md">
              <p className="line-clamp-1 max-w-[55%] text-[11px] text-white/80">
                {activeImage.caption ?? activeImage.alt}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleShare(activeImage)}
                  className="flex items-center gap-1 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 text-[10.5px] font-medium text-white transition-colors hover:bg-white/20 active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-3 w-3" />
                      <span>Share</span>
                    </>
                  )}
                </button>

                <a
                  href={activeImage.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 rounded-xl bg-white px-3 py-1.5 text-[10.5px] font-semibold text-black transition-transform hover:bg-white/90 active:scale-95"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Full Res</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useDragControls,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { X } from "lucide-react";

interface OsBottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function OsBottomSheet({ open, onClose, title, subtitle, children }: OsBottomSheetProps) {
  const prefersReducedMotion = useReducedMotion();
  const dragControls = useDragControls();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 70 || info.velocity.y > 350) onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Ambient Backdrop */}
          <motion.button
            type="button"
            aria-label="Dismiss sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="absolute inset-0 z-[90] bg-black/65 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sheet Body */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.03, bottom: 0.45 }}
            onDragEnd={onDragEnd}
            initial={prefersReducedMotion ? false : { y: "100%" }}
            animate={{ y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { y: "100%" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-x-0 bottom-0 z-[91] flex max-h-[90%] flex-col overflow-hidden rounded-t-[32px] border-t border-white/20 bg-[#121217]/95 shadow-[0_-20px_60px_rgba(0,0,0,0.85)] backdrop-blur-3xl will-change-transform"
          >
            {/* Grab Handle Header */}
            <div
              className="flex shrink-0 cursor-grab touch-none flex-col items-center border-b border-white/[0.06] bg-[#17171d]/60 pb-3 pt-2.5 active:cursor-grabbing"
              onPointerDown={(e) => dragControls.start(e)}
            >
              {/* Ergonomic pill grab bar */}
              <div className="h-1.5 w-11 rounded-full bg-white/30 shadow-sm transition-colors hover:bg-white/50" />

              <div className="flex w-full items-center justify-between gap-3 px-4 pt-2.5">
                <div className="min-w-0 flex-1">
                  {subtitle && (
                    <p className="truncate text-[10px] font-medium tracking-wide uppercase text-cyan-400/80">
                      {subtitle}
                    </p>
                  )}
                  <h2 className="min-w-0 truncate text-sm font-semibold tracking-tight text-white">
                    {title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-white/70 transition-all hover:bg-white/[0.16] hover:text-white active:scale-90"
                  aria-label="Close"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Content Viewport */}
            <div className="os-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 pb-8">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

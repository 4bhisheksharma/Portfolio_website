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
  children: React.ReactNode;
}

export function OsBottomSheet({ open, onClose, title, children }: OsBottomSheetProps) {
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
    if (info.offset.y > 80 || info.velocity.y > 400) onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Dismiss"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="absolute inset-0 z-[90] bg-black/55 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.04, bottom: 0.45 }}
            onDragEnd={onDragEnd}
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { y: "100%" }}
            animate={{ y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { y: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 36 }}
            className="absolute inset-x-0 bottom-0 z-[91] flex max-h-[88%] flex-col overflow-hidden rounded-t-[28px] border-t border-white/10 bg-[#121218]/97 shadow-[0_-12px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
          >
            <div
              className="flex shrink-0 cursor-grab touch-none flex-col items-center active:cursor-grabbing"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="mt-2.5 h-1 w-10 rounded-full bg-white/25" />
              <div className="flex w-full items-center justify-between gap-3 px-4 pb-2 pt-3">
                <h2 className="min-w-0 flex-1 truncate text-sm font-semibold text-white">
                  {title}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="os-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

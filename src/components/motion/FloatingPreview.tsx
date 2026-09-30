import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Image card that trails the cursor while a list row is hovered.
 * Spread `containerProps` on the list wrapper, call `show(src)` on row hover, render `preview`.
 */
export function useFloatingPreview({ contain = false }: { contain?: boolean } = {}) {
  const reduced = useReducedMotion();
  const [src, setSrc] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 160, damping: 22, mass: 0.6 });

  const containerProps = {
    onPointerMove: (e: React.PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    },
    onPointerLeave: () => setSrc(null),
  };

  const show = (next: string | null) => (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setSrc(next);
  };

  const preview = reduced ? null : (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50 hidden h-48 w-64 overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl md:block"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-115%" }}
      animate={{ opacity: src ? 1 : 0, scale: src ? 1 : 0.85, rotate: src ? -3 : 0 }}
      transition={{ duration: 0.35, ease }}
    >
      <AnimatePresence mode="popLayout">
        {src && (
          <motion.img
            key={src}
            src={src}
            alt=""
            className={contain ? "absolute inset-0 h-full w-full bg-white object-contain p-2" : "absolute inset-0 h-full w-full object-cover"}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );

  return { containerProps, show, preview };
}

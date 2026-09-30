import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

let lenis: Lenis | null = null;

/** Scroll to a selector or y-offset, using Lenis when it's running. */
export function scrollToTarget(target: string | number, immediate = false) {
  if (lenis) {
    lenis.scrollTo(target, { offset: typeof target === "string" ? -24 : 0, immediate, duration: 1.4 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
  }
}

export function setScrollLocked(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const instance = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.95,
      smoothWheel: true,
    });
    lenis = instance;

    let frame = requestAnimationFrame(function raf(time) {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      lenis = null;
    };
  }, [reduced]);

  return <>{children}</>;
}

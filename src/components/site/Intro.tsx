import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { setScrollLocked } from "@/components/motion/SmoothScroll";

const ease = [0.22, 1, 0.36, 1] as const;
const KEY = "intro-seen";

function alreadySeen() {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

const willPlay =
  typeof window !== "undefined" &&
  !alreadySeen() &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let finished = false;

/** Seconds an entrance animation should wait so it plays after the curtain lifts. */
export function getIntroDelay() {
  return willPlay && !finished ? 1.35 : 0;
}

/** Brief curtain on first visit per session: a counter, then the page slides in. */
export function Intro() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(() => willPlay && !reduced);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!show) return;
    setScrollLocked(true);
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1100, 1);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else
        setTimeout(() => {
          finished = true;
          setShow(false);
          setScrollLocked(false);
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {
            /* storage unavailable */
          }
        }, 200);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end justify-between bg-background p-6 md:p-10"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease }}
        >
          <motion.span
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Abhishek Sharma · Portfolio
          </motion.span>
          <span className="font-mono text-[clamp(4rem,14vw,10rem)] font-light leading-none tabular-nums tracking-tighter">
            {count}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

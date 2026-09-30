import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { heroSocials } from "@/data/socials";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitReveal } from "@/components/motion/Text";
import { scrollToTarget } from "@/components/motion/SmoothScroll";
import { getIntroDelay } from "./Intro";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

const ease = [0.22, 1, 0.36, 1] as const;

/** Keeps the page usable if WebGL is unavailable. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const reduced = useReducedMotion();
  const [D] = useState(getIntroDelay);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v;
  });
  // Load the WebGL scene once the page is idle, and pause it while the hero is off-screen
  const [sceneReady, setSceneReady] = useState(false);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const start = () => setSceneReady(true);
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const id = w.requestIdleCallback ? w.requestIdleCallback(start, { timeout: 1500 }) : window.setTimeout(start, 400);
    return () => {
      if (!w.requestIdleCallback) window.clearTimeout(id);
    };
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const fadeUp = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay: D + delay, ease },
        };

  return (
    <section id="hero" ref={ref} className="relative flex items-start overflow-hidden sm:min-h-[100svh] sm:items-end">
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: D + 0.2 }}
      >
        {sceneReady && (
          <SceneBoundary>
            <Suspense fallback={null}>
              <HeroScene progress={progress} active={inView} reduced={Boolean(reduced)} />
            </Suspense>
          </SceneBoundary>
        )}
      </motion.div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-max relative z-10 pb-10 pt-28 sm:pt-40 md:pb-14"
      >
        <motion.div {...fadeUp(0.1)} className="mb-6 flex flex-wrap items-center gap-3 text-[13px] text-muted-foreground sm:mb-8">
          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 backdrop-blur">
            Available for freelance
          </span>
          <span>Flutter developer based in Itahari, Nepal</span>
        </motion.div>

        <h1 className="max-w-5xl text-[clamp(2.75rem,8.5vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.045em]">
          <SplitReveal text="Building mobile apps" immediate delay={D + 0.25} />
          <br />
          <span className="text-muted-foreground">
            <SplitReveal text="that" immediate delay={D + 0.45} />{" "}
          </span>
          <span className="font-serif font-normal italic tracking-[-0.02em] text-primary">
            <SplitReveal text="feel right." immediate delay={D + 0.55} />
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 sm:mt-10 sm:gap-10 md:mt-14 md:flex-row md:items-end md:justify-between">
          <motion.p {...fadeUp(0.8)} className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            I&apos;m Abhishek, a <span className="text-foreground">freelance Flutter developer</span> shipping
            cross-platform products used across fintech, health and civic services.
          </motion.p>

          <motion.div {...fadeUp(0.95)} className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Magnetic>
              <button
                onClick={() => scrollToTarget("#projects")}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-[13px] min-[380px]:text-sm sm:px-6 sm:py-3.5 font-medium text-primary-foreground transition-transform duration-300 ease-out active:scale-[0.97]"
              >
                View selected work
                <ArrowDown className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-y-0.5" />
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-[13px] min-[380px]:text-sm sm:px-6 sm:py-3.5 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.04]"
              >
                Resume
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          {...fadeUp(1.1)}
          className="mt-12 flex items-center justify-between border-t sm:mt-16 border-white/[0.06] pt-5 text-xs text-muted-foreground md:mt-24"
        >
          <span className="flex items-center gap-2">
            <ArrowDown className="h-3.5 w-3.5" />
            Scroll to explore
          </span>
          <ul className="hidden items-center gap-5 sm:flex">
            {heroSocials
              .filter((s) => ["LinkedIn", "GitHub", "pub.dev", "Blog"].includes(s.label))
              .map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline transition-colors hover:text-foreground"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}

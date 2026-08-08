import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { cn } from "@/lib/utils";
import DepthCarousel, { type DepthCarouselProps } from "@/components/common/DepthCarousel";

/** Fraction of section scroll reserved after the last card so users can reach content below quickly. */
const TAIL_FRACTION = 0.1;

interface ScrollDepthCarouselProps<T> extends Omit<
  DepthCarouselProps<T>,
  "scrollDriven" | "positionMotionValue" | "controlledIndex" | "autoplay" | "loop" | "onChange"
> {
  scrollStepVh?: number;
  endPaddingVh?: number;
  footer?: ReactNode;
  hint?: string;
  isMobile?: boolean;
}

function progressToIndex(progress: number, count: number): number {
  const max = Math.max(0, count - 1);
  if (max === 0) return 0;

  const cardZone = 1 - TAIL_FRACTION;
  const normalized = Math.min(1, Math.max(0, progress / cardZone));
  // Floor + bias keeps each card stable within its scroll slice (one card per scroll step).
  return Math.min(max, Math.floor(normalized * max + 0.38));
}

export function ScrollDepthCarousel<T>({
  items = [],
  scrollStepVh = 42,
  endPaddingVh = 28,
  footer,
  hint = "Scroll to explore",
  className,
  showControls,
  isMobile = false,
  cardHeight = 420,
  ...carouselProps
}: ScrollDepthCarouselProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastIndexRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();
  const count = items.length;
  const [cardIndex, setCardIndex] = useState(0);
  const [showFooter, setShowFooter] = useState(false);

  const stepVh = isMobile ? Math.max(scrollStepVh, 48) : scrollStepVh;
  const transitions = Math.max(0, count - 1);
  const sectionHeight = `${transitions * stepVh + endPaddingVh + 88}vh`;
  const carouselHeight = cardHeight + (isMobile ? 32 : 48);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const idx = progressToIndex(progress, count);
    if (idx !== lastIndexRef.current) {
      lastIndexRef.current = idx;
      setCardIndex(idx);
    }
    setShowFooter(idx >= count - 1 && count > 1);
  });

  const handleIndexChange = (index: number) => {
    lastIndexRef.current = index;
    setCardIndex(index);
    setShowFooter(index >= count - 1 && count > 1);
  };

  if (count === 0) return null;

  if (prefersReducedMotion || count === 1) {
    return (
      <div className={cn("relative mx-auto w-full max-w-4xl px-1 sm:px-0", className)}>
        <div style={{ height: carouselHeight + 32 }}>
          <DepthCarousel
            items={items}
            loop={false}
            showControls
            cardHeight={cardHeight}
            {...carouselProps}
          />
        </div>
        {footer && <div className="flex justify-center pt-8 pb-2">{footer}</div>}
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ height: sectionHeight }} className={cn("relative", className)}>
      <div className="sticky top-16 sm:top-20 md:top-24 min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center px-3 sm:px-4 py-4 sm:py-6">
        <div
          className="relative w-full max-w-4xl mx-auto shrink-0"
          style={{ height: carouselHeight }}
        >
          <DepthCarousel
            items={items}
            controlledIndex={cardIndex}
            onChange={handleIndexChange}
            loop={false}
            showControls={showControls ?? isMobile}
            showIndicators={false}
            cardHeight={cardHeight}
            duration={isMobile ? 550 : 600}
            {...carouselProps}
          />
        </div>

        {count > 1 && (
          <div className="mt-4 flex flex-col items-center gap-2 pointer-events-none">
            <div className="flex gap-1.5">
              {items.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full bg-primary transition-all duration-300",
                    i === cardIndex ? "w-5 opacity-100" : "w-1.5 opacity-35"
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground/60 text-center">
              {showFooter && footer
                ? "You've reached the end — scroll on to continue"
                : isMobile
                  ? "Scroll or swipe — one card at a time"
                  : hint}
            </p>
          </div>
        )}

        {footer && (
          <motion.div
            initial={false}
            animate={{ opacity: showFooter ? 1 : 0, y: showFooter ? 0 : 10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "mt-4 flex justify-center w-full px-2",
              showFooter ? "pointer-events-auto" : "pointer-events-none h-0 overflow-hidden mt-0"
            )}
          >
            {footer}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ScrollDepthCarousel;

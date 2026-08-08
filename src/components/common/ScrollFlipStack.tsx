import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollFlipStackProps {
  items: ReactNode[];
  className?: string;
  scrollStepVh?: number;
  footer?: ReactNode;
  hint?: string;
}

function FlipStackCard({
  children,
  index,
  total,
  activeFloat,
  className,
}: {
  children: ReactNode;
  index: number;
  total: number;
  activeFloat: MotionValue<number>;
  className?: string;
}) {
  const distanceFromActive = useTransform(activeFloat, (af) => index - af);

  const rotateX = useTransform(distanceFromActive, (d) => {
    if (d > 0) return Math.min(d * 8, 16);
    if (d <= -1) return -88;
    return d * 88;
  });

  const y = useTransform(distanceFromActive, (d) => {
    if (d > 0) return d * 14;
    if (d <= -1) return -160;
    return d * 120;
  });

  const scale = useTransform(distanceFromActive, (d) => {
    if (d > 0) return Math.max(0.9, 1 - d * 0.035);
    if (d <= -1) return 0.92;
    return 1 + d * 0.04;
  });

  const opacity = useTransform(distanceFromActive, (d) => {
    if (d <= -0.45) return 0;
    if (d > 2.5) return 0;
    if (d > 0) return Math.max(0.45, 1 - d * 0.1);
    return 1;
  });

  const shadowOpacity = useTransform(distanceFromActive, (d) => {
    if (d > 0) return Math.max(0.12, 0.5 - d * 0.1);
    return 0.22;
  });

  const boxShadow = useTransform(
    shadowOpacity,
    (o) => `0 ${16 + o * 28}px ${36 + o * 18}px rgba(0,0,0,${o})`
  );

  const zIndex = total - index;

  return (
    <motion.div
      style={{
        rotateX,
        y,
        scale,
        opacity,
        zIndex,
        transformStyle: "preserve-3d",
        transformOrigin: "center bottom",
      }}
      className={cn(
        "absolute inset-x-0 bottom-0 mx-auto w-full max-w-md",
        className
      )}
    >
      <motion.div style={{ boxShadow }} className="rounded-xl">
        <div style={{ backfaceVisibility: "hidden" }}>{children}</div>
      </motion.div>
    </motion.div>
  );
}

export function ScrollFlipStack({
  items,
  className,
  scrollStepVh = 48,
  footer,
  hint = "Scroll to flip",
}: ScrollFlipStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const count = items.length;
  const [showFooter, setShowFooter] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const activeFloat = useTransform(
    scrollYProgress,
    [0, 1],
    [0, Math.max(0, count - 1)]
  );

  useMotionValueEvent(activeFloat, "change", (value) => {
    const rounded = Math.round(value);
    setActiveIndex(rounded);
    setShowFooter(value >= count - 1.02 && count > 1);
  });

  if (count === 0) return null;

  if (prefersReducedMotion || count === 1) {
    return (
      <div className={cn("flex flex-col gap-5 max-w-md mx-auto", className)}>
        {items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
        {footer && <div className="flex justify-center pt-2">{footer}</div>}
      </div>
    );
  }

  const sectionHeight = `${Math.max((count - 1) * scrollStepVh + 85, 115)}vh`;

  return (
    <div ref={containerRef} style={{ height: sectionHeight }} className={cn("relative", className)}>
      <div
        className="sticky top-20 md:top-24 h-[calc(100vh-5rem)] md:h-[calc(100vh-6rem)] flex items-center justify-center overflow-hidden"
        style={{ perspective: 1400 }}
      >
        <div className="relative w-full max-w-md h-[min(520px,calc(100vh-8rem))] sm:h-[min(560px,calc(100vh-7rem))]">
          {items.map((item, index) => (
            <FlipStackCard
              key={index}
              index={index}
              total={count}
              activeFloat={activeFloat}
            >
              {item}
            </FlipStackCard>
          ))}
        </div>

        {count > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none w-full max-w-md px-4">
            <div className="flex gap-1">
              {items.map((_, i) => (
                <StackDot key={i} index={i} activeFloat={activeFloat} />
              ))}
            </div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
              {activeIndex >= count - 1 && footer ? "You've reached the end" : hint}
            </p>
          </div>
        )}

        {footer && (
          <motion.div
            initial={false}
            animate={{ opacity: showFooter ? 1 : 0, y: showFooter ? 0 : 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "absolute bottom-16 left-1/2 -translate-x-1/2 z-20",
              showFooter ? "pointer-events-auto" : "pointer-events-none"
            )}
          >
            {footer}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function StackDot({
  index,
  activeFloat,
}: {
  index: number;
  activeFloat: MotionValue<number>;
}) {
  const width = useTransform(activeFloat, (af) => {
    const dist = Math.abs(af - index);
    if (dist < 0.5) return 20;
    return 6;
  });

  const opacity = useTransform(activeFloat, (af) => {
    const dist = Math.abs(af - index);
    if (dist < 0.5) return 1;
    return 0.35;
  });

  return (
    <motion.div
      style={{ width, opacity }}
      className="h-1.5 rounded-full bg-primary"
      aria-hidden="true"
    />
  );
}

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollStackCarouselProps {
  items: ReactNode[];
  className?: string;
  itemClassName?: string;
}

function CarouselCard({
  children,
  index,
  total,
  scrollYProgress,
  className,
}: {
  children: ReactNode;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  className?: string;
}) {
  const step = total > 1 ? 1 / (total - 1) : 1;
  const center = index * step;

  const scale = useTransform(scrollYProgress, (progress) => {
    const distance = Math.abs(progress - center) / step;
    return Math.max(0.88, 1 - distance * 0.08);
  });

  const opacity = useTransform(scrollYProgress, (progress) => {
    const distance = Math.abs(progress - center) / step;
    return Math.max(0.45, 1 - distance * 0.35);
  });

  const rotateY = useTransform(scrollYProgress, (progress) => {
    const distance = (progress - center) / step;
    return Math.max(-6, Math.min(6, distance * -4));
  });

  const y = useTransform(scrollYProgress, (progress) => {
    const distance = Math.abs(progress - center) / step;
    return distance * 12;
  });

  return (
    <motion.div
      style={{ scale, opacity, rotateY, y }}
      className={cn(
        "shrink-0 w-[85vw] sm:w-[70vw] md:w-[55vw] lg:w-[42vw] xl:w-[36vw] max-w-md snap-center",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function ScrollStackCarousel({
  items,
  className,
  itemClassName,
}: ScrollStackCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const count = items.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", count > 1 ? `-${(count - 1) * 88}%` : "0%"]
  );

  if (count === 0) return null;

  if (prefersReducedMotion || count === 1) {
    return (
      <div className={cn("flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 sm:mx-0 sm:px-0", className)}>
        {items.map((item, index) => (
          <div
            key={index}
            className={cn("shrink-0 w-[85vw] sm:w-[70vw] md:w-[55vw] lg:w-[42vw] max-w-md snap-center", itemClassName)}
          >
            {item}
          </div>
        ))}
      </div>
    );
  }

  const sectionHeight = `${Math.max(count * 58, 100)}vh`;

  return (
    <div ref={containerRef} style={{ height: sectionHeight }} className={cn("relative", className)}>
      <div
        className="sticky top-20 md:top-24 h-[calc(100vh-5rem)] md:h-[calc(100vh-6rem)] overflow-hidden flex items-center"
        style={{ perspective: 1200 }}
      >
        <motion.div style={{ x }} className="flex gap-5 md:gap-6 pl-[7.5vw] will-change-transform">
          {items.map((item, index) => (
            <CarouselCard
              key={index}
              index={index}
              total={count}
              scrollYProgress={scrollYProgress}
              className={itemClassName}
            >
              {item}
            </CarouselCard>
          ))}
          <div className="shrink-0 w-[7.5vw]" aria-hidden="true" />
        </motion.div>
      </div>
    </div>
  );
}

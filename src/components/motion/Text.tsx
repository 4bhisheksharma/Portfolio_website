import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

interface SplitRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
}

/** Words rise out of a clipping mask, one after another. */
export function SplitReveal({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: SplitRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <span className={className}>{text}</span>;

  const trigger = immediate
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "-10% 0px" } };

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        className="inline"
        initial="hidden"
        {...trigger}
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
        aria-hidden
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="-mx-[0.1em] -mb-[0.2em] -mt-[0.06em] inline-block overflow-hidden px-[0.1em] pb-[0.2em] pt-[0.06em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: "110%", rotate: 4 },
                show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease } },
              }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function ScrollWord({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="transition-none">
      {word}{" "}
    </motion.span>
  );
}

/** Paragraph whose words light up as it scrolls through the viewport. */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  if (reduced) return <p className={className}>{text}</p>;

  return (
    <p ref={ref} className={cn(className)}>
      {words.map((word, i) => {
        const start = i / words.length;
        return (
          <ScrollWord key={`${word}-${i}`} word={word} progress={scrollYProgress} range={[start, start + 1 / words.length]} />
        );
      })}
    </p>
  );
}

interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  y?: number;
}

export function FadeIn({ children, className, delay = 0, y = 24 }: FadeInProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

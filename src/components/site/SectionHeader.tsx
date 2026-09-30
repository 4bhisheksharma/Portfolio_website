import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { SplitReveal } from "@/components/motion/Text";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
  accent?: string;
  aside?: ReactNode;
}

export function SectionHeader({ index, label, title, accent, aside }: SectionHeaderProps) {
  const reduced = useReducedMotion();
  return (
    <div className="mb-10 sm:mb-14 md:mb-20">
      <div className="mb-6 flex items-center gap-4 text-xs text-muted-foreground sm:mb-8">
        <span className="font-mono">{index}</span>
        <motion.span
          className="h-px flex-1 origin-left bg-border"
          initial={reduced ? undefined : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <span className="uppercase tracking-[0.2em]">{label}</span>
      </div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-3xl text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1] tracking-[-0.04em]">
          <SplitReveal text={title} />
          {accent && (
            <>
              {" "}
              <span className="font-serif font-normal italic tracking-[-0.01em] text-muted-foreground">
                <SplitReveal text={accent} delay={0.15} />
              </span>
            </>
          )}
        </h2>
        {aside}
      </div>
    </div>
  );
}

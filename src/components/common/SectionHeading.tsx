import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  className?: string;
}

export function SectionHeading({ title, className }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "text-center text-2xl md:text-3xl font-medium text-primary mb-12 md:mb-14",
        className
      )}
    >
      {title}
    </h2>
  );
}

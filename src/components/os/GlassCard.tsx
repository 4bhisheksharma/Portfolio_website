import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GlassCard({ children, className, onClick }: GlassCardProps) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "rounded-2xl border border-white/10 bg-white/15 backdrop-blur-xl",
        "shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
        onClick && "transition-transform active:scale-[0.98] hover:bg-white/20 text-left w-full",
        className
      )}
    >
      {children}
    </Tag>
  );
}

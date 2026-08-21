import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  /** Skip backdrop-blur for long lists / mobile scroll performance */
  solid?: boolean;
}

export function GlassCard({ children, className, onClick, solid }: GlassCardProps) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "rounded-2xl border border-white/10",
        solid
          ? "bg-white/[0.12]"
          : "bg-white/15 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
        onClick &&
          "text-left w-full transition-colors active:bg-white/[0.16] hover:bg-white/20",
        className
      )}
    >
      {children}
    </Tag>
  );
}

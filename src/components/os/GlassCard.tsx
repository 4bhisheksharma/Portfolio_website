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
        "rounded-[22px] border border-white/10",
        solid
          ? "bg-white/[0.08]"
          : "bg-white/[0.06] backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)]",
        onClick &&
          "text-left w-full transition-all active:scale-[0.99] active:bg-white/[0.12] hover:bg-white/[0.09]",
        className
      )}
    >
      {children}
    </Tag>
  );
}


import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppIconProps {
  label: string;
  icon: LucideIcon;
  badge?: number;
  onClick: () => void;
  size?: "sm" | "md";
  showLabel?: boolean;
}

export function AppIcon({
  label,
  icon: Icon,
  badge,
  onClick,
  size = "md",
  showLabel = true,
}: AppIconProps) {
  const prefersReducedMotion = useReducedMotion();
  const iconSize = size === "sm" ? "h-14 w-14 rounded-[18px]" : "h-[54px] w-[54px] rounded-[16px]";
  const glyphSize = size === "sm" ? "h-[26px] w-[26px]" : "h-6 w-6";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.86 }}
      whileHover={prefersReducedMotion ? undefined : { y: -2 }}
      transition={{ type: "spring", stiffness: 480, damping: 22 }}
      className="flex flex-col items-center gap-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-xl select-none"
      aria-label={label}
    >
      <div className="relative">
        <div
          className={cn(
            "flex items-center justify-center text-white/95",
            iconSize,
            "bg-[#1a1a1c]",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.55),0_4px_14px_rgba(0,0,0,0.45)]",
            "ring-1 ring-white/[0.06]",
            "transition-[box-shadow,transform] duration-200",
            "group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.55),0_6px_18px_rgba(0,0,0,0.55)]"
          )}
        >
          <Icon className={cn(glyphSize)} strokeWidth={1.6} aria-hidden />
        </div>
        {badge != null && badge > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white shadow-lg"
          >
            {badge}
          </motion.span>
        )}
      </div>
      {showLabel && (
        <span className="max-w-[72px] truncate text-[10px] font-medium text-white/90 drop-shadow-sm text-center leading-tight">
          {label}
        </span>
      )}
    </motion.button>
  );
}

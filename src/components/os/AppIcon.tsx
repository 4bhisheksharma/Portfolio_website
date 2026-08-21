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
  const iconSize = size === "sm" ? "h-14 w-14 rounded-[18px]" : "h-[54px] w-[54px] rounded-[16px]";
  const glyphSize = size === "sm" ? "h-[26px] w-[26px]" : "h-6 w-6";

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 rounded-xl select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 active:scale-95 transition-transform duration-100"
      aria-label={label}
    >
      <div className="relative">
        <div
          className={cn(
            "flex items-center justify-center text-white/95",
            iconSize,
            "bg-[#1a1a1c]",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.55),0_4px_14px_rgba(0,0,0,0.45)]",
            "ring-1 ring-white/[0.06]"
          )}
        >
          <Icon className={cn(glyphSize)} strokeWidth={1.6} aria-hidden />
        </div>
        {badge != null && badge > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white shadow-lg">
            {badge}
          </span>
        )}
      </div>
      {showLabel && (
        <span className="max-w-[72px] truncate text-center text-[10px] font-medium leading-tight text-white/90 drop-shadow-sm">
          {label}
        </span>
      )}
    </button>
  );
}

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppIconProps {
  id?: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
  onClick: () => void;
  size?: "sm" | "md";
  showLabel?: boolean;
}

interface AppColorConfig {
  iconColor: string;
  glowColor: string;
}

function getAppColorConfig(id?: string, label?: string): AppColorConfig {
  const key = (id || label || "").toLowerCase();

  // Dark AMOLED Icon Pack Style - Vivid Glowing Accents
  if (key.includes("phone")) {
    return {
      iconColor: "text-emerald-400",
      glowColor: "group-hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.7)]",
    };
  }
  if (key.includes("contact") || key.includes("mail") || key.includes("message")) {
    return {
      iconColor: "text-sky-400",
      glowColor: "group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]",
    };
  }
  if (key.includes("resume") || key.includes("file") || key.includes("cv") || key.includes("note")) {
    return {
      iconColor: "text-amber-400",
      glowColor: "group-hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]",
    };
  }
  if (key.includes("gallery") || key.includes("photo") || key.includes("image")) {
    return {
      iconColor: "text-rose-400",
      glowColor: "group-hover:drop-shadow-[0_0_8px_rgba(251,113,133,0.7)]",
    };
  }
  if (key.includes("camera")) {
    return {
      iconColor: "text-red-400",
      glowColor: "group-hover:drop-shadow-[0_0_8px_rgba(248,113,113,0.7)]",
    };
  }
  if (key.includes("project") || key.includes("rocket")) {
    return {
      iconColor: "text-indigo-400",
      glowColor: "group-hover:drop-shadow-[0_0_8px_rgba(129,140,248,0.7)]",
    };
  }
  if (key.includes("skill") || key.includes("zap")) {
    return {
      iconColor: "text-cyan-400",
      glowColor: "group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]",
    };
  }
  if (key.includes("about") || key.includes("user")) {
    return {
      iconColor: "text-teal-300",
      glowColor: "group-hover:drop-shadow-[0_0_8px_rgba(94,234,212,0.7)]",
    };
  }
  if (key.includes("experience") || key.includes("briefcase")) {
    return {
      iconColor: "text-purple-400",
      glowColor: "group-hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.7)]",
    };
  }
  if (key.includes("cert") || key.includes("honor") || key.includes("award")) {
    return {
      iconColor: "text-yellow-400",
      glowColor: "group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.7)]",
    };
  }
  if (key.includes("git")) {
    return {
      iconColor: "text-zinc-100",
      glowColor: "group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]",
    };
  }
  if (key.includes("linkedin")) {
    return {
      iconColor: "text-sky-400",
      glowColor: "group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]",
    };
  }
  if (key.includes("terminal")) {
    return {
      iconColor: "text-emerald-400",
      glowColor: "group-hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.7)]",
    };
  }
  if (key.includes("blog") || key.includes("book")) {
    return {
      iconColor: "text-orange-400",
      glowColor: "group-hover:drop-shadow-[0_0_8px_rgba(251,146,60,0.7)]",
    };
  }
  if (key.includes("pub")) {
    return {
      iconColor: "text-blue-400",
      glowColor: "group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.7)]",
    };
  }
  if (key.includes("insta")) {
    return {
      iconColor: "text-pink-400",
      glowColor: "group-hover:drop-shadow-[0_0_8px_rgba(244,114,182,0.7)]",
    };
  }
  if (key.includes("app")) {
    return {
      iconColor: "text-teal-400",
      glowColor: "group-hover:drop-shadow-[0_0_8px_rgba(45,212,191,0.7)]",
    };
  }
  if (key.includes("setting")) {
    return {
      iconColor: "text-zinc-300",
      glowColor: "group-hover:drop-shadow-[0_0_8px_rgba(203,213,225,0.7)]",
    };
  }

  return {
    iconColor: "text-white",
    glowColor: "group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]",
  };
}

export function AppIcon({
  id,
  label,
  icon: Icon,
  badge,
  onClick,
  size = "md",
  showLabel = true,
}: AppIconProps) {
  const { iconColor, glowColor } = getAppColorConfig(id, label);

  // Smooth dark squircle dimensions matching dark icon pack aesthetics
  const iconSize =
    size === "sm"
      ? "h-[38px] w-[38px] rounded-[12px]"
      : "h-[44px] w-[44px] rounded-[14px]";
  const glyphSize = size === "sm" ? "h-[18px] w-[18px]" : "h-[20px] w-[20px]";

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center gap-1 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:scale-[0.91] transition-all duration-150 ease-out cursor-pointer"
      aria-label={label}
    >
      <div className="relative">
        <div
          className={cn(
            "relative flex items-center justify-center overflow-hidden",
            iconSize,
            // Dark charcoal AMOLED squircle tile base
            "bg-gradient-to-b from-[#24242a] via-[#161619] to-[#0c0c0f]",
            "border border-white/[0.09]",
            "shadow-[0_4px_12px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.18),inset_0_-1px_1px_rgba(0,0,0,0.6)]",
            "group-hover:scale-[1.06] group-hover:border-white/[0.18] group-hover:shadow-[0_6px_16px_rgba(0,0,0,0.7)] transition-all duration-200 ease-out"
          )}
        >
          {/* Subtle top edge glossy specular reflection */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[42%] rounded-t-[inherit] bg-gradient-to-b from-white/[0.12] to-transparent" />

          {/* Glowing colorful icon glyph */}
          <Icon
            className={cn(
              glyphSize,
              iconColor,
              glowColor,
              "relative z-10 transition-all duration-200"
            )}
            strokeWidth={2}
            aria-hidden
          />
        </div>

        {/* Minimal Notification Badge */}
        {badge != null && badge > 0 && (
          <span className="absolute -top-1 -right-1 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-rose-500 px-1 text-[8.5px] font-bold text-white shadow-md ring-1.5 ring-[#0a0a0f]">
            {badge}
          </span>
        )}
      </div>

      {showLabel && (
        <span className="max-w-[62px] truncate text-center text-[10px] font-medium leading-tight text-white/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
          {label}
        </span>
      )}
    </button>
  );
}


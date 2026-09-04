import { Wifi, Volume2, MessageSquare } from "lucide-react";
import { useLiveClock } from "@/hooks/useLiveClock";
import { usePhoneOS } from "@/context/PhoneOSContext";
import { cn } from "@/lib/utils";

interface PhoneStatusBarProps {
  interactive?: boolean;
}

export function PhoneStatusBar({ interactive = true }: PhoneStatusBarProps) {
  const { time } = useLiveClock();
  const { openPanel, screen } = usePhoneOS();
  const canOpen = interactive && screen !== "lock";

  return (
    <button
      type="button"
      disabled={!canOpen}
      onClick={() => canOpen && openPanel()}
      className={cn(
        "relative z-30 flex h-[34px] w-full shrink-0 items-center justify-between px-4 pt-1 text-[11px] text-white select-none transition-colors",
        canOpen && "cursor-pointer active:bg-white/5"
      )}
      aria-label={canOpen ? "Open quick settings and notifications" : undefined}
    >
      {/* Top subtle pull bar hint */}
      <span className="absolute inset-x-1/3 top-0.5 h-0.5 rounded-full bg-transparent" aria-hidden />

      {/* Left side: Live Clock + Notification badges */}
      <div className="flex items-center gap-2">
        <span className="font-semibold text-white/95 text-[11.5px] tabular-nums tracking-tight">
          {time}
        </span>
        <div className="flex items-center gap-1 opacity-70">
          <MessageSquare className="h-2.5 w-2.5" aria-hidden />
        </div>
      </div>

      {/* Center gap for camera punch hole (18px wide) */}
      <div className="w-[18px] shrink-0" aria-hidden="true" />

      {/* Right side: Sound mode, Wi-Fi, 5G signal bars, Battery % & Pill */}
      <div className="flex items-center gap-1.5">
        <Volume2 className="h-2.5 w-2.5 opacity-75" aria-hidden />
        <Wifi className="h-3 w-3 opacity-90" aria-hidden />

        {/* 5G Signal bars */}
        <div className="flex items-end gap-[1.5px] h-2.5 opacity-90" title="5G Full signal">
          <span className="w-[2px] h-[3px] rounded-full bg-white" />
          <span className="w-[2px] h-[5px] rounded-full bg-white" />
          <span className="w-[2px] h-[7px] rounded-full bg-white" />
          <span className="w-[2px] h-[9px] rounded-full bg-white" />
          <span className="text-[7.5px] font-bold tracking-tighter text-white/80 ml-0.5 leading-none">
            5G
          </span>
        </div>

        {/* Battery: Percentage + Horizontal Pill */}
        <div className="flex items-center gap-1 ml-0.5">
          <span className="text-[10px] font-medium text-white/90 tabular-nums">85%</span>
          <div className="relative flex items-center">
            {/* Battery capsule */}
            <div className="h-[9.5px] w-[18px] rounded-[3px] border-[1px] border-white/85 p-[1px] flex items-center bg-black/20">
              <div className="h-full w-[85%] rounded-[1.5px] bg-white" />
            </div>
            {/* Positive terminal node */}
            <div className="h-[3.5px] w-[1px] rounded-r-[1px] bg-white/85 -ml-[0.5px]" />
          </div>
        </div>
      </div>
    </button>
  );
}


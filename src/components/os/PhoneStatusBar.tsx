import { Signal, Wifi, BatteryMedium } from "lucide-react";
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
        "relative z-30 flex h-8 w-full shrink-0 items-center justify-between px-4 pt-1.5 text-[11px] font-semibold text-white select-none",
        canOpen && "cursor-pointer active:bg-white/5"
      )}
      aria-label={canOpen ? "Open notifications and control center" : undefined}
    >
      {/* Pull affordance hit area */}
      <span className="absolute inset-x-1/3 top-0 h-1 rounded-b-full bg-transparent" aria-hidden />
      <div className="flex items-center gap-1.5">
        <span className="opacity-90">Abhishek</span>
        <Signal className="h-2.5 w-2.5 opacity-80" aria-hidden />
        <Wifi className="h-2.5 w-2.5 opacity-80" aria-hidden />
      </div>
      <div className="flex items-center gap-1.5">
        <span className="tabular-nums">{time}</span>
        <span className="opacity-80">85%</span>
        <BatteryMedium className="h-3 w-3 opacity-80" aria-hidden />
      </div>
    </button>
  );
}

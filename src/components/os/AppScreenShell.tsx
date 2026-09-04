import { ChevronLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { usePhoneOS } from "@/context/PhoneOSContext";
import { PhoneStatusBar } from "./PhoneStatusBar";
import { PhoneNavBar } from "./PhoneNavBar";

interface AppScreenShellProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export function AppScreenShell({ title, icon: Icon, children }: AppScreenShellProps) {
  const { closeApp } = usePhoneOS();

  return (
    <div className="flex h-full flex-col bg-[#0b0b0f] select-none">
      <PhoneStatusBar />

      {/* App Header Bar */}
      <header className="flex shrink-0 items-center justify-between px-3 pt-1 pb-1.5 border-b border-white/[0.06] bg-[#0f0f14]/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={closeApp}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 active:scale-90"
            aria-label="Go back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-sm ring-1 ring-white/15">
            <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
          </div>
          <span className="text-xs font-semibold text-white/90">{title}</span>
        </div>
      </header>

      {/* Viewing Area Title Banner */}
      <div className="px-5 pt-3 pb-2 shrink-0">
        <h1 className="text-2xl font-light tracking-tight text-white">{title}</h1>
        <p className="text-[11px] text-white/45">Portfolio OS · Pro Edition</p>
      </div>

      {/* Content Interaction Area */}
      <div className="flex-1 overflow-y-auto os-scroll px-1 pb-2">{children}</div>

      <PhoneNavBar showBack />
    </div>
  );
}


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
    <div className="flex h-full flex-col bg-[#0a0a0f] select-none">
      <PhoneStatusBar />
      <header className="flex shrink-0 items-center gap-2.5 border-b border-white/5 px-3 py-2.5">
        <button
          type="button"
          onClick={closeApp}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
          aria-label="Go back"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#1a1a1c] text-white ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <Icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
        </div>
        <h1 className="text-sm font-semibold text-white">{title}</h1>
      </header>
      <div className="flex-1 overflow-y-auto os-scroll">{children}</div>
      <PhoneNavBar showBack />
    </div>
  );
}

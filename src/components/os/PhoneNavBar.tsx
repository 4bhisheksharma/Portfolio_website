import { ChevronLeft, Circle, Square } from "lucide-react";
import { usePhoneOS } from "@/context/PhoneOSContext";
import { cn } from "@/lib/utils";

interface PhoneNavBarProps {
  showBack?: boolean;
}

export function PhoneNavBar({ showBack = false }: PhoneNavBarProps) {
  const { goHome, closeApp, screen, openRecent, lock } = usePhoneOS();

  return (
    <div className="flex h-9 shrink-0 items-center justify-between px-8 pb-1 select-none">
      <button
        type="button"
        onClick={() => {
          if (screen === "app") closeApp();
          else lock();
        }}
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full text-white/70 transition-all hover:text-white hover:bg-white/10 active:scale-90",
          !showBack && screen === "home" && "opacity-50"
        )}
        aria-label={screen === "app" ? "Back" : "Lock phone"}
        title={screen === "app" ? "Back" : "Lock"}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={goHome}
        className="flex h-7 w-7 items-center justify-center rounded-full text-white/70 transition-all hover:text-white hover:bg-white/10 active:scale-90"
        aria-label="Home"
      >
        <Circle className="h-3.5 w-3.5" strokeWidth={2.5} />
      </button>
      <button
        type="button"
        onClick={openRecent}
        className="flex h-7 w-7 items-center justify-center rounded-full text-white/70 transition-all hover:text-white hover:bg-white/10 active:scale-90"
        aria-label="Recent apps"
      >
        <Square className="h-3 w-3" strokeWidth={2.5} />
      </button>
    </div>
  );
}

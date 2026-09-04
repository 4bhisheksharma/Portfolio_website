import { usePhoneOS } from "@/context/PhoneOSContext";
import { cn } from "@/lib/utils";

interface PhoneNavBarProps {
  showBack?: boolean;
}

export function PhoneNavBar({ showBack = false }: PhoneNavBarProps) {
  const { goHome, closeApp, screen, openRecent, lock, showRecent, closeRecent } = usePhoneOS();

  const handleBack = () => {
    if (showRecent) {
      closeRecent();
    } else if (screen === "app") {
      closeApp();
    } else {
      lock();
    }
  };

  return (
    <div className="flex h-10 shrink-0 items-center justify-around px-6 pb-2 pt-0.5 select-none bg-transparent">
      {/* Recents Button: Three vertical strokes */}
      <button
        type="button"
        onClick={() => (showRecent ? closeRecent() : openRecent())}
        className={cn(
          "group flex h-9 w-12 items-center justify-center rounded-xl text-white/75 transition-all hover:text-white active:scale-90 active:bg-white/10"
        )}
        aria-label="Recent apps"
        title="Recents"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-[15px] w-[15px] fill-current opacity-90 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        >
          <rect x="4.5" y="4" width="2.6" height="16" rx="1.3" />
          <rect x="10.7" y="4" width="2.6" height="16" rx="1.3" />
          <rect x="16.9" y="4" width="2.6" height="16" rx="1.3" />
        </svg>
      </button>

      {/* Home Button: Soft Squircle */}
      <button
        type="button"
        onClick={goHome}
        className="group flex h-9 w-12 items-center justify-center rounded-xl text-white/75 transition-all hover:text-white active:scale-90 active:bg-white/10"
        aria-label="Home"
        title="Home"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-[15px] w-[15px] stroke-current fill-none opacity-90 group-hover:opacity-100 transition-opacity"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="4.5" y="4.5" width="15" height="15" rx="5" />
        </svg>
      </button>

      {/* Back Button: Left angled chevron */}
      <button
        type="button"
        onClick={handleBack}
        className={cn(
          "group flex h-9 w-12 items-center justify-center rounded-xl text-white/75 transition-all hover:text-white active:scale-90 active:bg-white/10",
          !showBack && screen === "home" && !showRecent && "opacity-60"
        )}
        aria-label={screen === "app" ? "Back" : "Lock phone"}
        title={screen === "app" ? "Back" : "Lock"}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-[15px] w-[15px] stroke-current fill-none opacity-90 group-hover:opacity-100 transition-opacity"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15.5 5.5L8.5 12.5L15.5 19.5" />
        </svg>
      </button>
    </div>
  );
}


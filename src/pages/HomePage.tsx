import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PhoneOSProvider } from "@/context/PhoneOSContext";
import { PhoneOS } from "@/components/os/PhoneOS";
import { sectionToApp } from "@/data/osApps";

interface HomePageProps {
  onOpenTerminal: () => void;
}

function resolveInitialApp(hash: string, scrollTo?: string): {
  app: import("@/data/osApps").AppScreenId | null;
  unlocked: boolean;
} {
  const target = scrollTo ?? hash;
  const sectionId = target.replace("#", "");
  const app = sectionToApp[sectionId] ?? null;
  const unlocked = Boolean(app || sectionId === "hero" || target.length > 0);
  return { app, unlocked: unlocked || Boolean(app) };
}

export function HomePage({ onOpenTerminal }: HomePageProps) {
  const location = useLocation();
  const scrollTarget = (location.state as { scrollTo?: string } | null)?.scrollTo;
  const hash = window.location.hash;
  const { app, unlocked } = resolveInitialApp(hash, scrollTarget);

  useEffect(() => {
    if (scrollTarget) {
      window.history.replaceState({}, "");
    }
  }, [scrollTarget]);

  return (
    <PhoneOSProvider
      initialApp={app}
      initialUnlocked={unlocked}
      onOpenTerminal={onOpenTerminal}
    >
      <PhoneOS />
    </PhoneOSProvider>
  );
}

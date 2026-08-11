import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { AppAction, AppScreenId } from "@/data/osApps";

export type OSScreen = "lock" | "home" | "app";

interface PhoneOSContextValue {
  screen: OSScreen;
  activeApp: AppScreenId | null;
  recentApps: AppScreenId[];
  showRecent: boolean;
  panelOpen: boolean;
  volume: number;
  volumeVisible: boolean;
  unlock: () => void;
  lock: () => void;
  goHome: () => void;
  openApp: (id: AppScreenId) => void;
  closeApp: () => void;
  openRecent: () => void;
  closeRecent: () => void;
  openPanel: () => void;
  closePanel: () => void;
  togglePanel: () => void;
  handleAction: (action: AppAction) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  volumeUp: () => void;
  volumeDown: () => void;
}

const PhoneOSContext = createContext<PhoneOSContextValue | null>(null);

function openInNewTab(href: string) {
  window.open(href, "_blank", "noopener,noreferrer");
}

interface PhoneOSProviderProps {
  children: ReactNode;
  initialApp?: AppScreenId | null;
  initialUnlocked?: boolean;
  onOpenTerminal?: () => void;
}

export function PhoneOSProvider({
  children,
  initialApp = null,
  initialUnlocked = false,
  onOpenTerminal,
}: PhoneOSProviderProps) {
  const [screen, setScreen] = useState<OSScreen>(
    initialUnlocked ? (initialApp ? "app" : "home") : "lock"
  );
  const [activeApp, setActiveApp] = useState<AppScreenId | null>(initialApp);
  const [recentApps, setRecentApps] = useState<AppScreenId[]>(
    initialApp ? [initialApp] : []
  );
  const [showRecent, setShowRecent] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [volume, setVolume] = useState(70);
  const [volumeVisible, setVolumeVisible] = useState(false);
  const volumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showVolumeHud = useCallback(() => {
    setVolumeVisible(true);
    if (volumeTimer.current) clearTimeout(volumeTimer.current);
    volumeTimer.current = setTimeout(() => setVolumeVisible(false), 1600);
  }, []);

  const volumeUp = useCallback(() => {
    setVolume((v) => Math.min(100, v + 10));
    showVolumeHud();
  }, [showVolumeHud]);

  const volumeDown = useCallback(() => {
    setVolume((v) => Math.max(0, v - 10));
    showVolumeHud();
  }, [showVolumeHud]);

  const unlock = useCallback(() => {
    setScreen("home");
    setPanelOpen(false);
    setShowRecent(false);
  }, []);

  const lock = useCallback(() => {
    setScreen("lock");
    setActiveApp(null);
    setShowRecent(false);
    setPanelOpen(false);
    setSearchQuery("");
  }, []);

  const goHome = useCallback(() => {
    setScreen("home");
    setActiveApp(null);
    setSearchQuery("");
    setShowRecent(false);
    setPanelOpen(false);
  }, []);

  const openApp = useCallback((id: AppScreenId) => {
    setActiveApp(id);
    setScreen("app");
    setShowRecent(false);
    setPanelOpen(false);
    setRecentApps((prev) => [id, ...prev.filter((a) => a !== id)].slice(0, 8));
  }, []);

  const closeApp = useCallback(() => {
    setScreen("home");
    setActiveApp(null);
  }, []);

  const openRecent = useCallback(() => {
    setPanelOpen(false);
    setShowRecent(true);
  }, []);

  const closeRecent = useCallback(() => setShowRecent(false), []);
  const openPanel = useCallback(() => {
    setShowRecent(false);
    setPanelOpen(true);
  }, []);
  const closePanel = useCallback(() => setPanelOpen(false), []);
  const togglePanel = useCallback(() => {
    setShowRecent(false);
    setPanelOpen((v) => !v);
  }, []);

  const handleAction = useCallback(
    (action: AppAction) => {
      switch (action.type) {
        case "screen":
          openApp(action.id);
          break;
        case "external":
          openInNewTab(action.href);
          break;
        case "tel":
          window.open(action.href, "_blank");
          break;
        case "mailto":
          window.open(action.href, "_blank");
          break;
        case "camera":
          openApp("camera");
          break;
        case "modal":
          if (action.id === "terminal") onOpenTerminal?.();
          break;
      }
    },
    [openApp, onOpenTerminal]
  );

  const value = useMemo(
    () => ({
      screen,
      activeApp,
      recentApps,
      showRecent,
      panelOpen,
      volume,
      volumeVisible,
      unlock,
      lock,
      goHome,
      openApp,
      closeApp,
      openRecent,
      closeRecent,
      openPanel,
      closePanel,
      togglePanel,
      handleAction,
      searchQuery,
      setSearchQuery,
      volumeUp,
      volumeDown,
    }),
    [
      screen,
      activeApp,
      recentApps,
      showRecent,
      panelOpen,
      volume,
      volumeVisible,
      unlock,
      lock,
      goHome,
      openApp,
      closeApp,
      openRecent,
      closeRecent,
      openPanel,
      closePanel,
      togglePanel,
      handleAction,
      searchQuery,
      volumeUp,
      volumeDown,
    ]
  );

  return <PhoneOSContext.Provider value={value}>{children}</PhoneOSContext.Provider>;
}

export function usePhoneOS() {
  const ctx = useContext(PhoneOSContext);
  if (!ctx) throw new Error("usePhoneOS must be used within PhoneOSProvider");
  return ctx;
}

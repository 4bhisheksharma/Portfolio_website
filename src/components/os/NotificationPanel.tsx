import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import {
  Wifi,
  Bluetooth,
  Plane,
  Moon,
  Flashlight,
  Volume2,
  RotateCw,
  Sun,
  Eye,
  Radio,
  FileText,
  Linkedin,
  Github,
  Power,
  Settings,
  ChevronRight,
  Tv,
  Music2,
} from "lucide-react";
import { useState } from "react";
import { usePhoneOS } from "@/context/PhoneOSContext";
import { useLiveClock } from "@/hooks/useLiveClock";
import { LINKS } from "@/data/osApps";
import type { AppAction } from "@/data/osApps";

const initialNotifications: {
  id: string;
  app: string;
  icon: typeof FileText;
  time: string;
  title: string;
  body: string;
  action: AppAction;
  color: string;
}[] = [
  {
    id: "resume",
    app: "Quick Notes",
    icon: FileText,
    time: "Just now",
    title: "Download Resume (CV)",
    body: "Tap to review Abhishek Sharma's Flutter developer profile",
    action: { type: "screen", id: "resume" },
    color: "from-amber-400 to-orange-600",
  },
  {
    id: "linkedin",
    app: "LinkedIn",
    icon: Linkedin,
    time: "20m ago",
    title: "New Connection Request",
    body: "Connect with Abhishek Sharma on LinkedIn",
    action: { type: "external", href: LINKS.linkedin },
    color: "from-sky-400 to-blue-600",
  },
  {
    id: "github",
    app: "GitHub",
    icon: Github,
    time: "1h ago",
    title: "4bhisheksharma repos",
    body: "Flutter, Dart, Firebase, and fullstack repositories",
    action: { type: "screen", id: "github" },
    color: "from-zinc-700 to-zinc-900",
  },
];

export function NotificationPanel() {
  const { panelOpen, closePanel, handleAction, volume, volumeUp, volumeDown, openApp, lock } =
    usePhoneOS();
  const { time, date } = useLiveClock();
  const prefersReducedMotion = useReducedMotion();

  const [brightness, setBrightness] = useState(82);
  const [notifications, setNotifications] = useState(initialNotifications);

  const [toggles, setToggles] = useState({
    wifi: true,
    bluetooth: true,
    sound: true,
    rotation: true,
    flashlight: false,
    airplane: false,
    darkmode: true,
    eyecomfort: false,
    hotspot: false,
    mobiledata: true,
  });

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y < -80 || info.velocity.y < -400) closePanel();
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <AnimatePresence>
      {panelOpen && (
        <>
          {/* Dimmed backdrop */}
          <motion.button
            type="button"
            aria-label="Dismiss quick settings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={closePanel}
          />

          {/* Aura OS Quick Settings Control Center */}
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.05, bottom: 0.35 }}
            onDragEnd={onDragEnd}
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="absolute inset-x-0 top-0 z-50 flex max-h-[96%] flex-col overflow-hidden rounded-b-[36px] border-b border-white/10 bg-[#0d0d11]/95 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl select-none"
          >
            <div className="os-scroll max-h-[94dvh] overflow-y-auto px-4 pb-6 pt-3">
              {/* Top Header: Clock + Power & Settings Tools */}
              <div className="mb-3.5 flex items-center justify-between pt-1">
                <div>
                  <p className="text-2xl font-light tracking-tight text-white tabular-nums">
                    {time}
                  </p>
                  <p className="text-[11px] font-medium text-white/60">{date}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={lock}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 active:scale-90"
                    aria-label="Power off"
                    title="Lock device"
                  >
                    <Power className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      closePanel();
                      openApp("settings");
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 active:scale-90"
                    aria-label="Settings"
                    title="Open Settings"
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Primary Connected Cards: Wi-Fi & Bluetooth */}
              <div className="mb-3 grid grid-cols-2 gap-2.5">
                {/* Wi-Fi Card */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setToggles((t) => ({ ...t, wifi: !t.wifi }))}
                  onKeyDown={(e) =>
                    e.key === "Enter" && setToggles((t) => ({ ...t, wifi: !t.wifi }))
                  }
                  className="flex cursor-pointer items-center justify-between rounded-[22px] border border-white/10 bg-white/[0.08] p-3 transition-all hover:bg-white/[0.12] active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                        toggles.wifi
                          ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      <Wifi className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11.5px] font-semibold text-white">Wi‑Fi</p>
                      <p className="truncate text-[9.5px] text-white/60">
                        {toggles.wifi ? "Fiber 5G" : "Turned off"}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-white/40 shrink-0" />
                </div>

                {/* Bluetooth Card */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setToggles((t) => ({ ...t, bluetooth: !t.bluetooth }))}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    setToggles((t) => ({ ...t, bluetooth: !t.bluetooth }))
                  }
                  className="flex cursor-pointer items-center justify-between rounded-[22px] border border-white/10 bg-white/[0.08] p-3 transition-all hover:bg-white/[0.12] active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                        toggles.bluetooth
                          ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      <Bluetooth className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11.5px] font-semibold text-white">Bluetooth</p>
                      <p className="truncate text-[9.5px] text-white/60">
                        {toggles.bluetooth ? "Wireless Audio" : "Off"}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-white/40 shrink-0" />
                </div>
              </div>

              {/* 4x2 Circular Quick Toggle Grid */}
              <div className="mb-3.5 rounded-[24px] border border-white/10 bg-white/[0.05] p-3">
                <div className="grid grid-cols-4 gap-y-3 gap-x-2 text-center">
                  {/* Sound */}
                  <button
                    type="button"
                    onClick={() => setToggles((t) => ({ ...t, sound: !t.sound }))}
                    className="flex flex-col items-center gap-1.5 focus:outline-none"
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full transition-all active:scale-90 ${
                        toggles.sound
                          ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      <Volume2 className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-medium text-white/80">
                      {toggles.sound ? "Sound" : "Mute"}
                    </span>
                  </button>

                  {/* Auto Rotate */}
                  <button
                    type="button"
                    onClick={() => setToggles((t) => ({ ...t, rotation: !t.rotation }))}
                    className="flex flex-col items-center gap-1.5 focus:outline-none"
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full transition-all active:scale-90 ${
                        toggles.rotation
                          ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      <RotateCw className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-medium text-white/80">
                      {toggles.rotation ? "Auto rotate" : "Portrait"}
                    </span>
                  </button>

                  {/* Flashlight */}
                  <button
                    type="button"
                    onClick={() =>
                      setToggles((t) => ({ ...t, flashlight: !t.flashlight }))
                    }
                    className="flex flex-col items-center gap-1.5 focus:outline-none"
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full transition-all active:scale-90 ${
                        toggles.flashlight
                          ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      <Flashlight className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-medium text-white/80">Flashlight</span>
                  </button>

                  {/* Dark Mode */}
                  <button
                    type="button"
                    onClick={() => setToggles((t) => ({ ...t, darkmode: !t.darkmode }))}
                    className="flex flex-col items-center gap-1.5 focus:outline-none"
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full transition-all active:scale-90 ${
                        toggles.darkmode
                          ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      <Moon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-medium text-white/80">Dark mode</span>
                  </button>

                  {/* Flight Mode */}
                  <button
                    type="button"
                    onClick={() => setToggles((t) => ({ ...t, airplane: !t.airplane }))}
                    className="flex flex-col items-center gap-1.5 focus:outline-none"
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full transition-all active:scale-90 ${
                        toggles.airplane
                          ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      <Plane className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-medium text-white/80">Flight mode</span>
                  </button>

                  {/* Eye Comfort Shield */}
                  <button
                    type="button"
                    onClick={() =>
                      setToggles((t) => ({ ...t, eyecomfort: !t.eyecomfort }))
                    }
                    className="flex flex-col items-center gap-1.5 focus:outline-none"
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full transition-all active:scale-90 ${
                        toggles.eyecomfort
                          ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      <Eye className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-medium text-white/80">Eye comfort</span>
                  </button>

                  {/* Hotspot */}
                  <button
                    type="button"
                    onClick={() => setToggles((t) => ({ ...t, hotspot: !t.hotspot }))}
                    className="flex flex-col items-center gap-1.5 focus:outline-none"
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full transition-all active:scale-90 ${
                        toggles.hotspot
                          ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      <Radio className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-medium text-white/80">Hotspot</span>
                  </button>

                  {/* Mobile Data */}
                  <button
                    type="button"
                    onClick={() =>
                      setToggles((t) => ({ ...t, mobiledata: !t.mobiledata }))
                    }
                    className="flex flex-col items-center gap-1.5 focus:outline-none"
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full transition-all active:scale-90 ${
                        toggles.mobiledata
                          ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      <Wifi className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-medium text-white/80">Mobile data</span>
                  </button>
                </div>
              </div>

              {/* Dual Sliders: Brightness & Volume */}
              <div className="mb-3 space-y-2 rounded-[22px] border border-white/10 bg-white/[0.05] p-3">
                {/* Brightness Slider */}
                <div className="flex items-center gap-3">
                  <Sun className="h-4 w-4 text-white/60 shrink-0" />
                  <div className="relative flex-1 flex items-center">
                    <input
                      type="range"
                      min="15"
                      max="100"
                      value={brightness}
                      onChange={(e) => setBrightness(Number(e.target.value))}
                      className="w-full h-4 rounded-full bg-white/15 appearance-none cursor-pointer accent-white"
                    />
                  </div>
                  <Sun className="h-4 w-4 text-white/90 shrink-0" />
                </div>

                {/* Volume Slider */}
                <div className="flex items-center gap-3 pt-1">
                  <Volume2 className="h-4 w-4 text-white/60 shrink-0" />
                  <div className="relative flex-1 flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => {
                        const next = Number(e.target.value);
                        if (next > volume) volumeUp();
                        else volumeDown();
                      }}
                      className="w-full h-4 rounded-full bg-white/15 appearance-none cursor-pointer accent-blue-400"
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-white/70 w-7 text-right tabular-nums">
                    {volume}%
                  </span>
                </div>
              </div>

              {/* Device Control & Media Output Buttons */}
              <div className="mb-3.5 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    closePanel();
                    handleAction({ type: "modal", id: "terminal" });
                  }}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.08] py-2 text-[11px] font-semibold text-white/90 hover:bg-white/15 active:scale-95 transition-all"
                >
                  <Tv className="h-3.5 w-3.5" />
                  <span>Device control</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    volumeUp();
                  }}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.08] py-2 text-[11px] font-semibold text-white/90 hover:bg-white/15 active:scale-95 transition-all"
                >
                  <Music2 className="h-3.5 w-3.5" />
                  <span>Media output</span>
                </button>
              </div>

              {/* Notifications Header with Clear button */}
              <div className="mb-2 flex items-center justify-between px-1">
                <p className="text-[11px] font-semibold text-white/80">Notifications</p>
                {notifications.length > 0 && (
                  <button
                    type="button"
                    onClick={clearAllNotifications}
                    className="text-[10px] font-semibold text-blue-400 hover:text-blue-300"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Notifications list */}
              <div className="space-y-2">
                {notifications.length === 0 ? (
                  <p className="py-4 text-center text-xs text-white/40">No new notifications</p>
                ) : (
                  notifications.map((n, i) => (
                    <motion.div
                      key={n.id}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 + i * 0.04 }}
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          handleAction(n.action);
                          closePanel();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleAction(n.action);
                            closePanel();
                          }
                        }}
                        className="cursor-pointer rounded-[20px] border border-white/10 bg-white/[0.08] p-3 transition-all hover:bg-white/[0.12] active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex h-5 w-5 items-center justify-center rounded-[7px] bg-gradient-to-br ${n.color} text-white shadow-sm`}
                          >
                            <n.icon className="h-3 w-3" />
                          </div>
                          <span className="text-[11px] font-medium text-white/90">{n.app}</span>
                          <span className="ml-auto text-[9.5px] text-white/40">{n.time}</span>
                        </div>
                        <p className="mt-1 text-xs font-semibold text-white">{n.title}</p>
                        <p className="mt-0.5 text-[10.5px] text-white/70">{n.body}</p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Bottom dismissal bar */}
              <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-white/25" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


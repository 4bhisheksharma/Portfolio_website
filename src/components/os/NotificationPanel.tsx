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
  BatteryMedium,
  Signal,
  FileText,
  Linkedin,
  Github,
  X,
} from "lucide-react";
import { useState } from "react";
import { usePhoneOS } from "@/context/PhoneOSContext";
import { useLiveClock } from "@/hooks/useLiveClock";
import { GlassCard } from "./GlassCard";
import { LINKS } from "@/data/osApps";
import type { AppAction } from "@/data/osApps";

const panelNotifications: {
  app: string;
  icon: typeof FileText;
  time: string;
  title: string;
  body: string;
  action: AppAction;
}[] = [
  {
    app: "Resume",
    icon: FileText,
    time: "now",
    title: "Download Resume",
    body: "Open the CV preview inside the phone",
    action: { type: "screen", id: "resume" },
  },
  {
    app: "LinkedIn",
    icon: Linkedin,
    time: "15m",
    title: "LinkedIn Profile",
    body: "linkedin.com/in/4bhisheksharma",
    action: { type: "external", href: LINKS.linkedin },
  },
  {
    app: "GitHub",
    icon: Github,
    time: "1h",
    title: "GitHub Profile",
    body: "github.com/4bhisheksharma · Flutter & Dart",
    action: { type: "screen", id: "github" },
  },
];

function ToggleTile({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: typeof Wifi;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-start gap-2 rounded-2xl p-3 text-left transition-all duration-300 ${
        active
          ? "bg-white/90 text-black shadow-lg"
          : "bg-white/10 text-white/80 hover:bg-white/15"
      }`}
    >
      <Icon className="h-5 w-5" strokeWidth={1.75} />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

export function NotificationPanel() {
  const { panelOpen, closePanel, handleAction } = usePhoneOS();
  const { time, date } = useLiveClock();
  const prefersReducedMotion = useReducedMotion();
  const [toggles, setToggles] = useState({
    wifi: true,
    bluetooth: false,
    airplane: false,
    dnd: false,
    flashlight: false,
  });

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y < -80 || info.velocity.y < -400) closePanel();
  };

  return (
    <AnimatePresence>
      {panelOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Dismiss notification panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
            onClick={closePanel}
          />
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.05, bottom: 0.35 }}
            onDragEnd={onDragEnd}
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute inset-x-0 top-0 z-50 max-h-[92%] overflow-hidden rounded-b-[28px] border-b border-white/10 bg-[#0c0c0e]/95 shadow-2xl backdrop-blur-2xl select-none"
          >
            <div className="os-scroll max-h-[92dvh] overflow-y-auto px-4 pb-5 pt-3">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-2xl font-light text-white tabular-nums">{time}</p>
                  <p className="text-xs text-white/50">{date}</p>
                </div>
                <button
                  type="button"
                  onClick={closePanel}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/15"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/35">
                Control Center
              </p>
              <div className="mb-4 grid grid-cols-4 gap-2">
                <ToggleTile
                  icon={Wifi}
                  label="Wi‑Fi"
                  active={toggles.wifi}
                  onClick={() => setToggles((t) => ({ ...t, wifi: !t.wifi }))}
                />
                <ToggleTile
                  icon={Bluetooth}
                  label="Bluetooth"
                  active={toggles.bluetooth}
                  onClick={() => setToggles((t) => ({ ...t, bluetooth: !t.bluetooth }))}
                />
                <ToggleTile
                  icon={Plane}
                  label="Airplane"
                  active={toggles.airplane}
                  onClick={() => setToggles((t) => ({ ...t, airplane: !t.airplane }))}
                />
                <ToggleTile
                  icon={Moon}
                  label="Focus"
                  active={toggles.dnd}
                  onClick={() => setToggles((t) => ({ ...t, dnd: !t.dnd }))}
                />
              </div>

              <div className="mb-4 grid grid-cols-2 gap-2">
                <GlassCard className="flex items-center gap-3 p-3">
                  <Flashlight className="h-4 w-4 text-white/70" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-white/40">Flashlight</p>
                    <button
                      type="button"
                      onClick={() =>
                        setToggles((t) => ({ ...t, flashlight: !t.flashlight }))
                      }
                      className="text-xs font-medium text-white"
                    >
                      {toggles.flashlight ? "On" : "Off"}
                    </button>
                  </div>
                </GlassCard>
                <GlassCard className="flex items-center gap-3 p-3">
                  <Volume2 className="h-4 w-4 text-white/70" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-white/40">Volume</p>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-2/3 rounded-full bg-white/70" />
                    </div>
                  </div>
                </GlassCard>
              </div>

              <div className="mb-4 flex items-center gap-3 rounded-2xl bg-white/10 px-3 py-2.5">
                <Signal className="h-4 w-4 text-white/60" />
                <BatteryMedium className="h-4 w-4 text-white/60" />
                <span className="text-[11px] text-white/60">85% · Charging simulated</span>
              </div>

              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/35">
                Notifications
              </p>
              <div className="space-y-2">
                {panelNotifications.map((n, i) => (
                  <motion.div
                    key={n.title}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <GlassCard
                      className="p-3"
                      onClick={() => {
                        handleAction(n.action);
                        closePanel();
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <n.icon className="h-3.5 w-3.5 text-white/70" />
                        <span className="text-[10px] font-semibold text-white/60">{n.app}</span>
                        <span className="ml-auto text-[10px] text-white/35">{n.time}</span>
                      </div>
                      <p className="mt-1 text-xs font-semibold text-white">{n.title}</p>
                      <p className="mt-0.5 text-[10px] text-white/55">{n.body}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>

              <div className="mx-auto mt-4 h-1 w-10 rounded-full bg-white/25" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

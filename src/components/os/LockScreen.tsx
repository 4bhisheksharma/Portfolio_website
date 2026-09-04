import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { Camera, Phone, FileText, Linkedin, Github, Zap } from "lucide-react";
import { useLiveClock } from "@/hooks/useLiveClock";
import { usePhoneOS } from "@/context/PhoneOSContext";
import { PhoneWallpaper } from "./PhoneWallpaper";
import { PhoneStatusBar } from "./PhoneStatusBar";
import { siteConfig } from "@/data/site";
import type { AppAction } from "@/data/osApps";

const notifications: {
  app: string;
  icon: typeof FileText;
  time: string;
  title: string;
  body: string;
  action: AppAction;
  color: string;
}[] = [
  {
    app: "Resume",
    icon: FileText,
    time: "Just now",
    title: "Resume Updated",
    body: "View Abhishek Sharma's latest Flutter CV",
    action: { type: "screen", id: "resume" },
    color: "from-amber-400 to-orange-600",
  },
  {
    app: "LinkedIn",
    icon: Linkedin,
    time: "15m ago",
    title: "Network Connection",
    body: "Abhishek Sharma · Flutter & Dart Developer",
    action: { type: "external", href: "https://www.linkedin.com/in/4bhisheksharma/" },
    color: "from-sky-400 to-blue-600",
  },
  {
    app: "GitHub",
    icon: Github,
    time: "1h ago",
    title: "New Repository Commit",
    body: "Mobile apps, open-source packages & UI experiments",
    action: { type: "screen", id: "github" },
    color: "from-zinc-700 to-zinc-900",
  },
];

export function LockScreen() {
  const { unlock, handleAction } = usePhoneOS();
  const { time, date } = useLiveClock();
  const prefersReducedMotion = useReducedMotion();
  const dragY = useMotionValue(0);
  const opacity = useTransform(dragY, [-180, 0], [0.15, 1]);
  const scale = useTransform(dragY, [-180, 0], [0.92, 1]);
  const unlocking = useRef(false);

  const finishUnlock = () => {
    if (unlocking.current) return;
    unlocking.current = true;
    unlock();
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const shouldUnlock = info.offset.y < -70 || info.velocity.y < -500;
    if (shouldUnlock) {
      finishUnlock();
      return;
    }
    animate(dragY, 0, {
      type: "spring",
      stiffness: 420,
      damping: 34,
    });
  };

  return (
    <PhoneWallpaper className="flex flex-col select-none">
      <PhoneStatusBar interactive={false} />

      <motion.div
        drag="y"
        dragConstraints={{ top: -420, bottom: 0 }}
        dragElastic={{ top: 0.12, bottom: 0.05 }}
        dragMomentum={false}
        style={{ y: dragY, opacity, scale }}
        onDragEnd={handleDragEnd}
        className="absolute inset-0 z-[5] flex cursor-grab flex-col touch-none active:cursor-grabbing"
      >
        <div className="flex flex-1 flex-col pt-6">
          {/* Lock Screen Clock & Date */}
          <div className="flex flex-col items-center pt-2">
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-6xl font-extralight tracking-tight text-white tabular-nums drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
            >
              {time}
            </motion.p>
            <p className="mt-1 text-sm font-normal text-white/90 drop-shadow-md">{date}</p>

            {/* Battery / Charging Info pill */}
            <div className="mt-1.5 flex items-center gap-1 text-[10.5px] font-medium text-white/60">
              <Zap className="h-3 w-3 text-cyan-400 fill-cyan-400" />
              <span>Super Fast Charging · 85%</span>
            </div>
          </div>

          {/* Lock Screen Notifications List */}
          <div className="flex-1 space-y-2.5 overflow-hidden px-4 pt-6">
            {notifications.map((n, i) => (
              <motion.div
                key={n.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.08 + i * 0.06,
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                }}
                className="pointer-events-auto"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleAction(n.action)}
                  onKeyDown={(e) => e.key === "Enter" && handleAction(n.action)}
                  className="w-full cursor-pointer rounded-[20px] border border-white/15 bg-white/[0.08] p-3 backdrop-blur-xl shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-all hover:bg-white/[0.12] active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-[7px] bg-gradient-to-br ${n.color} text-white shadow-sm`}
                    >
                      <n.icon className="h-3 w-3" aria-hidden />
                    </div>
                    <span className="text-[11px] font-medium text-white/90">{n.app}</span>
                    <span className="ml-auto text-[10px] text-white/45">{n.time}</span>
                  </div>
                  <p className="mt-1.5 text-xs font-semibold text-white">{n.title}</p>
                  <p className="mt-0.5 truncate text-[10.5px] text-white/70">{n.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Swipe Up To Unlock Indicator */}
          <div
            onClick={unlock}
            className="flex flex-col items-center justify-center py-5 cursor-pointer"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1.5"
            >
              <div className="h-1 w-10 rounded-full bg-white/35 shadow-sm" />
              <p className="text-[10.5px] font-medium tracking-wide text-white/55">
                Swipe up or tap to unlock
              </p>
            </motion.div>
          </div>

          {/* Lock Screen Bottom Corner Shortcuts */}
          <div className="pointer-events-auto flex w-full justify-between px-6 pb-6 pt-1">
            {/* Left shortcut: Phone */}
            <a
              href={siteConfig.phoneHref}
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.12] text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all hover:scale-105 active:scale-90"
              aria-label="Make a phone call"
            >
              <Phone className="h-4 w-4 text-emerald-400 fill-emerald-400" />
            </a>

            {/* Right shortcut: Camera */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleAction({ type: "camera" });
              }}
              onPointerDown={(e) => e.stopPropagation()}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.12] text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all hover:scale-105 active:scale-90"
              aria-label="Launch camera"
            >
              <Camera className="h-4 w-4 text-rose-400" />
            </button>
          </div>
        </div>
      </motion.div>
    </PhoneWallpaper>
  );
}


import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { Lock, Camera, Phone, FileText, Linkedin, Github } from "lucide-react";
import { useLiveClock } from "@/hooks/useLiveClock";
import { usePhoneOS } from "@/context/PhoneOSContext";
import { PhoneWallpaper } from "./PhoneWallpaper";
import { PhoneStatusBar } from "./PhoneStatusBar";
import { GlassCard } from "./GlassCard";
import { siteConfig } from "@/data/site";
import type { AppAction } from "@/data/osApps";

const notifications: {
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
    body: "View Abhishek Sharma's latest CV (PDF)",
    action: { type: "screen", id: "resume" },
  },
  {
    app: "LinkedIn",
    icon: Linkedin,
    time: "15m",
    title: "Connect on LinkedIn",
    body: "View Abhishek Sharma's professional profile",
    action: { type: "external", href: "https://www.linkedin.com/in/4bhisheksharma/" },
  },
  {
    app: "GitHub",
    icon: Github,
    time: "1h",
    title: "4bhisheksharma on GitHub",
    body: "Explore Flutter projects & open-source packages",
    action: { type: "screen", id: "github" },
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
      if (prefersReducedMotion) {
        finishUnlock();
        return;
      }
      animate(dragY, -520, {
        duration: 0.38,
        ease: [0.32, 0.72, 0, 1],
      }).then(finishUnlock);
    } else {
      animate(dragY, 0, { type: "spring", stiffness: 420, damping: 34 });
    }
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
        <div className="pointer-events-none flex flex-1 flex-col pt-8">
          <div className="flex flex-col items-center pt-4">
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-extralight tracking-tight text-white tabular-nums drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]"
          >
            {time}
          </motion.p>
          <p className="mt-1 text-sm font-medium text-white drop-shadow-md">{date}</p>
          </div>

          <div className="flex-1 space-y-2 overflow-hidden px-4 pt-8">
            {notifications.map((n, i) => (
              <motion.div
                key={n.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + i * 0.08, type: "spring", stiffness: 280, damping: 24 }}
                className="pointer-events-auto"
              >
                <GlassCard
                  className="p-3"
                  onClick={() => handleAction(n.action)}
                >
                  <div className="flex items-center gap-2">
                    <n.icon className="h-3.5 w-3.5 text-white/70" aria-hidden />
                    <span className="text-[10px] font-semibold text-white/60">{n.app}</span>
                    <span className="ml-auto text-[10px] text-white/40">{n.time}</span>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-white">{n.title}</p>
                  <p className="mt-0.5 truncate text-[10px] text-white/60">{n.body}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="pointer-events-none flex flex-col items-center gap-4 pb-8 pt-2">
            <div className="flex items-center gap-1.5 text-[11px] text-white/50">
              <Lock className="h-3 w-3" aria-hidden />
              <span>Swipe up to unlock</span>
            </div>
            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [0, -8, 0], opacity: [0.35, 0.8, 0.35] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="h-1 w-10 rounded-full bg-white/40"
            />
            <div className="pointer-events-auto flex w-full justify-between px-8">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction({ type: "camera" });
                }}
                onPointerDown={(e) => e.stopPropagation()}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/15 text-white backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
                aria-label="Open camera"
              >
                <Camera className="h-4 w-4" />
              </button>
              <a
                href={siteConfig.phoneHref}
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/15 text-white backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
                aria-label="Call"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </PhoneWallpaper>
  );
}

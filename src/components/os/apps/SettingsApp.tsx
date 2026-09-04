import {
  Wifi,
  Volume2,
  Bell,
  Sun,
  Palette,
  Terminal,
  FileText,
  BatteryCharging,
  Smartphone,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { usePhoneOS } from "@/context/PhoneOSContext";
import { AppScreenShell } from "../AppScreenShell";
import { screenMeta } from "@/data/osApps";

export function SettingsApp() {
  const meta = screenMeta.settings;
  const { handleAction, openPanel, volumeUp } = usePhoneOS();

  return (
    <AppScreenShell title={meta.title} icon={meta.icon}>
      <div className="space-y-3 px-3 py-2">
        {/* Developer Account Header Card */}
        <button
          type="button"
          onClick={() => handleAction({ type: "screen", id: "about" })}
          className="w-full flex items-center gap-3 rounded-[22px] border border-white/10 bg-white/[0.08] p-3.5 backdrop-blur-xl text-left transition-all hover:bg-white/[0.12] active:scale-[0.98]"
        >
          <img
            src={siteConfig.profileImage}
            alt={siteConfig.name}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-blue-400/50 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs font-semibold text-white truncate">{siteConfig.name}</h2>
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400 shrink-0" />
            </div>
            <p className="text-[10px] text-white/60">Developer Profile · Tap for bio</p>
          </div>
          <ChevronRight className="h-4 w-4 text-white/40 shrink-0" />
        </button>

        {/* Group 1: Connections & Audio */}
        <div className="overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.05]">
          <button
            type="button"
            onClick={openPanel}
            className="w-full flex items-center gap-3 p-3 text-left transition-colors hover:bg-white/[0.07] active:bg-white/[0.1]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-blue-500 text-white shadow-sm shrink-0">
              <Wifi className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white">Connections</p>
              <p className="text-[10px] text-white/50">Wi-Fi, Bluetooth, Quick Panel</p>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-white/30 shrink-0" />
          </button>

          <div className="mx-3 h-[1px] bg-white/[0.06]" />

          <button
            type="button"
            onClick={volumeUp}
            className="w-full flex items-center gap-3 p-3 text-left transition-colors hover:bg-white/[0.07] active:bg-white/[0.1]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-indigo-500 text-white shadow-sm shrink-0">
              <Volume2 className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white">Sounds and vibration</p>
              <p className="text-[10px] text-white/50">Volume HUD, Sound feedback</p>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-white/30 shrink-0" />
          </button>

          <div className="mx-3 h-[1px] bg-white/[0.06]" />

          <button
            type="button"
            onClick={openPanel}
            className="w-full flex items-center gap-3 p-3 text-left transition-colors hover:bg-white/[0.07] active:bg-white/[0.1]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-rose-500 text-white shadow-sm shrink-0">
              <Bell className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white">Notifications</p>
              <p className="text-[10px] text-white/50">Status alerts & messages</p>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-white/30 shrink-0" />
          </button>
        </div>

        {/* Group 2: Display & Customization */}
        <div className="overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.05]">
          <button
            type="button"
            onClick={openPanel}
            className="w-full flex items-center gap-3 p-3 text-left transition-colors hover:bg-white/[0.07] active:bg-white/[0.1]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-amber-500 text-white shadow-sm shrink-0">
              <Sun className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white">Display & Brightness</p>
              <p className="text-[10px] text-white/50">Dark mode on, Smooth 120Hz</p>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-white/30 shrink-0" />
          </button>

          <div className="mx-3 h-[1px] bg-white/[0.06]" />

          <button
            type="button"
            onClick={() => handleAction({ type: "screen", id: "gallery" })}
            className="w-full flex items-center gap-3 p-3 text-left transition-colors hover:bg-white/[0.07] active:bg-white/[0.1]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-purple-500 text-white shadow-sm shrink-0">
              <Palette className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white">Wallpaper & gallery</p>
              <p className="text-[10px] text-white/50">Browse wallpapers & photos</p>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-white/30 shrink-0" />
          </button>
        </div>

        {/* Group 3: Developer Tools & CV */}
        <div className="overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.05]">
          <button
            type="button"
            onClick={() => handleAction({ type: "modal", id: "terminal" })}
            className="w-full flex items-center gap-3 p-3 text-left transition-colors hover:bg-white/[0.07] active:bg-white/[0.1]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-emerald-600 text-white shadow-sm shrink-0">
              <Terminal className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white">Developer options</p>
              <p className="text-[10px] text-emerald-400">Launch interactive portfolio terminal</p>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-white/30 shrink-0" />
          </button>

          <div className="mx-3 h-[1px] bg-white/[0.06]" />

          <button
            type="button"
            onClick={() => handleAction({ type: "screen", id: "resume" })}
            className="w-full flex items-center gap-3 p-3 text-left transition-colors hover:bg-white/[0.07] active:bg-white/[0.1]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-orange-500 text-white shadow-sm shrink-0">
              <FileText className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white">Resume & Curriculum Vitae</p>
              <p className="text-[10px] text-white/50">View / download latest PDF version</p>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-white/30 shrink-0" />
          </button>

          <div className="mx-3 h-[1px] bg-white/[0.06]" />

          <div className="flex items-center gap-3 p-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-teal-500 text-white shadow-sm shrink-0">
              <BatteryCharging className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white">Battery & device care</p>
              <p className="text-[10px] text-teal-400 font-medium">85% · Good · Fast Charging</p>
            </div>
            <span className="rounded-full bg-teal-500/10 px-2 py-0.5 text-[9px] font-semibold text-teal-400">
              Good
            </span>
          </div>
        </div>

        {/* Group 4: About Phone */}
        <button
          type="button"
          onClick={() => handleAction({ type: "screen", id: "about" })}
          className="w-full text-left rounded-[20px] border border-white/10 bg-white/[0.05] p-3 transition-colors hover:bg-white/[0.08] active:scale-[0.99]"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-zinc-600 text-white shrink-0">
              <Smartphone className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white">About phone</p>
              <p className="text-[10px] text-blue-400 font-medium">
                PortfolioOS · Portfolio Edition
              </p>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-white/30 shrink-0" />
          </div>

          <div className="mt-2.5 space-y-1.5 rounded-[14px] bg-black/30 p-2.5 text-[10px]">
            <div className="flex justify-between text-white/70">
              <span>OS version</span>
              <span className="font-semibold text-white">Aura OS 6.2 Pro</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>System core</span>
              <span className="font-semibold text-white">Flutter & Web Engine</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Developer</span>
              <span className="font-semibold text-white">{siteConfig.name}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Status</span>
              <span className="text-emerald-400 font-semibold">Ready to Build & Hire</span>
            </div>
          </div>
        </button>
      </div>
    </AppScreenShell>
  );
}


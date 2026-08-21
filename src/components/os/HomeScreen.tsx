import { useMemo } from "react";
import { Search, Briefcase, MapPin } from "lucide-react";
import { useLiveClock } from "@/hooks/useLiveClock";
import { usePhoneOS } from "@/context/PhoneOSContext";
import { homeApps, dockApps } from "@/data/osApps";
import { siteConfig } from "@/data/site";
import { PhoneWallpaper } from "./PhoneWallpaper";
import { PhoneStatusBar } from "./PhoneStatusBar";
import { PhoneNavBar } from "./PhoneNavBar";
import { AppIcon } from "./AppIcon";
import { GlassCard } from "./GlassCard";

export function HomeScreen() {
  const { handleAction, searchQuery, setSearchQuery, openApp } = usePhoneOS();
  const { time, date } = useLiveClock();

  const filteredApps = useMemo(() => {
    if (!searchQuery.trim()) return homeApps;
    return homeApps.filter((a) =>
      a.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <PhoneWallpaper className="flex flex-col select-none">
      <PhoneStatusBar />

      <div className="flex flex-1 flex-col overflow-hidden px-4">
        <div className="pt-2">
          <p className="text-xs font-medium text-white">{date}</p>
          <p className="text-3xl font-light text-white tabular-nums drop-shadow-md">{time}</p>
        </div>

        <div className="mt-3">
          <GlassCard
            solid
            className="flex items-center gap-3 px-3 py-2.5"
            onClick={() => openApp("about")}
          >
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white">Open to Work</p>
              <p className="truncate text-[10px] text-white/70">
                Flutter Developer · {siteConfig.tagline}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-0.5 text-[9px] text-white/55">
              <span className="inline-flex items-center gap-0.5">
                <Briefcase className="h-2.5 w-2.5" /> 15+ projects
              </span>
              <span className="inline-flex items-center gap-0.5">
                <MapPin className="h-2.5 w-2.5" /> Itahari
              </span>
            </div>
          </GlassCard>
        </div>

        <div className="relative mt-4 min-h-0 flex-1 overflow-y-auto os-scroll touch-pan-y">
          {filteredApps.length === 0 ? (
            <div className="flex h-full min-h-[160px] flex-col items-center justify-center gap-2 px-6 text-center">
              <Search className="h-8 w-8 text-white/25" />
              <p className="text-sm font-medium text-white/70">No apps found</p>
              <p className="text-[11px] text-white/40">
                Nothing matches &ldquo;{searchQuery.trim()}&rdquo;
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-x-2 gap-y-4 py-1">
              {filteredApps.map((app) => (
                <AppIcon
                  key={app.id}
                  label={app.label}
                  icon={app.icon}
                  onClick={() => handleAction(app.action)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="py-2">
          <label className="sr-only" htmlFor="os-search">
            Search apps
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/35" />
            <input
              id="os-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-full rounded-full border border-white/[0.08] bg-[#1c1c1e]/90 py-2.5 pl-9 pr-4 text-xs text-white placeholder:text-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-white/15"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="mb-2 rounded-[22px] border border-white/[0.07] bg-[#141416]/85 px-2 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
          <div className="flex items-end justify-around">
            {dockApps.map((app) => (
              <AppIcon
                key={app.id}
                label={app.label}
                icon={app.icon}
                badge={app.badge}
                size="sm"
                showLabel={false}
                onClick={() => handleAction(app.action)}
              />
            ))}
          </div>
        </div>
      </div>

      <PhoneNavBar />
    </PhoneWallpaper>
  );
}

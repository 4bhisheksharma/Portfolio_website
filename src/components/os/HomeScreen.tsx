import { useMemo } from "react";
import { Search, Mic, Camera, CloudSun, MapPin, Sparkles, X, Rocket } from "lucide-react";
import { useLiveClock } from "@/hooks/useLiveClock";
import { usePhoneOS } from "@/context/PhoneOSContext";
import { homeApps, dockApps } from "@/data/osApps";
import { projects } from "@/data/projects";
import { PhoneWallpaper } from "./PhoneWallpaper";
import { PhoneStatusBar } from "./PhoneStatusBar";
import { PhoneNavBar } from "./PhoneNavBar";
import { AppIcon } from "./AppIcon";

export function HomeScreen() {
  const { handleAction, searchQuery, setSearchQuery, openApp } = usePhoneOS();
  const { time, date } = useLiveClock();

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;
    if (SpeechRecognition && typeof SpeechRecognition === "function") {
      try {
        const recognition = new (SpeechRecognition as new () => {
          onresult: (e: { results: { 0: { 0: { transcript: string } } } }) => void;
          start: () => void;
        })();
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setSearchQuery(transcript);
        };
        recognition.start();
        return;
      } catch {
        // Fallback to focus
      }
    }
    document.getElementById("os-search")?.focus();
  };

  const filteredApps = useMemo(() => {
    if (!searchQuery.trim()) return homeApps;
    const q = searchQuery.toLowerCase().trim();
    return homeApps.filter((a) => a.label.toLowerCase().includes(q));
  }, [searchQuery]);

  const matchedProjects = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 3);
  }, [searchQuery]);

  return (
    <PhoneWallpaper className="flex flex-col select-none">
      <PhoneStatusBar />

      <div className="flex flex-1 flex-col overflow-hidden px-3 pt-1">
        {/* Signature Weather & Clock Widget */}
        <div className="pt-1 pb-1">
          <div
            onClick={() => openApp("about")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && openApp("about")}
            className="group relative cursor-pointer overflow-hidden rounded-[22px] border border-white/15 bg-white/[0.07] p-3 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all hover:bg-white/[0.1] active:scale-[0.99]"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <p className="text-2xl font-light tracking-tight text-white tabular-nums drop-shadow-md">
                    {time}
                  </p>
                </div>
                <p className="text-[10.5px] font-medium text-white/70">{date}</p>
                <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-white/80">
                  <MapPin className="h-2.5 w-2.5 text-cyan-400" />
                  <span className="font-medium">Itahari, Nepal</span>
                </div>
              </div>

              {/* Weather Graphic */}
              <div className="flex flex-col items-end">
                <div className="relative flex items-center justify-center">
                  <CloudSun className="h-8 w-8 text-amber-300 drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]" />
                  <Sparkles className="absolute -top-1 -right-1 h-2.5 w-2.5 text-cyan-300 opacity-80" />
                </div>
                <p className="mt-0.5 text-sm font-semibold text-white">24°C</p>
                <p className="text-[9.5px] text-white/60">Mostly Sunny</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Search Pill */}
        <div className="pt-1.5 pb-1">
          <label className="sr-only" htmlFor="os-search">
            Search apps and portfolio
          </label>
          <div className="relative flex items-center">
            {/* Colorful G Logo */}
            <div className="pointer-events-none absolute left-3 flex h-4 w-4 items-center justify-center font-bold text-xs">
              <span className="text-blue-400">G</span>
            </div>
            <input
              id="os-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search apps & projects..."
              className="w-full rounded-full border border-white/10 bg-[#16161b]/80 py-1.5 pl-8 pr-16 text-[10.5px] text-white placeholder:text-white/45 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_12px_rgba(0,0,0,0.3)] backdrop-blur-2xl focus:outline-none focus:ring-1 focus:ring-cyan-400/40"
              autoComplete="off"
            />
            {/* Quick Action Voice & Camera Icons */}
            <div className="absolute right-2.5 flex items-center gap-2 text-white/50">
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleVoiceSearch}
                  className="hover:text-white transition-colors cursor-pointer"
                  aria-label="Voice search"
                  title="Voice search"
                >
                  <Mic className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => handleAction({ type: "camera" })}
                className="hover:text-white transition-colors cursor-pointer"
                aria-label="Camera search"
                title="Camera"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* App Grid & Search Results */}
        <div className="relative mt-1 min-h-0 flex-1 overflow-y-auto os-scroll touch-pan-y px-1">
          {filteredApps.length === 0 && matchedProjects.length === 0 ? (
            <div className="flex h-full min-h-[160px] flex-col items-center justify-center gap-2 px-6 text-center">
              <Search className="h-6 w-6 text-white/25" />
              <p className="text-xs font-medium text-white/70">No apps or projects found</p>
              <p className="text-[10px] text-white/40">
                Nothing matches &ldquo;{searchQuery.trim()}&rdquo;
              </p>
            </div>
          ) : (
            <div className="space-y-3 py-1">
              {/* Apps Grid */}
              {filteredApps.length > 0 && (
                <div className="grid grid-cols-4 gap-x-2 gap-y-2.5">
                  {filteredApps.map((app) => (
                    <AppIcon
                      key={app.id}
                      id={app.id}
                      label={app.label}
                      icon={app.icon}
                      onClick={() => handleAction(app.action)}
                    />
                  ))}
                </div>
              )}

              {/* Matched Projects Quick Access if searching */}
              {matchedProjects.length > 0 && (
                <div className="mt-2 rounded-[16px] border border-white/10 bg-white/[0.04] p-2">
                  <p className="mb-1.5 flex items-center gap-1 text-[9.5px] font-semibold uppercase tracking-wider text-cyan-400">
                    <Rocket className="h-3 w-3" />
                    Matching Projects ({matchedProjects.length})
                  </p>
                  <div className="space-y-1">
                    {matchedProjects.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => openApp("projects")}
                        className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-white/[0.08] cursor-pointer"
                      >
                        <img
                          src={p.image}
                          alt=""
                          className="h-7 w-7 rounded-lg object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-white truncate">{p.title}</p>
                          <p className="text-[9px] text-white/50 truncate">{p.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Floating Bottom Dock */}
        <div className="mb-2 mt-1 rounded-[26px] border border-white/15 bg-white/[0.08] px-2 py-2 shadow-[0_12px_32px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.25)] backdrop-blur-2xl">
          <div className="flex items-end justify-around">
            {dockApps.map((app) => (
              <AppIcon
                key={app.id}
                id={app.id}
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


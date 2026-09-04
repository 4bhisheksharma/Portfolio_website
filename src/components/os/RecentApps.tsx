import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePhoneOS } from "@/context/PhoneOSContext";
import { screenMeta, dockApps } from "@/data/osApps";
import type { AppScreenId } from "@/data/osApps";
import { AppIcon } from "./AppIcon";

export function RecentApps() {
  const { showRecent, closeRecent, recentApps, openApp, goHome, handleAction } = usePhoneOS();
  const prefersReducedMotion = useReducedMotion();
  const [localRecents, setLocalRecents] = useState<AppScreenId[]>(recentApps);

  useEffect(() => {
    setLocalRecents(recentApps);
  }, [recentApps]);

  const dismissApp = (id: AppScreenId, e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalRecents((prev) => prev.filter((appId) => appId !== id));
  };

  const handleCloseAll = () => {
    setLocalRecents([]);
    setTimeout(() => {
      closeRecent();
      goHome();
    }, 200);
  };

  return (
    <AnimatePresence>
      {showRecent && (
        <>
          {/* Ambient darkened backdrop */}
          <motion.button
            type="button"
            aria-label="Close recents"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-black/70 backdrop-blur-md"
            onClick={closeRecent}
          />

          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="absolute inset-0 z-50 flex flex-col select-none pt-12 pb-4"
          >
            {/* Recents Header */}
            <div className="flex items-center justify-between px-6 pb-3">
              <h2 className="text-base font-semibold text-white/95">Recent Apps</h2>
              <span className="text-[11px] text-white/50">{localRecents.length} active</span>
            </div>

            {/* Horizontal App Cards Carousel */}
            <div className="flex-1 overflow-hidden flex items-center justify-center">
              {localRecents.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 text-center px-6">
                  <div className="h-16 w-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10">
                    <span className="text-2xl">✨</span>
                  </div>
                  <p className="text-sm font-medium text-white/70">No open apps</p>
                  <button
                    type="button"
                    onClick={() => {
                      closeRecent();
                      goHome();
                    }}
                    className="rounded-full bg-white/15 px-5 py-2 text-xs font-semibold text-white hover:bg-white/20 active:scale-95 transition-all"
                  >
                    Go to Home
                  </button>
                </div>
              ) : (
                <div className="flex h-full w-full items-center gap-4 overflow-x-auto px-8 os-scroll touch-pan-x snap-x snap-mandatory">
                  {localRecents.map((id, i) => {
                    const meta = screenMeta[id] || { title: id, icon: () => null };
                    const Icon = meta.icon;

                    return (
                      <motion.div
                        key={id}
                        layout
                        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -160, transition: { duration: 0.2 } }}
                        transition={{ delay: i * 0.05 }}
                        className="group relative flex h-[360px] w-[240px] shrink-0 snap-center flex-col cursor-pointer active:scale-[0.98] transition-transform"
                        onClick={() => openApp(id)}
                      >
                        {/* App Icon + Title top bar */}
                        <div className="mb-2 flex items-center gap-2 px-1">
                          <div className="flex h-6 w-6 items-center justify-center rounded-[8px] bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-sm ring-1 ring-white/10">
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-xs font-semibold text-white truncate flex-1">
                            {meta.title}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => dismissApp(id, e)}
                            className="text-[10px] text-white/50 hover:text-white px-1.5 py-0.5 rounded-full hover:bg-white/10"
                            aria-label={`Close ${meta.title}`}
                          >
                            ✕
                          </button>
                        </div>

                        {/* App Preview Card */}
                        <div className="relative flex-1 overflow-hidden rounded-[26px] border border-white/15 bg-[#16161b] shadow-[0_16px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                          {/* Inner preview card header */}
                          <div className="h-7 w-full bg-[#1e1e24] border-b border-white/10 px-3 flex items-center justify-between">
                            <span className="text-[9px] text-white/50 font-medium">Preview</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          </div>

                          {/* App watermarked backdrop */}
                          <div className="flex h-[calc(100%-28px)] flex-col items-center justify-center p-4 bg-gradient-to-b from-[#121217] to-[#0a0a0e]">
                            <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-white/[0.06] border border-white/10 shadow-inner mb-3">
                              <Icon className="h-8 w-8 text-white/80" />
                            </div>
                            <p className="text-xs font-semibold text-white/90">{meta.title}</p>
                            <p className="text-[9.5px] text-white/40 mt-1">Tap card to open</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Iconic "Close all" Button */}
            {localRecents.length > 0 && (
              <div className="flex justify-center py-2.5">
                <button
                  type="button"
                  onClick={handleCloseAll}
                  className="rounded-full border border-white/15 bg-white/[0.12] px-7 py-2 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-xl hover:bg-white/[0.18] active:scale-95 transition-all"
                >
                  Close all
                </button>
              </div>
            )}

            {/* Quick App Dock */}
            <div className="mx-auto mt-1 flex items-center gap-4 rounded-[22px] border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-xl">
              {dockApps.slice(0, 4).map((app) => (
                <AppIcon
                  key={app.id}
                  id={app.id}
                  label={app.label}
                  icon={app.icon}
                  size="sm"
                  showLabel={false}
                  onClick={() => {
                    closeRecent();
                    handleAction(app.action);
                  }}
                />
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


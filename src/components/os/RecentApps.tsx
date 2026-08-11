import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { usePhoneOS } from "@/context/PhoneOSContext";
import { screenMeta } from "@/data/osApps";

export function RecentApps() {
  const { showRecent, closeRecent, recentApps, openApp, goHome, lock } = usePhoneOS();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {showRecent && (
        <>
          <motion.button
            type="button"
            aria-label="Close recent apps"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={closeRecent}
          />
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="absolute inset-0 z-50 flex flex-col select-none"
          >
            <div className="flex items-center justify-between px-4 pb-2 pt-10">
              <h2 className="text-sm font-semibold text-white">Recents</h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={lock}
                  className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-medium text-white/80 hover:bg-white/15"
                >
                  Lock
                </button>
                <button
                  type="button"
                  onClick={lock}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70"
                  aria-label="Close and lock"
                  title="Lock phone"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="os-scroll flex-1 overflow-y-auto px-4 pb-6">
              {recentApps.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <p className="text-sm text-white/50">No recent apps</p>
                  <button
                    type="button"
                    onClick={goHome}
                    className="rounded-full bg-white/10 px-4 py-2 text-xs text-white/80 hover:bg-white/15"
                  >
                    Go Home
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {recentApps.map((id, i) => {
                    const meta = screenMeta[id];
                    const Icon = meta.icon;
                    return (
                      <motion.button
                        key={id}
                        type="button"
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => openApp(id)}
                        className="overflow-hidden rounded-2xl border border-white/10 bg-[#151518] text-left shadow-xl transition-transform active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-2 border-b border-white/5 px-3 py-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1a1a1c] ring-1 ring-white/10">
                            <Icon className="h-3.5 w-3.5 text-white/90" strokeWidth={1.75} />
                          </div>
                          <span className="text-xs font-medium text-white">{meta.title}</span>
                        </div>
                        <div className="relative h-28 bg-gradient-to-br from-[#1c1c20] to-[#0a0a0c]">
                          <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            <Icon className="h-16 w-16 text-white" strokeWidth={1} />
                          </div>
                          <div className="absolute bottom-3 left-3 right-3">
                            <p className="text-[10px] text-white/40">Tap to reopen</p>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

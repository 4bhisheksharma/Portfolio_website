import { AnimatePresence, motion } from "framer-motion";
import { Volume2, Volume1, VolumeX } from "lucide-react";
import { usePhoneOS } from "@/context/PhoneOSContext";

export function VolumeHUD() {
  const { volume, volumeVisible } = usePhoneOS();
  const Icon = volume === 0 ? VolumeX : volume < 40 ? Volume1 : Volume2;

  return (
    <AnimatePresence>
      {volumeVisible && (
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="pointer-events-none absolute left-3 top-24 z-[95] w-14 select-none"
        >
          <div className="rounded-2xl border border-white/10 bg-[#1c1c1e]/95 px-2.5 py-3 shadow-2xl backdrop-blur-xl">
            <Icon className="mx-auto mb-2 h-4 w-4 text-white/80" />
            <div className="mx-auto flex h-28 w-1.5 flex-col justify-end overflow-hidden rounded-full bg-white/15">
              <motion.div
                className="w-full rounded-full bg-white"
                animate={{ height: `${volume}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
              />
            </div>
            <p className="mt-2 text-center text-[9px] font-medium tabular-nums text-white/70">
              {volume}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

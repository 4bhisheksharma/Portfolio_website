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
          initial={{ opacity: 0, x: 14, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 10, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 450, damping: 30 }}
          className="pointer-events-none absolute right-2.5 top-[110px] z-[95] w-[46px] select-none"
        >
          {/* Volume Slider Pill HUD */}
          <div className="flex flex-col items-center rounded-[24px] border border-white/15 bg-[#141418]/95 px-2 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
            <Icon className="mb-2.5 h-4 w-4 text-blue-400 drop-shadow-sm" />

            {/* Vertical Pill Track */}
            <div className="relative flex h-28 w-2 flex-col justify-end overflow-hidden rounded-full bg-white/15 shadow-inner">
              <motion.div
                className="w-full rounded-full bg-gradient-to-t from-blue-500 to-cyan-400 shadow-sm"
                animate={{ height: `${volume}%` }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
              />
            </div>

            <p className="mt-2 text-center text-[10px] font-semibold tabular-nums text-white/80">
              {volume}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


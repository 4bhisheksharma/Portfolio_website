import { AnimatePresence, motion } from "framer-motion";
import { usePhoneOS } from "@/context/PhoneOSContext";
import { PhoneFrame } from "./PhoneFrame";
import { LockScreen } from "./LockScreen";
import { HomeScreen } from "./HomeScreen";
import { AppScreenRouter } from "./AppScreenRouter";
import { NotificationPanel } from "./NotificationPanel";
import { RecentApps } from "./RecentApps";
import { PullDownHandle } from "./PullDownHandle";
import { VolumeHUD } from "./VolumeHUD";

export function PhoneOS() {
  const { screen } = usePhoneOS();
  const unlocked = screen === "home" || screen === "app";

  return (
    <div className="os-desktop-bg flex h-[100dvh] w-full items-center justify-center p-0 md:p-4">
      <PhoneFrame>
        <div
          className="relative h-full w-full overflow-hidden os-no-select bg-[#0a0a0f]"
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Home mounts under the lock so unlock never flashes black */}
          {unlocked && (
            <div className="absolute inset-0">
              <HomeScreen />
            </div>
          )}

          <AnimatePresence>
            {screen === "lock" && (
              <motion.div
                key="lock"
                initial={false}
                exit={{ y: "-105%" }}
                transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0 z-10 will-change-transform"
              >
                <LockScreen />
              </motion.div>
            )}
          </AnimatePresence>

          <AppScreenRouter />
          <PullDownHandle />
          <NotificationPanel />
          <RecentApps />
          <VolumeHUD />
        </div>
      </PhoneFrame>
    </div>
  );
}

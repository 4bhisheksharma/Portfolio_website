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

  return (
    <div className="os-desktop-bg flex min-h-[100dvh] items-center justify-center p-4 md:p-8">
      <PhoneFrame>
        <div
          className="relative h-full w-full overflow-hidden os-no-select"
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
        >
          <AnimatePresence mode="wait">
            {screen === "lock" && (
              <motion.div
                key="lock"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -48, filter: "blur(6px)" }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0 z-10"
              >
                <LockScreen />
              </motion.div>
            )}
            {(screen === "home" || screen === "app") && (
              <motion.div
                key="home"
                initial={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                className="absolute inset-0"
              >
                <HomeScreen />
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

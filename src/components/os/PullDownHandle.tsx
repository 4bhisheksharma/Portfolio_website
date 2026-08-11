import { useRef } from "react";
import { motion, type PanInfo } from "framer-motion";
import { usePhoneOS } from "@/context/PhoneOSContext";

/** Invisible top strip — drag down to open notification / control center */
export function PullDownHandle() {
  const { openPanel, screen } = usePhoneOS();
  const opened = useRef(false);

  if (screen === "lock") return null;

  const onDrag = (_: unknown, info: PanInfo) => {
    if (!opened.current && info.offset.y > 56) {
      opened.current = true;
      openPanel();
    }
  };

  const onDragEnd = () => {
    opened.current = false;
  };

  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0.6 }}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      className="absolute inset-x-0 top-0 z-[35] h-10 touch-none"
      aria-hidden
    />
  );
}

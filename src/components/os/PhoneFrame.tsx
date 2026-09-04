import { cn } from "@/lib/utils";
import { usePhoneOS } from "@/context/PhoneOSContext";

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

function SideButton({
  className,
  onClick,
  label,
}: {
  className: string;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute z-30 w-[5px] bg-gradient-to-r from-[#52525b] via-[#71717a] to-[#3f3f46]",
        "rounded-r-sm shadow-[1px_1px_3px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.3)]",
        "transition-all duration-75 active:scale-y-[0.98] active:brightness-125 active:translate-x-[0.5px]",
        "hover:brightness-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/40",
        className
      )}
    />
  );
}

export function PhoneFrame({ children, className }: PhoneFrameProps) {
  const { volumeUp, volumeDown, lock, screen } = usePhoneOS();

  return (
    <div
      className={cn("relative mx-auto select-none", className)}
      style={{
        width: "min(100%, 375px, calc((100dvh - 2.8rem) * (375 / 790)))",
        aspectRatio: "375 / 790",
      }}
    >
      {/* Precision Tactile Hardware Side Buttons */}
      {/* Volume Up */}
      <SideButton
        label="Volume up"
        onClick={volumeUp}
        className="-right-[5px] top-[106px] h-[42px]"
      />
      {/* Volume Down */}
      <SideButton
        label="Volume down"
        onClick={volumeDown}
        className="-right-[5px] top-[156px] h-[42px]"
      />
      {/* Power / Lock Key */}
      <SideButton
        label={screen === "lock" ? "Power on" : "Power key (Lock)"}
        onClick={lock}
        className="-right-[5px] top-[214px] h-[50px]"
      />

      {/* Titanium Alloy Precision-Engineered Chassis */}
      <div
        className={cn(
          "relative h-full rounded-[44px] p-[10px]",
          "bg-gradient-to-b from-[#34343a] via-[#1c1c20] to-[#0e0e11]",
          "shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.16),inset_0_1px_2px_rgba(255,255,255,0.25),inset_0_-1px_3px_rgba(0,0,0,0.85)]"
        )}
      >
        {/* Antenna band cutouts on frame */}
        <div className="pointer-events-none absolute -left-[1px] top-[72px] h-[3.5px] w-[2px] bg-[#121215] shadow-inner" />
        <div className="pointer-events-none absolute -left-[1px] bottom-[72px] h-[3.5px] w-[2px] bg-[#121215] shadow-inner" />
        <div className="pointer-events-none absolute -right-[1px] top-[72px] h-[3.5px] w-[2px] bg-[#121215] shadow-inner" />
        <div className="pointer-events-none absolute -right-[1px] bottom-[72px] h-[3.5px] w-[2px] bg-[#121215] shadow-inner" />

        {/* Top subtle earpiece speaker micro-grille */}
        <div className="pointer-events-none absolute left-1/2 top-[4.5px] z-40 h-[2.5px] w-14 -translate-x-1/2 rounded-full bg-[#16161a] shadow-[inset_0_1px_1px_rgba(0,0,0,0.9)]" />

        {/* Top microphone pinhole */}
        <div className="pointer-events-none absolute left-[28%] top-[5px] z-40 h-[1.5px] w-[1.5px] rounded-full bg-[#0a0a0c]" />

        {/* Inner bezel with edge-to-edge curved OLED screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-black ring-1 ring-white/[0.09]">
          {/* Centered Camera Punch-hole with Dual-Layer Optical Glass Lens */}
          <div
            className="pointer-events-none absolute left-1/2 top-[10px] z-40 flex h-[13px] w-[13px] -translate-x-1/2 items-center justify-center rounded-full bg-black shadow-[0_0_2px_rgba(0,0,0,0.95)] ring-[1.5px] ring-black"
            aria-hidden="true"
          >
            {/* Optical coated lens reflection */}
            <div className="relative h-[7.5px] w-[7.5px] overflow-hidden rounded-full bg-gradient-to-br from-[#0c1424] via-[#05060a] to-[#1a153b] ring-[0.5px] ring-white/20">
              {/* Cyan anti-reflective specular glint */}
              <div className="absolute left-[1px] top-[1px] h-[2.5px] w-[2.5px] rounded-full bg-cyan-400/50 blur-[0.2px]" />
              {/* Violet peripheral flare */}
              <div className="absolute bottom-[0.5px] right-[0.5px] h-[2px] w-[2px] rounded-full bg-purple-400/40" />
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}


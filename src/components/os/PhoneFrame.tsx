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
        "absolute z-20 w-[5px] rounded-sm bg-gradient-to-b from-zinc-500 to-zinc-800",
        "shadow-sm transition-transform active:scale-y-95 active:brightness-125",
        "hover:brightness-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40",
        className
      )}
    />
  );
}

export function PhoneFrame({ children, className }: PhoneFrameProps) {
  const { volumeUp, volumeDown, lock, screen } = usePhoneOS();

  return (
    <div className={cn("relative mx-auto w-full max-w-[390px]", className)}>
      {/* Volume up */}
      <SideButton
        label="Volume up"
        onClick={volumeUp}
        className="-left-[4px] top-[110px] h-[40px] rounded-l-sm"
      />
      {/* Volume down */}
      <SideButton
        label="Volume down"
        onClick={volumeDown}
        className="-left-[4px] top-[158px] h-[40px] rounded-l-sm"
      />
      {/* Mute / extra */}
      <SideButton
        label="Mute switch"
        onClick={volumeDown}
        className="-left-[4px] top-[79px] h-[22px] rounded-l-sm"
      />
      {/* Power / lock */}
      <SideButton
        label={screen === "lock" ? "Power" : "Lock phone"}
        onClick={lock}
        className="-right-[4px] top-[116px] h-[45px] rounded-r-sm"
      />

      <div
        className={cn(
          "relative rounded-[40px] p-[10px]",
          "bg-gradient-to-br from-[#2c2c30] to-[#0c0c10]",
          "shadow-[0_25px_65px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.6)]"
        )}
      >
        <div className="relative overflow-hidden rounded-[32px] bg-black aspect-[390/844]">
          {children}
        </div>
      </div>
    </div>
  );
}

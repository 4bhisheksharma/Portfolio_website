import { cn } from "@/lib/utils";

interface PhoneWallpaperProps {
  className?: string;
  children?: React.ReactNode;
}

export function PhoneWallpaper({ className, children }: PhoneWallpaperProps) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-[#06070a]",
        className
      )}
    >
      {/* Aura OS Signature Abstract Crystalline Wallpaper */}
      <div
        className="pointer-events-none absolute inset-0 select-none"
        aria-hidden="true"
      >
        {/* Deep ambient dark mesh */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090b14] via-[#05060a] to-[#020204]" />

        {/* Crystalline Ribbons & Atmospheric Nebula Layers */}
        <div
          className="absolute -top-[15%] -right-[20%] h-[420px] w-[340px] rounded-full opacity-65 blur-[55px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.45) 0%, rgba(56, 189, 248, 0.25) 45%, transparent 75%)",
            transform: "rotate(-25deg)",
          }}
        />

        <div
          className="absolute top-[28%] -left-[25%] h-[380px] w-[320px] rounded-full opacity-55 blur-[50px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.4) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 80%)",
            transform: "rotate(35deg)",
          }}
        />

        <div
          className="absolute -bottom-[10%] right-[5%] h-[360px] w-[300px] rounded-full opacity-50 blur-[60px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(14, 165, 233, 0.35) 0%, rgba(99, 102, 241, 0.15) 55%, transparent 80%)",
          }}
        />

        {/* Sharp geometric crystalline light accent line */}
        <div
          className="absolute left-[15%] top-[20%] h-[320px] w-[2px] bg-gradient-to-b from-transparent via-cyan-400/25 to-transparent blur-[1px]"
          style={{ transform: "rotate(-38deg)" }}
        />
        <div
          className="absolute right-[22%] top-[35%] h-[260px] w-[2px] bg-gradient-to-b from-transparent via-purple-400/20 to-transparent blur-[1px]"
          style={{ transform: "rotate(42deg)" }}
        />

        {/* Subtle glass vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col">{children}</div>
    </div>
  );
}


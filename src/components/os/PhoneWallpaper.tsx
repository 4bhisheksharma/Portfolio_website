import { cn } from "@/lib/utils";

interface PhoneWallpaperProps {
  className?: string;
  children?: React.ReactNode;
}

export function PhoneWallpaper({ className, children }: PhoneWallpaperProps) {
  return (
    <div
      className={cn("relative h-full w-full overflow-hidden bg-[#020617]", className)}
      style={{
        background:
          "radial-gradient(ellipse 85% 65% at 50% 32%, #1e293b 0%, #0f172a 48%, #020617 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-black/20" />
      {children}
    </div>
  );
}

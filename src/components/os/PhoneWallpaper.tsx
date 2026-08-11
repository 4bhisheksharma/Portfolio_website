import { cn } from "@/lib/utils";

interface PhoneWallpaperProps {
  className?: string;
  children?: React.ReactNode;
}

export function PhoneWallpaper({ className, children }: PhoneWallpaperProps) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-[#020617]", className)}>
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 35%, rgba(30,41,59,1) 0%, rgba(15,23,42,0.95) 45%, rgba(2,6,23,1) 100%)",
        }}
      />
      <div className="absolute left-[15%] top-[8%] h-[500px] w-[500px] rounded-full bg-blue-600/[0.08] blur-3xl" />
      <div className="absolute right-[10%] top-[22%] h-[400px] w-[400px] rounded-full bg-violet-600/[0.07] blur-3xl" />
      <div className="absolute inset-0 bg-black/25" />
      {children}
    </div>
  );
}

import { cn } from "@/lib/utils";

interface IPhoneFrameProps {
  src: string;
  alt: string;
  className?: string;
}

/** CSS-only iPhone with Dynamic Island; the screenshot fills the screen from the top. */
export function IPhoneFrame({ src, alt, className }: IPhoneFrameProps) {
  return (
    <div className={cn("relative aspect-[9/19.5]", className)}>
      {/* side buttons */}
      <span aria-hidden className="absolute -left-[3px] top-[18%] h-[6%] w-[3px] rounded-l bg-neutral-700" />
      <span aria-hidden className="absolute -left-[3px] top-[27%] h-[10%] w-[3px] rounded-l bg-neutral-700" />
      <span aria-hidden className="absolute -left-[3px] top-[39%] h-[10%] w-[3px] rounded-l bg-neutral-700" />
      <span aria-hidden className="absolute -right-[3px] top-[30%] h-[14%] w-[3px] rounded-r bg-neutral-700" />

      <div className="relative h-full w-full rounded-[18%/8.3%] bg-neutral-900 p-[3.5%] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8),inset_0_0_0_1.5px_rgba(255,255,255,0.12)]">
        <div className="relative h-full w-full overflow-hidden rounded-[14%/6.5%] bg-black">
          <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover object-top" />
          <span
            aria-hidden
            className="absolute left-1/2 top-[1.8%] h-[3.6%] w-[32%] -translate-x-1/2 rounded-full bg-black"
          />
        </div>
      </div>
    </div>
  );
}

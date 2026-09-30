import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { siteConfig } from "@/data/site";

export function Showcase() {
  return (
    <section aria-label="Showcase" className="w-full overflow-hidden">
      <MacbookScroll
        title={
          <span className="block text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em] text-foreground">
            From first sketch <br />
            <span className="font-serif font-normal italic tracking-[-0.01em] text-primary">to the store.</span>
          </span>
        }
        badge={
          <a href={siteConfig.url} aria-label="Abhishek Sharma">
            <img src={siteConfig.logo} alt="" className="h-10 w-10 -rotate-12 rounded-full bg-white p-1.5" />
          </a>
        }
        src="/assets/images/og.png"
        alt="Abhishek Sharma, Flutter Developer"
        showGradient={false}
      />
    </section>
  );
}

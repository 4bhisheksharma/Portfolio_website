import { motion, useReducedMotion } from "framer-motion";
import { Terminal } from "lucide-react";
import { siteConfig } from "@/data/site";
import { heroSocials } from "@/data/socials";
import { TypedText } from "@/components/common/TypedText";
import { SocialLinks } from "@/components/common/SocialLinks";

interface HeroProps {
  onOpenTerminal: () => void;
}

export function Hero({ onOpenTerminal }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center section-padding pt-28 md:pt-32"
    >
      <div className="container-max w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <p className="text-sm text-muted-foreground mb-6">{siteConfig.role}</p>

            <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-semibold leading-[1.05] tracking-tight mb-6">
              <span className="block">ABHISHEK</span>
              <span className="block font-normal text-foreground/90">SHARMA</span>
              <span className="sr-only"> — Flutter Developer from Itahari, Nepal</span>
            </h1>

            <p className="text-base text-muted-foreground mb-8">
              {siteConfig.tagline} · Explore my{" "}
              <TypedText strings={siteConfig.typedStrings} className="text-primary" />
            </p>

            <div className="w-14 h-px bg-border mb-8" aria-hidden="true" />

            <div className="flex flex-wrap items-center gap-3 mb-10">
              <SocialLinks links={heroSocials} />
              <button
                type="button"
                onClick={onOpenTerminal}
                aria-label="Open developer terminal"
                title="Open terminal"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-muted-foreground border border-border transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Terminal className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <a
              href="#contact"
              className="inline-block text-sm font-semibold tracking-widest uppercase text-primary border-b-2 border-primary pb-1 hover:opacity-70 transition-opacity"
            >
              Let&apos;s chat!
            </a>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[380px] lg:h-[380px]">
              <img
                src={siteConfig.profileImage}
                alt="Abhishek Sharma — Flutter developer from Itahari, Nepal"
                width={380}
                height={380}
                className="w-full h-full object-contain grayscale hover:grayscale-0 transition-[filter] duration-500 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

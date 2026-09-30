import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { siteConfig } from "@/data/site";
import { footerSocials, heroSocials } from "@/data/socials";
import { Magnetic } from "@/components/motion/Magnetic";
import { FadeIn, SplitReveal } from "@/components/motion/Text";
import { scrollToTarget } from "@/components/motion/SmoothScroll";

const socials = [
  ...footerSocials.filter((s) => s.label !== "App"),
  ...heroSocials.filter((s) => s.label === "Blog"),
];

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  };

  return (
    <button
      onClick={copy}
      aria-label={copied ? "Email copied" : "Copy email address"}
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors duration-300 hover:border-white/25 hover:text-foreground active:scale-95"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "check" : "copy"}
          initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5, rotate: 30 }}
          transition={{ duration: 0.2 }}
        >
          {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute -top-9 whitespace-nowrap rounded-full bg-foreground px-2.5 py-1 text-[11px] font-medium text-background"
          >
            Copied
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden pb-10 pt-24 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-30%] left-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full opacity-30 blur-[140px]"
        style={{ background: "radial-gradient(circle, hsl(142 100% 71% / 0.35), transparent 60%)" }}
      />
      <div className="container-max relative">
        <div className="mb-10 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="font-mono">06</span>
          <span className="h-px flex-1 bg-border" />
          <span className="uppercase tracking-[0.2em]">Contact</span>
        </div>

        <h2 className="text-[clamp(3rem,10vw,9rem)] font-medium leading-[0.92] tracking-[-0.05em]">
          <SplitReveal text="Let's build" />
          <br />
          <span className="font-serif font-normal italic tracking-[-0.02em] text-primary">
            <SplitReveal text="something good." delay={0.15} />
          </span>
        </h2>

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12">
          <FadeIn className="md:col-span-7">
            <p className="mb-4 text-sm text-muted-foreground">
              Open to full-time roles, freelance work and interesting collaborations.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="link-underline min-w-0 text-base font-medium tracking-tight [overflow-wrap:anywhere] sm:text-2xl md:text-3xl"
              >
                {siteConfig.email}
              </a>
              <CopyEmail />
            </div>
            <a href={siteConfig.phoneHref} className="link-underline mt-3 inline-block text-muted-foreground hover:text-foreground">
              {siteConfig.phone}
            </a>
            <div className="mt-10">
              <Magnetic strength={0.4}>
                <a
                  href={`mailto:${siteConfig.email}`}
                  data-cursor="Say hi"
                  className="flex h-32 w-32 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground transition-transform duration-500 ease-out hover:scale-105 md:h-36 md:w-36"
                >
                  Get in touch
                </a>
              </Magnetic>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="md:col-span-5">
            <p className="mb-4 text-sm text-muted-foreground">Elsewhere</p>
            <ul className="border-t border-border">
              {socials.map((s) => (
                <li key={s.label} className="border-b border-border">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-3.5 text-[15px]"
                  >
                    <span className="transition-transform duration-500 ease-out group-hover:translate-x-2">{s.label}</span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <Footer />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-28 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
      <span>{siteConfig.copyright}</span>
      <span className="font-mono">{siteConfig.version}</span>
      <button onClick={() => scrollToTarget(0)} className="link-underline self-start hover:text-foreground md:self-auto">
        Back to top ↑
      </button>
    </footer>
  );
}

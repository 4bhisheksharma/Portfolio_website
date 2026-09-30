import { ArrowUpRight } from "lucide-react";
import { certifications } from "@/data/certifications";
import { FadeIn } from "@/components/motion/Text";
import { useFloatingPreview } from "@/components/motion/FloatingPreview";
import { SectionHeader } from "./SectionHeader";

const items = certifications.filter((c) => !c.comingSoon);

function yearOf(text: string) {
  return text.match(/20\d{2}/)?.[0] ?? "";
}

export function Certifications() {
  const { containerProps, show, preview } = useFloatingPreview({ contain: true });

  return (
    <section id="honors-awards" className="section">
      <div className="container-max">
        <SectionHeader index="05" label="Recognition" title="Awards &" accent="certifications." />

        <FadeIn>
          <ul className="border-t border-border" {...containerProps}>
            {items.map((cert) => (
              <li key={cert.id} className="border-b border-border">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onPointerEnter={show(cert.image)}
                  className="group flex items-center gap-5 py-5"
                >
                  <img
                    src={cert.image}
                    alt={cert.imageAlt}
                    loading="lazy"
                    className="h-11 w-14 shrink-0 rounded-lg border border-white/[0.06] bg-white object-cover md:hidden"
                  />
                  <span className="flex-1 text-base tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2 md:text-lg">
                    {cert.title.replace(/\s*20\d{2}$/, "")}
                  </span>
                  <span className="hidden font-mono text-xs text-muted-foreground sm:block">
                    {yearOf(cert.title) || yearOf(cert.description)}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>
        {/* outside FadeIn: its filter would trap the fixed-position preview */}
        {preview}
      </div>
    </section>
  );
}

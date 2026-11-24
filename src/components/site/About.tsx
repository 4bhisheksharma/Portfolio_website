import { usePortfolioData } from "@/context/PortfolioContext";
import { Counter } from "@/components/common/Counter";
import { FadeIn, ScrollText } from "@/components/motion/Text";
import { TiltCard } from "@/components/motion/TiltCard";
import { SectionHeader } from "./SectionHeader";

export function About() {
  const { siteConfig, experienceStats } = usePortfolioData();

  const facts: { k: string; v: string; extra?: string }[] = [
    { k: "Currently", v: siteConfig.role || "Freelance Flutter Developer" },
    { k: "Studying", v: "BSc. Computing", extra: siteConfig.about?.college ? `@ ${siteConfig.about.college}` : undefined },
    { k: "Based in", v: siteConfig.location },
  ];

  return (
    <section id="about" className="section">
      <div className="container-max">
        <SectionHeader index="01" label="About" title="A developer who" accent="sweats the details." />

        <div className="grid gap-10 sm:gap-14 md:grid-cols-12 md:gap-10">
          <FadeIn className="md:col-span-5">
            <TiltCard className="mx-auto aspect-[4/5] w-full max-w-[280px] sm:max-w-sm md:mx-0 md:max-w-none">
              <div className="h-full w-full overflow-hidden rounded-3xl border border-white/[0.06] bg-card">
                <img
                  src={siteConfig.profileImage}
                  alt={`${siteConfig.name}, ${siteConfig.role} from ${siteConfig.location}`}
                  className="h-full w-full scale-[1.02] object-cover grayscale-[35%] transition-all duration-700 ease-out hover:scale-[1.06] hover:grayscale-0"
                  loading="lazy"
                  width={800}
                  height={1000}
                />
              </div>
            </TiltCard>
          </FadeIn>

          <div className="flex flex-col justify-between gap-10 sm:gap-14 md:col-span-7 md:pl-6">
            <ScrollText
              text={siteConfig.about.description}
              className="text-[clamp(1.35rem,2.4vw,2rem)] font-medium leading-[1.3] tracking-[-0.02em]"
            />

            <FadeIn>
              <dl className="divide-y divide-border border-y border-border">
                {facts.map((f) => (
                  <div key={f.k} className="group flex items-baseline justify-between gap-6 py-4 text-sm">
                    <dt className="text-muted-foreground">{f.k}</dt>
                    <dd className="text-right transition-transform duration-500 ease-out group-hover:-translate-x-1">
                      {f.v}
                      {f.extra && <span className="ml-1.5 text-muted-foreground">{f.extra}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </FadeIn>

            <FadeIn className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
              {experienceStats.map((s) => (
                <div key={s.label} className="bg-background p-5">
                  <Counter
                    value={s.value}
                    suffix={s.suffix}
                    className="block text-4xl font-medium tracking-tight tabular-nums"
                  />
                  <span className="mt-1 block text-xs text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

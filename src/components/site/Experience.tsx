import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { companies } from "@/data/experience";
import { FadeIn } from "@/components/motion/Text";
import { SectionHeader } from "./SectionHeader";

type Company = (typeof companies)[number];

function CompanyBlock({ company }: { company: Company }) {
  const listRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.75", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
          <div className="grid gap-10 md:grid-cols-12">
            <FadeIn className="md:col-span-4">
              <div className="md:sticky md:top-28">
                <div className="flex items-center gap-4">
                  {company.logo ? (
                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-white p-2">
                      <img src={company.logo} alt={`${company.company} logo`} className="h-full w-full object-contain" loading="lazy" />
                    </div>
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-card font-mono text-sm text-primary">
                      {company.logoText}
                    </div>
                  )}
                  <div>
                    {company.companyUrl ? (
                      <a
                        href={company.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 text-lg font-medium"
                      >
                        <span className="link-underline">{company.company}</span>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    ) : (
                      <p className="text-lg font-medium">{company.company}</p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {company.employmentType}
                      {company.totalDuration !== "Present" && ` · ${company.totalDuration}`}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-sm text-muted-foreground">
                  {company.location} · {company.workMode}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {company.skills.map((s) => (
                    <span key={s} className="rounded-full border border-white/[0.08] px-2.5 py-1 text-xs text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            <div ref={listRef} className="relative md:col-span-8 md:pl-10">
              <div aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-border md:left-[45px]" />
              <motion.div
                aria-hidden
                className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-primary md:left-[45px]"
                style={reduced ? undefined : { scaleY }}
              />
              <ol className="space-y-14">
                {company.roles.map((role, i) => (
                  <li key={role.id} className="relative pl-8">
                    <span
                      className={
                        role.isCurrent
                          ? "absolute left-0 top-2.5 h-[11px] w-[11px] rounded-full bg-primary"
                          : "absolute left-0 top-2.5 h-[11px] w-[11px] rounded-full border border-white/20 bg-background"
                      }
                    />
                    <FadeIn delay={i * 0.05}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <h3 className="text-xl font-medium tracking-tight md:text-2xl">{role.title}</h3>
                        <span className="font-mono text-xs text-muted-foreground">
                          {role.period}
                          {role.duration && ` · ${role.duration}`}
                        </span>
                      </div>
                      {role.description && (
                        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{role.description}</p>
                      )}
                      {role.achievements && role.achievements.length > 1 && (
                        <ul className="mt-4 space-y-2 text-[15px] text-muted-foreground">
                          {role.achievements.map((a) => (
                            <li key={a} className="flex gap-3">
                              <span className="mt-[11px] h-px w-3 shrink-0 bg-white/25" />
                              {a}
                            </li>
                          ))}
                        </ul>
                      )}
                      {role.technologies && (
                        <p className="mt-4 font-mono text-xs text-muted-foreground/80">{role.technologies.join(" / ")}</p>
                      )}
                    </FadeIn>
                  </li>
                ))}
              </ol>
            </div>
          </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-max">
        <SectionHeader index="03" label="Experience" title="Where I've" accent="been working." />
        <div className="space-y-24">
          {companies.map((company) => (
            <CompanyBlock key={company.id} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
}

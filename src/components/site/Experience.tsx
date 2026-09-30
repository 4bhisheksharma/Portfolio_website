import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useId, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { companies } from "@/data/experience";
import { FadeIn } from "@/components/motion/Text";
import { SectionHeader } from "./SectionHeader";

type Company = (typeof companies)[number];

function CompanyBlock({ company }: { company: Company }) {
  const listRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.75", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  // Past companies start collapsed; the current one is always open
  const isCurrent = company.roles.some((r) => r.isCurrent);
  const [open, setOpen] = useState(isCurrent);
  const panelId = useId();
  const first = company.roles[company.roles.length - 1];
  const last = company.roles[0];
  const span = `${first.period.split(" - ")[0]} - ${last.period.split(" - ")[1] ?? "Present"}`;

  return (
    <div className="grid gap-10 md:grid-cols-12">
      <FadeIn className="md:col-span-4">
        <div className="md:sticky md:top-28">
          <div className="flex items-center gap-4">
            {company.logo ? (
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-white p-2">
                <img
                  src={company.logo}
                  alt={`${company.company} logo`}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
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
              <span
                key={s}
                className="rounded-full border border-white/[0.08] px-2.5 py-1 text-xs text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>

      <div ref={listRef} className="md:col-span-8 md:pl-10">
        {!isCurrent && (
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="group mb-8 flex w-full items-center justify-between gap-4 rounded-2xl border border-white/[0.08] px-5 py-4 text-left transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.02]"
          >
            <span className="flex flex-col gap-0.5 text-sm sm:block">
              {company.roles.length} {company.roles.length === 1 ? "role" : "roles"}
              <span className="font-mono text-xs text-muted-foreground sm:ml-2">{span}</span>
            </span>
            <span className="flex items-center gap-2 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
              {open ? "Collapse" : "Expand"}
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10"
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </motion.span>
            </span>
          </button>
        )}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              key="roles"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="relative">
                <div aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-border" />
                <motion.div
                  aria-hidden
                  className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-primary"
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
                          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                            {role.description}
                          </p>
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
                          <p className="mt-4 font-mono text-xs text-muted-foreground/80">
                            {role.technologies.join(" / ")}
                          </p>
                        )}
                      </FadeIn>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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

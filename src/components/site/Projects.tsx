import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, projectFilters, type Project, type ProjectCategory } from "@/data/projects";
import { FadeIn } from "@/components/motion/Text";
import { useFloatingPreview } from "@/components/motion/FloatingPreview";
import { SectionHeader } from "./SectionHeader";
import { IPhoneFrame } from "./IPhoneFrame";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
const FEATURED_COUNT = 4;
const LIST_PREVIEW = 8;

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const primary = project.links[0];
  return (
    <FadeIn delay={(index % 2) * 0.1} className={cn(index % 2 === 1 && "md:mt-24")}>
      <article className="group">
        <a
          href={primary?.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="View"
          className="relative block aspect-[5/6] overflow-hidden rounded-3xl sm:aspect-[4/5] border border-white/[0.06] bg-card"
        >
          {project.mockup === "iphone" ? (
            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_50%_110%,hsl(var(--primary)/0.14),transparent_60%)]">
              <IPhoneFrame
                src={project.image}
                alt={`${project.title}, ${project.categoryLabel} by Abhishek Sharma`}
                className="h-[84%] translate-y-[6%] transition-transform duration-[1.2s] ease-out group-hover:translate-y-[2%] group-hover:-rotate-2"
              />
            </div>
          ) : (
            <img
              src={project.image}
              alt={`${project.title}, ${project.categoryLabel} by Abhishek Sharma`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          <div className="absolute bottom-4 left-4 flex translate-y-2 flex-wrap gap-1.5 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            {project.technologies.slice(0, 4).map((t) => (
              <span key={t} className="rounded-full bg-black/50 px-2.5 py-1 text-[11px] text-white/90 backdrop-blur-md">
                {t}
              </span>
            ))}
          </div>
        </a>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-medium tracking-tight md:text-2xl">{project.title}</h3>
            <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">{project.description}</p>
          </div>
          <span className="shrink-0 pt-1.5 font-mono text-xs text-muted-foreground">{project.categoryLabel}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1 rounded-full border border-white/[0.08] px-3.5 py-2 text-xs text-muted-foreground transition-all sm:px-3 sm:py-1 duration-300 hover:border-primary/40 hover:text-foreground"
            >
              {link.label}
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/link:-translate-y-px group-hover/link:translate-x-px" />
            </a>
          ))}
        </div>
      </article>
    </FadeIn>
  );
}

function ProjectList({ items }: { items: Project[] }) {
  const reduced = useReducedMotion();
  const { containerProps, show, preview } = useFloatingPreview();

  return (
    <div className="relative" {...containerProps}>
      <ul className="border-t border-border">
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((project, i) => (
            <motion.li
              key={project.id}
              layout={!reduced}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: Math.min(i, 8) * 0.03, ease }}
              className="border-b border-border"
            >
              <a
                href={project.links[0]?.href}
                target="_blank"
                rel="noopener noreferrer"
                onPointerEnter={show(project.image)}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-5 transition-colors duration-300 md:grid-cols-[3rem_1.4fr_1fr_1fr_auto] md:py-6"
              >
                <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg font-medium tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2 md:text-xl">
                  {project.title}
                </span>
                <span className="hidden text-sm text-muted-foreground md:block">{project.categoryLabel}</span>
                <span className="hidden text-sm text-muted-foreground md:block">
                  {project.technologies.slice(0, 3).join(" · ")}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] text-muted-foreground transition-all duration-500 ease-out group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </a>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {preview}
    </div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const [expanded, setExpanded] = useState(false);

  const featured = projects.slice(0, FEATURED_COUNT);
  const rest = useMemo(
    () => projects.slice(FEATURED_COUNT).filter((p) => filter === "all" || p.category === filter),
    [filter]
  );
  const visible = expanded ? rest : rest.slice(0, LIST_PREVIEW);

  return (
    <section id="projects" className="section">
      <div className="container-max">
        <SectionHeader
          index="02"
          label="Selected work"
          title="Things I've"
          accent="shipped."
          aside={
            <p className="max-w-xs text-sm text-muted-foreground">
              {projects.length} projects: production apps, open-source packages, games and experiments.
            </p>
          }
        />

        <div className="grid gap-12 sm:gap-16 md:grid-cols-2 md:gap-x-10 md:gap-y-12">
          {featured.map((p, i) => (
            <FeaturedCard key={p.id} project={p} index={i} />
          ))}
        </div>

        <div className="mt-20 sm:mt-28 md:mt-40">
          <FadeIn className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <h3 className="text-2xl font-medium tracking-tight">
              More projects <span className="font-mono text-sm text-muted-foreground">({rest.length})</span>
            </h3>
            <div className="no-scrollbar isolate -mx-5 flex gap-1 overflow-x-auto px-5 sm:-mx-1 sm:px-1" role="tablist" aria-label="Filter projects">
              {projectFilters.map((f) => (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={filter === f.id}
                  onClick={() => {
                    setFilter(f.id);
                    setExpanded(false);
                  }}
                  className={cn(
                    "relative shrink-0 rounded-full px-4 py-2.5 text-[13px] sm:px-3.5 sm:py-1.5 transition-colors duration-300",
                    filter === f.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {filter === f.id && (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 -z-10 rounded-full bg-foreground"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  {f.id === "all" ? "All" : f.label}
                </button>
              ))}
            </div>
          </FadeIn>

          <ProjectList items={visible} />

          {rest.length > LIST_PREVIEW && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setExpanded((v) => !v)}
                className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-muted-foreground transition-all duration-300 hover:border-white/25 hover:text-foreground active:scale-[0.97]"
              >
                {expanded ? "Show less" : `Show all ${rest.length}`}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import {
  projects,
  projectFilters,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { AppScreenShell } from "../AppScreenShell";
import { GlassCard } from "../GlassCard";
import { OsBottomSheet } from "../OsBottomSheet";
import { screenMeta } from "@/data/osApps";
import { cn } from "@/lib/utils";

export function ProjectsApp() {
  const meta = screenMeta.projects;
  const prefersReducedMotion = useReducedMotion();
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const filterBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleFilterClick = (id: "all" | ProjectCategory) => {
    setFilter(id);
    filterBtnRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      inline: "end",
      block: "nearest",
    });
  };

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="relative h-full">
      <AppScreenShell title={meta.title} icon={meta.icon}>
        <div className="space-y-3 p-3">
          <div className="flex gap-1.5 overflow-x-auto os-scroll pb-1">
            {projectFilters.map((f) => (
              <button
                key={f.id}
                ref={(el) => {
                  filterBtnRefs.current[f.id] = el;
                }}
                type="button"
                onClick={() => handleFilterClick(f.id)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1 text-[10px] font-medium transition-colors",
                  filter === f.id
                    ? "bg-white/20 text-white"
                    : "bg-white/5 text-white/50 hover:bg-white/10"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(i, 8) * 0.04 }}
            >
              <GlassCard
                className="overflow-hidden"
                onClick={() => setSelected(project)}
              >
                <div className="flex gap-3 p-3">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-12 w-12 shrink-0 rounded-xl object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-xs font-semibold text-white">
                          {project.title}
                        </h3>
                        <p className="text-[10px] text-white/40">
                          {project.categoryLabel}
                        </p>
                      </div>
                      {project.featured && (
                        <Star
                          className="h-3 w-3 shrink-0 fill-amber-400 text-amber-400"
                          aria-hidden
                        />
                      )}
                    </div>
                    <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-white/60">
                      {project.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-white/10 px-1.5 py-0.5 text-[9px] text-white/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </AppScreenShell>

      <OsBottomSheet
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.title ?? "Project"}
      >
        {selected && (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
              <img
                src={selected.image}
                alt={selected.title}
                className="aspect-[16/10] w-full object-cover"
                draggable={false}
              />
            </div>

            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[10px] font-medium text-white/45">
                  {selected.categoryLabel}
                </p>
                <h3 className="mt-0.5 text-base font-semibold text-white">
                  {selected.title}
                </h3>
              </div>
              {selected.featured && (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[9px] font-medium text-amber-300">
                  <Star className="h-2.5 w-2.5 fill-amber-300" aria-hidden />
                  Featured
                </span>
              )}
            </div>

            <p className="text-xs leading-relaxed text-white/70">
              {selected.description}
            </p>

            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/35">
                Tech
              </p>
              <div className="flex flex-wrap gap-1.5">
                {selected.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg bg-white/10 px-2 py-1 text-[10px] text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {selected.links.length > 0 && (
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/35">
                  Links
                </p>
                <div className="flex flex-col gap-2">
                  {selected.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/10 px-3 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/15"
                    >
                      {link.type === "github" ? (
                        <Github className="h-3.5 w-3.5" />
                      ) : (
                        <ExternalLink className="h-3.5 w-3.5" />
                      )}
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </OsBottomSheet>
    </div>
  );
}

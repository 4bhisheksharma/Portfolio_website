import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import { projects, projectFilters, type ProjectCategory } from "@/data/projects";
import { AppScreenShell } from "../AppScreenShell";
import { GlassCard } from "../GlassCard";
import { screenMeta } from "@/data/osApps";
import { cn } from "@/lib/utils";

export function ProjectsApp() {
  const meta = screenMeta.projects;
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const prefersReducedMotion = useReducedMotion();
  const filterRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  useEffect(() => {
    const el = filterRef.current;
    if (!el || prefersReducedMotion) return;

    let dir = 1;
    const id = window.setInterval(() => {
      if (paused.current) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 4) return;
      const next = el.scrollLeft + dir * 0.6;
      if (next >= max) dir = -1;
      else if (next <= 0) dir = 1;
      el.scrollLeft += dir * 0.6;
    }, 24);

    return () => window.clearInterval(id);
  }, [prefersReducedMotion]);

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <AppScreenShell title={meta.title} icon={meta.icon}>
      <div className="space-y-3 p-3">
        <div
          ref={filterRef}
          onPointerDown={() => {
            paused.current = true;
          }}
          onPointerUp={() => {
            window.setTimeout(() => {
              paused.current = false;
            }, 2500);
          }}
          onWheel={() => {
            paused.current = true;
            window.setTimeout(() => {
              paused.current = false;
            }, 2500);
          }}
          className="flex gap-1.5 overflow-x-auto os-scroll pb-1"
        >
          {projectFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
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
            <GlassCard className="overflow-hidden">
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
                      <h3 className="text-xs font-semibold text-white">{project.title}</h3>
                      <p className="text-[10px] text-white/40">{project.categoryLabel}</p>
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
              <div className="flex border-t border-white/5">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-1 py-2 text-[10px] font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.type === "github" ? (
                      <Github className="h-3 w-3" />
                    ) : (
                      <ExternalLink className="h-3 w-3" />
                    )}
                    {link.label}
                  </a>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </AppScreenShell>
  );
}

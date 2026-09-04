import { useRef, useState } from "react";
import { ExternalLink, Github, Star, Share2, Check, Search, X } from "lucide-react";
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
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const filterBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleFilterClick = (id: "all" | ProjectCategory, e?: React.MouseEvent<HTMLButtonElement>) => {
    setFilter(id);
    const btn = e?.currentTarget ?? filterBtnRefs.current[id];
    btn?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const handleShare = (project: Project) => {
    const primaryLink = project.links[0]?.href ?? window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(primaryLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const filtered = projects.filter((project) => {
    const matchesCategory = filter === "all" || project.category === filter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.technologies.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative h-full">
      <AppScreenShell title={meta.title} icon={meta.icon}>
        <div className="space-y-2.5 p-3">
          {/* Functional Project Search Bar */}
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-white/40" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects & tech..."
              className="w-full rounded-full border border-white/10 bg-white/[0.06] py-1.5 pl-8 pr-8 text-[11px] text-white placeholder:text-white/40 focus:border-cyan-400/50 focus:bg-white/[0.09] focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-white/70 hover:text-white"
                aria-label="Clear search"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            )}
          </div>

          {/* Filter Pills with Center Auto-Scroll */}
          <div className="flex gap-1.5 overflow-x-auto os-scroll pb-1">
            {projectFilters.map((f) => (
              <button
                key={f.id}
                ref={(el) => {
                  filterBtnRefs.current[f.id] = el;
                }}
                type="button"
                onClick={(e) => handleFilterClick(f.id, e)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1 text-[10.5px] font-medium transition-all cursor-pointer",
                  filter === f.id
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "bg-white/[0.08] text-white/60 hover:bg-white/[0.14] hover:text-white"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Projects Results Count or Empty State */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Search className="h-6 w-6 text-white/20 mb-2" />
              <p className="text-xs font-semibold text-white/70">No projects found</p>
              <p className="text-[10px] text-white/40 mt-0.5">
                Try searching with different keywords or clearing filters
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((project) => (
                <GlassCard
                  key={project.id}
                  solid
                  className="group overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.04] transition-all hover:bg-white/[0.07] active:scale-[0.98] cursor-pointer"
                  onClick={() => setSelected(project)}
                >
                  <div className="flex items-center gap-3 p-2.5">
                    {/* Constrained Fixed-Dimension Thumbnail */}
                    <div className="relative h-[62px] w-[62px] min-w-[62px] shrink-0 overflow-hidden rounded-[13px] border border-white/12 bg-black/50 shadow-inner">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-1.5">
                        <h3 className="truncate text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[8.5px] font-medium text-amber-300">
                            <Star className="h-2.5 w-2.5 fill-amber-300" aria-hidden />
                            Featured
                          </span>
                        )}
                      </div>

                      <p className="text-[9.5px] font-medium text-cyan-400/70">
                        {project.categoryLabel}
                      </p>

                      <p className="mt-0.5 line-clamp-1 text-[10px] text-white/55">
                        {project.description}
                      </p>

                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-md bg-white/[0.08] px-1.5 py-0.5 text-[8.5px] font-medium text-white/70"
                          >
                            {t}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="rounded-md bg-white/[0.04] px-1.5 py-0.5 text-[8.5px] text-white/40">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </AppScreenShell>

      {/* Refactored Modern Project Detail Bottom Sheet */}
      <OsBottomSheet
        open={Boolean(selected)}
        onClose={() => {
          setSelected(null);
          setCopied(false);
        }}
        title={selected?.title ?? "Project"}
        subtitle={selected?.categoryLabel ?? "Featured Project"}
      >
        {selected && (
          <div className="space-y-4">
            {/* Hero Media Card */}
            <div className="relative aspect-[16/10] max-h-[180px] w-full overflow-hidden rounded-[18px] border border-white/15 bg-[#09090d] shadow-md flex items-center justify-center">
              <img
                src={selected.image}
                alt={selected.title}
                className="h-full w-full object-cover object-center"
                decoding="async"
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[9.5px] font-medium text-white/90 backdrop-blur-md">
                  {selected.categoryLabel}
                </span>

                {selected.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/30 px-2.5 py-1 text-[9.5px] font-semibold text-amber-200 backdrop-blur-md ring-1 ring-amber-400/40">
                    <Star className="h-3 w-3 fill-amber-300" aria-hidden />
                    Featured Project
                  </span>
                )}
              </div>
            </div>

            {/* Title & Headline */}
            <div>
              <h3 className="text-base font-bold tracking-tight text-white">
                {selected.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-white/75">
                {selected.description}
              </p>
            </div>

            {/* Technologies */}
            <div className="rounded-[18px] border border-white/10 bg-white/[0.04] p-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-cyan-400/80">
                Technologies & Architecture
              </p>
              <div className="flex flex-wrap gap-1.5">
                {selected.technologies.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.07] px-2.5 py-1 text-[10px] font-medium text-white/90 shadow-sm"
                  >
                    <span className="h-1 w-1 rounded-full bg-cyan-400" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            {selected.links.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="flex flex-col gap-2">
                  {selected.links.map((link, idx) => {
                    const isPrimary = idx === 0 && link.type !== "github";
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold transition-all active:scale-[0.98]",
                          isPrimary
                            ? "bg-white text-black shadow-md hover:bg-white/90"
                            : "border border-white/15 bg-white/[0.08] text-white hover:bg-white/[0.14]"
                        )}
                      >
                        {link.type === "github" ? (
                          <Github className="h-4 w-4" />
                        ) : (
                          <ExternalLink className="h-4 w-4" />
                        )}
                        {link.label}
                      </a>
                    );
                  })}

                  {/* Quick Share / Copy Action */}
                  <button
                    type="button"
                    onClick={() => handleShare(selected)}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-transparent py-2.5 text-[11px] font-medium text-white/60 hover:bg-white/[0.05] hover:text-white transition-all active:scale-[0.98]"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Link copied to clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="h-3.5 w-3.5 text-white/50" />
                        <span>Share project link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </OsBottomSheet>
    </div>
  );
}

import { ExternalLink, Github, Star, GitFork, BookMarked } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { AppScreenShell } from "../AppScreenShell";
import { GlassCard } from "../GlassCard";
import { screenMeta, LINKS } from "@/data/osApps";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";

const highlights = projects
  .filter((p) => p.links.some((l) => l.type === "github"))
  .slice(0, 4);

export function GithubApp() {
  const meta = screenMeta.github;
  const prefersReducedMotion = useReducedMotion();

  return (
    <AppScreenShell title={meta.title} icon={meta.icon}>
      <div className="space-y-3 p-3">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1a1a1c] ring-1 ring-white/10">
                <Github className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-white">4bhisheksharma</h2>
                <p className="text-[11px] text-white/55">{siteConfig.name}</p>
                <p className="mt-0.5 text-[10px] text-white/40">
                  Flutter · Dart · Open source packages
                </p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-white/5 px-2 py-2 text-center">
                <BookMarked className="mx-auto h-3.5 w-3.5 text-white/50" />
                <p className="mt-1 text-xs font-semibold text-white">15+</p>
                <p className="text-[9px] text-white/40">Repos</p>
              </div>
              <div className="rounded-xl bg-white/5 px-2 py-2 text-center">
                <Star className="mx-auto h-3.5 w-3.5 text-white/50" />
                <p className="mt-1 text-xs font-semibold text-white">OSS</p>
                <p className="text-[9px] text-white/40">Packages</p>
              </div>
              <div className="rounded-xl bg-white/5 px-2 py-2 text-center">
                <GitFork className="mx-auto h-3.5 w-3.5 text-white/50" />
                <p className="mt-1 text-xs font-semibold text-white">pub.dev</p>
                <p className="text-[9px] text-white/40">Publisher</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/35">
          Highlighted repos
        </p>
        {highlights.map((p) => {
          const githubLink = p.links.find((l) => l.type === "github");
          return (
            <GlassCard key={p.id} className="p-3">
              <div className="flex items-start gap-2">
                <Github className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/50" />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white">{p.title}</p>
                  <p className="mt-0.5 line-clamp-2 text-[10px] text-white/50">
                    {p.description}
                  </p>
                  {githubLink && (
                    <a
                      href={githubLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-sky-400 hover:underline"
                    >
                      View repo <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  )}
                </div>
              </div>
            </GlassCard>
          );
        })}

        <a
          href={LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-xs font-semibold text-black transition-transform active:scale-[0.98]"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Open GitHub in new tab
        </a>
      </div>
    </AppScreenShell>
  );
}

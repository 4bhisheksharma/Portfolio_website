import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Clock, Circle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { experienceStats, companies } from "@/data/experience";
import { AppScreenShell } from "../AppScreenShell";
import { GlassCard } from "../GlassCard";
import { screenMeta } from "@/data/osApps";
import { Counter } from "@/components/common/Counter";

export function AboutApp() {
  const meta = screenMeta.about;
  const prefersReducedMotion = useReducedMotion();
  const currentRole = companies[0]?.roles.find((r) => r.isCurrent);

  return (
    <AppScreenShell title={meta.title} icon={meta.icon}>
      <div className="space-y-3 p-3">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard className="p-4">
            <div className="flex gap-3">
              <img
                src={siteConfig.profileImage}
                alt={siteConfig.name}
                className="h-14 w-14 shrink-0 rounded-2xl object-cover ring-2 ring-white/10"
              />
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-white">{siteConfig.name}</h2>
                <p className="text-xs text-white/70">{siteConfig.title}</p>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-white/50">
                  <MapPin className="h-2.5 w-2.5 shrink-0" />
                  <span className="truncate">{siteConfig.location}</span>
                </div>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-white/50">
                  <Clock className="h-2.5 w-2.5 shrink-0" />
                  <span>2+ yrs exp</span>
                </div>
                <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                  <Circle className="h-1.5 w-1.5 fill-emerald-400" />
                  Open to Work
                </span>
              </div>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-white/70">
              {siteConfig.about.description}
            </p>
          </GlassCard>
        </motion.div>

        <div className="grid grid-cols-3 gap-2">
          {experienceStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <GlassCard className="p-3 text-center">
                <p className="text-lg font-semibold text-white">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[10px] text-white/50">{stat.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {currentRole && (
          <GlassCard className="p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
              Experience
            </p>
            <div className="mt-2 flex gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/20 text-xs font-bold text-violet-300">
                DP
              </div>
              <div>
                <p className="text-xs font-medium text-white">{currentRole.title}</p>
                <p className="text-[10px] text-white/50">
                  {companies[0]?.company} · {currentRole.period}
                </p>
              </div>
            </div>
          </GlassCard>
        )}

        <div className="grid grid-cols-3 gap-2">
          {siteConfig.about.images.map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              className="aspect-square rounded-xl object-cover ring-1 ring-white/10"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </AppScreenShell>
  );
}

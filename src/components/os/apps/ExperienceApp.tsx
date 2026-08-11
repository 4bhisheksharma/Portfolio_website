import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { companies } from "@/data/experience";
import { AppScreenShell } from "../AppScreenShell";
import { GlassCard } from "../GlassCard";
import { screenMeta } from "@/data/osApps";

export function ExperienceApp() {
  const meta = screenMeta.experience;
  const prefersReducedMotion = useReducedMotion();

  return (
    <AppScreenShell title={meta.title} icon={meta.icon}>
      <div className="space-y-3 p-3">
        {companies.map((company, ci) => (
          <motion.div
            key={company.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.08 }}
          >
            <GlassCard className="p-3">
              <div className="flex items-start gap-3">
                <img
                  src={company.logo}
                  alt={company.company}
                  className="h-10 w-10 shrink-0 rounded-xl object-contain bg-white/10 p-1"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xs font-semibold text-white">{company.company}</h3>
                      <p className="text-[10px] text-white/50">
                        {company.employmentType} · {company.totalDuration}
                      </p>
                      <p className="text-[10px] text-white/40">
                        {company.location} · {company.workMode}
                      </p>
                    </div>
                    {company.companyUrl && (
                      <a
                        href={company.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-white/40 hover:text-white"
                        aria-label={`Visit ${company.company}`}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-3 space-y-3 border-t border-white/5 pt-3">
                {company.roles.map((role) => (
                  <div key={role.id} className="relative pl-3 border-l-2 border-rose-500/30">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[11px] font-medium text-white">{role.title}</h4>
                      {role.isCurrent && (
                        <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[8px] font-medium text-emerald-400">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-white/40">
                      {role.period} · {role.duration}
                    </p>
                    {role.description && (
                      <p className="mt-1 text-[10px] leading-relaxed text-white/60">
                        {role.description}
                      </p>
                    )}
                    {role.achievements && role.achievements.length > 0 && (
                      <ul className="mt-1.5 space-y-0.5">
                        {role.achievements.map((a) => (
                          <li key={a} className="text-[10px] text-white/50 before:content-['•_']">
                            {a}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-2 flex flex-wrap gap-1">
                {company.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-white/10 px-1.5 py-0.5 text-[9px] text-white/60"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </AppScreenShell>
  );
}

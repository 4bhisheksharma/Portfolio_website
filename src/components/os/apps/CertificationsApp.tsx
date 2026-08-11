import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { certifications } from "@/data/certifications";
import { AppScreenShell } from "../AppScreenShell";
import { GlassCard } from "../GlassCard";
import { screenMeta } from "@/data/osApps";

export function CertificationsApp() {
  const meta = screenMeta.certifications;
  const prefersReducedMotion = useReducedMotion();

  return (
    <AppScreenShell title={meta.title} icon={meta.icon}>
      <div className="space-y-3 p-3">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <GlassCard className="overflow-hidden">
              <div className="flex gap-3 p-3">
                <img
                  src={cert.image}
                  alt={cert.imageAlt}
                  className="h-14 w-14 shrink-0 rounded-xl object-cover"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs font-semibold text-white">{cert.title}</h3>
                    {cert.comingSoon && (
                      <span className="shrink-0 rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[8px] text-amber-400">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-3 text-[10px] leading-relaxed text-white/60">
                    {cert.description}
                  </p>
                </div>
              </div>
              {cert.link && !cert.comingSoon && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 border-t border-white/5 py-2 text-[10px] font-medium text-white/70 hover:bg-white/5 hover:text-white"
                >
                  <ExternalLink className="h-3 w-3" />
                  View Credential
                </a>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </AppScreenShell>
  );
}

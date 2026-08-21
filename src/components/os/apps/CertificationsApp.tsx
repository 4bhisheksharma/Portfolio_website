import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { certifications, type Certification } from "@/data/certifications";
import { AppScreenShell } from "../AppScreenShell";
import { GlassCard } from "../GlassCard";
import { OsBottomSheet } from "../OsBottomSheet";
import { screenMeta } from "@/data/osApps";

export function CertificationsApp() {
  const meta = screenMeta.certifications;
  const [selected, setSelected] = useState<Certification | null>(null);

  return (
    <div className="relative h-full">
      <AppScreenShell title={meta.title} icon={meta.icon}>
        <div className="space-y-2.5 p-3">
          {certifications.map((cert) => (
            <GlassCard
              key={cert.id}
              solid
              className="overflow-hidden [content-visibility:auto] [contain-intrinsic-size:auto_92px]"
              onClick={() => setSelected(cert)}
            >
              <div className="flex gap-3 p-3">
                <img
                  src={cert.image}
                  alt=""
                  className="h-14 w-14 shrink-0 rounded-xl object-cover"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
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
            </GlassCard>
          ))}
        </div>
      </AppScreenShell>

      <OsBottomSheet
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.title ?? "Honor"}
      >
        {selected && (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
              <img
                src={selected.image}
                alt={selected.imageAlt}
                className="aspect-[4/3] w-full object-cover"
                decoding="async"
                draggable={false}
              />
            </div>

            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold text-white">{selected.title}</h3>
                {selected.comingSoon && (
                  <span className="shrink-0 rounded-full bg-amber-500/20 px-2 py-0.5 text-[9px] font-medium text-amber-400">
                    Coming soon
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-white/70">
                {selected.description}
              </p>
            </div>

            {selected.link && !selected.comingSoon && (
              <a
                href={selected.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-white/10 px-3 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/15"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View Credential
              </a>
            )}
          </div>
        )}
      </OsBottomSheet>
    </div>
  );
}

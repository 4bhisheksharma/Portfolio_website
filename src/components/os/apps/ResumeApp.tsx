import { ExternalLink, FileText, Download } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { AppScreenShell } from "../AppScreenShell";
import { GlassCard } from "../GlassCard";
import { screenMeta, LINKS } from "@/data/osApps";
import { siteConfig } from "@/data/site";

export function ResumeApp() {
  const meta = screenMeta.resume;
  const prefersReducedMotion = useReducedMotion();

  return (
    <AppScreenShell title={meta.title} icon={meta.icon}>
      <div className="space-y-3 p-3">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard className="p-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1a1a1c] ring-1 ring-white/10">
              <FileText className="h-7 w-7 text-white/85" strokeWidth={1.5} />
            </div>
            <h2 className="mt-3 text-sm font-semibold text-white">{siteConfig.name}</h2>
            <p className="text-[11px] text-white/55">{siteConfig.title}</p>
            <p className="mt-2 text-[10px] leading-relaxed text-white/45">
              Curriculum Vitae — Flutter mobile development, projects, and certifications.
            </p>
          </GlassCard>
        </motion.div>

        <GlassCard className="overflow-hidden">
          <div className="border-b border-white/5 bg-[#121214] px-3 py-2">
            <p className="text-[10px] font-medium text-white/50">Preview</p>
          </div>
          <div className="relative h-[280px] bg-[#0d0d0f]">
            <iframe
              title="Resume preview"
              src={`${LINKS.resume}#toolbar=0&navpanes=0`}
              className="h-full w-full border-0"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0d0d0f] to-transparent" />
          </div>
        </GlassCard>

        <a
          href={LINKS.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-xs font-semibold text-black transition-transform active:scale-[0.98]"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Open in new tab
        </a>
        <a
          href={LINKS.resume}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-xs font-medium text-white ring-1 ring-white/10 transition-colors hover:bg-white/15"
        >
          <Download className="h-3.5 w-3.5" />
          Download PDF
        </a>
      </div>
    </AppScreenShell>
  );
}

import { motion, useReducedMotion } from "framer-motion";
import { Terminal, FileText, Moon, Info } from "lucide-react";
import { siteConfig } from "@/data/site";
import { usePhoneOS } from "@/context/PhoneOSContext";
import { AppScreenShell } from "../AppScreenShell";
import { GlassCard } from "../GlassCard";
import { screenMeta } from "@/data/osApps";

export function SettingsApp() {
  const meta = screenMeta.settings;
  const { handleAction } = usePhoneOS();
  const prefersReducedMotion = useReducedMotion();

  const items = [
    {
      icon: Terminal,
      label: "Developer Zone",
      desc: "Open interactive terminal",
      action: () => handleAction({ type: "modal", id: "terminal" }),
    },
    {
      icon: FileText,
      label: "Download Resume",
      desc: "PDF version of CV",
      action: () => handleAction({ type: "screen", id: "resume" }),
    },
    {
      icon: Moon,
      label: "Dark Mode",
      desc: "Always on — it's the vibe",
      action: undefined,
    },
    {
      icon: Info,
      label: "About Portfolio",
      desc: siteConfig.version,
      action: undefined,
    },
  ];

  return (
    <AppScreenShell title={meta.title} icon={meta.icon}>
      <div className="space-y-3 p-3">
        <GlassCard className="p-4 text-center">
          <img
            src={siteConfig.logo}
            alt=""
            className="mx-auto h-12 w-12 rounded-2xl"
          />
          <h2 className="mt-2 text-sm font-semibold text-white">{siteConfig.name}</h2>
          <p className="text-[10px] text-white/50">{siteConfig.copyright}</p>
        </GlassCard>

        {items.map((item, i) => {
          const Icon = item.icon;
          const content = (
            <GlassCard className="flex items-center gap-3 p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Icon className="h-4 w-4 text-white/70" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-white">{item.label}</p>
                <p className="text-[10px] text-white/40">{item.desc}</p>
              </div>
            </GlassCard>
          );

          return (
            <motion.div
              key={item.label}
              initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {item.action ? (
                <button type="button" onClick={item.action} className="w-full text-left">
                  {content}
                </button>
              ) : (
                content
              )}
            </motion.div>
          );
        })}
      </div>
    </AppScreenShell>
  );
}

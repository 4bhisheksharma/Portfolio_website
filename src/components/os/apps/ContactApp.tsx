import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/data/site";
import { footerSocials } from "@/data/socials";
import { AppScreenShell } from "../AppScreenShell";
import { GlassCard } from "../GlassCard";
import { screenMeta } from "@/data/osApps";

export function ContactApp() {
  const meta = screenMeta.contact;
  const prefersReducedMotion = useReducedMotion();

  const contacts = [
    {
      key: "email",
      icon: Mail,
      label: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      key: "phone",
      icon: Phone,
      label: "Phone",
      value: siteConfig.phone,
      href: siteConfig.phoneHref,
    },
    {
      key: "location",
      icon: MapPin,
      label: "Location",
      value: siteConfig.location,
      href: undefined,
    },
  ];

  return (
    <AppScreenShell title={meta.title} icon={meta.icon}>
      <div className="space-y-3 p-3 select-none">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <img
            src={siteConfig.profileImage}
            alt=""
            draggable={false}
            className="mx-auto h-16 w-16 rounded-2xl object-cover ring-2 ring-white/15 pointer-events-none"
          />
          <h2 className="mt-2 text-sm font-semibold text-white">Let&apos;s connect!</h2>
          <p className="text-[10px] text-white/50">
            Available for Flutter projects & collaborations
          </p>
        </motion.div>

        {contacts.map((c, i) => {
          const Icon = c.icon;
          const inner = (
            <GlassCard className="flex items-center gap-3 p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1a1a1c] ring-1 ring-white/10">
                <Icon className="h-4 w-4 text-white/80" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-white/40">{c.label}</p>
                <p className="truncate text-xs font-medium text-white">{c.value}</p>
              </div>
            </GlassCard>
          );

          return (
            <motion.div
              key={c.key}
              initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              {c.href ? (
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {inner}
                </a>
              ) : (
                inner
              )}
            </motion.div>
          );
        })}

        <p className="pt-1 text-center text-[10px] font-semibold uppercase tracking-wider text-white/30">
          Social Links
        </p>
        <div className="grid grid-cols-3 gap-2">
          {footerSocials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 rounded-xl bg-[#1a1a1c] p-3 ring-1 ring-white/10 transition-colors hover:bg-white/10"
              >
                {social.isImage && social.imageSrc ? (
                  <img src={social.imageSrc} alt="" className="h-5 w-5" draggable={false} />
                ) : (
                  <Icon className="h-5 w-5 text-white/80" aria-hidden />
                )}
                <span className="text-[9px] text-white/60">{social.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </AppScreenShell>
  );
}

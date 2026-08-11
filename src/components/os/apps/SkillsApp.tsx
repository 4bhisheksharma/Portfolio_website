import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { AppScreenShell } from "../AppScreenShell";
import { GlassCard } from "../GlassCard";
import { screenMeta } from "@/data/osApps";
import { cn } from "@/lib/utils";

export function SkillsApp() {
  const meta = screenMeta.skills;
  const [activeCategory, setActiveCategory] = useState(skillCategories[0]?.id ?? "");
  const prefersReducedMotion = useReducedMotion();
  const filterBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const category = skillCategories.find((c) => c.id === activeCategory);

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    filterBtnRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      inline: "end",
      block: "nearest",
    });
  };

  return (
    <AppScreenShell title={meta.title} icon={meta.icon}>
      <div className="p-3 space-y-3">
        <div className="flex gap-1.5 overflow-x-auto os-scroll pb-1">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              ref={(el) => {
                filterBtnRefs.current[cat.id] = el;
              }}
              type="button"
              onClick={() => handleCategoryClick(cat.id)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1 text-[10px] font-medium transition-colors",
                activeCategory === cat.id
                  ? "bg-white/20 text-white"
                  : "bg-white/5 text-white/50 hover:bg-white/10"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {category?.skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
              >
                <GlassCard className="flex items-center gap-2.5 p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Icon className="h-4 w-4 text-white/80" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-medium text-white">{skill.name}</p>
                    {skill.info && (
                      <p className="line-clamp-1 text-[9px] text-white/40">{skill.info}</p>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppScreenShell>
  );
}

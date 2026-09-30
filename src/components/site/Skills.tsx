import { skillCategories, type Skill } from "@/data/skills";
import { FadeIn } from "@/components/motion/Text";
import { SectionHeader } from "./SectionHeader";

const allSkills = skillCategories.flatMap((c) => c.skills);

function MarqueeRow({ items, reverse = false }: { items: Skill[]; reverse?: boolean }) {
  return (
    <div className="mask-fade-x group flex overflow-hidden">
      <div
        className="animate-marquee flex shrink-0 gap-3 pr-3 group-hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {[...items, ...items].map((skill, i) => (
          <span
            key={`${skill.name}-${i}`}
            aria-hidden={i >= items.length}
            className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-sm text-muted-foreground transition-colors duration-300 hover:border-primary/30 hover:text-foreground"
          >
            <skill.icon className="h-4 w-4" aria-hidden />
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const half = Math.ceil(allSkills.length / 2);
  return (
    <section id="skills" className="section overflow-hidden">
      <div className="container-max">
        <SectionHeader index="04" label="Stack" title="Tools I" accent="reach for." />
      </div>

      <FadeIn className="space-y-3">
        <MarqueeRow items={allSkills.slice(0, half)} />
        <MarqueeRow items={allSkills.slice(half)} reverse />
      </FadeIn>

      <div className="container-max mt-20">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => (
            <div key={cat.id} className="group bg-background p-7 transition-colors duration-500 hover:bg-card">
              <FadeIn delay={(i % 3) * 0.06}>
                <div className="mb-6 flex items-baseline justify-between">
                  <h3 className="text-base font-medium">{cat.label}</h3>
                  <span className="font-mono text-xs text-muted-foreground">{String(cat.skills.length).padStart(2, "0")}</span>
                </div>
                <ul className="space-y-2.5">
                  {cat.skills.map((skill) => (
                    <li key={skill.name} title={skill.info} className="group/item flex items-center gap-3 text-sm text-muted-foreground">
                      <skill.icon
                        className="h-4 w-4 transition-all duration-300 group-hover/item:scale-110 group-hover/item:text-primary"
                        aria-hidden
                      />
                      <span className="transition-all duration-300 group-hover/item:translate-x-0.5 group-hover/item:text-foreground">
                        {skill.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

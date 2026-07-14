import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="container-max">
        <Reveal>
          <SectionHeading title="Skills" />
        </Reveal>

        <Reveal delay={0.05}>
          <Tabs defaultValue={skillCategories[0].id} className="w-full">
            <TabsList className="w-full justify-center mb-8 bg-transparent p-0 gap-2 flex-wrap h-auto">
              {skillCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="rounded px-3 sm:px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted text-muted-foreground"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {skillCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                  {category.skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <span
                        key={skill.name}
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-sm rounded border border-border bg-card text-foreground hover:border-primary/50 transition-colors"
                        title={skill.info}
                      >
                        <Icon className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                        {skill.name}
                      </span>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </div>
    </section>
  );
}

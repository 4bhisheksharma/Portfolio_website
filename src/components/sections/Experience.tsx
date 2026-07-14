import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Diamond } from "lucide-react";
import { experienceStats, companies, type ExperienceRole } from "@/data/experience";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Counter } from "@/components/common/Counter";
import { cn } from "@/lib/utils";

export function Experience() {
  const [expandedRole, setExpandedRole] = useState<string | null>(
    companies[0]?.roles[0]?.id ?? null
  );

  return (
    <section id="experience" className="section-padding">
      <div className="container-max">
        <Reveal>
          <SectionHeading title="Experience" />
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12 md:mb-14">
            {experienceStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border bg-card p-4 sm:p-5 text-center"
              >
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="text-2xl sm:text-3xl font-semibold text-primary block mb-1"
                />
                <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="max-w-2xl mx-auto space-y-10">
          {companies.map((company, companyIndex) => (
            <Reveal key={company.id} delay={companyIndex * 0.06}>
              <article>
                {/* Company header */}
                <div className="flex gap-3 sm:gap-4 mb-4">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-lg border border-border bg-white overflow-hidden p-1">
                    <img
                      src={company.logo}
                      alt={`${company.company} logo`}
                      className="h-full w-full object-contain"
                      loading="lazy"
                      width={56}
                      height={56}
                    />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    {company.companyUrl ? (
                      <a
                        href={company.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {company.company}
                      </a>
                    ) : (
                      <h3 className="text-base sm:text-lg font-semibold">{company.company}</h3>
                    )}
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {company.employmentType} · {company.totalDuration}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {company.location} · {company.workMode}
                    </p>
                  </div>
                </div>

                {/* Nested roles timeline */}
                <div className="ml-5 sm:ml-6 pl-6 sm:pl-8 border-l border-border space-y-0">
                  {company.roles.map((role, roleIndex) => (
                    <RoleItem
                      key={role.id}
                      role={role}
                      isLast={roleIndex === company.roles.length - 1}
                      expanded={expandedRole === role.id}
                      onToggle={() =>
                        setExpandedRole((prev) => (prev === role.id ? null : role.id))
                      }
                    />
                  ))}
                </div>

                {/* Skills row */}
                {company.skills.length > 0 && (
                  <div className="mt-5 ml-5 sm:ml-6 pl-6 sm:pl-8 flex items-start gap-2 text-sm">
                    <Diamond
                      className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <p className="text-foreground/90">
                      <span className="font-medium">{company.skills.slice(0, 2).join(", ")}</span>
                      {company.skills.length > 2 && (
                        <span className="text-muted-foreground">
                          {" "}
                          and +{company.skills.length - 2} skill
                          {company.skills.length - 2 > 1 ? "s" : ""}
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoleItem({
  role,
  isLast,
  expanded,
  onToggle,
}: {
  role: ExperienceRole;
  isLast: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  const hasDetails =
    Boolean(role.description) || (role.achievements && role.achievements.length > 0);

  return (
    <div className={cn("relative", !isLast && "pb-6")}>
      {/* Timeline node */}
      <span
        className={cn(
          "absolute -left-[1.625rem] sm:-left-[2.125rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 bg-background",
          role.isCurrent ? "border-primary bg-primary/30" : "border-muted-foreground/50"
        )}
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={hasDetails ? onToggle : undefined}
        className={cn(
          "w-full text-left rounded-md -mx-2 px-2 py-1 transition-colors",
          hasDetails && "hover:bg-muted/30 cursor-pointer",
          !hasDetails && "cursor-default"
        )}
        aria-expanded={hasDetails ? expanded : undefined}
      >
        <h4 className="text-base font-semibold text-foreground leading-snug">{role.title}</h4>
        <p className="text-sm text-muted-foreground mt-0.5">
          {role.period} · {role.duration}
        </p>
      </button>

      <AnimatePresence initial={false}>
        {expanded && hasDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-1 space-y-3">
              {role.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">{role.description}</p>
              )}
              {role.achievements && role.achievements.length > 0 && (
                <ul className="space-y-1.5">
                  {role.achievements.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-foreground/80 pl-3 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:rounded-full before:bg-primary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {role.technologies && role.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {role.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded border border-border text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

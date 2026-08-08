import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Diamond } from "lucide-react";
import { experienceStats, companies, type ExperienceRole } from "@/data/experience";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Counter } from "@/components/common/Counter";
import { cn } from "@/lib/utils";

function findCurrentRoleId(): string | null {
  for (const company of companies) {
    const current = company.roles.find((role) => role.isCurrent);
    if (current) return current.id;
  }
  return companies[0]?.roles[0]?.id ?? null;
}

export function Experience() {
  const [expandedRole, setExpandedRole] = useState<string | null>(findCurrentRoleId);

  const handleToggle = (roleId: string) => {
    setExpandedRole((prev) => (prev === roleId ? null : roleId));
  };

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

        <div className="max-w-2xl mx-auto">
          {companies.map((company, companyIndex) => (
            <Reveal key={company.id} delay={companyIndex * 0.06}>
              <article>
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

                <div
                  className="space-y-2"
                  role="region"
                  aria-label={`${company.company} roles`}
                >
                  {company.roles.map((role) => (
                    <RoleAccordionItem
                      key={role.id}
                      role={role}
                      expanded={expandedRole === role.id}
                      onToggle={() => handleToggle(role.id)}
                    />
                  ))}
                </div>

                {company.skills.length > 0 && (
                  <div className="mt-5 flex items-start gap-2 text-sm">
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

function RoleAccordionItem({
  role,
  expanded,
  onToggle,
}: {
  role: ExperienceRole;
  expanded: boolean;
  onToggle: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const hasDetails =
    Boolean(role.description) || (role.achievements && role.achievements.length > 0);

  return (
    <div
      className={cn(
        "rounded-lg border transition-colors overflow-hidden",
        expanded
          ? "border-primary/40 bg-card"
          : "border-border bg-card/50 hover:border-border/80"
      )}
    >
      <button
        type="button"
        id={`role-trigger-${role.id}`}
        aria-expanded={hasDetails ? expanded : false}
        aria-controls={hasDetails ? `role-panel-${role.id}` : undefined}
        onClick={hasDetails ? onToggle : undefined}
        disabled={!hasDetails}
        className={cn(
          "w-full flex items-start gap-3 text-left px-4 py-4 sm:px-5 sm:py-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
          hasDetails ? "cursor-pointer" : "cursor-default"
        )}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-base font-semibold text-foreground leading-snug">{role.title}</h4>
            {role.isCurrent && (
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/15 text-primary font-medium">
                Current
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {role.period} · {role.duration}
          </p>
        </div>
        {hasDetails && (
          <ChevronDown
            className={cn(
              "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 mt-0.5",
              expanded && "rotate-180 text-primary"
            )}
            aria-hidden="true"
          />
        )}
      </button>

      <AnimatePresence initial={false}>
        {expanded && hasDetails && (
          <motion.div
            id={`role-panel-${role.id}`}
            role="region"
            aria-labelledby={`role-trigger-${role.id}`}
            initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 space-y-3 border-t border-border/50">
              {role.description && (
                <p className="text-sm text-muted-foreground leading-relaxed pt-3">
                  {role.description}
                </p>
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

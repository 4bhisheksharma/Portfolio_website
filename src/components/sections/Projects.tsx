import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react";
import {
  projects,
  projectFilters,
  INITIAL_PROJECT_COUNT,
  type ProjectCategory,
} from "@/data/projects";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { ImageLightbox } from "@/components/common/ImageLightbox";

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<"all" | ProjectCategory>("all");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = projects.filter(
    (p) => activeFilter === "all" || p.category === activeFilter
  );

  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_PROJECT_COUNT);

  return (
    <section id="projects" className="section-padding">
      <div className="container-max">
        <Reveal>
          <SectionHeading title="Projects" />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {projectFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => {
                  setActiveFilter(filter.id);
                  setShowAll(false);
                }}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  activeFilter === filter.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="group flex flex-col rounded-lg border border-border bg-card overflow-hidden hover:border-primary/40 transition-colors"
              >
                <div className="h-40 sm:h-44 overflow-hidden bg-muted">
                  <ImageLightbox
                    src={project.image}
                    alt={project.title}
                    imgClassName="transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <p className="text-xs text-primary mb-2">{project.categoryLabel}</p>
                  <h3 className="text-lg font-medium mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                      >
                        {link.type === "github" ? (
                          <Github className="h-3 w-3" aria-hidden="true" />
                        ) : (
                          <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        )}
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length > INITIAL_PROJECT_COUNT && (
          <div className="flex justify-center mt-10">
            <Button
              variant="outline"
              onClick={() => {
                if (showAll) {
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }
                setShowAll(!showAll);
              }}
            >
              {showAll ? (
                <>
                  <ChevronUp className="h-4 w-4" aria-hidden="true" />
                  View Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  View More
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

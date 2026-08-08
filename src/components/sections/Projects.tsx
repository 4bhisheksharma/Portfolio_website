import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  projects,
  projectFilters,
  INITIAL_PROJECT_COUNT,
  type ProjectCategory,
  type Project,
} from "@/data/projects";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { ScrollDepthCarousel } from "@/components/common/ScrollDepthCarousel";
import { ProjectDepthCard } from "@/components/common/PortfolioDepthCards";
import { useDepthCarouselLayout } from "@/hooks/useCardSwapSize";

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<"all" | ProjectCategory>("all");
  const [showAll, setShowAll] = useState(false);
  const { width, height, spread, depth, scrollStepVh, visibleCards, isMobile } =
    useDepthCarouselLayout();

  const filteredProjects = projects.filter(
    (p) => activeFilter === "all" || p.category === activeFilter
  );

  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_PROJECT_COUNT);

  const hasMore = filteredProjects.length > INITIAL_PROJECT_COUNT;

  const toggleShowAll = () => {
    if (showAll) {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }
    setShowAll(!showAll);
  };

  const viewMoreFooter =
    hasMore && !showAll ? (
      <Button className="min-h-[44px] shadow-lg" onClick={() => setShowAll(true)}>
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
        View More ({filteredProjects.length - INITIAL_PROJECT_COUNT} more)
      </Button>
    ) : showAll && hasMore ? (
      <Button
        variant="outline"
        className="min-h-[44px] shadow-lg bg-background/90 backdrop-blur-sm"
        onClick={toggleShowAll}
      >
        <ChevronUp className="h-4 w-4" aria-hidden="true" />
        View Less
      </Button>
    ) : undefined;

  return (
    <section id="projects" className="section-padding">
      <div className="container-max">
        <Reveal>
          <SectionHeading title="Projects" />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8">
            {projectFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => {
                  setActiveFilter(filter.id);
                  setShowAll(false);
                }}
                className={`px-4 py-2.5 text-sm rounded-full transition-colors min-h-[44px] ${
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

        <ScrollDepthCarousel<Project>
          key={`${activeFilter}-${showAll}-${visibleProjects.length}`}
          items={visibleProjects}
          renderItem={(project) => <ProjectDepthCard project={project} />}
          cardWidth={width}
          cardHeight={height}
          depth={depth}
          spread={spread}
          tilt={0}
          tiltDirection="right"
          perspective={1550}
          visibleCards={visibleCards}
          falloff={0.17}
          blur={6}
          radius={12}
          scrollStepVh={scrollStepVh}
          isMobile={isMobile}
          hint="Scroll — one project at a time"
          footer={viewMoreFooter}
        />
      </div>
    </section>
  );
}

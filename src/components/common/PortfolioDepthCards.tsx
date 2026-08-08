import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import type { Certification } from "@/data/certifications";

export function ProjectDepthCard({ project }: { project: Project }) {
  return (
    <div className="relative flex h-full flex-col">
      <div className="relative h-[42%] shrink-0 overflow-hidden bg-muted">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover pointer-events-none"
          loading="lazy"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5 overflow-hidden">
        <p className="text-xs text-primary mb-1.5">{project.categoryLabel}</p>
        <h3 className="text-base font-medium mb-1.5 leading-snug line-clamp-1">{project.title}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-3 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-[10px] sm:text-xs px-2.5 py-1.5 rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
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
    </div>
  );
}

export function CertificationDepthCard({ cert }: { cert: Certification }) {
  if (cert.comingSoon) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center">
        <h3 className="text-base font-medium mb-2">{cert.title}</h3>
        <p className="text-sm text-muted-foreground">{cert.description}</p>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col">
      <div className="relative h-[48%] shrink-0 overflow-hidden bg-muted">
        <img
          src={cert.image}
          alt={cert.imageAlt}
          className="h-full w-full object-cover pointer-events-none"
          loading="lazy"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5 overflow-hidden">
        <h3 className="text-sm font-medium mb-2 leading-snug line-clamp-2">{cert.title}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-4 flex-1">
          {cert.description}
        </p>
        {cert.link && (
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 mt-3 text-xs text-primary hover:underline"
          >
            View credential
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}

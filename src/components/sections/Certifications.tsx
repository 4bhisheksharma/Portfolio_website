import { certifications } from "@/data/certifications";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { ImageLightbox } from "@/components/common/ImageLightbox";

export function Certifications() {
  return (
    <section id="honors-awards" className="section-padding">
      <div className="container-max">
        <Reveal>
          <SectionHeading title="Honors & Awards" />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {certifications.map((cert, index) =>
            cert.comingSoon ? (
              <Reveal key={cert.id} delay={index * 0.04}>
                <div className="h-full flex flex-col items-center justify-center text-center rounded-lg border border-dashed border-border bg-card/50 p-8 min-h-[220px]">
                  <h3 className="text-base font-medium mb-2">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </div>
              </Reveal>
            ) : (
              <Reveal key={cert.id} delay={index * 0.04}>
                <article className="h-full flex flex-col rounded-lg border border-border bg-card overflow-hidden hover:border-primary/40 transition-colors">
                  <div className="h-36 sm:h-40 overflow-hidden bg-muted">
                    <ImageLightbox src={cert.image} alt={cert.imageAlt} />
                  </div>
                  <div className="p-4 sm:p-5 flex-1">
                    <h3 className="text-sm font-medium mb-2 leading-snug">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cert.description}
                    </p>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-xs text-primary hover:underline"
                      >
                        View credential →
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            )
          )}
        </div>
      </div>
    </section>
  );
}

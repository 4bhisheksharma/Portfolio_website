import { FileText } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 rounded-lg overflow-hidden">
                <img
                  src={siteConfig.about.images[0].src}
                  alt={siteConfig.about.images[0].alt}
                  className="w-full h-44 object-cover"
                  loading="lazy"
                  width={600}
                  height={180}
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img
                  src={siteConfig.about.images[1].src}
                  alt={siteConfig.about.images[1].alt}
                  className="w-full h-32 object-cover"
                  loading="lazy"
                  width={300}
                  height={130}
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img
                  src={siteConfig.about.images[2].src}
                  alt={siteConfig.about.images[2].alt}
                  className="w-full h-32 object-cover"
                  loading="lazy"
                  width={300}
                  height={130}
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <p className="text-primary text-sm font-medium mb-3">About Me</p>
              <h2 className="text-3xl md:text-4xl font-semibold mb-2">
                {siteConfig.about.headline}
              </h2>
              <p className="text-muted-foreground mb-6">{siteConfig.about.subheadline}</p>

              <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                <p>{siteConfig.about.description}</p>
                <p>
                  Currently working as Flutter Developer at{" "}
                  <a
                    href={siteConfig.about.digitalPathshalaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Digital Pathshala
                  </a>{" "}
                  and pursuing BSc. Computing at {siteConfig.about.college}, Nepal.
                </p>
              </div>

              <Button asChild>
                <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  Download Resume
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

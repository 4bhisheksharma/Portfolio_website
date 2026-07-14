import { Mail, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import { footerSocials } from "@/data/socials";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { SocialLinks } from "@/components/common/SocialLinks";

export function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="container-max max-w-2xl">
        <Reveal>
          <SectionHeading title="Contact" />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex flex-col items-center text-center gap-8">
            <div className="space-y-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center justify-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {siteConfig.email}
              </a>
              <a
                href={siteConfig.phoneHref}
                className="flex items-center justify-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {siteConfig.phone}
              </a>
            </div>

            <SocialLinks links={footerSocials} className="justify-center" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { siteConfig } from "@/data/site";
import { footerSocials } from "@/data/socials";
import { SocialLinks } from "@/components/common/SocialLinks";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-max section-padding !py-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <p className="text-sm text-muted-foreground">{siteConfig.copyright}</p>
            <p className="text-xs text-muted-foreground/60 mt-1">{siteConfig.version}</p>
          </div>
          <SocialLinks links={footerSocials} />
        </div>
      </div>
    </footer>
  );
}

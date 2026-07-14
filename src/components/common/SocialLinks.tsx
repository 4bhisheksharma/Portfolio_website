import type { SocialLink } from "@/data/socials";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
  iconSize?: string;
}

export function SocialLinks({ links, className, iconSize = "h-4 w-4" }: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {link.isImage && link.imageSrc ? (
            <img
              src={link.imageSrc}
              alt={link.label}
              className="h-5 w-5 object-contain brightness-0 invert opacity-70"
              loading="lazy"
              width={20}
              height={20}
            />
          ) : (
            <link.icon className={iconSize} aria-hidden="true" />
          )}
        </a>
      ))}
    </div>
  );
}

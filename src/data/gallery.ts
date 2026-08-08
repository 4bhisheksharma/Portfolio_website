import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { certifications } from "@/data/certifications";

export type GallerySize = "small" | "medium" | "large" | "wide" | "tall";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category: string;
  size: GallerySize;
}

const sizePattern: GallerySize[] = [
  "large",
  "small",
  "medium",
  "tall",
  "wide",
  "small",
  "medium",
  "wide",
  "tall",
  "small",
  "large",
  "medium",
];

function withSizes(
  items: Omit<GalleryImage, "size">[],
  startIndex = 0
): GalleryImage[] {
  return items.map((item, index) => ({
    ...item,
    size: sizePattern[(startIndex + index) % sizePattern.length],
  }));
}

const profileImages: Omit<GalleryImage, "size">[] = [
  {
    id: "profile",
    src: siteConfig.profileImage,
    alt: `${siteConfig.name} profile photo`,
    caption: siteConfig.title,
    category: "Profile",
  },
];

const aboutImages: Omit<GalleryImage, "size">[] = siteConfig.about.images.map(
  (img, index) => ({
    id: `about-${index}`,
    src: img.src,
    alt: img.alt,
    category: "About",
  })
);

const projectImages: Omit<GalleryImage, "size">[] = projects.map((project) => ({
  id: `project-${project.id}`,
  src: project.image,
  alt: `${project.title} screenshot`,
  caption: project.title,
  category: project.categoryLabel,
}));

const certificationImages: Omit<GalleryImage, "size">[] = certifications
  .filter((cert) => !cert.comingSoon)
  .map((cert) => ({
    id: `cert-${cert.id}`,
    src: cert.image,
    alt: cert.imageAlt,
    caption: cert.title,
    category: "Certification",
  }));

const experienceImages: Omit<GalleryImage, "size">[] = [
  {
    id: "digital-pathshala-logo",
    src: "/assets/images/digital-pathshala-logo.png",
    alt: "Digital Pathshala logo",
    caption: "Digital Pathshala",
    category: "Experience",
  },
];

let offset = 0;
const sections = [
  profileImages,
  aboutImages,
  projectImages,
  certificationImages,
  experienceImages,
];

export const galleryImages: GalleryImage[] = sections.flatMap((section) => {
  const sized = withSizes(section, offset);
  offset += section.length;
  return sized;
});

export const gallerySizeClasses: Record<GallerySize, string> = {
  small: "col-span-1 row-span-1",
  medium: "col-span-1 row-span-2 md:row-span-2",
  large: "col-span-2 row-span-2",
  wide: "col-span-2 row-span-1",
  tall: "col-span-1 row-span-3 md:row-span-3",
};

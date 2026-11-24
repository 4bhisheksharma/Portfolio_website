import React, { createContext, useContext, useEffect, useState } from "react";
import { siteConfig as defaultSiteConfig } from "@/data/site";
import { projects as defaultProjects, type Project } from "@/data/projects";
import {
  companies as defaultCompanies,
  experienceStats as defaultExperienceStats,
  type CompanyExperience,
  type ExperienceStat,
} from "@/data/experience";
import { skillCategories as defaultSkillCategories, type SkillCategory, type Skill } from "@/data/skills";
import { certifications as defaultCertifications, type Certification } from "@/data/certifications";
import { heroSocials as defaultHeroSocials, footerSocials as defaultFooterSocials, type SocialLink } from "@/data/socials";
import { subscribeToDoc } from "@/lib/firebase";
import { resolveSkillIcon, resolveSocialIcon } from "@/lib/iconResolvers";
import type { GalleryImage, GallerySize } from "@/data/gallery";

export type SiteConfigData = typeof defaultSiteConfig;

export interface ExperienceEntry {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  status: string;
  description: string;
  achievements: string[];
  technologies: string[];
  isCurrent?: boolean;
}

export interface FirestoreImageItem {
  id: string;
  name: string;
  dataUrl?: string;
  src?: string;
  category?: string;
}

export interface PortfolioContextType {
  siteConfig: SiteConfigData;
  projects: Project[];
  companies: CompanyExperience[];
  experienceStats: ExperienceStat[];
  experienceEntries: ExperienceEntry[];
  skillCategories: SkillCategory[];
  certifications: Certification[];
  heroSocials: SocialLink[];
  footerSocials: SocialLink[];
  galleryImages: GalleryImage[];
  firestoreImages: FirestoreImageItem[];
  isLoading: boolean;
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

function buildDynamicGallery(
  site: SiteConfigData,
  projs: Project[],
  certs: Certification[],
  customImages: FirestoreImageItem[] = []
): GalleryImage[] {
  const seenSrcs = new Set<string>();
  const rawList: Omit<GalleryImage, "size">[] = [];

  // Profile image
  if (site.profileImage) {
    seenSrcs.add(site.profileImage);
    rawList.push({
      id: "profile",
      src: site.profileImage,
      alt: `${site.name}, ${site.title}`,
      caption: `${site.name} | ${site.title}`,
      category: "Profile",
    });
  }

  // About images
  (site.about.images || []).forEach((img, idx) => {
    if (img.src && !seenSrcs.has(img.src)) {
      seenSrcs.add(img.src);
      rawList.push({
        id: `about-${idx}`,
        src: img.src,
        alt: img.alt || `${site.name} event`,
        category: "About",
      });
    }
  });

  // Projects
  projs.forEach((p) => {
    if (p.image && !seenSrcs.has(p.image)) {
      seenSrcs.add(p.image);
      rawList.push({
        id: p.id,
        src: p.image,
        alt: `${p.title}, ${p.categoryLabel} by ${site.name}`,
        caption: p.title,
        category: p.categoryLabel || "Projects",
      });
    }
  });

  // Certifications
  certs
    .filter((c) => !c.comingSoon)
    .forEach((c) => {
      if (c.image && !seenSrcs.has(c.image)) {
        seenSrcs.add(c.image);
        rawList.push({
          id: c.id,
          src: c.image,
          alt: c.imageAlt || c.title,
          caption: c.title,
          category: "Certifications",
        });
      }
    });

  // Custom uploaded images from Firestore
  customImages.forEach((img) => {
    const src = img.dataUrl || img.src;
    if (src && !seenSrcs.has(src)) {
      seenSrcs.add(src);
      rawList.push({
        id: img.id,
        src,
        alt: img.name || "Portfolio image",
        caption: img.name,
        category: img.category || "Archive",
      });
    }
  });

  return rawList.map((item, index) => ({
    ...item,
    size: sizePattern[index % sizePattern.length],
  }));
}

function computeExperienceEntries(comps: CompanyExperience[]): ExperienceEntry[] {
  return comps.flatMap((company) =>
    (company.roles || []).map((role) => ({
      id: role.id,
      title: role.title,
      company: company.company,
      location: company.location,
      period: role.period,
      duration: role.duration,
      status: role.isCurrent ? "Working" : "Completed",
      description: role.description ?? "",
      achievements: role.achievements ?? [],
      technologies: role.technologies ?? company.skills ?? [],
      isCurrent: role.isCurrent,
    }))
  );
}

function normalizeSiteConfig(raw: any): SiteConfigData {
  if (!raw || typeof raw !== "object") return defaultSiteConfig;

  const rawAbout = raw.about || {};
  const currentRole = rawAbout.currentRole || {
    beforeCompany: rawAbout.beforeCompany ?? defaultSiteConfig.about.currentRole.beforeCompany,
    company: rawAbout.company ?? defaultSiteConfig.about.currentRole.company,
    afterCompany: rawAbout.afterCompany ?? defaultSiteConfig.about.currentRole.afterCompany,
  };

  return {
    ...defaultSiteConfig,
    ...raw,
    email: raw.email || defaultSiteConfig.email,
    phone: raw.phone || defaultSiteConfig.phone,
    phoneHref: raw.phoneHref || `tel:${(raw.phone || defaultSiteConfig.phone).replace(/[^\d+]/g, "")}`,
    location: raw.location || defaultSiteConfig.location,
    url: raw.url || defaultSiteConfig.url,
    resumeUrl: raw.resumeUrl || defaultSiteConfig.resumeUrl,
    profileImage: raw.profileImage || defaultSiteConfig.profileImage,
    logo: raw.logo || defaultSiteConfig.logo,
    copyright: raw.copyright || defaultSiteConfig.copyright,
    version: raw.version || defaultSiteConfig.version,
    typedStrings: Array.isArray(raw.typedStrings) && raw.typedStrings.length > 0 ? raw.typedStrings : defaultSiteConfig.typedStrings,
    seo: {
      ...defaultSiteConfig.seo,
      ...(raw.seo || {}),
    },
    about: {
      ...defaultSiteConfig.about,
      ...rawAbout,
      currentRole,
      college: rawAbout.college || defaultSiteConfig.about.college,
      images: Array.isArray(rawAbout.images) && rawAbout.images.length > 0 ? rawAbout.images : defaultSiteConfig.about.images,
    },
  };
}

function normalizeSkillCategories(raw: any[]): SkillCategory[] {
  if (!Array.isArray(raw) || raw.length === 0) return defaultSkillCategories;

  return raw.map((cat) => ({
    id: cat.id || cat.label?.toLowerCase().replace(/\s+/g, "-") || "category",
    label: cat.label || "Skills",
    skills: (cat.skills || []).map((s: any): Skill => ({
      name: s.name,
      info: s.info,
      icon: s.icon && typeof s.icon === "function" ? s.icon : resolveSkillIcon(s.name, typeof s.icon === "string" ? s.icon : undefined),
    })),
  }));
}

function normalizeSocialLinks(raw: any[], fallback: SocialLink[]): SocialLink[] {
  if (!Array.isArray(raw) || raw.length === 0) return fallback;

  return raw.map((s) => ({
    label: s.label,
    href: s.href,
    icon: resolveSocialIcon(s.label),
    isImage: Boolean(s.isImage),
    imageSrc: s.imageSrc,
  }));
}

const initialGallery = buildDynamicGallery(
  defaultSiteConfig,
  defaultProjects,
  defaultCertifications
);

const PortfolioContext = createContext<PortfolioContextType>({
  siteConfig: defaultSiteConfig,
  projects: defaultProjects,
  companies: defaultCompanies,
  experienceStats: defaultExperienceStats,
  experienceEntries: computeExperienceEntries(defaultCompanies),
  skillCategories: defaultSkillCategories,
  certifications: defaultCertifications,
  heroSocials: defaultHeroSocials,
  footerSocials: defaultFooterSocials,
  galleryImages: initialGallery,
  firestoreImages: [],
  isLoading: true,
});

export function PortfolioDataProvider({ children }: { children: React.ReactNode }) {
  const [siteConfig, setSiteConfig] = useState<SiteConfigData>(() => {
    try {
      const cached = localStorage.getItem("portfolio_cache_site");
      if (cached) return normalizeSiteConfig(JSON.parse(cached));
    } catch {}
    return defaultSiteConfig;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const cached = localStorage.getItem("portfolio_cache_projects");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed?.items)) return parsed.items.filter((p: any) => !p.deletedAt);
      }
    } catch {}
    return defaultProjects.filter((p) => !(p as any).deletedAt);
  });

  const [companies, setCompanies] = useState<CompanyExperience[]>(() => {
    try {
      const cached = localStorage.getItem("portfolio_cache_experience");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed?.companies)) return parsed.companies.filter((c: any) => !c.deletedAt);
      }
    } catch {}
    return defaultCompanies.filter((c) => !(c as any).deletedAt);
  });

  const [experienceStats, setExperienceStats] = useState<ExperienceStat[]>(() => {
    try {
      const cached = localStorage.getItem("portfolio_cache_experience");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed?.stats)) return parsed.stats;
      }
    } catch {}
    return defaultExperienceStats;
  });

  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(() => {
    try {
      const cached = localStorage.getItem("portfolio_cache_skills");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed?.categories)) return normalizeSkillCategories(parsed.categories);
      }
    } catch {}
    return defaultSkillCategories;
  });

  const [certifications, setCertifications] = useState<Certification[]>(() => {
    try {
      const cached = localStorage.getItem("portfolio_cache_certifications");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed?.items)) return parsed.items.filter((c: any) => !c.deletedAt);
      }
    } catch {}
    return defaultCertifications.filter((c) => !(c as any).deletedAt);
  });

  const [heroSocials, setHeroSocials] = useState<SocialLink[]>(() => {
    try {
      const cached = localStorage.getItem("portfolio_cache_socials");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed?.heroSocials)) return normalizeSocialLinks(parsed.heroSocials, defaultHeroSocials);
      }
    } catch {}
    return defaultHeroSocials;
  });

  const [footerSocials, setFooterSocials] = useState<SocialLink[]>(() => {
    try {
      const cached = localStorage.getItem("portfolio_cache_socials");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed?.footerSocials)) return normalizeSocialLinks(parsed.footerSocials, defaultFooterSocials);
      }
    } catch {}
    return defaultFooterSocials;
  });

  const [firestoreImages, setFirestoreImages] = useState<FirestoreImageItem[]>(() => {
    try {
      const cached = localStorage.getItem("portfolio_cache_images");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed?.items)) return parsed.items.filter((img: any) => !img.deletedAt);
      }
    } catch {}
    return [];
  });

  const [isLoading] = useState(false);

  // Subscriptions to Firestore documents
  useEffect(() => {
    const unsubSite = subscribeToDoc(
      "site",
      (data: any) => {
        if (data && data.name) {
          setSiteConfig(normalizeSiteConfig(data));
        }
      },
      defaultSiteConfig
    );

    const unsubProjects = subscribeToDoc(
      "projects",
      (data: any) => {
        if (data && Array.isArray(data.items) && data.items.length > 0) {
          setProjects(data.items.filter((p: any) => !p.deletedAt));
        }
      },
      { items: defaultProjects }
    );

    const unsubExperience = subscribeToDoc(
      "experience",
      (data: any) => {
        if (data && Array.isArray(data.companies) && data.companies.length > 0) {
          setCompanies(data.companies.filter((c: any) => !c.deletedAt));
        }
        if (data && Array.isArray(data.stats) && data.stats.length > 0) {
          setExperienceStats(data.stats);
        }
      },
      { companies: defaultCompanies, stats: defaultExperienceStats }
    );

    const unsubSkills = subscribeToDoc(
      "skills",
      (data: any) => {
        if (data && Array.isArray(data.categories) && data.categories.length > 0) {
          setSkillCategories(normalizeSkillCategories(data.categories));
        }
      },
      { categories: defaultSkillCategories }
    );

    const unsubCertifications = subscribeToDoc(
      "certifications",
      (data: any) => {
        if (data && Array.isArray(data.items) && data.items.length > 0) {
          setCertifications(data.items.filter((c: any) => !c.deletedAt));
        }
      },
      { items: defaultCertifications }
    );

    const unsubSocials = subscribeToDoc(
      "socials",
      (data: any) => {
        if (data && Array.isArray(data.heroSocials)) {
          setHeroSocials(normalizeSocialLinks(data.heroSocials, defaultHeroSocials));
        }
        if (data && Array.isArray(data.footerSocials)) {
          setFooterSocials(normalizeSocialLinks(data.footerSocials, defaultFooterSocials));
        }
      },
      { heroSocials: defaultHeroSocials, footerSocials: defaultFooterSocials }
    );

    const unsubImages = subscribeToDoc(
      "images",
      (data: any) => {
        if (data && Array.isArray(data.items)) {
          setFirestoreImages(data.items.filter((img: any) => !img.deletedAt));
        }
      },
      { items: [] }
    );

    return () => {
      unsubSite();
      unsubProjects();
      unsubExperience();
      unsubSkills();
      unsubCertifications();
      unsubSocials();
      unsubImages();
    };
  }, []);

  const experienceEntries = computeExperienceEntries(companies);
  const galleryImages = buildDynamicGallery(siteConfig, projects, certifications, firestoreImages);

  return (
    <PortfolioContext.Provider
      value={{
        siteConfig,
        projects,
        companies,
        experienceStats,
        experienceEntries,
        skillCategories,
        certifications,
        heroSocials,
        footerSocials,
        galleryImages,
        firestoreImages,
        isLoading,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioData(): PortfolioContextType {
  return useContext(PortfolioContext);
}

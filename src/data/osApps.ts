import type { LucideIcon } from "lucide-react";
import {
  User,
  Rocket,
  Zap,
  Mail,
  Images,
  Github,
  Linkedin,
  Briefcase,
  Award,
  Terminal,
  BookOpen,
  FileText,
  Package,
  Instagram,
  Smartphone,
  Settings,
  Phone,
  Globe,
  Camera,
} from "lucide-react";
import { siteConfig } from "@/data/site";

export type AppAction =
  | { type: "screen"; id: AppScreenId }
  | { type: "external"; href: string }
  | { type: "modal"; id: "terminal" }
  | { type: "tel"; href: string }
  | { type: "mailto"; href: string }
  | { type: "camera" };

export type AppScreenId =
  | "about"
  | "projects"
  | "skills"
  | "contact"
  | "gallery"
  | "experience"
  | "certifications"
  | "settings"
  | "camera"
  | "resume"
  | "github";

/** Map legacy hash section IDs to OS app screens */
export const sectionToApp: Partial<Record<string, AppScreenId>> = {
  about: "about",
  projects: "projects",
  skills: "skills",
  contact: "contact",
  experience: "experience",
  "honors-awards": "certifications",
};

export interface OSApp {
  id: string;
  label: string;
  icon: LucideIcon;
  action: AppAction;
  dock?: boolean;
  badge?: number;
}

export const LINKS = {
  github: "https://github.com/4bhisheksharma",
  linkedin: "https://www.linkedin.com/in/4bhisheksharma/",
  blog: "https://blog.abhishek-sharma.com.np/",
  resume: siteConfig.resumeUrl,
  pubdev: "https://pub.dev/publishers/abhishek-sharma.com.np/packages",
  instagram: "https://www.instagram.com/btw.its_abhishek/",
  app: "https://app.abhishek-sharma.com.np/",
  site: "https://abhishek-sharma.com.np/",
} as const;

export const homeApps: OSApp[] = [
  { id: "about", label: "About Me", icon: User, action: { type: "screen", id: "about" } },
  { id: "projects", label: "Projects", icon: Rocket, action: { type: "screen", id: "projects" } },
  { id: "skills", label: "Skills", icon: Zap, action: { type: "screen", id: "skills" } },
  { id: "contact", label: "Contact", icon: Mail, action: { type: "screen", id: "contact" } },
  { id: "gallery", label: "Gallery", icon: Images, action: { type: "screen", id: "gallery" } },
  { id: "github", label: "GitHub", icon: Github, action: { type: "screen", id: "github" } },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin, action: { type: "external", href: LINKS.linkedin } },
  { id: "experience", label: "Experience", icon: Briefcase, action: { type: "screen", id: "experience" } },
  { id: "certifications", label: "Honors", icon: Award, action: { type: "screen", id: "certifications" } },
  { id: "terminal", label: "Terminal", icon: Terminal, action: { type: "modal", id: "terminal" } },
  { id: "blog", label: "Blog", icon: BookOpen, action: { type: "external", href: LINKS.blog } },
  { id: "resume", label: "Resume", icon: FileText, action: { type: "screen", id: "resume" } },
  { id: "pubdev", label: "pub.dev", icon: Package, action: { type: "external", href: LINKS.pubdev } },
  { id: "instagram", label: "Instagram", icon: Instagram, action: { type: "external", href: LINKS.instagram } },
  { id: "app", label: "My App", icon: Smartphone, action: { type: "external", href: LINKS.app } },
  { id: "settings", label: "Settings", icon: Settings, action: { type: "screen", id: "settings" } },
];

export const dockApps: OSApp[] = [
  {
    id: "phone",
    label: "Phone",
    icon: Phone,
    action: { type: "tel", href: "tel:+9779805390066" },
    dock: true,
  },
  {
    id: "contact-dock",
    label: "Contact",
    icon: Mail,
    action: { type: "screen", id: "contact" },
    dock: true,
  },
  {
    id: "browser",
    label: "Browser",
    icon: Globe,
    action: { type: "external", href: LINKS.site },
    dock: true,
  },
  {
    id: "camera",
    label: "Camera",
    icon: Camera,
    action: { type: "camera" },
    dock: true,
  },
];

export const screenMeta: Record<
  AppScreenId,
  { title: string; icon: LucideIcon }
> = {
  about: { title: "About Me", icon: User },
  projects: { title: "Projects", icon: Rocket },
  skills: { title: "Skills", icon: Zap },
  contact: { title: "Contact", icon: Mail },
  gallery: { title: "Gallery", icon: Images },
  experience: { title: "Experience", icon: Briefcase },
  certifications: { title: "Honors & Awards", icon: Award },
  settings: { title: "Settings", icon: Settings },
  camera: { title: "Camera", icon: Camera },
  resume: { title: "Resume", icon: FileText },
  github: { title: "GitHub", icon: Github },
};

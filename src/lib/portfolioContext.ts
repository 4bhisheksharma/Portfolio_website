import { siteConfig as defaultSiteConfig } from "@/data/site";
import { projects as defaultProjects, type Project } from "@/data/projects";
import {
  companies as defaultCompanies,
  experienceStats as defaultExperienceStats,
  type CompanyExperience,
  type ExperienceStat,
} from "@/data/experience";
import { skillCategories as defaultSkillCategories, type SkillCategory } from "@/data/skills";
import { certifications as defaultCertifications, type Certification } from "@/data/certifications";
import { heroSocials as defaultHeroSocials, type SocialLink } from "@/data/socials";

export interface PortfolioDataInputs {
  siteConfig?: typeof defaultSiteConfig;
  projects?: Project[];
  companies?: CompanyExperience[];
  experienceStats?: ExperienceStat[];
  skillCategories?: SkillCategory[];
  certifications?: Certification[];
  heroSocials?: SocialLink[];
}

export function buildPortfolioContext(inputs?: PortfolioDataInputs): string {
  const siteConfig = inputs?.siteConfig ?? defaultSiteConfig;
  const projects = inputs?.projects ?? defaultProjects;
  const companies = inputs?.companies ?? defaultCompanies;
  const experienceStats = inputs?.experienceStats ?? defaultExperienceStats;
  const skillCategories = inputs?.skillCategories ?? defaultSkillCategories;
  const certifications = inputs?.certifications ?? defaultCertifications;
  const heroSocials = inputs?.heroSocials ?? defaultHeroSocials;

  const skills = skillCategories
    .map((cat) => `${cat.label}: ${cat.skills.map((s) => s.name).join(", ")}`)
    .join("\n");

  const projectList = projects
    .map(
      (p) =>
        `- ${p.title} (${p.categoryLabel}): ${p.description}. Tech: ${p.technologies.join(", ")}`
    )
    .join("\n");

  const experience = companies
    .flatMap((company) =>
      (company.roles || []).map(
        (role) =>
          `- ${role.title} @ ${company.company} (${role.period}, ${company.location}): ${role.description ?? ""} Achievements: ${(role.achievements ?? []).join("; ")}. Tech: ${(role.technologies ?? company.skills).join(", ")}`
      )
    )
    .join("\n");

  const awards = certifications
    .filter((c) => !c.comingSoon)
    .map((c) => `- ${c.title}: ${c.description}`)
    .join("\n");

  const socials = heroSocials.map((s) => `- ${s.label}: ${s.href}`).join("\n");

  const stats = experienceStats
    .map((s) => `${s.value}${s.suffix} ${s.label}`)
    .join(", ");

  const aboutDescription = siteConfig.about?.description || "";
  const roleInfo = siteConfig.about?.currentRole
    ? `${siteConfig.about.currentRole.beforeCompany}${siteConfig.about.currentRole.company}${siteConfig.about.currentRole.afterCompany}`
    : "";
  const collegeInfo = siteConfig.about?.college || "";

  return `
NAME: ${siteConfig.name}
TITLE: ${siteConfig.title}
ROLE: ${siteConfig.role}
TAGLINE: ${siteConfig.tagline}
EMAIL: ${siteConfig.email}
PHONE: ${siteConfig.phone}
LOCATION: ${siteConfig.location}
WEBSITE: ${siteConfig.url}
RESUME: ${siteConfig.resumeUrl}

ABOUT:
${aboutDescription}
${roleInfo}
Education: BSc. Computing at ${collegeInfo}

STATS: ${stats}

SKILLS:
${skills}

EXPERIENCE:
${experience}

PROJECTS (${projects.length} total):
${projectList}

HONORS & CERTIFICATIONS:
${awards}

SOCIAL LINKS:
${socials}
`.trim();
}

export function buildSystemPrompt(inputs?: PortfolioDataInputs): string {
  const context = buildPortfolioContext(inputs);
  const email = inputs?.siteConfig?.email || defaultSiteConfig.email;

  return `You are Abhishek Sharma's portfolio assistant on abhishek-sharma.com.np. You answer questions ONLY about Abhishek Sharma using the portfolio data below.

RULES:
- Answer only questions about Abhishek Sharma: his skills, projects, experience, education, awards, contact info, and career.
- If asked about anything unrelated (general knowledge, other people, coding help unrelated to his work, politics, etc.), politely decline and redirect to Abhishek-related topics.
- Be friendly, concise, and professional. Use markdown sparingly (bold for emphasis, short lists when helpful).
- If information is not in the portfolio data, say you don't have that detail and suggest contacting Abhishek directly at ${email}.
- Do not invent projects, employers, skills, or achievements not listed below.
- Speak in third person about Abhishek ("He", "Abhishek") unless the user asks you to speak as Abhishek.
- Make the response simple, minimal, and short, which should be easy to understand and read.
- CRITICAL: Output ONLY the final direct response for the user. NEVER output any internal thinking, thought processes, reasoning, or <think> tags.

PORTFOLIO DATA:
${context}`;
}

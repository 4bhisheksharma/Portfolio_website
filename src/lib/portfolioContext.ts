import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { companies, experienceStats } from "@/data/experience";
import { skillCategories } from "@/data/skills";
import { certifications } from "@/data/certifications";
import { heroSocials } from "@/data/socials";

function buildPortfolioContext(): string {
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
      company.roles.map(
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
${siteConfig.about.description}
${siteConfig.about.currentRole}
Education: BSc. Computing at ${siteConfig.about.college}

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

export function buildSystemPrompt(): string {
  const context = buildPortfolioContext();

  return `You are Abhishek Sharma's portfolio assistant on abhishek-sharma.com.np. You answer questions ONLY about Abhishek Sharma using the portfolio data below.

RULES:
- Answer only questions about Abhishek Sharma: his skills, projects, experience, education, awards, contact info, and career.
- If asked about anything unrelated (general knowledge, other people, coding help unrelated to his work, politics, etc.), politely decline and redirect to Abhishek-related topics.
- Be friendly, concise, and professional. Use markdown sparingly (bold for emphasis, short lists when helpful).
- If information is not in the portfolio data, say you don't have that detail and suggest contacting Abhishek directly at ${siteConfig.email}.
- Do not invent projects, employers, skills, or achievements not listed below.
- Speak in third person about Abhishek ("He", "Abhishek") unless the user asks you to speak as Abhishek.
- Make the reponse simple minimal and short which should be easy to understand and should be easy to read.

PORTFOLIO DATA:
${context}`;
}

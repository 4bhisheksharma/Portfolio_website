export interface ExperienceStat {
  value: number;
  suffix: string;
  label: string;
}

export interface ExperienceRole {
  id: string;
  title: string;
  period: string;
  duration: string;
  isCurrent?: boolean;
  description?: string;
  achievements?: string[];
  technologies?: string[];
}

export interface CompanyExperience {
  id: string;
  company: string;
  companyUrl?: string;
  employmentType: string;
  totalDuration: string;
  location: string;
  workMode: string;
  logo: string;
  logoText: string;
  skills: string[];
  roles: ExperienceRole[];
}

export const experienceStats: ExperienceStat[] = [
  { value: 2, suffix: "+", label: "Years Coding" },
  { value: 15, suffix: "+", label: "Projects Built" },
  { value: 10, suffix: "+", label: "Awards Won" },
  { value: 8, suffix: "+", label: "Technologies" },
];

export const companies: CompanyExperience[] = [
  {
    id: "digital-pathshala",
    company: "Digital Pathshala",
    companyUrl: "https://digitalpathshalanepal.com/",
    employmentType: "Full-time",
    totalDuration: "1 yr 1 mo",
    location: "Itahari, Nepal",
    workMode: "On-site",
    logo: "/assets/images/digital-pathshala-logo.png",
    logoText: "DP",
    skills: ["Flutter", "Dart", "BLoC", "REST API", "Django"],
    roles: [
      {
        id: "flutter-developer",
        title: "Flutter Developer",
        period: "Jul 2026 - Present",
        duration: "1 mo",
        isCurrent: true,
        description:
          "Working as a Flutter Developer, building cross-platform mobile applications and implementing various features while optimizing app performance.",
        achievements: ["Working in Real World Projects."],
        technologies: ["Flutter", "Dart", "API Implementation", "BLoC"],
      },
      {
        id: "associate-flutter-developer",
        title: "Associate Flutter Developer",
        period: "Mar 2026 - Jul 2026",
        duration: "5 mos",
        description:
          "Working as a Flutter Developer, building cross-platform mobile applications and implementing various features while optimizing app performance.",
        achievements: ["Working in Real World Projects."],
        technologies: ["Flutter", "Dart", "API Implementation", "BLoC"],
      },
      {
        id: "flutter-developer-intern",
        title: "Flutter Developer Intern",
        period: "June 2025 - August 2025",
        duration: "3 Months",
        description:
          "Worked as a Flutter Developer intern, building cross-platform mobile applications and implementing various features while optimizing app performance.",
        achievements: [
          "Built cross-platform mobile apps using Flutter/Dart",
          "Integrated Django backend with mobile applications",
          "Implemented state management using BLoC pattern",
          "Optimized app performance and user experience",
          "Collaborated with team on feature development",
        ],
        technologies: ["Flutter", "Dart", "Django", "BLoC", "REST API"],
      },
    ],
  },
];

/** Flat role list for terminal / other consumers */
export const experienceEntries = companies.flatMap((company) =>
  company.roles.map((role) => ({
    id: role.id,
    title: role.title,
    company: company.company,
    location: company.location,
    period: role.period,
    duration: role.duration,
    status: role.isCurrent ? "Working" : "Completed",
    description: role.description ?? "",
    achievements: role.achievements ?? [],
    technologies: role.technologies ?? company.skills,
    isCurrent: role.isCurrent,
  }))
);

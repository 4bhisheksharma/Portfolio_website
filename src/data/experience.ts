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
  logo?: string;
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
    id: "freelance",
    company: "Freelance",
    employmentType: "Self-employed",
    totalDuration: "Present",
    location: "Itahari, Nepal",
    workMode: "Remote",
    logoText: "AS",
    skills: ["Flutter", "Dart", "Firebase", "Supabase", "REST API"],
    roles: [
      {
        id: "freelance-flutter-developer",
        title: "Freelance Flutter Developer",
        period: "Sep 2026 - Present",
        duration: "",
        isCurrent: true,
        description:
          "Building cross-platform mobile apps for clients, from design and development through to Play Store and App Store releases.",
        technologies: ["Flutter", "Dart", "Firebase", "Supabase", "REST API"],
      },
    ],
  },
  {
    id: "digital-pathshala",
    company: "Digital Pathshala",
    companyUrl: "https://digitalpathshalanepal.com/",
    employmentType: "Full-time",
    totalDuration: "1 yr 4 mos",
    location: "Itahari, Nepal",
    workMode: "On-site",
    logo: "/assets/images/digital-pathshala-logo.png",
    logoText: "DP",
    skills: ["Flutter", "Dart", "BLoC", "REST API", "Django"],
    roles: [
      {
        id: "flutter-developer",
        title: "Flutter Developer",
        period: "Jul 2026 - Sep 2026",
        duration: "3 mos",
        description:
          "Built cross-platform mobile applications with Flutter, implemented new features, and optimized app performance.",
        achievements: ["Worked on real-world client projects."],
        technologies: ["Flutter", "Dart", "API Integration", "BLoC"],
      },
      {
        id: "associate-flutter-developer",
        title: "Associate Flutter Developer",
        period: "Mar 2026 - Jul 2026",
        duration: "5 mos",
        description:
          "Developed cross-platform mobile applications with Flutter, built new features, and improved app performance.",
        achievements: ["Worked on real-world client projects."],
        technologies: ["Flutter", "Dart", "API Integration", "BLoC"],
      },
      {
        id: "flutter-developer-intern",
        title: "Flutter Developer Intern",
        period: "Jun 2025 - Aug 2025",
        duration: "3 mos",
        description:
          "Worked as a Flutter Developer intern, building cross-platform mobile applications, implementing features, and optimizing app performance.",
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

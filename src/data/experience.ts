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
    id: "illuminati-tech",
    company: "Illuuminati Tech Pvt. Ltd.",
    employmentType: "Full-time",
    totalDuration: "3 mos",
    location: "Nepal",
    workMode: "On-site",
    logoText: "IT",
    skills: ["Flutter", "Dart", "BLoC", "REST API", "Play Console", "App Store Connect"],
    roles: [
      {
        id: "mid-level-flutter-developer",
        title: "Mid - Level Flutter Developer",
        period: "Sept 2026 - Nov 2026",
        duration: "3 mos",
        isCurrent: true,
        description:
          "Worked as a Flutter Developer, build real-world cross-platform mobile applications publishing to the Play Console and Apple Store Connect.",
        achievements: [
          "Built real-world cross-platform mobile applications.",
          "Published production apps to Google Play Console and Apple Store Connect.",
        ],
        technologies: ["Flutter", "Dart", "BLoC", "REST API", "Play Console", "App Store Connect"],
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
          "Worked as a Flutter Developer, build real-world cross-platform mobile applications and implementing various features, publishing to the Play Console and Apple Store Connect.",
        achievements: [
          "Worked on real-world client projects.",
          "Published apps to Google Play Console and Apple Store Connect.",
        ],
        technologies: ["Flutter", "Dart", "API Integration", "BLoC", "Play Console", "App Store Connect"],
      },
      {
        id: "associate-flutter-developer",
        title: "Associate Flutter Developer",
        period: "Mar 2026 - Jul 2026",
        duration: "5 mos",
        description:
          "Worked as a Flutter Developer, building real-world cross-platform mobile applications.",
        achievements: ["Worked on real-world client projects."],
        technologies: ["Flutter", "Dart", "API Integration", "BLoC"],
      },
      {
        id: "flutter-developer-intern",
        title: "Flutter Developer Intern",
        period: "Jun 2025 - Aug 2025",
        duration: "3 mos",
        description:
          "Worked as a Flutter Developer intern, build cross-platform mobile applications and implemented various features while optimizing app performance.",
        achievements: ["Implemented core UI components and performance optimizations."],
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

export const siteConfig = {
  name: "Abhishek Sharma",
  title: "Flutter Mobile App Developer",
  role: "Flutter Developer",
  tagline: "Open to Work · 15+ Projects",
  seo: {
    title: "Abhishek Sharma | Flutter Mobile App Developer",
    description:
      "Flutter developer building cross-platform mobile apps with Flutter & Dart. 15+ projects, AWS Certified, open to work. Based in Nepal.",
  },
  typedStrings: [
    "Works",
    "Projects",
    "Achievements",
    "Skills",
    "Certifications",
    "Presentations",
    "Research",
    "Education",
    "Hobbies",
  ],
  email: "developer@abhishek-sharma.com.np",
  phone: "+977 9805390066",
  phoneHref: "tel:+9779805390066",
  location: "Itahari, Morang, Nepal",
  url: "https://abhishek-sharma.com.np/",
  resumeUrl: "/assets/misc/Abhishek Sharma CV.pdf",
  profileImage: "/assets/images/profile1.png",
  logo: "/assets/images/logo.png",
  copyright: "© 2026 Abhishek Sharma | All rights reserved.",
  version: "Last Update: 24th July 2026 | V6.0",
  about: {
    headline: "Hello! I'm Abhishek",
    subheadline: "Mobile App Developer",
    description:
      "Flutter Mobile App Developer specializing in scalable cross-platform apps with Flutter, Dart, and Firebase. 15+ projects across fintech, social, and accounting — including Digital Khata and Bhetghat.",
    currentRole: {
      beforeCompany: "Flutter Developer at ",
      company: "Digital Pathshala",
      afterCompany: " · BSc. Computing at Itahari International College, Nepal",
    },
    digitalPathshalaUrl: "https://digitalpathshalanepal.com/",
    college: "Itahari International College",
    images: [
      { src: "/assets/images/AAA.jpg", alt: "About Image 1" },
      { src: "/assets/images/yss.jpeg", alt: "About Image 2" },
      { src: "/assets/images/hackathone.jpeg", alt: "About Image 3" },
    ],
  },
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Tech", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export const sectionIds = [
  "hero",
  "about",
  "projects",
  "skills",
  "experience",
  "honors-awards",
  "contact",
] as const;

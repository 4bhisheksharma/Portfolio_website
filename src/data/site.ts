export const siteConfig = {
  name: "Abhishek Sharma",
  title: "Flutter Mobile App Developer",
  role: "Flutter Developer",
  tagline: "Open to Work",
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
  version: "Last Update: 28th June 2026 | V5.0",
  about: {
    headline: "Hello! I'm Abhishek",
    subheadline: "Mobile App Developer",
    description:
      "Flutter Mobile App Developer focusing on building scalable systems. I have developed solutions, MVPs, products, and systems for different niches such as accounting, social networking, and fintech.",
    currentRole:
      "Currently working as Flutter Developer at Digital Pathshala and pursuing BSc. Computing at Itahari International College, Nepal.",
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

import type { IconType } from "react-icons";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaAppStore,
  FaBlog,
  FaFileAlt,
  FaFacebook,
} from "react-icons/fa";

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
  isImage?: boolean;
  imageSrc?: string;
}

export const heroSocials: SocialLink[] = [
  { label: "App", href: "https://app.abhishek-sharma.com.np/", icon: FaAppStore },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/4bhisheksharma/", icon: FaLinkedin },
  { label: "GitHub", href: "https://github.com/4bhisheksharma", icon: FaGithub },
  {
    label: "pub.dev",
    href: "https://pub.dev/publishers/abhishek-sharma.com.np/packages",
    icon: FaGithub,
    isImage: true,
    imageSrc: "/assets/images/pub-dev.png",
  },
  { label: "Instagram", href: "https://www.instagram.com/btw.its_abhishek/", icon: FaInstagram },
  { label: "Blog", href: "https://blog.abhishek-sharma.com.np/", icon: FaBlog },
  { label: "Resume", href: "/assets/misc/Abhishek Sharma CV.pdf", icon: FaFileAlt },
];

export const footerSocials: SocialLink[] = [
  { label: "App", href: "https://app.abhishek-sharma.com.np/", icon: FaAppStore },
  { label: "GitHub", href: "https://github.com/4bhisheksharma", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/4bhisheksharma/", icon: FaLinkedin },
  {
    label: "pub.dev",
    href: "https://pub.dev/publishers/abhishek-sharma.com.np/packages",
    icon: FaGithub,
    isImage: true,
    imageSrc: "/assets/images/pub-dev.png",
  },
  { label: "Facebook", href: "https://www.facebook.com/4bhisheksharma", icon: FaFacebook },
  { label: "Instagram", href: "https://www.instagram.com/btw.its_abhishek/", icon: FaInstagram },
];

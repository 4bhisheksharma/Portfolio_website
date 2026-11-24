import type { IconType } from "react-icons";
import {
  SiFlutter,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiDjango,
  SiMysql,
  SiMariadb,
  SiSqlite,
  SiFirebase,
  SiDart,
  SiOpenjdk,
  SiPython,
  SiCplusplus,
  SiFigma,
  SiGit,
  SiLinux,
  SiArduino,
  SiGithub,
  SiVscodium,
  SiEclipseide,
  SiIntellijidea,
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiNextdotjs,
} from "react-icons/si";
import {
  FaServer,
  FaCamera,
  FaVideo,
  FaFilm,
  FaAws,
  FaDatabase,
  FaCode,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaAppStore,
  FaBlog,
  FaFileAlt,
  FaFacebook,
  FaGlobe,
} from "react-icons/fa";

const SKILL_ICON_MAP: Record<string, IconType> = {
  flutter: SiFlutter,
  dart: SiDart,
  react: SiReact,
  "react native": SiReact,
  html: SiHtml5,
  html5: SiHtml5,
  css: SiCss,
  javascript: SiJavascript,
  js: SiJavascript,
  typescript: SiTypescript,
  ts: SiTypescript,
  django: SiDjango,
  mysql: SiMysql,
  mariadb: SiMariadb,
  sqlite: SiSqlite,
  oracle: FaDatabase,
  firebase: SiFirebase,
  firestore: SiFirebase,
  java: SiOpenjdk,
  python: SiPython,
  "c ++": SiCplusplus,
  "c++": SiCplusplus,
  cpp: SiCplusplus,
  figma: SiFigma,
  git: SiGit,
  github: SiGithub,
  "linux/unix": SiLinux,
  linux: SiLinux,
  unix: SiLinux,
  arduino: SiArduino,
  vscodium: SiVscodium,
  vscode: SiVscodium,
  eclipse: SiEclipseide,
  intellij: SiIntellijidea,
  "cloud computing(aws)": FaAws,
  aws: FaAws,
  docker: SiDocker,
  node: SiNodedotjs,
  nodejs: SiNodedotjs,
  tailwind: SiTailwindcss,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  mongodb: SiMongodb,
  nextjs: SiNextdotjs,
  server: FaServer,
  camera: FaCamera,
  video: FaVideo,
  film: FaFilm,
  database: FaDatabase,
};

export function resolveSkillIcon(name: string, iconKey?: string): IconType {
  if (iconKey) {
    const key = iconKey.toLowerCase().trim();
    if (SKILL_ICON_MAP[key]) return SKILL_ICON_MAP[key];
  }
  const cleanName = name.toLowerCase().trim();
  if (SKILL_ICON_MAP[cleanName]) return SKILL_ICON_MAP[cleanName];

  for (const [key, icon] of Object.entries(SKILL_ICON_MAP)) {
    if (cleanName.includes(key) || key.includes(cleanName)) {
      return icon;
    }
  }

  return FaCode;
}

const SOCIAL_ICON_MAP: Record<string, IconType> = {
  apps: FaAppStore,
  linkedin: FaLinkedin,
  github: FaGithub,
  "pub.dev": FaGithub,
  instagram: FaInstagram,
  blog: FaBlog,
  resume: FaFileAlt,
  facebook: FaFacebook,
};

export function resolveSocialIcon(label: string): IconType {
  const key = label.toLowerCase().trim();
  return SOCIAL_ICON_MAP[key] ?? FaGlobe;
}

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
} from "react-icons/si";
import { FaServer, FaCamera, FaVideo, FaFilm, FaAws, FaDatabase } from "react-icons/fa";

export interface Skill {
  name: string;
  info?: string;
  icon: IconType;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Front-end",
    skills: [
      { name: "Flutter", icon: SiFlutter },
      { name: "React", info: "Library for building user interfaces with components.", icon: SiReact },
      { name: "HTML", info: "Markup language for creating web pages.", icon: SiHtml5 },
      {
        name: "CSS",
        info: "Style sheet language used for describing the look and formatting of a document written in a markup language.",
        icon: SiCss,
      },
      {
        name: "JavaScript",
        info: "Programming language that conforms to the ECMAScript specification.",
        icon: SiJavascript,
      },
    ],
  },
  {
    id: "backend",
    label: "Back-end",
    skills: [
      { name: "Django", icon: SiDjango },
      { name: "Jakarta EE", icon: FaServer },
    ],
  },
  {
    id: "database",
    label: "Database",
    skills: [
      { name: "MySQL", info: "Relational database management system.", icon: SiMysql },
      { name: "MariaDB", info: "Relational database management system.", icon: SiMariadb },
      { name: "SQLite", icon: SiSqlite },
      { name: "Oracle", icon: FaDatabase },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "Dart", icon: SiDart },
      { name: "Java", info: "Object-oriented programming language.", icon: SiOpenjdk },
      {
        name: "Python",
        info: "High-level programming language for general-purpose programming.",
        icon: SiPython,
      },
      { name: "C ++", info: "General-purpose programming language.", icon: SiCplusplus },
    ],
  },
  {
    id: "others",
    label: "Others",
    skills: [
      { name: "Figma", icon: SiFigma },
      { name: "Git", icon: SiGit },
      { name: "Linux/UNIX", icon: SiLinux },
      { name: "Cloud Computing(AWS)", icon: FaAws },
      {
        name: "IoT",
        info: "Network of physical objects embedded with sensors, software, and other technologies.",
        icon: SiArduino,
      },
      { name: "Photography", info: "Art of capturing light with a camera.", icon: FaCamera },
      { name: "Videography", info: "Process of capturing moving images.", icon: FaVideo },
      { name: "Video Editing", info: "Manipulation and arrangement of video shots.", icon: FaFilm },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [
      { name: "Visual Studio Code", icon: SiVscodium },
      { name: "Eclipse", icon: SiEclipseide },
      { name: "IntelliJ IDEA", icon: SiIntellijidea },
      { name: "Wamp", icon: FaServer },
      { name: "Xampp", icon: FaServer },
      { name: "Git/GitHub", icon: SiGithub },
    ],
  },
];

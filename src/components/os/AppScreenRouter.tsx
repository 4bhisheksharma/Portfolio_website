import { AnimatePresence, motion } from "framer-motion";
import type { AppScreenId } from "@/data/osApps";
import { usePhoneOS } from "@/context/PhoneOSContext";
import { AboutApp } from "./apps/AboutApp";
import { ProjectsApp } from "./apps/ProjectsApp";
import { SkillsApp } from "./apps/SkillsApp";
import { ContactApp } from "./apps/ContactApp";
import { ExperienceApp } from "./apps/ExperienceApp";
import { CertificationsApp } from "./apps/CertificationsApp";
import { GalleryApp } from "./apps/GalleryApp";
import { SettingsApp } from "./apps/SettingsApp";
import { CameraApp } from "./apps/CameraApp";
import { ResumeApp } from "./apps/ResumeApp";
import { GithubApp } from "./apps/GithubApp";

const appComponents: Record<AppScreenId, React.ComponentType> = {
  about: AboutApp,
  projects: ProjectsApp,
  skills: SkillsApp,
  contact: ContactApp,
  gallery: GalleryApp,
  experience: ExperienceApp,
  certifications: CertificationsApp,
  settings: SettingsApp,
  camera: CameraApp,
  resume: ResumeApp,
  github: GithubApp,
};

export function AppScreenRouter() {
  const { activeApp } = usePhoneOS();
  const App = activeApp ? appComponents[activeApp] : null;

  return (
    <AnimatePresence mode="wait">
      {App && activeApp && (
        <motion.div
          key={activeApp}
          initial={{ opacity: 0, x: 40, scale: 0.94, filter: "blur(4px)" }}
          animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: 24, scale: 0.96, filter: "blur(2px)" }}
          transition={{ type: "spring", stiffness: 360, damping: 30 }}
          className="absolute inset-0 z-20"
        >
          <App />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

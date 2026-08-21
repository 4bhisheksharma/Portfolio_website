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
    <AnimatePresence mode="popLayout">
      {App && activeApp && (
        <motion.div
          key={activeApp}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0 z-20 will-change-[opacity,transform]"
        >
          <App />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

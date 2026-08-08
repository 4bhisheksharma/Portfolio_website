import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { sectionIds } from "@/data/site";

const HEADER_OFFSET = 80;

function scrollToSection(hash: string) {
  const target = document.querySelector(hash);
  if (target) {
    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

interface HomePageProps {
  onOpenTerminal: () => void;
}

export function HomePage({ onOpenTerminal }: HomePageProps) {
  const location = useLocation();

  useEffect(() => {
    const scrollTarget = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (scrollTarget) {
      requestAnimationFrame(() => {
        setTimeout(() => scrollToSection(scrollTarget), 50);
      });
      window.history.replaceState({}, "");
    }
  }, [location.state]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#/")) return;

    const sectionId = hash.replace("#", "");
    if (sectionIds.includes(sectionId as (typeof sectionIds)[number])) {
      setTimeout(() => scrollToSection(`#${sectionId}`), 150);
    }
  }, []);

  return (
    <>
      <Hero onOpenTerminal={onOpenTerminal} />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Certifications />
      <Contact />
    </>
  );
}

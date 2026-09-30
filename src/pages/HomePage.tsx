import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Projects } from "@/components/site/Projects";
import { Experience } from "@/components/site/Experience";
import { Skills } from "@/components/site/Skills";
import { Certifications } from "@/components/site/Certifications";
import { Contact } from "@/components/site/Contact";
import { scrollToTarget } from "@/components/motion/SmoothScroll";

export function HomePage() {
  const location = useLocation();
  const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;

  useEffect(() => {
    const target = scrollTo ?? (location.hash.startsWith("#/") ? "" : location.hash);
    if (!target || target === "#hero") return;
    // wait a frame so sections have laid out
    const id = requestAnimationFrame(() => scrollToTarget(target, !scrollTo));
    if (scrollTo) window.history.replaceState({}, "");
    return () => cancelAnimationFrame(id);
  }, [scrollTo, location.hash]);

  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Certifications />
      <Contact />
    </main>
  );
}

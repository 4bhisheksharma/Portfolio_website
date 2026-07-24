import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { TerminalModal } from "@/components/common/TerminalModal";
import { AiChatWidget } from "@/components/common/AiChatWidget";

function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <>
      <div className="bg-dots" aria-hidden="true" />
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />
      <main>
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <TerminalModal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
      <AiChatWidget />
    </>
  );
}

export default App;

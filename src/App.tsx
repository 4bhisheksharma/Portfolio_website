import { HashRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LegacySectionRedirect } from "@/components/layout/LegacySectionRedirect";
import { HomePage } from "@/pages/HomePage";
import { GalleryPage } from "@/pages/GalleryPage";
import { TerminalModal } from "@/components/common/TerminalModal";
import { AiChatWidget } from "@/components/common/AiChatWidget";

function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <HashRouter>
      <LegacySectionRedirect />
      <div className="bg-dots" aria-hidden="true" />
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />
      <Routes>
        <Route path="/" element={<HomePage onOpenTerminal={() => setTerminalOpen(true)} />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
      <Footer />
      <TerminalModal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
      <AiChatWidget />
    </HashRouter>
  );
}

export default App;

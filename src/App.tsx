import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LegacySectionRedirect } from "@/components/layout/LegacySectionRedirect";
import { LegacyHashRedirect } from "@/components/layout/LegacyHashRedirect";
import { SeoHead } from "@/components/common/SeoHead";
import { HomePage } from "@/pages/HomePage";
import { GalleryPage } from "@/pages/GalleryPage";
import { TerminalModal } from "@/components/common/TerminalModal";
import { AiChatWidget } from "@/components/common/AiChatWidget";

function AppShell() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const location = useLocation();
  const seoRoute = location.pathname === "/gallery" ? "gallery" : "home";

  return (
    <>
      <SeoHead route={seoRoute} />
      <LegacyHashRedirect />
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
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;

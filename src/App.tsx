import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { LegacySectionRedirect } from "@/components/layout/LegacySectionRedirect";
import { LegacyHashRedirect } from "@/components/layout/LegacyHashRedirect";
import { SeoHead, type SeoRoute } from "@/components/common/SeoHead";
import { HomePage } from "@/pages/HomePage";
import { GalleryPage } from "@/pages/GalleryPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { TerminalModal } from "@/components/common/TerminalModal";
import { AiChatWidget } from "@/components/common/AiChatWidget";
import { sectionIds } from "@/data/site";

function AppShell() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const location = useLocation();

  const pathname = location.pathname;
  const isGallery = pathname === "/gallery";
  const isHome = pathname === "/";
  const isLegacySection = sectionIds.includes(
    pathname.replace(/^\//, "") as (typeof sectionIds)[number]
  );

  let seoRoute: SeoRoute = "home";
  if (isGallery) {
    seoRoute = "gallery";
  } else if (!isHome && !isLegacySection) {
    seoRoute = "404";
  }

  const openTerminal = () => setTerminalOpen(true);

  return (
    <>
      <SeoHead route={seoRoute} />
      <LegacyHashRedirect />
      <LegacySectionRedirect />
      <Routes>
        <Route path="/" element={<HomePage onOpenTerminal={openTerminal} />} />
        <Route path="/gallery" element={<GalleryPage onOpenTerminal={openTerminal} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
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

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { LegacySectionRedirect } from "@/components/layout/LegacySectionRedirect";
import { LegacyHashRedirect } from "@/components/layout/LegacyHashRedirect";
import { SeoHead, type SeoRoute } from "@/components/common/SeoHead";
import { HomePage } from "@/pages/HomePage";
import { GalleryPage } from "@/pages/GalleryPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { SmoothScroll, scrollToTarget, setScrollLocked } from "@/components/motion/SmoothScroll";
import { Cursor } from "@/components/motion/Cursor";
import { Navbar } from "@/components/site/Navbar";
import { Intro } from "@/components/site/Intro";
import { sectionIds } from "@/data/site";

// Optional extras load after the main page
const TerminalModal = lazy(() =>
  import("@/components/common/TerminalModal").then((m) => ({ default: m.TerminalModal }))
);
const AiChatWidget = lazy(() =>
  import("@/components/common/AiChatWidget").then((m) => ({ default: m.AiChatWidget }))
);

function AppShell() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalLoaded, setTerminalLoaded] = useState(false);
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

  // Start each route at the top unless it asked to scroll somewhere
  useEffect(() => {
    if (!(location.state as { scrollTo?: string } | null)?.scrollTo && !location.hash) {
      scrollToTarget(0, true);
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setScrollLocked(terminalOpen);
    if (terminalOpen) setTerminalLoaded(true);
  }, [terminalOpen]);

  // Backtick toggles the terminal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("input, textarea, [contenteditable]")) return;
      if (e.key === "`") {
        e.preventDefault();
        setTerminalOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openTerminal = () => setTerminalOpen(true);

  return (
    <>
      <SeoHead route={seoRoute} />
      <LegacyHashRedirect />
      <LegacySectionRedirect />
      <Intro />
      <Navbar onOpenTerminal={openTerminal} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Suspense fallback={null}>
        {terminalLoaded && <TerminalModal open={terminalOpen} onClose={() => setTerminalOpen(false)} />}
        <AiChatWidget />
      </Suspense>
      <Cursor />
      <div aria-hidden className="grain" />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <AppShell />
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;

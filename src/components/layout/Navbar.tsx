import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Terminal, X } from "lucide-react";
import { navLinks, sectionIds } from "@/data/site";
import { useScrolled } from "@/hooks/useScrolled";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenTerminal: () => void;
}

const HEADER_OFFSET = 80;

export function Navbar({ onOpenTerminal }: NavbarProps) {
  const scrolled = useScrolled();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const activeSection = useActiveSection(sectionIds, HEADER_OFFSET + 40);
  const [mobileOpen, setMobileOpen] = useState(false);

  useBodyScrollLock(mobileOpen);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const scrollToSection = useCallback((hash: string) => {
    const target = document.querySelector(hash);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  const handleHashNav = (href: string) => {
    setMobileOpen(false);
    if (isHome) {
      scrollToSection(href);
    } else {
      navigate("/", { state: { scrollTo: href } });
    }
  };

  const isHashActive = (href: string) => isHome && activeSection === href.replace("#", "");
  const isRouteActive = (href: string) => location.pathname === href;

  const navLinkClass = (active: boolean, compact = false) =>
    cn(
      "relative transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm whitespace-nowrap",
      compact ? "text-xs px-2 py-2" : "text-xs xl:text-sm px-2.5 py-2 xl:px-3",
      active ? "text-primary" : "text-muted-foreground hover:text-foreground"
    );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || mobileOpen
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm shadow-black/5"
          : "bg-transparent"
      )}
    >
      <nav
        className="container-max flex h-14 sm:h-16 lg:h-[4.5rem] items-center justify-between gap-3"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              scrollToSection("#hero");
            }
          }}
          className="shrink-0 text-sm sm:text-base lg:text-lg font-medium tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm min-w-0"
        >
          {"< "}
          <span className="text-primary">Abhishek</span>
          {" />"}
        </Link>

        {/* Desktop navigation — lg and up */}
        <div className="hidden lg:flex items-center min-w-0 flex-1 justify-end gap-0.5 xl:gap-1">
          {navLinks.map((link) =>
            link.type === "route" ? (
              <Link
                key={link.href}
                to={link.href}
                className={navLinkClass(isRouteActive(link.href))}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleHashNav(link.href);
                }}
                className={navLinkClass(isHashActive(link.href))}
              >
                {link.label}
              </a>
            )
          )}
          <button
            type="button"
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 ml-1 xl:ml-2 text-xs xl:text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-2.5 py-2 shrink-0"
          >
            <Terminal className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="hidden xl:inline">Developer Zone</span>
            <span className="xl:hidden">Dev</span>
          </button>
        </div>

        {/* Tablet compact nav — md to lg */}
        <div className="hidden md:flex lg:hidden items-center gap-1 shrink-0">
          <Link
            to="/gallery"
            className={navLinkClass(isRouteActive("/gallery"), true)}
          >
            Gallery
          </Link>
          <button
            type="button"
            onClick={onOpenTerminal}
            className="flex h-10 w-10 items-center justify-center rounded border border-border text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Open Developer Zone"
          >
            <Terminal className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded border border-border text-foreground hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile hamburger — below md */}
        <button
          type="button"
          className="md:hidden flex h-11 w-11 items-center justify-center rounded border border-border text-foreground hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile / tablet slide-out menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-14 sm:top-16 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed top-14 sm:top-16 right-0 bottom-0 w-full max-w-[320px] z-50 border-l border-border bg-background lg:hidden overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col p-4 gap-1">
                {navLinks.map((link) =>
                  link.type === "route" ? (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center min-h-[48px] px-4 text-base rounded-lg transition-colors",
                        isRouteActive(link.href)
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleHashNav(link.href);
                      }}
                      className={cn(
                        "flex items-center min-h-[48px] px-4 text-base rounded-lg transition-colors",
                        isHashActive(link.href)
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      {link.label}
                    </a>
                  )
                )}
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenTerminal();
                  }}
                  className="flex items-center gap-3 min-h-[48px] px-4 text-base text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors rounded-lg text-left mt-2 border-t border-border pt-4"
                >
                  <Terminal className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Developer Zone
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

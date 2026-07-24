import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Terminal, X } from "lucide-react";
import { navLinks, sectionIds } from "@/data/site";
import { useScrolled } from "@/hooks/useScrolled";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenTerminal: () => void;
}

export function Navbar({ onOpenTerminal }: NavbarProps) {
  const scrolled = useScrolled();
  const activeSection = useActiveSection(sectionIds);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const isActive = (href: string) => activeSection === href.replace("#", "");

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      )}
    >
      <nav
        className="container-max flex h-16 md:h-20 items-center justify-between"
        aria-label="Main navigation"
      >
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#hero");
          }}
          className="text-lg font-medium tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          {"< "}
          <span className="text-primary">Abhishek</span>
          {" />"}
        </a>

        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className={cn(
                "text-xs lg:text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
                isActive(link.href) ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
            Developer Zone
          </button>
        </div>

        <button
          type="button"
          className="md:hidden flex h-10 w-10 items-center justify-center rounded border border-border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="container-max py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={cn(
                    "px-3 py-3 text-base transition-colors rounded",
                    isActive(link.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenTerminal();
                }}
                className="flex items-center gap-2 px-3 py-3 text-base text-muted-foreground hover:text-primary transition-colors rounded text-left"
              >
                <Terminal className="h-4 w-4" aria-hidden="true" />
                Developer Zone
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

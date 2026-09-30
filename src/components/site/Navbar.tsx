import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Terminal } from "lucide-react";
import { siteConfig } from "@/data/site";
import { scrollToTarget, setScrollLocked } from "@/components/motion/SmoothScroll";
import { cn } from "@/lib/utils";

const links = [
  { label: "About", id: "about" },
  { label: "Work", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Stack", id: "skills" },
  { label: "Contact", id: "contact" },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

function useKathmanduTime() {
  const format = () =>
    new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Kathmandu",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 15_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useActiveId() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    const els = [...links.map((l) => l.id), "hero"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return active;
}

export function Navbar({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const active = useActiveId();
  const time = useKathmanduTime();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollY } = useScroll();

  // Shrink into a tighter pill once the page is scrolled
  useMotionValueEvent(scrollY, "change", (y) => setCompact(y > 60));

  useEffect(() => {
    setScrollLocked(open);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    if (isHome) scrollToTarget(`#${id}`);
    else navigate("/", { state: { scrollTo: `#${id}` } });
  };

  const indicator = hovered ?? (isHome ? active : null);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] flex justify-center px-4 transition-[padding] duration-700 ease-out",
          compact ? "pt-3" : "pt-4"
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "flex w-full items-center justify-between gap-4 rounded-full border backdrop-blur-xl backdrop-saturate-150 transition-all duration-700 ease-out",
            compact
              ? "max-w-[20rem] border-white/[0.1] bg-background/90 py-1 pl-3 pr-1.5 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.7)] md:max-w-[54rem]"
              : "max-w-6xl border-white/[0.06] bg-background/75 py-2 pl-4 pr-2"
          )}
        >
          <Link
            to="/"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                scrollToTarget(0);
              }
            }}
            className="group flex items-center gap-2.5 py-2 text-sm font-medium tracking-tight"
          >
            <img src={siteConfig.logo} alt="" className="h-6 w-6 rounded-full bg-white p-0.5" />
            <span>Abhishek Sharma</span>
            <span
              className={cn(
                "hidden overflow-hidden whitespace-nowrap font-mono text-[11px] text-muted-foreground transition-all duration-500 ease-out group-hover:text-foreground sm:inline-block",
                compact ? "max-w-0 opacity-0" : "max-w-[5rem] opacity-100"
              )}
            >
              NPT {time}
            </span>
          </Link>

          <ul className="isolate hidden items-center md:flex" onMouseLeave={() => setHovered(null)}>
            {links.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => go(link.id)}
                  onMouseEnter={() => setHovered(link.id)}
                  className={cn(
                    "relative px-3.5 py-1.5 text-[13px] transition-colors duration-300",
                    indicator === link.id ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {indicator === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <Link
                to="/gallery"
                onMouseEnter={() => setHovered("gallery")}
                className={cn(
                  "relative block px-3.5 py-1.5 text-[13px] transition-colors duration-300",
                  hovered === "gallery" || location.pathname === "/gallery" ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {(hovered === "gallery" || (!hovered && location.pathname === "/gallery")) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                Gallery
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenTerminal}
              aria-label="Open terminal"
              className="hidden h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:bg-white/[0.07] hover:text-primary sm:flex"
            >
              <Terminal className="h-4 w-4" />
            </button>
            <a
              href={`mailto:${siteConfig.email}`}
              className={cn(
                "hidden rounded-full bg-foreground text-[13px] font-medium text-background transition-all duration-500 ease-out hover:scale-[1.04] active:scale-[0.97] md:block",
                compact ? "px-3.5 py-1.5" : "px-4 py-2"
              )}
            >
              Let&apos;s talk
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] md:hidden"
            >
              <motion.span
                className="absolute h-px w-4 bg-foreground"
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }}
                transition={{ duration: 0.35, ease }}
              />
              <motion.span
                className="absolute h-px w-4 bg-foreground"
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }}
                transition={{ duration: 0.35, ease }}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col justify-end bg-background/95 px-6 pb-12 pt-28 backdrop-blur-xl md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
          >
            <ul className="space-y-1">
              {[...links, { label: "Gallery", id: "gallery" }].map((link, i) => (
                <li key={link.id} className="overflow-hidden pb-1">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.05, ease }}
                  >
                    {link.id === "gallery" ? (
                      <Link to="/gallery" onClick={() => setOpen(false)} className="block py-1 font-serif text-5xl">
                        {link.label}
                      </Link>
                    ) : (
                      <button onClick={() => go(link.id)} className="block py-1 text-left font-serif text-5xl">
                        {link.label}
                      </button>
                    )}
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div
              className="mt-10 flex items-center justify-between border-t border-border pt-6 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <button
                onClick={() => {
                  setOpen(false);
                  onOpenTerminal();
                }}
                aria-label="Open terminal"
              >
                <Terminal className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

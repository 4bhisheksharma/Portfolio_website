import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Square, X, Terminal as TerminalIcon } from "lucide-react";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { experienceEntries } from "@/data/experience";
import { skillCategories } from "@/data/skills";
import { certifications } from "@/data/certifications";
import { cn } from "@/lib/utils";

interface Line {
  type: "input" | "output" | "error" | "system" | "success" | "dim" | "accent";
  text: string;
}

const COMMANDS = [
  "help",
  "whoami",
  "neofetch",
  "skills",
  "projects",
  "experience",
  "awards",
  "contact",
  "socials",
  "open",
  "ls",
  "pwd",
  "cat",
  "echo",
  "date",
  "history",
  "clear",
  "banner",
  "sudo",
] as const;

const BANNER = [
  "    _    _     _     _     _          _     ",
  "   / \\  | |__ | |__ (_)___| |__   ___| | __ ",
  "  / _ \\ | '_ \\| '_ \\| / __| '_ \\ / _ \\ |/ / ",
  " / ___ \\| |_) | | | | \\__ \\ | | |  __/   <  ",
  "/_/   \\_\\_.__/|_| |_|_|___/_| |_|\\___|_|\\_\\ ",
  "",
];

function bootLines(): Line[] {
  const now = new Date().toLocaleString();
  return [
    { type: "dim", text: `Windows PowerShell · ${now}` },
    { type: "dim", text: "Copyright (C) Abhishek Sharma Portfolio. All rights reserved." },
    { type: "system", text: "" },
    ...BANNER.map((t) => ({ type: "accent" as const, text: t })),
    { type: "success", text: "  Flutter Developer  ·  Nepal  ·  Open to Work" },
    { type: "system", text: "" },
    { type: "dim", text: "  Type 'help' for commands · Tab to autocomplete · Esc to close" },
    { type: "system", text: "" },
  ];
}

function runCommand(raw: string, history: string[]): Line[] | "__CLEAR__" {
  const input = raw.trim();
  if (!input) return [];

  const parts = input.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);
  const arg = args.join(" ");

  switch (cmd) {
    case "help":
      return [
        { type: "accent", text: "╔══════════════════════════════════════════════╗" },
        { type: "accent", text: "║              AVAILABLE COMMANDS              ║" },
        { type: "accent", text: "╚══════════════════════════════════════════════╝" },
        { type: "output", text: "" },
        { type: "success", text: "  Profile" },
        { type: "output", text: "  whoami       About Abhishek" },
        { type: "output", text: "  neofetch     System / profile card" },
        { type: "output", text: "  banner       ASCII banner" },
        { type: "output", text: "" },
        { type: "success", text: "  Portfolio" },
        { type: "output", text: "  skills       Tech stack by category" },
        { type: "output", text: "  projects     Project list  (projects [filter])" },
        { type: "output", text: "  experience   Work history" },
        { type: "output", text: "  awards       Honors & certifications" },
        { type: "output", text: "  contact      Email & phone" },
        { type: "output", text: "  socials      Social links" },
        { type: "output", text: "" },
        { type: "success", text: "  System" },
        { type: "output", text: "  ls / pwd     List sections / path" },
        { type: "output", text: "  open <sec>   Scroll to a page section" },
        { type: "output", text: "  cat resume   Resume path" },
        { type: "output", text: "  echo [text]  Print text" },
        { type: "output", text: "  date         Current date/time" },
        { type: "output", text: "  history      Command history" },
        { type: "output", text: "  clear / cls  Clear screen" },
        { type: "output", text: "  help         This menu" },
      ];

    case "whoami":
      return [
        { type: "accent", text: `  ${siteConfig.name}` },
        { type: "output", text: `  ${siteConfig.title}` },
        { type: "dim", text: `  ${siteConfig.location}` },
        { type: "system", text: "" },
        { type: "output", text: `  ${siteConfig.about.description}` },
        { type: "system", text: "" },
        {
          type: "dim",
          text: `  Role: Flutter Developer @ Digital Pathshala`,
        },
      ];

    case "neofetch": {
      const skillCount = skillCategories.reduce((n, c) => n + c.skills.length, 0);
      return [
        { type: "accent", text: "          ┌─────────────────────────────┐" },
        { type: "accent", text: "   /\\_/\\  │  abhishek@portfolio         │" },
        { type: "accent", text: "  ( o.o ) │─────────────────────────────│" },
        { type: "accent", text: "   > ^ <  │  OS:      Web Portfolio     │" },
        { type: "output", text: "          │  Shell:   PowerShell 7.x    │" },
        { type: "output", text: `          │  Host:    ${siteConfig.name.padEnd(17)}│` },
        { type: "output", text: "          │  Role:    Flutter Dev       │" },
        { type: "output", text: `          │  Loc:     Nepal             │` },
        { type: "output", text: `          │  Projects:${String(projects.length).padStart(4)}              │` },
        { type: "output", text: `          │  Skills:  ${String(skillCount).padStart(4)}              │` },
        { type: "output", text: `          │  Awards:  ${String(certifications.filter((c) => !c.comingSoon).length).padStart(4)}              │` },
        { type: "accent", text: "          │  Status:  Open to Work  ●   │" },
        { type: "accent", text: "          └─────────────────────────────┘" },
        { type: "system", text: "" },
        {
          type: "dim",
          text: "  ▓▓▓▓▓▓▓▓ ░░░░░░░░  theme: neon-green on dark",
        },
      ];
    }

    case "banner":
      return BANNER.map((t) => ({ type: "accent" as const, text: t }));

    case "skills":
      return skillCategories.flatMap((cat) => [
        { type: "success" as const, text: `  [${cat.label}]` },
        {
          type: "output" as const,
          text: `   ${cat.skills.map((s) => s.name).join(" · ")}`,
        },
        { type: "system" as const, text: "" },
      ]);

    case "projects": {
      const filter = args[0]?.toLowerCase();
      const list = filter
        ? projects.filter(
            (p) =>
              p.category === filter ||
              p.title.toLowerCase().includes(filter) ||
              filter === "all"
          )
        : projects;
      if (!list.length) {
        return [{ type: "error", text: `  No projects matching '${filter}'. Try: mobile | web | iot | games` }];
      }
      return [
        {
          type: "dim",
          text: `  Showing ${list.length} project(s)${filter ? ` · filter: ${filter}` : ""}`,
        },
        { type: "system", text: "" },
        ...list.map((p, i) => ({
          type: "output" as const,
          text: `  ${(i + 1).toString().padStart(2)}. ${p.title.padEnd(28)} [${p.category}]`,
        })),
        { type: "system", text: "" },
        { type: "dim", text: "  Tip: projects mobile | projects web | projects iot" },
      ];
    }

    case "experience":
      return experienceEntries.flatMap((e) => [
        { type: "accent" as const, text: `  ${e.title}` },
        { type: "success" as const, text: `  @ ${e.company}  ·  ${e.period}` },
        { type: "dim" as const, text: `  ${e.location}  ·  ${e.status}` },
        { type: "output" as const, text: `  ${e.description}` },
        {
          type: "dim" as const,
          text: `  tech: ${e.technologies.join(", ")}`,
        },
        { type: "system" as const, text: "" },
      ]);

    case "awards":
    case "certs":
    case "certifications":
      return certifications
        .filter((c) => !c.comingSoon)
        .map((c, i) => ({
          type: "output" as const,
          text: `  ${(i + 1).toString().padStart(2)}. ${c.title}`,
        }));

    case "contact":
      return [
        { type: "success", text: "  Contact" },
        { type: "output", text: `  email   ${siteConfig.email}` },
        { type: "output", text: `  phone   ${siteConfig.phone}` },
        { type: "output", text: `  loc     ${siteConfig.location}` },
        { type: "system", text: "" },
        { type: "dim", text: "  Tip: open contact  →  jump to contact section" },
      ];

    case "socials":
      return [
        { type: "output", text: "  github     https://github.com/4bhisheksharma" },
        { type: "output", text: "  linkedin   https://www.linkedin.com/in/4bhisheksharma/" },
        { type: "output", text: "  pub.dev    https://pub.dev/publishers/abhishek-sharma.com.np/packages" },
        { type: "output", text: "  blog       https://blog.abhishek-sharma.com.np/" },
        { type: "output", text: "  app        https://app.abhishek-sharma.com.np/" },
      ];

    case "ls":
      return [
        {
          type: "output",
          text: "  about/  projects/  skills/  experience/  honors/  contact/",
        },
      ];

    case "pwd":
      return [{ type: "output", text: "  ~/portfolio" }];

    case "cat":
      if (arg === "resume" || arg === "cv") {
        return [
          { type: "output", text: `  ${siteConfig.resumeUrl}` },
          { type: "dim", text: "  Use the Download Resume button in About, or open the URL." },
        ];
      }
      return [
        {
          type: "error",
          text: `  cat: ${arg || "missing operand"}: try 'cat resume'`,
        },
      ];

    case "open": {
      const map: Record<string, string> = {
        about: "#about",
        projects: "#projects",
        skills: "#skills",
        tech: "#skills",
        experience: "#experience",
        honors: "#honors-awards",
        awards: "#honors-awards",
        contact: "#contact",
        hero: "#hero",
      };
      const target = map[arg.toLowerCase()];
      if (!target) {
        return [
          {
            type: "error",
            text: `  Usage: open <about|projects|skills|experience|honors|contact>`,
          },
        ];
      }
      const el = document.querySelector(target);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
      return [{ type: "success", text: `  Navigating to ${target} …` }];
    }

    case "echo":
      return [{ type: "output", text: `  ${arg}` }];

    case "date":
      return [{ type: "output", text: `  ${new Date().toString()}` }];

    case "history":
      if (!history.length) return [{ type: "dim", text: "  (empty)" }];
      return history
        .slice()
        .reverse()
        .map((h, i) => ({
          type: "output" as const,
          text: `  ${String(i + 1).padStart(3)}  ${h}`,
        }));

    case "clear":
    case "cls":
      return "__CLEAR__";

    case "sudo":
      return [
        { type: "error", text: "  Nice try. Permission denied — this isn't production 😉" },
      ];

    default:
      return [
        {
          type: "error",
          text: `  CommandNotFoundException: '${cmd}' is not recognized.`,
        },
        {
          type: "dim",
          text: "  Type 'help' for a list of valid commands.",
        },
      ];
  }
}

function autocomplete(partial: string): string | null {
  const [head, ...rest] = partial.split(/\s+/);
  if (rest.length > 0) {
    // sub-completions for open / projects
    if (head.toLowerCase() === "open") {
      const opts = ["about", "projects", "skills", "experience", "honors", "contact"];
      const match = opts.find((o) => o.startsWith((rest[0] || "").toLowerCase()));
      return match ? `open ${match}` : null;
    }
    if (head.toLowerCase() === "projects") {
      const opts = ["all", "mobile", "web", "iot", "games"];
      const match = opts.find((o) => o.startsWith((rest[0] || "").toLowerCase()));
      return match ? `projects ${match}` : null;
    }
    if (head.toLowerCase() === "cat") {
      return "cat resume";
    }
    return null;
  }
  const match = COMMANDS.find((c) => c.startsWith(head.toLowerCase()));
  return match ?? null;
}

interface TerminalModalProps {
  open: boolean;
  onClose: () => void;
}

export function TerminalModal({ open, onClose }: TerminalModalProps) {
  const [lines, setLines] = useState<Line[]>(bootLines);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const [maximized, setMaximized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, open]);

  const reset = useCallback(() => {
    setLines(bootLines());
    setValue("");
    setHistIndex(-1);
  }, []);

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    const cmd = value;
    const result = runCommand(cmd, history);

    if (result === "__CLEAR__") {
      setLines(bootLines());
    } else {
      setLines((prev) => [
        ...prev,
        { type: "input", text: cmd },
        ...result,
      ]);
    }

    if (cmd.trim()) setHistory((h) => [cmd, ...h].slice(0, 80));
    setHistIndex(-1);
    setValue("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const suggestion = autocomplete(value);
      if (suggestion) setValue(suggestion);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIndex + 1, history.length - 1);
      if (history[next]) {
        setHistIndex(next);
        setValue(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIndex - 1;
      if (next < 0) {
        setHistIndex(-1);
        setValue("");
      } else {
        setHistIndex(next);
        setValue(history[next]);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      reset();
    }
  };

  const lineClass = (type: Line["type"]) => {
    switch (type) {
      case "input":
        return "text-primary";
      case "error":
        return "text-red-400";
      case "success":
        return "text-primary";
      case "accent":
        return "text-primary/90";
      case "dim":
      case "system":
        return "text-muted-foreground";
      default:
        return "text-foreground/90";
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            aria-label="Close terminal"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Developer terminal"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={cn(
              "relative z-10 flex flex-col overflow-hidden border border-primary/20 bg-[#0a0b0d] shadow-[0_0_0_1px_rgba(106,255,157,0.08),0_25px_80px_-20px_rgba(0,0,0,0.9)]",
              maximized
                ? "w-full h-full max-h-full rounded-lg"
                : "w-full max-w-3xl h-[min(78vh,640px)] rounded-xl"
            )}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Title bar */}
            <div className="flex items-center gap-3 px-3 sm:px-4 py-2.5 border-b border-white/[0.06] bg-gradient-to-r from-[#12141a] to-[#0e1014] select-none">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="group w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110 flex items-center justify-center"
                  aria-label="Close"
                  title="Close (Esc)"
                >
                  <X className="h-2 w-2 text-black/70 opacity-0 group-hover:opacity-100" />
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="group w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-110 flex items-center justify-center"
                  aria-label="Clear"
                  title="Clear (Ctrl+L)"
                >
                  <Minus className="h-2 w-2 text-black/70 opacity-0 group-hover:opacity-100" />
                </button>
                <button
                  type="button"
                  onClick={() => setMaximized((m) => !m)}
                  className="group w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-110 flex items-center justify-center"
                  aria-label="Maximize"
                  title="Maximize"
                >
                  <Square className="h-1.5 w-1.5 text-black/70 opacity-0 group-hover:opacity-100" />
                </button>
              </div>

              <div className="flex-1 flex items-center justify-center gap-2 min-w-0">
                <TerminalIcon className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
                <span className="text-xs text-muted-foreground font-mono truncate">
                  abhishek@portfolio — PowerShell
                </span>
              </div>

              <span className="text-[10px] text-muted-foreground/50 font-mono hidden sm:inline">
                Esc
              </span>
            </div>

            {/* Body */}
            <div
              ref={bodyRef}
              className="flex-1 overflow-y-auto px-3 sm:px-5 py-4 font-mono text-[11px] sm:text-[13px] leading-relaxed custom-scrollbar"
            >
              {lines.map((line, i) => (
                <div key={i} className={cn("whitespace-pre-wrap break-words", lineClass(line.type))}>
                  {line.type === "input" ? (
                    <>
                      <span className="text-primary/60">PS ~/portfolio&gt; </span>
                      <span>{line.text}</span>
                    </>
                  ) : (
                    line.text || "\u00A0"
                  )}
                </div>
              ))}

              <form onSubmit={submit} className="flex items-center gap-1 mt-0.5">
                <span className="text-primary/60 shrink-0">PS ~/portfolio&gt;</span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  className="flex-1 bg-transparent outline-none text-primary caret-primary min-w-0"
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  aria-label="Terminal command"
                />
                <span
                  className="inline-block w-[7px] h-[1.1em] bg-primary/80 animate-pulse shrink-0"
                  aria-hidden="true"
                />
              </form>
              <div ref={bottomRef} />
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between gap-3 px-3 sm:px-4 py-1.5 border-t border-white/[0.06] bg-[#0e1014] text-[10px] font-mono text-muted-foreground">
              <span>
                <span className="text-primary">●</span> ready
              </span>
              <span className="truncate hidden xs:inline sm:inline">
                Tab autocomplete · ↑↓ history · Ctrl+L clear
              </span>
              <span>{history.length} cmds</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

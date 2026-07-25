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
import { X, Send, Loader2 } from "lucide-react";
import { buildSystemPrompt } from "@/lib/portfolioContext";
import { streamChatCompletion, type ChatMessage } from "@/lib/openrouter";
import { siteConfig } from "@/data/site";
import { LottieBot } from "@/components/common/LottieBot";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content: `Hi! I'm Abhishek's portfolio assistant. Ask me about his skills, projects, experience, awards, or how to get in touch.`,
};

function renderMarkdown(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br />");
}

export function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    setError(null);
    setInput("");

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text };
    const assistantId = crypto.randomUUID();

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    const apiMessages: ChatMessage[] = [
      { role: "system", content: buildSystemPrompt() },
      ...messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: text },
    ];

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    let streamed = "";
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    try {
      await streamChatCompletion(
        apiMessages,
        (chunk) => {
          streamed += chunk;
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: streamed } : m))
          );
        },
        abortRef.current.signal
      );

      if (!streamed.trim()) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: "Sorry, I couldn't generate a response. Please try again." }
              : m
          )
        );
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;

      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }, [input, loading, messages]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void sendMessage();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  const handleClose = () => {
    abortRef.current?.abort();
    setOpen(false);
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      {/* Floating trigger */}
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-5 right-5 z-[90] bg-transparent p-0 border-0 shadow-none hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Open AI assistant"
            title="Ask about Abhishek"
          >
            <LottieBot size={56} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-5 right-5 z-[90] flex w-[min(100vw-2.5rem,400px)] flex-col overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]"
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio AI assistant"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3 bg-secondary/50">
              <LottieBot size={32} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Ask about {siteConfig.name.split(" ")[0]}</p>
                <p className="text-xs text-muted-foreground">Portfolio AI assistant</p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 max-h-[min(60vh,480px)] min-h-[280px] custom-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-secondary text-foreground rounded-bl-md"
                    )}
                  >
                    {msg.role === "assistant" ? (
                      msg.content ? (
                        <span
                          dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                        />
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          Thinking…
                        </span>
                      )
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}

              {error && (
                <p className="text-xs text-red-400 text-center px-2" role="alert">
                  {error}
                </p>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={onSubmit} className="border-t border-border p-3 bg-background/80">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Ask about skills, projects, experience…"
                  rows={1}
                  disabled={loading}
                  className="flex-1 resize-none rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/30 disabled:opacity-50 min-h-[42px] max-h-28"
                  aria-label="Message"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground disabled:opacity-40 hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Send message"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-[10px] text-muted-foreground text-center">
                Answers are based on portfolio data only
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}

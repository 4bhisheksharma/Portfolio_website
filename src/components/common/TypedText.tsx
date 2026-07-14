import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TypedTextProps {
  strings: string[];
  className?: string;
}

export function TypedText({ strings, className }: TypedTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(strings[0]);
      return;
    }

    const currentString = strings[stringIndex];
    const typeSpeed = isDeleting ? 30 : 50;
    const pauseTime = isDeleting ? 500 : 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentString.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 === currentString.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setDisplayText(currentString.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setStringIndex((prev) => (prev + 1) % strings.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, stringIndex, strings, prefersReducedMotion]);

  return (
    <span className={className} aria-live="polite">
      {displayText}
      <span className="animate-pulse text-primary" aria-hidden="true">
        |
      </span>
    </span>
  );
}

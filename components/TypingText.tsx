"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export function TypingText({ text, speed = 32, className }: TypingTextProps) {
  // Progress is tied to the animated text, so it restarts from 0 when
  // `text` changes, without a synchronous setState in the effect.
  const [progress, setProgress] = useState({ text, count: 0 });
  const count = progress.text === text ? progress.count : 0;
  const displayed = text.slice(0, count);
  const done = count >= text.length;

  useEffect(() => {
    // Reduced motion: show the whole text at once.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => setProgress({ text, count: text.length }), 0);
      return () => clearTimeout(id);
    }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setProgress({ text, count: i });
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <span className={className}>
      {/* Full text for screen readers, visually hidden */}
      <span className="sr-only">{text}</span>
      {/* Visible animation, hidden from screen readers */}
      <span aria-hidden="true">
        {displayed}
        {!done && (
          <span
            className="ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-px bg-current align-middle animate-[blink_0.75s_step-end_infinite]"
          />
        )}
      </span>
    </span>
  );
}

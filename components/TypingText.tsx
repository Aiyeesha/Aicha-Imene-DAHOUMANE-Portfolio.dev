"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export function TypingText({ text, speed = 32, className }: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <span className={className}>
      {/* Texte complet pour les lecteurs d'écran — invisible visuellement */}
      <span className="sr-only">{text}</span>
      {/* Animation visible — masquée aux lecteurs d'écran */}
      <span aria-hidden="true">
        {displayed}
        {!done && (
          <span
            className="ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-[1px] bg-current align-middle animate-[blink_0.75s_step-end_infinite]"
          />
        )}
      </span>
    </span>
  );
}

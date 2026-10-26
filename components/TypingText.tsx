"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export function TypingText({ text, speed = 32, className }: TypingTextProps) {
  // Progression rattachée au texte animé : quand `text` change, le compteur
  // repart de 0 par dérivation, sans setState synchrone dans l'effet —
  // audit 2026-10-23 (PERF-5).
  const [progress, setProgress] = useState({ text, count: 0 });
  const count = progress.text === text ? progress.count : 0;
  const displayed = text.slice(0, count);
  const done = count >= text.length;

  useEffect(() => {
    // Mouvement réduit (audit 2026-10-25) : texte affiché d'un coup.
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
      {/* Texte complet pour les lecteurs d'écran — invisible visuellement */}
      <span className="sr-only">{text}</span>
      {/* Animation visible — masquée aux lecteurs d'écran */}
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

"use client";
// components/PresentationMode.tsx
// ---------------------------------
// Mode présentation — défile automatiquement les sections clés de la page
// d'accueil avec des transitions élégantes. Utile en entretien ou salon.
//
// Activation : bouton flottant ou raccourci Alt+P
// Sections   : #hero → #skills → #projects → #blog → #contact
// Comportement :
//   - Passe à la section suivante toutes les INTERVAL ms
//   - Barre de progression visible en bas de l'écran
//   - Touche Escape ou clic sur le bouton pour quitter
//   - Respecte prefers-reduced-motion (défilement instantané)

import { useEffect, useRef, useState, useCallback } from "react";

// ── Configuration ────────────────────────────────────────────────────────────

const INTERVAL = 8000; // 8 secondes par section

/** Sections dans l'ordre de présentation (IDs dans la page). */
const SECTIONS = [
  "hero",
  "skills",
  "experience",
  "services",
  "projects",
  "blog",
  "contact",
];

// ── Labels i18n minimaux ─────────────────────────────────────────────────────

const LABELS = {
  en: {
    start:    "Presentation mode",
    exit:     "Exit presentation",
    next:     "Next",
    prev:     "Previous",
    of:       "of",
    shortcut: "Alt+P",
    tooltip:  "Start presentation mode (Alt+P)",
  },
  fr: {
    start:    "Mode présentation",
    exit:     "Quitter",
    next:     "Suivant",
    prev:     "Précédent",
    of:       "sur",
    shortcut: "Alt+P",
    tooltip:  "Lancer le mode présentation (Alt+P)",
  },
};

// ── Composant ─────────────────────────────────────────────────────────────────

type Props = {
  locale?: "en" | "fr";
};

export default function PresentationMode({ locale = "en" }: Props) {
  const l = LABELS[locale];

  const [active,   setActive]   = useState(false);
  const [step,     setStep]     = useState(0);
  const [progress, setProgress] = useState(0);

  const timerRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const rafRef      = useRef<number | null>(null);
  const startRef    = useRef<number>(0);
  const reducedRef  = useRef(false);

  // Détecter prefers-reduced-motion
  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  /** Scroller vers une section par son ID. */
  const scrollTo = useCallback((index: number) => {
    const id  = SECTIONS[index];
    const el  = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reducedRef.current ? "instant" : "smooth", block: "start" });
  }, []);

  /** Aller à la section suivante (ou fermer si on est à la fin). */
  const goNext = useCallback(() => {
    setStep((prev) => {
      const next = prev + 1;
      if (next >= SECTIONS.length) {
        setActive(false);
        return 0;
      }
      scrollTo(next);
      return next;
    });
    setProgress(0);
    startRef.current = performance.now();
  }, [scrollTo]);

  /** Aller à la section précédente. */
  const goPrev = useCallback(() => {
    setStep((prev) => {
      const next = Math.max(0, prev - 1);
      scrollTo(next);
      return next;
    });
    setProgress(0);
    startRef.current = performance.now();
  }, [scrollTo]);

  /** Démarrer le mode présentation. */
  const start = useCallback(() => {
    setStep(0);
    setProgress(0);
    setActive(true);
    scrollTo(0);
  }, [scrollTo]);

  /** Quitter le mode présentation. */
  const stop = useCallback(() => {
    setActive(false);
    setStep(0);
    setProgress(0);
  }, []);

  // Barre de progression et avancement automatique
  useEffect(() => {
    if (!active) {
      if (rafRef.current)   cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    startRef.current = performance.now();

    const tick = () => {
      const elapsed = performance.now() - startRef.current;
      const pct     = Math.min((elapsed / INTERVAL) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current  = requestAnimationFrame(tick);
    timerRef.current = setInterval(() => {
      goNext();
    }, INTERVAL);

    return () => {
      if (rafRef.current)   cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [active, step, goNext]);

  // Raccourci Alt+P et Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "p") { e.preventDefault(); active ? stop() : start(); }
      if (e.key === "Escape" && active)   stop();
      if (e.key === "ArrowRight" && active) { goNext(); }
      if (e.key === "ArrowLeft"  && active) { goPrev(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, start, stop, goNext, goPrev]);

  return (
    <>
      {/* ── Bouton flottant de démarrage (uniquement quand inactif) ─────────── */}
      {!active && (
        <button
          onClick={start}
          title={l.tooltip}
          aria-label={l.tooltip}
          className="fixed bottom-20 right-6 z-40 flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-[#0f1729] px-4 py-2 text-xs font-medium text-muted-2 shadow-md hover:bg-black/5 dark:hover:bg-white/5 soft-ring transition-colors"
        >
          {/* Icône lecture */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
            <polygon points="3,1 13,7 3,13" />
          </svg>
          {l.start}
          <kbd className="hidden sm:inline rounded bg-black/5 dark:bg-white/10 px-1.5 py-0.5 font-mono text-[10px]">
            {l.shortcut}
          </kbd>
        </button>
      )}

      {/* ── Overlay de contrôle (visible uniquement en mode actif) ──────────── */}
      {active && (
        <>
          {/* Barre de progression */}
          <div
            className="fixed bottom-0 left-0 z-50 h-1 bg-cyan-400/80 transition-none"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          />

          {/* Barre de contrôles */}
          <div className="fixed bottom-2 left-1/2 z-50 -translate-x-1/2 flex items-center gap-3 rounded-full border border-black/15 dark:border-white/15 bg-white/90 dark:bg-[#0f1729]/90 backdrop-blur px-4 py-2 shadow-xl text-sm">

            {/* Précédent */}
            <button
              onClick={goPrev}
              disabled={step === 0}
              aria-label={l.prev}
              className="rounded-full p-1 hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 soft-ring transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <polygon points="12,2 4,8 12,14" />
              </svg>
            </button>

            {/* Compteur */}
            <span className="tabular-nums text-xs text-muted-2 min-w-[48px] text-center">
              {step + 1} {l.of} {SECTIONS.length}
            </span>

            {/* Suivant */}
            <button
              onClick={goNext}
              aria-label={l.next}
              className="rounded-full p-1 hover:bg-black/5 dark:hover:bg-white/10 soft-ring transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <polygon points="4,2 12,8 4,14" />
              </svg>
            </button>

            <span className="mx-1 h-4 w-px bg-black/10 dark:bg-white/15" aria-hidden="true" />

            {/* Quitter */}
            <button
              onClick={stop}
              aria-label={l.exit}
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium hover:bg-black/5 dark:hover:bg-white/10 soft-ring transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                <line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" strokeWidth="2" />
                <line x1="11" y1="1" x2="1"  y2="11" stroke="currentColor" strokeWidth="2" />
              </svg>
              {l.exit}
              <kbd className="hidden sm:inline rounded bg-black/5 dark:bg-white/10 px-1 py-0.5 font-mono text-[10px]">Esc</kbd>
            </button>
          </div>
        </>
      )}
    </>
  );
}

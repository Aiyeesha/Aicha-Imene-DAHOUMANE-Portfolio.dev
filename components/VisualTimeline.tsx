"use client";

// VisualTimeline.tsx
// ------------------
// Timeline verticale animée pour la section "Parcours" de la page About.
// Données : tableau de paragraphes texte depuis Supabase.
//
// Comportement :
// - Chaque étape entre dans le viewport → animation entrée (slide + fade)
// - Cercle numéroté gradient cyan, ligne de connexion qui "se dessine" vers le bas
// - Carte avec fond subtil, bordure, shadow légère
// - prefers-reduced-motion : animations désactivées, rendu statique
// - Accessible : ol > li sémantique, aria-label sur la liste

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// ── Variants Framer Motion ──────────────────────────────────────────────

// Carte : glisse de la droite + fade
const cardVariants = {
  hidden:  { opacity: 0, x: 16, y: 8 },
  visible: { opacity: 1, x: 0,  y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

// Cercle : zoom depuis 0
const circleVariants = {
  hidden:  { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

// Ligne verticale : grandit vers le bas (scaleY 0 → 1, origin top)
const lineVariants = {
  hidden:  { scaleY: 0 },
  visible: { scaleY: 1,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: 0.15 },
  },
};

// ── Sous-composant : étape individuelle ──────────────────────────────────
function TimelineStep({
  text,
  index,
  isLast,
  shouldReduce,
}: {
  text: string;
  index: number;
  isLast: boolean;
  shouldReduce: boolean | null;
}) {
  const ref = useRef<HTMLLIElement>(null);

  // Déclenché une seule fois quand le li entre dans le viewport
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  // Animate uniquement si réduction non demandée
  const animate = shouldReduce ? "visible" : (inView ? "visible" : "hidden");

  return (
    <li ref={ref} className="flex gap-4 md:gap-6">

      {/* ── Colonne gauche — cercle + ligne ────────────────────────────── */}
      <div className="flex flex-col items-center flex-shrink-0">

        {/* Cercle numéroté — gradient cyan/bleu */}
        <motion.div
          variants={shouldReduce ? {} : circleVariants}
          initial="hidden"
          animate={animate}
          className="
            relative flex h-10 w-10 shrink-0 items-center justify-center
            rounded-full
            bg-gradient-to-br from-cyan-400/20 to-blue-500/20
            border border-cyan-500/40 dark:border-cyan-400/30
            text-sm font-bold font-display
            text-cyan-700 dark:text-cyan-300
            shadow-sm shadow-cyan-500/10
            z-10
          "
          aria-hidden="true"
        >
          {index + 1}

          {/* Halo pulsant discret sur la dernière étape "en cours" */}
          {isLast && !shouldReduce && (
            <span className="absolute inset-0 rounded-full animate-ping bg-cyan-400/20 motion-reduce:animate-none" />
          )}
        </motion.div>

        {/* Ligne de connexion — grandit vers le bas */}
        {!isLast && (
          <motion.div
            variants={shouldReduce ? {} : lineVariants}
            initial="hidden"
            animate={animate}
            style={{ originY: 0 }}
            className="
              mt-1 w-px flex-1 min-h-[2.5rem]
              bg-gradient-to-b from-cyan-500/40 to-cyan-500/10
              dark:from-cyan-400/30 dark:to-cyan-400/5
            "
            aria-hidden="true"
          />
        )}
      </div>

      {/* ── Colonne droite — carte de contenu ──────────────────────────── */}
      <motion.div
        variants={shouldReduce ? {} : cardVariants}
        initial="hidden"
        animate={animate}
        className={[
          "flex-1 rounded-2xl border p-4 md:p-5",
          // Fond subtil différencié selon la position
          index % 2 === 0
            ? "bg-black/[0.02] dark:bg-white/[0.02]"
            : "bg-cyan-500/[0.03] dark:bg-cyan-400/[0.03]",
          // Bordure légère
          "border-black/8 dark:border-white/8",
          // Espacement avec la prochaine étape
          isLast ? "mb-0" : "mb-6",
        ].join(" ")}
      >
        {/* Texte de l'étape */}
        <p className="text-sm leading-relaxed text-muted">
          {text}
        </p>
      </motion.div>

    </li>
  );
}

// ── Composant principal ────────────────────────────────────────────────────
export default function VisualTimeline({
  steps,
  ariaLabel,
}: {
  steps: string[];
  ariaLabel?: string;
}) {
  const shouldReduce = useReducedMotion();

  if (!steps.length) return null;

  return (
    <ol
      className="mt-6 space-y-0 list-none"
      aria-label={ariaLabel}
    >
      {steps.map((text, i) => (
        <TimelineStep
          key={i}
          text={text}
          index={i}
          isLast={i === steps.length - 1}
          shouldReduce={shouldReduce}
        />
      ))}
    </ol>
  );
}

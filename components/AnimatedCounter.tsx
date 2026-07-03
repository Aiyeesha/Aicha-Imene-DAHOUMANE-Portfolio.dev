"use client";

// AnimatedCounter.tsx
// -------------------
// Compteur animé (0 → valeur cible) déclenché à l'entrée dans le viewport.
// Utilise Framer Motion useSpring pour un effet fluide et naturel.
//
// Accessibilité : si l'utilisateur préfère prefers-reduced-motion,
// la valeur finale est affichée directement sans animation.
//
// Usage :
//   <AnimatedCounter value={90} />           → "90"
//   <AnimatedCounter value={57375} />        → "57 375" (locale formatting)
//   <AnimatedCounter value={30} suffix="%" /> → "30%"

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring, useInView, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";

type Props = {
  /** Valeur cible à atteindre */
  value: number;
  /** Suffixe affiché après le nombre (ex: "%", "+") */
  suffix?: string;
  className?: string;
};

export default function AnimatedCounter({ value, suffix = "", className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduce = useReducedMotion();
  const locale = useLocale();
  const intlLocale = locale === "fr" ? "fr-FR" : locale === "es" ? "es-ES" : "en-US";

  // Déclenchement unique quand le composant entre dans le viewport
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  // Valeur de mouvement + spring physique (stiffness/damping pour naturel)
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18 });

  // SSR émet la valeur finale → Google indexe les vrais chiffres, pas "0".
  // L'animation repart de 0 → value quand l'élément entre dans le viewport.
  const [display, setDisplay] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Synchronisation spring → display (actif dès le premier rendu client)
  useEffect(() => {
    return spring.on("change", (v) => setDisplay(Math.round(v)));
  }, [spring]);

  // Démarrage de l'animation quand le composant est visible (une seule fois)
  useEffect(() => {
    if (shouldReduce) {
      setDisplay(value);
      return;
    }
    if (inView && !hasAnimated) {
      setHasAnimated(true);
      setDisplay(0); // remet display à 0 avant que le spring prenne la main
      mv.set(0);     // s'assure que mv est à 0 (valeur initiale)
      mv.set(value); // spring anime 0 → value
    }
  }, [inView, shouldReduce, value, mv, hasAnimated]);

  // aria-label expose la valeur finale statique aux lecteurs d'écran.
  // Sans cela, le SR lirait "0" au chargement (valeur initiale de l'animation)
  // ou annoncerait chaque nombre intermédiaire pendant l'animation spring.
  //
  // role="img" is required because aria-label is prohibited on generic <span>
  // elements (no implicit ARIA role) per ARIA 1.2 — axe rule aria-prohibited-attr.
  // role="img" provides a valid landmark for the aria-label to describe.
  const ariaLabel = `${value.toLocaleString(intlLocale)}${suffix}`;

  return (
    <span ref={ref} className={className} role="img" aria-label={ariaLabel}>
      {/* aria-hidden masque les valeurs intermédiaires — le SR utilise aria-label */}
      <span aria-hidden="true">{display.toLocaleString(intlLocale)}{suffix}</span>
    </span>
  );
}

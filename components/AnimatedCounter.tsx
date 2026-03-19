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

  // Déclenchement unique quand le composant entre dans le viewport
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  // Valeur de mouvement + spring physique (stiffness/damping pour naturel)
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18 });

  // Valeur affichée (entier arrondi)
  const [display, setDisplay] = useState(() => (shouldReduce ? value : 0));

  // Synchronisation spring → display
  useEffect(() => {
    return spring.on("change", (v) => setDisplay(Math.round(v)));
  }, [spring]);

  // Démarrage de l'animation quand le composant est visible
  useEffect(() => {
    if (shouldReduce) {
      setDisplay(value);
      return;
    }
    if (inView) {
      mv.set(value);
    }
  }, [inView, shouldReduce, value, mv]);

  // aria-label expose la valeur finale statique aux lecteurs d'écran.
  // Sans cela, le SR lirait "0" au chargement (valeur initiale de l'animation)
  // ou annoncerait chaque nombre intermédiaire pendant l'animation spring.
  const ariaLabel = `${value.toLocaleString()}${suffix}`;

  return (
    <span ref={ref} className={className} aria-label={ariaLabel}>
      {/* aria-hidden masque les valeurs intermédiaires — le SR utilise aria-label */}
      <span aria-hidden="true">{display.toLocaleString()}{suffix}</span>
    </span>
  );
}

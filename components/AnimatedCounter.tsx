"use client";

// AnimatedCounter.tsx
// -------------------
// Counter that animates from 0 to its value when it enters the viewport
// (Framer Motion useSpring). With reduced motion, the final value is shown.
//
//   <AnimatedCounter value={57375} />        → "57 375" (locale formatting)
//   <AnimatedCounter value={30} suffix="%" /> → "30%"

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring, useInView, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";

type Props = {
  /** Target value */
  value: number;
  /** Suffix shown after the number (e.g. "%", "+") */
  suffix?: string;
  className?: string;
};

export default function AnimatedCounter({ value, suffix = "", className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduce = useReducedMotion();
  const locale = useLocale();
  const intlLocale = locale === "fr" ? "fr-FR" : locale === "es" ? "es-ES" : "en-US";

  // Fire once when the component enters the viewport
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  // Motion value + spring
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18 });

  // SSR renders the final value, so crawlers index the real figure, not "0";
  // the animation restarts from 0 when the element comes into view.
  const [display, setDisplay] = useState(value);
  // A ref, not state: it only ensures the animation runs once.
  const hasAnimated = useRef(false);

  // Spring → display sync
  useEffect(() => {
    return spring.on("change", (v) => setDisplay(Math.round(v)));
  }, [spring]);

  // Start the animation once, when visible. With reduced motion the final
  // value is derived during render instead.
  useEffect(() => {
    if (shouldReduce) return;
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      spring.jump(0); // reset the spring (and display) to 0
      mv.set(0);
      mv.set(value);  // animate 0 → value
    }
  }, [inView, shouldReduce, value, mv, spring]);

  const shown = shouldReduce ? value : display;

  // Screen readers get the final value through aria-label instead of "0" or
  // every intermediate number. role="img" is needed: aria-label is not
  // allowed on a generic <span> (ARIA 1.2).
  const ariaLabel = `${value.toLocaleString(intlLocale)}${suffix}`;

  return (
    <span ref={ref} className={className} role="img" aria-label={ariaLabel}>
      {/* Intermediate values are hidden from screen readers */}
      <span aria-hidden="true">{shown.toLocaleString(intlLocale)}{suffix}</span>
    </span>
  );
}

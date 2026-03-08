"use client";

// Reveal.tsx
// ----------
// Reveals content with a directional fade animation when it enters the viewport.
// Powered by Framer Motion (useInView + motion.div).
//
// Props:
//   from      : direction of the entrance — "bottom" (default), "left", or "right"
//   delayMs   : optional stagger delay in milliseconds
//   className : forwarded to the wrapper div
//
// Accessibility:
// - Calls useReducedMotion() — if the user prefers reduced motion, animation is skipped
//   entirely and the component renders as a plain <div>.

import { ReactNode, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// Initial offset per direction (pixels)
const INITIAL: Record<"bottom" | "left" | "right", { opacity: number; x?: number; y?: number }> = {
  bottom: { opacity: 0, y: 14 },
  left:   { opacity: 0, x: -24 },
  right:  { opacity: 0, x:  24 },
};

export default function Reveal({
  children,
  className = "",
  delayMs = 0,
  from = "bottom",
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  /** Direction from which the element enters the viewport. Default: "bottom". */
  from?: "bottom" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduce = useReducedMotion();
  // Trigger when 5% of the element is visible; only fires once
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  // Skip animation for users who prefer reduced motion
  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={INITIAL[from]}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.55,
        ease: "easeOut",
        delay: delayMs / 1000,
      }}
    >
      {children}
    </motion.div>
  );
}

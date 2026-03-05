"use client";

// Reveal.tsx
// ----------
// Reveals content with a fade + translate-up animation when it enters the viewport.
// Powered by Framer Motion (useInView + motion.div).
//
// Accessibility:
// - Calls useReducedMotion() — if the user prefers reduced motion, animation is skipped
//   entirely and the component renders as a plain <div>.

import { ReactNode, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export default function Reveal({
  children,
  className = "",
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
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
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
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

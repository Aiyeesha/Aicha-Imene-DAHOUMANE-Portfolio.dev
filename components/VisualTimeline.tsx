"use client";

// VisualTimeline.tsx
// ------------------
// Animated vertical timeline for the "Journey" section of the About page
// (paragraphs from Supabase). Steps slide and fade in on scroll, the
// connecting line "draws" downwards; static with reduced motion. Semantic
// ol > li with an aria-label.
//
// Hydration: useReducedMotion() is null on the server and true/false on the
// client, so it must never change the rendered markup (elements, variants,
// initial styles). It only picks the animation target after mount; the
// reduced-motion rendering itself is handled by MotionConfig and CSS
// (motion-reduce:*).

import { useRef } from "react";
import { MotionConfig, motion, useInView, useReducedMotion } from "framer-motion";

// ── Framer Motion variants ──────────────────────────────────────────────

// Card: slide in from the right + fade
const cardVariants = {
  hidden:  { opacity: 0, x: 16, y: 8 },
  visible: { opacity: 1, x: 0,  y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

// Circle: scale up from 0
const circleVariants = {
  hidden:  { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

// Vertical line: grows downwards (scaleY 0 → 1 from the top)
const lineVariants = {
  hidden:  { scaleY: 0 },
  visible: { scaleY: 1,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: 0.15 },
  },
};

// ── Single step ──────────────────────────────────────────────────────────
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

  // Fire once when the <li> enters the viewport
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  // No animation with reduced motion
  const animate = shouldReduce ? "visible" : (inView ? "visible" : "hidden");

  return (
    <li ref={ref} className="flex gap-4 md:gap-6">

      {/* ── Left column: circle + line ──────────────────────────────── */}
      <div className="flex flex-col items-center shrink-0">

        {/* Numbered circle */}
        <motion.div
          variants={circleVariants}
          initial="hidden"
          animate={animate}
          className="
            relative flex h-10 w-10 shrink-0 items-center justify-center
            rounded-full
            bg-linear-to-br from-cyan-400/20 to-blue-500/20
            border border-cyan-500/40 dark:border-cyan-400/30
            text-sm font-bold font-display
            text-cyan-700 dark:text-cyan-300
            shadow-xs shadow-cyan-500/10
            z-10
          "
          aria-hidden="true"
        >
          {index + 1}

          {/* Subtle pulse on the last ("current") step */}
          {isLast && (
            <span className="absolute inset-0 rounded-full animate-ping bg-cyan-400/20 motion-reduce:hidden" />
          )}
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate={animate}
            style={{ originY: 0 }}
            className="
              mt-1 w-px flex-1 min-h-10
              bg-linear-to-b from-cyan-500/40 to-cyan-500/10
              dark:from-cyan-400/30 dark:to-cyan-400/5
            "
            aria-hidden="true"
          />
        )}
      </div>

      {/* ── Right column: content card ───────────────────────────────── */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={animate}
        className={[
          "flex-1 rounded-2xl border p-4 md:p-5",
          // Alternating subtle background
          index % 2 === 0
            ? "bg-black/2 dark:bg-white/2"
            : "bg-cyan-500/3 dark:bg-cyan-400/3",
          // Light border
          "border-black/8 dark:border-white/8",
          // Gap before the next step
          isLast ? "mb-0" : "mb-6",
        ].join(" ")}
      >
        {/* Step text */}
        <p className="text-sm leading-relaxed text-muted">
          {text}
        </p>
      </motion.div>

    </li>
  );
}

// ── Main component ────────────────────────────────────────────────────────
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
    // reducedMotion="user": skips transform animations when the OS setting
    // is on, so steps simply appear in place.
    <MotionConfig reducedMotion="user">
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
    </MotionConfig>
  );
}

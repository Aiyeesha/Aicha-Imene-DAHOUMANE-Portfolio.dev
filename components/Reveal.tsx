"use client";

// Reveal.tsx
// ----------
// Reveals content with a directional fade animation when it enters the viewport.
// Powered by CSS transitions + native IntersectionObserver — zero Framer Motion.
//
// Why not Framer Motion here?
//   Framer Motion is ~99 KB parsed / ~25 KB gzip. Reveal is used on every page
//   (about, blog, certifications…) for simple fade-in animations. Using Framer
//   just for opacity + translateY is excessive — the native API achieves the same
//   result at zero bundle cost. Framer Motion is kept in track-aware-hero.tsx
//   where AnimatePresence, useScroll and useTransform are genuinely needed.
//
// Mechanism:
//   - SSR: element renders fully visible (no layout shift on first paint)
//   - JS mount: if element is below fold → set data-animating → CSS hides it
//   - IntersectionObserver fires → set data-visible → CSS transition plays
//   - prefers-reduced-motion: animation skipped (both CSS media query + JS guard)
//   - --reveal-delay: set via style.setProperty() (no JSX style prop) so that
//     the dynamic transition delay doesn't trigger the no-inline-styles lint rule.
//
// CSS rules live in globals.css (search "Reveal — animation scroll-triggered").

import { type ReactNode, useEffect, useRef, useState } from "react";

type Direction = "bottom" | "left" | "right";

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
  from?: Direction;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [animating, setAnimating] = useState(false);
  const [visible,   setVisible]   = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Honour prefers-reduced-motion — CSS media query also covers this,
    // but the JS guard avoids setting up the observer unnecessarily.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // If the element is already in (or near) the viewport at mount time,
    // skip the animation to avoid a brief opacity-0 flash for above-fold content.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.05) return;

    // Set the transition delay via DOM API — avoids the JSX style prop while
    // still passing a dynamic value to the CSS custom property.
    if (delayMs > 0) {
      el.style.setProperty("--reveal-delay", `${delayMs}ms`);
    }

    // Element is below fold — activate CSS hiding and wait for viewport entry
    setAnimating(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-5% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <div
      ref={ref}
      className={className}
      data-animating={animating ? "" : undefined}
      data-visible={visible ? "" : undefined}
      data-from={from}
    >
      {children}
    </div>
  );
}

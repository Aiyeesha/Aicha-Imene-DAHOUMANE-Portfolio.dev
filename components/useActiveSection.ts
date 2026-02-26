"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * useActiveSection
 * ----------------
 * Scroll-spy for anchored sections with fixed navbar:
 * - Primary: IntersectionObserver (cheap)
 * - Secondary: scroll-based fallback (accurate) when IO doesn't yield a stable result.
 *
 * Tips:
 * - Tune rootMargin / thresholds for your header height and desired feel.
 */
export default function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");
  const ids = useMemo(() => sectionIds.filter(Boolean), [sectionIds]);

  // Keep last known IO result; helps avoid flicker during fast scroll.
  const lastIoId = useRef<string>(activeId);

  useEffect(() => {
    if (ids.length === 0) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    // ---- IntersectionObserver (primary) ----
    let obs: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      obs = new IntersectionObserver(
        (entries) => {
          // Prefer entries that are intersecting and closest to the top
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => {
              const aTop = (a.target as HTMLElement).getBoundingClientRect().top;
              const bTop = (b.target as HTMLElement).getBoundingClientRect().top;
              return Math.abs(aTop) - Math.abs(bTop);
            })[0];

          const id = visible?.target?.id;
          if (id) {
            lastIoId.current = id;
            setActiveId(id);
          }
        },
        {
          root: null,
          // With a fixed navbar, the "active zone" is slightly below the top.
          // The negative bottom margin prevents distant sections from taking over too early.
          rootMargin: "-20% 0px -70% 0px",
          threshold: [0.01, 0.05, 0.1, 0.2, 0.35]
        }
      );

      elements.forEach((el) => obs!.observe(el));
    }

    // ---- Scroll fallback (secondary) ----
    // Picks the section whose top is the closest to a target line.
    const onScroll = () => {
      const targetY = 120; // px from viewport top (below fixed navbar)
      let bestId = lastIoId.current || ids[0];
      let bestDist = Number.POSITIVE_INFINITY;

      for (const el of elements) {
        const top = el.getBoundingClientRect().top;
        const dist = Math.abs(top - targetY);
        // Only consider sections that are not too far below the fold
        // (avoids jumping to a section that hasn't entered viewport at all).
        if (top < window.innerHeight * 0.85 && dist < bestDist) {
          bestDist = dist;
          bestId = el.id;
        }
      }

      if (bestId && bestId !== activeId) setActiveId(bestId);
    };

    // Throttle-ish via rAF
    let raf = 0;
    const onScrollRaf = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(onScroll);
    };

    window.addEventListener("scroll", onScrollRaf, { passive: true });
    window.addEventListener("resize", onScrollRaf);

    // Initialize
    onScroll();

    return () => {
      if (obs) obs.disconnect();
      window.removeEventListener("scroll", onScrollRaf);
      window.removeEventListener("resize", onScrollRaf);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join("|")]);

  return activeId;
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Rect = { left: number; width: number };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/**
 * NavbarPill
 * ----------
 * Animated "pill" indicator behind the active nav link.
 * It measures the active <a> element and positions an absolutely positioned div.
 */
export default function NavbarPill({
  activeId,
  containerId
}: {
  activeId: string;
  containerId: string;
}) {
  const [rect, setRect] = useState<Rect | null>(null);
  const rafRef = useRef<number>(0);

  const selector = useMemo(() => `a[data-section="${activeId}"]`, [activeId]);

  const measure = () => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const link = container.querySelector(selector) as HTMLAnchorElement | null;
    if (!link) return;

    const c = container.getBoundingClientRect();
    const r = link.getBoundingClientRect();
    const left = r.left - c.left;
    const width = r.width;

    setRect({ left, width });
  };

  useEffect(() => {
    const onResize = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector]);

  if (!rect) return null;

  return (
    <div
      className="nav-pill pointer-events-none absolute top-1/2 -translate-y-1/2 h-9 transition-all duration-300 ease-out"
      style={{
        left: `${clamp(rect.left - 8, 0, 10_000)}px`,
        width: `${clamp(rect.width + 16, 44, 10_000)}px`
      }}
      aria-hidden="true"
    />
  );
}

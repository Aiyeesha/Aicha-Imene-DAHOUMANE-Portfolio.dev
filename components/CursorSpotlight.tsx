"use client";

import { useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch-only devices and with reduced motion (the halo trailing
    // the cursor is motion).
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    const SIZE = 700;
    const HALF = SIZE / 2;

    let rafId = 0;
    let targetX = -HALF;
    let targetY = -HALF;
    let curX = -HALF;
    let curY = -HALF;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX - HALF;
      targetY = e.clientY - HALF;
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    // Lerp for a smooth magnetic lag. The loop stops once the halo catches up
    // and restarts on the next mousemove.
    const tick = () => {
      curX += (targetX - curX) * 0.10;
      curY += (targetY - curY) * 0.10;
      el.style.transform = `translate(${curX}px,${curY}px)`;
      if (Math.abs(targetX - curX) < 0.5 && Math.abs(targetY - curY) < 0.5) {
        rafId = 0;
        return;
      }
      rafId = requestAnimationFrame(tick);
    };

    el.style.opacity = "1";
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 700,
        height: 700,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0,
        willChange: "transform",
        background:
          "radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 68%)",
        transform: "translate(-350px,-350px)",
      }}
    />
  );
}

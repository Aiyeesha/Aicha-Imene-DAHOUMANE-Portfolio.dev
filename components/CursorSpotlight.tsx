"use client";

import { useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch-only devices (no mouse)
    if (window.matchMedia("(pointer: coarse)").matches) return;

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
    };

    // Lerp for smooth magnetic lag
    const tick = () => {
      curX += (targetX - curX) * 0.10;
      curY += (targetY - curY) * 0.10;
      el.style.transform = `translate(${curX}px,${curY}px)`;
      rafId = requestAnimationFrame(tick);
    };

    el.style.opacity = "1";
    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

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

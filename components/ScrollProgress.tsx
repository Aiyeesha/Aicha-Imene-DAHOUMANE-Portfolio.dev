"use client";

import { useEffect, useState } from "react";

/**
 * ScrollProgress
 * --------------
 * Thin progress bar at the top indicating scroll position.
 */
export default function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const next = height > 0 ? scrollTop / height : 0;
      setP(Math.min(1, Math.max(0, next)));
    };

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
      <div
        className="h-full bg-cyan-400/70"
        style={{ width: `${Math.round(p * 1000) / 10}%` }}
      />
    </div>
  );
}

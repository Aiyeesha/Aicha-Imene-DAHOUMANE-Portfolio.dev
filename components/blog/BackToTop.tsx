"use client";

import { useEffect, useState } from "react";

interface BackToTopProps {
  label: string;
}

export default function BackToTop({ label }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 rounded-full border border-black/10 bg-white/90 px-4 py-2 text-sm shadow-md backdrop-blur hover:bg-black/5 dark:border-white/10 dark:bg-black/80 dark:hover:bg-white/10 soft-ring"
      aria-label={label}
    >
      ↑ {label}
    </button>
  );
}

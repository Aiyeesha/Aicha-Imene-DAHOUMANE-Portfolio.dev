"use client";

// ScrollToTop.tsx
// ---------------
// "Back to top" button, bottom right, shown after 300px of scroll; smooth
// scroll on click, fade/slide in and out.

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useTrack } from "@/app/[locale]/providers";

export default function ScrollToTop() {
  const t = useTranslations("a11y");
  const { track } = useTrack();
  // Shown once the page is scrolled past 300px
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Passive scroll listener
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t("scrollToTop")}
      // Slight upward slide when appearing
      className={[
        "fixed bottom-6 right-6 z-40",
        "grid h-10 w-10 place-items-center rounded-full",
        "border border-black/10 dark:border-white/10",
        "bg-white/80 dark:bg-[#070B1A]/80 backdrop-blur-sm",
        "shadow-md text-slate-700 dark:text-white/70",
        track === "salesforce"
          ? "hover:bg-cyan-500 hover:text-black hover:border-cyan-500"
          : "hover:bg-violet-500 hover:text-black hover:border-violet-500",
        "transition-all duration-300 soft-ring",
        // Shown / hidden with a CSS transition
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      ].join(" ")}
    >
      {/* Up arrow */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}

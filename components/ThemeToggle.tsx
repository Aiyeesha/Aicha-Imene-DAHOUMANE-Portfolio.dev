"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useState } from "react";
import useHydrated from "@/lib/useHydrated";

/**
 * ThemeToggle
 * -----------
 * Small client-side toggle for light/dark themes.
 * We wait for mount to avoid hydration mismatch (system theme is only known on client).
 */
export default function ThemeToggle() {
  const t = useTranslations();
  const { theme, setTheme, systemTheme } = useTheme();
  const mounted = useHydrated();
  // Changes on every toggle to remount the <span> and replay the CSS animation
  const [spinKey, setSpinKey] = useState(0);

  if (!mounted) return null;

  const current = theme === "system" ? systemTheme : theme;
  const next = current === "dark" ? "light" : "dark";

  const handleToggle = () => {
    setSpinKey((k) => k + 1);
    setTheme(next);
  };

  return (
    <button
      onClick={handleToggle}
      className="rounded-full border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5 px-3 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring transition-colors"
      aria-label={t("a11y.toggleTheme")}
      type="button"
    >
      {/* The key remounts the icon to replay the theme-spin animation */}
      <span key={spinKey} className="theme-icon-spin">
        {current === "dark" ? "🌙" : "☀️"}
      </span>
    </button>
  );
}

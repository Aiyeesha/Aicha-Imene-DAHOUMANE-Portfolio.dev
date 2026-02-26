"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

/**
 * ThemeToggle
 * -----------
 * Small client-side toggle for light/dark themes.
 * We wait for mount to avoid hydration mismatch (system theme is only known on client).
 */
export default function ThemeToggle() {
  const t = useTranslations();
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const current = theme === "system" ? systemTheme : theme;
  const next = current === "dark" ? "light" : "dark";

  return (
    <button
      onClick={() => setTheme(next)}
      className="rounded-full border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5 px-3 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10"
      aria-label={t("a11y.toggleTheme")}
      type="button"
    >
      {current === "dark" ? "🌙" : "☀️"}
    </button>
  );
}

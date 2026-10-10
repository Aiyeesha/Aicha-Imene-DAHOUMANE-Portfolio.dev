"use client";

// components/WebVitals.tsx
// ------------------------
// Remplace Vercel Speed Insights : chaque Core Web Vital mesurée dans le
// navigateur du visiteur (LCP, INP, CLS, FCP, TTFB) est envoyée à Umami sous
// forme d'événement « web_vital ». Aucun rendu visuel.

import { useReportWebVitals } from "next/web-vitals";
import { trackEvent } from "@/lib/analytics";

export default function WebVitals() {
  useReportWebVitals((metric) => {
    trackEvent("web_vital", {
      metric: metric.name,
      // CLS est un ratio sans unité (ex. 0,05) : ×1000 pour garder un entier lisible.
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      rating: metric.rating,
      path: window.location.pathname,
    });
  });

  return null;
}

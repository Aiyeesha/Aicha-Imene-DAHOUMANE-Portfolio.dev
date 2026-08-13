"use client";

// DevConsoleMessage.tsx
// ---------------------
// Affiche un message stylisé dans la console du navigateur quand les DevTools sont ouverts.
// Utile pour les développeurs curieux qui inspectent le code source.
// Chargé une seule fois dans le RootLayout.

import { useEffect } from "react";

export default function DevConsoleMessage() {
  useEffect(() => {
    // Message principal stylisé (CSS dans console.log)
    console.log(
      "%c👋 Hey there, curious developer!",
      "font-size:18px; font-weight:bold; color:#22d3ee;"
    );
    console.log(
      "%cThis portfolio is built with:\n" +
        "  → Next.js 16 (App Router) + React 19 + TypeScript\n" +
        "  → Tailwind CSS + next-themes (dark mode)\n" +
        "  → Supabase (PostgreSQL) + Upstash Redis\n" +
        "  → next-intl (EN/FR) + MDX blog\n" +
        "  → Deployed on Vercel",
      "font-size:13px; color:#94a3b8; line-height:1.6;"
    );
    console.log(
      "%c📬 Get in touch → %s",
      "font-size:13px; color:#22d3ee;",
      process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact via the form on the site"
    );
    console.log(
      "%c💼 GitHub: https://github.com/Aiyeesha/Aicha-Imene-DAHOUMANE-Portfolio.dev",
      "font-size:13px; color:#94a3b8;"
    );
  }, []);

  // Ce composant ne rend rien dans le DOM.
  return null;
}

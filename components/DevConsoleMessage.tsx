"use client";

// DevConsoleMessage.tsx
// ---------------------
// Styled message in the browser console for curious developers who open the
// DevTools. Loaded once in the root layout.

import { useEffect } from "react";

export default function DevConsoleMessage() {
  useEffect(() => {
    // Main styled message (CSS in console.log)
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
      // Private repository: no direct link.
      "%c💼 Source code: private repository — access on request via the contact form",
      "font-size:13px; color:#94a3b8;"
    );
  }, []);

  // Renders nothing.
  return null;
}

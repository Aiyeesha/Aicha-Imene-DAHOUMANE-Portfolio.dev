"use client";

import { ThemeProvider } from "next-themes";
import { useTranslations } from "next-intl";
import { ReactNode, createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

// next-themes intentionally renders an inline <script> (via React.createElement)
// to set the theme class before hydration and avoid a flash of the wrong theme.
// React 19 added a blanket dev-mode warning for any <script> tag rendered inside
// a component tree, which fires here even though the script runs correctly on
// initial SSR paint — a confirmed false positive (next-themes hasn't shipped a
// fix since; see https://github.com/pacocoursey/next-themes/issues/387).
// Filtered narrowly by message prefix so no other console.error is silenced.
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const originalConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("Encountered a script tag")) return;
    originalConsoleError.apply(console, args);
  };
}

export type Track = "itops" | "salesforce";
type TrackContextValue = { track: Track; setTrack: (t: Track) => void };

const TrackContext = createContext<TrackContextValue | null>(null);

export function useTrack() {
  const ctx = useContext(TrackContext);
  if (!ctx) throw new Error("useTrack must be used within Providers");
  return ctx;
}

/**
 * Providers
 * ---------
 * - Theme provider (dark/light/system)
 * - Track provider ("salesforce" | "itops")
 *
 * We accept an `initialTrack` from the server (read from the `track` cookie
 * in app/[locale]/layout.tsx) so SSR + hydration agree from the very first
 * paint, avoiding a flash of the wrong track for returning visitors.
 */
export default function Providers({
  children,
  initialTrack,
  nonce,
}: {
  children: ReactNode;
  initialTrack: Track;
  nonce?: string;
}) {
  const [track, setTrackState] = useState<Track>(initialTrack);
  const t = useTranslations();

  // The <title>/<meta description> are computed server-side from the track
  // cookie (generateMetadata in app/[locale]/layout.tsx) — correct on first
  // load, but a same-session toggle only updates the DOM (data-track, cookie),
  // never the tab title, until the next full navigation. A CTO watching the
  // toggle in an interview would see everything else switch except the tab —
  // audit 2026-08-16. Skipped on the very first render since the server
  // title already matches initialTrack; only client-side changes need this.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    document.title = t(track === "itops" ? "metadata.titleItops" : "metadata.title");
  }, [track, t]);

  // Fallback only: the layout now reads the `track` cookie server-side and
  // passes the correct value as `initialTrack` (see app/[locale]/layout.tsx),
  // so this should be a no-op for any returning visitor. Kept for the one
  // edge case that still needs it: cookies blocked/cleared while localStorage
  // persists (e.g. some privacy extensions), or the brief window on a
  // visitor's very first ever page load before setTrack() has posted a cookie.
  useEffect(() => {
    const saved = localStorage.getItem("track");
    if (saved === "itops" || saved === "salesforce") {
      setTrackState(saved);
    }
  }, []);

  // Sync data-track on <html> so CSS can target it for the page gradient.
  useEffect(() => {
    document.documentElement.setAttribute("data-track", track);
  }, [track]);

  const setTrack = (t: Track) => {
    setTrackState(t);
    window.localStorage.setItem("track", t);

    // Persist for SSR so the server can render the correct track immediately.
    const isHttps =
  typeof window !== "undefined" && window.location.protocol === "https:";

document.cookie = `track=${t}; Path=/; Max-Age=31536000; SameSite=Lax${
  isHttps ? "; Secure" : ""
}`;

  };

  const value = useMemo(() => ({ track, setTrack }), [track]);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem nonce={nonce}>
      <TrackContext.Provider value={value}>{children}</TrackContext.Provider>
    </ThemeProvider>
  );
}

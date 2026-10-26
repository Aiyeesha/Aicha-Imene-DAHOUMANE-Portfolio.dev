"use client";

import { ThemeProvider } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
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

  // The <title> is computed on the server from the track cookie
  // (generateMetadata in app/[locale]/page.tsx); a toggle in the same session
  // only updates the DOM, so the tab title is updated here. Home page only:
  // it is the only page whose title depends on the track, and other pages'
  // titles must never be overwritten. Skipped on first render, where the
  // server title already matches initialTrack. Cheaper than router.refresh().
  const pathname = usePathname();
  const locale = useLocale();
  // localePrefix: "always" (proxy.ts): the home page is always /{locale},
  // with or without a trailing slash.
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!isHome) return;
    document.title = t(track === "itops" ? "metadata.titleItops" : "metadata.title");
  }, [track, t, isHome]);

  // Fallback only: the layout reads the `track` cookie on the server and
  // passes it as `initialTrack`. Still needed when cookies are blocked or
  // cleared while localStorage persists, or on a very first visit before
  // setTrack() has set the cookie.
  useEffect(() => {
    const saved = localStorage.getItem("track");
    if (saved === "itops" || saved === "salesforce") {
      // One-off fallback on mount for state the user then changes (setTrack):
      // useSyncExternalStore does not fit, and reading localStorage in the
      // useState initialiser would break hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage fallback on mount
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

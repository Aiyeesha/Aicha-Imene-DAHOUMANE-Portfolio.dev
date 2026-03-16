"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";

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
 * We accept an `initialTrack` from the server so SSR + hydration agree
 * (avoids the "flash" when the track is persisted on the client).
 */
export default function Providers({
  children,
  initialTrack
}: {
  children: ReactNode;
  initialTrack: Track;
}) {
  const [track, setTrackState] = useState<Track>(initialTrack);

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
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TrackContext.Provider value={value}>{children}</TrackContext.Provider>
    </ThemeProvider>
  );
}

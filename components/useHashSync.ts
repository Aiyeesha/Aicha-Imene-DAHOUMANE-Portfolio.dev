"use client";

import { useEffect, useRef } from "react";

/**
 * useHashSync
 * -----------
 * Keeps URL hash in sync with the currently active section without causing jumps:
 * - Uses history.replaceState
 * - Skips updates if the user recently clicked a hash link (avoid fighting browser)
 */
export default function useHashSync(activeId: string) {
  const lastManualTs = useRef<number>(0);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const a = target.closest("a") as HTMLAnchorElement | null;
      if (!a) return;

      const href = a.getAttribute("href") || "";
      if (href.startsWith("#") && href.length > 1) {
        lastManualTs.current = Date.now();
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!activeId) return;

    // If the user just clicked an anchor, do nothing for a short window.
    if (Date.now() - lastManualTs.current < 1200) return;

    const desired = `#${activeId}`;
    if (window.location.hash === desired) return;

    history.replaceState(null, "", desired);
  }, [activeId]);
}

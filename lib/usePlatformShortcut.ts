"use client";

// lib/usePlatformShortcut.ts
// --------------------------
// Command palette shortcut label for the platform: "⌘K" on macOS / iOS,
// "Ctrl K" elsewhere (the actual shortcut there, see CommandPalette.tsx).
// useSyncExternalStore: server render and hydration use getServerSnapshot
// ("Ctrl K", neutral), then React reads the client value with no hydration
// error and no setState in an effect.

import { useSyncExternalStore } from "react";

// The platform never changes during the page's life: nothing to subscribe to.
const subscribe = () => () => {};

function isApplePlatform(): boolean {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const platform = nav.userAgentData?.platform || nav.platform || nav.userAgent;
  return /mac|iphone|ipad|ipod/i.test(platform);
}

export default function usePlatformShortcut(key = "K"): string {
  const isApple = useSyncExternalStore(subscribe, isApplePlatform, () => false);
  return isApple ? `⌘${key}` : `Ctrl ${key}`;
}

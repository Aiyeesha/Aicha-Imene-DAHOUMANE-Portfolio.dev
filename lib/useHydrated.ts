"use client";

// lib/useHydrated.ts
// ------------------
// `false` during server rendering and hydration, `true` afterwards. Replaces
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => setMounted(true), []);
// (an extra cascading render). useSyncExternalStore uses getServerSnapshot
// (false) during hydration, so the first client render matches the server
// HTML; when mounting after a client-side navigation it is `true` right away.

import { useSyncExternalStore } from "react";

// Nothing to subscribe to: "hydrated" changes once, handled by React.
const subscribe = () => () => {};

export default function useHydrated(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

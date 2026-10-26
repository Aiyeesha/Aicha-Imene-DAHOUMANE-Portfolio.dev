"use client";

// ServiceWorkerRegistration.tsx
// ------------------------------
// Registers the service worker (public/sw.js), production only, after mount,
// with scope "/". A new worker takes over on the next visit
// (activate + clients.claim() in sw.js).

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    // Production only, to avoid stale caches during development
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => {
        // Visible in DevTools > Application > Service Workers
        console.debug("[SW] Registered:", registration.scope);
      })
      .catch((err) => {
        // Never surface an error: offline support is a bonus
        console.debug("[SW] Registration failed:", err);
      });
  }, []);

  // Renders nothing
  return null;
}

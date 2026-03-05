"use client";

// ServiceWorkerRegistration.tsx
// ------------------------------
// Enregistre le service worker (public/sw.js) côté client.
//
// - Uniquement en production et si l'API serviceWorker est disponible.
// - Enregistré dans useEffect (après montage, ne bloque pas le rendu).
// - Scope "/" = couvre toutes les pages du site.
// - En cas de mise à jour du SW : l'ancienne version est remplacée
//   lors de la prochaine visite (activate + clients.claim() dans sw.js).

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    // Sécurité : uniquement en production — évite les conflits de cache en dev
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => {
        // Log discret en console (visible dans DevTools > Application > Service Workers)
        console.debug("[SW] Registered:", registration.scope);
      })
      .catch((err) => {
        // Ne pas afficher d'erreur visible à l'utilisateur — la PWA est un bonus
        console.debug("[SW] Registration failed:", err);
      });
  }, []);

  // Ce composant ne rend rien dans le DOM
  return null;
}

// manifest.ts
// -----------
// Web App Manifest — permet une apparence soignée dans les favoris
// et sur mobile (PWA-ready, sans service worker pour l'instant).
//
// Pour activer l'installation PWA complète :
// 1. Ajouter un service worker (optionnel, pas nécessaire pour un portfolio)
// 2. Ajouter les icônes aux tailles requises dans /public/ :
//    - icon-192.png (192×192)
//    - icon-512.png (512×512)
//    - apple-touch-icon.png (180×180)
//
// Doc : https://developer.mozilla.org/fr/docs/Web/Manifest

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha DAHOUMANE — Portfolio";

  return {
    name: siteName,
    short_name: "AID Portfolio",
    description: "Portfolio professionnel — Salesforce Developer & Consultant · IT Ops",
    start_url: "/",
    // standalone : ouvre l'app sans barre d'adresse sur mobile
    display: "standalone",
    // Couleur de la barre de statut mobile (correspond à --nav bg)
    background_color: "#ffffff",
    theme_color: "#06b6d4", // cyan-500
    orientation: "portrait-primary",
    scope: siteUrl,
    lang: "fr",
    // Icônes — à générer depuis avatar.webp (outils : pwa-asset-generator, realfavicongenerator.net)
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        // maskable : icône adaptative Android (safe area)
        purpose: "maskable"
      }
    ],
    // Catégories pour les stores PWA
    categories: ["portfolio", "business", "productivity"],
    // Couleur d'accentuation de l'interface (barre de titre, etc.)
    // Note : non standard mais supporté par Chrome
    screenshots: []
  };
}

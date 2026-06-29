// manifest.ts
// -----------
// Web App Manifest — PWA complète, installable sur mobile et desktop.
//
// Icônes requises dans /public/ :
//   - icon-192.png  (192×192) — Android home screen
//   - icon-512.png  (512×512) — Splash screen + any purpose
//   - apple-touch-icon.png (180×180) — iOS Safari
//
// Générer les icônes : https://realfavicongenerator.net ou pwa-asset-generator
// Valider le manifest : https://web.dev/pwa-checklist/
//
// Doc : https://developer.mozilla.org/en-US/docs/Web/Manifest

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha DAHOUMANE — Portfolio";

  return {
    // ── Identité ────────────────────────────────────────────────────────────
    // `id` est requis par Chrome pour l'install prompt (identifiant stable de la PWA).
    // Doit correspondre à start_url ou être une sous-route.
    id:          "/",
    name:        siteName,
    short_name:  "AID",
    description: "Salesforce Developer & Consultant · IT Ops — Portfolio professionnel d'Aïcha Imène DAHOUMANE.",

    // ── Navigation ──────────────────────────────────────────────────────────
    start_url: "/",            // Racine — le middleware détecte la langue
    scope:     "/",            // Toutes les sous-routes sont dans le scope de la PWA
    lang:      "en",           // Langue par défaut du portfolio (marchés cibles anglophones)

    // ── Affichage ───────────────────────────────────────────────────────────
    // display_override : tente "window-controls-overlay" (PWA desktop), fallback "standalone"
    display:              "standalone",
    display_override:     ["window-controls-overlay", "standalone", "minimal-ui"],
    // "any" autorise portrait ET paysage — requis pour tablette et desktop PWA.
    orientation:          "any",

    // ── Couleurs ────────────────────────────────────────────────────────────
    // Doit correspondre à la couleur de fond du site (dark mode par défaut).
    background_color: "#070B1A", // couleur de fond dark (--bg-dark)
    theme_color:      "#06b6d4", // cyan-500 — cohérent avec l'accent du portfolio

    // ── Icônes ─────────────────────────────────────────────────────────────
    // "any"      : usage général (bookmark, splash screen)
    // "maskable" : icône adaptative Android (safe area — fond solid requis)
    //
    // WebP (27 KB) en tête : Chrome 73+, Edge, Firefox et Safari 14+ le supportent.
    // PNG (65 KB) en fallback : navigateurs anciens, iOS < 14, lecteurs de flux.
    // Le navigateur choisit le premier format qu'il comprend dans la liste.
    icons: [
      {
        src:     "/icon-192.png",
        sizes:   "192x192",
        type:    "image/png",
        purpose: "any"
      },
      // WebP 512 — format prioritaire (−60% vs PNG original)
      {
        src:     "/icon-512.webp",
        sizes:   "512x512",
        type:    "image/webp",
        purpose: "any"
      },
      // PNG 512 — fallback universel (palette PNG, −60% vs original 163 KB)
      {
        src:     "/icon-512.png",
        sizes:   "512x512",
        type:    "image/png",
        purpose: "any"
      },
      {
        src:     "/icon-512.png",
        sizes:   "512x512",
        type:    "image/png",
        purpose: "maskable"
      }
    ],

    // ── Raccourcis ──────────────────────────────────────────────────────────
    // Apparaissent dans le menu contextuel long-press de l'icône (Android/Chrome)
    shortcuts: [
      {
        name:       "Blog",
        short_name: "Blog",
        url:        "/en/blog",
        icons:      [{ src: "/icon-192.png", sizes: "192x192" }]
      },
      {
        name:       "About",
        short_name: "About",
        url:        "/en/about",
        icons:      [{ src: "/icon-192.png", sizes: "192x192" }]
      }
    ],

    // ── Divers ──────────────────────────────────────────────────────────────
    categories:               ["portfolio", "business", "productivity"],
    prefer_related_applications: false, // Privilégier la PWA plutôt qu'une app native
    // Screenshots — affichés dans le prompt d'installation Chrome/Edge.
    // TODO (PORT-009) : ajouter un screenshot "narrow" (390×844, mobile portrait)
    //   générable via : npx playwright screenshot ... --viewport-size=390,844
    screenshots: [
      {
        src:        "/og-default.png",
        sizes:      "1200x630",
        type:       "image/png",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        form_factor: "wide" as any,
        label:      "Portfolio — Aïcha Imène DAHOUMANE",
      }
    ]
  };
}

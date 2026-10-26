// manifest.ts
// -----------
// Web App Manifest: installable PWA on mobile and desktop.
// Icons in /public/: icon-192.png (Android home screen), icon-512 (.webp and
// .png, splash screen), apple-touch-icon.png (iOS Safari).
// https://developer.mozilla.org/en-US/docs/Web/Manifest

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha DAHOUMANE — Portfolio";

  return {
    // ── Identity ────────────────────────────────────────────────────────────
    // `id` is required by Chrome for the install prompt (stable PWA id); it
    // must match start_url or a sub-route.
    id:          "/",
    name:        siteName,
    short_name:  "AID",
    description: "Salesforce · Systèmes & Réseaux · DevOps — Portfolio professionnel d'Aïcha Imène DAHOUMANE.",

    // ── Navigation ──────────────────────────────────────────────────────────
    start_url: "/",            // root: the proxy detects the language
    scope:     "/",            // every route is in scope
    lang:      "en",           // default language

    // ── Display ─────────────────────────────────────────────────────────────
    // display_override tries "window-controls-overlay" (desktop), then "standalone"
    display:              "standalone",
    display_override:     ["window-controls-overlay", "standalone", "minimal-ui"],
    // "any" allows portrait and landscape (tablets, desktop).
    orientation:          "any",

    // ── Colours ─────────────────────────────────────────────────────────────
    // Matches the site background (dark by default).
    background_color: "#070B1A", // dark background (--bg-dark)
    theme_color:      "#06b6d4", // cyan-500, the portfolio accent

    // ── Icons ──────────────────────────────────────────────────────────────
    // "any": general use (bookmark, splash screen)
    // "maskable": Android adaptive icon (safe area, solid background)
    // WebP first (supported by current browsers), PNG as fallback; the
    // browser takes the first format it understands.
    icons: [
      {
        src:     "/icon-192.png",
        sizes:   "192x192",
        type:    "image/png",
        purpose: "any"
      },
      // WebP 512, preferred
      {
        src:     "/icon-512.webp",
        sizes:   "512x512",
        type:    "image/webp",
        purpose: "any"
      },
      // PNG 512, universal fallback
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

    // ── Shortcuts (long-press menu of the icon on Android/Chrome) ───────────
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

    // ── Misc ────────────────────────────────────────────────────────────────
    categories:               ["portfolio", "business", "productivity"],
    prefer_related_applications: false, // prefer the PWA over a native app
    // Screenshots shown in the Chrome/Edge install prompt.
    screenshots: [
      {
        src:        "/opengraph-image",
        sizes:      "1200x630",
        type:       "image/png",
        form_factor: "wide" as any,
        label:      "Portfolio — Aïcha Imène DAHOUMANE",
      }
    ]
  };
}

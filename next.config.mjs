// next.config.mjs
// ----------------
// Configuration Next.js principale.
// Inclut :
// 1. Pipeline MDX (articles de blog)
// 2. Plugin next-intl (internationalisation FR/EN)
// 3. En-têtes de sécurité HTTP (BLOC 10)
//    - X-Frame-Options : protection contre le clickjacking
//    - X-Content-Type-Options : prévention du sniffing de type MIME
//    - Referrer-Policy : contrôle des informations de référent
//    - Permissions-Policy : désactivation des APIs sensibles non utilisées
//    - Content-Security-Policy : liste blanche des sources autorisées
//    - Strict-Transport-Security : forçage HTTPS (HSTS)
//
// IMPORTANT CSP :
//   - 'unsafe-inline' et 'unsafe-eval' sont nécessaires pour next-intl et Tailwind en développement.
//   - Calendly requiert frame-src et script-src supplémentaires.
//   - Supabase et Upstash requièrent connect-src *.supabase.co et *.upstash.io.
//   - Formspree requiert connect-src formspree.io.
//   - Si vous ajoutez Google Analytics / Plausible / autres, mettez à jour script-src et connect-src.

import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";
import remarkFrontmatter from "remark-frontmatter";
import rehypePrettyCode from "rehype-pretty-code";

const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  images: {
    // Servir AVIF en priorité (25-50 % plus léger que WebP), fallback WebP.
    // Next.js teste le support navigateur via Accept et sert le bon format.
    formats: ["image/avif", "image/webp"],
    // Cache CDN/navigateur des images optimisées : 30 jours.
    // Par défaut Next.js utilise 60 s — très court, force des re-optimisations fréquentes.
    minimumCacheTTL: 2592000, // 30 jours
    // Tailles d'image générées pour les usages fill/responsive.
    // On conserve les valeurs par défaut mais on ajoute 480px (courant sur mobile).
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1920],
  },

  async headers() {
    return [
      // ── Assets statiques publics (logo, avatar, CV PDF…) ──────────────────────
      // Vercel cache déjà /_next/static/ avec immutable.
      // Les fichiers dans /public/ n'ont pas de Cache-Control par défaut → on fixe 1 an.
      // Ils n'ont pas de hash dans leur URL, donc on ne met pas "immutable"
      // (sinon une mise à jour de /avatar.webp ne serait pas récupérée avant 1 an).
      {
        source: "/(:path*\\.(?:webp|png|jpg|jpeg|svg|ico|gif|avif|woff2|woff|ttf|otf|pdf))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        // Appliquer les headers de sécurité à toutes les routes
        source: "/(.*)",
        headers: [
          // Interdit l'affichage du site dans un <iframe> externe → protection clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          // Empêche les navigateurs de deviner (sniffer) le type MIME des fichiers
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          // N'envoie l'URL de référence qu'à la même origine, sinon uniquement l'origine
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          // Désactive les APIs sensibles non utilisées dans ce portfolio
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()"
          },
          // Content Security Policy
          // Sources autorisées par catégorie :
          //   default-src : fallback restrictif
          //   script-src  : scripts first-party + inline/eval Next.js + Vercel Analytics + Calendly
          //   style-src   : styles first-party + inline (Tailwind purge)
          //   img-src     : images first-party + data URI + tout https (badges, avatars Supabase)
          //   font-src    : polices first-party
          //   frame-src   : Calendly (iframe de réservation)
          //   connect-src : appels API internes + Supabase + Upstash + Formspree + Vercel Analytics
          //   object-src  : aucun plugin (Flash, etc.)
          //   base-uri    : restreint les URL de base à la même origine
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // 'unsafe-inline' requis par Next.js App Router (inline scripts de hydratation).
              // 'unsafe-eval' uniquement en développement (webpack HMR) — retiré en production.
              isDev
                ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com https://va.vercel-scripts.com"
                : "script-src 'self' 'unsafe-inline' https://assets.calendly.com https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
              // img-src : restreint aux origines connues plutôt que https: générique
              `img-src 'self' data: https://*.supabase.co https://*.supabase.in`,
              "font-src 'self'",
              "frame-src https://calendly.com",
              // connect-src : data: uniquement en dev (React DevTools)
              isDev
                ? "connect-src 'self' data: https://*.supabase.co https://*.upstash.io https://formspree.io https://vitals.vercel-insights.com https://github-contributions-api.jogruber.de"
                : "connect-src 'self' https://*.supabase.co https://*.upstash.io https://formspree.io https://vitals.vercel-insights.com https://github-contributions-api.jogruber.de",
              "object-src 'none'",
              "base-uri 'self'",
              // Bloque les iframes non explicitement autorisées (renforce X-Frame-Options)
              "frame-ancestors 'none'",
            ].join("; ")
          },
          // Force HTTPS pendant 2 ans (includeSubDomains + preload)
          // À activer uniquement si le domaine est toujours servi en HTTPS
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          }
        ]
      }
    ];
  }
};

// Pipeline MDX pour les articles de blog
// rehype-pretty-code (shiki) : coloration syntaxique build-time
//   - thème "github-light" en mode clair, "github-dark-dimmed" en mode sombre
//   - dual-theme via variables CSS --shiki-light / --shiki-dark
//   - bypassInlineCode : laisse le code inline sans coloration (stylee via .mdx code)
//   - keepBackground: false → les couleurs de fond sont gérées par globals.css
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: {
            light: "github-light",
            // github-dark        : commentaires #6a737d → 3.14:1 sur #0d1117 ✗ WCAG AA
            // github-dark-dimmed : commentaires #768390 → 3.92:1 ✗
            // github-dark-default: commentaires #8b949e → 6.15:1 ✓ ← sélectionné
            dark: "github-dark-default",
          },
          bypassInlineCode: true,
          keepBackground: false,
        },
      ],
    ],
  }
});

// Plugin next-intl — génère la config next-intl/config au build
// Pointe explicitement vers le fichier de config App Router
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(withMDX(nextConfig));

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

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  async headers() {
    return [
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
              // 'unsafe-inline' requis par Next.js App Router (inline scripts de hydratation)
              // 'unsafe-eval' requis par certains modules webpack en développement
              // À durcir avec des nonces si vous passez sur une CSP stricte
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
              "img-src 'self' data: https:",
              "font-src 'self'",
              "frame-src https://calendly.com",
              // data: requis pour React DevTools (extension navigateur, dev uniquement)
              "connect-src 'self' data: https://*.supabase.co https://*.upstash.io https://formspree.io https://vitals.vercel-insights.com",
              "object-src 'none'",
              "base-uri 'self'"
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
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter]
  }
});

// Plugin next-intl — génère la config next-intl/config au build
// Pointe explicitement vers le fichier de config App Router
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(withMDX(nextConfig));

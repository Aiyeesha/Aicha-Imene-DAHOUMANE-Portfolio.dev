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
//   - Supabase requiert connect-src *.supabase.co (Upstash est server-side uniquement — absent de connect-src).
//   - Formhook requiert connect-src formhook.app.
//   - Si vous ajoutez Google Analytics / Plausible / autres, mettez à jour script-src et connect-src.

import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";
import rehypePrettyCode from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";

// Bundle analyzer — activé uniquement si ANALYZE=true (jamais en production)
// Usage : ANALYZE=true npm run build
// Ouvre deux rapports HTML : client bundle + server bundle
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true,
});

// URL absolue requise par la spec W3C Reporting API (Report-To + Reporting-Endpoints).
// Les URLs relatives sont ignorées silencieusement par Firefox et Safari.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicha-imene-dahoumane-portfolio.vercel.app";

/** @type {import('next').NextConfig} */
// Articles de blog dépubliés (audit de contenu 2026-09-25, lot 4).
const MSP_REX_SLUG = "msp-internship-lessons";
const UNPUBLISHED_RUNBOOKS = [
  "acronis-backup-recovery-ops",
  "autotask-ticketing-workflow",
  "datto-rmm-supervision-runbooks",
  "malwarebytes-alert-triage-mitre",
];
const UNPUBLISHED_POSTS = [
  "apex-batch-jobs-scheduling",
  "docker-compose-production-setup",
  "framer-motion-animations",
  "git-workflow-salesforce-projects",
  "github-actions-reusable-workflows",
  "hyper-v-virtualization-setup",
  "incident-response-runbook-template",
  "linux-server-hardening-checklist",
  "lwc-reusable-components",
  "monitoring-alerting-stack",
  "network-segmentation-vlan",
  "nextjs-admin-dashboard-supabase",
  "nextjs-caching-strategies",
  "nextjs-deployment-vercel",
  "nextjs-image-optimization",
  "nextjs-seo-best-practices",
  "nextjs-supabase-auth",
  "nextjs-testing-playwright",
  "powershell-active-directory-automation",
  "powershell-sysadmin-automation",
  "react-server-components-patterns",
  "salesforce-data-migration-checklist",
  "salesforce-lwc-performance",
  "salesforce-lwc-testing",
  "salesforce-org-health-check",
  "salesforce-platform-events",
  "salesforce-reports-dashboards",
  "salesforce-security-model",
  "salesforce-trailhead-path-developer",
  "siem-log-analysis-basics",
  "ssl-tls-certificate-management",
  "supabase-rls-policies",
  "tailwind-design-system",
  "typescript-best-practices-2026",
  "veeam-backup-replication",
  "visualforce-to-lwc-migration",
  "windows-server-active-directory-setup",
];
const UNPUBLISHED_BLOG_REDIRECTS = [
  ...UNPUBLISHED_RUNBOOKS.map((slug) => ({
    source: `/:locale(en|fr|es)/blog/${slug}`,
    destination: `/:locale/blog/${MSP_REX_SLUG}`,
    permanent: false,
  })),
  ...UNPUBLISHED_POSTS.map((slug) => ({
    source: `/:locale(en|fr|es)/blog/${slug}`,
    destination: "/:locale/blog",
    permanent: false,
  })),
];

// Projets retirés de la galerie (audit de contenu 2026-09-25, lot 4) : passés
// en status "draft" dans content/projects.ts. Un doublon redirige vers le
// projet qui le contient ; les autres vers la galerie.
const UNPUBLISHED_PROJECTS = [
  ["it-ops-email-config", null],
  ["it-ops-wifi-config", null],
  ["it-ops-hardware-procurement", null],
  ["hardware-upgrade-hp-laptop", null],
  ["it-ops-disk-backup", null],
  ["it-ops-workstation-setup", "workstation-mass-deployment"],
  ["it-ops-roaming-profiles", "it-ops-virtualization-lab"],
  ["incident-response-playbook", "incident-response-tracker"],
  ["hemebiotech-java-debug", null],
  ["pochlib-ui", null],
  ["parkit-java-testing", null],
  ["python-password-checker", "homelab-password-cracking-lab"],
  ["risk-assessment-matrix", "risque360"],
  ["nextjs-admin-dashboard", null],
];
const UNPUBLISHED_PROJECT_REDIRECTS = UNPUBLISHED_PROJECTS.map(([slug, target]) => ({
  source: `/:locale(en|fr|es)/projects/${slug}`,
  destination: target ? `/:locale/projects/${target}` : "/:locale/projects",
  permanent: false,
}));

const nextConfig = {
  // Supprime le header X-Powered-By: Next.js — évite le fingerprinting du framework
  poweredByHeader: false,

  // Désactive explicitement les source maps en production.
  // Par défaut Next.js ne les génère pas, mais on le force pour satisfaire
  // les scanners de sécurité et éviter toute régression de configuration.
  productionBrowserSourceMaps: false,

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
    // Autoriser l'optimisation des images provenant de Supabase Storage.
    // Sans cette liste, <Image src="https://*.supabase.co/..."> lève une erreur.
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "**.supabase.in" },
    ],
  },

  // Relais Umami : le script et l'envoi des événements passent par le domaine
  // du site (/api/umami/*) au lieu de cloud.umami.is. Avantages : aucune origine
  // tierce à autoriser dans la CSP ('self' suffit) et moins de blocages par les
  // bloqueurs de publicité. Placé sous /api : exclu du middleware next-intl.
  async rewrites() {
    return [
      { source: "/api/umami/:path*", destination: "https://cloud.umami.is/:path*" },
    ];
  },

  async redirects() {
    return [
      // Blog élagué à l'audit de contenu du 2026-09-25 (lot 4) : 41 articles
      // déplacés dans content/blog/unpublished/. Les 4 runbooks du stage
      // MIDRANGE GROUP pointent vers le retour d'expérience qui les remplace ;
      // les autres vers l'index du blog. Redirections temporaires (307) pour
      // pouvoir republier un article sans cache de redirection permanente.
      ...UNPUBLISHED_BLOG_REDIRECTS,
      ...UNPUBLISHED_PROJECT_REDIRECTS,
      // Ancien slug blog iDEM Connect — URL incorrecte référencée dans l'audit (2026-06-29)
      {
        source: "/:locale(en|fr|es)/projects/apex-backend-idem-connect",
        destination: "/:locale/projects/idemconnect-apex-backend",
        permanent: true,
      },
      // Mentions légales — ancienne URL → nouvelle URL (audit BUG-1)
      {
        source: "/:locale(en|fr|es)/mentions-legales",
        destination: "/:locale/legal",
        permanent: true,
      },
      {
        source: "/mentions-legales",
        destination: "/fr/legal",
        permanent: true,
      },
      // Ancien slug blog migration-visualforce-to-lwc : l'article cible a été
      // dépublié à l'audit de contenu du 2026-09-25 (lot 4) → index du blog.
      {
        source: "/:locale(en|fr|es)/blog/migration-visualforce-to-lwc",
        destination: "/:locale/blog",
        permanent: false,
      },
      // Articles dépubliés (audit de contenu 2026-09-25) — contenu trop court et
      // non relu ; redirection temporaire pour ne pas casser les liens existants.
      {
        source: "/:locale(en|fr|es)/blog/next-intl-app-router",
        destination: "/:locale/blog",
        permanent: false,
      },
      {
        source: "/:locale(en|fr|es)/blog/salesforce-cicd-github-actions",
        destination: "/:locale/projects/cicd-pipeline-setup",
        permanent: false,
      },
      // Changelog public retiré (audit de contenu 2026-09-25) : l'historique
      // détaillé reste dans CHANGELOG.md du dépôt ; la preuve DevSecOps lisible
      // pour un visiteur est le colophon.
      {
        source: "/:locale(en|fr|es)/changelog",
        destination: "/:locale/colophon",
        permanent: false,
      },
      // /rss.xml retournait 404 — le feed est servi sous /feed.xml
      {
        source: "/rss.xml",
        destination: "/feed.xml",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      // ── Assets statiques publics (logo, avatar, CV PDF…) ──────────────────────
      // Vercel cache déjà /_next/static/ avec immutable.
      // Les fichiers dans /public/ n'ont pas de Cache-Control par défaut → on fixe 1 jour (86400 s).
      // Ils n'ont pas de hash dans leur URL, donc on ne met pas "immutable"
      // (sinon une mise à jour de /avatar.webp ne serait pas récupérée avant expiration).
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
          // Désactive les APIs sensibles non utilisées dans ce portfolio.
          // Liste étendue pour couvrir les APIs modernes (payment, USB, bluetooth…)
          // qui pourraient être exploitées via des scripts tiers (Calendly, Analytics).
          {
            key: "Permissions-Policy",
            value: [
              "accelerometer=()",
              "ambient-light-sensor=()",
              "battery=()",
              "bluetooth=()",
              "camera=()",
              "clipboard-read=()",
              "display-capture=()",
              "document-domain=()",
              "encrypted-media=()",
              "fullscreen=(self)",
              "geolocation=()",
              "gyroscope=()",
              "interest-cohort=()",
              "magnetometer=()",
              "microphone=()",
              "midi=()",
              "payment=()",
              "serial=()",
              "usb=()",
              "web-share=(self)",
              "xr-spatial-tracking=()",
            ].join(", ")
          },
          
          // Bloque le chargement cross-domain de ressources via Flash/PDF/Silverlight legacy.
          // Cosmétique aujourd'hui (ces plugins sont éteints), mais attendu par les scanners
          // de sécurité professionnels (Qualys, SecurityHeaders.com).
          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none"
          },
          // Content-Security-Policy : DYNAMIQUE via proxy.ts (middleware Edge).
          // La CSP est générée par requête dans proxy.ts avec un nonce unique
          // (btoa(crypto.randomUUID())) — ce nonce remplace 'unsafe-inline' dans
          // script-src. Ne pas remettre de CSP statique ici, cela écraserait la
          // CSP dynamique du middleware sur les routes HTML.
          // Voir proxy.ts > buildCSP() pour le détail des directives.
          // Force HTTPS pendant 2 ans (includeSubDomains + preload)
          // À activer uniquement si le domaine est toujours servi en HTTPS
          {
            key: "Strict-Transport-Security",
            // max-age=63072000 = 2 ans (minimum pour preload)
  value: 'max-age=63072000; includeSubDomains; preload'
          },
          // Empêche les attaques cross-origin de type Spectre et les fuites mémoire
          // entre onglets/fenêtres (ex : window.opener exploit).
          // same-origin : seules les pages de la même origine peuvent partager un contexte.
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin"
          },
          // Empêche d'autres origines de charger nos ressources (images, fonts, JSON)
          // dans leur propre contexte, sauf via CORS explicite.
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin"
          },
          // ── Reporting API — complément moderne à report-uri ───────────────
          // report-uri (CSP Level 2) est déprécié en CSP Level 3 mais reste
          // le seul mécanisme universellement supporté. On ajoute les deux :
          //   - Report-To      : Reporting API v0 (Chrome, Edge)
          //   - Reporting-Endpoints : Reporting API v1 (Chrome 96+)
          // Ils réutilisent le même endpoint /api/csp-report.
          {
            key: "Report-To",
            value: JSON.stringify({
              group: "csp-endpoint",
              max_age: 86400,
              endpoints: [{ url: `${SITE_URL}/api/csp-report` }],
            })
          },
          {
            key: "Reporting-Endpoints",
            value: `csp-endpoint="${SITE_URL}/api/csp-report"`,
          },
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
    // remark-gfm : tables, listes de tâches, autolinks, ~~barré~~ (utilisé par
    // les études de cas projets sous content/projects/ et par les articles de
    // blog qui contiennent déjà des tableaux Markdown).
    remarkPlugins: [remarkFrontmatter, remarkGfm],
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

export default withBundleAnalyzer(withNextIntl(withMDX(nextConfig)));

// next.config.mjs
// ----------------
// Main Next.js configuration: MDX pipeline (blog and case studies), next-intl
// plugin, redirects, and HTTP security headers (X-Frame-Options,
// X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS…).
// The CSP itself is built per request in proxy.ts (nonce). Booking is a plain
// link to Proton Calendar and Formhook/Upstash are server-side only, so none
// of them appears in the CSP; adding analytics would require updating
// script-src and connect-src there.

import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";
import rehypePrettyCode from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";

// Bundle analyzer, only with ANALYZE=true (ANALYZE=true npm run build):
// opens client and server bundle reports.
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true,
});

// Absolute URL required by the Reporting API (Report-To, Reporting-Endpoints);
// Firefox and Safari silently ignore relative URLs.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicha-imene-dahoumane-portfolio.vercel.app";

// Former Vercel alias still serving production: 308 to the main domain so
// shared links stop circulating under the old name.
const LEGACY_HOSTS = ["portfolio-next-one-gold.vercel.app"].filter(
  (host) => host !== new URL(SITE_URL).hostname,
);

/** @type {import('next').NextConfig} */
// Unpublished blog posts.
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

// Projects removed from the gallery (status "draft" in content/projects.ts):
// a duplicate redirects to the project that contains it, the others to the
// gallery.
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
  // Drop X-Powered-By: Next.js (framework fingerprinting)
  poweredByHeader: false,

  // No production source maps (the default, made explicit for security
  // scanners and against config regressions).
  productionBrowserSourceMaps: false,

  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  // The health checks (lib/contentChecks.ts) look for case-study MDX files on
  // disk: ship them with the functions that run those checks, otherwise a
  // featured project whose body lives in MDX would be reported as empty.
  outputFileTracingIncludes: {
    "/api/health": ["./content/projects/**/*.mdx"],
    "/api/cron/ping": ["./content/projects/**/*.mdx"],
    "/[locale]/status": ["./content/projects/**/*.mdx"],
    "/admin": ["./content/projects/**/*.mdx"],
  },

  // Build date, frozen into the server bundle so the sitemap's lastmod does
  // not change on every instance start.
  env: {
    SITE_BUILD_DATE: new Date().toISOString(),
  },

  images: {
    // AVIF first (25-50% lighter than WebP), WebP fallback, negotiated
    // through Accept.
    formats: ["image/avif", "image/webp"],
    // 30-day cache for optimised images (the default is 60s, which forces
    // frequent re-optimisation).
    minimumCacheTTL: 2592000, // 30 days
    // Default sizes plus 480px (common on mobile).
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1920],
    // No remote image host: every image is served from public/ (a wildcard
    // would turn the optimiser into a relay for third-party content).
    remotePatterns: [],
  },

  async redirects() {
    return [
      ...LEGACY_HOSTS.map((host) => ({
        source: "/:path*",
        has: [{ type: "host", value: host }],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      })),
      // Unpublished blog posts: the four MIDRANGE GROUP runbooks point to the
      // write-up that replaces them, the others to the blog index. Temporary
      // (307) so a post can be republished without a cached permanent redirect.
      ...UNPUBLISHED_BLOG_REDIRECTS,
      ...UNPUBLISHED_PROJECT_REDIRECTS,
      // Single contact form: the old /contact page now lives in the home
      // page's #contact form. Temporary (307) so a dedicated page can return.
      {
        source: "/:locale(en|fr|es)/contact",
        destination: "/:locale#contact",
        permanent: false,
      },
      // /resources was merged into /uses (same tools, plus references).
      {
        source: "/:locale(en|fr|es)/resources",
        destination: "/:locale/uses",
        permanent: true,
      },
      // Old iDEM Connect project slug
      {
        source: "/:locale(en|fr|es)/projects/apex-backend-idem-connect",
        destination: "/:locale/projects/idemconnect-apex-backend",
        permanent: true,
      },
      // Legal notice: old URL → new URL
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
      // Old migration-visualforce-to-lwc slug: the post is unpublished → blog index.
      {
        source: "/:locale(en|fr|es)/blog/migration-visualforce-to-lwc",
        destination: "/:locale/blog",
        permanent: false,
      },
      // Unpublished posts (too short, not reviewed); temporary redirects so
      // existing links keep working.
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
      // The public changelog page is gone (history stays in CHANGELOG.md); the
      // colophon is the visitor-facing DevSecOps page.
      {
        source: "/:locale(en|fr|es)/changelog",
        destination: "/:locale/colophon",
        permanent: false,
      },
      // The feed is served at /feed.xml
      {
        source: "/rss.xml",
        destination: "/feed.xml",
        permanent: true,
      },
    ];
  },

  // ── Lightweight 404 for missing static files ─────────────────────────────
  // A missing image would otherwise hit the app/[locale]/[...rest] catch-all
  // and get a full, dynamically rendered HTML 404. `afterFiles` rewrites run
  // after public/ and static routes but before dynamic routes, so existing
  // files are served normally and only missing ones reach
  // app/api/asset-not-found (plain-text 404).
  async rewrites() {
    return {
      afterFiles: [
        {
          source: "/:asset(.*\\.(?:webp|png|jpe?g|gif|svg|avif|ico|pdf))",
          destination: "/api/asset-not-found",
        },
      ],
    };
  },

  async headers() {
    return [
      // ── Public static assets (logo, avatar, CV PDF…) ──────────────────────
      // Vercel already caches /_next/static/ as immutable. Files in /public/
      // have no Cache-Control by default: 1 day here, not immutable (no hash
      // in their URL, so an updated /avatar.webp must be picked up).
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
        // Security headers on every route
        source: "/(.*)",
        headers: [
          // No framing by other sites (clickjacking)
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          // No MIME type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          // Full URL to the same origin only, otherwise just the origin
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          // Disable sensitive APIs the site does not use (payment, USB,
          // Bluetooth…), so an injected or third-party script cannot use them.
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
          
          // Blocks cross-domain loading through legacy Flash/PDF plugins;
          // cosmetic today, but expected by security scanners.
          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none"
          },
          // The Content-Security-Policy is built per request in proxy.ts (with
          // a nonce): never add a static CSP here, it would override it on
          // HTML routes. See buildCSP() in proxy.ts.
          // HSTS for 2 years (includeSubDomains + preload): only valid while
          // the domain is always served over HTTPS.
          {
            key: "Strict-Transport-Security",
            // 63072000 s = 2 years (preload minimum)
  value: 'max-age=63072000; includeSubDomains; preload'
          },
          // Isolates the browsing context from cross-origin windows
          // (Spectre-style attacks, window.opener abuse).
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin"
          },
          // Other origins cannot load our resources (images, fonts, JSON)
          // without explicit CORS.
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin"
          },
          // ── Reporting API, alongside report-uri ───────────────────────────
          // report-uri (CSP Level 2) is deprecated but still the only
          // universally supported mechanism, so both are sent: Report-To
          // (Reporting API v0) and Reporting-Endpoints (v1), same endpoint.
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

// MDX pipeline (blog posts and case studies). rehype-pretty-code (shiki)
// highlights at build time with two themes exposed as --shiki-light /
// --shiki-dark CSS variables; inline code is not highlighted
// (bypassInlineCode) and backgrounds come from globals.css
// (keepBackground: false).
const withMDX = createMDX({
  options: {
    // remark-gfm: tables, task lists, autolinks, strikethrough (used by case
    // studies under content/projects/ and blog posts).
    remarkPlugins: [remarkFrontmatter, remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: {
            light: "github-light",
            // Comment contrast on the dark background: github-dark 3.14:1 and
            // github-dark-dimmed 3.92:1 fail WCAG AA; github-dark-default 6.15:1.
            dark: "github-dark-default",
          },
          bypassInlineCode: true,
          keepBackground: false,
        },
      ],
    ],
  }
});

// next-intl plugin, pointing to the App Router request config
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withBundleAnalyzer(withNextIntl(withMDX(nextConfig)));

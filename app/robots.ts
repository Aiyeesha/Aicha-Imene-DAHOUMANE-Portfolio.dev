import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/siteUrl";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Règles Disallow — trailing slash couvre à la fois /path et /path/xxx.
      // /cv/            : PDFs du CV — pas d'indexation directe (version statique potentiellement dépassée).
      // /admin/         : panneau d'administration — jamais indexé.
      // /api/           : routes API — pas de pages lisibles; couvre aussi /api/health, /api/cron…
      // /*/testimonial-submit/ : formulaire privé token-gated — pas d'indexation.
      disallow: ["/cv/", "/admin/", "/api/", "/*/testimonial-submit", "/*/status"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}

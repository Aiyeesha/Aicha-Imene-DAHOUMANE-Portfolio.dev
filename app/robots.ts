import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /cv/ : les PDFs du CV ne doivent pas être indexés directement par Google
      // (risque d'indexation d'une version statique dépassée, et OSINT inutile).
      // /admin/ : panneau d'administration — jamais indexé.
      disallow: ["/cv/", "/admin/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}

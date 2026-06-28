import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/siteUrl";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      // /cv/ and /api/ are disallowed to prevent indexing of PDFs and API routes.
      // Sensitive paths (/admin, /testimonial-submit) are protected by auth, not listed here,
      // to avoid advertising their existence to attackers via robots.txt reconnaissance.
      // Allow: / is intentionally omitted — it is implicit and would be redundant.
      disallow: ["/cv/", "/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}

// app/[locale]/blog/[slug]/opengraph-image.tsx
// ---------------------------------------------
// Image OG dynamique par article de blog.
// Rendue avec Satori (next/og) — une image par (locale, slug).
// Affiche : titre de l'article, tags, temps de lecture, auteure, URL du site.

import { ImageResponse } from "next/og";
import { readAllPosts, readPostMeta } from "@/content/blog/fs";
import type { BlogLocale } from "@/content/blog/fs";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Pré-génère les paramètres (locale × slug) au build pour les URLs statiques
export async function generateStaticParams() {
  const locales: BlogLocale[] = ["en", "fr"];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const posts = readAllPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function Image({ params }: Props) {
  const { locale, slug } = await params;
  const safeLocale: BlogLocale = locale === "fr" ? "fr" : "en";

  // Lecture des métadonnées de l'article
  const post = readPostMeta(safeLocale, slug);

  const title       = post?.title       || slug.replace(/-/g, " ");
  const excerpt     = post?.excerpt     || "";
  const tags        = post?.tags?.slice(0, 3) ?? [];
  const readingTime = post?.readingTime ?? null;
  const isFr        = safeLocale === "fr";

  const siteUrl    = (process.env.NEXT_PUBLIC_SITE_URL || "portfolio-next-one-gold.vercel.app")
    .replace(/^https?:\/\//, "");
  const authorName = process.env.NEXT_PUBLIC_OG_NAME || "Aïcha Imène DAHOUMANE";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: "linear-gradient(135deg, #0c1425 0%, #070B1A 60%, #060914 100%)",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Cercle décoratif en arrière-plan */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -60,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.10) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* HAUT — Label "Blog" */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Badge "Blog" */}
          <div
            style={{
              padding: "6px 16px",
              borderRadius: 999,
              background: "rgba(34,211,238,0.15)",
              border: "1px solid rgba(34,211,238,0.3)",
              color: "#22d3ee",
              fontSize: 16,
              fontWeight: 600,
              display: "flex",
            }}
          >
            Blog
          </div>

          {/* Temps de lecture */}
          {readingTime && (
            <div
              style={{
                padding: "6px 16px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.6)",
                fontSize: 16,
                display: "flex",
              }}
            >
              {readingTime} min {isFr ? "de lecture" : "read"}
            </div>
          )}

          {/* Tags (2 max pour ne pas surcharger la ligne) */}
          {tags.slice(0, 2).map((tag) => (
            <div
              key={tag}
              style={{
                padding: "6px 16px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
                fontSize: 16,
                display: "flex",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* MILIEU — Titre de l'article */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: title.length > 60 ? 38 : 46,
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: -0.5,
              color: "white",
              maxWidth: 900,
            }}
          >
            {title}
          </div>
          {excerpt && (
            <div
              style={{
                fontSize: 20,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.5,
                maxWidth: 800,
                // Tronque à environ 2 lignes
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {excerpt}
            </div>
          )}
        </div>

        {/* BAS — Auteure + URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 24,
          }}
        >
          <div style={{ fontSize: 18, color: "rgba(255,255,255,0.6)" }}>
            {authorName}
          </div>
          <div style={{ fontSize: 17, color: "rgba(255,255,255,0.35)" }}>
            {siteUrl}
          </div>
        </div>
      </div>
    ),
    size
  );
}

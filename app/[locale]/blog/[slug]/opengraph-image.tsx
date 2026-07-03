// app/[locale]/blog/[slug]/opengraph-image.tsx
// ---------------------------------------------
// Image OG dynamique par article de blog.
// Rendue avec Satori (next/og) — une image par (locale, slug).
// Affiche : titre de l'article, tags, temps de lecture, auteure, URL du site.
//
// Couleur d'accent déterminée par la catégorie principale de l'article :
//   Salesforce  → cyan   (#22d3ee)
//   IT Ops      → violet (#a78bfa)
//   Next.js/Web → orange (#f97316)
//   Autre       → cyan   (défaut)

import { ImageResponse } from "next/og";
import { readAllPosts, readPostMeta } from "@/content/blog/fs";
import { getSiteUrl } from "@/lib/siteUrl";
import type { BlogLocale } from "@/content/blog/fs";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Pré-génère les paramètres (locale × slug) au build pour les URLs statiques
export async function generateStaticParams() {
  const locales: BlogLocale[] = ["en", "fr", "es"];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const posts = readAllPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

// ── Détection de catégorie depuis les tags ──────────────────────────────────
//
// Priorité : IT Ops > Next.js/Web > Salesforce (défaut)
// On teste les tags ET le slug pour une détection robuste.
type CategoryTheme = {
  accent: string;
  accentBg: string;
  accentBorder: string;
  glow: string;
  categoryLabel: string;
};

function getCategoryTheme(tags: string[], slug: string): CategoryTheme {
  const haystack = [...tags, slug].join(" ").toLowerCase();

  // IT Ops / Infrastructure / Security / Sysadmin
  const itOpsPattern =
    /\b(it.?ops|windows|linux|docker|network|vlan|powershell|backup|veeam|hyper.?v|active.directory|monitoring|siem|elastic|firewall|pfsense|hardening|ssl|tls|incident|runbook|automation|scripting|server|sysadmin|infra|securit|prometheus|grafana|alertmanager|rds|rmm|datto|autotask|acronis|malware)\b/i;

  // Next.js / Web / TypeScript / Design
  const webPattern =
    /\b(next\.?js|react|typescript|tailwind|supabase|vercel|framer|animation|design.system|rsc|server.component|playwright|jest|testing|web|seo|image.optim|caching|deployment|shadcn)\b/i;

  if (itOpsPattern.test(haystack)) {
    return {
      accent: "#a78bfa",
      accentBg: "rgba(167,139,250,0.15)",
      accentBorder: "rgba(167,139,250,0.35)",
      glow: "rgba(167,139,250,0.10)",
      categoryLabel: "IT Ops",
    };
  }

  if (webPattern.test(haystack)) {
    return {
      accent: "#f97316",
      accentBg: "rgba(249,115,22,0.15)",
      accentBorder: "rgba(249,115,22,0.35)",
      glow: "rgba(249,115,22,0.10)",
      categoryLabel: "Next.js",
    };
  }

  // Salesforce (défaut)
  return {
    accent: "#22d3ee",
    accentBg: "rgba(34,211,238,0.15)",
    accentBorder: "rgba(34,211,238,0.35)",
    glow: "rgba(34,211,238,0.10)",
    categoryLabel: "Salesforce",
  };
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

  const siteUrl    = getSiteUrl()
    .replace(/^https?:\/\//, "");
  const authorName = process.env.NEXT_PUBLIC_OG_NAME || "Aïcha Imène DAHOUMANE";

  // Déterminer la palette selon la catégorie
  const { accent, accentBg, accentBorder, glow, categoryLabel } = getCategoryTheme(tags, slug);

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
          position: "relative",
        }}
      >
        {/* Halo décoratif — couleur de la catégorie */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -60,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
            display: "flex",
          }}
        />

        {/* HAUT — Badge catégorie + temps de lecture + tags */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Badge catégorie coloré */}
          <div
            style={{
              padding: "6px 18px",
              borderRadius: 999,
              background: accentBg,
              border: `1px solid ${accentBorder}`,
              color: accent,
              fontSize: 16,
              fontWeight: 700,
              display: "flex",
            }}
          >
            {categoryLabel}
          </div>

          {/* Badge "Blog" neutre */}
          <div
            style={{
              padding: "6px 16px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.6)",
              fontSize: 16,
              fontWeight: 500,
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
                color: "rgba(255,255,255,0.5)",
                fontSize: 16,
                display: "flex",
              }}
            >
              {readingTime} min {isFr ? "de lecture" : "read"}
            </div>
          )}

          {/* Tags (2 max) */}
          {tags.slice(0, 2).map((tag) => (
            <div
              key={tag}
              style={{
                padding: "6px 16px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "rgba(255,255,255,0.6)",
                fontSize: 15,
                display: "flex",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* MILIEU — Titre + excerpt */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            flex: 1,
            justifyContent: "center",
          }}
        >
          {/* Ligne d'accent à gauche du titre */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
            <div
              style={{
                width: 4,
                borderRadius: 2,
                background: accent,
                alignSelf: "stretch",
                flexShrink: 0,
                display: "flex",
                minHeight: 48,
              }}
            />
            <div
              style={{
                fontSize: title.length > 60 ? 38 : 46,
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: -0.5,
                color: "white",
                maxWidth: 860,
              }}
            >
              {title}
            </div>
          </div>

          {excerpt && (
            <div
              style={{
                fontSize: 20,
                color: "rgba(255,255,255,0.50)",
                lineHeight: 1.55,
                maxWidth: 820,
                paddingLeft: 24,
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
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: 22,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Pastille colorée de catégorie */}
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: accent,
                flexShrink: 0,
                display: "flex",
              }}
            />
            <div style={{ fontSize: 17, color: "rgba(255,255,255,0.55)" }}>
              {authorName}
            </div>
          </div>
          <div style={{ fontSize: 16, color: "rgba(255,255,255,0.30)" }}>
            {siteUrl}
          </div>
        </div>
      </div>
    ),
    size
  );
}

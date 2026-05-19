// app/[locale]/projects/[slug]/opengraph-image.tsx
// -------------------------------------------------
// Image OG dynamique par page de projet.
// Rendue avec Satori (next/og) — générée à la demande (force-dynamic)
// car les projets sont stockés dans Supabase (données dynamiques).
//
// Design :
//   - HAUT    : badge "Project" + badge track (Salesforce cyan / IT Ops violet)
//   - MILIEU  : titre du projet (grand) + résumé (2 lignes max)
//   - INFÉRIEUR : tags tech stack (4 max)
//   - BAS     : auteure + URL

import { ImageResponse } from "next/og";
import { getPublishedProjectBySlugWithAssets } from "@/lib/data/projectBySlug";
import { getSiteUrl } from "@/lib/siteUrl";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendu à la demande : les données Supabase sont dynamiques.
// Next.js met en cache l'image OG via le header Cache-Control CDN (Vercel Edge).
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function Image({ params }: Props) {
  const { locale, slug } = await params;

  // ── Données projet depuis Supabase ──────────────────────────────────────
  const project = await getPublishedProjectBySlugWithAssets(locale, slug);

  const title      = project?.title    || slug.replace(/-/g, " ");
  const summary    = project?.summary  || "";
  const tags       = (project?.tech_stack ?? project?.tags ?? []).slice(0, 4);
  const track      = project?.track    || "salesforce";

  const siteUrl    = getSiteUrl()
    .replace(/^https?:\/\//, "");
  const authorName = process.env.NEXT_PUBLIC_OG_NAME || "Aïcha Imène DAHOUMANE";

  // ── Couleurs selon le track ──────────────────────────────────────────────
  // Salesforce : cyan  — IT Ops : violet/indigo
  const trackColor   = track === "itops" ? "#a78bfa" : "#22d3ee";
  const trackBg     = track === "itops" ? "rgba(167,139,250,0.15)" : "rgba(34,211,238,0.15)";
  const trackBorder = track === "itops" ? "rgba(167,139,250,0.35)" : "rgba(34,211,238,0.35)";
  const glowColor   = track === "itops" ? "rgba(167,139,250,0.10)" : "rgba(34,211,238,0.10)";
  const trackLabel  = track === "itops" ? "IT Ops" : "Salesforce";

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
        {/* Cercle décoratif — couleur adaptée au track */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -60,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            display: "flex",
          }}
        />

        {/* ── HAUT — Badges "Project" + track ─────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Badge générique "Project" */}
          <div
            style={{
              padding: "6px 16px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "rgba(255,255,255,0.7)",
              fontSize: 16,
              fontWeight: 600,
              display: "flex",
            }}
          >
            Project
          </div>

          {/* Badge track — Salesforce ou IT Ops */}
          <div
            style={{
              padding: "6px 16px",
              borderRadius: 999,
              background: trackBg,
              border: `1px solid ${trackBorder}`,
              color: trackColor,
              fontSize: 16,
              fontWeight: 600,
              display: "flex",
            }}
          >
            {trackLabel}
          </div>
        </div>

        {/* ── MILIEU — Titre + Résumé ──────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            flex: 1,
            justifyContent: "center",
          }}
        >
          {/* Titre — taille adaptée à la longueur */}
          <div
            style={{
              fontSize: title.length > 55 ? 38 : title.length > 35 ? 46 : 54,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: -0.5,
              color: "white",
              maxWidth: 900,
            }}
          >
            {title}
          </div>

          {/* Résumé (2 lignes max) */}
          {summary && (
            <div
              style={{
                fontSize: 20,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.55,
                maxWidth: 820,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {summary}
            </div>
          )}
        </div>

        {/* ── INFÉRIEUR + BAS — Tags tech + Auteure + URL ─────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Tags tech stack */}
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: 10 }}>
              {tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 999,
                    background: trackBg,
                    border: `1px solid ${trackBorder}`,
                    color: trackColor,
                    fontSize: 15,
                    fontWeight: 500,
                    display: "flex",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}

          {/* Séparateur + auteure + URL */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: 20,
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
      </div>
    ),
    size
  );
}

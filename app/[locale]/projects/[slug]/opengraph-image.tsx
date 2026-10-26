// app/[locale]/projects/[slug]/opengraph-image.tsx
// -------------------------------------------------
// OG image per project (Satori via next/og), rendered on demand.
// Top: "Project" badge + track badge (Salesforce cyan / IT Ops violet);
// middle: title + summary (2 lines max); then tech tags (4 max); bottom:
// author + URL.

import { ImageResponse } from "next/og";
import { getPublishedProjectBySlugWithAssets } from "@/lib/data/projectBySlug";
import { getSiteUrl } from "@/lib/siteUrl";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered on demand (dynamic project data); cached by the CDN through
// Cache-Control.
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function Image({ params }: Props) {
  const { locale, slug } = await params;

  // ── Project data ────────────────────────────────────────────────────────
  const project = await getPublishedProjectBySlugWithAssets(locale, slug);

  const title      = project?.title    || slug.replace(/-/g, " ");
  const summary    = project?.summary  || "";
  const tags       = (project?.tech_stack ?? project?.tags ?? []).slice(0, 4);
  const track      = project?.track    || "salesforce";

  const siteUrl    = getSiteUrl()
    .replace(/^https?:\/\//, "");
  const authorName = process.env.NEXT_PUBLIC_OG_NAME || "Aïcha Imène DAHOUMANE";

  // ── Track colours: Salesforce cyan, IT Ops violet ────────────────────────
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
        {/* Decorative circle in the track colour */}
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

        {/* ── TOP: "Project" + track badges ────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Generic "Project" badge */}
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

          {/* Track badge */}
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

        {/* ── MIDDLE: title + summary ──────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            flex: 1,
            justifyContent: "center",
          }}
        >
          {/* Title, sized by length */}
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

          {/* Summary (2 lines max) */}
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

        {/* ── BOTTOM: tech tags + author + URL ─────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Tech tags */}
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

          {/* Separator + author + URL */}
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

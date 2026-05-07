// app/opengraph-image.tsx
// -----------------------
// Image OpenGraph du site (image par défaut — homepage).
// Design dual-track : présente les deux profils (Salesforce + IT Ops)
// côte à côte, puisque le track toggle est côté client et invisible des crawlers.
//
// Rendue avec Satori / @vercel/og (inclus dans next/og). Taille : 1200×630.

import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 86400;

export default function Image() {
  const name     = process.env.NEXT_PUBLIC_OG_NAME     || "Aïcha Imène DAHOUMANE";
  const initials = (process.env.NEXT_PUBLIC_BRAND_INITIALS || "A").toUpperCase();
  const siteUrl  = (process.env.NEXT_PUBLIC_SITE_URL   || "portfolio-next-one-gold.vercel.app")
    .replace(/^https?:\/\//, "");

  // Palette Salesforce
  const cyan   = "#22d3ee";
  const cyanBg = "rgba(34,211,238,0.15)";
  const cyanBd = "rgba(34,211,238,0.35)";

  // Palette IT Ops
  const violet   = "#a78bfa";
  const violetBg = "rgba(167,139,250,0.15)";
  const violetBd = "rgba(167,139,250,0.35)";

  const salesforceTags = ["Apex", "Flows", "LWC", "SOQL"];
  const itopsTags      = ["Linux", "Docker", "CI/CD", "Scripting"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "52px 64px",
          background: "linear-gradient(135deg, #0c1425 0%, #070B1A 55%, #060914 100%)",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Halos décoratifs */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -60,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.10) 0%, transparent 65%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -40,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 65%)",
            display: "flex",
          }}
        />

        {/* HAUT — Initiales + Nom + Headline */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 18,
              background: "linear-gradient(135deg, #22d3ee 0%, #0ea5e9 50%, #a78bfa 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 800,
              color: "white",
              flexShrink: 0,
              boxShadow: "0 0 36px rgba(34,211,238,0.20)",
            }}
          >
            {initials}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 46, fontWeight: 700, letterSpacing: -0.5, lineHeight: 1.1 }}>
              {name}
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 500,
                // Dégradé cyan → violet pour signifier les deux tracks
                background: `linear-gradient(90deg, ${cyan} 0%, ${violet} 100%)`,
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Salesforce Developer &amp; IT Ops Engineer
            </div>
          </div>
        </div>

        {/* MILIEU — Deux colonnes track */}
        <div style={{ display: "flex", gap: 24, flex: 1, alignItems: "center", paddingTop: 8 }}>
          {/* Colonne Salesforce */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              padding: "24px 28px",
              borderRadius: 16,
              background: cyanBg,
              border: `1px solid ${cyanBd}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: cyan,
                  flexShrink: 0,
                  display: "flex",
                }}
              />
              <div style={{ fontSize: 18, fontWeight: 700, color: cyan }}>
                Salesforce
              </div>
            </div>
            <div style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
              Apex · Flows · LWC · CI/CD · Architecture CRM
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {salesforceTags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 999,
                    background: "rgba(34,211,238,0.10)",
                    border: `1px solid ${cyanBd}`,
                    color: cyan,
                    fontSize: 14,
                    fontWeight: 500,
                    display: "flex",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          {/* Séparateur vertical */}
          <div
            style={{
              width: 1,
              height: 120,
              background: "rgba(255,255,255,0.08)",
              flexShrink: 0,
              display: "flex",
            }}
          />

          {/* Colonne IT Ops */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              padding: "24px 28px",
              borderRadius: 16,
              background: violetBg,
              border: `1px solid ${violetBd}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: violet,
                  flexShrink: 0,
                  display: "flex",
                }}
              />
              <div style={{ fontSize: 18, fontWeight: 700, color: violet }}>
                IT Ops
              </div>
            </div>
            <div style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
              Linux · Docker · Windows Server · Sécurité
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {itopsTags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 999,
                    background: "rgba(167,139,250,0.10)",
                    border: `1px solid ${violetBd}`,
                    color: violet,
                    fontSize: 14,
                    fontWeight: 500,
                    display: "flex",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BAS — URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: 20,
          }}
        >
          <div style={{ fontSize: 16, color: "rgba(255,255,255,0.40)" }}>
            Portfolio · Projets · Blog · Certifications
          </div>
          <div style={{ fontSize: 16, color: "rgba(255,255,255,0.35)" }}>
            {siteUrl}
          </div>
        </div>
      </div>
    ),
    size
  );
}

// app/[locale]/resources/opengraph-image.tsx
// -------------------------------------------
// Image OpenGraph dédiée à la page Ressources & Boîte à outils.

import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 86400;

type Props = { params: Promise<{ locale: string }> };

export default async function Image({ params }: Props) {
  const { locale } = await params;
  const isFr = locale === "fr";

  const name    = process.env.NEXT_PUBLIC_OG_NAME || "Aïcha Imène DAHOUMANE";
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "portfolio-next-one-gold.vercel.app")
    .replace(/^https?:\/\//, "");

  const title   = isFr ? "Ressources & Boîte à outils" : "Resources & Toolbox";
  const subtitle = isFr
    ? "Outils, stacks et références en Salesforce, IT Ops et développement web"
    : "Tools, stacks and references across Salesforce, IT Ops and web development";

  const cyan   = "#22d3ee";
  const violet = "#a78bfa";

  const tags = isFr
    ? ["Salesforce", "IT Ops", "Web Dev", "Open Source"]
    : ["Salesforce", "IT Ops", "Web Dev", "Open Source"];

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
        {/* Halo cyan — haut droite */}
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
        {/* Halo violet — bas gauche */}
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

        {/* HAUT — Nom + Titre */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.45)" }}>{name}</div>
          <div
            style={{
              fontSize: 54,
              fontWeight: 700,
              letterSpacing: -1,
              lineHeight: 1.1,
              background: `linear-gradient(90deg, ${cyan} 0%, ${violet} 100%)`,
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {title}
          </div>
        </div>

        {/* MILIEU — Sous-titre */}
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.45,
            maxWidth: 820,
            paddingLeft: 4,
          }}
        >
          {subtitle}
        </div>

        {/* BAS — Tags + URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            {tags.map((tag, i) => (
              <div
                key={tag}
                style={{
                  padding: "8px 18px",
                  borderRadius: 999,
                  background: i % 2 === 0
                    ? "rgba(34,211,238,0.12)"
                    : "rgba(167,139,250,0.12)",
                  border: i % 2 === 0
                    ? "1px solid rgba(34,211,238,0.30)"
                    : "1px solid rgba(167,139,250,0.30)",
                  color: i % 2 === 0 ? cyan : violet,
                  fontSize: 16,
                  fontWeight: 500,
                  display: "flex",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 16, color: "rgba(255,255,255,0.35)" }}>{siteUrl}</div>
        </div>
      </div>
    ),
    size
  );
}

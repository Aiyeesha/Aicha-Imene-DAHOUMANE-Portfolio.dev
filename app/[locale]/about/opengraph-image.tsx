// app/[locale]/about/opengraph-image.tsx
// ---------------------------------------
// Image OpenGraph dédiée à la page À propos / About.

import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ locale: string }> };

export default async function Image({ params }: Props) {
  const { locale } = await params;
  const isFr = locale === "fr";

  const name    = process.env.NEXT_PUBLIC_OG_NAME  || "Aïcha Imène DAHOUMANE";
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "portfolio-next-one-gold.vercel.app")
    .replace(/^https?:\/\//, "");
  const initials = (process.env.NEXT_PUBLIC_BRAND_INITIALS || "A").toUpperCase();

  const title    = isFr ? "À propos" : "About me";
  const subtitle = isFr
    ? "De l'administration systèmes & réseaux au développement Salesforce"
    : "From systems & network administration to Salesforce development";

  const tags = isFr
    ? ["IT Ops", "Salesforce Dev", "LWC · Apex · Flows", "3 ans d'expérience"]
    : ["IT Ops", "Salesforce Dev", "LWC · Apex · Flows", "3 years experience"];

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
        {/* Cercle décoratif */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* HAUT — Initiales + Titre */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 16,
              background: "linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 800,
              color: "white",
              flexShrink: 0,
              boxShadow: "0 0 32px rgba(99,102,241,0.3)",
            }}
          >
            {initials}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.45)" }}>{name}</div>
            <div style={{ fontSize: 52, fontWeight: 700, letterSpacing: -1, lineHeight: 1.1 }}>
              {title}
            </div>
          </div>
        </div>

        {/* MILIEU — Subtitle */}
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.45,
            maxWidth: 780,
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
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "8px 18px",
                  borderRadius: 999,
                  background: "rgba(99,102,241,0.15)",
                  border: "1px solid rgba(99,102,241,0.35)",
                  color: "#a5b4fc",
                  fontSize: 17,
                  fontWeight: 500,
                  display: "flex",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 17, color: "rgba(255,255,255,0.35)" }}>{siteUrl}</div>
        </div>
      </div>
    ),
    size
  );
}

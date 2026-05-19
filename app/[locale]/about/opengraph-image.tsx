// app/[locale]/about/opengraph-image.tsx
// ---------------------------------------
// Image OpenGraph dédiée à la page À propos / About.
// Palette alignée avec le reste du site : cyan (Salesforce) + violet (IT Ops).
// Design dual-track cohérent avec l'OG de la homepage.

import { ImageResponse } from "next/og";
import { getSiteUrl } from "@/lib/siteUrl";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 86400;

type Props = { params: Promise<{ locale: string }> };

export default async function Image({ params }: Props) {
  const { locale } = await params;
  const isFr = locale === "fr";

  const name     = process.env.NEXT_PUBLIC_OG_NAME || "Aïcha Imène DAHOUMANE";
  const siteUrl  = getSiteUrl()
    .replace(/^https?:\/\//, "");
  const initials = (process.env.NEXT_PUBLIC_BRAND_INITIALS || "A").toUpperCase();

  const title    = isFr ? "À propos" : "About me";
  const subtitle = isFr
    ? "De l'administration systèmes & réseaux au développement Salesforce"
    : "From systems & network administration to Salesforce development";

  // Cyan (Salesforce) + Violet (IT Ops) — palette cohérente avec l'OG homepage
  const cyan   = "#22d3ee";
  const violet = "#a78bfa";

  const tags = isFr
    ? ["Salesforce Dev", "IT Ops", "LWC · Apex · Flows", "3 ans d'expérience"]
    : ["Salesforce Dev", "IT Ops", "LWC · Apex · Flows", "3 years experience"];

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

        {/* HAUT — Initiales + Nom + Titre */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 18,
              background: `linear-gradient(135deg, ${cyan} 0%, #0ea5e9 50%, ${violet} 100%)`,
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
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.45)" }}>{name}</div>
            <div
              style={{
                fontSize: 52,
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
        </div>

        {/* MILIEU — Subtitle */}
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
                  // Alterne cyan/violet pour les 4 tags
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

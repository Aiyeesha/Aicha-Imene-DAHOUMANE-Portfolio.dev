// app/[locale]/certifications/opengraph-image.tsx
// ------------------------------------------------
// Image OG dédiée à la page Certifications.

import { ImageResponse } from "next/og";
import { getSiteUrl } from "@/lib/siteUrl";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ locale: string }> };

export default async function Image({ params }: Props) {
  const { locale } = await params;
  const isFr = locale === "fr";
  const isEs = locale === "es";

  const name    = process.env.NEXT_PUBLIC_OG_NAME  || "Aïcha Imène DAHOUMANE";
  const siteUrl = getSiteUrl()
    .replace(/^https?:\/\//, "");

  const title    = isFr ? "Certifications & Diplômes"  : isEs ? "Certificaciones y diplomas" : "Certifications & Diplomas";
  const subtitle = isFr
    ? "RNCP 4 · RNCP 5 · RNCP 6 · Trailhead Expeditioner · Salesforce Admin · Platform Developer I"
    : isEs
    ? "RNCP 4 · RNCP 5 · RNCP 6 · Trailhead Expeditioner · Salesforce Admin · Platform Developer I"
    : "RNCP 4 · RNCP 5 · RNCP 6 · Trailhead Expeditioner · Salesforce Admin · Platform Developer I";

  const badges = [
    { label: isFr ? "Obtenu" : isEs ? "Obtenido" : "Completed",         color: "rgba(16,185,129,0.2)",  border: "rgba(16,185,129,0.4)",  text: "#6ee7b7" },
    { label: isFr ? "Actif"  : isEs ? "Activo" : "Active",             color: "rgba(34,211,238,0.15)", border: "rgba(34,211,238,0.35)", text: "#22d3ee" },
    { label: isFr ? "En preparation" : isEs ? "En preparación" : "2026",       color: "rgba(251,191,36,0.15)", border: "rgba(251,191,36,0.35)", text: "#fcd34d" },
  ];

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
            background: "radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* HAUT — Titre + Sous-titre */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 54, fontWeight: 700, letterSpacing: -1, lineHeight: 1.1 }}>
            {title}
          </div>
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>
            {subtitle}
          </div>
        </div>

        {/* MILIEU — Badges de statut */}
        <div style={{ display: "flex", gap: 16 }}>
          {badges.map((badge) => (
            <div
              key={badge.label}
              style={{
                padding: "12px 24px",
                borderRadius: 12,
                background: badge.color,
                border: `1px solid ${badge.border}`,
                color: badge.text,
                fontSize: 20,
                fontWeight: 600,
                display: "flex",
              }}
            >
              {badge.label}
            </div>
          ))}
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
          <div style={{ fontSize: 18, color: "rgba(255,255,255,0.6)" }}>{name}</div>
          <div style={{ fontSize: 17, color: "rgba(255,255,255,0.35)" }}>{siteUrl}</div>
        </div>
      </div>
    ),
    size
  );
}

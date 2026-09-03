// app/[locale]/contact/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { getSiteUrl } from "@/lib/siteUrl";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ locale: string }> };

export default async function Image({ params }: Props) {
  const { locale } = await params;
  const isFr = locale === "fr";
  const isEs = locale === "es";

  const name    = process.env.NEXT_PUBLIC_OG_NAME || "Aïcha Imène DAHOUMANE";
  const siteUrl = getSiteUrl().replace(/^https?:\/\//, "");

  const title    = isFr ? "Contactez-moi" : isEs ? "Contáctame" : "Get in touch";
  const subtitle = isFr
    ? "Réponse sous 48h — Mission, CDI, CDD"
    : isEs
    ? "Respuesta en 48h — Proyecto, contrato indefinido, temporal"
    : "Reply within 48h — Contract, Permanent, Fixed-term";

  const cyan   = "#22d3ee";
  const violet = "#a78bfa";

  const pills = isFr
    ? ["CDI · CDD", "Mission · Prestation", "100 % Remote", "France & international"]
    : isEs
    ? ["Indefinido · Temporal", "Proyecto · Servicios", "100 % Remoto", "España & internacional"]
    : ["Permanent · Fixed-term", "Contract · Consulting", "100 % Remote", "France & worldwide"];

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
        {/* Halos décoratifs */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -60,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.10) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -40,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* HAUT — Titre + Sous-titre */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: -1.5,
              lineHeight: 1,
              background: `linear-gradient(90deg, ${cyan} 0%, ${violet} 100%)`,
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 24, color: "rgba(255,255,255,0.60)", lineHeight: 1.4 }}>
            {subtitle}
          </div>
        </div>

        {/* MILIEU — Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          {pills.map((pill, i) => (
            <div
              key={pill}
              style={{
                padding: "12px 22px",
                borderRadius: 999,
                background: i % 2 === 0 ? "rgba(34,211,238,0.10)" : "rgba(167,139,250,0.10)",
                border: `1px solid ${i % 2 === 0 ? "rgba(34,211,238,0.30)" : "rgba(167,139,250,0.30)"}`,
                color: i % 2 === 0 ? cyan : violet,
                fontSize: 20,
                fontWeight: 600,
                display: "flex",
              }}
            >
              {pill}
            </div>
          ))}
        </div>

        {/* BAS — Nom + URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 24,
          }}
        >
          <div style={{ fontSize: 18, color: "rgba(255,255,255,0.60)" }}>{name}</div>
          <div style={{ fontSize: 17, color: "rgba(255,255,255,0.35)" }}>{siteUrl}</div>
        </div>
      </div>
    ),
    size
  );
}

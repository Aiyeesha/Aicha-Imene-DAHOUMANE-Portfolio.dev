// app/[locale]/work-with-me/opengraph-image.tsx
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

  const title    = isFr ? "Travaillons ensemble" : isEs ? "Trabajemos juntos" : "Work with me";
  const subtitle = isFr
    ? "Salesforce · IT Ops · 100 % Remote · France & international"
    : isEs
    ? "Salesforce · IT Ops · 100 % Remoto · España e internacional"
    : "Salesforce · IT Ops · 100 % Remote · France & worldwide";
  const availLabel = isFr ? "Disponible dès maintenant" : isEs ? "Disponible de inmediato" : "Available immediately";

  const cyan   = "#22d3ee";
  const violet = "#a78bfa";
  const green  = "#34d399";

  const domains = isFr
    ? ["Salesforce Dev", "Admin Salesforce", "IT Ops", "DevOps / CI·CD"]
    : isEs
    ? ["Salesforce Dev", "Administración Salesforce", "IT Ops", "DevOps / CI·CD"]
    : ["Salesforce Dev", "Salesforce Admin", "IT Ops", "DevOps / CI·CD"];

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
            background: "radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* HAUT — Badge disponibilité + Titre */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Badge disponibilité */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 20px",
              borderRadius: 999,
              background: "rgba(52,211,153,0.12)",
              border: "1px solid rgba(52,211,153,0.35)",
              width: "fit-content",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: green,
                flexShrink: 0,
                display: "flex",
              }}
            />
            <div style={{ fontSize: 18, fontWeight: 700, color: green }}>
              {availLabel}
            </div>
          </div>

          <div style={{ fontSize: 58, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.05 }}>
            {title}
          </div>
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.55)", lineHeight: 1.4 }}>
            {subtitle}
          </div>
        </div>

        {/* MILIEU — Domaines */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {domains.map((d, i) => (
            <div
              key={d}
              style={{
                padding: "10px 20px",
                borderRadius: 12,
                background: i < 2 ? "rgba(34,211,238,0.10)" : "rgba(167,139,250,0.10)",
                border: `1px solid ${i < 2 ? "rgba(34,211,238,0.30)" : "rgba(167,139,250,0.30)"}`,
                color: i < 2 ? cyan : violet,
                fontSize: 19,
                fontWeight: 600,
                display: "flex",
              }}
            >
              {d}
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

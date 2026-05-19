// app/twitter-image.tsx
// ----------------------
// Twitter/X Card image — partagée également par Slack, iMessage, WhatsApp.
// Format 1200×630 (summary_large_image) — cohérent avec l'image OG principale.
// revalidate = 86400 : recalculée au maximum 1×/jour, mise en cache par Next.js CDN.

import { ImageResponse } from "next/og";
import { getSiteUrl } from "@/lib/siteUrl";

export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";
// Cache l'image 24h — sans revalidate elle est recalculée à chaque crawl Twitter/X.
export const revalidate  = 86400;

export default function Image() {
  const name     = process.env.NEXT_PUBLIC_OG_NAME     || "Aïcha Imène DAHOUMANE";
  const headline = process.env.NEXT_PUBLIC_OG_HEADLINE || "Salesforce Developer & Consultant";
  const siteUrl  = getSiteUrl()
    .replace(/^https?:\/\//, "");
  const initials = (process.env.NEXT_PUBLIC_BRAND_INITIALS || "A").toUpperCase();

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
        {/* Halo décoratif */}
        <div style={{
          position: "absolute", top: -100, right: -60,
          width: 380, height: 380, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,211,238,0.13) 0%, transparent 70%)",
          display: "flex",
        }} />

        {/* Haut — Avatar initiales + Nom + Rôle */}
        <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <div style={{
            width: 88, height: 88, borderRadius: 18,
            background: "linear-gradient(135deg, #22d3ee 0%, #0ea5e9 50%, #2563eb 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 36, fontWeight: 800, color: "white", flexShrink: 0,
          }}>
            {initials}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ fontSize: 46, fontWeight: 700, letterSpacing: -1, lineHeight: 1.1 }}>
              {name}
            </div>
            <div style={{ fontSize: 22, color: "#22d3ee", fontWeight: 500 }}>
              {headline}
            </div>
          </div>
        </div>

        {/* Milieu — Tagline */}
        <div style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.6)", lineHeight: 1.5, maxWidth: 680 }}>
          Salesforce · Apex · LWC · CI/CD · IT Ops · DevOps — Remote · France
        </div>

        {/* Bas — URL */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ fontSize: 16, color: "rgba(255,255,255,0.35)" }}>{siteUrl}</div>
        </div>
      </div>
    ),
    size
  );
}

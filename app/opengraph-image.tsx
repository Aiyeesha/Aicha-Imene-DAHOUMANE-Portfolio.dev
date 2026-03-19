// app/opengraph-image.tsx
// -----------------------
// Image OpenGraph du site (image par défaut pour toutes les pages).
// Rendue côté serveur via Satori / @vercel/og (inclus dans next/og).
// Taille : 1200×630 (standard OG).
//
// Identité visuelle : fond sombre, accent cyan, initiales dans un cercle gradient.
// Représente le track Salesforce (profil par défaut du site).

import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Cache l'image OG 24h — sans revalidate, elle est recalculée à chaque crawl
// OG (LinkedIn, Twitter, Slack, WhatsApp) ce qui consomme des CPU cycles inutilement.
export const revalidate = 86400;

export default function Image() {
  const name    = process.env.NEXT_PUBLIC_OG_NAME     || "Aïcha Imène DAHOUMANE";
  const role    = process.env.NEXT_PUBLIC_OG_HEADLINE || "Salesforce Developer & Consultant";
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL   || "portfolio-next-one-gold.vercel.app")
    .replace(/^https?:\/\//, "");
  const initials = (process.env.NEXT_PUBLIC_BRAND_INITIALS || "A").toUpperCase();

  // Tags de compétences affichés sur l'image
  const tags = ["Apex", "Flows", "LWC", "CI/CD"];

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
          // Fond sombre avec gradient radial subtil en haut à gauche
          background: "linear-gradient(135deg, #0c1425 0%, #070B1A 50%, #060914 100%)",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Cercle décoratif en arrière-plan */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* HAUT — Initiales + Nom + Rôle */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {/* Avatar initiales */}
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 20,
              background: "linear-gradient(135deg, #22d3ee 0%, #0ea5e9 50%, #2563eb 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
              color: "white",
              flexShrink: 0,
              boxShadow: "0 0 40px rgba(34,211,238,0.25)",
            }}
          >
            {initials}
          </div>

          {/* Nom + Rôle */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 50, fontWeight: 700, letterSpacing: -1, lineHeight: 1.1 }}>
              {name}
            </div>
            <div style={{ fontSize: 24, color: "#22d3ee", fontWeight: 500 }}>
              {role}
            </div>
          </div>
        </div>

        {/* MILIEU — Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.5,
            maxWidth: 700,
          }}
        >
          Building secure, scalable, and maintainable Salesforce solutions — from Apex to production.
        </div>

        {/* BAS — Tags + URL */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          {/* Tags compétences */}
          <div style={{ display: "flex", gap: 12 }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "8px 18px",
                  borderRadius: 999,
                  background: "rgba(34,211,238,0.12)",
                  border: "1px solid rgba(34,211,238,0.3)",
                  color: "#22d3ee",
                  fontSize: 17,
                  fontWeight: 500,
                  display: "flex",
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* URL du site */}
          <div style={{ fontSize: 17, color: "rgba(255,255,255,0.4)" }}>
            {siteUrl}
          </div>
        </div>
      </div>
    ),
    size
  );
}

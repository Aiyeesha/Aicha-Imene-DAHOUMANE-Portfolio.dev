// lib/og/homeImage.tsx
// --------------------
// Main share image (home page and pages without their own image), 1200×630,
// rendered with Satori (next/og) in the visitor's language.
//
// What a recruiter sees first when the site is shared on LinkedIn, Slack or
// by e-mail: the photo, the name, the target roles, the availability (same
// wording as the hero badge) and the two skill sets. The former image showed
// a placeholder initial, no role and no availability, with French words on
// every language.
//
// Used by app/[locale]/opengraph-image.tsx (per locale) and by the root
// app/opengraph-image.tsx / app/twitter-image.tsx (English, the x-default).

import { ImageResponse } from "next/og";
import { getSiteUrl } from "@/lib/siteUrl";
import { AVATAR_OG_DATA_URL } from "@/lib/og/avatarData";
import fr from "@/messages/fr.json";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

export const OG_SIZE = { width: 1200, height: 630 };

type OgLocale = "fr" | "en" | "es";

// Target roles: same wording as the CV headers (public/cv/*.html).
const ROLES: Record<OgLocale, string> = {
  fr: "Développeuse / Administratrice Salesforce · Systèmes & Réseaux · DevOps",
  en: "Salesforce Developer / Administrator · Systems & Networks · DevOps",
  es: "Desarrolladora / Administradora Salesforce · Sistemas y Redes · DevOps",
};

const LOCATION: Record<OgLocale, string> = {
  fr: "Île-de-France · Paris",
  en: "Île-de-France · Paris, France",
  es: "Île-de-France · París, Francia",
};

// Availability: the hero badge text, so the image never drifts from the site
// (its date is checked against lib/availability.ts by availability.test.ts).
const BADGE: Record<OgLocale, string> = {
  fr: fr.availModal.badge,
  en: en.availModal.badge,
  es: es.availModal.badge,
};

const SALESFORCE_TAGS = ["Apex", "LWC", "Flows", "SOQL", "CI/CD"];
const ITOPS_TAGS = ["Windows Server", "AD DS", "Linux", "PfSense", "Docker"];

const CYAN = "#22d3ee";
const VIOLET = "#a78bfa";

function toOgLocale(locale: string): OgLocale {
  return locale === "fr" || locale === "es" ? locale : "en";
}

/** Tag pill in the colour of its track. */
function Tag({ label, color }: { label: string; color: string }) {
  return (
    <div
      style={{
        display: "flex",
        padding: "6px 14px",
        borderRadius: 999,
        fontSize: 20,
        color,
        border: `1px solid ${color}66`,
        background: `${color}1f`,
      }}
    >
      {label}
    </div>
  );
}

export function renderHomeOgImage(locale: string): ImageResponse {
  const l = toOgLocale(locale);
  const name = process.env.NEXT_PUBLIC_OG_NAME || "Aïcha Imène DAHOUMANE";
  const siteUrl = getSiteUrl().replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "56px 64px",
          gap: 56,
          background: "linear-gradient(135deg, #0c1425 0%, #070B1A 55%, #060914 100%)",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* ── Left: text ─────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Availability, as on the hero badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                alignSelf: "flex-start",
                padding: "8px 18px",
                borderRadius: 999,
                // 19px keeps the longest wording (ES) on one line
                fontSize: 19,
                color: "#6ee7b7",
                background: "rgba(16,185,129,0.14)",
                border: "1px solid rgba(16,185,129,0.4)",
              }}
            >
              <div style={{ display: "flex", width: 12, height: 12, borderRadius: 999, background: "#10b981" }} />
              {BADGE[l]}
            </div>

            <div style={{ display: "flex", fontSize: 60, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1 }}>
              {name}
            </div>

            {/* Target roles, cyan → violet like the two tracks */}
            <div
              style={{
                display: "flex",
                fontSize: 28,
                fontWeight: 600,
                lineHeight: 1.3,
                backgroundImage: `linear-gradient(90deg, ${CYAN}, ${VIOLET})`,
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {ROLES[l]}
            </div>

            <div style={{ display: "flex", fontSize: 22, color: "rgba(255,255,255,0.7)" }}>{LOCATION[l]}</div>
          </div>

          {/* Skills of both tracks, then the site address */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {SALESFORCE_TAGS.map((t) => <Tag key={t} label={t} color={CYAN} />)}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {ITOPS_TAGS.map((t) => <Tag key={t} label={t} color={VIOLET} />)}
            </div>
            <div style={{ display: "flex", marginTop: 10, fontSize: 20, color: "rgba(255,255,255,0.55)" }}>{siteUrl}</div>
          </div>
        </div>

        {/* ── Right: photo with the two-track gradient frame ─────────── */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              padding: 6,
              borderRadius: 36,
              background: `linear-gradient(135deg, ${CYAN}, ${VIOLET})`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> only */}
            <img
              src={AVATAR_OG_DATA_URL}
              width={340}
              height={340}
              alt=""
              style={{ borderRadius: 30, objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}

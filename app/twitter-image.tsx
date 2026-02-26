import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const name = process.env.NEXT_PUBLIC_OG_NAME || "Aïcha Imène DAHOUMANE";
  const headline = process.env.NEXT_PUBLIC_OG_HEADLINE || "Salesforce / IT Ops";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#070B1A",
          color: "white"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1 }}>
            {name}
          </div>
          <div style={{ fontSize: 28, opacity: 0.85 }}>
            {headline}
          </div>
        </div>

        <div style={{ fontSize: 18, opacity: 0.7 }}>Portfolio</div>
      </div>
    ),
    size
  );
}

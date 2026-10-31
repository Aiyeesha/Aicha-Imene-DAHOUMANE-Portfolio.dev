// app/opengraph-image.tsx
// -----------------------
// Root share image (English, the x-default locale), for crawlers that reach
// /opengraph-image directly and pages without a localised image. Same layout as
// app/[locale]/opengraph-image.tsx (lib/og/homeImage.tsx).

import { renderHomeOgImage, OG_SIZE } from "@/lib/og/homeImage";

export const size = OG_SIZE;
export const contentType = "image/png";
// Cached 24h; without revalidate it would be rendered on every crawl.
export const revalidate = 86400;

export default function Image() {
  return renderHomeOgImage("en");
}

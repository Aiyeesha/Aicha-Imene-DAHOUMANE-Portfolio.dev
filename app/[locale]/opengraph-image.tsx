// app/[locale]/opengraph-image.tsx
// --------------------------------
// Main share image in the page's language (photo, roles, availability).
// Layout in lib/og/homeImage.tsx, shared with the root (English) image.

import { renderHomeOgImage, OG_SIZE } from "@/lib/og/homeImage";

export const size = OG_SIZE;
export const contentType = "image/png";
// Cached 24h, like the other share images.
export const revalidate = 86400;
export const alt = "Aïcha Imène DAHOUMANE — Salesforce · Systems & Networks · DevOps";

type Props = { params: Promise<{ locale: string }> };

export default async function Image({ params }: Props) {
  const { locale } = await params;
  return renderHomeOgImage(locale);
}

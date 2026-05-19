// Retourne l'URL canonique du site, en préférant NEXT_PUBLIC_SITE_URL,
// puis VERCEL_URL en production, puis localhost pour le dev.
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_ENV === "production" && process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

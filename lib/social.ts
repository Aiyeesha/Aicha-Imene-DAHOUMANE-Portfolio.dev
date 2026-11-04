// lib/social.ts
// Single source of truth for sanitised social links; tolerates a malformed
// env variable (commas, spaces, double encoding).

export function sanitizeUrl(raw: string | undefined, fallback = ""): string {
  const candidate = (raw ?? "").split(",")[0].trim();
  if (!candidate) return fallback;
  try {
    const withScheme = candidate.startsWith("http") ? candidate : `https://${candidate}`;
    return new URL(withScheme).href;
  } catch {
    return fallback;
  }
}

// Canonical LinkedIn profile (with the accents of the real handle,
// "aïcha-imène-dahoumane", percent-encoded). The CVs in public/cv link to
// exactly this URL (checked by __tests__/cv-consistency.test.ts); it is also
// the fallback when NEXT_PUBLIC_LINKEDIN_URL is not set. The unaccented
// "aicha-imene-dahoumane" handle is a different, non-existent profile.
export const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/a%C3%AFcha-im%C3%A8ne-dahoumane/";

export const LINKEDIN_URL = sanitizeUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL, LINKEDIN_PROFILE_URL);

// GitHub URL from NEXT_PUBLIC_SAME_AS (comma-separated list, e.g.
// "https://linkedin.com/in/...,https://github.com/Aiyeesha"). The hostname is
// checked with new URL() rather than a substring, so
// "https://evil.com/github.com" is rejected (CWE-184).
export const GITHUB_URL = (() => {
  const sameAs = process.env.NEXT_PUBLIC_SAME_AS ?? "";
  const parts = sameAs.split(",").map((s) => s.trim());
  const gh = parts.find((u) => {
    try {
      const { hostname } = new URL(u.startsWith("http") ? u : `https://${u}`);
      return hostname === "github.com" || hostname.endsWith(".github.com");
    } catch {
      return false;
    }
  });
  return sanitizeUrl(gh);
})();

// lib/galleryAlt.ts
// -----------------
// Galleries in content/projectDetails.ts often carry generic alt texts
// ("Cover", "Screenshot 3"), in English for every language. They are replaced
// at render time by a localised description naming the project; a
// hand-written alt text in the content always wins.

const GENERIC_ALT = /^(cover|screenshot\s*\d*)$/i;

export function isGenericAlt(alt: string | null | undefined): boolean {
  return !alt || GENERIC_ALT.test(alt.trim());
}

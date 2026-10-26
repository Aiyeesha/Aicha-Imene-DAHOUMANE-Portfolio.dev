// lib/galleryAlt.ts
// -----------------
// Les galeries de content/projectDetails.ts portent des textes alternatifs
// génériques (« Cover », « Screenshot 3 »), en anglais dans les trois langues :
// 158 images sur 200 au moment de l'audit du 2026-10-25. Ils sont remplacés à
// l'affichage par une description localisée qui nomme le projet. Un texte
// alternatif rédigé à la main dans le contenu reste prioritaire.

const GENERIC_ALT = /^(cover|screenshot\s*\d*)$/i;

export function isGenericAlt(alt: string | null | undefined): boolean {
  return !alt || GENERIC_ALT.test(alt.trim());
}

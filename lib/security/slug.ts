// lib/security/slug.ts
// --------------------
// Validation stricte des slugs (articles de blog, projets).
//
// Un slug légitime est toujours en kebab-case ASCII minuscule
// (ex. « flow-orchestration-patterns »). Tout ce qui sort de ce format —
// retours à la ligne, « / », « .. », « < », « : »… — est rejeté, ce qui :
//   - empêche l'injection de fausses lignes dans les logs (CodeQL js/log-injection) ;
//   - empêche qu'un nom de fichier inattendu dans content/blog/posts ne finisse
//     tel quel dans un href (CodeQL js/stored-xss) ;
//   - bloque toute tentative de traversée de répertoire dans path.join().
//
// La longueur maximale (100) est très au-dessus des slugs réels et borne
// le coût de la regex.

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SLUG_MAX_LENGTH = 100;

export function isValidSlug(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length <= SLUG_MAX_LENGTH &&
    SLUG_RE.test(value)
  );
}

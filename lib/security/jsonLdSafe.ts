// lib/security/jsonLdSafe.ts
// --------------------------
// Sérialise un objet JSON-LD en échappant les caractères dangereux pour
// une insertion dans dangerouslySetInnerHTML.
//
// Sans cet échappement, une donnée contenant "</script>" (ex. un titre de
// projet issu de Supabase) pourrait rompre la balise inline et permettre
// une injection XSS (script breakout).
//
// On échappe les séquences qui terminent ou ouvrent des balises HTML :
//   <  → <   (empêche </script> et <!-- dans le JSON)
//   >  → >   (défense en profondeur)
//   &  → &   (empêche &amp; et les entités HTML)

export function jsonLdStringify(schema: unknown): string {
  return JSON.stringify(schema)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

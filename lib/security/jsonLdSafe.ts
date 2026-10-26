// lib/security/jsonLdSafe.ts
// --------------------------
// Serialises a JSON-LD object for dangerouslySetInnerHTML, escaping
// characters that could break out of the inline <script> (e.g. a project
// title containing "</script>", a script breakout XSS):
//   <  → \u003c   (blocks </script> and <!-- inside the JSON)
//   >  → \u003e   (defence in depth)
//   &  → \u0026   (blocks HTML entities)

export function jsonLdStringify(schema: unknown): string {
  return JSON.stringify(schema)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

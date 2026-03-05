// CodeBlock.server.tsx
// --------------------
// Server Component wrapper pour les blocs de code MDX.
// Utilisé par mdx-components.tsx (App Router @next/mdx).
//
// Architecture :
//   - Le bloc <pre> est rendu côté serveur (aucun JS nécessaire pour l'affichage)
//   - Le bouton "Copier" est un Client Component (CopyButton) — interactivité minimale
//   - data-language, data-theme et autres attrs de rehype-pretty-code sont transmis
//     au <pre> pour que les CSS vars shiki fonctionnent (--shiki-light / --shiki-dark)

import CopyButton from "./CopyButton";

// ── Extraction récursive du texte brut (pour le bouton copier) ─────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractText(node: any): string {
  if (node == null) return "";
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof node === "object" && "props" in node) return extractText((node as any).props?.children);
  return "";
}

// ── Labels humains pour les langages ──────────────────────────────────────
const LANG_LABELS: Record<string, string> = {
  js: "JavaScript",
  javascript: "JavaScript",
  ts: "TypeScript",
  typescript: "TypeScript",
  jsx: "JSX",
  tsx: "TSX",
  css: "CSS",
  scss: "SCSS",
  html: "HTML",
  xml: "XML",
  json: "JSON",
  yaml: "YAML",
  toml: "TOML",
  bash: "Bash",
  sh: "Shell",
  shell: "Shell",
  py: "Python",
  python: "Python",
  rs: "Rust",
  rust: "Rust",
  go: "Go",
  java: "Java",
  sql: "SQL",
  soql: "SOQL",
  md: "Markdown",
  mdx: "MDX",
  apex: "Apex",
  lwc: "LWC",
  diff: "Diff",
  text: "Text",
  txt: "Text",
};

type CodeBlockServerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  // rehype-pretty-code injecte data-language sur <pre>
  "data-language"?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export default function CodeBlockServer({
  children,
  "data-language": dataLanguage,
  ...rest
}: CodeBlockServerProps) {
  // Texte brut extrait pour le bouton copier
  const codeText = extractText(children);

  // Label humain du langage (ex. "apex" → "Apex", "ts" → "TypeScript")
  const langLabel = dataLanguage
    ? (LANG_LABELS[dataLanguage.toLowerCase()] ?? dataLanguage.toUpperCase())
    : null;

  return (
    <div className="mdx-code">
      {/* Toolbar : badge de langage à gauche + bouton copier à droite */}
      <div className="mdx-code__toolbar">
        {langLabel && (
          <span className="mdx-code__lang" aria-hidden="true">
            {langLabel}
          </span>
        )}
        <CopyButton text={codeText} />
      </div>

      {/* <pre> — data-language et les autres attrs shiki sont transmis
          pour que les variables CSS --shiki-light / --shiki-dark fonctionnent */}
      <pre
        className="mdx-code__pre"
        data-language={dataLanguage}
        {...rest}
      >
        {children}
      </pre>
    </div>
  );
}

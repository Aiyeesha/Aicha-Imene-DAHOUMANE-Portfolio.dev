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
import { getTranslations } from "next-intl/server";

// ── Extraction récursive du texte brut (pour le bouton copier) ─────────────
function extractText(node: any): string {
  if (node == null) return "";
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
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
  children: any;
  // rehype-pretty-code injecte data-language sur <pre>
  "data-language"?: string;
  [key: string]: any;
};

export default async function CodeBlockServer({
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

  // Nom accessible du bloc défilable, traduit (locale résolue par next-intl).
  const t = await getTranslations("a11y");
  const regionLabel = langLabel
    ? t("codeBlockLang", { language: langLabel })
    : t("codeBlock");

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
      {/* Accessibilité clavier — audit 2026-10-23 (A11Y-2, axe
          scrollable-region-focusable, gravité « serious ») : un bloc de code
          plus large que l'écran défile horizontalement ; sans tabIndex, un
          utilisateur clavier ne pouvait pas l'atteindre ni le faire défiler
          (WCAG 2.1.1). tabIndex={0} le rend focalisable (flèches pour
          défiler) ; role="region" + aria-label annoncent ce qu'il contient —
          un aria-label n'est pas autorisé sur un <pre> sans rôle explicite.
          {...rest} reste avant ces attributs : rehype-pretty-code ne doit pas
          pouvoir les écraser. */}
      <pre
        className="mdx-code__pre soft-ring"
        data-language={dataLanguage}
        {...rest}
        tabIndex={0}
        role="region"
        aria-label={regionLabel}
      >
        {children}
      </pre>
    </div>
  );
}

"use client";

// CodeBlock.tsx
// -------------
// Wrapper autour des blocs <pre> générés par rehype-pretty-code (shiki).
// Fonctionnalités :
//   - Bouton "Copier" avec feedback visuel (1,2 s)
//   - Badge de langage (ex : "TypeScript", "Apex", "SQL") dans la toolbar
//   - Compatible coloration dual-theme shiki (--shiki-light / --shiki-dark)
//   - Transmets tous les data-* attributes (data-language, data-theme, etc.)
//     au <pre> sous-jacent pour que le CSS shiki fonctionne correctement

import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

// ── Extraction récursive du texte brut (pour le bouton copier) ─────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractText(node: any): string {
  if (node == null) return "";
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) return extractText(node.props?.children);
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

// ── Composant ─────────────────────────────────────────────────────────────
type CodeBlockProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  className?: string;
  // data-language est injecté par rehype-pretty-code sur <pre>
  "data-language"?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export default function CodeBlock({
  children,
  className = "",
  "data-language": dataLanguage,
  ...rest
}: CodeBlockProps) {
  const t = useTranslations();

  // Extraction du texte brut pour le copier-coller
  const codeText = useMemo(() => extractText(children), [children]);
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // Clipboard bloqué (iframe, permissions)
    }
  }, [codeText]);

  // Résolution du label de langage
  const langLabel = dataLanguage
    ? (LANG_LABELS[dataLanguage.toLowerCase()] ?? dataLanguage.toUpperCase())
    : null;

  return (
    <div className={["mdx-code", className].join(" ").trim()}>
      {/* Toolbar : badge de langage (à gauche) + bouton copier (à droite) */}
      <div className="mdx-code__toolbar">
        {langLabel && (
          <span className="mdx-code__lang" aria-hidden="true">
            {langLabel}
          </span>
        )}
        <button
          type="button"
          onClick={onCopy}
          className="mdx-code__copy soft-ring"
          aria-label={copied ? t("mdx.copied") : t("mdx.copy")}
        >
          {copied ? t("mdx.copied") : t("mdx.copy")}
        </button>
        {/* Annonce accessible pour les lecteurs d'écran */}
        <span className="sr-only" aria-live="polite">
          {copied ? t("mdx.copied") : ""}
        </span>
      </div>

      {/* Bloc <pre> — tous les data-* attributes de shiki sont transmis
          (data-theme, data-language, etc.) pour que les CSS vars fonctionnent */}
      <pre className="mdx-code__pre" data-language={dataLanguage} {...rest}>
        {children}
      </pre>
    </div>
  );
}

// CodeBlock.server.tsx
// --------------------
// Server component wrapping MDX code blocks (mapped in mdx-components.tsx).
// The <pre> is rendered on the server; only the "Copy" button (CopyButton) is
// a client component. data-language, data-theme and the other
// rehype-pretty-code attributes are passed to <pre> so the shiki CSS
// variables (--shiki-light / --shiki-dark) apply.

import CopyButton from "./CopyButton";
import { getTranslations } from "next-intl/server";

// ── Recursive plain-text extraction (for the copy button) ─────────────────
function extractText(node: any): string {
  if (node == null) return "";
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) return extractText((node as any).props?.children);
  return "";
}

// ── Human-readable language labels ────────────────────────────────────────
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
  // Set on <pre> by rehype-pretty-code
  "data-language"?: string;
  [key: string]: any;
};

export default async function CodeBlockServer({
  children,
  "data-language": dataLanguage,
  ...rest
}: CodeBlockServerProps) {
  // Plain text for the copy button
  const codeText = extractText(children);

  // Human-readable language label (e.g. "apex" → "Apex", "ts" → "TypeScript")
  const langLabel = dataLanguage
    ? (LANG_LABELS[dataLanguage.toLowerCase()] ?? dataLanguage.toUpperCase())
    : null;

  // Translated accessible name of the scrollable block (locale from next-intl).
  const t = await getTranslations("a11y");
  const regionLabel = langLabel
    ? t("codeBlockLang", { language: langLabel })
    : t("codeBlock");

  return (
    <div className="mdx-code">
      {/* Toolbar: language badge on the left, copy button on the right */}
      <div className="mdx-code__toolbar">
        {langLabel && (
          <span className="mdx-code__lang" aria-hidden="true">
            {langLabel}
          </span>
        )}
        <CopyButton text={codeText} />
      </div>

      {/* shiki attributes are passed through so its CSS variables apply.
          Wide code scrolls horizontally: tabIndex={0} makes it reachable and
          scrollable from the keyboard (WCAG 2.1.1), role="region" +
          aria-label name it (aria-label is not allowed on a bare <pre>).
          {...rest} comes first so rehype-pretty-code cannot override these. */}
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

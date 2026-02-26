"use client";

import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

function extractText(node: any): string {
  if (node == null) return "";
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) return extractText(node.props?.children);
  return "";
}

export default function CodeBlock({
  children,
  className = ""
}: {
  children: any;
  className?: string;
}) {
  const t = useTranslations();

  // MDX typically provides: <pre><code className="language-ts">...</code></pre>
  const codeText = useMemo(() => extractText(children), [children]);
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore (clipboard may be blocked)
    }
  }, [codeText]);

  return (
    <div className={["mdx-code", className].join(" ")}>
      <div className="mdx-code__toolbar">
        <button type="button" onClick={onCopy} className="mdx-code__copy soft-ring">
          {copied ? t("mdx.copied") : t("mdx.copy")}
        </button>
        <span className="sr-only" aria-live="polite">{copied ? t("mdx.copied") : ""}</span>
      </div>
      <pre className="mdx-code__pre">{children}</pre>
    </div>
  );
}

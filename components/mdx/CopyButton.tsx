"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";

export default function CopyButton({ text }: { text: string }) {
  const t = useTranslations();
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore (clipboard may be blocked by browser settings)
    }
  }, [text]);

  return (
    <button type="button" onClick={onCopy} className="mdx-code__copy soft-ring">
      {copied ? t("mdx.copied") : t("mdx.copy")}
    </button>
  );
}

import type { ReactNode } from "react";
import { slugify } from "@/content/blog/toc";

function getText(node: any): string {
  if (node == null) return "";
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(getText).join("");
  if (typeof node === "object" && "props" in node) return getText((node as any).props?.children);
  return "";
}

export function H2({ children }: { children: ReactNode }) {
  const text = getText(children);
  const id = slugify(text);
  return (
    <h2 id={id} className="mdx-h2 scroll-mt-24">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  const text = getText(children);
  const id = slugify(text);
  return (
    <h3 id={id} className="mdx-h3 scroll-mt-24">
      {children}
    </h3>
  );
}

import CopyButton from "./CopyButton";

function extractText(node: any): string {
  if (node == null) return "";
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) return extractText((node as any).props?.children);
  return "";
}

/**
 * Server-friendly code block wrapper.
 * - The block itself renders on the server.
 * - The "Copy" button is a tiny client component.
 */
export default function CodeBlockServer({ children }: { children: any }) {
  const codeText = extractText(children);

  return (
    <div className="mdx-code">
      <div className="mdx-code__toolbar">
        <CopyButton text={codeText} />
      </div>
      <pre className="mdx-code__pre">{children}</pre>
    </div>
  );
}

import type { MDXComponents } from "mdx/types";
import CodeBlockServer from "@/components/mdx/CodeBlock.server";
import { H2, H3 } from "@/components/mdx/Headings.server";
import TableServer from "@/components/mdx/Table.server";

/**
 * Global MDX components for @next/mdx (App Router).
 * This file is REQUIRED by Next.js when using @next/mdx in the App Router.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Pass every prop (data-language, data-theme…) from rehype-pretty-code
    pre: (props: any) => <CodeBlockServer {...props} />,
    h2: (props: any) => <H2>{props.children}</H2>,
    h3: (props: any) => <H3>{props.children}</H3>,
    a: (props: any) => <a {...props} className={["mdx-link", props.className || ""].join(" ")} />,
    // GFM tables: accessible scrollable wrapper, so a wide table never
    // overflows the page on mobile.
    table: (props: any) => <TableServer {...props} />,
    // remark-gfm renders `- [ ] …` task lists as a disabled <input type="checkbox">.
    // These are decorative, read-only markers — the list item text carries the
    // meaning — so hide them from the accessibility tree. Without this, axe flags
    // a critical `label` violation (form element with no accessible name) on every
    // blog post that uses checklist syntax (~44 of them).
    input: (props: any) =>
      props.type === "checkbox" ? (
        <input {...props} aria-hidden="true" />
      ) : (
        <input {...props} />
      ),
  };
}

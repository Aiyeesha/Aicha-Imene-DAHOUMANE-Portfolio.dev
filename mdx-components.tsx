import type { MDXComponents } from "mdx/types";
import CodeBlockServer from "@/components/mdx/CodeBlock.server";
import { H2, H3 } from "@/components/mdx/Headings.server";

/**
 * Global MDX components for @next/mdx (App Router).
 * This file is REQUIRED by Next.js when using @next/mdx in the App Router.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: (props: any) => <CodeBlockServer>{props.children}</CodeBlockServer>,
    h2: (props: any) => <H2>{props.children}</H2>,
    h3: (props: any) => <H3>{props.children}</H3>,
    a: (props: any) => <a {...props} className={["mdx-link", props.className || ""].join(" ")} />
  };
}

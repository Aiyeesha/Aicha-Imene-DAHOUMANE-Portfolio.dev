import CodeBlockServer from "./CodeBlock.server";
import { H2, H3 } from "./Headings.server";

/**
 * Components map used for SERVER rendering of MDX (Stage 12).
 * - pre => code block wrapper with copy button
 * - h2/h3 => auto IDs for TOC anchor links
 */
export const mdxServerComponents = {
  pre: (props: any) => <CodeBlockServer>{props.children}</CodeBlockServer>,
  h2: (props: any) => <H2>{props.children}</H2>,
  h3: (props: any) => <H3>{props.children}</H3>,
  a: (props: any) => <a {...props} className={["mdx-link", props.className || ""].join(" ")} />
};

"use client";

import CodeBlock from "./CodeBlock";
import type { ComponentProps } from "react";

/**
 * MDX components map
 * ------------------
 * Used when rendering MDX on the client (BlogPostRenderer).
 * We keep it small & stable: good typography + code blocks with copy button.
 */
export const mdxComponents = {
  pre: (props: ComponentProps<"pre">) => <CodeBlock>{props.children}</CodeBlock>,
  a: (props: ComponentProps<"a">) => (
    <a {...props} className={["mdx-link", props.className || ""].join(" ")} />
  )
};

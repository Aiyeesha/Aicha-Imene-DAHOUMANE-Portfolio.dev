import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"]
};

// MDX pipeline
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter]
  }
});

// next-intl plugin (generates `next-intl/config` at build time)
// We explicitly point to the App Router request config file.
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(withMDX(nextConfig));

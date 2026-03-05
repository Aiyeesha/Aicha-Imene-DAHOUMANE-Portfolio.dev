"use client";

import dynamic from "next/dynamic";
import { mdxComponents } from "@/components/mdx/MdxComponents";
import { useMemo } from "react";

type Locale = "en" | "fr";

type Loader = () => Promise<{ default: React.ComponentType<any> }>;

// Explicit, static import map (required for bundlers)
const loaders: Record<Locale, Record<string, Loader>> = {
  en: {
    "next-intl-app-router": () => import("@/content/blog/posts/en/next-intl-app-router.mdx"),
    "salesforce-cicd-github-actions": () =>
      import("@/content/blog/posts/en/salesforce-cicd-github-actions.mdx")
  },
  fr: {
    "next-intl-app-router": () => import("@/content/blog/posts/fr/next-intl-app-router.mdx"),
    "salesforce-cicd-github-actions": () =>
      import("@/content/blog/posts/fr/salesforce-cicd-github-actions.mdx")
  }
};

function Loading() {
  return (
    <div className="text-sm text-muted-2">
      Loading…
    </div>
  );
}

export default function BlogPostRenderer({ locale, slug }: { locale: Locale; slug: string }) {
  const Component = useMemo(() => {
    const loader = loaders[locale]?.[slug];
    if (!loader) return null;

    // Render MDX on the client to avoid createContext-in-server errors.
    return dynamic(async () => (await loader()).default, { ssr: false, loading: Loading });
  }, [locale, slug]);

  if (!Component) {
    return (
      <div className="text-sm text-rose-200">
        Post component not found for locale "{locale}" and slug "{slug}".
      </div>
    );
  }

  return <Component components={mdxComponents} />;
}

import { aboutContent } from "@/content/about";

export type AboutPageRow = {
  locale: "fr" | "en" | "es";
  headline: string;
  intro: string | null;
  body: any;
  status: "draft" | "published" | "archived";
  updated_at?: string;
};

export async function getAboutPage(locale: "fr" | "en" | "es") {
  const content = aboutContent[locale];
  if (!content) return null;

  const { headline, introduction, ...body } = content;

  return {
    locale,
    headline,
    intro: introduction,
    body,
    status: "published",
  } satisfies AboutPageRow;
}

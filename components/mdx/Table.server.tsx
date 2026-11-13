// Table.server.tsx
// ----------------
// Server component wrapping GFM tables (remark-gfm) in MDX content; mapped to
// `table` in mdx-components.tsx.
//
// Wide tables scroll inside a dedicated container so they never widen the
// page on mobile, and the <table> keeps its native display (display: block on
// the table would drop its table semantics in some screen readers).
//
// The scrollable container has tabIndex={0} (reachable and scrollable from
// the keyboard, WCAG 2.1.1) and role="group" with a translated aria-label
// (a focusable element needs a role and an accessible name). "group" rather
// than "region": a region is a landmark, and several tables on one page gave
// several landmarks with the same name (axe: landmark-unique), cluttering the
// screen reader's landmark list without helping navigation.

import type { ComponentPropsWithoutRef } from "react";
import { getTranslations } from "next-intl/server";

export default async function TableServer(props: ComponentPropsWithoutRef<"table">) {
  // Locale resolved by next-intl from the request ([locale] segment).
  const t = await getTranslations("a11y");
  return (
    <div
      className="mdx-table-wrap soft-ring"
      tabIndex={0}
      role="group"
      aria-label={t("scrollableTable")}
    >
      <table {...props} />
    </div>
  );
}

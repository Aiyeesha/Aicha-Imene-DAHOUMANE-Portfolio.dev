// app/[locale]/[...rest]/page.tsx
// -------------------------------
// Catch-all: any unknown URL under /fr, /en or /es (e.g. /fr/broken-link)
// lands here and calls notFound(), so app/[locale]/not-found.tsx (which knows
// the locale) is shown rather than the root 404. Existing routes always take
// precedence over a catch-all segment.

import { notFound } from "next/navigation";

export default function CatchAllNotFound() {
  notFound();
}

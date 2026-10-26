// app/api/asset-not-found/route.ts
// --------------------------------
// Lightweight 404 for missing static files (images, PDF), reached through the
// `afterFiles` rewrite in next.config.mjs instead of the full HTML 404 page.
// A few bytes of plain text, X-Robots-Tag: noindex, short CDN cache (5 min)
// so a file added in the next deployment is served right away.

const HEADERS = {
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "public, max-age=0, s-maxage=300",
  "X-Robots-Tag": "noindex",
};

function notFound(): Response {
  return new Response("Not Found", { status: 404, headers: HEADERS });
}

// GET (<img> tags, links) and HEAD (link checkers, crawlers).
export function GET(): Response {
  return notFound();
}

export function HEAD(): Response {
  return new Response(null, { status: 404, headers: HEADERS });
}

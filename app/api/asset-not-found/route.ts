// app/api/asset-not-found/route.ts
// --------------------------------
// Réponse 404 légère pour les fichiers statiques absents (images, PDF).
// Atteinte via la réécriture `afterFiles` de next.config.mjs — audit
// 2026-10-23 (P5) : auparavant, une image manquante recevait la page HTML 404
// complète du site (~70 Ko, rendue dynamiquement).
//
// - Texte brut de quelques octets, aucun rendu React.
// - X-Robots-Tag: noindex — rien à indexer.
// - Cache CDN court (5 min) : un fichier ajouté au déploiement suivant est
//   servi immédiatement (chaque déploiement Vercel repart d'un cache vide).

const HEADERS = {
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "public, max-age=0, s-maxage=300",
  "X-Robots-Tag": "noindex",
};

function notFound(): Response {
  return new Response("Not Found", { status: 404, headers: HEADERS });
}

// GET (balises <img>, liens) et HEAD (vérifications de lien, robots).
export function GET(): Response {
  return notFound();
}

export function HEAD(): Response {
  return new Response(null, { status: 404, headers: HEADERS });
}

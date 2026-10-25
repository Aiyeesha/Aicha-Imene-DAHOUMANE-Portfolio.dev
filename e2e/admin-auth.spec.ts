// e2e/admin-auth.spec.ts
// ----------------------
// Tests E2E — l'admin ne livre aucun contenu sans authentification, quelle
// que soit la variante d'URL.
//
// Régression couverte — audit 2026-10-23 (P3) : le matcher de proxy.ts exclut
// les URL contenant un point. Toute URL de la forme /admin/incidents/<x.y>
// (ex. /admin/incidents/new.rsc) échappait donc au middleware et atteignait la
// route /admin/incidents/[id] : en `next start`, la réponse contenait le layout
// admin (« Portfolio Admin », « service_role ») et la page exécutait sa requête
// Supabase service_role, sans en-tête Authorization ni rate-limit.
// Le layout et chaque page de /admin revérifient désormais l'authentification
// (lib/security/adminAuth.ts).
//
// NB : /admin.rsc et /admin/incidents.rsc ne servent PAS l'admin (le premier
// est interprété comme une locale « admin.rsc », le second ne correspond à
// aucune route) ; ils restent testés pour garantir qu'aucun contenu admin n'y
// apparaît.
//
// Le critère porte sur le CONTENU, pas sur le code HTTP : un notFound() levé
// dans un layout imbriqué est servi en 200 (le shell racine est déjà parti en
// streaming) avec le marqueur NEXT_HTTP_ERROR_FALLBACK;404 dans le flux.
//
// Aucun identifiant n'est utilisé ici : on vérifie uniquement le refus.

import { test, expect } from "@playwright/test";

// Marqueurs présents dans le rendu de l'admin (layout) : leur présence dans
// une réponse non authentifiée trahirait une fuite.
const ADMIN_MARKERS = ["Portfolio Admin", "service_role"];

const PATHS = [
  "/admin.rsc",
  "/admin/incidents.rsc",
  "/admin/incidents/new.rsc",
  "/admin/incidents/00000000-0000-0000-0000-000000000000.rsc",
  "/admin/incidents/x.json",
];

// Avec et sans l'en-tête RSC envoyé par le routeur Next.js (Next 16 redirige
// alors vers ?_rsc ; la redirection est suivie).
const VARIANTS: { name: string; headers: Record<string, string> }[] = [
  { name: "HTML", headers: {} },
  { name: "RSC", headers: { RSC: "1" } },
];

test.describe("Admin — aucun contenu sans authentification", () => {
  for (const path of PATHS) {
    for (const variant of VARIANTS) {
      test(`GET ${path} (${variant.name}) sans Authorization ne livre pas l'admin`, async ({
        request,
      }) => {
        const response = await request.get(path, {
          headers: variant.headers,
          failOnStatusCode: false,
        });

        // Jamais d'erreur serveur (la garde rend une 404, elle ne lève pas de 500).
        expect(response.status(), `${path} : statut ${response.status()}`).toBeLessThan(500);

        const body = await response.text();
        for (const marker of ADMIN_MARKERS) {
          expect(body, `${path} ne doit pas contenir « ${marker} »`).not.toContain(marker);
        }
      });
    }
  }

  test("GET /admin sans Authorization → refus du middleware (401 ou 429)", async ({ request }) => {
    const response = await request.get("/admin", { failOnStatusCode: false });
    // 401 + WWW-Authenticate quand Redis est disponible ; 429 en fail-closed
    // quand le rate-limiter est indisponible (CI/local sans Upstash).
    expect([401, 429]).toContain(response.status());
    const body = await response.text();
    for (const marker of ADMIN_MARKERS) expect(body).not.toContain(marker);
  });
});

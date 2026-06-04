// instrumentation.ts
// Exécuté par Next.js une seule fois au démarrage du serveur (App Router).
// Valide les variables d'environnement avant le premier rendu.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { validateEnv } = await import("./lib/env");
    validateEnv();
  }
}

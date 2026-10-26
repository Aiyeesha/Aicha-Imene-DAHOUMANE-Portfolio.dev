// lib/env.ts
// Validation des variables d'environnement au démarrage du serveur.
// Appelé depuis instrumentation.ts — s'exécute une seule fois à la montée.
// Signale les problèmes de configuration tôt, fort et explicitement,
// au lieu de laisser des erreurs silencieuses se propager au runtime
// (ex : token Upstash avec espace → WRONGPASS à chaque requête Redis).
import "server-only";
import { z } from "zod";

// ── Schémas ───────────────────────────────────────────────────────────────────

const publicSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL:    z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_SITE_URL:        z.string().url(),
  NEXT_PUBLIC_LINKEDIN_URL: z
    .string()
    .optional()
    .refine(
      (v) => {
        if (!v) return true;
        try { new URL(v.split(",")[0].trim()); return true; } catch { return false; }
      },
      { message: "première valeur n'est pas une URL valide" }
    ),
});

const serverSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  UPSTASH_REDIS_REST_URL:    z.string().url(),
  UPSTASH_REDIS_REST_TOKEN:  z
    .string()
    .min(1)
    .refine(
      (v) => !/\s/.test(v),
      { message: "contient un espace ou retour à la ligne — recoller depuis le dashboard Upstash" }
    ),
  ADMIN_USERNAME: z.string().min(1),
  ADMIN_PASSWORD: z.string().min(8),
  CRON_SECRET:    z.string().min(32),
  // Optionnel — audit 2026-10-23 (CFG-2) : app/api/contact/route.ts traite
  // déjà l'absence de FORMHOOK_ENDPOINT (le message n'est simplement pas
  // relayé). L'exiger ici faisait échouer la validation d'environnement
  // (avertissement « Variables d'environnement invalides ») sans raison
  // fonctionnelle. Reste validé comme URL lorsqu'il est défini.
  FORMHOOK_ENDPOINT: z.string().url().optional(),
  FORMHOOK_AUTH_TOKEN: z.string().min(1).optional(),
  // Requis depuis la confirmation de leur présence en production (2026-10-26) :
  // sel de pseudonymisation des IP (lib/ratelimit.ts), secrets de
  // revalidation et d'invalidation du cache, jeton des invitations témoignage.
  // Seule la présence est exigée ici ; la longueur minimale est contrôlée
  // plus bas, en simple avertissement.
  IP_HASH_SALT:             z.string().min(1),
  REVALIDATE_SECRET:        z.string().min(1),
  CACHE_INVALIDATE_SECRET:  z.string().min(1),
  TESTIMONIAL_SUBMIT_TOKEN: z.string().min(1),
});

// Longueurs minimales recommandées pour les secrets ci-dessus. Une valeur
// existante plus courte ne doit pas empêcher la production de démarrer :
// on avertit seulement, pour inviter à la régénérer.
const secretStrengthSchema = z.object({
  IP_HASH_SALT:             z.string().min(16).optional(),
  REVALIDATE_SECRET:        z.string().min(32).optional(),
  CACHE_INVALIDATE_SECRET:  z.string().min(32).optional(),
  TESTIMONIAL_SUBMIT_TOKEN: z.string().min(32).optional(),
});

// ── Validation ────────────────────────────────────────────────────────────────

export function validateEnv(): void {
  // Pas de validation en CI ni en test (valeurs de substitution intentionnelles)
  if (process.env.CI === "true" || process.env.NODE_ENV === "test") return;

  const issues: string[] = [];

  const pub = publicSchema.safeParse(process.env);
  if (!pub.success) {
    for (const e of pub.error.issues) {
      issues.push(`[PUBLIC]  ${e.path.join(".")}: ${e.message}`);
    }
  }

  const srv = serverSchema.safeParse(process.env);
  if (!srv.success) {
    for (const e of srv.error.issues) {
      issues.push(`[SERVER]  ${e.path.join(".")}: ${e.message}`);
    }
  }

  // Robustesse des secrets : jamais bloquante (voir secretStrengthSchema).
  const strength = secretStrengthSchema.safeParse(process.env);
  if (!strength.success) {
    const lines = strength.error.issues.map((e) => `  • ${e.path.join(".")}: ${e.message}`);
    console.warn(`[env] Secrets trop courts (à régénérer) :\n${lines.join("\n")}`);
  }

  const isProductionDeployment = process.env.VERCEL_ENV === "production";

  if (issues.length === 0) return;

  const block = issues.map((l) => `  • ${l}`).join("\n");
  const message = `[env] ⚠ Variables d'environnement invalides :\n${block}`;

  // Audit 2026-10-25 : en production, une configuration invalide arrête le
  // démarrage au lieu d'un simple console.error ignoré. Les prévisualisations
  // (souvent sans clés Supabase) et le développement local gardent un
  // avertissement.
  if (isProductionDeployment) throw new Error(message);
  console.error(message);
}

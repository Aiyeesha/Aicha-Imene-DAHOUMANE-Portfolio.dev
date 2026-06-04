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
  FORMSPREE_ENDPOINT: z.string().url(),
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

  if (issues.length === 0) return;

  const block = issues.map((l) => `  • ${l}`).join("\n");
  console.error(`[env] ⚠ Variables d'environnement invalides :\n${block}`);
}

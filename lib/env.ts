// lib/env.ts
// Environment variable validation at server start (called once from
// instrumentation.ts). Reports configuration problems early and loudly
// instead of letting them fail silently at runtime (e.g. an Upstash token
// with a trailing space → WRONGPASS on every Redis call).
import "server-only";
import { z } from "zod";

// ── Schemas ───────────────────────────────────────────────────────────────────

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
  // Optional: app/api/contact/route.ts handles a missing FORMHOOK_ENDPOINT
  // (the message is simply not forwarded). Validated as a URL when set.
  FORMHOOK_ENDPOINT: z.string().url().optional(),
  FORMHOOK_AUTH_TOKEN: z.string().min(1).optional(),
  // App secrets, required (confirmed present in production): IP
  // pseudonymisation salt (lib/ratelimit.ts), revalidation and cache
  // invalidation secrets, testimonial invitation token. Only presence is
  // required here; minimum length is checked below as a warning.
  IP_HASH_SALT:             z.string().min(1),
  REVALIDATE_SECRET:        z.string().min(1),
  CACHE_INVALIDATE_SECRET:  z.string().min(1),
  TESTIMONIAL_SUBMIT_TOKEN: z.string().min(1),
});

// Recommended minimum lengths for the secrets above. A shorter existing value
// must not stop production from starting: it only triggers a warning to
// regenerate it.
const secretStrengthSchema = z.object({
  IP_HASH_SALT:             z.string().min(16).optional(),
  REVALIDATE_SECRET:        z.string().min(32).optional(),
  CACHE_INVALIDATE_SECRET:  z.string().min(32).optional(),
  TESTIMONIAL_SUBMIT_TOKEN: z.string().min(32).optional(),
});

// ── Validation ────────────────────────────────────────────────────────────────

export function validateEnv(): void {
  // No validation in CI or tests (placeholder values on purpose)
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

  // Secret strength: never blocking (see secretStrengthSchema).
  const strength = secretStrengthSchema.safeParse(process.env);
  if (!strength.success) {
    const lines = strength.error.issues.map((e) => `  • ${e.path.join(".")}: ${e.message}`);
    console.warn(`[env] Secrets trop courts (à régénérer) :\n${lines.join("\n")}`);
  }

  const isProductionDeployment = process.env.VERCEL_ENV === "production";

  if (issues.length === 0) return;

  const block = issues.map((l) => `  • ${l}`).join("\n");
  const message = `[env] ⚠ Variables d'environnement invalides :\n${block}`;

  // In production an invalid configuration stops the start-up. Previews
  // (often without Supabase keys) and local development only warn.
  if (isProductionDeployment) throw new Error(message);
  console.error(message);
}

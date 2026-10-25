import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { redis } from "@/lib/redis";
import { cacheInvalidateRatelimit, safeLimit } from "@/lib/ratelimit";
import { timingSafeStringEqual } from "@/lib/security/timingSafeEqual";
import { isValidSlug } from "@/lib/security/slug";
import { routing } from "@/i18n/routing";
import { z } from "zod";

// ── Validation du corps — audit 2026-10-23 (P7) ─────────────────────────────
// Avant : `locale` et `slug` étaient lus sans contrôle puis concaténés dans des
// clés Redis ; un JSON invalide ou un `slug` sans `locale` retombaient
// silencieusement sur le vidage COMPLET du cache (l'action la plus large).
// Désormais :
//   - `locale` doit appartenir à routing.locales (en, fr, es) ;
//   - `slug` doit être un slug kebab-case valide (lib/security/slug.ts) et
//     n'est accepté qu'accompagné d'une `locale` ;
//   - toute clé inconnue est refusée (.strict()) ;
//   - corps vide → vidage complet (comportement documenté conservé) ;
//   - JSON invalide → 400, jamais un vidage complet par défaut.
// L'endpoint reste protégé par un secret comparé à temps constant : ces
// contrôles sont de la défense en profondeur.
const InvalidateBodySchema = z
  .object({
    locale: z.enum(routing.locales).optional(),
    slug: z
      .string()
      .refine((value) => isValidSlug(value), { message: "Invalid slug" })
      .optional(),
  })
  .strict()
  .refine((body) => body.slug === undefined || body.locale !== undefined, {
    message: "slug requires locale",
  });

// Borne de taille du corps : un corps légitime fait quelques dizaines
// d'octets ({"locale":"fr","slug":"…"}). 1 Kio laisse une large marge.
const MAX_BODY_BYTES = 1024;

// SCAN : nombre de clés demandées par itération (indicatif côté Redis) et
// nombre maximal d'itérations — borne de sécurité contre une boucle infinie
// si le curseur ne revenait jamais à "0".
const SCAN_COUNT = 100;
const SCAN_MAX_ITERATIONS = 1000;

/**
 * POST /api/cache/invalidate
 * Header: x-cache-secret: <CACHE_INVALIDATE_SECRET>
 * Body examples:
 *   {} (ou corps vide)              -> flush ALL cache keys (projects, about, certifications)
 *   { "locale": "fr" }              -> flush all keys for that locale
 *   { "locale": "fr", "slug": "…" } -> flush list + detail for that slug only
 * Réponses d'erreur : 400 (JSON invalide, locale/slug invalides, clé inconnue,
 * slug sans locale), 401 (secret), 413 (corps > 1 Kio), 429, 503 (Redis absent).
 */
export async function POST(req: Request) {
  // ── 1. Rate-limit par IP ────────────────────────────────────────────────────
  const headersList = await headers();
  const ip =
    headersList.get("x-real-ip") ||
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  const { success: rateLimitOk } = await safeLimit(cacheInvalidateRatelimit, ip);
  if (!rateLimitOk) {
    return NextResponse.json(
      { ok: false, error: "Too many requests" },
      { status: 429 }
    );
  }

  // ── 2. Vérification du secret (comparaison timing-safe) ─────────────────────
  const secret = req.headers.get("x-cache-secret");
  const expected = process.env.CACHE_INVALIDATE_SECRET;

  const secretValid =
    !!expected && !!secret && await timingSafeStringEqual(secret, expected);

  if (!secretValid) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // ── 3. Redis disponible ? ───────────────────────────────────────────────────
  if (!redis) {
    return NextResponse.json({ ok: false, error: "Cache not available" }, { status: 503 });
  }

  // ── 4. Lecture et validation du corps ───────────────────────────────────────
  // Pré-contrôle sur Content-Length (rejet sans lire le corps), puis contrôle
  // de la taille réellement lue : l'en-tête peut être absent (chunked) ou faux.
  const declaredLength = Number(req.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Payload too large" }, { status: 413 });
  }
  const rawBody = await req.text();
  if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Payload too large" }, { status: 413 });
  }

  let json: unknown = {};
  if (rawBody.trim() !== "") {
    try {
      json = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
    }
  }

  const parsed = InvalidateBodySchema.safeParse(json);
  if (!parsed.success) {
    // Message générique : pas d'écho de l'entrée (ni dans la réponse, ni dans
    // les logs) — évite toute injection de log ou réflexion de contenu.
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }
  const { locale, slug } = parsed.data;

  // ── 5. Invalidation ciblée ──────────────────────────────────────────────────
  const deleted: string[] = [];

  if (locale && slug) {
    const keys = [
      `projects_with_assets:${locale}`,
      `project:${locale}:${slug}`,
    ];
    await redis.del(...keys);
    deleted.push(...keys);
  } else if (locale) {
    const keys = [
      `projects_with_assets:${locale}`,
      `about:${locale}`,
      `certifications:${locale}`,
    ];
    await redis.del(...keys);
    deleted.push(...keys);
  } else {
    // Les 3 locales actives (en/fr/es) doivent toutes être listées ici — un flush-all
    // qui en oublie une laisse du contenu obsolète en cache jusqu'à expiration du TTL
    // (constaté lors de l'audit 2026-07 : "es" manquait, ajouté avec l'activation ES).
    const staticKeys = [
      "projects_with_assets:fr",
      "projects_with_assets:en",
      "projects_with_assets:es",
      "about:fr",
      "about:en",
      "about:es",
      "certifications:fr",
      "certifications:en",
      "certifications:es",
      "portfolio:uptime:latest",
      "portfolio:uptime:stats:30d",
      "portfolio:uptime:latency:7d",
    ];
    await redis.del(...staticKeys);
    deleted.push(...staticKeys);

    // Supprimer aussi toutes les clés de détail projet (project:{locale}:{slug}).
    // SCAN itératif plutôt que KEYS (audit 2026-10-23, P7) : KEYS est O(N) et
    // bloque Redis le temps de parcourir tout l'espace de clés ; SCAN parcourt
    // par lots, sans bloquer, jusqu'au retour du curseur à "0".
    const projectKeys: string[] = [];
    let cursor = "0";
    for (let i = 0; i < SCAN_MAX_ITERATIONS; i++) {
      const [nextCursor, keys] = await redis.scan(cursor, {
        match: "project:*",
        count: SCAN_COUNT,
      });
      projectKeys.push(...keys);
      cursor = String(nextCursor);
      if (cursor === "0") break;
    }
    // SCAN peut renvoyer une même clé plusieurs fois : dédoublonnage.
    const uniqueProjectKeys = [...new Set(projectKeys)];
    if (uniqueProjectKeys.length > 0) {
      await redis.del(...uniqueProjectKeys);
      deleted.push(...uniqueProjectKeys);
    }

    // Invalider le cache ISR Next.js pour toutes les pages projet
    revalidatePath("/[locale]/projects/[slug]", "page");
    revalidatePath("/en", "page");
    revalidatePath("/fr", "page");
    revalidatePath("/es", "page");
  }

  // ── 6. Log de l'opération ───────────────────────────────────────────────────
  // IP volontairement absente du journal (audit du 2026-10-14, S11).
  console.info(`[cache/invalidate] deleted=${deleted.join(", ")}`);

  return NextResponse.json({ ok: true, deleted });
}

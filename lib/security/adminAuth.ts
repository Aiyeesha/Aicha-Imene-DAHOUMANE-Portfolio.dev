// lib/security/adminAuth.ts
// -------------------------
// Vérification de l'authentification HTTP Basic de l'admin, côté serveur
// applicatif (Server Components, Server Actions).
//
// Pourquoi ce module — audit 2026-10-23 (P3) :
//   proxy.ts protège /admin (rate-limit fail-closed + Basic Auth), mais son
//   `matcher` exclut toute URL contenant un point. En local (`next start`),
//   GET /admin.rsc, /admin/incidents.rsc… renvoyaient 200 avec le payload RSC
//   de l'admin, sans aucune authentification. Non reproduit en production
//   (Vercel exécute bien le middleware), mais la protection reposait sur un
//   comportement de routage, pas sur le code applicatif. Les Server Components
//   de l'admin lisent Supabase avec la clé service_role : ils doivent revérifier
//   l'authentification eux-mêmes (défense en profondeur).
//
// Ce module centralise la logique déjà utilisée par les Server Actions
// (ex-requireAdminAuth de app/admin/actions.ts), pour que layout, pages et
// actions appliquent exactement la même règle.
//
// `server-only` : toute importation depuis un composant client fait échouer
// le build — les identifiants admin ne doivent jamais atteindre le navigateur.

import "server-only";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { timingSafeStringEqual } from "@/lib/security/timingSafeEqual";

/**
 * Indique si l'en-tête Authorization fourni contient des identifiants admin
 * valides. Fonction pure (hors lecture de process.env) : testable sans
 * contexte de requête Next.js.
 *
 * Fail-closed : renvoie false si ADMIN_USERNAME / ADMIN_PASSWORD ne sont pas
 * configurés, si l'en-tête est absent, malformé ou en base64 invalide.
 */
export async function isAdminAuthorizationValid(
  authHeader: string | null | undefined
): Promise<boolean> {
  const expectedUser = process.env.ADMIN_USERNAME ?? "";
  const expectedPass = process.env.ADMIN_PASSWORD ?? "";

  // Admin non configuré → personne n'est autorisé (jamais d'accès par défaut).
  if (!expectedUser || !expectedPass) return false;
  if (!authHeader?.startsWith("Basic ")) return false;

  let decoded: string;
  try {
    // atob : disponible en Node.js et en Edge Runtime (pas de Buffer).
    decoded = atob(authHeader.slice(6));
  } catch {
    return false; // base64 invalide
  }

  const colonIdx = decoded.indexOf(":");
  if (colonIdx === -1) return false;

  const user = decoded.slice(0, colonIdx);
  const pass = decoded.slice(colonIdx + 1);

  // Comparaisons en temps constant, toutes deux exécutées quel que soit le
  // résultat de la première : pas d'oracle de timing sur l'identifiant.
  const [userMatch, passMatch] = await Promise.all([
    timingSafeStringEqual(user, expectedUser),
    timingSafeStringEqual(pass, expectedPass),
  ]);
  return userMatch && passMatch;
}

/**
 * Lit l'en-tête Authorization de la requête courante (headers() de Next.js)
 * et indique si elle est authentifiée en tant qu'admin.
 * À utiliser dans les Server Components (layout et pages de /admin).
 */
export async function isAdminRequestAuthorized(): Promise<boolean> {
  const headersList = await headers();
  return isAdminAuthorizationValid(headersList.get("authorization"));
}

/**
 * Variante qui lève une erreur si la requête n'est pas authentifiée.
 * À utiliser en tête de chaque Server Action admin : une action peut être
 * invoquée directement par un POST forgé, hors du parcours de navigation.
 */
export async function requireAdminAuth(): Promise<void> {
  if (!(await isAdminRequestAuthorized())) throw new Error("Unauthorized");
}

/**
 * Garde des Server Components de /admin (layout ET chaque page) : rend la
 * page 404 si la requête n'est pas authentifiée.
 *
 * Pourquoi notFound() plutôt qu'une réponse 401 :
 *   - un Server Component ne peut pas poser d'en-tête de réponse
 *     (WWW-Authenticate) ni choisir son code HTTP ; unauthorized() de Next.js
 *     est encore expérimental (flag authInterrupts) et ne pose pas non plus
 *     WWW-Authenticate ;
 *   - le 404 ne divulgue rien, pas même l'existence de l'admin, et n'est
 *     jamais une erreur 500 ;
 *   - dans le parcours normal, c'est proxy.ts qui répond 401 + WWW-Authenticate
 *     (invite de connexion du navigateur) AVANT le rendu : cette garde ne se
 *     déclenche que si le middleware a été contourné.
 *
 * Pourquoi aussi dans chaque page, et pas seulement dans le layout :
 *   un layout n'est pas ré-exécuté lors d'une navigation côté client entre
 *   pages sœurs. Une requête RSC forgée (en-tête Next-Router-State-Tree
 *   déclarant le layout déjà rendu) peut obtenir le seul segment de la page.
 *   La vérification doit donc se trouver au plus près des données.
 */
export async function assertAdminOrNotFound(): Promise<void> {
  if (!(await isAdminRequestAuthorized())) notFound();
}

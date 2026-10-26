// lib/security/adminAuth.ts
// -------------------------
// Admin HTTP Basic auth check for server components and server actions.
//
// proxy.ts protects /admin (fail-closed rate limit + Basic auth), but the
// admin server components read Supabase with the service_role key, so they
// re-check authentication themselves (defence in depth) rather than relying
// on routing alone. The layout, every page and every action share this rule.
//
// `server-only`: importing this from a client component fails the build;
// admin credentials must never reach the browser.

import "server-only";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { timingSafeStringEqual } from "@/lib/security/timingSafeEqual";

/**
 * Whether the given Authorization header holds valid admin credentials.
 * Pure (apart from reading process.env), so it is testable without a Next.js
 * request context.
 *
 * Fails closed: false when ADMIN_USERNAME / ADMIN_PASSWORD are not set, or
 * when the header is missing, malformed or not valid base64.
 */
export async function isAdminAuthorizationValid(
  authHeader: string | null | undefined
): Promise<boolean> {
  const expectedUser = process.env.ADMIN_USERNAME ?? "";
  const expectedPass = process.env.ADMIN_PASSWORD ?? "";

  // Admin not configured → nobody is authorised (never open by default).
  if (!expectedUser || !expectedPass) return false;
  if (!authHeader?.startsWith("Basic ")) return false;

  let decoded: string;
  try {
    // atob works in Node.js and the Edge runtime (no Buffer).
    decoded = atob(authHeader.slice(6));
  } catch {
    return false; // invalid base64
  }

  const colonIdx = decoded.indexOf(":");
  if (colonIdx === -1) return false;

  const user = decoded.slice(0, colonIdx);
  const pass = decoded.slice(colonIdx + 1);

  // Constant-time comparisons, both always run, so there is no timing oracle
  // on the username.
  const [userMatch, passMatch] = await Promise.all([
    timingSafeStringEqual(user, expectedUser),
    timingSafeStringEqual(pass, expectedPass),
  ]);
  return userMatch && passMatch;
}

/**
 * Reads the current request's Authorization header (Next.js headers()) and
 * tells whether it is an authenticated admin. For /admin server components.
 */
export async function isAdminRequestAuthorized(): Promise<boolean> {
  const headersList = await headers();
  return isAdminAuthorizationValid(headersList.get("authorization"));
}

/**
 * Throwing variant, for the top of every admin server action: an action can
 * be called directly with a forged POST, outside normal navigation.
 */
export async function requireAdminAuth(): Promise<void> {
  if (!(await isAdminRequestAuthorized())) throw new Error("Unauthorized");
}

/**
 * Guard for /admin server components (layout AND every page): renders the
 * 404 page when the request is not authenticated.
 *
 * Why notFound() rather than a 401:
 *   - a server component cannot set response headers (WWW-Authenticate) or
 *     choose its status; Next.js unauthorized() is still experimental and
 *     does not set WWW-Authenticate either;
 *   - a 404 reveals nothing, not even that the admin exists, and is never a
 *     500;
 *   - in normal use proxy.ts answers 401 + WWW-Authenticate (browser login
 *     prompt) before rendering; this guard only fires if it was bypassed.
 *
 * Why in every page and not only the layout: a layout is not re-run on
 * client-side navigation between sibling pages, and a forged RSC request
 * (Next-Router-State-Tree claiming the layout is rendered) can fetch the page
 * segment alone. The check must sit next to the data.
 */
export async function assertAdminOrNotFound(): Promise<void> {
  if (!(await isAdminRequestAuthorized())) notFound();
}

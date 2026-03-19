"use client";

// GlobalErrorHandler.tsx
// ----------------------
// Composant client monté une seule fois dans le root layout.
// Intercepte les erreurs JS non-gérées et les envoie à /api/errors.
//
// Capture :
//   - window.onerror         : erreurs JS hors React (setTimeout, event handlers…)
//   - unhandledrejection     : Promises rejetées sans .catch()
//
// Complément aux error boundaries (qui catchent le crash du rendu React) :
// ce handler couvre tout ce qui échappe à React.
//
// Filtres :
//   - "Script error." (cross-origin, pas de détails utiles)
//   - Extensions navigateur (chrome-extension://, moz-extension://…)
//   - Dedup par session (Set d'empreintes — évite de flooder la même erreur)
//
// Transport :
//   - navigator.sendBeacon  (non bloquant, survit au déchargement de page)
//   - fetch keepalive       (fallback si sendBeacon absent)
//
// En développement : log console uniquement, pas d'appel API.

import { useEffect } from "react";

// ── Limites de taille (caractères) ──────────────────────────────────────────
const MAX_MSG   = 200;
const MAX_STACK = 1_500;
const MAX_URL   = 300;

// ── Dedup par session ────────────────────────────────────────────────────────
// Module-level Set : persiste pendant toute la session (pas réinitialisé
// entre les re-renders React). Un même crash React peut se rejouer
// plusieurs fois si reset() est appelé — la dedup l'absorbe.
const seen = new Set<string>();

function makeFingerprint(message: string, source: string, line?: number): string {
  return `${message.slice(0, 80)}|${source.slice(0, 80)}|${line ?? 0}`;
}

// ── Filtres ──────────────────────────────────────────────────────────────────
function shouldIgnore(message: string, source: string): boolean {
  // "Script error." = erreur cross-origin sans détail — inutile
  if (!message || message === "Script error.") return true;
  // Extensions navigateur — bruits parasites
  return /^(?:chrome|moz|safari|safari-web|ms-browser)-extension:\/\//.test(source);
}

// ── Nettoyage URL ─────────────────────────────────────────────────────────────
// Supprime query string et hash pour éviter de logger des données sensibles.
function cleanUrl(raw: string): string {
  try {
    const u = new URL(raw);
    return (u.origin + u.pathname).slice(0, MAX_URL);
  } catch {
    return raw.slice(0, MAX_URL);
  }
}

// ── Transport ─────────────────────────────────────────────────────────────────
// sendBeacon est préféré : asynchrone, non bloquant, survit au beforeunload.
// Fallback fetch keepalive pour Safari < 11.1 (sendBeacon + JSON non supporté).
function send(payload: Record<string, unknown>): void {
  const body = JSON.stringify(payload);
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    // sendBeacon accepte un Blob pour forcer le Content-Type application/json
    navigator.sendBeacon("/api/errors", new Blob([body], { type: "application/json" }));
  } else {
    fetch("/api/errors", {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    }).catch(() => { /* fire and forget */ });
  }
}

// ── Composant ─────────────────────────────────────────────────────────────────
export default function GlobalErrorHandler() {
  useEffect(() => {
    // ── window.onerror ───────────────────────────────────────────────────────
    function handleError(event: ErrorEvent): void {
      const { message, filename, lineno, colno, error } = event;
      const source = filename ?? "";

      if (shouldIgnore(message, source)) return;

      const fp = makeFingerprint(message, source, lineno);
      if (seen.has(fp)) return;
      seen.add(fp);

      const payload = {
        type: "uncaught",
        message: String(message).slice(0, MAX_MSG),
        stack: (error instanceof Error ? error.stack : undefined)?.slice(0, MAX_STACK),
        url: cleanUrl(source || window.location.href),
        line: lineno ?? undefined,
        col: colno ?? undefined,
      };

      if (process.env.NODE_ENV !== "production") {
        // Dev : log console uniquement (pas d'appel API pour éviter le bruit)
        console.error("[GlobalErrorHandler:uncaught]", payload);
        return;
      }

      send(payload);
    }

    // ── unhandledrejection ───────────────────────────────────────────────────
    function handleRejection(event: PromiseRejectionEvent): void {
      const reason = event.reason;
      const message =
        reason instanceof Error
          ? reason.message
          : String(reason ?? "Unhandled promise rejection");

      if (shouldIgnore(message, "")) return;

      const fp = makeFingerprint(message, window.location.pathname, undefined);
      if (seen.has(fp)) return;
      seen.add(fp);

      const payload = {
        type: "unhandledrejection",
        message: message.slice(0, MAX_MSG),
        stack: (reason instanceof Error ? reason.stack : undefined)?.slice(0, MAX_STACK),
        url: cleanUrl(window.location.href),
      };

      if (process.env.NODE_ENV !== "production") {
        console.error("[GlobalErrorHandler:unhandledrejection]", payload);
        return;
      }

      send(payload);
    }

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  // Rendu nul — ce composant est purement comportemental
  return null;
}

// app/[locale]/[...rest]/page.tsx
// -------------------------------
// Route attrape-tout : toute URL inconnue sous /fr, /en ou /es (ex. /fr/lien-casse)
// arrive ici et déclenche notFound(). Sans cette route, Next.js servait la 404
// racine (app/not-found.tsx, langue devinée via navigator.language) au lieu de
// app/[locale]/not-found.tsx, qui connaît la locale de l'URL — audit du
// 2026-10-14, constat 1.
//
// Les routes statiques et dynamiques existantes restent prioritaires sur un
// segment catch-all : seules les URL sans correspondance atteignent ce fichier.

import { notFound } from "next/navigation";

export default function CatchAllNotFound() {
  notFound();
}

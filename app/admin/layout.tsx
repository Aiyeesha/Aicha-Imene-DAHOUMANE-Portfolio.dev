// app/admin/layout.tsx
// ---------------------
// Layout minimaliste pour le dashboard admin.
// Pas de Navbar/Footer public — interface interne uniquement.

import type { Metadata } from "next";
import { assertAdminOrNotFound } from "@/lib/security/adminAuth";

export const metadata: Metadata = {
  title: "Admin — Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Défense en profondeur — audit 2026-10-23 (P3) : le layout revérifie
  // l'authentification Basic au lieu de s'en remettre au seul middleware,
  // dont le matcher exclut les URL contenant un point (/admin.rsc renvoyait
  // le payload RSC de l'admin sans authentification en `next start`).
  // Couvre tout le sous-arbre /admin ; chaque page refait le contrôle (voir
  // lib/security/adminAuth.ts). Échec → page 404, jamais d'erreur 500.
  await assertAdminOrNotFound();

  // Pas de <html>/<body> ici — le root layout (app/layout.tsx) les fournit.
  // On surcharge uniquement le fond + la structure interne admin.
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold tracking-tight">
            Portfolio Admin
          </span>
          <span className="rounded-full bg-cyan-500/15 px-2 py-0.5 text-[11px] font-medium text-cyan-400">
            dashboard
          </span>
        </div>
        <span className="text-xs text-slate-500">
          Supabase · service_role
        </span>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-5xl px-6 py-10">
        {children}
      </main>
    </div>
  );
}

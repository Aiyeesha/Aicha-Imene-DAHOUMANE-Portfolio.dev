// app/admin/layout.tsx
// ---------------------
// Layout minimaliste pour le dashboard admin.
// Pas de Navbar/Footer public — interface interne uniquement.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

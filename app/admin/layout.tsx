// app/admin/layout.tsx
// ---------------------
// Minimal admin dashboard layout: internal only, no public Navbar/Footer.

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
  // Defence in depth: the layout re-checks Basic auth instead of relying on
  // the proxy alone, whose matcher skips URLs containing a dot (/admin.rsc
  // would otherwise return the admin RSC payload unauthenticated). Each page
  // checks again (lib/security/adminAuth.ts). Failure → 404, never a 500.
  await assertAdminOrNotFound();

  // No <html>/<body> here: the root layout provides them. Only the background
  // and admin structure are set.
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

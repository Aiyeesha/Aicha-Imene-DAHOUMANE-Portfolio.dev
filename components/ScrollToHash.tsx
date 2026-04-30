"use client";

// ScrollToHash.tsx
// ----------------
// Règle le scroll vers un ancre (#hash) lors d'une navigation SPA inter-pages
// dans Next.js App Router. Sans ce composant, `<Link href="/page#section">` ne
// déclenche pas le scroll si la page de destination n'était pas déjà chargée.
//
// Utilisation : placez <ScrollToHash /> une fois dans la page cible (ex: page d'accueil).

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.slice(1); // retire le "#"

    // Tentative immédiate (si l'élément est déjà dans le DOM)
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // Fallback : l'élément peut être rendu de façon asynchrone (dynamic import)
    // On observe le DOM pendant 2 s max et on scroll dès qu'il apparaît.
    const observer = new MutationObserver(() => {
      const target = document.getElementById(id);
      if (target) {
        observer.disconnect();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const timeout = setTimeout(() => observer.disconnect(), 2000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  // pathname dans les deps : re-run si on navigue sur la même page (ex : /fr → /en)
  }, [pathname]);

  return null;
}

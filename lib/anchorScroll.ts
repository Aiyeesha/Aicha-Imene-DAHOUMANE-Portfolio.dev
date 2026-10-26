// lib/anchorScroll.ts
// -------------------
// Défilement fiable vers une ancre (#contact, #projects…) de l'accueil lors
// d'une navigation depuis une autre page ou d'un accès direct.
//
// Pourquoi (audit 2026-10-25, constat 3) : le défilement était lancé dès que
// l'élément existait, en `behavior: "smooth"`, alors que plusieurs sections
// au-dessus (TrackAwareServices en ssr:false, FeaturedProjects, LatestPosts,
// GlobalMetrics…) se montaient ensuite et repoussaient la cible de 1 500 à
// 4 000 px. On atterrissait dans la section Projets, puis useHashSync
// réécrivait le hash en #projects.
//
// Principe :
// 1. saut immédiat (`instant`, pas `auto` : html a `scroll-behavior: smooth`,
//    que `auto` respecterait) ;
// 2. tant que la hauteur du document change, on se recale sur la cible ;
// 3. on s'arrête quand la mise en page est stable (SETTLE_MS sans changement),
//    après MAX_MS, ou dès que l'utilisateur fait défiler lui-même ;
// 4. pendant toute la durée, isAnchorScrollActive() renvoie true pour que
//    useHashSync ne réécrive pas le hash avec une section traversée.

const SETTLE_MS = 600;
const MAX_MS = 4000;

let activeId: string | null = null;
let stopActive: (() => void) | null = null;

/** Vrai pendant un recalage programmatique vers une ancre. */
export function isAnchorScrollActive(): boolean {
  return activeId !== null;
}

/**
 * Fait défiler jusqu'à l'élément `id` et l'y maintient jusqu'à stabilisation
 * de la mise en page. Renvoie une fonction d'annulation (pour un useEffect).
 * Un second appel pour la même ancre pendant un recalage en cours est ignoré.
 */
export function scrollToAnchorWhenStable(id: string): () => void {
  if (typeof window === "undefined" || !id) return () => {};
  if (activeId === id && stopActive) return stopActive;
  stopActive?.();

  activeId = id;

  const snap = () => {
    const el = document.getElementById(id);
    // scroll-padding-top (globals.css) compense déjà la barre fixe.
    el?.scrollIntoView({ behavior: "instant", block: "start" });
  };

  let settleTimer: ReturnType<typeof setTimeout> | undefined;
  const armSettle = () => {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => {
      // Ne conclure que si la cible existe : sinon on attend MAX_MS.
      if (document.getElementById(id)) stop();
    }, SETTLE_MS);
  };

  // Toute variation de hauteur (section montée, image chargée…) déclenche un
  // recalage ; ResizeObserver couvre aussi l'apparition tardive de la cible.
  const ro = typeof ResizeObserver !== "undefined"
    ? new ResizeObserver(() => { snap(); armSettle(); })
    : null;
  ro?.observe(document.body);

  // L'utilisateur reprend la main : on cesse immédiatement de le contrarier.
  const userEvents = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
  const onUser = () => stop();
  userEvents.forEach((type) => window.addEventListener(type, onUser, { passive: true, once: true }));

  const maxTimer = setTimeout(() => stop(), MAX_MS);

  function stop() {
    ro?.disconnect();
    clearTimeout(settleTimer);
    clearTimeout(maxTimer);
    userEvents.forEach((type) => window.removeEventListener(type, onUser));
    if (activeId === id) {
      activeId = null;
      stopActive = null;
    }
  }

  stopActive = stop;
  snap();
  armSettle();
  return stop;
}

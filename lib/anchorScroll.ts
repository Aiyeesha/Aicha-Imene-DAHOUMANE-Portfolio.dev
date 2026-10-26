// lib/anchorScroll.ts
// -------------------
// Reliable scrolling to a home page anchor (#contact, #projects…) after a
// navigation from another page or a direct visit. Sections above the target
// mount late (TrackAwareServices with ssr: false, FeaturedProjects,
// LatestPosts…) and push it down by thousands of pixels, so a single scroll
// lands in the wrong section.
//
// 1. Jump immediately (`instant`, not `auto`: html has scroll-behavior:
//    smooth, which `auto` would honour).
// 2. Re-snap to the target while the document height keeps changing.
// 3. Stop once the layout is stable (SETTLE_MS without change), after MAX_MS,
//    or as soon as the user scrolls.
// 4. Meanwhile isAnchorScrollActive() returns true, so useHashSync does not
//    overwrite the hash with a section scrolled past.

const SETTLE_MS = 600;
const MAX_MS = 4000;

let activeId: string | null = null;
let stopActive: (() => void) | null = null;

/**
 * Moves focus to the reached section, so keyboard users continue from there
 * instead of from the header. tabindex="-1" makes the section focusable by
 * script without adding it to the tab order; preventScroll avoids fighting
 * the scroll.
 */
export function focusSection(el: HTMLElement): void {
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

/** Smooth scroll to a section of the current page, moving focus too. */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  focusSection(el);
}

/** True while snapping to an anchor programmatically. */
export function isAnchorScrollActive(): boolean {
  return activeId !== null;
}

/**
 * Scrolls to element `id` and keeps it there until the layout settles.
 * Returns a cancel function (for a useEffect). A second call for the same
 * anchor while one is running is ignored.
 */
export function scrollToAnchorWhenStable(id: string): () => void {
  if (typeof window === "undefined" || !id) return () => {};
  if (activeId === id && stopActive) return stopActive;
  stopActive?.();

  activeId = id;

  const snap = () => {
    const el = document.getElementById(id);
    // scroll-padding-top (globals.css) already offsets the fixed navbar.
    el?.scrollIntoView({ behavior: "instant", block: "start" });
  };

  let settleTimer: ReturnType<typeof setTimeout> | undefined;
  const armSettle = () => {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => {
      // Only settle once the target exists; otherwise wait for MAX_MS.
      const target = document.getElementById(id);
      if (target) {
        stop();
        focusSection(target);
      }
    }, SETTLE_MS);
  };

  // Any height change (section mounted, image loaded…) triggers a re-snap;
  // ResizeObserver also catches the target appearing late.
  const ro = typeof ResizeObserver !== "undefined"
    ? new ResizeObserver(() => { snap(); armSettle(); })
    : null;
  ro?.observe(document.body);

  // The user takes over: stop immediately.
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

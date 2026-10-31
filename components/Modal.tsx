"use client";

// Modal.tsx
// ---------
// Accessible dialog (focus trap, Escape, focus restored on close, background
// scroll locked).
//
// Rendered through a portal at the end of <body>: a position: fixed element
// is laid out against its nearest ancestor with a transform (or filter), not
// against the viewport. The hero column animates with a transform, so a
// modal rendered inside it was trapped in that column (and, on mobile, its
// CTA ended up below the fold of a scroll-locked page).

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";

export default function Modal({
  open,
  title,
  onClose,
  children
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const t = useTranslations();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    // Remember the active element to restore focus on close (ARIA pattern)
    prevFocusRef.current = document.activeElement as HTMLElement;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Minimal focus trap: keep focus inside panel
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href],button,textarea,input,select,[tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        const active = document.activeElement as HTMLElement | null;
        if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    // Focus first focusable element when open
    const t = setTimeout(() => {
      const focusable = panelRef.current?.querySelector<HTMLElement>(
        'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
    }, 0);

    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKeyDown);
      // Restore focus to the trigger when the modal closes
      prevFocusRef.current?.focus();
    };
  }, [open, onClose]);

  // Lock background scroll while the modal is open (as the mobile menu does),
  // restoring the original value on close. Separate effect depending on
  // `open` only: the effect above also depends on `onClose`, whose identity
  // can change on every parent render.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Closed, or rendered on the server (no document): nothing to show. The
  // modal only ever opens after a click, so it never takes part in SSR.
  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-80">
      <button
        type="button"
        aria-label={t("a11y.closeModal")}
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />
      <div className="absolute inset-0 grid place-items-center p-4">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          // Capped at the viewport height (dvh: follows the mobile browser
          // bars) minus the p-4 gutter; the header stays put and the body
          // scrolls, so every action stays reachable on small screens.
          className="card flex max-h-[calc(100dvh-2rem)] w-full max-w-3xl flex-col overflow-hidden"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-black/10 px-5 py-4 dark:border-white/10">
            <div className="font-semibold">{title}</div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t("a11y.closeModal")}
              className="rounded-full border border-black/10 bg-black/5 px-3 py-2 text-sm hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 soft-ring"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          <div className="min-h-0 overflow-y-auto overscroll-contain p-5">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
}

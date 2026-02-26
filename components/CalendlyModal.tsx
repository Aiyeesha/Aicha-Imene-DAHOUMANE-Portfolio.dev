"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Modal from "./Modal";

const CALENDLY = process.env.NEXT_PUBLIC_CALENDLY_URL || "";

export default function CalendlyModal() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  if (!CALENDLY) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-between rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
      >
        <span>{t("contact.bookCall")}</span>
        <span aria-hidden="true">↗</span>
      </button>

      <Modal open={open} title={t("contact.bookCall")} onClose={() => setOpen(false)}>
        <div className="grid gap-3">
          <p className="text-sm text-muted">{t("contact.calendlyHint")}</p>

          <div className="overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
            <iframe
              title="Calendly"
              src={CALENDLY}
              className="h-[70vh] w-full"
              loading="lazy"
            />
          </div>

          <div className="flex items-center justify-end gap-2">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
            >
              {t("contact.openInNewTab")}
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring"
            >
              {t("contact.close")}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

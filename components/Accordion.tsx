"use client";

import { useId, useState, type ReactNode } from "react";
import Image from "next/image";

export type AccordionItem = {
  id: string;
  title: string;
  subtitle?: string;
  rightMeta?: string;
  /**
   * Any renderable React content (string, element, fragments, etc.).
   * We intentionally avoid `JSX.Element` here because some TS configurations
   * (or missing React JSX typings) can make the `JSX` namespace unavailable.
   */
  content: ReactNode;

  // Optional company logo shown in the header
  logoSrc?: string;
  logoAlt?: string;
  /**
   * Optional extra classes for the logo container (rarely needed).
   * Example: "bg-white" or "bg-black".
   */
  logoContainerClassName?: string;
};

/**
 * Accordion (accessible)
 * ----------------------
 * - button + aria-controls + aria-expanded
 * - smooth expand/collapse without external dependencies
 */
export default function Accordion({
  items,
  defaultOpenId
}: {
  items: AccordionItem[];
  defaultOpenId?: string;
}) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openId === item.id;
        // Heuristic: mark a role as "current" based on the right meta.
        // This keeps the content file simple while giving a nice UX cue.
        const meta = item.rightMeta ?? "";
        const isCurrent = /present|aujourd.?hui/i.test(meta);
        const currentLabel = /aujourd/i.test(meta) ? "Actuel" : "Current";
        const panelId = `${baseId}-panel-${idx}`;
        const buttonId = `${baseId}-button-${idx}`;

        return (
          <div key={item.id} className="card overflow-hidden">
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full px-5 py-4 text-left transition-colors hover:bg-black/5 dark:hover:bg-white/5 soft-ring"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {item.logoSrc ? (
                    <span
                      className={[
                        "mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-black/10 bg-white",
                        "dark:border-white/10",
                        item.logoContainerClassName || ""
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      <Image
                        src={item.logoSrc}
                        alt={item.logoAlt || ""}
                        width={32}
                        height={32}
                        className="h-7 w-7 object-contain"
                      />
                    </span>
                  ) : null}

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="text-base font-semibold">{item.title}</div>
                      {isCurrent ? (
                        <span className="rounded-full bg-cyan-500/15 px-2 py-0.5 text-[11px] font-medium text-cyan-800 dark:text-cyan-200">
                          {currentLabel}
                        </span>
                      ) : null}
                    </div>
                    {item.subtitle ? (
                      <div className="mt-1 text-sm text-muted-2">{item.subtitle}</div>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {item.rightMeta ? (
                    <span className="text-xs text-muted-2">{item.rightMeta}</span>
                  ) : null}

                  <span
                    className={[
                      "grid h-8 w-8 place-items-center rounded-full border border-black/10 bg-black/5 text-muted transition-transform",
                      "dark:border-white/10 dark:bg-white/5",
                      isOpen ? "rotate-180" : "rotate-0"
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </div>
              </div>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={[
                "px-5",
                "grid transition-[grid-template-rows] duration-500 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              ].join(" ")}
            >
              <div className="overflow-hidden">
                <div className="pb-5 pt-1 text-sm text-muted leading-relaxed">
                  {typeof item.content === "string" ? <p>{item.content}</p> : item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

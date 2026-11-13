// lib/i18n/availableNowOverrides.ts
// Rewrites of messages/*.json applied once AVAILABLE_FROM is reached
// (see lib/availability.ts and i18n/request.ts).
//
// Each rule targets one message by its dotted path ("faq.items.0.a"):
// - { from, to } replaces a fragment, so the rest of the message can still be
//   edited in messages/*.json without touching this file;
// - { value } replaces the whole message.
// __tests__/availability-overrides.test.ts fails if a path or a fragment no
// longer exists, or if a dated "upcoming" wording survives the rewrite.

import type { AvailabilityLocale } from "@/lib/availability";

type Rule = { key: string } & ({ from: string; to: string } | { value: string });

export const AVAILABLE_NOW_OVERRIDES: Record<AvailabilityLocale, Rule[]> = {
  fr: [
    { key: "contact.intake.start.asap", from: "(à partir de décembre 2026)", to: "(disponible immédiatement)" },
    { key: "metadata.description", from: "Entretiens dès maintenant, disponible à partir de décembre 2026", to: "Disponible immédiatement" },
    { key: "metadata.descriptionItops", from: "Entretiens dès maintenant, disponible à partir de décembre 2026", to: "Disponible immédiatement" },
    { key: "profile.availabilityValue", from: "Disponible à partir de décembre 2026 · Entretiens dès maintenant", to: "Disponible immédiatement" },
    { key: "profile.p4_itops", from: "Développeuse Salesforce en CDI chez LD Digitales jusqu'au 30 novembre 2026", to: "Trois ans de développement Salesforce chez LD Digitales (alternance puis CDI, jusqu'en novembre 2026)" },
    { key: "faq.items.0.a", value: "Je suis disponible immédiatement, pour des entretiens comme pour une prise de poste. Mon poste de Développeuse Salesforce chez LD Digitales (alternance puis CDI, depuis octobre 2023) a pris fin le 30 novembre 2026." },
    { key: "availModal.badge", value: "Disponible immédiatement" },
    { key: "availModal.delayValue", value: "Disponible immédiatement" },
  ],
  en: [
    { key: "contact.intake.start.asap", from: "(from December 2026)", to: "(available immediately)" },
    { key: "metadata.description", from: "Interviews now, available from December 2026", to: "Available immediately" },
    { key: "metadata.descriptionItops", from: "Interviews now, available from December 2026", to: "Available immediately" },
    { key: "profile.availabilityValue", from: "Available from December 2026 · Interviews now", to: "Available immediately" },
    { key: "profile.p4_itops", from: "Full-time Salesforce Developer at LD Digitales until November 30, 2026", to: "Three years of Salesforce development at LD Digitales (work-study, then full-time, until November 2026)" },
    { key: "faq.items.0.a", value: "I'm available immediately, both for interviews and to start. My Salesforce Developer role at LD Digitales (apprenticeship, then permanent contract, since October 2023) ended on November 30, 2026." },
    { key: "availModal.badge", value: "Available immediately" },
    { key: "availModal.delayValue", value: "Available immediately" },
  ],
  es: [
    { key: "contact.intake.start.asap", from: "(a partir de diciembre de 2026)", to: "(disponible de inmediato)" },
    { key: "metadata.description", from: "Entrevistas desde ya, disponible a partir de diciembre de 2026", to: "Disponible de inmediato" },
    { key: "metadata.descriptionItops", from: "Entrevistas desde ya, disponible a partir de diciembre de 2026", to: "Disponible de inmediato" },
    { key: "profile.availabilityValue", from: "Disponible a partir de diciembre de 2026 · Entrevistas desde ya", to: "Disponible de inmediato" },
    { key: "profile.p4_itops", from: "Desarrolladora Salesforce con contrato indefinido en LD Digitales hasta el 30 de noviembre de 2026", to: "Tres años de desarrollo Salesforce en LD Digitales (formación dual y después contrato indefinido, hasta noviembre de 2026)" },
    { key: "faq.items.0.a", value: "Estoy disponible de inmediato, tanto para entrevistas como para incorporarme. Mi puesto de Desarrolladora Salesforce en LD Digitales (alternancia y después contrato indefinido, desde octubre de 2023) terminó el 30 de noviembre de 2026." },
    { key: "availModal.badge", value: "Disponible de inmediato" },
    { key: "availModal.delayValue", value: "Disponible de inmediato" },
  ],
};

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

/**
 * Returns a copy of `messages` with the rules applied. Throws when a path or a
 * fragment is missing, so a stale rule is caught by the tests, not shipped.
 */
export function applyOverrides<T>(messages: T, rules: Rule[]): T {
  // Messages are plain JSON: a JSON round trip is a full deep copy.
  const copy = JSON.parse(JSON.stringify(messages)) as Json;
  for (const rule of rules) {
    const parts = rule.key.split(".");
    const last = parts.pop()!;
    let node: Json = copy;
    for (const p of parts) {
      node = node && typeof node === "object" ? (node as Record<string, Json>)[p] : undefined as unknown as Json;
    }
    const parent = node as Record<string, Json> | undefined;
    const current = parent && typeof parent === "object" ? parent[last] : undefined;
    if (typeof current !== "string") throw new Error(`availability override: no message at ${rule.key}`);
    if ("value" in rule) {
      parent![last] = rule.value;
    } else {
      if (!current.includes(rule.from)) throw new Error(`availability override: "${rule.from}" not found in ${rule.key}`);
      parent![last] = current.replace(rule.from, rule.to);
    }
  }
  return copy as unknown as T;
}

/** Messages for a locale in the "available now" phase. */
export function availableNowMessages<T>(locale: string, messages: T): T {
  const rules = AVAILABLE_NOW_OVERRIDES[(locale in AVAILABLE_NOW_OVERRIDES ? locale : "en") as AvailabilityLocale];
  return applyOverrides(messages, rules);
}

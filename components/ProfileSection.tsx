import Reveal from "@/components/Reveal";
import { useTranslations } from "next-intl";

/**
 * ProfileSection
 * --------------
 * About block: narrative + at-a-glance facts (fully localized).
 *
 * Note: The section title/subtitle are rendered by the page; this component focuses
 * on the content itself to avoid duplicated headings.
 */
export default function ProfileSection() {
  const t = useTranslations();

  const facts: Array<{ label: string; value: string }> = [
    { label: t("profile.basedInLabel"), value: t("profile.basedInValue") },
    { label: t("profile.languagesLabel"), value: t("profile.languagesValue") },
    { label: t("profile.rolesLabel"), value: t("profile.rolesValue") },
    { label: t("profile.availabilityLabel"), value: t("profile.availabilityValue") },
    { label: t("profile.goalLabel"), value: t("profile.goalValue") }
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      {/* Narrative */}
      <div>
        <Reveal>
          <p className="text-muted">{t("profile.p1")}</p>
        </Reveal>

        <Reveal delayMs={60}>
          <p className="mt-4 text-muted">{t("profile.p2")}</p>
        </Reveal>

        <Reveal delayMs={90}>
          <p className="mt-4 text-muted">{t("profile.p3")}</p>
        </Reveal>

        <Reveal delayMs={120}>
          <p className="mt-4 text-muted">{t("profile.p4")}</p>
        </Reveal>
      </div>

      {/* At a glance */}
      <Reveal delayMs={120}>
        <div className="card p-6">
          <h3 className="text-lg font-semibold">{t("profile.atAGlanceTitle")}</h3>

          <dl className="mt-4 space-y-4">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-xs uppercase tracking-wider text-muted-2">{f.label}</dt>
                <dd className="mt-1 text-sm text-muted">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </div>
  );
}

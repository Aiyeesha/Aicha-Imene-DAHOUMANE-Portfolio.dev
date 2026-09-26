// components/ExperienceTimeline.tsx
// ---------------------------------
// Frise chronologique verticale des expériences (section « Expérience » de la
// page d'accueil), toujours dépliée : toutes les informations sont visibles
// sans clic, ce qui remplace l'ancien accordéon (components/Accordion.tsx).
//
// Structure :
//   <ol>  liste ordonnée, bordure verticale à gauche (de la plus récente à la
//         plus ancienne, dans l'ordre de content/experience.tsx)
//   <li>  une expérience, précédée d'une pastille ronde (pseudo-élément ::before)
//   <h3>  « Poste · Entreprise », l'entreprise en couleur d'accent — sous le
//         <h2> de la section
//   <p>   « Contrat · Période · Lieu », en texte atténué
//   <ul>  note éventuelle (italique atténué) puis réalisations
//
// Composant serveur, sans état ni JavaScript côté client. Styles en classes
// Tailwind uniquement (pas d'attribut style : la CSP à nonce l'interdit).
// Couleur d'accent : cyan, avec des nuances lisibles en thème clair et sombre
// (texte cyan-700 / cyan-300, contraste AA ; pastille cyan-600 / cyan-400).
// Les séparateurs « · » sont décoratifs : masqués aux lecteurs d'écran et
// remplacés par une virgule lue à voix haute.

import type { ExperienceItem } from "@/content/experience";

function Separator() {
  return (
    <>
      <span aria-hidden="true"> · </span>
      <span className="sr-only">, </span>
    </>
  );
}

export default function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="m-0 list-none border-l-2 border-black/10 p-0 dark:border-white/15">
      {items.map((item) => (
        <li
          key={item.id}
          className="relative pb-8 pl-6 last:pb-0 before:absolute before:-left-[7px] before:top-[0.45rem] before:h-3 before:w-3 before:rounded-full before:bg-cyan-600 before:content-[''] dark:before:bg-cyan-400"
        >
          <h3 className="text-lg font-semibold leading-snug">
            {item.role}
            <Separator />
            <span className="text-cyan-700 dark:text-cyan-300">{item.company}</span>
          </h3>

          <p className="mt-1 text-[0.95rem] text-muted-2">
            {item.contract}
            <Separator />
            {item.period}
            <Separator />
            {item.location}
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
            {item.note ? (
              <li className="italic text-sm text-slate-500 dark:text-slate-400">{item.note}</li>
            ) : null}
            {item.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

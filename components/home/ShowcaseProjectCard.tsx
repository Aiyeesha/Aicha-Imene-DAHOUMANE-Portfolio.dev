// components/home/ShowcaseProjectCard.tsx
// ----------------------------------------
// Carte d'un projet phare de l'accueil, au format Problème → Solution →
// Résultat (Option C, brief §3.3).
//
// Composant de présentation pur : il reçoit tous ses textes déjà traduits en
// props (aucun appel i18n ici), ce qui le rend testable sans mock next-intl et
// utilisable aussi bien depuis un Server Component que depuis un client.
//
// Contenu obligatoire de chaque carte : catégories · titre · statut honnête ·
// Problème · Solution · Résultat · technologies · liens. Les liens absents
// (pas d'étude de cas, pas de workflow) ne sont simplement pas rendus : on ne
// publie jamais de lien vide ou provisoire.

import Link from "next/link";

export type ShowcaseCardLabels = {
  problem: string;
  solution: string;
  result: string;
  tech: string;
  readCase: string;
  viewRepo: string;
  viewWorkflow: string;
  /** Suffixe annoncé aux lecteurs d'écran pour les liens externes. */
  opensInNewTab: string;
};

export type ShowcaseCardProps = {
  categories: string;
  title: string;
  status: string;
  problem: string;
  solution: string;
  result: string;
  tech: string[];
  /** Lien interne vers l'étude de cas (/<locale>/projects/<slug>), facultatif. */
  caseStudyHref?: string;
  repoUrl: string;
  workflowUrl?: string;
  labels: ShowcaseCardLabels;
};

// Classes partagées des boutons-liens, reprises du style existant du site.
const linkBtn =
  "inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-1.5 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring";

export default function ShowcaseProjectCard(props: ShowcaseCardProps) {
  const { labels } = props;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/3 p-5 md:p-6">
      {/* En-tête : domaine, titre, puis statut honnête (projet de formation,
          personnel, en cours…) — jamais retiré, cf. brief §0.2. */}
      <p className="text-xs font-medium uppercase tracking-wide text-cyan-700 dark:text-cyan-300">{props.categories}</p>
      <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{props.title}</h3>
      <p className="mt-1 text-sm italic text-muted">{props.status}</p>

      {/* Problème → Solution → Résultat : liste de définitions, sémantique
          adaptée à des couples libellé / valeur. */}
      <dl className="mt-4 grid gap-3 text-sm leading-relaxed">
        <div>
          <dt className="font-semibold text-slate-900 dark:text-white">{labels.problem}</dt>
          <dd className="mt-0.5 text-muted">{props.problem}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900 dark:text-white">{labels.solution}</dt>
          <dd className="mt-0.5 text-muted">{props.solution}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900 dark:text-white">{labels.result}</dt>
          <dd className="mt-0.5 text-muted">{props.result}</dd>
        </div>
      </dl>

      {/* Technologies : liste à puces présentée en pastilles ; son libellé est
          porté par aria-label (pas de titre visible supplémentaire). */}
      <ul aria-label={labels.tech} className="mt-4 flex flex-wrap gap-1.5">
        {props.tech.map((name) => (
          <li key={name} className="rounded-full border border-black/10 dark:border-white/10 px-2.5 py-0.5 text-xs text-muted">
            {name}
          </li>
        ))}
      </ul>

      {/* Liens de preuve, poussés en bas de carte (mt-auto) pour aligner les
          cartes d'une même rangée. Externes : nouvel onglet + noopener. */}
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {props.caseStudyHref && (
          <Link href={props.caseStudyHref} className={linkBtn}>
            {labels.readCase} <span aria-hidden="true">→</span>
          </Link>
        )}
        <a
          href={props.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${labels.viewRepo} — ${props.title} (${labels.opensInNewTab})`}
          className={linkBtn}
        >
          {labels.viewRepo} <span aria-hidden="true">↗</span>
        </a>
        {props.workflowUrl && (
          <a
            href={props.workflowUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${labels.viewWorkflow} — ${props.title} (${labels.opensInNewTab})`}
            className={linkBtn}
          >
            {labels.viewWorkflow} <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}

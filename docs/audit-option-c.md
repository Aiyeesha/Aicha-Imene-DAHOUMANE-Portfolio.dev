# Audit — Option C : fusion du portfolio actuel et de la preview « hybride »

> **Phase :** 0 — Audit (lecture seule, aucune modification de code applicatif)
> **Date :** 18/10/2026
> **Branche :** `docs/audit-option-c`
> **Commanditaire :** Aïcha Imène DAHOUMANE
> **Statut :** 🚦 en attente de validation (Gate 0)

---

> [!WARNING]
> **Incertitudes et points à vérifier par Aïcha (à lire en premier)**
>
> 1. **Dépôts des 3 projets vitrines introuvables (mise à jour du 18/10/2026).** Aïcha indique qu'ils sont sous le compte `Aiyeesha`, mais **aucun** n'apparaît parmi les 45 dépôts du compte visibles par l'application GitHub de la session (§5). Soit ils ne sont pas encore créés ou poussés, soit ils portent un autre nom, soit l'application GitHub n'y a pas accès. **À confirmer avant toute publication en accueil.** Par ailleurs, `python-network-scanner` (projet publié) pointe vers un **dépôt privé** : lien mort en production (§5.2).
> 2. **URL LinkedIn : deux variantes coexistent.** Le brief impose `https://www.linkedin.com/in/a%C3%AFcha-im%C3%A8ne-dahoumane` (avec accents) ; **les 36 CV de `public/cv/`** (HTML, et vraisemblablement les PDF générés depuis eux) utilisent `https://www.linkedin.com/in/aicha-imene-dahoumane` (sans accents). Sur le site, l'URL vient de la variable `NEXT_PUBLIC_LINKEDIN_URL` (valeur non lue, par principe). **Laquelle est la bonne ?** Si c'est la version accentuée, les CV devront être régénérés (`npm run cv:pdf`).
> 3. **Situation contractuelle à clarifier.** La preview indique « Développeuse Salesforce **en CDI** (LD Digitales, oct. 2025 – aujourd'hui) » et « CDI recherché », tandis que le brief demande « disponible sous 1 mois, entretiens dès maintenant » (formulation déjà présente sur le site actuel). Les deux sont compatibles (préavis), mais la formulation publique doit être validée par vous.
> 4. **Affirmation « 3 ans d'expérience Salesforce en production »** (`messages/fr.json`, clé `about.p4_salesforce`) : deux ans d'alternance + un an de CDI. Défendable, mais à confirmer pour l'entretien.
> 5. **Liste des certifications Salesforce divergente.** Site actuel : Platform Foundations, Administrator, App Builder, Platform Developer I (« planifiées début 2027 »). Preview : Administrator, App Builder, Platform Developer I (« en préparation »), **sans Platform Foundations**. Quelle liste fait foi ?
> 6. **Pages citées dans le brief mais inexistantes.** Il n'existe ni page « Expertise » ni page FAQ dédiée : la FAQ complète vit sur l'accueil (`ServicesFaq`, + JSON-LD `FAQPage`) et une autre sur `/work-with-me`. Le « Cluster sécurité » n'est pas une page mais l'onglet `/projects?tab=security`. Voir §6 (décisions demandées).
> 7. **Nombres de projets.** Le brief parle de « 26 projets » : c'est exact pour les projets **publiés** (46 au total dans `content/projects.ts`, dont 20 en brouillon). Le cluster sécurité compte **15** projets publiés (calculé dynamiquement).

---

## Sommaire

1. [Méthode et périmètre](#1-méthode-et-périmètre)
2. [Arborescence du dépôt actuel](#2-arborescence-du-dépôt-actuel)
3. [Cartographie technique](#3-cartographie-technique)
4. [Preview « hybride » : source et contenu réutilisable](#4-preview--hybride--source-et-contenu-réutilisable)
5. [État des dépôts GitHub](#5-état-des-dépôts-github)
6. [Écarts entre le brief et l'existant](#6-écarts-entre-le-brief-et-lexistant)
7. [Liste exhaustive des `TODO` et placeholders](#7-liste-exhaustive-des-todo-et-placeholders)
8. [Contrôles de conformité aux règles §0](#8-contrôles-de-conformité-aux-règles-0)
9. [État de référence qualité (baseline)](#9-état-de-référence-qualité-baseline)
10. [Risques](#10-risques)
11. [Estimation par phase](#11-estimation-par-phase)
12. [Questions ouvertes et décisions demandées (Gate 0)](#12-questions-ouvertes-et-décisions-demandées-gate-0)

---

## 1. Méthode et périmètre

| Élément | Méthode | Résultat |
|---|---|---|
| Dépôt du site actuel | Lecture du code (branche `main`, commit `fac51b1`) | ✅ complet |
| Preview « hybride » (rendu) | Récupération HTML via l'outil Vercel authentifié (le site est derrière la protection SSO Vercel) | ✅ accueil FR + 3 études de cas FR |
| Preview « hybride » (code source) | Arborescence du déploiement Vercel `dpl_Ck5EvEprySWpyCEdAr26XyfEDcxg` | ✅ arborescence ; fichiers non téléchargés (Phase 1) |
| Site de production (rendu) | Accès direct | ❌ refusé par le proxy de la session — audit fait **sur le code** |
| Dépôts GitHub tiers | `curl` anonyme | ❌ 403 proxy — **à confirmer par Aïcha** (§5) |
| Valeurs des variables d'environnement | — | Non lues, par principe (noms uniquement, §3.6) |

Aucun fichier applicatif n'a été modifié. Le seul ajout est ce document.

---

## 2. Arborescence du dépôt actuel

```text
Aicha-Imene-DAHOUMANE-Portfolio.dev/          (Next.js 16.4, React 19.3, Node 24, v1.3.4)
├── app/
│   ├── [locale]/                     # routes localisées (fr / en / es)
│   │   ├── page.tsx                  # ACCUEIL — cible principale de l'Option C
│   │   ├── layout.tsx                # Navbar + ⌘K + PIED DE PAGE (en ligne, pas de composant dédié)
│   │   ├── track-aware-hero.tsx      # hero client (lit le cookie `track`)
│   │   ├── about/  accessibility/  blog/[slug]/  blog/tags/  certifications/
│   │   ├── colophon/  contact/  hybride/  legal/  privacy/  projects/[slug]/
│   │   ├── resources/  security/acknowledgments/  status/  testimonial-submit/
│   │   ├── uses/  work-with-me/  [...rest]/ (404 localisée)
│   ├── admin/                        # back-office (incidents, publication)
│   ├── api/                          # contact, csp-report, search, health, revalidate, cron…
│   ├── feed*.xml/  sitemap.ts  robots.ts  manifest.ts  opengraph-image.tsx  twitter-image.tsx
├── components/                       # 46 composants (+ blog/ et mdx/)
├── content/
│   ├── projects.ts                   # SOURCE DE VÉRITÉ des cartes projets (46 entrées)
│   ├── projectDetails.ts             # titres/sections/galeries par locale
│   ├── projectHighlights.ts  github-repos.ts
│   ├── projects/<slug>/{fr,en,es}.mdx # 8 études de cas approfondies
│   ├── skills.ts  experience.tsx  certifications.ts  services.ts  tech-stack.ts
│   ├── about.ts  resources.ts  testimonials.ts
│   └── blog/posts/{fr,en,es}/*.mdx    # 14 articles publiés × 3 langues (+ 41 non publiés)
├── messages/{fr,en,es}.json          # traductions next-intl (462 chaînes, parité parfaite)
├── i18n/                             # routing.ts, request.ts, projectTaxonomy.ts
├── lib/                              # data/, security/, supabase/, ratelimit, booking, social…
├── public/cv/                        # 36 CV : {fr,en,es} × {hybrid,salesforce,itops} × {standard,ats} × {html,pdf}
├── public/projects/<slug>/           # visuels des projets
├── supabase/                         # migrations, seeds (back-office, incidents, tagging)
├── __tests__/ (26 suites)  e2e/ (7 specs Playwright)
├── scripts/                          # génération CV PDF, sécurité de publication, images…
└── .github/workflows/                # ci, codeql, content-publish-safety, drift-check, scorecard
```

---

## 3. Cartographie technique

### 3.1 Internationalisation

- **Bibliothèque :** `next-intl` 4.14.9 ; locales `fr`, `en`, `es` (`i18n/routing.ts`).
- **Traductions :** `messages/{fr,en,es}.json`, 29 espaces de noms (`nav`, `hero`, `sections`, `recruiter`, `faq`, `footer`, `hybrid`…), **462 chaînes identiques dans les 3 langues**.
- **Contenus longs hors `messages/` :** `content/skills.ts`, `content/experience.tsx`, `content/projectDetails.ts`, MDX des projets et du blog (tous trilingues).
- **⚠️ Textes en dur (dette existante, contraire au §3.5 du brief)** — ternaires `isFr ? … : isEs ? … : …` dans :
  `app/[locale]/page.tsx` (« Voir tous les projets »), `components/CommandPalette.tsx`, `components/ProjectsSection.tsx`, `components/blog/BlogSearchBar.tsx`, `app/[locale]/projects/page.tsx`, `projects/[slug]/page.tsx` et `not-found.tsx`, `status/page.tsx`, `uses/uses-content.tsx`, `work-with-me/work-with-me-content.tsx`, `contact/page.tsx`, les `opengraph-image.tsx`.
  → **Recommandation :** ne migrer vers `messages/` que les chaînes des fichiers touchés par l'Option C (accueil, navigation, pied de page, ⌘K), pour ne pas élargir le périmètre.

### 3.2 Source des données projets

**Fichiers TypeScript/MDX, pas Supabase** (la lecture Supabase des projets a été retirée — `lib/data/projectsSource.ts`).

```text
content/projects.ts ─┐                          ┌─> FeaturedProjects (accueil)
content/projectDetails.ts ─┼─> lib/data/projectsSource.ts ─> projects.cached.ts (Redis) ─┼─> /projects, /projects/[slug]
content/github-repos.ts ───┤        (allPublished(locale))                                 └─> Navbar (menu Projets), ⌘K
content/projectHighlights.ts ┘
content/projects/<slug>/<locale>.mdx ─> lib/data/projectMdx.ts (étude de cas approfondie)
```

- Champs utiles à l'Option C : `featured`, `sortOrder`, `status` (`published`/`draft`), `nature` (`rncp`, `rncp_capstone`, `personal`, `reconstructed`, `internship`, `greta_*`, `openclassrooms`), `badge`, `isBridge`, `isSecurity`, `repoUrl`, `liveUrl`, `track`.
- **Le format Problème → Solution → Résultat n'existe pas** dans le modèle : il faudra soit ajouter trois champs localisés, soit des clés i18n dédiées aux 5 projets phares (recommandé : un fichier `content/showcase.ts` trilingue, cf. §11).
- **Incohérences relevées** entre `content/projects.ts` et `content/github-repos.ts` :
  - `wirebright-visualforce-to-lightning` : `…/WireBrite-Consulting-Migration-Backup-Visualforce-jsbProject-` vs `…/WireBrite-Consulting-Migration-Backup` ;
  - `parkit-java-testing` (brouillon) : `…/ParkingSystem` vs `…/Projet-12`.
- `cicd-pipeline-setup` (projet phare n° 5 du brief) : **aucun `repoUrl` ni `liveUrl`** → règle de repli applicable (§6).

### 3.3 Composants réutilisables

| Besoin (brief §3.2) | Existant | Réutilisation |
|---|---|---|
| Hero | `app/[locale]/track-aware-hero.tsx` (client, Framer Motion, dépend du cookie `track`) | ♻️ à adapter : nouveau texte + puces de disponibilité ; décider du sort du toggle Salesforce/IT Ops (§12) |
| Sélecteur de profil (3 cartes + CV) | `components/RecruiterPaths.tsx` (+ test `RecruiterPaths.test.tsx`) | ✅ réutilisable tel quel ; ajout éventuel d'une 4ᵉ carte (Phase 5) |
| Compétences en 4 couches | `components/TrackAwareSkills.tsx` + `content/skills.ts` (par track, 2 colonnes) | ♻️ nouveau composant ou refonte : la structure « 4 couches » n'existe pas |
| « Là où mes deux mondes se rejoignent » | Section `#bridge` de `page.tsx` (clés `sections.bridge_*`) | ✅ à raccourcir (≤ 4 phrases) |
| Carte projet P/S/R | `components/FeaturedProjects.tsx` (filtre `featured` + `track`, max 5) | ♻️ nouveau composant `ShowcaseProjectCard` recommandé |
| Parcours | `components/ExperienceTimeline.tsx` + `content/experience.tsx` (+ test) | ✅ ; vérifier l'intitulé « Stage » Midrange |
| Certifications | `content/certifications.ts` (Trailhead : Expeditioner, 94 badges, 59 775 pts) | ✅ données prêtes ; bloc d'accueil à créer |
| FAQ courte | `components/ServicesFaq.tsx` + `faq.items` (+ JSON-LD dans `page.tsx`) | ♻️ limiter à 4 questions sur l'accueil |
| Contact | `components/ContactForm.tsx` (+ 2 suites de tests) → `app/api/contact/route.ts` | ✅ **à ne pas modifier** (anti-spam, rate limit Upstash, validation Zod) |
| Réservation | `lib/booking.ts` (Proton Calendar, lien externe, aucune exception CSP) + `components/BookingLink.tsx` | ✅ |
| Navigation | `components/Navbar.tsx` (862 lignes : 11 entrées + lien Cluster sécurité + menu déroulant Projets + toggle track + thème + langue + ⌘K) | ♻️ réduction à 6 entrées (Phase 2) |
| Pied de page | En ligne dans `app/[locale]/layout.tsx` (liste plate de 12 liens) | ♻️ extraire un composant `SiteFooter` en 4 colonnes |
| Palette ⌘K | `components/CommandPalette.tsx` (cmdk) — couvre toutes les pages secondaires | ✅ à conserver ; filet de sécurité d'accessibilité des routes |

### 3.4 Sections actuelles de l'accueil (ordre réel)

| # | Section actuelle (`id`) | Sort dans l'Option C |
|---|---|---|
| 1 | `#hero` | refonte (texte de la preview) |
| 2 | `#recruiter-paths` | conservée (n° 2) |
| 3 | `#bridge` | raccourcie (n° 5) |
| 4 | `#skills` | refonte en 4 couches (n° 4) |
| 5 | `#experience` | conservée (n° 7) |
| 6 | `#services` + FAQ | services : **retirés de l'accueil** (restent sur `/work-with-me`) ; FAQ réduite à 4 questions (n° 9) |
| 7 | `#trusted-by` (logos) + `GlobalMetrics` (compteurs) | **retirés** de l'accueil |
| 8 | `#security-cluster` | **retiré** (accessible via `/projects?tab=security`) |
| 9 | `#projects` | refonte : 5 projets P/S/R (n° 6) |
| 10 | `#blog` (`LatestPosts`) | **retiré** sauf décision contraire (question 6 du brief) |
| 11 | `#contact` | conservé + e-mail, LinkedIn, GitHub, réservation, « 48 h » (n° 10) |
| — | *absent* : Profil (n° 3), Certifications (n° 8) | à créer |

### 3.5 Tests et CI

- **Unitaires (Jest + Testing Library)** : 26 suites, 229 tests — dont `RecruiterPaths`, `ContactForm`, `ExperienceTimeline`, `TrackToggle`, sécurité (slug, JSON-LD, timing-safe), rate limit.
- **E2E (Playwright + axe-core)** : `accessibility`, `blog`, `contact-form`, `navigation`, `security-api`, `security-headers`, `track-toggle`. ⚠️ `navigation.spec.ts` et `track-toggle.spec.ts` seront impactés par les Phases 2–3.
- **CI GitHub Actions (`ci.yml`)** : gitleaks → depcheck → `npm audit` → lint → typecheck → tests → build → E2E → **Lighthouse CI**. Autres : CodeQL, OpenSSF Scorecard, `content-publish-safety` (`scripts/check-publish-safety.ts`), `drift-check`.
- **Hook pre-commit (Husky)** : gitleaks sur les fichiers indexés + rappel `CHANGELOG.md`.
- **⚠️ Seuils Lighthouse actuels (`.lighthouserc.json`) très en dessous des cibles du brief :**

  | Catégorie | Seuil actuel | Cible brief §5 |
  |---|---|---|
  | Performance | 0,40 (error) | ≥ 0,90 |
  | Accessibilité | 0,90 (error) | ≥ 0,95 |
  | Bonnes pratiques | 0,50 (warn) | ≥ 0,95 |
  | SEO | 0,85 (error) | ≥ 0,95 |

  → Écart majeur, notamment en performance (cf. commentaire de `page.tsx` : `headers()` dans `app/layout.tsx` force le rendu dynamique et `Cache-Control: no-store`). Voir risque R1.

### 3.6 Variables d'environnement (noms uniquement)

Publiques (`NEXT_PUBLIC_*`) : `AVATAR_URL`, `BOOKING_URL`, `BRAND_INITIALS`, `CONTACT_EMAIL`, `CV_PDF_URL`, `LINKEDIN_URL`, `OG_HEADLINE`, `OG_NAME`, `SAME_AS`, `SHOW_TESTIMONIALS`, `SITE_LASTMOD`, `SITE_NAME`, `SITE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_URL`.

Serveur (secrets) : `ADMIN_PASSWORD`, `ADMIN_USERNAME`, `CACHE_INVALIDATE_SECRET`, `CONTACT_RATE_LIMIT_MAX_REQUESTS`, `CONTACT_RATE_LIMIT_WINDOW_SECONDS`, `CRON_SECRET`, `FORMHOOK_AUTH_TOKEN`, `FORMHOOK_ENDPOINT`, `HEALTHCHECK_URL`, `IP_HASH_SALT`, `REVALIDATE_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`, `TESTIMONIAL_SUBMIT_TOKEN`, `UPSTASH_REDIS_REST_TOKEN`, `UPSTASH_REDIS_REST_URL`.

Impact Option C : l'URL LinkedIn et le lien GitHub de la navigation dépendent respectivement de `NEXT_PUBLIC_LINKEDIN_URL` et `NEXT_PUBLIC_SAME_AS` **dans Vercel**, pas du code (§12, question A).

### 3.7 Supabase

Utilisé pour le back-office (`app/admin`), les incidents de la page statut, les témoignages et le tagging sécurité ; **plus pour la lecture des projets**. L'Option C ne devrait toucher aucune migration.

---

## 4. Preview « hybride » : source et contenu réutilisable

### 4.1 Où se trouve le code ?

- Projet Vercel `portfolio-hybride-preview` (`prj_RqpRMxxNTMaNJHh3WDKO2etEM7ei`), **sans dépôt Git lié** : déployé par la CLI Vercel ; dernier déploiement `READY` (non production).
- Protection SSO Vercel active (sauf domaines personnalisés) ; balise `robots: noindex, nofollow` → aucun risque d'indexation en double.
- **Le code source complet est récupérable depuis le déploiement** (fichiers téléversés par la CLI) :

```text
src/
├── app/[locale]/{page.tsx, layout.tsx, not-found.tsx}
├── app/[locale]/{cybersecurite, devops-dev, infrastructure, salesforce, mentions-legales}/
├── app/[locale]/projets/[slug]/ (+ sous-pages par domaine)
├── app/api/contact/   app/sitemap.ts   app/robots.ts   app/globals.css
├── components/{ProfilePage, ProjectsGallery, Sections, SiteHeader, SiteNav, SiteFooter, ContactForm, Analytics, Reveal, icons}.tsx
├── content/{fr.ts, en.ts, catalog.ts, profiles.ts, types.ts, index.ts}   ← CONTENU À REPRENDRE
├── i18n/{routing, request, navigation}.ts   lib/contact-schema.ts
└── next.config.ts  proxy.ts  site.config.ts  package.json
```

→ **Recommandation :** en Phase 1, extraire uniquement `src/content/fr.ts` et `src/content/en.ts` (contenu) ; **ne pas importer** son CSS, ses composants ni sa dépendance éventuelle à `Analytics.tsx` (à auditer : le pied de page de la preview annonce « aucun cookie »). Merci de confirmer s'il existe malgré tout un dépôt Git local (question 1 du brief).

### 4.2 Contenu de la preview (FR) relevé

- **Hero :** surtitre, nom et accroche **identiques au brief** ; puces : « CDI recherché · ouverte au CDD et à l'intérim », « France & international », « Télétravail, hybride ou sur site ». ⚠️ **Portage salarial absent** et pas de délai de disponibilité.
- **Profil :** 3 paragraphes + langues (français maternel, anglais C1+, espagnol B1, italien A1).
- **Compétences :** 4 couches exactement conformes au brief, avec la phrase « Quatre domaines, une seule logique… ».
- **Expérience :** LD Digitales (CDI, oct. 2025 – aujourd'hui ; alternance oct. 2023 – sept. 2025 : 10+ classes Apex, 20+ Flows, ~30 %), Midrange Group (**Stage**, févr.–mai 2023, 50+ postes).
- **Projets (5) :** Access Review, SOC Detection Lab, Infra Lab (avec études de cas), Légarant-AXG (« Projet de certification RNCP niveau 6 » — ⚠️ à reformuler en « **projet fil rouge** RNCP niveau 6 »), Pipeline CI/CD (« Projet personnel », sans lien ni étude de cas).
- **Certifications :** RNCP 6 (2025), 3 certifications « en préparation », Trailhead Expeditioner (94 badges, 59 775 points) — cohérent avec `content/certifications.ts`.
- **Contact :** e-mail `ai.dahoumane@proton.me` ✅, LinkedIn `TODO` ❌, GitHub ✅, CV FR/EN, « réponse sous 48 heures ».
- **Études de cas (statuts honnêtes, à conserver mot pour mot) :**
  - *Access Review* — « v1 — analyse statique et tests LWC au vert ; tests Apex à exécuter dans une org » (18 méthodes de test Apex non exécutées, couverture non publiée) ;
  - *SOC Detection Lab* — « v1 — tests automatisés au vert ; rejeu dans un SIEM de lab à venir » (données entièrement synthétiques) ;
  - *Infra Lab* — « v1 — scripts et documentation ; captures du lab en fonctionnement à ajouter » (domaine fictif `lab.local`).

> ⚠️ Ces études de cas contiennent des affirmations techniques vérifiables uniquement dans les dépôts (« 6 tests au vert », « aucune violation haute/critique », « sans avertissement PSScriptAnalyzer », « STRIDE, 11 menaces »). Elles ne pourront être publiées qu'une fois les dépôts publics et ces résultats constatables (CI verte visible).

---

## 5. État des dépôts GitHub

> [!IMPORTANT]
> **Mise à jour du 18/10/2026.** Aïcha a confirmé que les dépôts vitrines sont sous le compte `Aiyeesha`. Le proxy refusant toujours l'accès direct, la vérification a été faite à partir de la **liste des 45 dépôts du compte auxquels l'application GitHub de la session a accès** (liste complète, sans pagination restante). Limite : un dépôt que l'application GitHub n'est pas autorisée à voir (installation limitée à une sélection de dépôts) n'apparaît pas dans cette liste.

### 5.1 Projets phares de l'accueil

| Projet | Dépôt attendu | Constat | Conséquence |
|---|---|---|---|
| Access Review | `access-review-salesforce` (nom de la preview) | ❌ **absent de la liste** — aucun dépôt approchant (`access`, `review`, `recert`) | Bloquant pour l'accueil tant que le dépôt n'est pas publié ou visible |
| SOC Detection Lab | `soc-detection-lab` | ❌ **absent** — aucun dépôt `soc`, `sigma`, `detection` | idem |
| Infra Lab | `infra-lab-ad-pfsense` | ❌ **absent** — aucun dépôt `infra`, `lab`, `pfsense`, `ad` | idem |
| Légarant-AXG | `legarant-axg-crm-sync` | ✅ **public** (existe aussi `Legarant-app`, public) | Conforme |
| MediCare (workflow) | `medicare-solutions` | ✅ **public** | Repli valable pour le projet n° 5 (fichier `validate.yml` à vérifier en recette) |
| Pipeline CI/CD | aucun dépôt dédié | — (`jenkins-demo` public existe, mais sans rapport établi) | Repli MediCare recommandé |
| Portfolio | `Aicha-Imene-DAHOUMANE-Portfolio.dev` | ✅ public | — |

### 5.2 Liens déjà publiés sur le site actuel (constat hors Option C, mais à corriger)

| Projet publié | `repoUrl` affiché | Constat | Gravité |
|---|---|---|---|
| `python-network-scanner` (publié, cluster sécurité) | `Python-network-scanner-project` | ⚠️ **dépôt privé** → lien mort (404) pour les visiteurs | **Élevée** — lien mort en production |
| `python-password-checker` (brouillon) | `Python-Password-Checker-project` | dépôt privé | Faible (non publié) |
| `wirebright-visualforce-to-lightning` | `WireBrite-…-Visualforce-jsbProject-` (projects.ts) | ✅ public | — |
| ↳ repli `content/github-repos.ts` | `WireBrite-Consulting-Migration-Backup` | ❌ **n'existe pas** | Faible (repli non utilisé tant que `repoUrl` est renseigné) — à aligner |
| `parkit-java-testing` (brouillon) | `ParkingSystem` (fork public) vs `Projet-12` (public) | les deux existent | À trancher avant publication |
| `hemebiotech-java-debug` (brouillon) | `Hemebiotech` | public, mais **fork** | À signaler si publié (code d'origine OpenClassrooms) |
| `risk-assessment-matrix` (brouillon) | `matrice-risques` | public ; un dépôt `risk-assessment-matrix` existe aussi | À aligner |
| iDEM-Connect, FASHA, Avenir-TELECOM, risque360, cve-watchlist, log-anomaly-detector, incident-response-tracker, security-monitoring-dashboard, vulnerability-assessment-report, playbook-reponse-incidents, incident-response-playbook, PochLib | — | ✅ tous **publics** | — |

**Règle §0 (OrgDocs / SFRelease)** : `orgdocs` existe et est **privé** ✅ ; aucun dépôt `sfrelease` visible ; aucun lien depuis le site ✅.

Le statut HTTP réel des liens (200/404) reste à contrôler par un vérificateur de liens en Phase 6, depuis une CI ayant accès à GitHub.

---

## 6. Écarts entre le brief et l'existant

| # | Brief | Existant | Proposition |
|---|---|---|---|
| E1 | Nav : 6 entrées | 11 entrées + Cluster sécurité + menu déroulant Projets + toggle track | Phase 2 ; garder le menu déroulant Projets ? (§12-C) |
| E2 | Pied de page en 4 colonnes | Liste plate de 12 liens dans `layout.tsx` | Extraire `SiteFooter` ; y ajouter **About**, **Projets/cluster sécurité**, **Blog** et **Accusés de réception sécurité** qui n'y figurent pas |
| E3 | Lien vers « la FAQ complète si elle existe en page dédiée » | Pas de page FAQ ; FAQ complète sur l'accueil (+ JSON-LD) et sur `/work-with-me` | Lier vers `/work-with-me#faq` (ou créer `/faq` — hors périmètre, à décider) |
| E4 | Page « Expertise » | N'existe pas | Supposé = `/work-with-me` (services) — à confirmer |
| E5 | Toggle Salesforce/IT Ops | Pilote hero, compétences, services, projets, menu Projets | Avec les 4 couches et 5 projets fixes, le toggle n'a plus de rôle sur l'accueil (§12-B) |
| E6 | Projet 5 « CI/CD » avec lien public | `cicd-pipeline-setup` sans dépôt ni étude de cas MDX | Repli sur le workflow MediCare si aucun dépôt public |
| E7 | Légarant : « projet fil rouge RNCP niveau 6 » | Badge `CAPSTONE RNCP 6` (site) / « Projet de certification RNCP niveau 6 » (preview) | Harmoniser le libellé dans les 3 langues |
| E8 | Portage salarial dans les contrats | ✅ présent sur le site (FAQ, métadonnées, contact) ; ❌ absent de la preview | Reprendre la formulation du site |
| E9 | Couche « 02 Sécurité » sur `/hybride` | `content/skills.ts` : « Culture sécurité (contrôle d'accès, ransomware) » (×2 par langue, 6 occurrences) | Phase 4 |
| E10 | Lighthouse ≥ 90/95/95/95 | Seuils 40/90/50/85 | Risque R1 ; relever les seuils progressivement |
| E11 | Aucun texte en dur | Nombreux ternaires `isFr/isEs` | Migrer ceux des fichiers touchés |
| E12 | Recette git : `git log --format=%B \| grep -iE "co-authored\|claude\|generated with"` vide | 1 occurrence **historique** : `Merge pull request #420 from Aiyeesha/claude/code-scanning-security-8k9zw0` | Ne **pas** réécrire l'historique de `main` ; restreindre le contrôle aux commits de l'Option C (`git log origin/main..HEAD`) |

---

## 7. Liste exhaustive des `TODO` et placeholders

### 7.1 Preview « hybride » (10 occurrences dans le HTML de l'accueil, liens uniquement)

| Emplacement | Valeur | Action |
|---|---|---|
| Contact → LinkedIn | `https://www.linkedin.com/in/TODO` | URL réelle (cf. incertitude n° 2) |
| Carte + étude de cas Access Review | `https://github.com/TODO/access-review-salesforce` | URL réelle ou retrait + repli |
| Carte + étude de cas SOC Detection Lab | `https://github.com/TODO/soc-detection-lab` | idem |
| Carte + étude de cas Infra Lab | `https://github.com/TODO/infra-lab-ad-pfsense` | idem |
| CV | `/cv/CV_FR.pdf`, `/cv/CV_EN.pdf` | non repris : le site actuel a ses propres CV par profil et par langue |

### 7.2 Site actuel

| Fichier | Contenu | Gravité |
|---|---|---|
| `app/manifest.ts:103` | `// TODO (PORT-009) : ajouter un screenshot "narrow"` | Commentaire de code, non rendu — à traiter ou reformuler pour que le `grep` de recette soit vide |
| `app/sitemap.ts:36` | `"https://example.com"` dans un commentaire JSDoc | idem (commentaire) |
| `components/SkeletonCard.tsx`, `SafeImage.tsx`, `SeriesBanner.tsx`, `Testimonials.tsx` (`isPlaceholder`) | mot « placeholder » dans le code (squelettes de chargement, filtre des témoignages fictifs) | Faux positifs fonctionnels — le `grep` de recette devra les exclure ou viser le **HTML généré** |
| `ContactForm.tsx` (`contractPlaceholder`, `startPlaceholder`) | clés i18n d'options vides | Faux positif |
| `content/blog/posts/*/salesforce-sandbox-management.mdx` | `c.Phone = '0600000000'` (donnée de test fictive dans un extrait Apex) | Faux positif « téléphone » ; acceptable, mais à valider |

**Aucun lien `TODO`, aucun `lorem`, aucun `example.com` rendu à l'écran n'a été trouvé dans le site actuel.**

---

## 8. Contrôles de conformité aux règles §0

| Règle | Résultat de l'audit |
|---|---|
| Contact public = `ai.dahoumane@proton.me` uniquement | Site : e-mail via `NEXT_PUBLIC_CONTACT_EMAIL` (valeur non lue) — à vérifier en recette ; preview : ✅ |
| Aucun numéro de téléphone | ✅ aucun dans `app/`, `components/`, `content/`, `messages/`, CV HTML (hors donnée fictive §7.2) ; PDF non inspectés en détail |
| Aucun lien Linktree | ✅ aucune occurrence |
| Aucun lien OrgDocs / SFRelease | ✅ aucune occurrence |
| Certifications Salesforce non présentées comme acquises | ✅ « planifiées début 2027 » (site) / « en préparation » (preview) |
| Légarant-AXG = projet RNCP, jamais expérience pro | ✅ badge `CAPSTONE RNCP 6`, nature `rncp_capstone` ; libellé à harmoniser (E7) |
| Étiquettes de statut des projets | ✅ système `nature` + `badge` en place (`lib/projectNature.ts`, tests `projectNature.test.ts`) — à préserver |
| Secrets dans le dépôt | ✅ `.env.example` sans valeur sensible apparente ; gitleaks en CI et en pre-commit |
| En-têtes de sécurité | ✅ CSP à nonce (`proxy.ts`, `next.config.mjs`), tests E2E `security-headers` |

---

## 9. État de référence qualité (baseline)

Mesuré le 18/10/2026 sur `main` (`fac51b1`), dans l'environnement d'audit :

| Contrôle | Commande | Résultat |
|---|---|---|
| Installation | `npm ci --ignore-scripts` | ✅ 971 paquets |
| Typage | `npm run typecheck` | ✅ 0 erreur |
| Lint | `npm run lint` | ✅ 0 erreur, 21 avertissements |
| Tests unitaires | `npx jest --ci` | ✅ 26 suites, 229 tests au vert |
| Build, E2E, Lighthouse | — | ⏳ non exécutés ici (dépendent du réseau et des variables d'environnement) — référence à prendre sur la CI de la PR |

---

## 10. Risques

| ID | Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|---|
| R1 | Cible Lighthouse Performance ≥ 90 inatteignable sans revoir le rendu dynamique (`headers()` dans le layout, hero client + Framer Motion, `BAILOUT_TO_CLIENT_SIDE_RENDERING`) | Élevée | Élevé | Hero en Server Component (sans dépendance au cookie), suppression des compteurs/logos/blog de l'accueil, mesure à chaque phase ; si l'écart persiste, décision explicite d'Aïcha sur le seuil |
| R2 | Dépôts vitrines non publics → 3 des 5 projets phares inapplicables (aucun des 3 visible au 18/10/2026, §5.1) | Élevée | Élevé | Règle de repli §3.3 ; candidats : `security-monitoring-dashboard`, `cve-watchlist`, `incident-response-tracker` (sécurité), `it-ops-network-security` (infra), `idemconnect-apex-backend` (Salesforce) — à valider |
| R3 | Suppression du toggle track → régressions (cookie, E2E `track-toggle`, Navbar, `/projects`) | Moyenne | Moyen | Garder le toggle hors accueil (pages secondaires) dans un premier temps |
| R4 | Pages devenues orphelines après réduction de la navigation | Moyenne | Moyen | Test automatisé « chaque route du sitemap est liée depuis le pied de page ou ⌘K » |
| R5 | Traduction ES de qualité insuffisante | Moyenne | Moyen | Signalement systématique des chaînes ES nouvelles dans `docs/contenu-accueil-option-c.md` |
| R6 | Affirmations des études de cas non vérifiables (tests, CI) | Moyenne | Élevé (entretien) | Ne publier qu'après constat de la CI verte sur le dépôt public |
| R7 | Divergence LinkedIn site / CV | Avérée | Faible à moyen | Décision n° 2, puis régénération des CV si nécessaire |
| R8 | JSON-LD `FAQPage` modifié (4 questions au lieu de N) | Faible | Faible (SEO) | Garder le JSON-LD complet sur la page qui porte la FAQ complète |
| R9 | Contrôle git de recette faussé par l'historique (#420) | Avérée | Faible | Restreindre le contrôle au périmètre de la PR (E12) |

---

## 11. Estimation par phase

Estimations en jours de travail effectif (hors délais de validation), avec un livrable par PR.

| Phase | Branche | Contenu | Estimation |
|---|---|---|---|
| 0 — Audit | `docs/audit-option-c` | ce document | ✅ fait |
| 1 — Contenu | `docs/home-content-option-c` *(proposée)* | Extraction du contenu de la preview ; rédaction FR → EN → ES ; tableau des clés ; 5 cartes P/S/R ; FAQ courte | 1,5 à 2 j |
| 2 — Navigation | `refactor/home-navigation` | Navbar à 6 entrées + actions ; `SiteFooter` en 4 colonnes ; ⌘K à jour ; test d'accessibilité des routes ; sitemap | 1,5 à 2 j |
| 3 — Accueil | `feat/home-hybrid-layout` | 10 sections ; `ShowcaseProjectCard` (+ tests) ; hero ; compétences 4 couches ; responsive 375/768/1280 ; thèmes ; mise à jour des E2E | 3 à 4 j |
| 4 — Vitrines | `feat/showcase-case-studies` | Entrées `content/projects.ts`, `projectDetails.ts`, MDX ×3 langues pour les projets dont le dépôt est public ; couche Sécurité sur `/hybride` | 2 à 3 j (selon nombre de dépôts publics) |
| 5 — Profil SOC (optionnelle) | `feat/profile-security-soc` | 4ᵉ carte ; CV fourni par Aïcha | 0,5 j |
| 6 — Recette | `docs/recette-option-c` *(proposée)* | Checklist §5, vérification des liens, Lighthouse, `docs/recette-option-c.md` | 1 j |
| **Total** | | | **≈ 9,5 à 12,5 j** |

---

## 12. Questions ouvertes et décisions demandées (Gate 0)

### Questions du brief (§6), avec les éléments trouvés

1. **Code source de la preview** — Trouvé dans le déploiement Vercel (pas de dépôt Git lié). **Existe-t-il un dépôt local que je devrais utiliser à la place ?**
2. **Dépôts Access Review, SOC Detection Lab, Infra Lab** — Non vérifiables d'ici. **Existent-ils, sont-ils publics, quels sont leurs noms exacts ?**
3. **CI/CD multi-environnements** — Aucun dépôt référencé. **Remplacement par le workflow MediCare (`medicare-solutions/.github/workflows/validate.yml`) ?** Ce dépôt est-il public ?
4. **4ᵉ profil Sécurité / SOC** — Oui / non ?
5. **Sort de la preview Vercel** après la mise en production — conserver / supprimer (aucune suppression sans accord écrit) ?
6. **Aperçu du blog sur l'accueil** — 2 articles ou lien de navigation seul ?

### Décisions complémentaires issues de l'audit

- **A. URL LinkedIn** : avec accents (brief) ou sans (CV) ? La valeur de `NEXT_PUBLIC_LINKEDIN_URL` dans Vercel est-elle déjà correcte ?
- **B. Toggle Salesforce / IT Ops** : le retirer de l'accueil (recommandé, puisque compétences et projets deviennent communs) en le conservant sur `/projects` et le blog ?
- **C. Menu déroulant « Projets »** de la navigation : le conserver (6 entrées respectées) ou le remplacer par une simple ancre `#projects` (recommandé pour la lisibilité) ?
- **D. Lien « FAQ complète »** : vers `/work-with-me#faq` ou création d'une page `/faq` (hors périmètre actuel) ?
- **E. Liste des certifications** : avec ou sans *Platform Foundations* ? Libellé « en préparation » ou « prévues début 2027 » ?
- **F. Disponibilité** : confirmer la formulation publique « disponible sous 1 mois, entretiens dès maintenant » au regard du CDI en cours.
- **G. Seuils Lighthouse** : relever les seuils de `.lighthouserc.json` dès la Phase 3, ou seulement à la recette ?

---

**🚦 Demande de validation :** merci de valider cet audit (ou de l'amender) et de répondre aux questions 1 à 6 et A à G. La Phase 1 (contenu) ne démarrera qu'après votre accord explicite.

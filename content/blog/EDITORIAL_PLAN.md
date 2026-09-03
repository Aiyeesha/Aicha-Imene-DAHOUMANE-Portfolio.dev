# Plan éditorial — Blog portfolio

> **Objectif** : Publier régulièrement des articles techniques qui démontrent
> l'expertise Salesforce et IT Ops, attirent du trafic organique qualifié,
> et servent de portfolio vivant auprès des recruteurs et clients.

---

## Cadence et workflow

| Étape | Détail |
|-------|--------|
| **Fréquence cible** | 1 article / 2 semaines (26/an) |
| **Rédaction** | EN en priorité → traduction FR ensuite |
| **Durée min. d'un article** | ~600 mots (≥ 4 min lecture) |
| **Mise en ligne** | Créer `/en/slug.mdx` + `/fr/slug.mdx` simultanément |
| **Validation** | Relire sur mobile + dark mode avant publication |

---

## Couverture actuelle (40 articles)

### Salesforce (18 articles EN + FR)

| Slug | Titre | Tags |
|------|-------|------|
| apex-batch-jobs-scheduling | Apex Batch Jobs & Scheduling | Salesforce, Apex |
| apex-triggers-best-practices | Apex Triggers Best Practices | Salesforce, Apex |
| flow-vs-apex-decision-guide | Flow vs Apex — Decision Guide | Salesforce, Flow |
| lwc-reusable-components | LWC Reusable Components | Salesforce, LWC |
| salesforce-cicd-github-actions | CI/CD with GitHub Actions | Salesforce, CI/CD |
| salesforce-governor-limits | Governor Limits | Salesforce, Apex |
| salesforce-lwc-testing | LWC Testing | Salesforce, LWC |
| salesforce-sandbox-management | Sandbox Management | Salesforce |
| soql-performance-optimization | SOQL Performance | Salesforce, SOQL |

### IT Ops (18 articles EN + FR)

| Slug | Titre | Tags |
|------|-------|------|
| acronis-backup-recovery-ops | Acronis Backup & Recovery | IT Ops, Backup |
| active-directory-gpo-best-practices | AD GPO Best Practices | IT Ops, Windows |
| autotask-ticketing-workflow | Autotask Ticketing | IT Ops, ITSM |
| datto-rmm-supervision-runbooks | Datto RMM Runbooks | IT Ops, RMM |
| malwarebytes-alert-triage-mitre | Malwarebytes Alert Triage | IT Ops, Security |
| pfsense-squid-proxy-setup | pfSense + Squid Proxy | IT Ops, Network |
| powershell-sysadmin-automation | PowerShell Automation | IT Ops, PowerShell |
| windows-autopilot-deployment | Windows Autopilot | IT Ops, Windows |
| windows-server-2022-hardening | Windows Server Hardening | IT Ops, Security |

### Web / Next.js (4 articles EN + FR)

| Slug | Titre | Tags |
|------|-------|------|
| next-intl-app-router | Next.js App Router i18n with next-intl | Next.js, i18n |
| nextjs-admin-dashboard-supabase | Secure Admin Dashboard (Next.js 16 + Supabase) | Next.js, Supabase, Security |

---

## Prochains articles à créer

### Priorité 1 — Salesforce (forte demande organique)

| # | Slug suggéré | Titre | Tags | Mots-clés SEO |
|---|-------------|-------|------|---------------|
| 1 | `salesforce-deployment-strategies` | Deployment Strategies: Change Sets vs Salesforce CLI vs DevOps Center | Salesforce, DevOps, CI/CD | salesforce deploy best practices |
| 2 | `apex-test-classes-best-practices` | Writing Reliable Apex Test Classes (85%+ coverage without cheating) | Salesforce, Apex, Testing | apex test class salesforce |
| 3 | `salesforce-data-migration-checklist` | Salesforce Data Migration Checklist (from Legacy to SF) | Salesforce, Data, Migration | salesforce data migration guide |
| 4 | `salesforce-platform-events` | Platform Events & Change Data Capture: Real-Time Integration Patterns | Salesforce, Integration, Events | salesforce platform events tutorial |
| 5 | `salesforce-lwc-performance` | LWC Performance: wire adapters, caching strategies, lazy loading | Salesforce, LWC, Performance | lwc performance optimization |

### Priorité 2 — IT Ops (différenciation profil)

| # | Slug suggéré | Titre | Tags | Mots-clés SEO |
|---|-------------|-------|------|---------------|
| 6 | `linux-server-hardening-checklist` | Linux Server Hardening Checklist (Ubuntu/Debian production) | IT Ops, Linux, Security | linux server hardening 2025 |
| 7 | `docker-compose-production-setup` | Docker Compose for Production: networking, volumes, health checks | IT Ops, Docker, DevOps | docker compose production |
| 8 | `github-actions-reusable-workflows` | Reusable GitHub Actions Workflows (DRY CI pipelines) | IT Ops, DevOps, GitHub Actions | github actions reusable workflow |
| 9 | `monitoring-alerting-stack` | Monitoring Stack: Prometheus + Grafana + Alertmanager on a budget | IT Ops, Monitoring, Linux | prometheus grafana setup |
| 10 | `incident-response-runbook-template` | Incident Response Runbook Template (copy-paste ready) | IT Ops, ITSM, Security | incident response template |

### Priorité 3 — Transversal & SEO longue traîne

| # | Slug suggéré | Titre | Tags |
|---|-------------|-------|------|
| 11 | `salesforce-trailhead-path-developer` | My Salesforce Developer certification path (timeline + tips) | Salesforce, Career |
| 12 | `salesforce-infra-hybrid-profile` | Building a hybrid Salesforce + infrastructure profile (why and how) | Salesforce, Career, DevOps |
| 13 | `git-workflow-salesforce-projects` | Git Workflow for Salesforce Projects (branching strategy) | Salesforce, Git, DevOps |

---

## Règles SEO & qualité

### Frontmatter

```yaml
title: "Objectif + bénéfice concret (50-60 caractères)"
excerpt: "Résumé actionnable — répondre à : pourquoi lire cet article ? (120-160 car.)"
date: "YYYY-MM-DD"
tags: ["Tag principal", "Tag secondaire"]
```

### Structure des articles

1. **Hook** : phrase d'accroche + problème concret (2-3 lignes)
2. **Prérequis** : ce qu'il faut savoir/avoir (liste courte)
3. **Corps** : sections H2 progressives (2-5 sections)
4. **Code** : blocs commentés avec le bon langage (`apex`, `bash`, `yaml`…)
5. **Pièges** : liste des erreurs courantes
6. **Résumé** : tableau récapitulatif ou bullet points
7. **Ressources** : liens officiels vérifiés

### Tags officiels utilisés

**Salesforce** : `Salesforce`, `Apex`, `LWC`, `SOQL`, `Flow`, `CI/CD`, `DevOps`,
`Integration`, `Testing`, `Security`, `Deployment`, `Data`, `Migration`, `Events`

**IT Ops** : `IT Ops`, `Linux`, `Windows`, `Docker`, `Bash`, `PowerShell`,
`Network`, `Security`, `Monitoring`, `ITSM`, `RMM`, `Backup`, `GitHub Actions`

**Transversal** : `Career`, `Git`, `Next.js`, `i18n`

> **Règle** : le premier tag doit toujours être `Salesforce` ou `IT Ops`
> pour que la détection de catégorie (`detectTrack()`) fonctionne correctement.

---

## Traduction EN → FR

- Créer `content/blog/posts/fr/<même-slug>.mdx` après la version EN
- Adapter les exemples culturels si besoin (ex : références législatives FR)
- Même frontmatter, mêmes tags
- Date identique (même article, deux locales)

---

## Métriques à suivre

| Métrique | Outil | Cible |
|----------|-------|-------|
| Trafic organique | Google Search Console | +20% / trimestre |
| Impressions | GSC | Top 3 sur au moins 5 articles |
| Taux de rebond | Vercel Analytics | < 65% |
| Articles publiés | — | 2/mois minimum |
| Couverture tags | — | ≥ 15 tags distincts utilisés |

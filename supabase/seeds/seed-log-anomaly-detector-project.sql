-- supabase/seeds/seed-log-anomaly-detector-project.sql
-- -----------------------------------------------------------
-- Log Anomaly Detector — rule-based detection engine for
-- authentication logs (brute force, impossible travel,
-- credential stuffing, off-hours access).
-- Repo: https://github.com/Aiyeesha/log-anomaly-detector
-- Already applied directly to production via the Supabase MCP on
-- 2026-07-21; this file exists for repo parity / audit trail.
-- -----------------------------------------------------------

-- ── EN ───────────────────────────────────────────────────────────────────────
INSERT INTO projects (slug, locale, title, summary, content, tech_stack, repo_url, live_url, track, categories, tags, badge, highlights, featured, sort_order, status)
VALUES (
  'log-anomaly-detector', 'en',
  'Log Anomaly Detector — Rule-Based Auth Log Analysis',
  'Rule-based detection engine for authentication logs, surfacing brute-force attempts, impossible-travel logins, credential-stuffing bursts, and off-hours access — each rule a pure, unit-tested function with zero I/O.',
  'FastAPI backend where four independent detection rules (detection.py) take plain event dicts and return plain anomaly dicts: brute force (5+ failed logins for one account within 5 minutes), impossible travel (same account, two countries, under 2 hours apart), credential stuffing (8+ distinct usernames failing from one IP within 10 minutes — the horizontal counterpart to brute force), and off-hours access (successful login 22:00-06:00 UTC). An orchestration layer handles windowing, persistence, and anomaly deduplication so a sustained attack does not spam duplicate alerts. A "Simulate attack traffic" button replays a deterministic scenario that trips all four rules exactly once. Verified live, including that replaying the scenario correctly produces zero duplicate anomalies.',
  ARRAY['Python','FastAPI','SQLAlchemy','React','TypeScript','Vite','SQLite','Docker','Pytest'],
  'https://github.com/Aiyeesha/log-anomaly-detector', NULL,
  'itops', ARRAY['Security','Detection Engineering'], ARRAY['Anomaly Detection','Brute Force','FastAPI','React'],
  '{"tone":"personal","label":"PERSONAL PROJECT"}'::jsonb,
  ARRAY[
    'Four independent detection rules: brute force, impossible travel, credential stuffing, off-hours access',
    'Anomaly deduplication — a rule will not re-fire for the same subject within its own time window',
    'Deterministic demo scenario reproducibly triggers all four rules — verified live, including dedup on replay',
    '20 automated tests, all 4 rules unit-tested via plain event dicts — zero database or clock dependency',
    'Generates alerts by reasoning over sequences of events, instead of just displaying pre-existing ones'
  ],
  false, 263, 'published'
) ON CONFLICT (slug, locale) DO NOTHING;

-- ── FR ───────────────────────────────────────────────────────────────────────
INSERT INTO projects (slug, locale, title, summary, content, tech_stack, repo_url, live_url, track, categories, tags, badge, highlights, featured, sort_order, status)
VALUES (
  'log-anomaly-detector', 'fr',
  'Log Anomaly Detector — Analyse de logs d''authentification par règles',
  'Moteur de détection à base de règles pour les journaux d''authentification, faisant ressortir les tentatives de force brute, les connexions à voyage impossible, les rafales de credential stuffing et les accès hors-horaires — chaque règle une fonction pure et testée unitairement, sans I/O.',
  'Backend FastAPI où quatre règles de détection indépendantes (detection.py) prennent de simples dictionnaires d''événements en entrée et retournent de simples dictionnaires d''anomalies : force brute (5+ échecs de connexion pour un même compte en moins de 5 minutes), voyage impossible (même compte, deux pays, moins de 2h d''écart), credential stuffing (8+ noms d''utilisateur distincts échouant depuis une même IP en moins de 10 minutes — le pendant horizontal de la force brute), et accès hors-horaires (connexion réussie entre 22h et 6h UTC). Une couche d''orchestration gère le fenêtrage, la persistance et la déduplication des anomalies pour qu''une attaque soutenue ne spamme pas d''alertes en double. Un bouton « Simulate attack traffic » rejoue un scénario déterministe qui déclenche les quatre règles exactement une fois. Vérifié en direct, y compris le fait que rejouer le scénario ne produit aucune anomalie en double.',
  ARRAY['Python','FastAPI','SQLAlchemy','React','TypeScript','Vite','SQLite','Docker','Pytest'],
  'https://github.com/Aiyeesha/log-anomaly-detector', NULL,
  'itops', ARRAY['Security','Detection Engineering'], ARRAY['Détection d''anomalies','Force brute','FastAPI','React'],
  '{"tone":"personal","label":"PERSONAL PROJECT"}'::jsonb,
  ARRAY[
    'Quatre règles de détection indépendantes : force brute, voyage impossible, credential stuffing, accès hors-horaires',
    'Déduplication des anomalies — une règle ne se redéclenche pas pour le même sujet dans sa propre fenêtre temporelle',
    'Scénario de démo déterministe déclenchant les quatre règles de façon reproductible — vérifié en direct, dédup incluse au rejeu',
    '20 tests automatisés, les 4 règles testées unitairement via de simples dictionnaires d''événements — sans base de données ni dépendance à l''horloge',
    'Génère des alertes en raisonnant sur des séquences d''événements, plutôt que de simplement afficher des alertes déjà existantes'
  ],
  false, 263, 'published'
) ON CONFLICT (slug, locale) DO NOTHING;

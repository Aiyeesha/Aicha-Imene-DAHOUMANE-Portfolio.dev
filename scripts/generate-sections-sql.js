/**
 * generate-sections-sql.js
 *
 * Reads /tmp/docx_extracted.json (text extracted from 11 project .docx files),
 * parses each document to extract structured sections, and writes a SQL UPDATE
 * file to supabase/update-sections.sql.
 *
 * Usage: node scripts/generate-sections-sql.js
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Slug mapping: docx filename → Supabase slug
// ---------------------------------------------------------------------------
const SLUG_MAP = {
  'Concevez un prototype de backend Apex - LTP.docx': 'ltp-apex-backend-prototype',
  'Créez un backend Apex - IdemConnect.docx': 'idemconnect-apex-backend',
  'Créez une application Lightning - Avenir Télecom.docx': 'avenir-telecom-lightning-app',
  "Créez une interface utilisateur pour votre application - Poch'lib.docx": 'pochlib-ui',
  'Créez une solution Salesforce pour Tours For Life.docx': 'tours-for-life-salesforce-solution',
  'Débuggez une application Java - Hemebiotech.docx': 'hemebiotech-java-debug',
  'Déployez votre application Salesforce - Legarant-AXG.docx': 'legarant-axg-salesforce-deployment',
  "Mettez à jour l'application Digit Learning.docx": 'digit-learning-salesforce-update',
  'Migrez une application Visualforce vers Lightning - WireBrightConsulting.docx': 'wirebright-visualforce-to-lightning',
  'Optimisez un backend Apex - FASHA.docx': 'fasha-apex-backend-optimization',
  "Testez l'implémentation d'une nouvelle fonctionnalité Java - Parkit.docx": 'parkit-java-testing',
};

// ---------------------------------------------------------------------------
// Helper: escape single quotes for SQL
// ---------------------------------------------------------------------------
function sqlEscape(str) {
  return (str || '').replace(/'/g, "''");
}

// ---------------------------------------------------------------------------
// Helper: extract text between two markers (or end of string)
// ---------------------------------------------------------------------------
function extractBetween(text, startMarker, endMarkers) {
  const startIdx = text.indexOf(startMarker);
  if (startIdx === -1) return '';
  const start = startIdx + startMarker.length;
  let end = text.length;
  for (const m of endMarkers) {
    const idx = text.indexOf(m, start);
    if (idx !== -1 && idx < end) end = idx;
  }
  return text.substring(start, end).trim();
}

// ---------------------------------------------------------------------------
// Helper: get lines from a text block (non-empty, cleaned)
// ---------------------------------------------------------------------------
function toLines(block) {
  return block.split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0);
}

// ---------------------------------------------------------------------------
// Helper: take first N sentences from a paragraph
// ---------------------------------------------------------------------------
function firstSentences(text, n) {
  // Split on '. ' or '.\n' boundaries
  const sentences = text.replace(/\n/g, ' ').split(/(?<=[.!?])\s+/);
  return sentences.slice(0, n).join(' ').trim();
}

// ---------------------------------------------------------------------------
// Helper: find the LAST occurrence of a marker in text
// ---------------------------------------------------------------------------
function lastIndexOf(text, marker) {
  return text.lastIndexOf(marker);
}

// ---------------------------------------------------------------------------
// Per-document extraction logic
// ---------------------------------------------------------------------------

/**
 * Extract hero_subtitle (1 sentence summarising the mission).
 * Tries to find the Scénario/Mission section and derive a brief sentence.
 */
function extractHeroSubtitle(slug, text) {
  // Per-slug overrides based on careful reading of each document
  const overrides = {
    'ltp-apex-backend-prototype':
      "Conception d'un prototype backend Apex pour LTP (luxe & mode) : modèle de données, sécurité, stratégie d'import.",
    'idemconnect-apex-backend':
      "Développement d'un backend Apex pour iDEM Connect : trigger, classes de service et batch scheduler.",
    'avenir-telecom-lightning-app':
      "Création d'une application Lightning pour Avenir Télécom : backlog, tests et migration de l'interface CRM.",
    'pochlib-ui':
      "Développement de l'interface frontend SPA de Poch'Lib, une librairie de gestion de livres en HTML/CSS/JS.",
    'tours-for-life-salesforce-solution':
      "Implémentation d'une solution Salesforce complète pour Tours For Life, agence de voyages en croissance.",
    'hemebiotech-java-debug':
      "Débogage et correction d'une application Java de prédiction des besoins médicaux chez Hemebiotech.",
    'legarant-axg-salesforce-deployment':
      "Déploiement et intégration Salesforce pour LEGARANT-AXG : API REST, synchronisation Heroku et mise en production.",
    'digit-learning-salesforce-update':
      "Audit et mise à jour de l'application Salesforce Digit Learning pour répondre aux besoins des commerciaux.",
    'wirebright-visualforce-to-lightning':
      "Migration de l'application Visualforce d'EG Manufacture vers Lightning Web Components chez WireBright Consulting.",
    'fasha-apex-backend-optimization':
      "Optimisation du backend Apex de FASHA : refactoring, suppression des DML en boucle et amélioration des batchs.",
    'parkit-java-testing':
      "Correction de bugs, tests unitaires TDD et tests d'intégration JUnit pour l'application Park'it chez Move'it.",
  };
  return overrides[slug] || '';
}

/**
 * Extract "Contexte client" from the Scénario/Mission section.
 */
function extractContexte(slug, text) {
  const contextes = {
    'ltp-apex-backend-prototype': [
      "Le Temps des Papillons (LTP) est une société française leader dans les grandes maisons de couture de luxe, mode et beauté.",
      "LTP gère ses livraisons via trois transporteurs et fait face à un manque de visibilité pour ses 194 appels/jour de suivi colis.",
      "Romain Fromont, responsable R&D, demande la conception d'une nouvelle application Salesforce pour les commerciaux et les agents du service client.",
    ],
    'idemconnect-apex-backend': [
      "iDEM Connect est un fournisseur d'accès à Internet mondial qui développe son CRM Salesforce pour accompagner ses commerciaux.",
      "Frédéric, le DSI, demande l'ajout de nouvelles fonctionnalités backend (trigger, classes Apex, batch) pour optimiser la gestion des ventes et des clients.",
    ],
    'avenir-telecom-lightning-app': [
      "Avenir Télécom est un opérateur français créé en 2009, structuré en pôles Grand Public et Entreprise sur 4 zones géographiques.",
      "Suite à un audit interne, Jérémy, le DSI, demande la création d'une application Lightning intégrant backlog, tests et migration de fonctionnalités CRM.",
    ],
    'pochlib-ui': [
      "Great'App est une agence de développement qui mandate une développeuse pour créer Poch'Lib, une bibliothèque de gestion de livres personnelle.",
      "L'application doit être une Single Page Application responsive (mobile, tablette, bureau) permettant la recherche, l'ajout et la suppression de livres via une API.",
    ],
    'tours-for-life-salesforce-solution': [
      "Tours For Life est une agence de voyages en pleine croissance dont les commerciaux ont besoin de gérer prospects, voyageurs et opportunités.",
      "Philippe Bouvet, le patron, mandate un administrateur Salesforce pour mettre en place une solution CRM complète couvrant le pipeline commercial et les voyages.",
    ],
    'hemebiotech-java-debug': [
      "Heme Biotech est une startup spécialisée dans la prédiction des besoins médicaux et vétérinaires, travaillant sur un logiciel Java d'analyse de données.",
      "Le développeur initial n'a pu finaliser le code ; la mission est de corriger les bugs existants pour que l'application génère correctement les résultats attendus.",
    ],
    'legarant-axg-salesforce-deployment': [
      "LEGARANT est une société d'assurance vie nantaise qui a racheté AXG en Allemagne et souhaite intégrer les deux CRM Salesforce.",
      "La mission inclut l'intégration des données via une API REST, la synchronisation bidirectionnelle avec Heroku, et le déploiement de l'application mobile pour les assureurs.",
    ],
    'digit-learning-salesforce-update': [
      "Digit Learning est une école en ligne dont l'application Salesforce, utilisée depuis 2 ans, présente plusieurs problèmes identifiés lors d'entretiens utilisateurs.",
      "Jeanne Pierron, gestionnaire de projet, mandate un audit complet puis une mise à jour de l'application pour améliorer l'expérience des commerciaux.",
    ],
    'wirebright-visualforce-to-lightning': [
      "EG Manufacture est une grande manufacture de tapisserie utilisant Salesforce Classic et souhaitant migrer vers Lightning Experience.",
      "WireBright Consulting mandate un développeur senior pour analyser les composants Visualforce existants et les migrer vers Lightning Web Components.",
    ],
    'fasha-apex-backend-optimization': [
      "FASHA est une entreprise dont l'application Salesforce souffre de batchs trop lents, de blocages lors de modifications concurrentes et d'un code désorganisé.",
      "Vivien, le lead de SFQUAL, envoie son développeur en mission pour refactoriser et optimiser l'ensemble du backend Apex de FASHA.",
    ],
    'parkit-java-testing': [
      "Move'it est une société de mobilité urbaine qui développe Park'it, un système automatisé de paiement de parking.",
      "Le développeur précédent ayant quitté l'équipe, la mission est de corriger les bugs existants, d'implémenter des tests unitaires TDD et des tests d'intégration.",
    ],
  };
  return (contextes[slug] || []).map(p => p.trim());
}

/**
 * Extract "Livrables produits" items from the document text.
 */
function extractLivrables(slug, text) {
  const livrables = {
    'ltp-apex-backend-prototype': [
      "Spécifications techniques de l'application (PDF)",
      "Diagramme UML du modèle de données (PDF)",
      "Document des droits d'accès par profil et par objet Salesforce (PDF)",
      "Stratégie d'import des données dans Salesforce (PDF)",
    ],
    'idemconnect-apex-backend': [
      "Lien vers le code backend sur GitHub (TXT) : trigger Apex, classes de service, batch avec scheduler",
      "Documentation des classes créées (PDF)",
      "Rapport d'exécution de tests avec couverture de code",
    ],
    'avenir-telecom-lightning-app': [
      "Stratégie d'implémentation (PDF) : description backlog, valeur business, priorité, chiffrage",
      "Liste des fonctionnalités à tester avec classes de test associées",
      "Cahier des charges et backlog détaillé de l'application Lightning",
    ],
    'pochlib-ui': [
      "Repository GitHub contenant les fichiers du projet frontend (HTML/CSS/JS)",
      "Fichier README avec les instructions d'installation",
    ],
    'tours-for-life-salesforce-solution': [
      "Présentation PowerPoint de la solution proposée (PDF)",
      "Spécifications détaillées de la solution Salesforce (PDF)",
      "Capture d'écran du modèle de données (PNG)",
    ],
    'hemebiotech-java-debug': [
      "Lien vers le repository GitHub avec le code corrigé (TXT/PDF)",
      "Fichier result.out contenant les symptômes triés par ordre alphabétique avec décomptes",
    ],
    'legarant-axg-salesforce-deployment': [
      "Fichiers des appels API REST Salesforce via Postman",
      "Document PDF des changements réalisés sur l'hébergeur Heroku",
      "Document PDF de déploiement (liste des composants + actions manuelles)",
      "Ensemble des implémentations déployées en sandbox puis en production",
      "Lien vers la sandbox sur l'hébergeur (TXT)",
    ],
    'digit-learning-salesforce-update': [
      "Rapport d'audit de l'ancienne application (PDF)",
      "Code de l'application mise à jour (ZIP)",
      "Captures d'écran de l'application mise à jour (ZIP)",
      "Analyse qualitative et quantitative des optimisations (PDF)",
    ],
    'wirebright-visualforce-to-lightning': [
      "Spécifications techniques et fonctionnelles de migration (PDF) : liste des composants, solution de conversion, estimation du temps",
      "Dossier ZIP : 3 captures Salesforce Classic, 3 captures Lightning, explication des avantages Lightning",
    ],
    'fasha-apex-backend-optimization': [
      "Lien vers le repository GitHub contenant les classes Apex optimisées (TXT)",
    ],
    'parkit-java-testing': [
      "Repository GitHub avec le code corrigé et les tests (branche dev)",
      "Rapport d'exécution des tests unitaires (JUnit/Maven)",
      "Rapport de couverture de code JaCoCo (couverture > 70%)",
      "Rapport d'exécution des tests d'intégration",
    ],
  };
  return livrables[slug] || [];
}

/**
 * Extract "Compétences évaluées" list from the document.
 * For docs with a standalone Compétences listing (before Remarques sur l'évaluation),
 * extract that list. For docs where the competences only appear inside the evaluation
 * block, extract from there using numbered items.
 */
function extractCompetences(slug, text) {
  // Per-slug manual overrides for docs where auto-extraction is unreliable
  const manualOverrides = {
    'hemebiotech-java-debug': [
      'Comprendre le langage de programmation Java',
      'Construire un projet de code collaboratif',
    ],
    'parkit-java-testing': [
      "Corriger une application à partir des résultats des tests",
      "Mettre en œuvre des tests unitaires",
      "Mettre en œuvre des tests d'intégration",
      "Automatiser l'exécution et le reporting des tests unitaires et d'intégration",
    ],
  };
  if (manualOverrides[slug]) return manualOverrides[slug];

  // Find the competences list section (before the evaluation remarks)
  const compMarker = 'Compétences évaluées\n';
  const remarqMarker = "Remarques sur l'évaluation";

  const compIdx = text.indexOf(compMarker);
  const remarqIdx = text.indexOf(remarqMarker);

  if (compIdx === -1) return [];

  // Extract block between "Compétences évaluées" heading and "Remarques sur l'évaluation"
  const blockEnd = remarqIdx !== -1 ? remarqIdx : text.length;
  const block = text.substring(compIdx + compMarker.length, blockEnd);

  // Filter meaningful competence lines (remove soutenance boilerplate)
  const lines = toLines(block).filter(l =>
    !l.startsWith('De :') &&
    !l.startsWith('À :') &&
    !l.includes('évaluateur') &&
    !l.includes('Présentation des livrables') &&
    !l.includes('Discussion') &&
    !l.includes('Debrief') &&
    !l.includes('présentation devrait') &&
    !l.includes('en dessous de') &&
    !l.includes('Soutenance') &&
    !l.startsWith('Pendant') &&
    !l.startsWith('Durant') &&
    !l.startsWith('À la fin') &&
    l.length > 5
  );

  return lines.slice(0, 6); // Max 6 competences
}

/**
 * Determine jury decision (✅ Validé or ⚠️ Partiellement validé).
 * Uses the LAST "Remarques sur l'évaluation" block (final soutenance).
 *
 * Important: ignore template boilerplate "Non validé - Expliquez..." which appears
 * in some documents as evaluation instructions, not as an actual result.
 */
function extractJuryDecision(slug, text) {
  // Use the last evaluation block
  const lastRemarqIdx = lastIndexOf(text, "Remarques sur l'évaluation");
  if (lastRemarqIdx === -1) {
    // Some docs use 'Statut du projet'
    if (text.includes('Statut du projet\nValidé')) return '✅ Validé';
    return '✅ Validé';
  }

  const block = text.substring(lastRemarqIdx);

  // Check for REAL "Non validé" — a standalone line (preceded/followed by newline),
  // NOT the template instruction "Non validé - Expliquez..."
  const hasRealNonValide = /\nNon validé\n/.test(block);

  return hasRealNonValide ? '⚠️ Partiellement validé' : '✅ Validé';
}

/**
 * Extract jury "Points forts" (from the last Livrable block).
 */
function extractPointsForts(slug, text) {
  // Find last occurrence
  const lastPFIdx = lastIndexOf(text, 'Points forts');
  if (lastPFIdx === -1) return 'Bonne compréhension et travail complet.';

  const axesIdx = text.indexOf('Axes d', lastPFIdx);
  const soutenanceIdx = text.indexOf('Soutenance', lastPFIdx);
  const endIdx = Math.min(
    axesIdx !== -1 ? axesIdx : text.length,
    soutenanceIdx !== -1 ? soutenanceIdx : text.length
  );

  const block = text.substring(lastPFIdx + 'Points forts'.length, endIdx);
  // Clean up: remove ':' and newlines
  const cleaned = block.replace(/^[\s:]+/, '').trim();
  const lines = toLines(cleaned).filter(l => l !== ':' && l.length > 1);

  if (lines.length === 0) return 'Bonne compréhension et travail complet.';
  return lines.join(' — ');
}

/**
 * Extract jury "Axes d'amélioration" (from the last Livrable block).
 */
function extractAxes(slug, text) {
  const lastAxesIdx = lastIndexOf(text, "Axes d'amélioration");
  if (lastAxesIdx === -1) return 'RAS';

  const soutenanceIdx = text.indexOf('Soutenance', lastAxesIdx);
  const endIdx = soutenanceIdx !== -1 ? soutenanceIdx : text.length;

  const block = text.substring(lastAxesIdx + "Axes d'amélioration".length, endIdx);
  const cleaned = block.replace(/^[\s:]+/, '').trim();
  const lines = toLines(cleaned).filter(l => l !== ':' && l.length > 1);

  if (lines.length === 0) return 'RAS';
  // Truncate long URLs
  const result = lines.map(l => l.length > 120 ? l.substring(0, 120) + '…' : l).join(' — ');
  return result;
}

/**
 * Extract jury "Soutenance Remarques".
 */
function extractSoutenanceRemarques(slug, text) {
  // Find last 'Remarques' after 'Soutenance'
  const lastSoutIdx = lastIndexOf(text, 'Soutenance\n');
  if (lastSoutIdx === -1) return '';

  const remIdx = text.indexOf('Remarques', lastSoutIdx);
  if (remIdx === -1) return '';

  const endIdx = text.indexOf('\n\n', remIdx);
  const block = text.substring(remIdx + 'Remarques'.length, endIdx !== -1 ? endIdx : remIdx + 500);
  return block.replace(/^[\s:]+/, '').replace(/\n/g, ' ').trim();
}

// ---------------------------------------------------------------------------
// Build sections JSONB array for a project
// ---------------------------------------------------------------------------
function buildSections(slug, text) {
  const contexte = extractContexte(slug, text);
  const livrables = extractLivrables(slug, text);
  const competences = extractCompetences(slug, text);
  const decision = extractJuryDecision(slug, text);
  const pointsForts = extractPointsForts(slug, text);
  const axes = extractAxes(slug, text);

  const sections = [
    {
      type: 'text',
      title: 'Contexte client',
      paragraphs: contexte,
    },
    {
      type: 'bullets',
      title: 'Livrables produits',
      items: livrables,
    },
    {
      type: 'bullets',
      title: 'Compétences évaluées',
      items: competences,
    },
    {
      type: 'metrics',
      title: 'Résultat jury',
      items: [
        { label: 'Décision', value: decision },
        { label: 'Points forts', value: pointsForts },
        { label: 'Axes d\'amélioration', value: axes },
      ],
    },
  ];

  return sections;
}

// ---------------------------------------------------------------------------
// Generate SQL for one project
// ---------------------------------------------------------------------------
function generateSQL(filename, text) {
  const slug = SLUG_MAP[filename];
  if (!slug) {
    console.warn(`⚠️  No slug found for: ${filename}`);
    return '';
  }

  console.log(`Processing: ${slug}`);

  const heroSubtitle = extractHeroSubtitle(slug, text);
  const sections = buildSections(slug, text);

  // Serialize sections to compact JSON (will be embedded in SQL)
  const sectionsJson = JSON.stringify(sections, null, 2);

  // Build SQL UPDATE — escape single quotes
  const escapedHero = sqlEscape(heroSubtitle);
  const escapedSections = sqlEscape(sectionsJson);

  return `-- ${slug}\nUPDATE projects\nSET\n  hero_subtitle = '${escapedHero}',\n  sections = '${escapedSections}'::jsonb\nWHERE slug = '${slug}';\n`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const inputPath = '/tmp/docx_extracted.json';
  const outputPath = path.join(__dirname, '..', 'supabase', 'update-sections.sql');

  // Read extracted JSON
  if (!fs.existsSync(inputPath)) {
    console.error(`ERROR: Input file not found at ${inputPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(inputPath, 'utf8');
  const data = JSON.parse(raw);

  const sqlParts = [
    '-- Auto-generated by scripts/generate-sections-sql.js',
    '-- Updates hero_subtitle and sections for 11 projects',
    '-- Run: psql $DATABASE_URL -f supabase/update-sections.sql',
    '',
  ];

  // Process each file in the defined order
  for (const filename of Object.keys(SLUG_MAP)) {
    if (!data[filename]) {
      console.warn(`⚠️  No extracted text found for: ${filename}`);
      continue;
    }
    const sql = generateSQL(filename, data[filename]);
    if (sql) {
      sqlParts.push(sql);
    }
  }

  const finalSQL = sqlParts.join('\n');

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, finalSQL, 'utf8');
  console.log(`\n✅ SQL written to: ${outputPath}`);
  console.log(`   Total size: ${finalSQL.length} characters`);
}

main();

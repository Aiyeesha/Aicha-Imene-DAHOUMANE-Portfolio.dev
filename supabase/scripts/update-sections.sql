-- Auto-generated — Updates hero_subtitle and sections for 11 projects (FR + EN)
-- Run: psql $DATABASE_URL -f supabase/update-sections.sql

-- ltp-apex-backend-prototype (FR)
UPDATE projects
SET
  hero_subtitle = 'Conception d''un prototype backend Apex pour LTP (luxe & mode) : modèle de données, sécurité, stratégie d''import.',
  sections = '[
  {
    "type": "text",
    "title": "Contexte client",
    "paragraphs": [
      "Le Temps des Papillons (LTP) est une société française leader dans les grandes maisons de couture de luxe, mode et beauté.",
      "LTP gère ses livraisons via trois transporteurs et fait face à un manque de visibilité pour ses 194 appels/jour de suivi colis.",
      "Romain Fromont, responsable R&D, demande la conception d''une nouvelle application Salesforce pour les commerciaux et les agents du service client."
    ]
  },
  {
    "type": "bullets",
    "title": "Livrables produits",
    "items": [
      "Spécifications techniques de l''application (PDF)",
      "Diagramme UML du modèle de données (PDF)",
      "Document des droits d''accès par profil et par objet Salesforce (PDF)",
      "Stratégie d''import des données dans Salesforce (PDF)"
    ]
  },
  {
    "type": "bullets",
    "title": "Compétences évaluées",
    "items": [
      "Concevoir le modèle de données d''une application Apex",
      "Définir le modèle de sécurité d''une application Apex",
      "Implémenter le modèle de données d''une application Apex",
      "Concevoir l''architecture technique d''une application Apex"
    ]
  },
  {
    "type": "metrics",
    "title": "Résultat jury",
    "items": [
      {
        "label": "Décision",
        "value": "⚠️ Partiellement validé"
      },
      {
        "label": "Points forts",
        "value": "Diagrammes et documentation exhaustifs, respect des spécifications."
      },
      {
        "label": "Axes d''amélioration",
        "value": "Aucun point critique à signaler."
      }
    ]
  }
]'::jsonb
WHERE slug = 'ltp-apex-backend-prototype' AND locale = 'fr';

-- ltp-apex-backend-prototype (EN)
UPDATE projects
SET
  hero_subtitle = 'Design of an Apex backend prototype for LTP (luxury & fashion): data model, security, import strategy.',
  sections = '[
  {
    "type": "text",
    "title": "Client context",
    "paragraphs": [
      "Le Temps des Papillons (LTP) is a leading French company in luxury fashion and beauty couture houses.",
      "LTP manages its deliveries through three carriers and faces a lack of visibility for its 194 daily parcel tracking calls.",
      "Romain Fromont, R&D manager, requests the design of a new Salesforce application for sales representatives and customer service agents."
    ]
  },
  {
    "type": "bullets",
    "title": "Deliverables",
    "items": [
      "Application technical specifications (PDF)",
      "UML diagram of the data model (PDF)",
      "Access rights document by profile and Salesforce object (PDF)",
      "Data import strategy into Salesforce (PDF)"
    ]
  },
  {
    "type": "bullets",
    "title": "Skills assessed",
    "items": [
      "Design the data model of an Apex application",
      "Define the security model of an Apex application",
      "Implement the data model of an Apex application",
      "Design the technical architecture of an Apex application"
    ]
  },
  {
    "type": "metrics",
    "title": "Jury result",
    "items": [
      {
        "label": "Decision",
        "value": "⚠️ Partially validated"
      },
      {
        "label": "Strengths",
        "value": "Comprehensive diagrams and documentation, adherence to specifications."
      },
      {
        "label": "Areas for improvement",
        "value": "No critical issues to report."
      }
    ]
  }
]'::jsonb
WHERE slug = 'ltp-apex-backend-prototype' AND locale = 'en';

-- idemconnect-apex-backend (FR)
UPDATE projects
SET
  hero_subtitle = 'Développement d''un backend Apex pour iDEM Connect : trigger, classes de service et batch scheduler.',
  sections = '[
  {
    "type": "text",
    "title": "Contexte client",
    "paragraphs": [
      "iDEM Connect est un fournisseur d''accès à Internet mondial qui développe son CRM Salesforce pour accompagner ses commerciaux.",
      "Frédéric, le DSI, demande l''ajout de nouvelles fonctionnalités backend (trigger, classes Apex, batch) pour optimiser la gestion des ventes et des clients."
    ]
  },
  {
    "type": "bullets",
    "title": "Livrables produits",
    "items": [
      "Lien vers le code backend sur GitHub (TXT) : trigger Apex, classes de service, batch avec scheduler",
      "Documentation des classes créées (PDF)",
      "Rapport d''exécution de tests avec couverture de code"
    ]
  },
  {
    "type": "bullets",
    "title": "Compétences évaluées",
    "items": [
      "Développer un backend Apex",
      "Respecter les standards de développement Salesforce",
      "Sélectionner une solution technique adaptée"
    ]
  },
  {
    "type": "metrics",
    "title": "Résultat jury",
    "items": [
      {
        "label": "Décision",
        "value": "✅ Validé"
      },
      {
        "label": "Points forts",
        "value": "Bonne compréhension de la mission — Proposition de solutions complètes et pertinentes"
      },
      {
        "label": "Axes d''amélioration",
        "value": "RAS"
      }
    ]
  }
]'::jsonb
WHERE slug = 'idemconnect-apex-backend' AND locale = 'fr';

-- idemconnect-apex-backend (EN)
UPDATE projects
SET
  hero_subtitle = 'Development of an Apex backend for iDEM Connect: trigger, service classes and batch scheduler.',
  sections = '[
  {
    "type": "text",
    "title": "Client context",
    "paragraphs": [
      "iDEM Connect is a global internet service provider developing its Salesforce CRM to support its sales representatives.",
      "Frédéric, the CTO, requests the addition of new backend features (trigger, Apex classes, batch) to optimize sales and customer management."
    ]
  },
  {
    "type": "bullets",
    "title": "Deliverables",
    "items": [
      "Link to the backend code on GitHub (TXT): Apex trigger, service classes, batch with scheduler",
      "Documentation of the created classes (PDF)",
      "Test execution report with code coverage"
    ]
  },
  {
    "type": "bullets",
    "title": "Skills assessed",
    "items": [
      "Develop an Apex backend",
      "Follow Salesforce development standards",
      "Select an appropriate technical solution"
    ]
  },
  {
    "type": "metrics",
    "title": "Jury result",
    "items": [
      {
        "label": "Decision",
        "value": "✅ Validated"
      },
      {
        "label": "Strengths",
        "value": "Good understanding of the assignment — Proposal of complete and relevant solutions"
      },
      {
        "label": "Areas for improvement",
        "value": "N/A"
      }
    ]
  }
]'::jsonb
WHERE slug = 'idemconnect-apex-backend' AND locale = 'en';

-- avenir-telecom-lightning-app (FR)
UPDATE projects
SET
  hero_subtitle = 'Création d''une application Lightning pour Avenir Télécom : backlog, tests et migration de l''interface CRM.',
  sections = '[
  {
    "type": "text",
    "title": "Contexte client",
    "paragraphs": [
      "Avenir Télécom est un opérateur français créé en 2009, structuré en pôles Grand Public et Entreprise sur 4 zones géographiques.",
      "Suite à un audit interne, Jérémy, le DSI, demande la création d''une application Lightning intégrant backlog, tests et migration de fonctionnalités CRM."
    ]
  },
  {
    "type": "bullets",
    "title": "Livrables produits",
    "items": [
      "Stratégie d''implémentation (PDF) : description backlog, valeur business, priorité, chiffrage",
      "Liste des fonctionnalités à tester avec classes de test associées",
      "Cahier des charges et backlog détaillé de l''application Lightning"
    ]
  },
  {
    "type": "bullets",
    "title": "Compétences évaluées",
    "items": [
      "Compléter une suite de tests unitaires et d''intégration afin de prendre en compte les modifications apportées",
      "Définir un backlog",
      "Implémenter des améliorations en continu",
      "Mettre en place un backlog"
    ]
  },
  {
    "type": "metrics",
    "title": "Résultat jury",
    "items": [
      {
        "label": "Décision",
        "value": "✅ Validé"
      },
      {
        "label": "Points forts",
        "value": "Structure organisée, documentation concise."
      },
      {
        "label": "Axes d''amélioration",
        "value": "RAS"
      }
    ]
  }
]'::jsonb
WHERE slug = 'avenir-telecom-lightning-app' AND locale = 'fr';

-- avenir-telecom-lightning-app (EN)
UPDATE projects
SET
  hero_subtitle = 'Creation of a Lightning application for Avenir Télécom: backlog, testing and CRM interface migration.',
  sections = '[
  {
    "type": "text",
    "title": "Client context",
    "paragraphs": [
      "Avenir Télécom is a French telecom operator founded in 2009, structured into Consumer and Business divisions across 4 geographic zones.",
      "Following an internal audit, Jérémy, the CTO, requests the creation of a Lightning application integrating a backlog, tests and migration of CRM features."
    ]
  },
  {
    "type": "bullets",
    "title": "Deliverables",
    "items": [
      "Implementation strategy (PDF): backlog description, business value, priority, estimation",
      "List of features to test with associated test classes",
      "Requirements specification and detailed backlog of the Lightning application"
    ]
  },
  {
    "type": "bullets",
    "title": "Skills assessed",
    "items": [
      "Complete a suite of unit and integration tests to account for the changes made",
      "Define a backlog",
      "Implement continuous improvements",
      "Set up a backlog"
    ]
  },
  {
    "type": "metrics",
    "title": "Jury result",
    "items": [
      {
        "label": "Decision",
        "value": "✅ Validated"
      },
      {
        "label": "Strengths",
        "value": "Organized structure, concise documentation."
      },
      {
        "label": "Areas for improvement",
        "value": "N/A"
      }
    ]
  }
]'::jsonb
WHERE slug = 'avenir-telecom-lightning-app' AND locale = 'en';

-- pochlib-ui (FR)
UPDATE projects
SET
  hero_subtitle = 'Développement de l''interface frontend SPA de Poch''Lib, une librairie de gestion de livres en HTML/CSS/JS.',
  sections = '[
  {
    "type": "text",
    "title": "Contexte client",
    "paragraphs": [
      "Great''App est une agence de développement qui mandate une développeuse pour créer Poch''Lib, une bibliothèque de gestion de livres personnelle.",
      "L''application doit être une Single Page Application responsive (mobile, tablette, bureau) permettant la recherche, l''ajout et la suppression de livres via une API."
    ]
  },
  {
    "type": "bullets",
    "title": "Livrables produits",
    "items": [
      "Repository GitHub contenant les fichiers du projet frontend (HTML/CSS/JS)",
      "Fichier README avec les instructions d''installation"
    ]
  },
  {
    "type": "bullets",
    "title": "Compétences évaluées",
    "items": [
      "Respecter les bonnes pratiques de développement HTML et CSS",
      "Assurer la cohérence graphique d''un site web",
      "Créer l''interface frontend d''une application",
      "Mettre à jour le DOM en utilisant JavaScript"
    ]
  },
  {
    "type": "metrics",
    "title": "Résultat jury",
    "items": [
      {
        "label": "Décision",
        "value": "✅ Validé"
      },
      {
        "label": "Points forts",
        "value": "- Respect des bonnes pratiques de développement HTML, CSS et JavaScript — - Cohérence graphique en adéquation avec les wireframes — - Interface frontend responsive et dynamique"
      },
      {
        "label": "Axes d''amélioration",
        "value": "RAS"
      }
    ]
  }
]'::jsonb
WHERE slug = 'pochlib-ui' AND locale = 'fr';

-- pochlib-ui (EN)
UPDATE projects
SET
  hero_subtitle = 'Development of the Poch''Lib SPA frontend interface, a book management library in HTML/CSS/JS.',
  sections = '[
  {
    "type": "text",
    "title": "Client context",
    "paragraphs": [
      "Great''App is a development agency that commissions a developer to create Poch''Lib, a personal book management library.",
      "The application must be a responsive Single Page Application (mobile, tablet, desktop) allowing book search, addition and deletion via an API."
    ]
  },
  {
    "type": "bullets",
    "title": "Deliverables",
    "items": [
      "GitHub repository containing the frontend project files (HTML/CSS/JS)",
      "README file with installation instructions"
    ]
  },
  {
    "type": "bullets",
    "title": "Skills assessed",
    "items": [
      "Follow HTML and CSS development best practices",
      "Ensure visual consistency of a website",
      "Create the frontend interface of an application",
      "Update the DOM using JavaScript"
    ]
  },
  {
    "type": "metrics",
    "title": "Jury result",
    "items": [
      {
        "label": "Decision",
        "value": "✅ Validated"
      },
      {
        "label": "Strengths",
        "value": "- Adherence to HTML, CSS and JavaScript development best practices — - Visual consistency in line with wireframes — - Responsive and dynamic frontend interface"
      },
      {
        "label": "Areas for improvement",
        "value": "N/A"
      }
    ]
  }
]'::jsonb
WHERE slug = 'pochlib-ui' AND locale = 'en';

-- tours-for-life-salesforce-solution (FR)
UPDATE projects
SET
  hero_subtitle = 'Implémentation d''une solution Salesforce complète pour Tours For Life, agence de voyages en croissance.',
  sections = '[
  {
    "type": "text",
    "title": "Contexte client",
    "paragraphs": [
      "Tours For Life est une agence de voyages en pleine croissance dont les commerciaux ont besoin de gérer prospects, voyageurs et opportunités.",
      "Philippe Bouvet, le patron, mandate un administrateur Salesforce pour mettre en place une solution CRM complète couvrant le pipeline commercial et les voyages."
    ]
  },
  {
    "type": "bullets",
    "title": "Livrables produits",
    "items": [
      "Présentation PowerPoint de la solution proposée (PDF)",
      "Spécifications détaillées de la solution Salesforce (PDF)",
      "Capture d''écran du modèle de données (PNG)"
    ]
  },
  {
    "type": "bullets",
    "title": "Compétences évaluées",
    "items": [
      "Analyser les besoins d''un client ou d''utilisateurs finaux",
      "Choisir la solution appropriée à un problème technique",
      "Définir un modèle de données et ses règles métier",
      "Concevoir une solution et ses spécifications en fonction des besoins d''un client"
    ]
  },
  {
    "type": "metrics",
    "title": "Résultat jury",
    "items": [
      {
        "label": "Décision",
        "value": "✅ Validé"
      },
      {
        "label": "Points forts",
        "value": "Travail complet"
      },
      {
        "label": "Axes d''amélioration",
        "value": "RàS"
      }
    ]
  }
]'::jsonb
WHERE slug = 'tours-for-life-salesforce-solution' AND locale = 'fr';

-- tours-for-life-salesforce-solution (EN)
UPDATE projects
SET
  hero_subtitle = 'Implementation of a complete Salesforce solution for Tours For Life, a growing travel agency.',
  sections = '[
  {
    "type": "text",
    "title": "Client context",
    "paragraphs": [
      "Tours For Life is a fast-growing travel agency whose sales team needs to manage prospects, travelers and opportunities.",
      "Philippe Bouvet, the owner, commissions a Salesforce administrator to set up a complete CRM solution covering the sales pipeline and travel management."
    ]
  },
  {
    "type": "bullets",
    "title": "Deliverables",
    "items": [
      "PowerPoint presentation of the proposed solution (PDF)",
      "Detailed specifications of the Salesforce solution (PDF)",
      "Screenshot of the data model (PNG)"
    ]
  },
  {
    "type": "bullets",
    "title": "Skills assessed",
    "items": [
      "Analyze the needs of a client or end users",
      "Choose the appropriate solution for a technical problem",
      "Define a data model and its business rules",
      "Design a solution and its specifications based on client requirements"
    ]
  },
  {
    "type": "metrics",
    "title": "Jury result",
    "items": [
      {
        "label": "Decision",
        "value": "✅ Validated"
      },
      {
        "label": "Strengths",
        "value": "Complete work"
      },
      {
        "label": "Areas for improvement",
        "value": "N/A"
      }
    ]
  }
]'::jsonb
WHERE slug = 'tours-for-life-salesforce-solution' AND locale = 'en';

-- hemebiotech-java-debug (FR)
UPDATE projects
SET
  hero_subtitle = 'Débogage et correction d''une application Java de prédiction des besoins médicaux chez Hemebiotech.',
  sections = '[
  {
    "type": "text",
    "title": "Contexte client",
    "paragraphs": [
      "Heme Biotech est une startup spécialisée dans la prédiction des besoins médicaux et vétérinaires, travaillant sur un logiciel Java d''analyse de données.",
      "Le développeur initial n''a pu finaliser le code ; la mission est de corriger les bugs existants pour que l''application génère correctement les résultats attendus."
    ]
  },
  {
    "type": "bullets",
    "title": "Livrables produits",
    "items": [
      "Lien vers le repository GitHub avec le code corrigé (TXT/PDF)",
      "Fichier result.out contenant les symptômes triés par ordre alphabétique avec décomptes"
    ]
  },
  {
    "type": "bullets",
    "title": "Compétences évaluées",
    "items": [
      "Comprendre le langage de programmation Java",
      "Construire un projet de code collaboratif"
    ]
  },
  {
    "type": "metrics",
    "title": "Résultat jury",
    "items": [
      {
        "label": "Décision",
        "value": "✅ Validé"
      },
      {
        "label": "Points forts",
        "value": "Bons commentaires et code fonctionnel"
      },
      {
        "label": "Axes d''amélioration",
        "value": "N/A"
      }
    ]
  }
]'::jsonb
WHERE slug = 'hemebiotech-java-debug' AND locale = 'fr';

-- hemebiotech-java-debug (EN)
UPDATE projects
SET
  hero_subtitle = 'Debugging and fixing a Java application for medical needs prediction at Hemebiotech.',
  sections = '[
  {
    "type": "text",
    "title": "Client context",
    "paragraphs": [
      "Heme Biotech is a startup specializing in medical and veterinary needs prediction, working on a Java data analysis software.",
      "The original developer was unable to finalize the code; the mission is to fix the existing bugs so that the application correctly generates the expected results."
    ]
  },
  {
    "type": "bullets",
    "title": "Deliverables",
    "items": [
      "Link to the GitHub repository with the corrected code (TXT/PDF)",
      "result.out file containing symptoms sorted alphabetically with counts"
    ]
  },
  {
    "type": "bullets",
    "title": "Skills assessed",
    "items": [
      "Understand the Java programming language",
      "Build a collaborative code project"
    ]
  },
  {
    "type": "metrics",
    "title": "Jury result",
    "items": [
      {
        "label": "Decision",
        "value": "✅ Validated"
      },
      {
        "label": "Strengths",
        "value": "Good comments and functional code"
      },
      {
        "label": "Areas for improvement",
        "value": "N/A"
      }
    ]
  }
]'::jsonb
WHERE slug = 'hemebiotech-java-debug' AND locale = 'en';

-- legarant-axg-salesforce-deployment (FR)
UPDATE projects
SET
  hero_subtitle = 'Déploiement et intégration Salesforce pour LEGARANT-AXG : API REST, synchronisation Heroku et mise en production.',
  sections = '[
  {
    "type": "text",
    "title": "Contexte client",
    "paragraphs": [
      "LEGARANT est une société d''assurance vie nantaise qui a racheté AXG en Allemagne et souhaite intégrer les deux CRM Salesforce.",
      "La mission inclut l''intégration des données via une API REST, la synchronisation bidirectionnelle avec Heroku, et le déploiement de l''application mobile pour les assureurs."
    ]
  },
  {
    "type": "bullets",
    "title": "Livrables produits",
    "items": [
      "Fichiers des appels API REST Salesforce via Postman",
      "Document PDF des changements réalisés sur l''hébergeur Heroku",
      "Document PDF de déploiement (liste des composants + actions manuelles)",
      "Ensemble des implémentations déployées en sandbox puis en production",
      "Lien vers la sandbox sur l''hébergeur (TXT)"
    ]
  },
  {
    "type": "bullets",
    "title": "Compétences évaluées",
    "items": [
      "Communiquer avec un service web",
      "Déployer une application Salesforce"
    ]
  },
  {
    "type": "metrics",
    "title": "Résultat jury",
    "items": [
      {
        "label": "Décision",
        "value": "✅ Validé"
      },
      {
        "label": "Points forts",
        "value": "Bonne compréhension de la mission. — Proposition de solutions complètes et pertinentes. — Bonne maîtrise technique"
      },
      {
        "label": "Axes d''amélioration",
        "value": "RAS"
      }
    ]
  }
]'::jsonb
WHERE slug = 'legarant-axg-salesforce-deployment' AND locale = 'fr';

-- legarant-axg-salesforce-deployment (EN)
UPDATE projects
SET
  hero_subtitle = 'Salesforce deployment and integration for LEGARANT-AXG: REST API, Heroku synchronization and go-live.',
  sections = '[
  {
    "type": "text",
    "title": "Client context",
    "paragraphs": [
      "LEGARANT is a life insurance company based in Nantes that acquired AXG in Germany and wants to integrate both Salesforce CRMs.",
      "The mission includes data integration via a REST API, bidirectional synchronization with Heroku, and deployment of the mobile application for insurance agents."
    ]
  },
  {
    "type": "bullets",
    "title": "Deliverables",
    "items": [
      "Salesforce REST API call files via Postman",
      "PDF document of changes made on the Heroku host",
      "Deployment PDF document (component list + manual actions)",
      "All implementations deployed in sandbox then in production",
      "Link to the sandbox on the host (TXT)"
    ]
  },
  {
    "type": "bullets",
    "title": "Skills assessed",
    "items": [
      "Communicate with a web service",
      "Deploy a Salesforce application"
    ]
  },
  {
    "type": "metrics",
    "title": "Jury result",
    "items": [
      {
        "label": "Decision",
        "value": "✅ Validated"
      },
      {
        "label": "Strengths",
        "value": "Good understanding of the assignment. — Proposal of complete and relevant solutions. — Strong technical proficiency"
      },
      {
        "label": "Areas for improvement",
        "value": "N/A"
      }
    ]
  }
]'::jsonb
WHERE slug = 'legarant-axg-salesforce-deployment' AND locale = 'en';

-- digit-learning-salesforce-update (FR)
UPDATE projects
SET
  hero_subtitle = 'Audit et mise à jour de l''application Salesforce Digit Learning pour répondre aux besoins des commerciaux.',
  sections = '[
  {
    "type": "text",
    "title": "Contexte client",
    "paragraphs": [
      "Digit Learning est une école en ligne dont l''application Salesforce, utilisée depuis 2 ans, présente plusieurs problèmes identifiés lors d''entretiens utilisateurs.",
      "Jeanne Pierron, gestionnaire de projet, mandate un audit complet puis une mise à jour de l''application pour améliorer l''expérience des commerciaux."
    ]
  },
  {
    "type": "bullets",
    "title": "Livrables produits",
    "items": [
      "Rapport d''audit de l''ancienne application (PDF)",
      "Code de l''application mise à jour (ZIP)",
      "Captures d''écran de l''application mise à jour (ZIP)",
      "Analyse qualitative et quantitative des optimisations (PDF)"
    ]
  },
  {
    "type": "bullets",
    "title": "Compétences évaluées",
    "items": [
      "Mettre à jour des configurations existantes",
      "Mettre à jour une GUI Lightning",
      "Réaliser l''audit de configurations existantes",
      "Utiliser le CRM pour améliorer la performance d''une entreprise",
      "Améliorer les processus d''une entreprise en utilisant un système d''automatisation"
    ]
  },
  {
    "type": "metrics",
    "title": "Résultat jury",
    "items": [
      {
        "label": "Décision",
        "value": "✅ Validé"
      },
      {
        "label": "Points forts",
        "value": "Bonne compréhension de la mission — Proposition de solutions pertinentes et complètes"
      },
      {
        "label": "Axes d''amélioration",
        "value": "RAS"
      }
    ]
  }
]'::jsonb
WHERE slug = 'digit-learning-salesforce-update' AND locale = 'fr';

-- digit-learning-salesforce-update (EN)
UPDATE projects
SET
  hero_subtitle = 'Audit and update of the Digit Learning Salesforce application to meet sales team requirements.',
  sections = '[
  {
    "type": "text",
    "title": "Client context",
    "paragraphs": [
      "Digit Learning is an online school whose Salesforce application, in use for 2 years, shows several issues identified during user interviews.",
      "Jeanne Pierron, project manager, commissions a full audit followed by an application update to improve the sales team experience."
    ]
  },
  {
    "type": "bullets",
    "title": "Deliverables",
    "items": [
      "Audit report of the previous application (PDF)",
      "Updated application code (ZIP)",
      "Screenshots of the updated application (ZIP)",
      "Qualitative and quantitative analysis of the optimizations (PDF)"
    ]
  },
  {
    "type": "bullets",
    "title": "Skills assessed",
    "items": [
      "Update existing configurations",
      "Update a Lightning GUI",
      "Conduct an audit of existing configurations",
      "Use the CRM to improve company performance",
      "Improve company processes using an automation system"
    ]
  },
  {
    "type": "metrics",
    "title": "Jury result",
    "items": [
      {
        "label": "Decision",
        "value": "✅ Validated"
      },
      {
        "label": "Strengths",
        "value": "Good understanding of the assignment — Proposal of relevant and complete solutions"
      },
      {
        "label": "Areas for improvement",
        "value": "N/A"
      }
    ]
  }
]'::jsonb
WHERE slug = 'digit-learning-salesforce-update' AND locale = 'en';

-- wirebright-visualforce-to-lightning (FR)
UPDATE projects
SET
  hero_subtitle = 'Migration de l''application Visualforce d''EG Manufacture vers Lightning Web Components chez WireBright Consulting.',
  sections = '[
  {
    "type": "text",
    "title": "Contexte client",
    "paragraphs": [
      "EG Manufacture est une grande manufacture de tapisserie utilisant Salesforce Classic et souhaitant migrer vers Lightning Experience.",
      "WireBright Consulting mandate un développeur senior pour analyser les composants Visualforce existants et les migrer vers Lightning Web Components."
    ]
  },
  {
    "type": "bullets",
    "title": "Livrables produits",
    "items": [
      "Spécifications techniques et fonctionnelles de migration (PDF) : liste des composants, solution de conversion, estimation du temps",
      "Dossier ZIP : 3 captures Salesforce Classic, 3 captures Lightning, explication des avantages Lightning"
    ]
  },
  {
    "type": "bullets",
    "title": "Compétences évaluées",
    "items": [
      "Intégrer des wireframes dans un processus design",
      "Produire une documentation technique et fonctionnelle de l''application"
    ]
  },
  {
    "type": "metrics",
    "title": "Résultat jury",
    "items": [
      {
        "label": "Décision",
        "value": "✅ Validé"
      },
      {
        "label": "Points forts",
        "value": "Bonne compréhension — Proposition de solutions complètes et pertinentes"
      },
      {
        "label": "Axes d''amélioration",
        "value": "RAS"
      }
    ]
  }
]'::jsonb
WHERE slug = 'wirebright-visualforce-to-lightning' AND locale = 'fr';

-- wirebright-visualforce-to-lightning (EN)
UPDATE projects
SET
  hero_subtitle = 'Migration of EG Manufacture''s Visualforce application to Lightning Web Components at WireBright Consulting.',
  sections = '[
  {
    "type": "text",
    "title": "Client context",
    "paragraphs": [
      "EG Manufacture is a large tapestry manufacturer using Salesforce Classic and looking to migrate to Lightning Experience.",
      "WireBright Consulting commissions a senior developer to analyze existing Visualforce components and migrate them to Lightning Web Components."
    ]
  },
  {
    "type": "bullets",
    "title": "Deliverables",
    "items": [
      "Technical and functional migration specifications (PDF): component list, conversion solution, time estimate",
      "ZIP folder: 3 Salesforce Classic screenshots, 3 Lightning screenshots, explanation of Lightning advantages"
    ]
  },
  {
    "type": "bullets",
    "title": "Skills assessed",
    "items": [
      "Integrate wireframes into a design process",
      "Produce technical and functional documentation for the application"
    ]
  },
  {
    "type": "metrics",
    "title": "Jury result",
    "items": [
      {
        "label": "Decision",
        "value": "✅ Validated"
      },
      {
        "label": "Strengths",
        "value": "Good understanding — Proposal of complete and relevant solutions"
      },
      {
        "label": "Areas for improvement",
        "value": "N/A"
      }
    ]
  }
]'::jsonb
WHERE slug = 'wirebright-visualforce-to-lightning' AND locale = 'en';

-- fasha-apex-backend-optimization (FR)
UPDATE projects
SET
  hero_subtitle = 'Optimisation du backend Apex de FASHA : refactoring, suppression des DML en boucle et amélioration des batchs.',
  sections = '[
  {
    "type": "text",
    "title": "Contexte client",
    "paragraphs": [
      "FASHA est une entreprise dont l''application Salesforce souffre de batchs trop lents, de blocages lors de modifications concurrentes et d''un code désorganisé.",
      "Vivien, le lead de SFQUAL, envoie son développeur en mission pour refactoriser et optimiser l''ensemble du backend Apex de FASHA."
    ]
  },
  {
    "type": "bullets",
    "title": "Livrables produits",
    "items": [
      "Lien vers le repository GitHub contenant les classes Apex optimisées (TXT)"
    ]
  },
  {
    "type": "bullets",
    "title": "Compétences évaluées",
    "items": [
      "Implémenter les améliorations demandées par le client",
      "Optimiser l''utilisation des ressources backend"
    ]
  },
  {
    "type": "metrics",
    "title": "Résultat jury",
    "items": [
      {
        "label": "Décision",
        "value": "✅ Validé"
      },
      {
        "label": "Points forts",
        "value": "Bonne compréhension de la mission — Mise en oeuvre de solutions claires et pertinentes"
      },
      {
        "label": "Axes d''amélioration",
        "value": "RAS"
      }
    ]
  }
]'::jsonb
WHERE slug = 'fasha-apex-backend-optimization' AND locale = 'fr';

-- fasha-apex-backend-optimization (EN)
UPDATE projects
SET
  hero_subtitle = 'Optimization of FASHA''s Apex backend: refactoring, removal of DML in loops and batch improvements.',
  sections = '[
  {
    "type": "text",
    "title": "Client context",
    "paragraphs": [
      "FASHA is a company whose Salesforce application suffers from slow batches, locking issues during concurrent updates and disorganized code.",
      "Vivien, the SFQUAL lead, sends a developer on assignment to refactor and optimize the entire FASHA Apex backend."
    ]
  },
  {
    "type": "bullets",
    "title": "Deliverables",
    "items": [
      "Link to the GitHub repository containing the optimized Apex classes (TXT)"
    ]
  },
  {
    "type": "bullets",
    "title": "Skills assessed",
    "items": [
      "Implement the improvements requested by the client",
      "Optimize backend resource usage"
    ]
  },
  {
    "type": "metrics",
    "title": "Jury result",
    "items": [
      {
        "label": "Decision",
        "value": "✅ Validated"
      },
      {
        "label": "Strengths",
        "value": "Good understanding of the assignment — Implementation of clear and relevant solutions"
      },
      {
        "label": "Areas for improvement",
        "value": "N/A"
      }
    ]
  }
]'::jsonb
WHERE slug = 'fasha-apex-backend-optimization' AND locale = 'en';

-- parkit-java-testing (FR)
UPDATE projects
SET
  hero_subtitle = 'Correction de bugs, tests unitaires TDD et tests d''intégration JUnit pour l''application Park''it chez Move''it.',
  sections = '[
  {
    "type": "text",
    "title": "Contexte client",
    "paragraphs": [
      "Move''it est une société de mobilité urbaine qui développe Park''it, un système automatisé de paiement de parking.",
      "Le développeur précédent ayant quitté l''équipe, la mission est de corriger les bugs existants, d''implémenter des tests unitaires TDD et des tests d''intégration."
    ]
  },
  {
    "type": "bullets",
    "title": "Livrables produits",
    "items": [
      "Repository GitHub avec le code corrigé et les tests (branche dev)",
      "Rapport d''exécution des tests unitaires (JUnit/Maven)",
      "Rapport de couverture de code JaCoCo (couverture > 70%)",
      "Rapport d''exécution des tests d''intégration"
    ]
  },
  {
    "type": "bullets",
    "title": "Compétences évaluées",
    "items": [
      "Corriger une application à partir des résultats des tests",
      "Mettre en œuvre des tests unitaires",
      "Mettre en œuvre des tests d''intégration",
      "Automatiser l''exécution et le reporting des tests unitaires et d''intégration"
    ]
  },
  {
    "type": "metrics",
    "title": "Résultat jury",
    "items": [
      {
        "label": "Décision",
        "value": "✅ Validé"
      },
      {
        "label": "Points forts",
        "value": "Correspondent à ce qui a été demandé"
      },
      {
        "label": "Axes d''amélioration",
        "value": "Aicha a du mal à s''exprimer durant la soutenance, je te donne un cours qui permet de vous donner quelques éléments pour …"
      }
    ]
  }
]'::jsonb
WHERE slug = 'parkit-java-testing' AND locale = 'fr';

-- parkit-java-testing (EN)
UPDATE projects
SET
  hero_subtitle = 'Bug fixes, TDD unit tests and JUnit integration tests for the Park''it application at Move''it.',
  sections = '[
  {
    "type": "text",
    "title": "Client context",
    "paragraphs": [
      "Move''it is an urban mobility company developing Park''it, an automated parking payment system.",
      "With the previous developer having left the team, the mission is to fix existing bugs, implement TDD unit tests and integration tests."
    ]
  },
  {
    "type": "bullets",
    "title": "Deliverables",
    "items": [
      "GitHub repository with the corrected code and tests (dev branch)",
      "Unit test execution report (JUnit/Maven)",
      "JaCoCo code coverage report (coverage > 70%)",
      "Integration test execution report"
    ]
  },
  {
    "type": "bullets",
    "title": "Skills assessed",
    "items": [
      "Fix an application based on test results",
      "Implement unit tests",
      "Implement integration tests",
      "Automate the execution and reporting of unit and integration tests"
    ]
  },
  {
    "type": "metrics",
    "title": "Jury result",
    "items": [
      {
        "label": "Decision",
        "value": "✅ Validated"
      },
      {
        "label": "Strengths",
        "value": "Deliverables match what was requested"
      },
      {
        "label": "Areas for improvement",
        "value": "Room for improvement in oral presentation during the defense."
      }
    ]
  }
]'::jsonb
WHERE slug = 'parkit-java-testing' AND locale = 'en';

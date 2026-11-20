// content/project-details/second-brain-claude-code.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "second-brain-claude-code",
  "gallery": [],
  "locales": {
    "en": {
      "title": "Second Brain 2.0 — Claude Code + Notion",
      "sections": [
        {
          "body": "LLMs lose all context between sessions: every conversation starts from scratch. Meanwhile, hundreds of my Notion notes sit unused because the AI never reads them. My idea: build a persistent memory architecture where Claude Code reads structured Markdown files at the start of each session, and automatically enriches them at the end.",
          "type": "text",
          "title": "Context"
        },
        {
          "type": "bullets",
          "items": [
            "Systematic context loss between Claude sessions: profile, active projects, past decisions",
            "Notion notes unused by AI due to lack of structured integration",
            "Tedious context repetition at every new conversation",
            "No automatic enrichment: the AI learns but remembers nothing"
          ],
          "title": "Problem Scope"
        },
        {
          "type": "bullets",
          "items": [
            "I built structured Markdown memory files (YAML frontmatter) in the .claude/projects/ folder",
            "I set up automatic loading at startup via CLAUDE.md and a memory index",
            "I implemented post-session enrichment: new decisions, projects, and technical context added automatically",
            "I integrated the Notion MCP server for bidirectional sync with my knowledge base",
            "I segmented memory into user profile, active projects, tech stack, and preferences"
          ],
          "title": "Solution & Deliverables"
        },
        {
          "type": "bullets",
          "items": [
            "Claude Code CLI — main agent with local file access",
            "Notion MCP Server — read and write Notion pages",
            "Markdown + YAML frontmatter — memory file format",
            "CLAUDE.md — auto-loaded instructions file for Claude Code on startup",
            "Git — memory versioning for history and rollback"
          ],
          "title": "Tech Stack"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "V1 — File memories",
              "description": "I built the user profile and project index as local Markdown files, now active"
            },
            {
              "label": "V2 — Auto enrichment",
              "description": "Claude Code enriches memories after each significant session"
            },
            {
              "label": "V3 — Notion sync",
              "description": "I connected an MCP Notion integration for bidirectional read/write"
            },
            {
              "label": "V4 — Multi-agent",
              "description": "Specialized agents (research, code, writing) sharing the same memory"
            }
          ],
          "title": "Timeline"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Context is loaded automatically",
              "label": "Sessions without re-contextualization",
              "value": "100%"
            },
            {
              "note": "user_profile, project_saas, MEMORY index",
              "label": "Active memory files",
              "value": "3"
            },
            {
              "note": "Actively used in this portfolio project",
              "label": "Status",
              "value": "In production"
            }
          ],
          "title": "Impact"
        }
      ]
    },
    "fr": {
      "title": "Second Brain 2.0 — Claude Code + Notion",
      "sections": [
        {
          "body": "Les LLMs perdent tout contexte entre les sessions : chaque conversation repart de zéro. Parallèlement, des centaines de mes notes Notion restent inexploitées car jamais lues par l'IA. Mon idée : créer une architecture de mémoire persistante où Claude Code lit des fichiers Markdown structurés au démarrage de chaque session, et les enrichit automatiquement à la fin.",
          "type": "text",
          "title": "Contexte"
        },
        {
          "type": "bullets",
          "items": [
            "Perte de contexte systématique entre chaque session Claude : profil, projets en cours, décisions passées",
            "Notes Notion non exploitées par l'IA faute d'intégration structurée",
            "Répétition fastidieuse du contexte à chaque nouvelle conversation",
            "Pas d'enrichissement automatique : l'IA apprend mais ne mémorise rien"
          ],
          "title": "Problème"
        },
        {
          "type": "bullets",
          "items": [
            "J'ai créé des fichiers mémoire Markdown structurés (YAML frontmatter) dans le dossier .claude/projects/",
            "J'ai mis en place le chargement automatique au démarrage via CLAUDE.md et un memory index",
            "J'ai implémenté l'enrichissement post-session : nouvelles décisions, projets et contexte technique ajoutés automatiquement",
            "J'ai intégré le serveur Notion MCP pour une synchronisation bidirectionnelle avec ma base de connaissance",
            "J'ai segmenté la mémoire en profil utilisateur, projets actifs, stack technique et préférences"
          ],
          "title": "Solution & Livrables"
        },
        {
          "type": "bullets",
          "items": [
            "Claude Code CLI — agent principal avec accès fichiers locaux",
            "Notion MCP Server — lecture et écriture dans les pages Notion",
            "Markdown + YAML frontmatter — format des fichiers mémoire",
            "CLAUDE.md — fichier d'instructions auto-chargé par Claude Code au démarrage",
            "Git — versionnement des mémoires pour historique et rollback"
          ],
          "title": "Stack Technique"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "V1 — Mémoires fichiers",
              "description": "J'ai mis en place le profil utilisateur et l'index projets en fichiers Markdown locaux, actifs"
            },
            {
              "label": "V2 — Enrichissement auto",
              "description": "Claude Code enrichit les mémoires après chaque session significative"
            },
            {
              "label": "V3 — Sync Notion",
              "description": "J'ai connecté une intégration MCP Notion pour la lecture/écriture bidirectionnelle"
            },
            {
              "label": "V4 — Multi-agent",
              "description": "Agents spécialisés (recherche, code, rédaction) partageant la même mémoire"
            }
          ],
          "title": "Avancement"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Le contexte est chargé automatiquement",
              "label": "Sessions sans re-contextualisation",
              "value": "100%"
            },
            {
              "note": "user_profile, project_saas, MEMORY index",
              "label": "Fichiers mémoire actifs",
              "value": "3"
            },
            {
              "note": "Utilisé activement dans ce projet portfolio",
              "label": "Statut",
              "value": "En production"
            }
          ],
          "title": "Impact"
        }
      ]
    }
  }
};

export default details;

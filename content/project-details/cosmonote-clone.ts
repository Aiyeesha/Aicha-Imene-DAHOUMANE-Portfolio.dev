// content/project-details/cosmonote-clone.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "cosmonote-clone",
  "gallery": [],
  "locales": {
    "en": {
      "title": "Cosmonote Clone — AI Meeting Transcription",
      "sections": [
        {
          "body": "Cosmonote is an AI-powered meeting transcription and summarization SaaS. I'm building this project to replicate its core features and deeply understand the architecture of an AI audio product: audio processing pipeline, speech-to-text transcription, LLM summarization and smooth user experience.",
          "type": "text",
          "title": "Context"
        },
        {
          "type": "bullets",
          "items": [
            "Understand the real architecture of an AI transcription app by building it",
            "Master the audio pipeline: upload, processing, async transcription, storage",
            "Learn LLM orchestration for structured summaries (action items, decisions, participants)",
            "Evaluate costs and performance: Whisper API vs local model, latency, quality"
          ],
          "title": "Problem Scope"
        },
        {
          "type": "bullets",
          "items": [
            "Next.js interface: audio/video upload, meeting list, synchronized transcript reader",
            "Audio pipeline: Supabase Storage upload → async job → Whisper API transcription",
            "GPT-4o structured summary: title, participants, key points, decisions, action items",
            "Meeting history with full-text search in transcripts",
            "Markdown export and quick summary copy"
          ],
          "title": "Solution & Deliverables"
        },
        {
          "type": "bullets",
          "items": [
            "Frontend: Next.js 14, TypeScript, shadcn/ui, Tailwind CSS",
            "Transcription: OpenAI Whisper API (or local Whisper via faster-whisper)",
            "Summarization: GPT-4o with structured prompt (JSON schema output)",
            "Backend / DB: Supabase (PostgreSQL + Storage + Realtime)",
            "Deployment: Vercel + Supabase Edge Functions (async jobs)"
          ],
          "title": "Tech Stack"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Design",
              "description": "Audio pipeline architecture, Whisper API vs local choice, DB schema"
            },
            {
              "label": "MVP Pipeline",
              "description": "Upload → Whisper transcription → Supabase transcript storage"
            },
            {
              "label": "AI Summary",
              "description": "GPT-4o integration for structured summaries with action items"
            },
            {
              "label": "Full Interface",
              "description": "Synchronized audio reader with transcript, history, export"
            }
          ],
          "title": "Timeline"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "For a 60-minute meeting",
              "label": "Transcription latency",
              "value": "< 2 min"
            },
            {
              "note": "Target word error rate",
              "label": "Quality WER",
              "value": "< 10%"
            },
            {
              "note": "Prototype planned in 6 weeks",
              "label": "Availability",
              "value": "Coming Soon"
            }
          ],
          "title": "Goals"
        }
      ]
    },
    "fr": {
      "title": "Clone Cosmonote — Transcription IA de Réunions",
      "sections": [
        {
          "body": "Cosmonote est une application SaaS de transcription et résumé de réunions propulsée par IA. Je construis ce projet pour reproduire ses fonctionnalités principales et comprendre en profondeur l'architecture d'un produit IA audio : pipeline audio, transcription speech-to-text, summarisation LLM et UX fluide.",
          "type": "text",
          "title": "Contexte"
        },
        {
          "type": "bullets",
          "items": [
            "Comprendre l'architecture réelle d'une app IA transcription en la construisant",
            "Maîtriser le pipeline audio : upload, processing, transcription asynchrone, stockage",
            "Apprendre l'orchestration LLM pour résumés structurés (action items, décisions, participants)",
            "Évaluer coûts et performances : Whisper API vs modèle local, latence, qualité"
          ],
          "title": "Périmètre"
        },
        {
          "type": "bullets",
          "items": [
            "Interface Next.js : upload audio/vidéo, liste des réunions, lecture transcript synchronisée",
            "Pipeline audio : upload Supabase Storage → job asynchrone → Whisper API transcription",
            "Résumé structuré GPT-4o : titre, participants, points clés, décisions, action items",
            "Historique des réunions avec recherche full-text dans les transcripts",
            "Export Markdown et copie rapide des résumés"
          ],
          "title": "Solution & Livrables"
        },
        {
          "type": "bullets",
          "items": [
            "Frontend : Next.js 14, TypeScript, shadcn/ui, Tailwind CSS",
            "Transcription : OpenAI Whisper API (ou Whisper local via faster-whisper)",
            "Résumé : GPT-4o avec prompt structuré (JSON schema output)",
            "Backend / BDD : Supabase (PostgreSQL + Storage + Realtime)",
            "Déploiement : Vercel + Supabase Edge Functions (jobs async)"
          ],
          "title": "Stack Technique"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Conception",
              "description": "Architecture pipeline audio, choix Whisper API vs local, schéma BDD"
            },
            {
              "label": "MVP Pipeline",
              "description": "Upload → transcription Whisper → stockage transcript Supabase"
            },
            {
              "label": "Résumé IA",
              "description": "Intégration GPT-4o pour résumés structurés avec action items"
            },
            {
              "label": "Interface complète",
              "description": "Lecteur audio synchronisé avec transcript, historique, export"
            }
          ],
          "title": "Avancement"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Pour une réunion de 60 min",
              "label": "Latence transcription",
              "value": "< 2 min"
            },
            {
              "note": "Word Error Rate cible",
              "label": "Qualité WER",
              "value": "< 10%"
            },
            {
              "note": "Prototype prévu sous 6 semaines",
              "label": "Disponibilité",
              "value": "Bientôt"
            }
          ],
          "title": "Objectifs"
        }
      ]
    }
  }
};

export default details;

// content/project-details/pochlib-ui.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "pochlib-ui",
  "gallery": [
    {
      "alt": "Cover",
      "src": "/projects/pochlib-ui/cover.webp"
    },
    {
      "alt": "Screenshot 1",
      "src": "/projects/pochlib-ui/screenshot-1.webp"
    },
    {
      "alt": "Screenshot 2",
      "src": "/projects/pochlib-ui/screenshot-2.webp"
    },
    {
      "alt": "Screenshot 3",
      "src": "/projects/pochlib-ui/screenshot-3.webp"
    },
    {
      "alt": "Screenshot 4",
      "src": "/projects/pochlib-ui/screenshot-4.webp"
    },
    {
      "alt": "Screenshot 5",
      "src": "/projects/pochlib-ui/screenshot-5.webp"
    },
    {
      "alt": "Screenshot 6",
      "src": "/projects/pochlib-ui/screenshot-6.webp"
    },
    {
      "alt": "Screenshot 7",
      "src": "/projects/pochlib-ui/screenshot-7.webp"
    },
    {
      "alt": "Screenshot 8",
      "src": "/projects/pochlib-ui/screenshot-8.webp"
    },
    {
      "alt": "Screenshot 9",
      "src": "/projects/pochlib-ui/screenshot-9.webp"
    },
    {
      "alt": "Screenshot 10",
      "src": "/projects/pochlib-ui/screenshot-10.webp"
    },
    {
      "alt": "Screenshot 11",
      "src": "/projects/pochlib-ui/screenshot-11.webp"
    },
    {
      "alt": "Screenshot 12",
      "src": "/projects/pochlib-ui/screenshot-12.webp"
    },
    {
      "alt": "Screenshot 13",
      "src": "/projects/pochlib-ui/screenshot-13.webp"
    },
    {
      "alt": "Screenshot 14",
      "src": "/projects/pochlib-ui/screenshot-14.webp"
    },
    {
      "alt": "Screenshot 15",
      "src": "/projects/pochlib-ui/screenshot-15.webp"
    },
    {
      "alt": "Screenshot 16",
      "src": "/projects/pochlib-ui/screenshot-16.webp"
    },
    {
      "alt": "Screenshot 17",
      "src": "/projects/pochlib-ui/screenshot-17.webp"
    },
    {
      "alt": "Screenshot 18",
      "src": "/projects/pochlib-ui/screenshot-18.webp"
    }
  ],
  "locales": {
    "en": {
      "title": "SPA front-end UI (Poch'Lib)",
      "heroSubtitle": "Development of the Poch'Lib SPA frontend interface, a book management library in HTML/CSS/JS.",
      "sections": [
        {
          "body": "In the training scenario, Great'App, a 20-person Nice-based startup, brings me in to deliver Poch'Lib — a book management SPA commissioned by bookshop 'La plume enchantée'. My mission: build the entire frontend from scratch, matching UX designer Charlotte's wireframes exactly, with flawless responsive rendering across 3 formats (mobile, tablet, desktop), using no JavaScript framework.",
          "type": "text",
          "title": "Context"
        },
        {
          "type": "bullets",
          "items": [
            "No existing codebase — entire project to be built from scratch",
            "UX designer wireframes to be followed precisely",
            "Multi-format display required: mobile, tablet, and desktop",
            "External API consumption for book search via Fetch API",
            "SPA constraint: no page reloads allowed",
            "Installation README to be delivered to the end client"
          ],
          "title": "Problem Scope"
        },
        {
          "type": "bullets",
          "items": [
            "I built book search via the Google Books API (Fetch) with add-to-list into a personal list (\"Poch'List\")",
            "I persisted the list across views via sessionStorage — no loss on navigation, cleared when the tab closes",
            "I implemented dynamic book removal with real-time DOM updates (solid/empty Font Awesome bookmark icons reflecting state)",
            "I organized the code into 3 ES6 modules (application.js, search.js, util.js) with import/export — zero framework dependency",
            "I built a mobile-first responsive layout with media queries for 3 breakpoints",
            "I wrote semantic HTML5 aligned with Charlotte's UX wireframes",
            "I structured the SASS (variables, mixins, nesting) — DRY approach validated by the jury",
            "I delivered an installation README to the end client"
          ],
          "title": "Solution & Deliverables"
        },
        {
          "type": "bullets",
          "items": [
            "Semantic HTML5 — interface structure",
            "SASS — CSS preprocessor (variables, mixins, DRY)",
            "JavaScript ES6 (modules) — SPA logic split across 3 files, DOM manipulation",
            "Google Books API — book search via Fetch",
            "sessionStorage — client-side persistence of the book list",
            "Font Awesome — bookmark and delete icons",
            "Media queries — 3-breakpoint responsive (mobile, tablet, desktop)",
            "Git — versioning and delivery"
          ],
          "title": "Stack & Technologies"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Wireframe analysis",
              "description": "I reviewed Charlotte's mockups and broke them down into HTML/CSS components"
            },
            {
              "label": "HTML/SASS integration",
              "description": "I built the semantic structure, mobile-first styles, and set up SASS variables and mixins"
            },
            {
              "label": "JavaScript logic",
              "description": "I integrated the Fetch API, implemented book add/remove, and wired up dynamic DOM updates"
            },
            {
              "label": "Responsive refinement",
              "description": "I adjusted the media queries for all 3 formats: mobile, tablet and desktop"
            },
            {
              "label": "Documentation & delivery",
              "description": "I wrote the installation README and passed my defense with 4/4 skills validated"
            }
          ],
          "title": "Project Timeline"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Skills validated",
              "value": "4/4"
            },
            {
              "label": "Responsive formats",
              "value": "3"
            },
            {
              "label": "Jury feedback",
              "value": "Excellent mastery"
            }
          ],
          "title": "Defense Results"
        }
      ]
    },
    "fr": {
      "title": "Interface SPA front-end (Poch'Lib)",
      "heroSubtitle": "Développement de l'interface frontend SPA de Poch'Lib, une librairie de gestion de livres en HTML/CSS/JS.",
      "sections": [
        {
          "body": "Dans le scénario de formation, Great'App, startup niçoise de 20 personnes, me fait intervenir pour livrer Poch'Lib — une SPA de gestion de livres commandée par la librairie « La plume enchantée ». Ma mission : construire l'intégralité du frontend de zéro, en respectant les wireframes de l'UX designer Charlotte, avec un rendu responsive sur 3 formats (mobile, tablette, bureau), sans aucun framework JavaScript.",
          "type": "text",
          "title": "Contexte"
        },
        {
          "type": "bullets",
          "items": [
            "Aucune base de code existante — projet à créer intégralement de zéro",
            "Wireframes fournis par l'UX designer à respecter à la lettre",
            "Affichage multi-format requis : mobile, tablette et bureau",
            "Consommation d'une API externe pour la recherche de livres (Fetch API)",
            "Contrainte SPA : aucun rechargement de page autorisé",
            "Livraison d'un README d'installation pour la prise en main client"
          ],
          "title": "Problèmes & Périmètre"
        },
        {
          "type": "bullets",
          "items": [
            "J'ai développé la recherche de livres via la Google Books API (Fetch) avec ajout à une liste personnelle (« Poch'List »)",
            "J'ai assuré la persistance de la liste entre les pages via sessionStorage — pas de perte au changement de vue, réinitialisée à la fermeture de l'onglet",
            "J'ai implémenté la suppression dynamique des livres avec mise à jour du DOM en temps réel (icônes Font Awesome pleine/vide selon l'état du signet)",
            "J'ai organisé le code en 3 modules ES6 (application.js, search.js, util.js) avec import/export — zéro dépendance framework",
            "J'ai construit un responsive mobile-first avec media queries pour 3 breakpoints",
            "J'ai écrit un HTML5 sémantique aligné sur les wireframes UX de Charlotte",
            "J'ai structuré le SASS (variables, mixins, nesting) — approche DRY validée par le jury",
            "J'ai livré un README d'installation au client final"
          ],
          "title": "Solution & Livrables"
        },
        {
          "type": "bullets",
          "items": [
            "HTML5 sémantique — structure de l'interface",
            "SASS — préprocesseur CSS (variables, mixins, DRY)",
            "JavaScript ES6 (modules) — logique SPA répartie sur 3 fichiers, manipulation du DOM",
            "Google Books API — recherche de livres via Fetch",
            "sessionStorage — persistance de la liste de livres côté navigateur",
            "Font Awesome — icônes de signet et de suppression",
            "Media queries — responsive 3 breakpoints (mobile, tablette, bureau)",
            "Git — versionning et livraison"
          ],
          "title": "Stack et outils"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Analyse des wireframes",
              "description": "J'ai étudié les maquettes de Charlotte et les ai découpées en composants HTML/CSS"
            },
            {
              "label": "Intégration HTML/SASS",
              "description": "J'ai construit la structure sémantique, les styles mobile-first, et mis en place les variables et mixins SASS"
            },
            {
              "label": "Logique JavaScript",
              "description": "J'ai intégré la Fetch API, implémenté l'ajout et la suppression de livres, et mis à jour le DOM dynamiquement"
            },
            {
              "label": "Responsive",
              "description": "J'ai ajusté les media queries pour les 3 formats : mobile, tablette et bureau"
            },
            {
              "label": "Documentation & livraison",
              "description": "J'ai rédigé le README d'installation et validé ma soutenance avec 4/4 compétences"
            }
          ],
          "title": "Étapes du projet"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Compétences validées",
              "value": "4/4"
            },
            {
              "label": "Formats responsive",
              "value": "3"
            },
            {
              "label": "Évaluation jury",
              "value": "Très bonne maîtrise"
            }
          ],
          "title": "Résultats de la soutenance"
        }
      ]
    },
    "es": {
      "title": "Interfaz SPA front-end (Poch'Lib)",
      "heroSubtitle": "Interfaz Single Page Application para una librería (Poch’Lib)",
      "sections": [
        {
          "type": "text",
          "title": "Contexto",
          "paragraphs": [
            "Great'App (Niza) me encargó la realización del front-end de Poch'Lib, una aplicación de gestión de libros solicitada por la librería «La plume enchantée».",
            "El entregable esperado es una Single Page Application responsive (móvil/tablet/escritorio), conforme a las especificaciones funcionales y a los wireframes UX."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Buscar y añadir un libro a la lista del usuario.",
            "Mostrar los libros guardados y eliminar un libro de la lista.",
            "Interfaz responsive en 3 formatos (móvil / tablet / escritorio)."
          ],
          "title": "Funcionalidades clave"
        },
        {
          "type": "bullets",
          "items": [
            "Búsqueda de libros mediante la Google Books API (Fetch) y adición a una lista personal (\"Poch'List\").",
            "Persistencia de la lista entre vistas vía sessionStorage — sin pérdida al navegar, se reinicia al cerrar la pestaña.",
            "Eliminación dinámica de libros con actualización del DOM en tiempo real (iconos Font Awesome de marcador lleno/vacío según el estado).",
            "Código organizado en 3 módulos ES6 (application.js, search.js, util.js) con import/export — sin dependencia de framework."
          ],
          "title": "Puntos técnicos"
        },
        {
          "type": "bullets",
          "items": [
            "HTML5 semántico — estructura de la interfaz",
            "SASS — preprocesador CSS (variables, mixins, DRY)",
            "JavaScript ES6 (módulos) — lógica de la SPA repartida en 3 archivos, manipulación del DOM",
            "Google Books API — búsqueda de libros vía Fetch",
            "sessionStorage — persistencia de la lista en el cliente",
            "Font Awesome — iconos de marcador y eliminación",
            "Media queries — responsive en 3 breakpoints (móvil, tablet, escritorio)",
            "Git — control de versiones y entrega"
          ],
          "title": "Stack y tecnologías"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Análisis de wireframes",
              "description": "Revisé las maquetas de Charlotte y las descompuse en componentes HTML/CSS"
            },
            {
              "label": "Integración HTML/SASS",
              "description": "Construí la estructura semántica, los estilos mobile-first, y configuré las variables y mixins de SASS"
            },
            {
              "label": "Lógica JavaScript",
              "description": "Integré la Fetch API, implementé añadir/eliminar libros, y actualicé el DOM dinámicamente"
            },
            {
              "label": "Ajuste responsive",
              "description": "Ajusté las media queries para los 3 formatos: móvil, tablet y escritorio"
            },
            {
              "label": "Documentación y entrega",
              "description": "Redacté el README de instalación y validé mi defensa con 4/4 competencias"
            }
          ],
          "title": "Cronograma del proyecto"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Competencias validadas",
              "value": "4/4"
            },
            {
              "label": "Formatos responsive",
              "value": "3"
            },
            {
              "label": "Valoración del jurado",
              "value": "Dominio excelente"
            },
            {
              "label": "Coherencia visual",
              "value": "Wireframes respetados + tipografía/espaciados coherentes"
            }
          ],
          "title": "Resultados de la defensa"
        },
        {
          "type": "resources",
          "items": [
            {
              "href": "https://github.com/Aiyeesha/PochLib",
              "label": "Repositorio GitHub"
            }
          ],
          "title": "Entregables y evidencias"
        }
      ]
    }
  }
};

export default details;

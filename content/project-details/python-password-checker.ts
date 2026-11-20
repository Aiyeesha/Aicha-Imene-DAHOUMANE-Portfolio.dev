// content/project-details/python-password-checker.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "python-password-checker",
  "gallery": [
    {
      "alt": "Command-line analysis: effective entropy and breach check",
      "src": "/projects/python-password-checker/cover.svg"
    },
    {
      "alt": "Web interface — light theme (French)",
      "src": "/projects/python-password-checker/web-light-fr.png"
    },
    {
      "alt": "Web interface — dark theme (English)",
      "src": "/projects/python-password-checker/web-dark-en.png"
    }
  ],
  "locales": {
    "en": {
      "title": "Password Checker — strength & breach analyzer",
      "heroSubtitle": "Zero-dependency Python CLI and bilingual web app: effective entropy, weak-pattern detection and a k-anonymity breach check where only 5 hash characters leave the device",
      "sections": [
        {
          "type": "text",
          "title": "Context",
          "body": "I rebuilt this project from scratch to show a defensive, privacy-first approach to a classic problem: how strong is a password really, and has it already leaked? Character-count formulas overrate human passwords, and most online checkers ask you to trust them with the password itself. Password Checker estimates what an attacker would actually try first, and checks Have I Been Pwned without ever sending the password."
        },
        {
          "type": "bullets",
          "title": "What I built",
          "items": [
            "A Python CLI (stdlib only): masked input, readable or JSON report, exit codes usable in scripts and CI",
            "Effective entropy: dictionary words (including leet speak such as P@ssw0rd), AZERTY/QWERTY keyboard walks, sequences and repetitions are scored as an attacker would guess them",
            "Thresholds sourced from France's CNIL (2022) and NIST SP 800-63B-4",
            "Breach check through the Pwned Passwords k-anonymity API: SHA-1 computed locally, only the 5-character prefix is sent, response padding enabled",
            "A bilingual (EN/FR) web interface on GitHub Pages: a TypeScript port of the engine, a pattern map that never reveals a character, and the SHA-1 hash drawn as 5 sent cells and 35 kept cells"
          ]
        },
        {
          "type": "bullets",
          "title": "Security choices",
          "items": [
            "The password is never displayed, logged or stored; tests assert it never appears in any output",
            "No --password option: it would leak into shell history and process arguments",
            "Web: strict Content Security Policy allowing a single destination (api.pwnedpasswords.com), no analytics, no third-party scripts or fonts, no cookies sent",
            "Breach check on click only — checking on every keystroke would send the prefix of every partial password",
            "Repository hardening: protected main branch (PR + green CI required), secret scanning with push protection, Dependabot, private vulnerability reporting, Gitleaks scan of the full history"
          ]
        },
        {
          "type": "metrics",
          "title": "Engineering quality",
          "items": [
            {
              "label": "Python tests",
              "value": "77"
            },
            {
              "label": "TypeScript tests",
              "value": "48"
            },
            {
              "label": "Shared test cases",
              "value": "22",
              "note": "both engines must return identical results"
            },
            {
              "label": "CI matrix",
              "value": "5 jobs",
              "note": "Windows + Linux, Python 3.11/3.14, Node 24"
            },
            {
              "label": "Runtime dependencies",
              "value": "0"
            }
          ]
        },
        {
          "type": "timeline",
          "title": "How it works",
          "steps": [
            {
              "label": "Local analysis",
              "description": "Length and character classes give the theoretical entropy (L × log2 N)."
            },
            {
              "label": "Pattern detection",
              "description": "Common words, keyboard walks, sequences and repetitions are located — by type and position only, never by text."
            },
            {
              "label": "Effective entropy",
              "description": "Predictable parts are re-scored (about 12.9 bits per common word) and the score follows CNIL thresholds."
            },
            {
              "label": "Breach check",
              "description": "SHA-1 is hashed locally; only its first 5 characters are sent, and the matching suffix is searched locally."
            }
          ]
        },
        {
          "type": "resources",
          "title": "Links",
          "items": [
            {
              "label": "Live demo",
              "href": "https://aiyeesha.github.io/password-checker/"
            },
            {
              "label": "Source code",
              "href": "https://github.com/Aiyeesha/password-checker"
            }
          ]
        }
      ]
    },
    "fr": {
      "title": "Password Checker — robustesse et fuites",
      "heroSubtitle": "CLI Python sans dépendance et application web bilingue : entropie effective, détection des motifs faibles et vérification des fuites par k-anonymité, où seuls 5 caractères d'empreinte quittent l'appareil",
      "sections": [
        {
          "type": "text",
          "title": "Contexte",
          "body": "J'ai reconstruit ce projet de zéro pour montrer une approche défensive et respectueuse de la vie privée d'un problème classique : quelle est la robustesse réelle d'un mot de passe, et a-t-il déjà fuité ? Les formules fondées sur le nombre de caractères surestiment les mots de passe humains, et la plupart des vérificateurs en ligne demandent qu'on leur confie le mot de passe lui-même. Password Checker estime ce qu'un attaquant essaierait en premier, et interroge Have I Been Pwned sans jamais envoyer le mot de passe."
        },
        {
          "type": "bullets",
          "title": "Ce que j'ai construit",
          "items": [
            "Une CLI Python (bibliothèque standard uniquement) : saisie masquée, rapport lisible ou JSON, codes de sortie exploitables dans un script ou une CI",
            "L'entropie effective : mots courants (y compris en leet speak, comme P@ssw0rd), suites de touches AZERTY/QWERTY, suites logiques et répétitions sont évalués comme un attaquant les devinerait",
            "Des seuils sourcés : CNIL (2022) et NIST SP 800-63B-4",
            "La vérification des fuites via l'API Pwned Passwords (k-anonymité) : SHA-1 calculé localement, seul le préfixe de 5 caractères est envoyé, padding activé",
            "Une interface web bilingue (FR/EN) sur GitHub Pages : portage TypeScript du moteur, carte des motifs qui ne révèle aucun caractère, empreinte SHA-1 dessinée en 5 cases envoyées et 35 cases gardées"
          ]
        },
        {
          "type": "bullets",
          "title": "Choix de sécurité",
          "items": [
            "Le mot de passe n'est jamais affiché, journalisé ni stocké ; des tests vérifient qu'il n'apparaît dans aucune sortie",
            "Aucune option --password : elle ferait fuiter le mot de passe dans l'historique du terminal et les arguments du processus",
            "Web : politique de sécurité du contenu stricte n'autorisant qu'une destination (api.pwnedpasswords.com), aucune mesure d'audience, aucun script ni police tiers, aucun cookie envoyé",
            "Vérification des fuites uniquement sur clic : vérifier à chaque frappe enverrait le préfixe de chaque début de mot de passe",
            "Durcissement du dépôt : branche main protégée (PR et CI verte obligatoires), analyse des secrets avec blocage des push, Dependabot, signalement privé des vulnérabilités, analyse Gitleaks de tout l'historique"
          ]
        },
        {
          "type": "metrics",
          "title": "Qualité logicielle",
          "items": [
            {
              "label": "Tests Python",
              "value": "77"
            },
            {
              "label": "Tests TypeScript",
              "value": "48"
            },
            {
              "label": "Cas de test partagés",
              "value": "22",
              "note": "les deux moteurs doivent donner des résultats identiques"
            },
            {
              "label": "Matrice CI",
              "value": "5 tâches",
              "note": "Windows + Linux, Python 3.11/3.14, Node 24"
            },
            {
              "label": "Dépendances d'exécution",
              "value": "0"
            }
          ]
        },
        {
          "type": "timeline",
          "title": "Fonctionnement",
          "steps": [
            {
              "label": "Analyse locale",
              "description": "La longueur et les familles de caractères donnent l'entropie théorique (L × log2 N)."
            },
            {
              "label": "Détection des motifs",
              "description": "Mots courants, suites de touches, suites logiques et répétitions sont repérés — par type et position uniquement, jamais par leur texte."
            },
            {
              "label": "Entropie effective",
              "description": "Les parties prévisibles sont réévaluées (environ 12,9 bits par mot courant) et le score suit les seuils de la CNIL."
            },
            {
              "label": "Vérification des fuites",
              "description": "L'empreinte SHA-1 est calculée localement ; seuls ses 5 premiers caractères sont envoyés, et le suffixe est recherché localement."
            }
          ]
        },
        {
          "type": "resources",
          "title": "Liens",
          "items": [
            {
              "label": "Démo en ligne",
              "href": "https://aiyeesha.github.io/password-checker/?lang=fr"
            },
            {
              "label": "Code source",
              "href": "https://github.com/Aiyeesha/password-checker"
            }
          ]
        }
      ]
    },
    "es": {
      "title": "Password Checker — robustez y filtraciones",
      "heroSubtitle": "CLI en Python sin dependencias y aplicación web bilingüe: entropía efectiva, detección de patrones débiles y comprobación de filtraciones por k-anonimato, donde solo 5 caracteres del hash salen del dispositivo",
      "sections": [
        {
          "type": "text",
          "title": "Contexto",
          "body": "Reconstruí este proyecto desde cero para mostrar un enfoque defensivo y respetuoso con la privacidad de un problema clásico: ¿qué tan robusta es realmente una contraseña y se ha filtrado ya? Las fórmulas basadas en el número de caracteres sobrestiman las contraseñas humanas, y la mayoría de los verificadores en línea piden que se les confíe la propia contraseña. Password Checker estima lo que un atacante probaría primero y consulta Have I Been Pwned sin enviar nunca la contraseña."
        },
        {
          "type": "bullets",
          "title": "Lo que construí",
          "items": [
            "Una CLI en Python (solo biblioteca estándar): entrada oculta, informe legible o JSON, códigos de salida útiles en scripts y CI",
            "Entropía efectiva: palabras comunes (incluido leet speak, como P@ssw0rd), recorridos de teclado AZERTY/QWERTY, secuencias y repeticiones se evalúan como los adivinaría un atacante",
            "Umbrales basados en la CNIL francesa (2022) y NIST SP 800-63B-4",
            "Comprobación de filtraciones con la API Pwned Passwords (k-anonimato): SHA-1 calculado localmente, solo se envía el prefijo de 5 caracteres, con relleno activado",
            "Una interfaz web bilingüe (EN/FR) en GitHub Pages: port del motor a TypeScript, mapa de patrones que nunca revela un carácter y el hash SHA-1 dibujado como 5 celdas enviadas y 35 conservadas"
          ]
        },
        {
          "type": "bullets",
          "title": "Decisiones de seguridad",
          "items": [
            "La contraseña nunca se muestra, registra ni almacena; las pruebas verifican que no aparece en ninguna salida",
            "Sin opción --password: se filtraría en el historial de la terminal y en los argumentos del proceso",
            "Web: política de seguridad de contenido estricta con un único destino (api.pwnedpasswords.com), sin analítica, sin scripts ni fuentes de terceros, sin cookies enviadas",
            "Comprobación de filtraciones solo al hacer clic: comprobar en cada pulsación enviaría el prefijo de cada contraseña parcial",
            "Repositorio reforzado: rama main protegida (PR y CI en verde obligatorios), escaneo de secretos con bloqueo de push, Dependabot, notificación privada de vulnerabilidades, análisis Gitleaks de todo el historial"
          ]
        },
        {
          "type": "metrics",
          "title": "Calidad de ingeniería",
          "items": [
            {
              "label": "Pruebas Python",
              "value": "77"
            },
            {
              "label": "Pruebas TypeScript",
              "value": "48"
            },
            {
              "label": "Casos de prueba compartidos",
              "value": "22",
              "note": "ambos motores deben dar resultados idénticos"
            },
            {
              "label": "Matriz CI",
              "value": "5 tareas",
              "note": "Windows + Linux, Python 3.11/3.14, Node 24"
            },
            {
              "label": "Dependencias de ejecución",
              "value": "0"
            }
          ]
        },
        {
          "type": "timeline",
          "title": "Funcionamiento",
          "steps": [
            {
              "label": "Análisis local",
              "description": "La longitud y las familias de caracteres dan la entropía teórica (L × log2 N)."
            },
            {
              "label": "Detección de patrones",
              "description": "Palabras comunes, secuencias de teclado, secuencias lógicas y repeticiones se localizan — solo por tipo y posición, nunca por su texto."
            },
            {
              "label": "Entropía efectiva",
              "description": "Las partes predecibles se reevalúan (unos 12,9 bits por palabra común) y la puntuación sigue los umbrales de la CNIL."
            },
            {
              "label": "Comprobación de filtraciones",
              "description": "La huella SHA-1 se calcula localmente; solo se envían sus 5 primeros caracteres y el sufijo se busca localmente."
            }
          ]
        },
        {
          "type": "resources",
          "title": "Enlaces",
          "items": [
            {
              "label": "Demo en línea",
              "href": "https://aiyeesha.github.io/password-checker/?lang=en"
            },
            {
              "label": "Código fuente",
              "href": "https://github.com/Aiyeesha/password-checker"
            }
          ]
        }
      ]
    }
  }
};

export default details;

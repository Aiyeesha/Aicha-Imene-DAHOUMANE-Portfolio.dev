// content/project-details/nextjs-admin-dashboard.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "nextjs-admin-dashboard",
  "gallery": [
    {
      "alt": "Cover",
      "src": "/projects/nextjs-admin-dashboard/cover.svg"
    }
  ],
  "locales": {
    "en": {
      "title": "Admin Dashboard — Next.js 16 + Supabase",
      "heroSubtitle": "A secure /admin route built with HTTP Basic Auth, Supabase service_role, and zero extra dependencies.",
      "sections": [
        {
          "type": "text",
          "title": "Why I built this",
          "paragraphs": [
            "Every data-driven portfolio eventually needs a way to monitor its own data without opening the Supabase dashboard every time. I wanted to see my contact messages, project counts, and certification state at a glance — but building a full auth system felt like massive overkill for a personal tool.",
            "The challenge: how do you protect an internal route in Next.js 16 with zero new dependencies, while still being able to read tables that are locked behind Row Level Security for anonymous users?"
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Next.js 16 replaces middleware.ts with proxy.ts — the same file handles i18n routing for next-intl. Admin auth had to be injected without breaking locale prefixes.",
            "Edge runtime has no Buffer: the standard Node.js approach (Buffer.from(b64, 'base64').toString()) fails silently. I had to use atob() instead.",
            "The messages table is SELECT-blocked for the anon role by RLS policy. Reading it requires a service_role client — which must never leave the server.",
            "The admin layout must NOT include <html>/<body> — the root app/layout.tsx already provides those. Duplicating them triggers a React hydration mismatch.",
            "The /admin path must be excluded from next-intl's locale-prefixing logic, otherwise the proxy tries to redirect /admin to /en/admin."
          ],
          "title": "Technical constraints I had to solve"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "title": "Step 1 — Admin Supabase client",
              "description": "Created lib/supabase/admin.ts using the SUPABASE_SERVICE_ROLE_KEY env var (no NEXT_PUBLIC_ prefix — server only). This client bypasses all RLS policies and can SELECT from the messages table that the public anon client cannot access."
            },
            {
              "title": "Step 2 — HTTP Basic Auth in proxy.ts",
              "description": "Added an adminAuth() guard at the top of the proxy() function. If the pathname starts with /admin, it checks the Authorization header before passing to the next-intl handler. Used atob() for Edge-compatible base64 decoding. ADMIN_USERNAME and ADMIN_PASSWORD are set in .env.local (server-only)."
            },
            {
              "title": "Step 3 — Isolated admin layout",
              "description": "Created app/admin/layout.tsx returning a <div> wrapper (not <html>/<body>) with a dark Slate theme, a minimal header, and robots: index: false metadata. The layout sits entirely outside the [locale] routing tree."
            },
            {
              "title": "Step 4 — Dashboard Server Component",
              "description": "app/admin/page.tsx fetches all four tables in parallel using Promise.all(). Stat cards, a full project table (status / track / featured / date), the 20 most recent contact messages with clickable mailto links, a certifications table, and testimonial counters. Zero client JavaScript."
            }
          ],
          "title": "How I built it"
        },
        {
          "code": "function adminAuth(request: NextRequest): NextResponse | null {\n  const expectedUser = process.env.ADMIN_USERNAME;\n  const expectedPass = process.env.ADMIN_PASSWORD;\n\n  if (!expectedUser || !expectedPass) {\n    return new NextResponse(\"Admin not configured.\", { status: 503 });\n  }\n\n  const authHeader = request.headers.get(\"authorization\");\n  if (authHeader?.startsWith(\"Basic \")) {\n    try {\n      const decoded = atob(authHeader.slice(6)); // Edge-safe — no Buffer\n      const colonIdx = decoded.indexOf(\":\");\n      if (colonIdx !== -1) {\n        const user = decoded.slice(0, colonIdx);\n        const pass = decoded.slice(colonIdx + 1);\n        if (user === expectedUser && pass === expectedPass) {\n          return null; // ✅ authorized\n        }\n      }\n    } catch {\n      // malformed base64 — reject\n    }\n  }\n\n  return new NextResponse(\"Authentication required.\", {\n    status: 401,\n    headers: { \"WWW-Authenticate\": 'Basic realm=\"Admin\", charset=\"UTF-8\"' },\n  });\n}",
          "type": "code",
          "title": "Core: Edge-compatible Basic Auth (proxy.ts)",
          "language": "typescript"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "HTTP Basic Auth via proxy.ts + env vars only",
              "label": "New npm packages added",
              "value": "0"
            },
            {
              "note": "projects · certifications · messages · testimonials",
              "label": "Tables monitored",
              "value": "4"
            },
            {
              "note": "100% Server Components — no hydration overhead",
              "label": "Client JavaScript",
              "value": "0 KB"
            },
            {
              "note": "In proxy.ts — no login page, no session, no JWT",
              "label": "Lines of auth code",
              "value": "~25"
            }
          ],
          "title": "What this project demonstrates"
        },
        {
          "type": "bullets",
          "items": [
            "Edge runtime is more restrictive than Node.js: always check which APIs are available (Buffer, crypto, fs…) before reaching for them.",
            "next-intl and custom proxy logic can coexist cleanly if you guard the admin path before calling the intl handler.",
            "Server Components are the right default for internal dashboards — no state, no effects, no bundles sent to the browser.",
            "RLS is your safety net, not a replacement for server-side secrets: even with service_role, the key never leaves the server."
          ],
          "title": "Key learnings"
        },
        {
          "type": "resources",
          "items": [
            {
              "href": "https://github.com/Aiyeesha/Aicha-Imene-DAHOUMANE-Portfolio.dev",
              "label": "GitHub repository"
            },
            {
              "href": "https://nextjs.org/docs/messages/middleware-to-proxy",
              "label": "Next.js 16 — proxy.ts migration guide"
            },
            {
              "href": "https://supabase.com/docs/guides/auth/row-level-security",
              "label": "Supabase — Row Level Security"
            }
          ],
          "title": "Source & references"
        }
      ]
    },
    "fr": {
      "title": "Tableau de bord admin — Next.js 16 + Supabase",
      "heroSubtitle": "Une route /admin sécurisée par HTTP Basic Auth, client Supabase service_role, et zéro dépendance supplémentaire.",
      "sections": [
        {
          "type": "text",
          "title": "Pourquoi j'ai construit ça",
          "paragraphs": [
            "Tout portfolio data-driven a besoin, à un moment, d'un moyen de surveiller ses propres données sans ouvrir le dashboard Supabase à chaque fois. Je voulais voir mes messages de contact, le nombre de projets et l'état de mes certifications en un coup d'œil — mais construire un système d'authentification complet m'a semblé totalement surdimensionné pour un outil personnel.",
            "Le défi : comment protéger une route interne dans Next.js 16 sans aucune nouvelle dépendance, tout en pouvant lire des tables verrouillées par Row Level Security pour les utilisateurs anonymes ?"
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Next.js 16 remplace middleware.ts par proxy.ts — le même fichier gère le routing i18n pour next-intl. L'auth admin devait être injectée sans casser les préfixes de locale.",
            "L'Edge runtime n'a pas Buffer : l'approche Node.js classique (Buffer.from(b64, 'base64').toString()) échoue silencieusement. J'ai dû utiliser atob() à la place.",
            "La table messages est bloquée en SELECT pour le rôle anon par la politique RLS. La lire nécessite un client service_role — qui ne doit jamais quitter le serveur.",
            "Le layout admin ne doit PAS inclure <html>/<body> — app/layout.tsx les fournit déjà. Les dupliquer provoque une erreur de hydration React.",
            "Le chemin /admin doit être exclu de la logique de préfixage de locale de next-intl, sinon le proxy tente de rediriger /admin vers /en/admin."
          ],
          "title": "Contraintes techniques à résoudre"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "title": "Étape 1 — Client Supabase admin",
              "description": "Création de lib/supabase/admin.ts utilisant la clé SUPABASE_SERVICE_ROLE_KEY (sans préfixe NEXT_PUBLIC_ — côté serveur uniquement). Ce client contourne toutes les politiques RLS et peut faire des SELECT sur la table messages que le client anon public ne peut pas lire."
            },
            {
              "title": "Étape 2 — HTTP Basic Auth dans proxy.ts",
              "description": "Ajout d'une garde adminAuth() en début de la fonction proxy(). Si le pathname commence par /admin, le header Authorization est vérifié avant de passer au gestionnaire next-intl. Utilisation d'atob() pour un décodage base64 compatible Edge. ADMIN_USERNAME et ADMIN_PASSWORD sont définis dans .env.local (côté serveur uniquement)."
            },
            {
              "title": "Étape 3 — Layout admin isolé",
              "description": "Création de app/admin/layout.tsx retournant un wrapper <div> (pas <html>/<body>) avec un thème Slate sombre, un header minimal, et les métadonnées robots: index: false. Le layout est entièrement hors de l'arbre de routing [locale]."
            },
            {
              "title": "Étape 4 — Dashboard Server Component",
              "description": "app/admin/page.tsx récupère les quatre tables en parallèle via Promise.all(). Stat cards, table complète des projets (status / track / featured / date), 20 derniers messages de contact avec liens mailto cliquables, table des certifications et compteurs de témoignages. Zéro JavaScript client."
            }
          ],
          "title": "Comment je l'ai construit"
        },
        {
          "code": "function adminAuth(request: NextRequest): NextResponse | null {\n  const expectedUser = process.env.ADMIN_USERNAME;\n  const expectedPass = process.env.ADMIN_PASSWORD;\n\n  if (!expectedUser || !expectedPass) {\n    return new NextResponse(\"Admin non configuré.\", { status: 503 });\n  }\n\n  const authHeader = request.headers.get(\"authorization\");\n  if (authHeader?.startsWith(\"Basic \")) {\n    try {\n      const decoded = atob(authHeader.slice(6)); // Edge-safe — sans Buffer\n      const colonIdx = decoded.indexOf(\":\");\n      if (colonIdx !== -1) {\n        const user = decoded.slice(0, colonIdx);\n        const pass = decoded.slice(colonIdx + 1);\n        if (user === expectedUser && pass === expectedPass) {\n          return null; // ✅ autorisé\n        }\n      }\n    } catch {\n      // base64 malformé — rejeter\n    }\n  }\n\n  return new NextResponse(\"Authentification requise.\", {\n    status: 401,\n    headers: { \"WWW-Authenticate\": 'Basic realm=\"Admin\", charset=\"UTF-8\"' },\n  });\n}",
          "type": "code",
          "title": "Noyau : HTTP Basic Auth compatible Edge (proxy.ts)",
          "language": "typescript"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "HTTP Basic Auth via proxy.ts + variables d'env uniquement",
              "label": "Packages npm ajoutés",
              "value": "0"
            },
            {
              "note": "projets · certifications · messages · témoignages",
              "label": "Tables surveillées",
              "value": "4"
            },
            {
              "note": "100% Server Components — aucun overhead d'hydration",
              "label": "JavaScript client",
              "value": "0 Ko"
            },
            {
              "note": "Dans proxy.ts — pas de page de connexion, pas de session, pas de JWT",
              "label": "Lignes de code d'auth",
              "value": "~25"
            }
          ],
          "title": "Ce que ce projet démontre"
        },
        {
          "type": "bullets",
          "items": [
            "L'Edge runtime est plus restrictif que Node.js : toujours vérifier quelles API sont disponibles (Buffer, crypto, fs…) avant de les utiliser.",
            "next-intl et une logique de proxy personnalisée peuvent coexister proprement si on garde le chemin admin avant d'appeler le gestionnaire intl.",
            "Les Server Components sont le bon défaut pour les dashboards internes — pas d'état, pas d'effets, pas de bundles envoyés au navigateur.",
            "RLS est votre filet de sécurité, pas un substitut aux secrets côté serveur : même avec service_role, la clé ne quitte jamais le serveur."
          ],
          "title": "Apprentissages clés"
        },
        {
          "type": "resources",
          "items": [
            {
              "href": "https://github.com/Aiyeesha/Aicha-Imene-DAHOUMANE-Portfolio.dev",
              "label": "Dépôt GitHub"
            },
            {
              "href": "https://nextjs.org/docs/messages/middleware-to-proxy",
              "label": "Next.js 16 — guide de migration proxy.ts"
            },
            {
              "href": "https://supabase.com/docs/guides/auth/row-level-security",
              "label": "Supabase — Row Level Security"
            }
          ],
          "title": "Source & références"
        }
      ]
    },
    "es": {
      "title": "Panel de administración — Next.js 16 + Supabase",
      "heroSubtitle": "Una ruta /admin segura construida con HTTP Basic Auth, Supabase service_role, y cero dependencias adicionales.",
      "sections": [
        {
          "type": "text",
          "title": "Por qué lo construí",
          "paragraphs": [
            "Todo portfolio basado en datos acaba necesitando una forma de supervisar sus propios datos sin abrir el dashboard de Supabase cada vez. Quería ver mis mensajes de contacto, el número de proyectos y el estado de las certificaciones de un vistazo — pero construir un sistema de autenticación completo parecía una sobreingeniería enorme para una herramienta personal.",
            "El reto: ¿cómo proteger una ruta interna en Next.js 16 sin añadir ninguna dependencia nueva, manteniendo la capacidad de leer tablas bloqueadas por Row Level Security para usuarios anónimos?"
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Next.js 16 sustituye middleware.ts por proxy.ts — el mismo archivo gestiona el enrutamiento i18n de next-intl. La autenticación admin debía inyectarse sin romper los prefijos de idioma.",
            "El entorno Edge no tiene Buffer: el enfoque estándar de Node.js (Buffer.from(b64, 'base64').toString()) falla silenciosamente. Tuve que usar atob() en su lugar.",
            "La tabla messages está bloqueada para SELECT por política RLS en el rol anon. Leerla requiere un cliente service_role — que nunca debe salir del servidor.",
            "El layout admin NO debe incluir <html>/<body> — el app/layout.tsx raíz ya los proporciona. Duplicarlos provoca un desajuste de hidratación en React.",
            "La ruta /admin debe excluirse de la lógica de prefijado de idioma de next-intl, o el proxy intentará redirigir /admin a /en/admin."
          ],
          "title": "Restricciones técnicas que tuve que resolver"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "title": "Paso 1 — Cliente Supabase admin",
              "description": "Creé lib/supabase/admin.ts usando la variable de entorno SUPABASE_SERVICE_ROLE_KEY (sin prefijo NEXT_PUBLIC_ — solo servidor). Este cliente omite todas las políticas RLS y puede hacer SELECT sobre la tabla messages a la que el cliente anon público no tiene acceso."
            },
            {
              "title": "Paso 2 — HTTP Basic Auth en proxy.ts",
              "description": "Añadí un guard adminAuth() al principio de la función proxy(). Si la ruta empieza por /admin, comprueba la cabecera Authorization antes de pasar al handler de next-intl. Usé atob() para una decodificación base64 compatible con Edge. ADMIN_USERNAME y ADMIN_PASSWORD se definen en .env.local (solo servidor)."
            },
            {
              "title": "Paso 3 — Layout admin aislado",
              "description": "Creé app/admin/layout.tsx devolviendo un <div> envolvente (no <html>/<body>) con un tema oscuro Slate, una cabecera mínima, y metadata robots: index: false. El layout está completamente fuera del árbol de enrutamiento [locale]."
            },
            {
              "title": "Paso 4 — Server Component del dashboard",
              "description": "app/admin/page.tsx obtiene las cuatro tablas en paralelo con Promise.all(). Tarjetas de estadísticas, una tabla completa de proyectos (estado / área / destacado / fecha), los 20 mensajes de contacto más recientes con enlaces mailto, una tabla de certificaciones, y contadores de testimonios. Cero JavaScript de cliente."
            }
          ],
          "title": "Cómo lo construí"
        },
        {
          "code": "function adminAuth(request: NextRequest): NextResponse | null {\n  const expectedUser = process.env.ADMIN_USERNAME;\n  const expectedPass = process.env.ADMIN_PASSWORD;\n\n  if (!expectedUser || !expectedPass) {\n    return new NextResponse(\"Admin not configured.\", { status: 503 });\n  }\n\n  const authHeader = request.headers.get(\"authorization\");\n  if (authHeader?.startsWith(\"Basic \")) {\n    try {\n      const decoded = atob(authHeader.slice(6)); // Edge-safe — no Buffer\n      const colonIdx = decoded.indexOf(\":\");\n      if (colonIdx !== -1) {\n        const user = decoded.slice(0, colonIdx);\n        const pass = decoded.slice(colonIdx + 1);\n        if (user === expectedUser && pass === expectedPass) {\n          return null; // ✅ authorized\n        }\n      }\n    } catch {\n      // malformed base64 — reject\n    }\n  }\n\n  return new NextResponse(\"Authentication required.\", {\n    status: 401,\n    headers: { \"WWW-Authenticate\": 'Basic realm=\"Admin\", charset=\"UTF-8\"' },\n  });\n}",
          "type": "code",
          "title": "Núcleo: Basic Auth compatible con Edge (proxy.ts)",
          "language": "typescript"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "HTTP Basic Auth vía proxy.ts + variables de entorno únicamente",
              "label": "Paquetes npm nuevos añadidos",
              "value": "0"
            },
            {
              "note": "projects · certifications · messages · testimonials",
              "label": "Tablas monitorizadas",
              "value": "4"
            },
            {
              "note": "100% Server Components — sin sobrecarga de hidratación",
              "label": "JavaScript de cliente",
              "value": "0 KB"
            },
            {
              "note": "En proxy.ts — sin página de login, sin sesión, sin JWT",
              "label": "Líneas de código de autenticación",
              "value": "~25"
            }
          ],
          "title": "Qué demuestra este proyecto"
        },
        {
          "type": "bullets",
          "items": [
            "El entorno Edge es más restrictivo que Node.js: siempre hay que comprobar qué APIs están disponibles (Buffer, crypto, fs…) antes de usarlas.",
            "next-intl y una lógica de proxy personalizada pueden convivir sin problemas si proteges la ruta admin antes de llamar al handler de intl.",
            "Los Server Components son la opción correcta por defecto para dashboards internos — sin estado, sin efectos, sin bundles enviados al navegador.",
            "RLS es una red de seguridad, no un sustituto de los secretos del lado servidor: incluso con service_role, la clave nunca sale del servidor."
          ],
          "title": "Aprendizajes clave"
        },
        {
          "type": "resources",
          "items": [
            {
              "href": "https://github.com/Aiyeesha/Aicha-Imene-DAHOUMANE-Portfolio.dev",
              "label": "Repositorio GitHub"
            },
            {
              "href": "https://nextjs.org/docs/messages/middleware-to-proxy",
              "label": "Next.js 16 — Guía de migración a proxy.ts"
            },
            {
              "href": "https://supabase.com/docs/guides/auth/row-level-security",
              "label": "Supabase — Row Level Security"
            }
          ],
          "title": "Código fuente y referencias"
        }
      ]
    }
  }
};

export default details;

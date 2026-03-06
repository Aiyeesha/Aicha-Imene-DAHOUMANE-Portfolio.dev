-- supabase/update-admin-dashboard-casestudy.sql
-- -----------------------------------------------
-- Enrichit le projet "Admin Dashboard" en case study complet.
-- Badge : PERSONAL PROJECT
-- Sections : contexte, défis, timeline, métriques, code, ressources
-- À exécuter dans SQL Editor → Primary Database

-- ══════════════════════════════════════════════════════
-- VERSION EN
-- ══════════════════════════════════════════════════════
UPDATE projects SET
  badge = '{"tone": "personal", "label": "PERSONAL PROJECT"}',
  hero_subtitle = 'A secure /admin route built with HTTP Basic Auth, Supabase service_role, and zero extra dependencies.',
  highlights = ARRAY[
    'HTTP Basic Auth on Edge runtime (atob — no Buffer needed)',
    'Supabase service_role bypasses RLS to read private contact messages',
    '100% Server Components — zero client JavaScript',
    'No extra npm packages: proxy.ts + env vars is all it takes',
    'robots: index: false — never indexed by search engines'
  ],
  sections = '[
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
      "title": "Technical constraints I had to solve",
      "items": [
        "Next.js 16 replaces middleware.ts with proxy.ts — the same file handles i18n routing for next-intl. Admin auth had to be injected without breaking locale prefixes.",
        "Edge runtime has no Buffer: the standard Node.js approach (Buffer.from(b64, ''base64'').toString()) fails silently. I had to use atob() instead.",
        "The messages table is SELECT-blocked for the anon role by RLS policy. Reading it requires a service_role client — which must never leave the server.",
        "The admin layout must NOT include <html>/<body> — the root app/layout.tsx already provides those. Duplicating them triggers a React hydration mismatch.",
        "The /admin path must be excluded from next-intl's locale-prefixing logic, otherwise the proxy tries to redirect /admin to /en/admin."
      ]
    },
    {
      "type": "timeline",
      "title": "How I built it",
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
      ]
    },
    {
      "type": "code",
      "title": "Core: Edge-compatible Basic Auth (proxy.ts)",
      "language": "typescript",
      "code": "function adminAuth(request: NextRequest): NextResponse | null {\n  const expectedUser = process.env.ADMIN_USERNAME;\n  const expectedPass = process.env.ADMIN_PASSWORD;\n\n  if (!expectedUser || !expectedPass) {\n    return new NextResponse(\"Admin not configured.\", { status: 503 });\n  }\n\n  const authHeader = request.headers.get(\"authorization\");\n  if (authHeader?.startsWith(\"Basic \")) {\n    try {\n      const decoded = atob(authHeader.slice(6)); // Edge-safe — no Buffer\n      const colonIdx = decoded.indexOf(\":\");\n      if (colonIdx !== -1) {\n        const user = decoded.slice(0, colonIdx);\n        const pass = decoded.slice(colonIdx + 1);\n        if (user === expectedUser && pass === expectedPass) {\n          return null; // ✅ authorized\n        }\n      }\n    } catch {\n      // malformed base64 — reject\n    }\n  }\n\n  return new NextResponse(\"Authentication required.\", {\n    status: 401,\n    headers: { \"WWW-Authenticate\": ''Basic realm=\"Admin\", charset=\"UTF-8\"'' },\n  });\n}"
    },
    {
      "type": "metrics",
      "title": "What this project demonstrates",
      "items": [
        {
          "label": "New npm packages added",
          "value": "0",
          "note": "HTTP Basic Auth via proxy.ts + env vars only"
        },
        {
          "label": "Tables monitored",
          "value": "4",
          "note": "projects · certifications · messages · testimonials"
        },
        {
          "label": "Client JavaScript",
          "value": "0 KB",
          "note": "100% Server Components — no hydration overhead"
        },
        {
          "label": "Lines of auth code",
          "value": "~25",
          "note": "In proxy.ts — no login page, no session, no JWT"
        }
      ]
    },
    {
      "type": "bullets",
      "title": "Key learnings",
      "items": [
        "Edge runtime is more restrictive than Node.js: always check which APIs are available (Buffer, crypto, fs…) before reaching for them.",
        "next-intl and custom proxy logic can coexist cleanly if you guard the admin path before calling the intl handler.",
        "Server Components are the right default for internal dashboards — no state, no effects, no bundles sent to the browser.",
        "RLS is your safety net, not a replacement for server-side secrets: even with service_role, the key never leaves the server."
      ]
    },
    {
      "type": "resources",
      "title": "Source & references",
      "items": [
        {
          "href": "https://github.com/Aiyeesha/portfolio-next",
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
      ]
    }
  ]'
WHERE slug = 'nextjs-admin-dashboard' AND locale = 'en';

-- ══════════════════════════════════════════════════════
-- VERSION FR
-- ══════════════════════════════════════════════════════
UPDATE projects SET
  badge = '{"tone": "personal", "label": "PROJET PERSONNEL"}',
  hero_subtitle = 'Une route /admin sécurisée par HTTP Basic Auth, client Supabase service_role, et zéro dépendance supplémentaire.',
  highlights = ARRAY[
    'HTTP Basic Auth sur Edge runtime (atob — sans Buffer)',
    'Client Supabase service_role : contourne le RLS pour lire les messages de contact privés',
    'Rendu 100% Server Components — zéro JavaScript client',
    'Zéro package npm supplémentaire : proxy.ts + variables d''environnement',
    'robots: index: false — jamais référencé par les moteurs de recherche'
  ],
  sections = '[
    {
      "type": "text",
      "title": "Pourquoi j''ai construit ça",
      "paragraphs": [
        "Tout portfolio data-driven a besoin, à un moment, d''un moyen de surveiller ses propres données sans ouvrir le dashboard Supabase à chaque fois. Je voulais voir mes messages de contact, le nombre de projets et l''état de mes certifications en un coup d''œil — mais construire un système d''authentification complet m''a semblé totalement surdimensionné pour un outil personnel.",
        "Le défi : comment protéger une route interne dans Next.js 16 sans aucune nouvelle dépendance, tout en pouvant lire des tables verrouillées par Row Level Security pour les utilisateurs anonymes ?"
      ]
    },
    {
      "type": "bullets",
      "title": "Contraintes techniques à résoudre",
      "items": [
        "Next.js 16 remplace middleware.ts par proxy.ts — le même fichier gère le routing i18n pour next-intl. L''auth admin devait être injectée sans casser les préfixes de locale.",
        "L''Edge runtime n''a pas Buffer : l''approche Node.js classique (Buffer.from(b64, ''base64'').toString()) échoue silencieusement. J''ai dû utiliser atob() à la place.",
        "La table messages est bloquée en SELECT pour le rôle anon par la politique RLS. La lire nécessite un client service_role — qui ne doit jamais quitter le serveur.",
        "Le layout admin ne doit PAS inclure <html>/<body> — app/layout.tsx les fournit déjà. Les dupliquer provoque une erreur de hydration React.",
        "Le chemin /admin doit être exclu de la logique de préfixage de locale de next-intl, sinon le proxy tente de rediriger /admin vers /en/admin."
      ]
    },
    {
      "type": "timeline",
      "title": "Comment je l''ai construit",
      "steps": [
        {
          "title": "Étape 1 — Client Supabase admin",
          "description": "Création de lib/supabase/admin.ts utilisant la clé SUPABASE_SERVICE_ROLE_KEY (sans préfixe NEXT_PUBLIC_ — côté serveur uniquement). Ce client contourne toutes les politiques RLS et peut faire des SELECT sur la table messages que le client anon public ne peut pas lire."
        },
        {
          "title": "Étape 2 — HTTP Basic Auth dans proxy.ts",
          "description": "Ajout d''une garde adminAuth() en début de la fonction proxy(). Si le pathname commence par /admin, le header Authorization est vérifié avant de passer au gestionnaire next-intl. Utilisation d''atob() pour un décodage base64 compatible Edge. ADMIN_USERNAME et ADMIN_PASSWORD sont définis dans .env.local (côté serveur uniquement)."
        },
        {
          "title": "Étape 3 — Layout admin isolé",
          "description": "Création de app/admin/layout.tsx retournant un wrapper <div> (pas <html>/<body>) avec un thème Slate sombre, un header minimal, et les métadonnées robots: index: false. Le layout est entièrement hors de l''arbre de routing [locale]."
        },
        {
          "title": "Étape 4 — Dashboard Server Component",
          "description": "app/admin/page.tsx récupère les quatre tables en parallèle via Promise.all(). Stat cards, table complète des projets (status / track / featured / date), 20 derniers messages de contact avec liens mailto cliquables, table des certifications et compteurs de témoignages. Zéro JavaScript client."
        }
      ]
    },
    {
      "type": "code",
      "title": "Noyau : HTTP Basic Auth compatible Edge (proxy.ts)",
      "language": "typescript",
      "code": "function adminAuth(request: NextRequest): NextResponse | null {\n  const expectedUser = process.env.ADMIN_USERNAME;\n  const expectedPass = process.env.ADMIN_PASSWORD;\n\n  if (!expectedUser || !expectedPass) {\n    return new NextResponse(\"Admin non configuré.\", { status: 503 });\n  }\n\n  const authHeader = request.headers.get(\"authorization\");\n  if (authHeader?.startsWith(\"Basic \")) {\n    try {\n      const decoded = atob(authHeader.slice(6)); // Edge-safe — sans Buffer\n      const colonIdx = decoded.indexOf(\":\");\n      if (colonIdx !== -1) {\n        const user = decoded.slice(0, colonIdx);\n        const pass = decoded.slice(colonIdx + 1);\n        if (user === expectedUser && pass === expectedPass) {\n          return null; // ✅ autorisé\n        }\n      }\n    } catch {\n      // base64 malformé — rejeter\n    }\n  }\n\n  return new NextResponse(\"Authentification requise.\", {\n    status: 401,\n    headers: { \"WWW-Authenticate\": ''Basic realm=\"Admin\", charset=\"UTF-8\"'' },\n  });\n}"
    },
    {
      "type": "metrics",
      "title": "Ce que ce projet démontre",
      "items": [
        {
          "label": "Packages npm ajoutés",
          "value": "0",
          "note": "HTTP Basic Auth via proxy.ts + variables d''env uniquement"
        },
        {
          "label": "Tables surveillées",
          "value": "4",
          "note": "projets · certifications · messages · témoignages"
        },
        {
          "label": "JavaScript client",
          "value": "0 Ko",
          "note": "100% Server Components — aucun overhead d''hydration"
        },
        {
          "label": "Lignes de code d''auth",
          "value": "~25",
          "note": "Dans proxy.ts — pas de page de connexion, pas de session, pas de JWT"
        }
      ]
    },
    {
      "type": "bullets",
      "title": "Apprentissages clés",
      "items": [
        "L''Edge runtime est plus restrictif que Node.js : toujours vérifier quelles API sont disponibles (Buffer, crypto, fs…) avant de les utiliser.",
        "next-intl et une logique de proxy personnalisée peuvent coexister proprement si on garde le chemin admin avant d''appeler le gestionnaire intl.",
        "Les Server Components sont le bon défaut pour les dashboards internes — pas d''état, pas d''effets, pas de bundles envoyés au navigateur.",
        "RLS est votre filet de sécurité, pas un substitut aux secrets côté serveur : même avec service_role, la clé ne quitte jamais le serveur."
      ]
    },
    {
      "type": "resources",
      "title": "Source & références",
      "items": [
        {
          "href": "https://github.com/Aiyeesha/portfolio-next",
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
      ]
    }
  ]'
WHERE slug = 'nextjs-admin-dashboard' AND locale = 'fr';

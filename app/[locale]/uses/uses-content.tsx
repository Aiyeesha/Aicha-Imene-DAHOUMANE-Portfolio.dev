// Server component: accents use the `itops:` CSS variant (globals.css), which
// also follows a track switch, so no client JavaScript is needed.

import Link from "next/link";

type Locale = "en" | "fr" | "es";

type UseItem = {
  name: string;
  description: { en: string; fr: string; es: string };
  url?: string;
  badge?: string;
};

type UseCategory = {
  id: string;
  icon: string;
  title: { en: string; fr: string; es: string };
  items: UseItem[];
};

const USES: UseCategory[] = [
  {
    id: "editor",
    icon: "⌨️",
    title: { en: "Editor & Terminal", fr: "Éditeur & Terminal", es: "Editor y terminal" },
    items: [
      { name: "Visual Studio Code",                  description: { en: "My main editor for everything — TypeScript, Apex, MDX, YAML. Highly extensible.", fr: "Mon éditeur principal — TypeScript, Apex, MDX, YAML. Très extensible.", es: "Mi editor principal para todo — TypeScript, Apex, MDX, YAML. Muy extensible." }, url: "https://code.visualstudio.com", badge: "free" },
      { name: "Salesforce Extensions for VS Code",   description: { en: "Official Salesforce pack: Apex language server, SOQL builder, org browser, deployment tools.", fr: "Pack officiel Salesforce : serveur de langage Apex, SOQL builder, navigateur d'org, déploiement.", es: "Paquete oficial de Salesforce: servidor de lenguaje Apex, generador de SOQL, explorador de org, herramientas de despliegue." }, url: "https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode", badge: "free" },
      { name: "GitHub Copilot",                      description: { en: "AI pair programmer. Useful for boilerplate, test generation and Apex class stubs.", fr: "IA de complétion de code. Utile pour le boilerplate, la génération de tests et les stubs Apex.", es: "IA de programación en pareja. Útil para código repetitivo, generación de tests y esqueletos de clases Apex." }, url: "https://github.com/features/copilot" },
      { name: "Windows Terminal",                    description: { en: "Multi-tab terminal with custom profiles for PowerShell, Git Bash, and Salesforce CLI.", fr: "Terminal multi-onglets avec profils personnalisés pour PowerShell, Git Bash et Salesforce CLI.", es: "Terminal multipestaña con perfiles personalizados para PowerShell, Git Bash y Salesforce CLI." }, url: "https://aka.ms/terminal", badge: "open-source" },
      { name: "One Dark Pro",                        description: { en: "VS Code color theme — good contrast and comfortable for long sessions.", fr: "Thème VS Code — bon contraste et confortable pour les longues sessions.", es: "Tema de color para VS Code — buen contraste y cómodo en sesiones largas." }, url: "https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme" },
    ],
  },
  {
    id: "salesforce",
    icon: "☁️",
    title: { en: "Salesforce Development", fr: "Développement Salesforce", es: "Desarrollo Salesforce" },
    items: [
      { name: "Salesforce CLI (sf)",                 description: { en: "Command-line interface for org management, deployments, scratch orgs, and CI/CD pipelines.", fr: "Interface CLI pour la gestion des orgs, les déploiements, les scratch orgs et les pipelines CI/CD.", es: "Interfaz de línea de comandos para la gestión de orgs, despliegues, scratch orgs y pipelines de CI/CD." }, url: "https://developer.salesforce.com/tools/salesforcecli", badge: "free" },
      { name: "Salesforce Inspector Reloaded",       description: { en: "Browser extension for inspecting org metadata, running SOQL queries and viewing field-level data.", fr: "Extension navigateur pour inspecter les métadonnées, lancer des requêtes SOQL et explorer les données.", es: "Extensión de navegador para inspeccionar metadatos de la org, ejecutar consultas SOQL y ver datos a nivel de campo." }, url: "https://github.com/tprouvot/Salesforce-Inspector-reloaded", badge: "open-source" },
      { name: "Workbench",                           description: { en: "Web-based SOQL/SOSL query tool, REST Explorer and metadata deploy/retrieve.", fr: "Outil web pour SOQL/SOSL, REST Explorer et déploiement/récupération de métadonnées.", es: "Herramienta web para SOQL/SOSL, REST Explorer y despliegue/recuperación de metadatos." }, url: "https://workbench.developerforce.com" },
      { name: "GitHub Actions",                      description: { en: "CI/CD for Salesforce deployments: validate on PRs, deploy on merge to main using Salesforce CLI.", fr: "CI/CD pour les déploiements Salesforce : validation sur les PR, déploiement sur merge via Salesforce CLI.", es: "CI/CD para despliegues Salesforce: validación en las PR, despliegue al fusionar a main mediante Salesforce CLI." }, url: "https://github.com/features/actions", badge: "free" },
      { name: "Trailhead",                           description: { en: "Salesforce's learning platform. Expeditioner rank — 94 badges, 59,775 points, 14 trails completed.", fr: "Plateforme d'apprentissage Salesforce. Rang Expeditioner — 94 badges, 59 775 points, 14 parcours.", es: "Plataforma de aprendizaje de Salesforce. Rango Expeditioner — 94 badges, 59.775 puntos, 14 rutas completadas." }, url: "https://trailhead.salesforce.com" },
      { name: "PMD Apex (Static Analysis)", description: { en: "Static analysis tool for Apex code — catches security issues, dead code, and performance anti-patterns.", fr: "Outil d'analyse statique pour Apex — détecte les failles de sécurité, le code mort et les anti-patterns de performance.", es: "Herramienta de análisis estático para código Apex — detecta problemas de seguridad, código muerto y anti-patrones de rendimiento." }, url: "https://pmd.github.io/latest/pmd_rules_apex.html", badge: "open-source" },
    ],
  },
  {
    id: "itops",
    icon: "🖥️",
    title: { en: "IT Ops & Systems", fr: "IT Ops & Systèmes", es: "IT Ops y Sistemas" },
    items: [
      { name: "VMware Workstation Pro 17",           description: { en: "Primary hypervisor for local lab environments — snapshots, nested virtualization, Windows Server, pfSense, Linux VMs.", fr: "Hyperviseur principal pour les lab locaux — snapshots, virtualisation imbriquée, Windows Server, pfSense, VMs Linux.", es: "Hipervisor principal para entornos de laboratorio locales — snapshots, virtualización anidada, Windows Server, pfSense, VMs Linux." }, url: "https://www.vmware.com/products/workstation-pro.html", badge: "commercial" },
      { name: "pfSense",                             description: { en: "Open-source firewall/router OS used for lab network segmentation and VPN configuration.", fr: "OS pare-feu/routeur open-source utilisé pour la segmentation réseau et la configuration VPN.", es: "Sistema operativo de firewall/router de código abierto usado para la segmentación de red del laboratorio y la configuración VPN." }, url: "https://www.pfsense.org", badge: "open-source" },
      { name: "Windows Server 2022",                 description: { en: "Primary server OS for Active Directory, GPO management, and DHCP/DNS lab setups.", fr: "OS serveur principal pour Active Directory, GPO et configurations lab DHCP/DNS.", es: "Sistema operativo de servidor principal para Active Directory, gestión de GPO y configuraciones de laboratorio DHCP/DNS." }, url: "https://www.microsoft.com/en-us/windows-server" },
      { name: "Datto RMM",                           description: { en: "Remote monitoring and management platform used for device supervision and automated runbooks.", fr: "Plateforme RMM utilisée pour la supervision des postes et les runbooks automatisés.", es: "Plataforma de supervisión y gestión remota usada para la supervisión de equipos y runbooks automatizados." }, url: "https://www.datto.com/rmm" },
      { name: "PowerShell",                          description: { en: "Scripting language for Windows automation — AD user provisioning, report generation, backups.", fr: "Langage de script Windows — provisioning utilisateurs AD, génération de rapports, sauvegardes.", es: "Lenguaje de scripting para automatización en Windows — aprovisionamiento de usuarios AD, generación de informes, copias de seguridad." }, url: "https://learn.microsoft.com/en-us/powershell", badge: "open-source" },
      { name: "Ansible", description: { en: "Agentless automation engine for configuration management, app deployment, and orchestration.", fr: "Moteur d'automatisation sans agent pour la gestion de configuration, le déploiement d'applications et l'orchestration.", es: "Motor de automatización sin agente para gestión de configuración, despliegue de aplicaciones y orquestación." }, url: "https://www.ansible.com", badge: "open-source" },
    ],
  },
  {
    id: "web",
    icon: "🌐",
    title: { en: "Web Development", fr: "Développement Web", es: "Desarrollo Web" },
    items: [
      { name: "Next.js",      description: { en: "React framework used for this portfolio — App Router, server components, API routes.", fr: "Framework React utilisé pour ce portfolio — App Router, composants serveur, routes API.", es: "Framework de React usado para este portfolio — App Router, componentes de servidor, rutas API." }, url: "https://nextjs.org", badge: "open-source" },
      { name: "Supabase",     description: { en: "PostgreSQL backend-as-a-service for the uptime history (status, incidents).", fr: "Backend PostgreSQL as-a-service pour l'historique de disponibilité (statut, incidents).", es: "Backend PostgreSQL as-a-service para el historial de disponibilidad (estado, incidencias)." }, url: "https://supabase.com", badge: "open-source" },
      { name: "Tailwind CSS", description: { en: "Utility-first CSS framework. Fast to write, easy to maintain, pairs well with dark mode.", fr: "Framework CSS utility-first. Rapide à écrire, facile à maintenir, idéal pour le dark mode.", es: "Framework CSS utility-first. Rápido de escribir, fácil de mantener, ideal para el modo oscuro." }, url: "https://tailwindcss.com", badge: "open-source" },
      { name: "Vercel",       description: { en: "Deployment platform for this portfolio — CI/CD on push, CDN, Cron jobs.", fr: "Plateforme de déploiement — CI/CD sur push, CDN, Cron jobs.", es: "Plataforma de despliegue de este portfolio — CI/CD en cada push, CDN, tareas Cron." }, url: "https://vercel.com" },
      { name: "Upstash Redis",description: { en: "Serverless Redis for API rate-limiting, cache (SWR), and uptime statistics.", fr: "Redis serverless pour le rate-limiting d'API, le cache (SWR) et les statistiques d'uptime.", es: "Redis serverless para el rate-limiting de API, la caché (SWR) y las estadísticas de uptime." }, url: "https://upstash.com" },
      { name: "TypeScript", description: { en: "Typed superset of JavaScript. Strict mode + editor integration dramatically reduces runtime errors.", fr: "Surcouche typée de JavaScript. Le mode strict et l'intégration IDE réduisent drastiquement les erreurs à l'exécution.", es: "Superconjunto tipado de JavaScript. El modo estricto y la integración con el editor reducen drásticamente los errores en tiempo de ejecución." }, url: "https://www.typescriptlang.org", badge: "open-source" },
      { name: "Jest + Testing Library", description: { en: "The go-to testing stack for React. Encourages tests that resemble how users interact with the UI.", fr: "La stack de test de référence pour React. Encourage des tests qui reflètent la façon dont les utilisateurs interagissent avec l'UI.", es: "La stack de pruebas de referencia para React. Fomenta pruebas que reflejan cómo interactúan los usuarios con la UI." }, url: "https://testing-library.com", badge: "open-source" },
    ],
  },
  {
    id: "learning",
    icon: "📚",
    title: { en: "References & Learning", fr: "Références & apprentissage", es: "Referencias y aprendizaje" },
    items: [
      { name: "Salesforce Developer Documentation", description: { en: "The authoritative reference for Apex, LWC, REST API, Metadata API, and Salesforce platform limits.", fr: "La référence officielle pour Apex, LWC, REST API, Metadata API et les limites de la plateforme Salesforce.", es: "La referencia oficial para Apex, LWC, REST API, Metadata API y los límites de la plataforma Salesforce." }, url: "https://developer.salesforce.com/docs", badge: "free" },
      { name: "MDN Web Docs", description: { en: "The definitive reference for HTML, CSS, JavaScript, and Web APIs. Bookmark it.", fr: "La référence incontournable pour HTML, CSS, JavaScript et les APIs web. À mettre en favoris.", es: "La referencia definitiva para HTML, CSS, JavaScript y las APIs web. Guárdala en favoritos." }, url: "https://developer.mozilla.org", badge: "free" },
      { name: "OWASP Top 10", description: { en: "The standard reference for web application security risks. Essential reading before shipping anything.", fr: "La référence standard pour les risques de sécurité des applications web. Lecture obligatoire avant tout déploiement.", es: "La referencia estándar de riesgos de seguridad en aplicaciones web. Lectura imprescindible antes de publicar nada." }, url: "https://owasp.org/www-project-top-ten/", badge: "free" },
      { name: "roadmap.sh", description: { en: "Visual learning roadmaps for frontend, backend, DevOps, and more. Great for structuring self-study.", fr: "Parcours d'apprentissage visuels pour frontend, backend, DevOps et plus. Idéal pour structurer une formation autonome.", es: "Rutas de aprendizaje visuales para frontend, backend, DevOps y más. Ideal para estructurar el autoaprendizaje." }, url: "https://roadmap.sh", badge: "free" },
      { name: "The Pragmatic Programmer", description: { en: "Timeless book on software craftsmanship — DRY, orthogonality, debugging, and professionalism.", fr: "Ouvrage intemporel sur l'artisanat logiciel — DRY, orthogonalité, débogage et professionnalisme.", es: "Libro atemporal sobre la artesanía del software — DRY, ortogonalidad, depuración y profesionalismo." }, url: "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/", badge: "book" },
    ],
  },
  {
    id: "productivity",
    icon: "🗂️",
    title: { en: "Productivity", fr: "Productivité", es: "Productividad" },
    items: [
      { name: "Notion",       description: { en: "Notes, project planning, runbook drafts and certification study notes.", fr: "Notes, planification de projets, brouillons de runbooks et fiches de révision de certifications.", es: "Notas, planificación de proyectos, borradores de runbooks y fichas de estudio para certificaciones." }, url: "https://www.notion.so" },
      { name: "Git + GitHub", description: { en: "Version control for all code projects. Conventional commits, branch strategies, CI via Actions.", fr: "Contrôle de version pour tous les projets. Commits conventionnels, stratégies de branches, CI via Actions.", es: "Control de versiones para todos los proyectos de código. Commits convencionales, estrategias de ramas, CI vía Actions." }, url: "https://github.com", badge: "free" },
      { name: "Figma",        description: { en: "UI mockups and wireframes before coding new features or blog article covers.", fr: "Maquettes et wireframes avant de coder de nouvelles fonctionnalités ou des couvertures d'articles.", es: "Maquetas y wireframes antes de programar nuevas funcionalidades o portadas de artículos del blog." }, url: "https://figma.com" },
      { name: "Proton Calendar", description: { en: "Booking page for calls with recruiters — linked from the contact section, zero-access encrypted, no third-party script on the portfolio.", fr: "Page de réservation pour les appels avec les recruteurs — liée depuis la section contact, chiffrée en accès zéro, sans script tiers sur le portfolio.", es: "Página de reservas para llamadas con reclutadores — enlazada desde la sección de contacto, con cifrado de acceso cero y sin scripts de terceros en el portfolio." }, url: "https://proton.me/calendar" },
    ],
  },
];

export default function UsesContent({ locale }: { locale: string }) {
  const safeLocale: Locale = locale === "fr" ? "fr" : locale === "es" ? "es" : "en";
  const isFr = locale === "fr";
  const isEs = locale === "es";

  // Open-source badge follows the track (Salesforce by default, IT Ops via
  // the `itops:` variant)
  const openSourceBadge =
    "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 itops:bg-violet-500/10 itops:text-violet-700 itops:dark:text-violet-300";

  const BADGE_CLASSES: Record<string, string> = {
    free:           "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    "open-source":  openSourceBadge,
    paid:           "bg-slate-500/10   text-slate-600   dark:text-slate-300",
    book:           "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  };

  // Card and link hover. dark:hover:border-* is needed, otherwise
  // dark:border-white/10 wins and the accent border never shows in dark mode.
  const cardHover  =
    "hover:border-cyan-400/40 dark:hover:border-cyan-400/40 " +
    "itops:hover:border-violet-400/40 itops:dark:hover:border-violet-400/40";
  const linkHover  =
    "hover:border-cyan-400/40 dark:hover:border-cyan-400/40 hover:text-cyan-700 dark:hover:text-cyan-300 " +
    "itops:hover:border-violet-400/40 itops:dark:hover:border-violet-400/40 itops:hover:text-violet-700 itops:dark:hover:text-violet-300";

  const labels = {
    title:    isFr ? "Setup & Outils" : isEs ? "Configuración y herramientas" : "Uses & Setup",
    intro:    isFr
      ? "Mon environnement de travail au quotidien — éditeur, outils Salesforce, IT Ops, et productivité. Inspiré de la convention"
      : isEs
      ? "Mi entorno de trabajo diario — editor, herramientas Salesforce, IT Ops y productividad. Inspirado en la convención"
      : "My daily working environment — editor, Salesforce tools, IT Ops, and productivity. Inspired by the",
    convention: "uses.tech",
    visit:    isFr ? "Visiter" : isEs ? "Visitar" : "Visit",
    backHome: isFr ? "← Retour à l'accueil" : isEs ? "← Volver al inicio" : "← Back to home",
  };

  function Badge({ label }: { label: string }) {
    return (
      <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${BADGE_CLASSES[label] ?? BADGE_CLASSES.paid}`}>
        {label}
      </span>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">

      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-muted-2">
        <Link href={`/${locale}`} className="hover:underline soft-ring rounded-sm px-1">
          {isFr ? "Accueil" : isEs ? "Inicio" : "Home"}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-muted">{labels.title}</span>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-semibold">{labels.title}</h1>
        <p className="mt-3 text-base text-muted max-w-2xl">
          {labels.intro}{" "}
          <a href="https://uses.tech" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:opacity-80">
            {labels.convention}
          </a>.
        </p>
      </header>

      <div className="space-y-12">
        {USES.map((cat) => (
          <section key={cat.id} aria-labelledby={`uses-${cat.id}`}>
            <div className="mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="text-2xl leading-none">{cat.icon}</span>
              <h2 id={`uses-${cat.id}`} className="text-xl font-semibold">{cat.title[safeLocale]}</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {cat.items.map((item) => (
                <article key={item.name} className={`flex flex-col gap-3 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/3 p-5 transition-colors ${cardHover}`}>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold leading-snug">{item.name}</h3>
                    {item.badge && <Badge label={item.badge} />}
                  </div>
                  <p className="flex-1 text-sm text-muted-2 leading-relaxed">{item.description[safeLocale]}</p>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${labels.visit} ${item.name} (${isFr ? "nouvel onglet" : isEs ? "nueva pestaña" : "new tab"})`}
                      className={`inline-flex items-center gap-1.5 self-start rounded-full border border-black/10 dark:border-white/10 px-3 py-1.5 text-xs font-medium text-muted-2 transition-colors soft-ring ${linkHover}`}
                    >
                      {labels.visit}<span aria-hidden="true"> ↗</span>
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-14 border-t border-black/10 dark:border-white/10 pt-8">
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-5 py-2.5 text-sm text-muted-2 hover:bg-black/5 dark:hover:bg-white/5 soft-ring transition-colors">
          {labels.backHome}
        </Link>
      </div>
    </div>
  );
}

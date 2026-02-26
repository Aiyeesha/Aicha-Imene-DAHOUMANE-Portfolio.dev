export type Project = {
  slug: string;
  title: string;
  excerpt: string;
  track: "salesforce" | "itops";
  categories: string[];
  tags: string[];
  badge?: { label: string; tone: "client" | "personal" | "training" };
  pdfUrl?: string;
  updatedAt?: string;
  /**
   * Highlights or outcomes for the project. Optional.
   */
  highlights?: string[];
};

const DEFAULT_UPDATED_AT = process.env.NEXT_PUBLIC_SITE_LASTMOD ?? "2025-02-04";

export const projects: Project[] = [
  {
    slug: "legarant-axg-salesforce-deployment",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Salesforce deployment with Heroku (Legarant‑AXG)",
    excerpt: "Deployment strategy and documentation: environments, release process, API tests, and production rollout with traceability.",
    highlights: [
      "Environment strategy (test → production) with traceability",
      "Deployment runbook + validation checklist",
      "API validation suite (Postman) for rollout"
    ],
    track: "salesforce",
    categories: ["Salesforce", "DevOps"],
    tags: ["Deployment", "Heroku", "Postman"],
    badge: {"label": "TRAINING PROJECT", "tone": "training"},
    pdfUrl: "/docs/projects/legarant-axg-salesforce-deployment/deployment.pdf",
  },
  {
    slug: "ltp-apex-backend-prototype",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Delivery tracking CRM design (LTP)",
    excerpt: "Salesforce solution blueprint for shipment tracking: data model (UML), security & sharing rules, and a realistic import strategy for high volumes, with an integration plan for 3 carriers.",
    highlights: [
      "UML data model + sharing rules blueprint",
      "High-volume import strategy (bulk + dedupe-ready)",
      "Integration plan for 3 carriers (API approach)"
    ],
    track: "salesforce",
    categories: ["Salesforce", "Architecture", "Security"],
    tags: ["UML", "Data Model", "Sharing", "Data Import", "Integration"],
    badge: {"label": "TRAINING PROJECT", "tone": "training"},
    pdfUrl: "/docs/projects/ltp-apex-backend-prototype/specifications.pdf",
  },
  {
    slug: "idemconnect-apex-backend",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Apex backend development (iDEM Connect)",
    excerpt: "Trigger, service layer, and batch/scheduler to manage subscriptions and contracts, with full documentation and >75% test coverage.",
    highlights: [
      "Trigger handlers + service layer (bulk-safe Apex)",
      "Batch/Scheduler for subscription lifecycle",
      ">75% test coverage + delivery documentation"
    ],
    track: "salesforce",
    categories: ["Salesforce", "Back-end"],
    tags: ["Apex", "Batch", "Testing"],
    badge: {"label": "TRAINING PROJECT", "tone": "training"},
    pdfUrl: "/docs/projects/idemconnect-apex-backend/cahier-des-charges.pdf",
  },
  {
    slug: "fasha-apex-backend-optimization",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Apex backend optimization (FASHA)",
    excerpt: "Backend reliability & performance improvements: weekly revenue batch optimization after price updates, safer updates to Accounts/Orders, and a clean refactor (bulk-safe Apex).",
    highlights: [
      "Weekly revenue batch optimized after price updates",
      "Safer bulk updates for Accounts/Orders",
      "Refactor for reliability + maintainability"
    ],
    track: "salesforce",
    categories: ["Salesforce", "Performance"],
    tags: ["Apex", "Optimization", "Batch"],
    badge: {"label": "TRAINING PROJECT", "tone": "training"},
    pdfUrl: "/docs/projects/fasha-apex-backend-optimization/p9-note-de-cadrage-p9-note-de-cadrage.pdf",
  },
  {
    slug: "wirebright-visualforce-to-lightning",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Visualforce to Lightning migration (WireBright)",
    excerpt: "Migration plan and execution: convert Visualforce pages and JavaScript buttons to Lightning, with specs and before/after evidence.",
    highlights: [
      "Visualforce/JS inventory and migration plan",
      "Lightning implementation path (modern UI patterns)",
      "Before/after validation evidence + specs"
    ],
    track: "salesforce",
    categories: ["Salesforce", "Migration"],
    tags: ["Lightning", "Visualforce", "Apex"],
    badge: {"label": "TRAINING PROJECT", "tone": "training"},
    pdfUrl: "/docs/projects/wirebright-visualforce-to-lightning/specifications.pdf",
  },
  {
    slug: "avenir-telecom-lightning-app",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Lightning app delivery & backlog (Avenir Télécom)",
    excerpt: "South zone Lightning app delivery with a Scrum product backlog + unit/integration test plan, then a Kanban evolutions backlog after a 3‑month pilot.",
    highlights: [
      "Scrum backlog + acceptance criteria for pilot",
      "Lightning app delivery for business zone rollout",
      "Test plan + Kanban evolutions backlog"
    ],
    track: "salesforce",
    categories: ["Salesforce", "Delivery"],
    tags: ["Lightning", "Scrum", "Kanban", "Backlog", "Testing"],
    badge: {"label": "TRAINING PROJECT", "tone": "training"},
    pdfUrl: "/docs/projects/avenir-telecom-lightning-app/cahier-des-charges.pdf",
  },
  {
    slug: "tours-for-life-salesforce-solution",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Salesforce solution design (Tours For Life)",
    excerpt: "End-to-end Salesforce solution design: Lead→Traveler conversion (Person Accounts), trip & fleet management, automation (Flow) and dashboards.",
    highlights: [
      "Lead → Traveler conversion with Person Accounts",
      "Trip + fleet management model + automation (Flow)",
      "Dashboards/reports + security model"
    ],
    track: "salesforce",
    categories: ["Salesforce", "Solution"],
    tags: ["Lead Conversion", "Person Accounts", "Data Model", "Flow", "Reports", "Security", "Fleet"],
    badge: {"label": "TRAINING PROJECT", "tone": "training"},
    pdfUrl: "/docs/projects/tours-for-life-salesforce-solution/specifications.pdf",
  },
  {
    slug: "digit-learning-salesforce-update",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Salesforce application update (Digit Learning)",
    excerpt:
      "Salesforce audit & modernization: multi-enrollment data model, automated enrollments (Flows), and management-ready reporting.",
    highlights: [
      "Org audit + modernization plan",
      "Multi-enrollment data model + automated Flows",
      "Management-ready reporting + quality checklist"
    ],
    track: "salesforce",
    categories: ["Salesforce", "Maintenance"],
    tags: ["Audit", "Automation", "Data Model", "Deployment", "Excel", "Quality"],
    badge: {"label": "TRAINING PROJECT", "tone": "training"},
  },
  {
    slug: "cicd-pipeline-setup",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "CI/CD pipeline setup",
    excerpt: "Multi-environment deployment pipeline design: branching strategy, validations, and automated deployments.",
    highlights: [
      "Branching strategy + environment promotions",
      "Automated validations + SFDX deployments",
      "Secrets management + rollback guidelines"
    ],
    track: "salesforce",
    categories: ["DevOps"],
    tags: ["CI/CD", "GitHub Actions", "Salesforce CLI"],
    badge: {"label": "PERSONAL PROJECT", "tone": "personal"},
  },
  {
    slug: "monitoring-automation-pack",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Monitoring & automation pack",
    excerpt: "IT Ops toolkit: alerting, dashboards, and automation scripts to reduce toil and improve reliability.",
    highlights: [
      "Alerting rules + baseline dashboards",
      "Automation scripts to reduce repetitive toil",
      "Runbooks for recurring incidents"
    ],
    track: "itops",
    categories: ["IT Ops", "Automation"],
    tags: ["Monitoring", "Runbooks", "Scripting"],
    badge: {"label": "PERSONAL PROJECT", "tone": "personal"},
  },
  {
    slug: "tssr-windows-autopilot-provisioning",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Windows Autopilot provisioning (Dell fleet)",
    excerpt: "Automated Windows provisioning at scale: hash collection, Intune/Autopilot workflow, drivers and activation validation.",
    highlights: [
      "Device hash collection + Autopilot enrollment",
      "Intune profiles + app provisioning workflow",
      "Drivers/activation validation checklist"
    ],
    track: "itops",
    categories: ["IT Ops", "Endpoint"],
    tags: ["Autopilot", "Intune", "Windows"],
    badge: {"label": "FIELD PRACTICE", "tone": "client"},
  },{
  slug: "tssr-secure-wipe-and-imaging",
  updatedAt: DEFAULT_UPDATED_AT,
  title: "Secure wipe & imaging (Blancco + Sysprep)",
  excerpt: "Device preparation at scale: certified wipe, reimaging with Sysprep, driver updates and Windows activation checks before delivery.",
  highlights: [
    "Certified wipe (Blancco) + compliance evidence",
    "Sysprep imaging workflow + driver updates",
    "Activation + Windows update validation"
  ],
  track: "itops",
  categories: ["IT Ops", "Endpoint", "Deployment"],
  tags: ["Blancco", "Sysprep", "Windows"],
  badge: {"label": "FIELD PRACTICE", "tone": "client"},
},

  {
    slug: "tssr-incident-management-rmm",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Incident handling with RMM & security tooling",
    excerpt: "Ticketing workflow, remote access and remediation: triage, investigation and whitelisting on security platform.",
    highlights: [
      "Ticket triage workflow + prioritization",
      "Remote remediation using RMM access",
      "Security platform investigation + whitelisting steps"
    ],
    track: "itops",
    categories: ["IT Ops", "Support"],
    tags: ["RMM", "Ticketing", "Security"],
    badge: {"label": "FIELD PRACTICE", "tone": "client"},
  },
  {
    slug: "tssr-acronis-backup-recovery",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Backup & recovery operations (Acronis)",
    excerpt: "Daily backup supervision and remediation: investigate failures, fix root causes (storage, network, corruption) and validate restores.",
    highlights: [
      "Daily backup supervision + failure triage",
      "Root-cause remediation (storage/network/corruption)",
      "Restore validation procedure + runbook"
    ],
    track: "itops",
    categories: ["IT Ops", "Backup", "Security"],
    tags: ["Acronis", "Backup", "Runbooks"],
    badge: {"label": "FIELD PRACTICE", "tone": "client"},
  },

  {
    slug: "tssr-virtualization-windows-server-2022",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Virtualization lab: Windows Server 2022 + ADDS",
    excerpt: "End‑to‑end lab build: VM networking, server install, static IP, VMware Tools, then AD DS/DNS/DHCP/WDS deployment tasks.",
    highlights: [
      "VM networking + Windows Server installation",
      "AD DS/DNS/DHCP base services configured",
      "WDS deployment tasks + validation"
    ],
    track: "itops",
    categories: ["Systems", "Virtualization"],
    tags: ["VMware", "Windows Server", "AD DS"],
    badge: {"label": "TRAINING LAB", "tone": "training"},
  },
  {
    slug: "tssr-pfsense-squid-proxy",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Network security lab: pfSense + Squid proxy",
    excerpt: "Secure internet access: WAN/LAN interfaces, proxy configuration, firewall rules, and client proxy settings with validation.",
    highlights: [
      "WAN/LAN setup + firewall hardening",
      "Squid proxy configuration + filtering",
      "Client proxy settings + connectivity validation"
    ],
    track: "itops",
    categories: ["Network", "Security"],
    tags: ["pfSense", "Squid", "Firewall"],
    badge: {"label": "TRAINING LAB", "tone": "training"},
  },
  {
    slug: "tai-disk-partition-backup-restore",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Disk partitioning & backup/restore (AOMEI + Windows Server Backup)",
    excerpt: "Partitioning workflow and backup strategy on client/server VMs: disk images, scheduling, and restoration readiness checks.",
    highlights: [
      "Partitioning workflow on client/server VMs",
      "Scheduled backups (images) + retention basics",
      "Restore readiness checks + documentation"
    ],
    track: "itops",
    categories: ["Systems", "Backup"],
    tags: ["AOMEI", "Windows Server", "Backup"],
    badge: {"label": "TRAINING LAB", "tone": "training"},
  },
  {
    slug: "tai-wifi-access-point-setup",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Wi‑Fi access point configuration",
    excerpt: "End‑to‑end configuration of a Wi‑Fi access point: router mode, WAN/LAN addressing, DHCP, SSID and security hardening.",
    highlights: [
      "WAN/LAN addressing + DHCP configuration",
      "SSID security hardening (WPA2/WPA3 where applicable)",
      "Connectivity + stability validation"
    ],
    track: "itops",
    categories: ["Network"],
    tags: ["Wi‑Fi", "DHCP", "Routing"],
    badge: {"label": "TRAINING LAB", "tone": "training"},
  },
  {
    slug: "tai-roaming-profile-adds",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Roaming profiles with Active Directory",
    excerpt: "Create a shared profiles folder, set share/NTFS permissions, configure AD user profile paths, and validate client roaming.",
    highlights: [
      "Share + NTFS permissions for profiles",
      "AD profile path configuration per user",
      "Client roaming validation + troubleshooting notes"
    ],
    track: "itops",
    categories: ["Systems", "Identity"],
    tags: ["AD DS", "Roaming Profiles", "Windows"],
    badge: {"label": "TRAINING LAB", "tone": "training"},
  },
  {
    slug: "tai-email-configuration-guide",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Outlook email configuration guide",
    excerpt: "Step‑by‑step script to help a user configure a mailbox in Outlook: account settings, automatic configuration and validation.",
    highlights: [
      "Step-by-step Outlook mailbox setup script",
      "Automatic setup + manual fallback guidance",
      "Validation checklist + common issue fixes"
    ],
    track: "itops",
    categories: ["Support"],
    tags: ["Outlook", "Email", "User Support"],
    badge: {"label": "TRAINING LAB", "tone": "training"},
  },
  {
    slug: "hemebiotech-java-debug",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Java debugging & refactor (Heme Biotech)",
    excerpt:
      "Bugfix and refactor of a Java symptom analytics app: correct counts, alphabetic output, and a maintainable OOP architecture.",
    highlights: [
      "Bugfix: correct counts + sorted output",
      "Refactor to maintainable OOP structure",
      "Javadoc + clean Git workflow"
    ],
    track: "itops",
    categories: ["Java", "Back-end", "Quality"],
    tags: ["Debugging", "OOP", "Git", "Javadoc"],
    badge: {"label": "TRAINING PROJECT", "tone": "training"},
    pdfUrl: "/docs/projects/hemebiotech-java-debug/deliverable.pdf",
  },
  {
    slug: "parkit-java-testing",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Java testing & TDD feature delivery (Parkit)",
    excerpt:
      "TDD-driven feature delivery (30-min free parking + 5% recurring discount), bugfixes and a full unit + integration test suite with JaCoCo/Surefire evidence.",
    highlights: [
      "TDD feature delivery (free + discount rules)",
      "Unit + integration test suite (JUnit/Mockito)",
      "JaCoCo/Surefire evidence for coverage and runs"
    ],
    track: "itops",
    categories: ["Java", "Testing", "Quality"],
    tags: ["JUnit", "Mockito", "TDD", "Maven", "JaCoCo", "Surefire"],
    badge: {"label": "TRAINING PROJECT", "tone": "training"},
    pdfUrl: "/docs/projects/parkit-java-testing/guide-etapes-cles.pdf",
  },
  {
    slug: "pochlib-ui",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "SPA front-end UI (Poch'Lib)",
    excerpt:
      "Single-page, mobile-first UI built from functional specs and wireframes: book search/add, list display/removal, DOM updates and Fetch-based API integration.",
    highlights: [
      "Mobile-first SPA from wireframes/specs",
      "Fetch-based API integration + DOM updates",
      "Sass structure + responsive UI behavior"
    ],
    track: "itops",
    categories: ["Web", "Front-end", "UI/UX"],
    tags: ["HTML", "Sass", "JavaScript", "SPA", "Responsive", "Fetch", "DOM"],
    badge: {"label": "TRAINING PROJECT", "tone": "training"},
    pdfUrl: "/docs/projects/pochlib-ui/functional-specs.pdf",
  },

  {
  slug: "tssr-hardware-upgrade-clone",
  updatedAt: DEFAULT_UPDATED_AT,
  title: "Laptop upgrade & system cloning",
  excerpt: "Hardware upgrade (SSD/RAM) with a safe backup/clone workflow, then validation and driver/Windows updates.",
  highlights: [
    "Safe backup/clone workflow before hardware change",
    "SSD/RAM upgrade + drivers/Windows updates",
    "Post-upgrade validation checklist"
  ],
  track: "itops",
  categories: ["IT Support", "Hardware"],
  tags: ["Acronis", "SSD", "RAM", "Windows"],
  badge: {"label": "TRAINING PROJECT", "tone": "training"},
},
{
  slug: "tssr-it-procurement-quote",
  updatedAt: DEFAULT_UPDATED_AT,
  title: "IT procurement quote (desktop + peripherals)",
  excerpt: "Requirements-to-bill-of-materials: select compatible components on a pro vendor site and produce a structured quote.",
  highlights: [
    "Requirements capture + sizing constraints",
    "Compatible bill of materials selection",
    "Structured quote (Excel) with justifications"
  ],
  track: "itops",
  categories: ["IT Support", "Operations"],
  tags: ["Procurement", "Sizing", "Excel"],
  badge: {"label": "TRAINING PROJECT", "tone": "training"},
},
];


// Pick 3 projects to highlight at the top of the Projects section.
// Customize these slugs to match your strongest case studies.
/**
 * Featured projects
 * ---------------
 * These are highlighted at the top of the Projects section.
 * Keep them aligned with the active "track" (Salesforce vs IT Ops).
 */
export const featuredProjectSlugsByTrack = {
  salesforce: [
    "ltp-apex-backend-prototype",
    "wirebright-visualforce-to-lightning",
    "idemconnect-apex-backend"
  ],
  itops: [
    "tssr-incident-management-rmm",
    "tssr-acronis-backup-recovery",
    "tssr-windows-autopilot-provisioning"
  ]
} as const;

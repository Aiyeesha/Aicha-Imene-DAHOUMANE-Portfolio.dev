export type Project = {
  slug: string;
  title: string;
  excerpt: string;
  track: "salesforce" | "itops";
  categories: string[];
  tags: string[];
  badge?: { label: string; tone: "client" | "personal" | "training" };
  pdfUrl?: string;
  repoUrl?: string;
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
    repoUrl: "https://github.com/Aiyeesha/legarant-axg-crm-sync",
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
    repoUrl: "https://github.com/Aiyeesha/iDEM-Connect",
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
    repoUrl: "https://github.com/Aiyeesha/FASHA",
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
    repoUrl: "https://github.com/Aiyeesha/WireBrite-Consulting-Migration-Backup",
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
    repoUrl: "https://github.com/Aiyeesha/Avenir-TELECOM",
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
  // ── IT OPS — 13 case studies ─────────────────────────────────────────────

  {
    slug: "workstation-mass-deployment",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Windows Autopilot & mass imaging (Dell fleet)",
    excerpt: "End-to-end workstation provisioning at MIDRANGE GROUP: Blancco certified wipe, Dell Image Assist WIM imaging, and Windows Autopilot enrollment for a 200+ laptop fleet.",
    highlights: [
      "200+ Dell laptops imaged and enrolled via Windows Autopilot",
      "Blancco certified secure wipe before each redeployment",
      "Dell Image Assist WIM restore workflow — MGEN client environment",
    ],
    track: "itops",
    categories: ["IT Ops", "Endpoint", "Deployment"],
    tags: ["Autopilot", "Blancco", "Windows", "Deployment"],
    badge: { label: "FIELD PRACTICE", tone: "client" },
  },
  {
    slug: "it-ops-incident-management",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "IT helpdesk & incident management (Autotask PSA)",
    excerpt: "Tier-1/2 support at MIDRANGE GROUP MSP: ticket triage, remote resolution via Splashtop, and time billing in Autotask PSA — 316 open tickets managed across the client portfolio.",
    highlights: [
      "316 open tickets managed across MSP client portfolio",
      "Remote triage and resolution via Splashtop + Autotask",
      "SLA-driven ticket lifecycle: triage → resolve → bill",
    ],
    track: "itops",
    categories: ["IT Ops", "IT Support", "Operations"],
    tags: ["Autotask", "Splashtop", "Ticketing", "RMM"],
    badge: { label: "FIELD PRACTICE", tone: "client" },
  },
  {
    slug: "hardware-upgrade-hp-laptop",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Laptop hardware upgrade (RAM + SSD)",
    excerpt: "Full hardware upgrade of an HP laptop: sourced compatible 32 GB DDR4 RAM and 2 TB Samsung SSD, Acronis drive clone for zero data loss, disassembly and post-upgrade validation.",
    highlights: [
      "32 GB DDR4 + 2 TB SSD replacement on HP laptop",
      "Acronis clone workflow — zero data loss",
      "Post-upgrade: RAM detected, clone intact, drivers updated",
    ],
    track: "itops",
    categories: ["IT Support", "Hardware"],
    tags: ["Acronis", "SSD", "RAM", "Windows"],
    badge: { label: "PERSONAL PROJECT", tone: "personal" },
  },
  {
    slug: "it-ops-rmm-supervision",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Remote monitoring & endpoint security (Datto RMM)",
    excerpt: "Daily fleet supervision at MIDRANGE GROUP: 550+ devices monitored in Datto RMM, antivirus coverage gaps closed via Quick Jobs, and client support delivered remotely via Splashtop.",
    highlights: [
      "550+ devices monitored — health, patch, antivirus at a glance",
      "MalwareBytes deployed on unprotected endpoints via Quick Jobs",
      "Client remote support via Splashtop — zero on-site travel",
    ],
    track: "itops",
    categories: ["IT Ops", "Operations", "IT Support"],
    tags: ["Datto RMM", "Monitoring", "Splashtop", "MalwareBytes"],
    badge: { label: "FIELD PRACTICE", tone: "client" },
  },
  {
    slug: "it-ops-acronis-backup",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Backup operations & alert triage (Acronis)",
    excerpt: "Daily backup monitoring at MIDRANGE GROUP: 105 protected endpoints across NAS and Acronis Cloud, 85 active alerts triaged, root causes identified and continuity restored.",
    highlights: [
      "105 endpoints protected — 85 alerts triaged and resolved",
      "Root-cause analysis: NAS full, server offline, plan corruption",
      "5 active plans (Toutes les VM, SQL-CLOUD 2…) continuity restored",
    ],
    track: "itops",
    categories: ["IT Ops", "Backup", "Operations"],
    tags: ["Acronis", "Backup", "NAS", "Monitoring"],
    badge: { label: "FIELD PRACTICE", tone: "client" },
  },
  {
    slug: "it-ops-virtualization-lab",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Virtualized lab: Windows Server 2022 + AD DS",
    excerpt: "Full virtual infrastructure on VMware Workstation Pro 17: 4 VMs (DCAD22, SRVWIN22, SRVSAMBADEBI, CL10) running AD DS, DNS, DHCP, WDS and Samba on a private 192.168.100.0/24 LAN.",
    highlights: [
      "4 VMs on VMware WS17: domain controller + file server + 2 clients",
      "AD DS + DNS + DHCP + WDS stack on Windows Server 2022",
      "WDS PXE boot: remote OS deployment validated from network",
    ],
    track: "itops",
    categories: ["IT Ops", "Systems", "Virtualization"],
    tags: ["VMware", "Windows Server", "AD DS", "WDS", "DHCP"],
    badge: { label: "TRAINING LAB", tone: "training" },
  },
  {
    slug: "it-ops-network-security",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "pfSense firewall + Squid transparent proxy",
    excerpt: "Network perimeter security lab: pfSense 2.6 VM as LAN gateway, firewall rules blocking server internet access, Squid + SquidGuard filtering, LightSquid reporting and internal CA for HTTPS inspection.",
    highlights: [
      "pfSense 2.6 routing + NAT for 192.168.100.0/24 via 4G WAN",
      "Squid transparent proxy + SquidGuard URL filtering + LightSquid",
      "Internal CA (Pfsense-CA, RSA 2048) for HTTPS SSL inspection",
    ],
    track: "itops",
    categories: ["IT Ops", "Network", "Security"],
    tags: ["pfSense", "Squid", "Firewall", "Routing", "Security"],
    badge: { label: "TRAINING LAB", tone: "training" },
  },
  {
    slug: "it-ops-disk-backup",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Disk backup & partition management (AOMEI + WSB)",
    excerpt: "Backup strategy on VMs: partition resize with AOMEI Partition Assistant, full disk image with AOMEI Backupper Standard, and scheduled Windows Server Backup on a Windows Server 2012 VM.",
    highlights: [
      "AOMEI Partition Assistant: partition E resized from 50 GB → 47.71 GB",
      "AOMEI Backupper: full disk backup image validated",
      "Windows Server Backup: daily schedule at 14:00 to DISK_01",
    ],
    track: "itops",
    categories: ["IT Ops", "Backup", "Systems"],
    tags: ["AOMEI", "Windows Server", "Backup", "Deployment"],
    badge: { label: "TRAINING LAB", tone: "training" },
  },
  {
    slug: "it-ops-workstation-setup",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Windows 10 provisioning + automated software install",
    excerpt: "Full workstation provisioning: clean Windows 10 install with custom partition, French OOBE configuration, then automated multi-app deployment using Ninite + Office 2016 in parallel.",
    highlights: [
      "Clean Windows 10 install + French region OOBE",
      "Ninite: Chrome, Firefox, LibreOffice, Malwarebytes in one pass",
      "Ninite + Office 2016 parallel deployment — setup time minimized",
    ],
    track: "itops",
    categories: ["IT Ops", "Endpoint", "Deployment"],
    tags: ["Windows", "Ninite", "Deployment", "Office"],
    badge: { label: "TRAINING LAB", tone: "training" },
  },
  {
    slug: "it-ops-wifi-config",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Wi-Fi access point configuration (TP-Link)",
    excerpt: "End-to-end TP-Link AP setup: WAN/LAN addressing, integrated DHCP server, SSID + WPA2-PSK security hardening — validated with a test device obtaining DHCP and reaching internet.",
    highlights: [
      "WAN (DHCP) + LAN/DHCP server configured on TP-Link AP",
      "SSID + WPA2-PSK encryption with custom passphrase",
      "Connectivity validated: DHCP address + internet access confirmed",
    ],
    track: "itops",
    categories: ["IT Ops", "Network"],
    tags: ["Wi-Fi", "DHCP", "Routing", "Security"],
    badge: { label: "TRAINING LAB", tone: "training" },
  },
  {
    slug: "it-ops-roaming-profiles",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Active Directory roaming profiles",
    excerpt: "Roaming profile infrastructure on ebtai.fr domain: shared folder with Modify permissions for EBTAI\\Utilisateurs, AD profile path configured, and profile auto-creation validated on user login.",
    highlights: [
      "Profil itinérant share: Modify + Read for EBTAI\\Utilisateurs",
      "AD profile path set → technicien.tai.V6 auto-created on login",
      "Roaming validated: profile syncs across domain workstations",
    ],
    track: "itops",
    categories: ["IT Ops", "Systems", "Identity"],
    tags: ["AD DS", "Roaming Profiles", "Windows"],
    badge: { label: "TRAINING LAB", tone: "training" },
  },
  {
    slug: "it-ops-hardware-procurement",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "IT hardware procurement quote (Excel devis)",
    excerpt: "Full procurement workflow for a mid-range workstation: requirements analysis, B2B component research (LDLC Pro, Materiel.net), compatibility validation, and Excel quote under 1 000 € ex-VAT.",
    highlights: [
      "CPU + 16 GB DDR4 + 512 GB NVMe SSD + 1 TB HDD — compatibility validated",
      "TPM 2.0 + Secure Boot + Windows 11 requirements confirmed",
      "Structured Excel devis (ref, unit HT, qty, total HT/TTC) — budget compliant",
    ],
    track: "itops",
    categories: ["IT Ops", "IT Support", "Operations"],
    tags: ["Procurement", "Sizing", "Excel"],
    badge: { label: "TRAINING LAB", tone: "training" },
  },
  {
    slug: "it-ops-email-config",
    updatedAt: DEFAULT_UPDATED_AT,
    title: "Outlook 2016 email provisioning (Day-1 onboarding)",
    excerpt: "Day-1 user onboarding scenario: Outlook 2016 account auto-configured via Exchange ActiveSync (tai7@outlook.fr), bidirectional test email validated — inbox ready in under 5 minutes.",
    highlights: [
      "Exchange ActiveSync account auto-configured — no manual server entry",
      "Bidirectional test email validated: tai7 ↔ tai12@outlook.fr",
      "Inbox, calendar and contacts operational in under 5 minutes",
    ],
    track: "itops",
    categories: ["IT Support", "Operations"],
    tags: ["Outlook", "Email", "Deployment"],
    badge: { label: "TRAINING LAB", tone: "training" },
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
    repoUrl: "https://github.com/Aiyeesha/Projet-12",
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
  slug: "python-password-checker",
  updatedAt: DEFAULT_UPDATED_AT,
  title: "Password Strength Analyzer (Python CLI)",
  excerpt: "CLI tool that scores password strength via entropy calculation, regex pattern detection, dictionary matching, and a HaveIBeenPwned API check using k-anonymity.",
  highlights: [
    "Entropy calculation + score 0–100 with crack-time estimates",
    "Regex-based pattern detection (sequences, keyboard walks, years…)",
    "HaveIBeenPwned API via k-anonymity — password never leaves the machine"
  ],
  track: "itops",
  categories: ["Security", "Development"],
  tags: ["Python", "Regex", "Security", "API", "CLI", "HaveIBeenPwned"],
  badge: { label: "PERSONAL PROJECT", tone: "personal" },
},
{
  slug: "python-network-scanner",
  updatedAt: DEFAULT_UPDATED_AT,
  title: "Network Scanner (FastAPI + React)",
  excerpt: "Real-time local network scanner: FastAPI backend with WebSocket streaming, concurrent port scanning, service & risk detection, and a React/Vite frontend with live results.",
  highlights: [
    "FastAPI backend with WebSocket real-time result streaming",
    "Concurrent port scan across 100+ known services with risk mapping",
    "React/Vite UI with live progress and host/port breakdown"
  ],
  track: "itops",
  categories: ["Network", "Security", "Development"],
  tags: ["Python", "FastAPI", "WebSocket", "React", "Vite", "Network Security"],
  badge: { label: "PERSONAL PROJECT", tone: "personal" },
},

// ── CYBERSECURITY DELIVERABLES ───────────────────────────────────────────────

{
  slug: "security-monitoring-dashboard",
  updatedAt: DEFAULT_UPDATED_AT,
  title: "Network Security Monitoring Dashboard",
  excerpt: "Designed and configured a real-time security monitoring dashboard: KPI widgets for patch status, threat indicators, and vulnerability trends across the infrastructure.",
  highlights: [
    "Real-time KPI widgets: open vulnerabilities, patch coverage, critical alerts",
    "Trend charts for threat indicators and security event history",
    "Centralized posture view for analyst and management reporting"
  ],
  track: "itops",
  categories: ["Security", "IT Ops", "Monitoring"],
  tags: ["Dashboard", "SIEM", "Monitoring", "Network Security", "Reporting"],
  badge: { label: "PERSONAL PROJECT", tone: "personal" },
  repoUrl: "https://github.com/Aiyeesha/security-monitoring-dashboard",
},
{
  slug: "vulnerability-assessment-report",
  updatedAt: DEFAULT_UPDATED_AT,
  title: "Vulnerability Assessment Report (Tenable SecurityCenter)",
  excerpt: "Structured vulnerability scan with Tenable SecurityCenter: executive summary, severity-ranked findings, port vulnerability details, and CVE-mapped remediation recommendations.",
  highlights: [
    "Tenable SecurityCenter scan — findings ranked by CVSS severity",
    "Executive summary + port vulnerability details report",
    "CVE-mapped remediation priorities with actionable guidance"
  ],
  track: "itops",
  categories: ["Security", "IT Ops"],
  tags: ["Vulnerability Assessment", "Tenable", "CVE", "CVSS", "Reporting"],
  badge: { label: "PERSONAL PROJECT", tone: "personal" },
  repoUrl: "https://github.com/Aiyeesha/vulnerability-assessment-report",
},
{
  slug: "incident-response-playbook",
  updatedAt: DEFAULT_UPDATED_AT,
  title: "Incident Response Playbook (Phishing)",
  excerpt: "Step-by-step phishing incident response playbook: detection, triage, containment, eradication, and recovery — with a decision flowchart for analyst guidance and escalation paths.",
  highlights: [
    "End-to-end IR flowchart: detect → triage → contain → eradicate → recover",
    "Decision logic at each stage for analyst triage",
    "Escalation paths and stakeholder communication guidelines"
  ],
  track: "itops",
  categories: ["Security", "IT Ops"],
  tags: ["Incident Response", "Phishing", "Playbook", "SOC", "Security"],
  badge: { label: "PERSONAL PROJECT", tone: "personal" },
  repoUrl: "https://github.com/Aiyeesha/incident-response-playbook",
},
{
  slug: "risk-assessment-matrix",
  updatedAt: DEFAULT_UPDATED_AT,
  title: "Risk Assessment Matrix (5×5)",
  excerpt: "Structured 5×5 risk assessment matrix: likelihood × impact scoring, color-coded severity zones (low/medium/high/critical), and a risk register template for IT and compliance use.",
  highlights: [
    "5×5 likelihood × impact matrix with color-coded severity zones",
    "Risk register template for tracking and prioritizing threats",
    "Applicable to IT infrastructure, cloud, and compliance assessments"
  ],
  track: "itops",
  categories: ["Security", "Risk Management"],
  tags: ["Risk Assessment", "GRC", "Compliance", "Risk Matrix", "Security"],
  badge: { label: "PERSONAL PROJECT", tone: "personal" },
  repoUrl: "https://github.com/Aiyeesha/risk-assessment-matrix",
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
    "it-ops-rmm-supervision",
    "it-ops-acronis-backup",
    "it-ops-network-security",
  ]
} as const;

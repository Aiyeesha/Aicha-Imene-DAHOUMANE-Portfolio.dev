// AUTO-GENERATED — do not hand-edit.
// Exported from Supabase (public.projects) by scripts/export-projects-from-supabase.ts.
// Re-run that script after any content change in Supabase to keep this file current.
// Last export: 2026-07-26T21:23:29.080Z
//
// Kept in sync so this file remains a safe fallback if the Supabase dependency
// is ever dropped, and so scripts/seed.ts (which reads this file) never
// re-publishes stale content over what's actually live.

export type Project = {
  slug: string;
  title: string | null;
  excerpt: string | null;
  track: string | null;
  categories: string[];
  tags: string[];
  badge?: { label: string; tone?: string; color?: string };
  pdfUrl?: string;
  repoUrl?: string;
  liveUrl?: string;
  techStack?: string[];
  updatedAt?: string;
  highlights?: string[];
  featured: boolean;
  sortOrder: number;
  status: string;
  isBridge?: boolean;
};

export const projects: Project[] = [
  {
    "slug": "hardware-upgrade-hp-laptop",
    "title": "HP Laptop Hardware Upgrade — RAM & SSD",
    "excerpt": "Full hardware upgrade of an HP laptop: sourced compatible 32 GB DDR4 RAM and 2 TB Samsung SSD, Acronis drive clone for zero data loss, disassembly and post-upgrade validation.",
    "track": "itops",
    "categories": [
      "IT Ops",
      "Hardware",
      "Maintenance"
    ],
    "tags": [
      "IT Ops",
      "Windows",
      "Hardware",
      "Backup"
    ],
    "badge": {
      "tone": "personal",
      "label": "Personal project"
    },
    "techStack": [
      "Acronis True Image",
      "Samsung SSD",
      "DDR4 RAM",
      "Windows Update"
    ],
    "highlights": [
      "RAM: 16 GB → 32 GB (2 × 16 GB DDR4) — no reinstall required",
      "Storage: 500 GB HDD → 2 TB Samsung SSD",
      "Acronis clone: original system preserved on new SSD, zero data loss",
      "Component compatibility verified before purchase",
      "Full driver and Windows update pass post-upgrade"
    ],
    "featured": false,
    "sortOrder": 70,
    "status": "published"
  },
  {
    "slug": "hemebiotech-java-debug",
    "title": "Java debugging & refactor (Heme Biotech)",
    "excerpt": "Bugfix and refactor of a Java symptom analytics app: correct counts, alphabetic output, and a maintainable OOP architecture.",
    "track": "itops",
    "categories": [
      "Development"
    ],
    "tags": [
      "Debugging",
      "OOP",
      "Git",
      "Javadoc"
    ],
    "badge": {
      "tone": "training",
      "label": "TRAINING PROJECT"
    },
    "repoUrl": "https://github.com/Aiyeesha/Hemebiotech",
    "techStack": [
      "Java",
      "Maven",
      "JUnit",
      "Debugging",
      "IntelliJ IDEA",
      "Log4j"
    ],
    "updatedAt": "2025-02-04T00:00:00+00:00",
    "highlights": [
      "Bug fixed via Map.merge() aggregation inside a TreeMap, which solves both counting and alphabetical sorting in a single structure",
      "Refactored into 4 classes + 2 interfaces (ISymptomReader/ISymptomWriter) — reading, counting and writing separated",
      "Full Javadoc + public GitHub repository (fork of the OpenClassrooms template)"
    ],
    "featured": false,
    "sortOrder": 200,
    "status": "published"
  },
  {
    "slug": "homelab-cowrie-honeypot",
    "title": "SSH/Telnet Honeypot with Cowrie",
    "excerpt": "Deployed a Cowrie honeypot on an isolated VMware lab to capture, log, and analyze an SSH brute-force attack — including a full rebuild of the attacker machine after a real incident.",
    "track": "itops",
    "categories": [
      "IT Ops",
      "Security",
      "Network"
    ],
    "tags": [
      "Honeypot",
      "Cowrie",
      "SSH",
      "Brute Force",
      "Log Analysis",
      "Blue Team",
      "Red Team"
    ],
    "badge": {
      "tone": "personal",
      "label": "PERSONAL PROJECT"
    },
    "techStack": [
      "Kali Linux",
      "Cowrie",
      "VMware Workstation Pro",
      "Python",
      "Hydra",
      "iptables",
      "jq"
    ],
    "highlights": [
      "Cowrie honeypot deployed and isolated on a dedicated VMnet2 network",
      "Hydra brute-force attack executed and analyzed (3 passwords recovered)",
      "17 attacker commands captured and parsed with jq",
      "Attacker VM fully rebuilt after a real incident"
    ],
    "featured": false,
    "sortOrder": 0,
    "status": "published"
  },
  {
    "slug": "homelab-network-sniffing",
    "title": "Network Sniffing: tcpdump, Wireshark & Scapy",
    "excerpt": "Captured and analyzed network traffic on an isolated lab to demonstrate why unencrypted protocols (HTTP, FTP) expose data in plaintext — including a custom Python sniffer built with Scapy.",
    "track": "itops",
    "categories": [
      "IT Ops",
      "Security",
      "Network"
    ],
    "tags": [
      "Sniffing",
      "Wireshark",
      "tcpdump",
      "Scapy",
      "Network Security",
      "Blue Team"
    ],
    "badge": {
      "tone": "personal",
      "label": "PERSONAL PROJECT"
    },
    "techStack": [
      "Kali Linux",
      "tcpdump",
      "Wireshark",
      "Scapy",
      "Python",
      "vsftpd"
    ],
    "highlights": [
      "ARP/ICMP, HTTP, and FTP traffic captured and analyzed on an isolated lab",
      "FTP credentials intercepted in plaintext (USER/PASS visible without any cracking tool)",
      "Custom Python network sniffer built with Scapy, tested on live traffic"
    ],
    "featured": false,
    "sortOrder": 0,
    "status": "published"
  },
  {
    "slug": "homelab-password-cracking-lab",
    "title": "Password Cracking: Hashing, Salting & Stretching",
    "excerpt": "Hands-on study of password storage (hashing, salting, stretching) with John the Ripper and Hashcat, including a measured MD5 vs bcrypt benchmark and full troubleshooting of a GPU-less Hashcat environment.",
    "track": "itops",
    "categories": [
      "IT Ops",
      "Security"
    ],
    "tags": [
      "Password Cracking",
      "Hashing",
      "John the Ripper",
      "Hashcat",
      "Cryptography",
      "OpenCL"
    ],
    "badge": {
      "tone": "personal",
      "label": "PERSONAL PROJECT"
    },
    "techStack": [
      "Kali Linux",
      "John the Ripper",
      "Hashcat",
      "OpenSSL",
      "Mesa OpenCL",
      "rockyou.txt"
    ],
    "highlights": [
      "Measured MD5 vs bcrypt benchmark (~25,900x factor)",
      "Full OpenCL/Mesa troubleshooting chain resolved without a dedicated GPU",
      "Multi-user case study: weak password cracked, long passphrase stayed out of reach",
      "Dictionary, rule-based, mask and brute-force attacks all documented"
    ],
    "featured": false,
    "sortOrder": 0,
    "status": "published"
  },
  {
    "slug": "it-ops-disk-backup",
    "title": "Disk Partitioning & Backup (AOMEI + Windows Server Backup)",
    "excerpt": "Backup strategy on VMs: partition resize with AOMEI Partition Assistant, full disk image with AOMEI Backupper Standard, and scheduled Windows Server Backup on a Windows Server 2012 VM.",
    "track": "itops",
    "categories": [
      "IT Ops",
      "Backup",
      "Systems"
    ],
    "tags": [
      "AOMEI",
      "Backup",
      "Windows Server",
      "Windows"
    ],
    "badge": {
      "tone": "training",
      "label": "TRAINING LAB"
    },
    "techStack": [
      "AOMEI Backupper",
      "Windows Server Backup",
      "Disk Management",
      "Partitioning"
    ],
    "highlights": [
      "Resized partition E: (50 GB → 47.71 GB) on a virtual disk using AOMEI Partition Assistant",
      "Created a full disk image backup with AOMEI Backupper Standard — operation completed successfully",
      "Installed the Windows Server Backup feature via Server Manager on Windows Server 2012",
      "Configured a scheduled daily VSS backup (14:00) to a dedicated virtual disk (22.67 GB transferred)",
      "Supervised by trainer Miguel MI-POUDOU — Greta du Val d'Oise, Lycée Louis Jouvet (Taverny)"
    ],
    "featured": false,
    "sortOrder": 80,
    "status": "published"
  },
  {
    "slug": "it-ops-roaming-profiles",
    "title": "Configuring AD DS Roaming Profiles",
    "excerpt": "Roaming profile infrastructure on ebtai.fr domain: shared folder with Modify permissions for EBTAI\\Utilisateurs, AD profile path configured, and profile auto-creation validated on user login.",
    "track": "itops",
    "categories": [
      "IT Ops",
      "Identity",
      "Systems"
    ],
    "tags": [
      "AD DS",
      "Roaming Profiles",
      "Windows Server"
    ],
    "badge": {
      "tone": "training",
      "label": "TRAINING LAB"
    },
    "techStack": [
      "Active Directory",
      "Windows Server",
      "Group Policy",
      "AD DS",
      "SYSVOL"
    ],
    "highlights": [
      "Created shared folder \"Profil itinérant\" on the server with permissions: EBTAI\\\\Utilisateurs (Modify + Read)",
      "Configured NTFS Full Control permissions for profile folder ownership",
      "Set user profile path in AD Users & Computers: \\\\\\\\DC1\\\\Profil itinérants\\\\%username%",
      "Verified roaming profile creation: technicien.tai.V6 folder appeared in share after first client login",
      "Domain: ebtai.fr — supervised by trainer Marc HAZAN"
    ],
    "featured": false,
    "sortOrder": 110,
    "status": "published"
  },
  {
    "slug": "it-ops-virtualization-lab",
    "title": "Maintaining a Virtualized IT Environment",
    "excerpt": "Full virtual infrastructure on VMware Workstation Pro 17: 4 VMs (DCAD22, SRVWIN22, SRVSAMBADEBI, CL10) running AD DS, DNS, DHCP, WDS and Samba file sharing on a private 192.168.100.0/24 LAN.",
    "track": "itops",
    "categories": [
      "IT Ops",
      "Systems",
      "Virtualization"
    ],
    "tags": [
      "VMware",
      "Windows Server",
      "AD DS",
      "DHCP",
      "Roaming Profiles",
      "Deployment",
      "Windows"
    ],
    "badge": {
      "tone": "training",
      "label": "TRAINING LAB"
    },
    "techStack": [
      "VMware",
      "Hyper-V",
      "VirtualBox",
      "Virtualization",
      "Windows Server",
      "Snapshots"
    ],
    "highlights": [
      "Designed the full network architecture on a VMware NAT segment (192.168.100.0/24)",
      "Deployed AD DS, DNS, DHCP, and WDS roles on a single Windows Server 2022 VM",
      "Automated OS provisioning via PXE boot (WDS + DHCP option 060 PXEClient)",
      "Applied GPOs, roaming profiles, and a mapped shared drive (\\\\DCAD22\\Partage)",
      "Joined a Windows 10 client to the domain with admin-controlled WDS approval"
    ],
    "featured": false,
    "sortOrder": 50,
    "status": "published"
  },
  {
    "slug": "it-ops-workstation-setup",
    "title": "Workstation Setup: Windows 10 Install & Software Deployment",
    "excerpt": "Full workstation provisioning: clean Windows 10 install with custom partition, French OOBE configuration, then automated multi-app deployment using Ninite + Office 2016 in parallel.",
    "track": "itops",
    "categories": [
      "IT Ops",
      "Deployment",
      "Software"
    ],
    "tags": [
      "Windows",
      "Deployment"
    ],
    "badge": {
      "tone": "client",
      "label": "Field practice"
    },
    "techStack": [
      "Windows 10",
      "SCCM",
      "Software Deployment",
      "IT Support",
      "Ghost",
      "Sysprep"
    ],
    "highlights": [
      "Modified BIOS boot order to boot from USB and performed a clean Windows 10 Pro 64-bit install",
      "Verified drivers (audio, network, GPU) post-installation",
      "Deployed multiple applications simultaneously via Ninite (no toolbars, unattended)",
      "Installed Office 2016 Professional Plus with activation key provided by trainer",
      "Configured backup, personalization, and user account settings to finalize the workstation"
    ],
    "featured": false,
    "sortOrder": 90,
    "status": "published"
  },
  {
    "slug": "parkit-java-testing",
    "title": "Java testing & TDD feature delivery (Parkit)",
    "excerpt": "TDD-driven feature delivery (30-min free parking + 5% recurring discount), bugfixes and a full unit + integration test suite with JaCoCo/Surefire evidence.",
    "track": "itops",
    "categories": [
      "Development"
    ],
    "tags": [
      "JUnit",
      "Mockito",
      "TDD",
      "Maven",
      "JaCoCo",
      "Surefire"
    ],
    "badge": {
      "tone": "training",
      "label": "TRAINING PROJECT"
    },
    "repoUrl": "https://github.com/Aiyeesha/ParkingSystem",
    "techStack": [
      "Java",
      "JUnit 5",
      "Mockito",
      "TDD",
      "Maven",
      "IntelliJ IDEA"
    ],
    "updatedAt": "2025-02-04T00:00:00+00:00",
    "highlights": [
      "TDD feature delivery (free + discount rules)",
      "Unit + integration test suite (JUnit/Mockito)",
      "JaCoCo/Surefire evidence for coverage and runs"
    ],
    "featured": false,
    "sortOrder": 210,
    "status": "published"
  },
  {
    "slug": "pochlib-ui",
    "title": "SPA front-end UI (Poch'Lib)",
    "excerpt": "Single-page, mobile-first UI built from functional specs and wireframes: book search/add, list display/removal, DOM updates and Fetch-based API integration.",
    "track": "itops",
    "categories": [
      "Development"
    ],
    "tags": [
      "HTML",
      "Sass",
      "JavaScript",
      "SPA",
      "Responsive",
      "Fetch",
      "DOM"
    ],
    "badge": {
      "tone": "training",
      "label": "TRAINING PROJECT"
    },
    "repoUrl": "https://github.com/Aiyeesha/PochLib",
    "liveUrl": "https://aiyeesha.github.io/PochLib/",
    "techStack": [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "REST API",
      "SPA"
    ],
    "updatedAt": "2025-02-04T00:00:00+00:00",
    "highlights": [
      "Mobile-first SPA built from wireframes and functional specs, with zero JS framework",
      "Google Books API integration (Fetch) + list persistence via sessionStorage",
      "Code split into 3 ES6 modules (application.js, search.js, util.js) + structured SASS"
    ],
    "featured": false,
    "sortOrder": 220,
    "status": "published"
  },
  {
    "slug": "python-network-scanner",
    "title": "Network Scanner (FastAPI + React)",
    "excerpt": "Real-time local network scanner: FastAPI backend with WebSocket streaming, concurrent port scanning, service & risk detection, and a React/Vite frontend.",
    "track": "itops",
    "categories": [
      "Development"
    ],
    "tags": [
      "Python",
      "FastAPI",
      "WebSocket",
      "React",
      "Vite",
      "Network Security"
    ],
    "badge": {
      "tone": "personal",
      "label": "Personal project"
    },
    "repoUrl": "https://github.com/Aiyeesha/Python-network-scanner-project",
    "techStack": [
      "Python",
      "FastAPI",
      "WebSocket",
      "React",
      "Vite",
      "Network Security"
    ],
    "featured": false,
    "sortOrder": 240,
    "status": "published"
  },
  {
    "slug": "python-password-checker",
    "title": "Password Strength Analyzer (Python CLI)",
    "excerpt": "CLI tool scoring password strength via entropy calculation, regex pattern detection, dictionary matching, and a HaveIBeenPwned API check using k-anonymity.",
    "track": "itops",
    "categories": [
      "Development"
    ],
    "tags": [
      "Python",
      "Regex",
      "Security",
      "API",
      "CLI",
      "HaveIBeenPwned"
    ],
    "badge": {
      "tone": "personal",
      "label": "Personal project"
    },
    "repoUrl": "https://github.com/Aiyeesha/Python-Password-Checker-project",
    "techStack": [
      "Python",
      "Regex",
      "Security",
      "API",
      "CLI",
      "HaveIBeenPwned"
    ],
    "featured": false,
    "sortOrder": 230,
    "status": "published"
  },
  {
    "slug": "risk-assessment-matrix",
    "title": "Matrice de Risques — Interactive Risk Register (Rebuilt)",
    "excerpt": "Ground-up rebuild of an earlier risk-matrix prototype: a vanilla-JS risk register with a live 5×5 Likelihood × Impact heat map, persisted client-side via localStorage, plus a tested Python CLI for bulk import and HTML report generation.",
    "track": "itops",
    "categories": [
      "Security",
      "Risk Management"
    ],
    "tags": [
      "Risk Assessment",
      "GRC",
      "Python CLI",
      "localStorage"
    ],
    "badge": {
      "tone": "personal",
      "label": "PERSONAL PROJECT"
    },
    "repoUrl": "https://github.com/Aiyeesha/matrice-risques",
    "liveUrl": "https://aiyeesha.github.io/matrice-risques/",
    "techStack": [
      "JavaScript",
      "HTML",
      "CSS",
      "Python",
      "Jinja2",
      "Pytest"
    ],
    "highlights": [
      "5×5 Likelihood × Impact heat map with automatic scoring (1-25) — click a cell to filter the register",
      "Client-side persistence via localStorage — the register survives a page reload",
      "In-place editing of existing risks, not just add/remove",
      "Python CLI (argparse + Jinja2) generates a standalone HTML report from a JSON risk register, or scores a single risk on demand",
      "6 pytest tests covering the scoring engine, level boundaries, and example-data validation"
    ],
    "featured": false,
    "sortOrder": 290,
    "status": "published"
  },
  {
    "slug": "security-monitoring-dashboard",
    "title": "Security Monitoring Dashboard (FastAPI + React)",
    "excerpt": "Full-stack security monitoring dashboard built with FastAPI and React/TypeScript. Streams security events in real time via WebSocket, classifies alerts by severity, and tracks MTTR — now with SQLite persistence, API-key-protected ingestion, and a Pytest test suite.",
    "track": "itops",
    "categories": [
      "Security",
      "Monitoring"
    ],
    "tags": [
      "FastAPI",
      "React",
      "WebSocket",
      "SQLite",
      "Pytest"
    ],
    "badge": {
      "tone": "personal",
      "label": "PERSONAL PROJECT"
    },
    "repoUrl": "https://github.com/Aiyeesha/security-monitoring-dashboard",
    "techStack": [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "SQLite",
      "React",
      "TypeScript",
      "WebSocket",
      "Vite",
      "Docker",
      "Pytest"
    ],
    "highlights": [
      "Real-time security event streaming via WebSocket",
      "Alert severity classification: Critical / High / Medium / Low / Info",
      "SQLite persistence + API-key-protected ingestion (added in a backend restructure)",
      "Pytest suite covering events and metrics endpoints",
      "Dark-theme responsive UI — one-command Docker Compose deployment"
    ],
    "featured": false,
    "sortOrder": 280,
    "status": "published"
  },
  {
    "slug": "second-brain-claude-code",
    "title": "Second Brain 2.0 — Claude Code + Notion",
    "excerpt": "Persistent memory system coupling Claude Code CLI and Notion: the AI automatically reads and enriches a personal knowledge base between sessions.",
    "track": "itops",
    "categories": [],
    "tags": [
      "Claude Code",
      "Notion",
      "MCP",
      "AI",
      "Productivity",
      "Automation"
    ],
    "badge": {
      "color": "amber",
      "label": "In Progress"
    },
    "featured": false,
    "sortOrder": 5,
    "status": "draft"
  },
  {
    "slug": "it-ops-rmm-supervision",
    "title": "Infrastructure Monitoring with Datto RMM",
    "excerpt": "Daily fleet supervision at MIDRANGE GROUP: 550+ devices monitored in Datto RMM, antivirus coverage gaps closed via Quick Jobs, and client support delivered remotely via Splashtop.",
    "track": "itops",
    "categories": [
      "IT Ops",
      "Operations",
      "IT Support"
    ],
    "tags": [
      "RMM",
      "Monitoring",
      "Windows",
      "User Support",
      "Ticketing"
    ],
    "badge": {
      "tone": "client",
      "label": "Field practice"
    },
    "techStack": [
      "Datto RMM",
      "Autotask",
      "Windows Server",
      "Monitoring",
      "ITSM"
    ],
    "highlights": [
      "Monitored 550+ devices (desktops, laptops, servers) across multiple client sites via Datto RMM dashboard",
      "Checked patch status, antivirus coverage, and software inventory for managed endpoints",
      "Deployed software components (MalwareBytes) remotely via Quick Jobs without on-site intervention",
      "Used Splashtop remote access to assist end users and troubleshoot issues on client machines",
      "Worked within the Exploitation team of a real MSP alongside a senior SysAdmin"
    ],
    "featured": true,
    "sortOrder": 10,
    "status": "published"
  },
  {
    "slug": "workstation-mass-deployment",
    "title": "Mass Workstation Deployment — 264 Dell Devices",
    "excerpt": "End-to-end workstation provisioning at MIDRANGE GROUP: Blancco certified wipe, Dell Image Assist WIM imaging, and Windows Autopilot enrollment for a 200+ laptop fleet.",
    "track": "itops",
    "categories": [
      "IT Ops",
      "Deployment",
      "Endpoint"
    ],
    "tags": [
      "IT Ops",
      "Windows",
      "Deployment",
      "Intune",
      "Security"
    ],
    "badge": {
      "tone": "client",
      "label": "Field practice"
    },
    "techStack": [
      "Windows Autopilot",
      "Microsoft Intune",
      "Dell ImageAssist",
      "Blancco",
      "Sysprep",
      "WinPE / DISM",
      "Microsoft Entra ID",
      "PowerShell"
    ],
    "highlights": [
      "64 Dell Optiplex — Blancco NIST 800-88 erasure + Sysprep golden image",
      "200 Dell Latitude — zero-touch Autopilot via Dell ImageAssist",
      "Hands-on IT time per Latitude post-setup: < 5 minutes",
      "Blancco compliance certificates generated for every wiped device",
      "Intune: deployment profiles, BitLocker, Defender, update rings"
    ],
    "featured": true,
    "sortOrder": 20,
    "status": "published"
  },
  {
    "slug": "it-ops-incident-management",
    "title": "IT Incident Management — Autotask, Webroot & Datto RMM",
    "excerpt": "Tier-1/2 support at MIDRANGE GROUP MSP: ticket triage, remote resolution via Splashtop, and time billing in Autotask PSA — 316 open tickets managed across the client portfolio.",
    "track": "itops",
    "categories": [
      "IT Ops",
      "IT Support"
    ],
    "tags": [
      "IT Ops",
      "ITSM",
      "Security",
      "RMM",
      "Windows"
    ],
    "badge": {
      "tone": "client",
      "label": "Field practice"
    },
    "techStack": [
      "Autotask",
      "Datto RMM",
      "Webroot",
      "ITSM",
      "Windows Server",
      "Ticketing"
    ],
    "highlights": [
      "Ticket triage via Autotask (phone / email / Datto RMM agent)",
      "Remote diagnosis via Datto RMM — no on-site intervention needed",
      "Webroot false positive resolved by URL suppression from management console",
      "Client access restored without reinstalling or reconfiguring Webroot",
      "Resolution documented in Autotask time entry for billing and audit trail"
    ],
    "featured": true,
    "sortOrder": 30,
    "status": "published"
  },
  {
    "slug": "it-ops-acronis-backup",
    "title": "Cloud Backup Supervision with Acronis Cyber Backup",
    "excerpt": "Daily backup monitoring at MIDRANGE GROUP: 105 protected endpoints across NAS and Acronis Cloud, 85 active alerts triaged, root causes identified (NAS full, plan corruption, network issues) and continuity restored.",
    "track": "itops",
    "categories": [
      "IT Ops",
      "Backup",
      "Operations"
    ],
    "tags": [
      "Acronis",
      "Backup",
      "Monitoring",
      "Windows Server"
    ],
    "badge": {
      "tone": "client",
      "label": "Field practice"
    },
    "techStack": [
      "Acronis Cyber Backup",
      "Windows Server",
      "Backup & Recovery",
      "Cloud Storage"
    ],
    "highlights": [
      "Monitored 105 protected devices across 5 backup plans (VMs, SQL, Exchange) in Acronis Cyber Backup",
      "Diagnosed 85 alerts (33 errors, 52 warnings) and identified root causes: full disks, offline servers, corrupted plans, network failures",
      "Recreated corrupted backup plans with corrected naming conventions to restore continuity",
      "Managed two NAS destinations (10.5 Tio each) and a cloud location (250 Gio) via Acronis",
      "Used Datto RMM / Splashtop to remotely access client servers during investigations"
    ],
    "featured": true,
    "sortOrder": 40,
    "status": "published"
  },
  {
    "slug": "it-ops-network-security",
    "title": "Securing Internet Access with pfSense & Squid",
    "excerpt": "Network perimeter security lab: pfSense 2.6 VM as LAN gateway, firewall rules blocking server internet access, Squid + SquidGuard transparent proxy with URL filtering, LightSquid reporting and internal CA for HTTPS inspection.",
    "track": "itops",
    "categories": [
      "IT Ops",
      "Network",
      "Security"
    ],
    "tags": [
      "pfSense",
      "Squid",
      "Firewall",
      "Routing",
      "Security"
    ],
    "badge": {
      "tone": "personal",
      "label": "Personal project"
    },
    "techStack": [
      "pfSense",
      "Squid Proxy",
      "Firewall",
      "Network Security",
      "VPN",
      "FreeBSD"
    ],
    "highlights": [
      "Deployed pfSense 2.6 with dual NIC: WAN bridged to 4G modem, LAN on VMnet8 (192.168.100.0/24)",
      "Created IP aliases (SRV, Client) and firewall rules blocking servers from direct internet access",
      "Installed and configured Squid transparent proxy with SquidGuard URL filtering",
      "Generated a self-signed internal CA (Pfsense-CA) for HTTPS inspection",
      "Validated traffic control: server-to-internet blocked, LAN clients routed through proxy"
    ],
    "featured": true,
    "sortOrder": 50,
    "status": "published"
  },
  {
    "slug": "nextjs-admin-dashboard",
    "title": "Admin Dashboard — Next.js 16 + Supabase",
    "excerpt": "Secure admin dashboard protected by HTTP Basic Auth, powered by a Supabase service_role client. Visualize projects, contact messages, certifications and testimonials — no extra dependencies.",
    "track": "itops",
    "categories": [
      "Development"
    ],
    "tags": [
      "Next.js",
      "Supabase",
      "Dashboard",
      "Security",
      "Web"
    ],
    "badge": {
      "tone": "personal",
      "label": "Personal project"
    },
    "repoUrl": "https://github.com/Aiyeesha/portfolio-next",
    "techStack": [
      "Next.js 16",
      "Supabase",
      "TypeScript",
      "Tailwind CSS",
      "HTTP Basic Auth",
      "Edge Runtime"
    ],
    "highlights": [
      "HTTP Basic Auth on Edge runtime (atob — no Buffer needed)",
      "Supabase service_role bypasses RLS to read private contact messages",
      "100% Server Components — zero client JavaScript",
      "No extra npm packages: proxy.ts + env vars is all it takes",
      "robots: index: false — never indexed by search engines"
    ],
    "featured": true,
    "sortOrder": 60,
    "status": "published"
  },
  {
    "slug": "incident-management-dashboard",
    "title": "Incident Management Dashboard — Next.js, Supabase & TypeScript",
    "excerpt": "Admin-only tool that turns a written incident-response playbook into an operational workflow: create an incident by type, get an auto-generated response checklist grouped by phase, track completion and status in real time.",
    "track": "itops",
    "categories": [
      "IT Ops",
      "Incident Management",
      "Security"
    ],
    "tags": [
      "Next.js",
      "Supabase",
      "TypeScript",
      "PostgreSQL",
      "Security",
      "Dashboard"
    ],
    "badge": {
      "tone": "professional",
      "label": "TOOL"
    },
    "repoUrl": "https://github.com/Aiyeesha/playbook-reponse-incidents",
    "techStack": [
      "Next.js 16",
      "Supabase",
      "PostgreSQL",
      "TypeScript",
      "Server Actions",
      "Row Level Security"
    ],
    "highlights": [
      "Auto-generates a phase-grouped response checklist from a real incident-response playbook",
      "New Postgres tables with RLS deny-all — service_role access only, same pattern as the rest of /admin",
      "Server Actions re-check Basic Auth server-side, in addition to the existing middleware guard",
      "Pure progress/grouping functions kept free of server-only imports — unit-tested without mocks",
      "Covers all 6 incident types from the companion playbook repo: malware, ransomware, data breach, phishing, unauthorized access, DoS/DDoS"
    ],
    "featured": false,
    "sortOrder": 85,
    "status": "draft"
  },
  {
    "slug": "it-ops-wifi-config",
    "title": "Wi-Fi Access Point Configuration (TP-Link)",
    "excerpt": "End-to-end TP-Link AP setup: WAN/LAN addressing, integrated DHCP server, SSID + WPA2-PSK security hardening — validated with a test device obtaining DHCP and reaching internet.",
    "track": "itops",
    "categories": [
      "IT Ops",
      "Network"
    ],
    "tags": [
      "Wi‑Fi",
      "DHCP",
      "Routing"
    ],
    "badge": {
      "tone": "training",
      "label": "TRAINING LAB"
    },
    "highlights": [
      "Connected to access point default IP and logged in with factory credentials",
      "Configured router mode: WAN IP via DHCP, LAN static IP with DHCP scope enabled",
      "Set up SSID, WPA2 security type, and Wi-Fi password",
      "Configured optional static DHCP leases using client MAC addresses",
      "Verified internet connectivity and access point status after saving configuration"
    ],
    "featured": false,
    "sortOrder": 100,
    "status": "published"
  },
  {
    "slug": "it-ops-hardware-procurement",
    "title": "Hardware Procurement: Drafting a Multi-PC Quote",
    "excerpt": "Full procurement workflow for a mid-range workstation: requirements analysis, B2B component research (LDLC Pro, Materiel.net), compatibility validation, and Excel quote under 1 000 € ex-VAT.",
    "track": "itops",
    "categories": [
      "IT Ops",
      "Hardware"
    ],
    "tags": [
      "Procurement",
      "Sizing",
      "Excel"
    ],
    "badge": {
      "tone": "training",
      "label": "TRAINING LAB"
    },
    "highlights": [
      "Researched compatible desktop components on LDLC Pro based on client specifications",
      "Selected and compared components (case, motherboard, CPU, RAM, storage, PSU) for multiple units",
      "Compiled a structured procurement quote in Excel with part references, unit prices, and totals",
      "Presented the quote to the trainer for review and validation",
      "Group exercise (team of 4) — Greta du Val d'Oise, supervised by Julien CHARLES-NICOLAS"
    ],
    "featured": false,
    "sortOrder": 120,
    "status": "published"
  },
  {
    "slug": "it-ops-email-config",
    "title": "Configuring Outlook 2016 Email Account",
    "excerpt": "Day-1 user onboarding scenario: Outlook 2016 account auto-configured via Exchange ActiveSync (tai7@outlook.fr), bidirectional test email validated — inbox ready in under 5 minutes.",
    "track": "itops",
    "categories": [
      "IT Ops",
      "IT Support"
    ],
    "tags": [
      "Outlook",
      "Email"
    ],
    "badge": {
      "tone": "training",
      "label": "TRAINING LAB"
    },
    "highlights": [
      "Drafted a user support script covering the full Outlook 2016 account setup procedure",
      "Launched Outlook, navigated to File → Account Settings → New to add a new email account",
      "Configured automatic account setup: name, email address (tai7@outlook.fr), and password",
      "Verified successful configuration and received a test email from tai12@outlook.fr",
      "Supervised by trainer Julien CHARLES-NICOLAS — Greta du Val d'Oise"
    ],
    "featured": false,
    "sortOrder": 130,
    "status": "published"
  },
  {
    "slug": "cyber-soc-curriculum",
    "title": "Cyber Curriculum — 70 SOC Projects",
    "excerpt": "Practical cybersecurity training program: 70 hands-on projects covering SIEM, threat hunting, incident response, forensics and red team basics.",
    "track": "itops",
    "categories": [],
    "tags": [
      "Cybersecurity",
      "SOC",
      "SIEM",
      "Splunk",
      "Wazuh",
      "Elastic",
      "Python",
      "Threat Hunting"
    ],
    "badge": {
      "color": "amber",
      "label": "In Progress"
    },
    "featured": false,
    "sortOrder": 260,
    "status": "draft"
  },
  {
    "slug": "vulnerability-assessment-report",
    "title": "Vulnerability Assessment Tool (Python + CVSS)",
    "excerpt": "Python CLI tool that runs modular vulnerability assessments (network, system, web) and generates self-contained HTML reports with CVSS v3.1 base scores, risk-prioritized findings, and JSON export for SIEM/ticketing integration.",
    "track": "itops",
    "categories": [
      "Security"
    ],
    "tags": [],
    "badge": {
      "tone": "personal",
      "label": "Personal — In Progress"
    },
    "repoUrl": "https://github.com/Aiyeesha/vulnerability-assessment-report",
    "techStack": [
      "Python",
      "Jinja2",
      "CVSS v3.1",
      "JSON",
      "HTML/CSS",
      "subprocess"
    ],
    "highlights": [
      "Modular check system: network, system configuration, and web application scans",
      "Automatic CVSS v3.1 base score calculation per finding",
      "Risk-prioritized output: Critical / High / Medium / Low / Informational",
      "Self-contained HTML report with inline CSS — no external dependencies",
      "JSON export compatible with SIEM and ticketing platforms"
    ],
    "featured": false,
    "sortOrder": 260,
    "status": "published"
  },
  {
    "slug": "incident-response-tracker",
    "title": "Incident Response Tracker — SOC Ticketing Workflow",
    "excerpt": "Ticketing workflow for security incidents enforcing a strict lifecycle via a state machine, a per-severity SLA clock, and a timestamped audit trail of every status change, comment, and assignment.",
    "track": "itops",
    "categories": [
      "Security",
      "Incident Response"
    ],
    "tags": [
      "State Machine",
      "SLA",
      "FastAPI",
      "React",
      "Audit Trail"
    ],
    "badge": {
      "tone": "personal",
      "label": "PERSONAL PROJECT"
    },
    "repoUrl": "https://github.com/Aiyeesha/incident-response-tracker",
    "techStack": [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "React",
      "TypeScript",
      "Vite",
      "SQLite",
      "Docker",
      "Pytest"
    ],
    "highlights": [
      "Enforced lifecycle: new → triaged → investigating → contained → resolved → closed, illegal transitions rejected with HTTP 409",
      "Per-severity SLA clock: critical 4h, high 24h, medium 72h, low 7 days",
      "Full audit trail — every status change, comment, and assignment timestamped",
      "15 automated tests, including pure unit tests of the state machine with zero database dependency",
      "Verified live: an illegal new→resolved transition correctly rejected with a 409 and the allowed-states list"
    ],
    "featured": false,
    "sortOrder": 261,
    "status": "published"
  },
  {
    "slug": "cve-watchlist",
    "title": "CVE Watchlist — Real-Time NVD Vulnerability Triage",
    "excerpt": "Vulnerability triage dashboard syncing real CVE data from the public NVD API, ranked by a transparent priority-scoring engine that cross-references CVSS severity with CISA's Known Exploited Vulnerabilities (KEV) catalog.",
    "track": "itops",
    "categories": [
      "Security",
      "Vulnerability Management"
    ],
    "tags": [
      "NVD API",
      "CVSS",
      "CISA KEV",
      "FastAPI",
      "React"
    ],
    "badge": {
      "tone": "personal",
      "label": "PERSONAL PROJECT"
    },
    "repoUrl": "https://github.com/Aiyeesha/cve-watchlist",
    "techStack": [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "httpx",
      "React",
      "TypeScript",
      "Vite",
      "SQLite",
      "Docker",
      "Pytest"
    ],
    "highlights": [
      "Live sync against the public NVD REST API v2.0 — no mock data",
      "Transparent 0-100 priority score: CVSS base score + CISA KEV exploitation flag + attack vector + recency",
      "Cross-references NVD's cisaExploitAdd field to flag actively-exploited CVEs with remediation deadlines",
      "13 automated tests, including a fully mocked NVD client for deterministic CI runs",
      "Verified live: synced 100 real CVEs including a Spring Data RCE scored 89/100"
    ],
    "featured": false,
    "sortOrder": 262,
    "status": "published"
  },
  {
    "slug": "log-anomaly-detector",
    "title": "Log Anomaly Detector — Rule-Based Auth Log Analysis",
    "excerpt": "Rule-based detection engine for authentication logs, surfacing brute-force attempts, impossible-travel logins, credential-stuffing bursts, and off-hours access — each rule a pure, unit-tested function with zero I/O.",
    "track": "itops",
    "categories": [
      "Security",
      "Detection Engineering"
    ],
    "tags": [
      "Anomaly Detection",
      "Brute Force",
      "FastAPI",
      "React"
    ],
    "badge": {
      "tone": "personal",
      "label": "PERSONAL PROJECT"
    },
    "repoUrl": "https://github.com/Aiyeesha/log-anomaly-detector",
    "techStack": [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "React",
      "TypeScript",
      "Vite",
      "SQLite",
      "Docker",
      "Pytest"
    ],
    "highlights": [
      "Four independent detection rules: brute force, impossible travel, credential stuffing, off-hours access",
      "Anomaly deduplication — a rule will not re-fire for the same subject within its own time window",
      "Deterministic demo scenario reproducibly triggers all four rules — verified live, including dedup on replay",
      "20 automated tests, all 4 rules unit-tested via plain event dicts — zero database or clock dependency",
      "Generates alerts by reasoning over sequences of events, instead of just displaying pre-existing ones"
    ],
    "featured": false,
    "sortOrder": 263,
    "status": "published"
  },
  {
    "slug": "cosmonote-clone",
    "title": "Cosmonote Clone — AI Meeting Transcription",
    "excerpt": "Functional clone of Cosmonote: automatic audio transcription via Whisper, AI meeting summaries, Supabase storage and Next.js interface.",
    "track": "itops",
    "categories": [],
    "tags": [
      "Next.js",
      "OpenAI",
      "Whisper",
      "Supabase",
      "AI",
      "Transcription",
      "TypeScript"
    ],
    "badge": {
      "color": "blue",
      "label": "Coming Soon"
    },
    "featured": false,
    "sortOrder": 265,
    "status": "draft"
  },
  {
    "slug": "incident-response-playbook",
    "title": "Incident Response Playbook (SOC)",
    "excerpt": "A set of structured playbooks designed for SOC teams and IT admins covering the 6 most common cybersecurity incidents. Each playbook follows the full IR lifecycle: Detection → Triage → Containment → Eradication → Recovery → Lessons Learned.",
    "track": "itops",
    "categories": [
      "Security"
    ],
    "tags": [],
    "badge": {
      "tone": "personal",
      "label": "Personal — In Progress"
    },
    "repoUrl": "https://github.com/Aiyeesha/incident-response-playbook",
    "techStack": [
      "Incident Response",
      "SOC",
      "ITIL",
      "Markdown",
      "Cybersecurity",
      "Documentation"
    ],
    "highlights": [
      "6 playbooks covering malware, ransomware, data breach, phishing, unauthorized access, and denial of service",
      "Full IR lifecycle: Detection → Triage → Containment → Eradication → Recovery → Lessons Learned",
      "Severity classification and escalation procedures included",
      "Reusable incident report and post-mortem templates, plus a RACI matrix and crisis communication template",
      "Designed for SMB to mid-market SOC environments"
    ],
    "featured": false,
    "sortOrder": 270,
    "status": "published"
  },
  {
    "slug": "risque360",
    "title": "risque360 — STRIDE Threat Modeling, Vendor Risk & Incident Recalibration",
    "excerpt": "Unified risk register combining three sources under one Likelihood × Impact scoring engine: STRIDE threat modeling per application component, vendor/third-party risk scored by a transparent heuristic, and an incident log that suggests a probability recalibration over a rolling 12-month window — never applied without an explicit click.",
    "track": "itops",
    "categories": [
      "Security",
      "Risk Management"
    ],
    "tags": [
      "STRIDE",
      "Threat Modeling",
      "Vendor Risk",
      "GRC",
      "Python CLI"
    ],
    "badge": {
      "tone": "personal",
      "label": "PERSONAL PROJECT"
    },
    "repoUrl": "https://github.com/Aiyeesha/risque360",
    "liveUrl": "https://aiyeesha.github.io/risque360/",
    "techStack": [
      "JavaScript",
      "HTML",
      "CSS",
      "Python",
      "Jinja2",
      "Pytest"
    ],
    "highlights": [
      "STRIDE threat modeling: turn an application component + threat category into a scored, trackable risk",
      "Vendor/third-party risk scored by a transparent heuristic (access level + questionnaire status + known incidents), always editable afterward",
      "Incident log recalibrates probability over a rolling 12-month window (3-5 incidents: +1, 6+: +2) — proposed, never auto-applied",
      "Python CLI mirrors the recalibration logic exactly (--recalibrer), plus HTML report generation",
      "6 pytest tests, including one verifying the recalibration preview never mutates the risk it evaluates"
    ],
    "featured": false,
    "sortOrder": 300,
    "status": "published"
  },
  {
    "slug": "bdr-prospection-tool",
    "title": "BdR Prospection Tool — Salesforce Outreach",
    "excerpt": "Personal project: automatic Salesforce lead scoring, Outreach.io sequences and pipeline dashboards built entirely with native Salesforce stack.",
    "track": "salesforce",
    "categories": [],
    "tags": [
      "Salesforce",
      "Apex",
      "LWC",
      "Flows",
      "Outreach.io",
      "Sales Ops",
      "Automation"
    ],
    "badge": {
      "color": "green",
      "label": "Delivered v1"
    },
    "featured": false,
    "sortOrder": -5,
    "status": "draft"
  },
  {
    "slug": "avenir-telecom-lightning-app",
    "title": "Lightning app delivery & backlog (Avenir Télécom)",
    "excerpt": "Scrum product backlog (20 user stories) and test plan for Avenir Télécom's field Lightning app, with real-time DeviQo integration and Dev Org hardening, then a Kanban evolutions backlog after an audit and a 3-month pilot.",
    "track": "salesforce",
    "categories": [
      "Salesforce",
      "Delivery"
    ],
    "tags": [
      "Lightning",
      "Scrum",
      "Kanban",
      "Backlog",
      "Testing"
    ],
    "badge": {
      "tone": "training",
      "label": "TRAINING PROJECT"
    },
    "pdfUrl": "/docs/projects/avenir-telecom-lightning-app/strategy-implementation.pdf",
    "repoUrl": "https://github.com/Aiyeesha/Avenir-TELECOM",
    "techStack": [
      "Salesforce",
      "LWC",
      "Lightning App Builder",
      "Agile",
      "Scrum",
      "Jira"
    ],
    "updatedAt": "2025-02-04T00:00:00+00:00",
    "highlights": [
      "20 costed and prioritized user stories (SIREN webservice validation, real-time DeviQo quotes <2s, auto PDF + email generation, GDPR purge)",
      "Test plan with 20 test classes and an Apex best-practices reference (bulkification, one trigger per object, ≥75% coverage)",
      "Post-pilot Kanban backlog: 3 evolutions, 3 fixes and 3 production bugs tracked (E1-E3, C1-C3, B001-B003)"
    ],
    "featured": false,
    "sortOrder": 10,
    "status": "published"
  },
  {
    "slug": "digit-learning-salesforce-update",
    "title": "Salesforce application update (Digit Learning)",
    "excerpt": "Internal quality audit and Salesforce modernization for Digit Learning: a new Purchased Training junction object to lift the \"one student = one training\" limitation, automated enrollment and mentor assignment, and 3 new management reports.",
    "track": "salesforce",
    "categories": [
      "Salesforce",
      "Maintenance"
    ],
    "tags": [
      "Audit",
      "Automation",
      "Data Model",
      "Deployment",
      "Excel",
      "Quality"
    ],
    "badge": {
      "tone": "training",
      "label": "TRAINING PROJECT"
    },
    "techStack": [
      "Salesforce",
      "Apex",
      "LWC",
      "SOQL",
      "Git",
      "Triggers"
    ],
    "updatedAt": "2025-02-04T00:00:00+00:00",
    "highlights": [
      "Audit finding fixed: a student could only be linked to a single training — resolved with a Purchased Training junction object (master-detail)",
      "Measured processing time: mentor assignment + enrollment down from 30+ min to 5 min/student, catalog management from 30+ min to 15 min",
      "3 reports delivered: available seats per training, students by status/mentor, prospect → active client conversion rate"
    ],
    "featured": false,
    "sortOrder": 20,
    "status": "published"
  },
  {
    "slug": "tours-for-life-salesforce-solution",
    "title": "Salesforce solution design (Tours For Life)",
    "excerpt": "Salesforce Sales Cloud solution design for Tours for Life: Person Accounts for the Prospect → Traveler conversion, separate Trip / Purchased Trip / Bus Fleet objects, Flow automations (seat decrement, confirmation email) and a North/South role-based security model.",
    "track": "salesforce",
    "categories": [
      "Salesforce",
      "Solution"
    ],
    "tags": [
      "Lead Conversion",
      "Person Accounts",
      "Data Model",
      "Flow",
      "Reports",
      "Security",
      "Fleet"
    ],
    "badge": {
      "tone": "training",
      "label": "TRAINING PROJECT"
    },
    "pdfUrl": "/docs/projects/tours-for-life-salesforce-solution/specifications.pdf",
    "techStack": [
      "Salesforce",
      "Sales Cloud",
      "Flow Builder",
      "Reports & Dashboards",
      "Data Modeling"
    ],
    "updatedAt": "2025-02-04T00:00:00+00:00",
    "highlights": [
      "4-object data model: Prospect (Lead), Traveler (Person Account), distinct Trip and Purchased Trip objects, Bus Fleet linked to multiple trips",
      "2 production Flows: automatic available-seats decrement + confirmation email on prospect status change",
      "North/South role-based security with Sharing Rules, per-object OWD (Private / Public Read-Only / Controlled by Parent)"
    ],
    "featured": false,
    "sortOrder": 30,
    "status": "published"
  },
  {
    "slug": "idemconnect-apex-backend",
    "title": "Apex backend development (iDEM Connect)",
    "excerpt": "Full Apex backend (trigger + handlers, batch, scheduler) for iDEM Connect: 3 business rules implemented, 23 tests at 100% pass rate, 90% org-wide coverage, structured technical documentation with a requirements-to-tests traceability matrix.",
    "track": "salesforce",
    "categories": [
      "Salesforce",
      "Back-end",
      "Security"
    ],
    "tags": [
      "Apex",
      "Batch",
      "Testing"
    ],
    "badge": {
      "tone": "training",
      "label": "TRAINING PROJECT"
    },
    "pdfUrl": "/docs/projects/idemconnect-apex-backend/documentation.pdf",
    "repoUrl": "https://github.com/Aiyeesha/iDEM-Connect",
    "techStack": [
      "Salesforce",
      "Apex",
      "REST API",
      "SOQL",
      "Integration",
      "Web Services"
    ],
    "updatedAt": "2025-02-04T00:00:00+00:00",
    "highlights": [
      "3 business rules (RG-01/02/03) implemented via a strict trigger-handler pattern, zero logic in the trigger",
      "Batch + Scheduler for the monthly automatic re-engagement of dormant accounts, with configurable deduplication",
      "23 unit tests, 100% pass rate, 90% org-wide coverage — per-class breakdown documented",
      "Security enforced throughout: WITH SECURITY_ENFORCED, stripInaccessible, explicit CRUD/FLS checks wherever the aggregate query can''t cover them"
    ],
    "featured": true,
    "sortOrder": 1,
    "status": "published"
  },
  {
    "slug": "wirebright-visualforce-to-lightning",
    "title": "Visualforce to Lightning migration (WireBright)",
    "excerpt": "Technical specifications and Classic-to-Lightning migration prototype for EG Manufacture: converting a Visualforce page into a Lightning Web Component and a JavaScript button into an Aura Quick Action, with detailed cost estimates and risk management.",
    "track": "salesforce",
    "categories": [
      "Salesforce",
      "Migration"
    ],
    "tags": [
      "Lightning",
      "Visualforce",
      "Apex"
    ],
    "badge": {
      "tone": "training",
      "label": "TRAINING PROJECT"
    },
    "pdfUrl": "/docs/projects/wirebright-visualforce-to-lightning/specifications.pdf",
    "repoUrl": "https://github.com/Aiyeesha/WireBrite-Consulting-Migration-Backup-Visualforce-jsbProject-",
    "techStack": [
      "Salesforce",
      "LWC",
      "Visualforce",
      "Apex",
      "Lightning Design System",
      "Migration"
    ],
    "updatedAt": "2025-02-04T00:00:00+00:00",
    "highlights": [
      "AccountOpportunitiesSearch LWC prototype (dynamic opportunity search) + AccountOpportunitiesController Apex class",
      "UpdateLeadStatus Aura Quick Action prototype, replacing a JavaScript button incompatible with Lightning",
      "Detailed cost estimate (17 dev days) and per-component risk matrix with mitigation strategies"
    ],
    "featured": true,
    "sortOrder": 2,
    "status": "published"
  },
  {
    "slug": "ltp-apex-backend-prototype",
    "title": "Delivery tracking CRM design (LTP)",
    "excerpt": "Complete design of a multi-carrier Salesforce delivery-tracking backend for Le Temps des Papillons: real-time architecture (Apex REST webhook + Queueable + LWC) for 2 carriers, Talend/Bulk API v2 batch flow for the 3rd, zone-based security model and import strategy for 2.1M accounts.",
    "track": "salesforce",
    "categories": [
      "Salesforce",
      "Architecture",
      "Security"
    ],
    "tags": [
      "UML",
      "Data Model",
      "Sharing",
      "Data Import",
      "Integration"
    ],
    "badge": {
      "tone": "training",
      "label": "TRAINING PROJECT"
    },
    "pdfUrl": "/docs/projects/ltp-apex-backend-prototype/specifications.pdf",
    "repoUrl": "https://github.com/Aiyeesha/Optimisez-un-backend-Apex",
    "techStack": [
      "Salesforce",
      "Apex",
      "SOQL",
      "Data Modeling",
      "CRM",
      "Triggers"
    ],
    "updatedAt": "2025-02-04T00:00:00+00:00",
    "highlights": [
      "Real-time architecture: Apex REST webhook (DeliveryWebhook) + Platform Event + limit-aware Queueable (RefreshStatusQueueable) + deliveryTracker LWC",
      "Batch integration: Talend + Bulk API v2, 500,000 lines/hour, upsert on External Id (Tracking_Number__c)",
      "Zone-based security model: single profile + roles + sharing rules, targeted FLS (locked Zone__c, masked financial fields)",
      "Import strategy for 2.1M accounts / 3.2M contacts with a validated dependency order across 10 objects"
    ],
    "featured": true,
    "sortOrder": 3,
    "status": "published"
  },
  {
    "slug": "fasha-apex-backend-optimization",
    "title": "Apex backend optimization (FASHA)",
    "excerpt": "Audited and fixed a buggy Apex backend for FASHA: a trigger that broke past 100 orders per account, an amount calculation that silently failed on bulk import, code with no reliable tests — full refactor into a bulk-safe handler pattern, >85% coverage.",
    "track": "salesforce",
    "categories": [
      "Salesforce",
      "Performance"
    ],
    "tags": [
      "Apex",
      "Optimization",
      "Batch"
    ],
    "badge": {
      "tone": "training",
      "label": "TRAINING PROJECT"
    },
    "repoUrl": "https://github.com/Aiyeesha/FASHA",
    "techStack": [
      "Salesforce",
      "Apex",
      "SOQL",
      "Triggers",
      "Batch Apex",
      "Governor Limits"
    ],
    "updatedAt": "2025-02-04T00:00:00+00:00",
    "highlights": [
      "Real bug diagnosed and fixed: the original trigger specifically failed once an account had more than 100 orders (not bulk-safe)",
      "Second bug: the NetAmount calculation worked from the UI but silently broke on bulk Data Loader imports",
      "Full refactor into a handler pattern (AccountService, OrderTriggerHandler, TriggerHelper) + async processing (@future, Batch, Scheduler)",
      ">85% test coverage with TestDataFactory, up from unreliable tests at the start"
    ],
    "featured": true,
    "sortOrder": 4,
    "status": "published"
  },
  {
    "slug": "legarant-axg-salesforce-deployment",
    "title": "Salesforce deployment with Heroku (Legarant‑AXG)",
    "excerpt": "Deployment strategy and documentation: environments, release process, API tests, and production rollout with traceability.",
    "track": "salesforce",
    "categories": [
      "Salesforce",
      "DevOps",
      "Security"
    ],
    "tags": [
      "Deployment",
      "Heroku",
      "Postman"
    ],
    "badge": {
      "tone": "training",
      "label": "TRAINING PROJECT"
    },
    "repoUrl": "https://github.com/Aiyeesha/legarant-axg-crm-sync",
    "techStack": [
      "Salesforce",
      "Heroku",
      "Heroku Connect",
      "PostgreSQL",
      "CI/CD",
      "Git"
    ],
    "updatedAt": "2025-02-04T00:00:00+00:00",
    "highlights": [
      "🔗 Proof point: Salesforce dev + Heroku infra delivered together, not two separate skillsets",
      "Security: scoped OAuth tokens, no secrets in code, GDPR-safe intra-EU data flow",
      "Environment strategy (test → production) with traceability",
      "Deployment runbook + validation checklist",
      "API validation suite (Postman) for rollout"
    ],
    "featured": true,
    "sortOrder": 5,
    "status": "published",
    "isBridge": true
  },
  {
    "slug": "cicd-pipeline-setup",
    "title": "CI/CD Pipeline — Multi-environment Salesforce Deployment",
    "excerpt": "Design and implementation of a complete Salesforce CI/CD pipeline: Git branching strategy, automated Apex validations and continuous deployments via GitHub Actions across sandbox and production.",
    "track": "salesforce",
    "categories": [
      "DevOps"
    ],
    "tags": [
      "CI/CD",
      "GitHub Actions",
      "Salesforce CLI"
    ],
    "badge": {
      "tone": "personal",
      "label": "Personal project"
    },
    "techStack": [
      "Salesforce DX",
      "GitHub Actions",
      "Gearset",
      "CI/CD",
      "Git",
      "Sandbox Management"
    ],
    "updatedAt": "2025-02-04T00:00:00+00:00",
    "highlights": [
      "Branching strategy + environment promotions",
      "Automated validations + SFDX deployments",
      "Secrets management + rollback guidelines"
    ],
    "featured": true,
    "sortOrder": 6,
    "status": "published"
  },
  {
    "slug": "crm-healthcare-salesforce",
    "title": "CRM Healthcare — Patient & Appointment Management",
    "excerpt": "Building a complete Healthcare CRM on a Salesforce Developer Org — from scratch to reporting dashboard — with a business data model, advanced security, and automation.",
    "track": "salesforce",
    "categories": [],
    "tags": [
      "CRM",
      "Healthcare",
      "Salesforce Admin",
      "Flow Builder",
      "Data Modeling",
      "Security"
    ],
    "badge": {
      "tone": "personal",
      "label": "Personal — In Progress"
    },
    "liveUrl": "https://medicare-solutions-port-dev-ed.develop.my.salesforce.com/",
    "techStack": [
      "Salesforce",
      "Flow Builder",
      "Apex",
      "Data Modeling",
      "Profiles & Permission Sets",
      "Validation Rules",
      "Reports & Dashboards"
    ],
    "highlights": [
      "6 custom objects and 41 business fields",
      "4 profiles and 1 Permission Set",
      "6 Validation Rules",
      "2 Salesforce Flows (Screen + Record-Triggered)"
    ],
    "featured": false,
    "sortOrder": 40,
    "status": "draft"
  },
  {
    "slug": "industrak-salesforce",
    "title": "IndusTrak — Salesforce FSL Portfolio",
    "excerpt": "Full Salesforce Field Service Lightning demo for the industrial sector: dispatching, SLAs, field intervention management.",
    "track": "salesforce",
    "categories": [],
    "tags": [
      "Salesforce",
      "FSL",
      "Field Service",
      "Apex",
      "LWC",
      "Flows"
    ],
    "badge": {
      "color": "blue",
      "label": "Coming Soon"
    },
    "techStack": [
      "Salesforce",
      "FSL",
      "Field Service Lightning",
      "Apex",
      "Flow Builder",
      "LWC"
    ],
    "featured": false,
    "sortOrder": 99,
    "status": "draft"
  },
  {
    "slug": "nova-manufacturing-classic-to-lightning",
    "title": "Salesforce Classic to Lightning Experience Migration (Nova Manufacturing)",
    "excerpt": "Full Classic to Lightning migration for an international industrial equipment manufacturer (~150 sales reps across 3 sites/hubs in Europe): rebuilt Visualforce pages and JS buttons as LWC/Flow, and systematically hardened legacy Apex security (with sharing, stripInaccessible, consolidating 14 profiles into 5 Permission Set Groups).",
    "track": "salesforce",
    "categories": [
      "Salesforce",
      "Architecture",
      "Security",
      "Migration"
    ],
    "tags": [
      "Apex",
      "LWC",
      "Flow",
      "Security",
      "Migration"
    ],
    "badge": {
      "tone": "anonymized",
      "label": "ANONYMIZED ENGAGEMENT"
    },
    "techStack": [
      "Lightning Web Components",
      "Apex",
      "SOQL",
      "Flow",
      "Permission Set Groups",
      "Named Credentials",
      "Salesforce Security Model"
    ],
    "updatedAt": "2026-07-26T20:41:45.278831+00:00",
    "highlights": [
      "Hardened security on 4 legacy Apex classes plus secure-by-design on 4 new classes built for the project: systematic with sharing and stripInaccessible() across all 8",
      "Consolidated 8 near-duplicate profiles into 5 Permission Set Groups",
      "Full Visualforce/JS Buttons/Process Builder migration to LWC/Flow, bulk-tested on 200+ records"
    ],
    "featured": false,
    "sortOrder": 100,
    "status": "draft"
  },
];

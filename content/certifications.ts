// Certifications & Diplomas Data
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  badgeUrl: string;
  credentialUrl?: string;
  earnedDate: string;
  expirationDate?: string;
  description: string;
  skills: string[];
}

export const certifications: Certification[] = [
  {
    id: 'dev-concepteur-logiciel-openclassrooms',
    name: 'Développeur Concepteur Logiciel',
    issuer: 'OpenClassrooms',
    badgeUrl: '/certifications/dev-concepteur-badge.png',
    earnedDate: 'Oct 2025',
    description: 'RNCP Level 6 professional title (Bac+3/4 equivalent) in software design and development. Salesforce specialization: Apex, Flows, data modeling, CI/CD with Salesforce CLI and GitHub Actions, LWC, security, and permission sets.',
    skills: ['Apex', 'Salesforce Flows', 'LWC', 'Data Modeling', 'CI/CD', 'GitHub Actions', 'Salesforce CLI', 'API Integration', 'Security & Permissions', 'Automated Testing']
  },
  {
    id: 'tssr-greta-valdoise',
    name: 'Higher Technician in Systems & Networks',
    issuer: 'GRETA du Val d\'Oise',
    badgeUrl: '/certifications/systems-networks-badge.png',
    earnedDate: '2023',
    description: 'RNCP Level 5 (Bac+2) in systems and network administration. Practical internship at MIDRANGE GROUP: Windows Autopilot deployment (200+ workstations), VMware Workstation 17, Windows Server 2022, AD DS, DNS, DHCP, WDS, GPO, PXE, PfSense/Squid, Acronis Cyber Protect Cloud, Datto RMM.',
    skills: ['Windows Server 2022', 'Active Directory', 'DNS', 'DHCP', 'WDS', 'GPO', 'PXE Deployment', 'VMware Workstation 17', 'PfSense', 'Squid Proxy', 'Acronis Cyber Protect', 'Datto RMM', 'Windows Autopilot', 'Sysprep', 'Blancco Secure Erase', 'Splashtop', 'Autotask', 'Webroot']
  },
  {
    id: 'tai-greta-valdoise',
    name: 'IT Support Technician',
    issuer: 'GRETA du Val d\'Oise — Lycée Louis Jouvet',
    badgeUrl: '/certifications/tai-badge.png',
    earnedDate: 'Jul 2022',
    description: 'RNCP Level 4 (Bac) in IT support and user assistance. Training at Lycée Louis Jouvet (Taverny). Covers Windows 10 installation, VirtualBox virtualization, TP-Link network configuration, Active Directory roaming profiles, and hardware/software support.',
    skills: ['Windows 10', 'VirtualBox', 'Active Directory', 'Roaming Profiles', 'WiFi Configuration', 'AOMEI Partition Assistant', 'Hardware Diagnosis', 'User Support', 'Messaging Configuration']
  },
  {
    id: 'linguaskill-cambridge',
    name: 'Linguaskill Business — C1+',
    issuer: 'Cambridge Assessment English',
    badgeUrl: '/certifications/linguaskill-badge.png',
    credentialUrl: 'https://www.cambridge.org/linguaskill',
    earnedDate: 'Apr 2021',
    description: 'Cambridge Business English certification. Score: 180+ (C1+) in listening comprehension, 179 (B2) in reading comprehension. Issued via Astrolabe Formation PFD.',
    skills: ['Business English', 'Listening Comprehension', 'Reading Comprehension', 'Professional Communication']
  }
];

export const upcomingCertifications: string[] = [
  'CompTIA A+ — préparation en cours',
  'Salesforce Certified Administrator — préparation active en cours',
  'Salesforce Certified Platform Developer I — préparation active en cours',
  'ISC2 CC (Certified in Cybersecurity) — préparation en cours'
];

export const trailheadProfile = {
  badges: 90,
  points: 57375,
  trails: 15,
  superbadges: 0,
  profileUrl: 'https://trailblazer.me/id/aidahoumane'
};

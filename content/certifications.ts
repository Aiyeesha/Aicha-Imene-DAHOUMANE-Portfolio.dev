// Salesforce Certifications Data
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
    id: 'Salesforce Developer Diploma — OpenClassrooms',
    name: 'Salesforce Developer Diploma',
    issuer: 'OpenClassrooms',
    badgeUrl: '/certifications/admin-badge.png',
    credentialUrl: 'https://trailhead.salesforce.com/en/credentials/administrator',
    earnedDate: 'Oct 2025',
    description: 'Demonstrates proficiency in Salesforce administration, including user management, security, data management, and automation. Validates knowledge of Apex, Visualforce, Lightning components, and data modeling for custom application development.',
    skills: ['User Management', 'Security & Access', 'Data Management', 'Automation', 'Reports & Dashboards', 'Apex Programming', 'Visualforce', 'Lightning Components', 'Data Modeling', 'Integration']
  },
  {
    id: 'Higher Technician in Systems & Networks — GRETA du Val d’Oise',
    name: 'Higher Technician in Systems & Networks',
    issuer: 'GRETA du Val d’Oise',
    badgeUrl: '/certifications/systems-networks-badge.png',
    credentialUrl: 'https://www.greta-valdoise.fr/formation/technicien-superieur-systemes-et-reseaux',
    earnedDate: 'Oct 2023',
    description: 'Demonstrates proficiency in systems and networks administration, including network design, configuration, and troubleshooting.',
    skills: ['Network Design', 'Configuration', 'Troubleshooting', 'Security', 'System Administration']
  },
  {
    id: 'Linguaskill C2 Certificate — University of Cambridge',
    name: 'Linguaskill C2 Certificate',
    issuer: 'University of Cambridge',
    badgeUrl: '/certifications/linguaskill-badge.png',
    credentialUrl: 'https://www.cambridge.org/linguaskill',
    earnedDate: 'Oct 2021',
    description: 'Demonstrates proficiency in English language skills at the C2 level, as defined by the Common European Framework of Reference for Languages (CEFR).',
    skills: ['Reading', 'Writing', 'Listening', 'Speaking', 'Grammar', 'Vocabulary']
  },
  {
    id: 'Salesforce Developer Diploma — OpenClassrooms',
    name: 'Salesforce Developer Diploma',
    issuer: 'OpenClassrooms',
    badgeUrl: '/certifications/admin-badge.png',
    credentialUrl: 'https://trailhead.salesforce.com/en/credentials/administrator',
    earnedDate: 'Oct 2025',
    description: 'Demonstrates proficiency in Salesforce administration, including user management, security, data management, and automation. Validates knowledge of Apex, Visualforce, Lightning components, and data modeling for custom application development.',
    skills: ['User Management', 'Security & Access', 'Data Management', 'Automation', 'Reports & Dashboards', 'Apex Programming', 'Visualforce', 'Lightning Components', 'Data Modeling', 'Integration']
  },
    {id: 'admin',
    name: 'Salesforce Certified Administrator',
    issuer: 'Salesforce',
    badgeUrl: '/certifications/admin-badge.png',
    credentialUrl: 'https://trailhead.salesforce.com/en/credentials/administrator',
    earnedDate: '2024-06-15',
    description: 'Demonstrates proficiency in Salesforce administration, including user management, security, data management, and automation.',
    skills: ['User Management', 'Security & Access', 'Data Management', 'Automation', 'Reports & Dashboards']
  },
  {
    id: 'platform-dev-1',
    name: 'Salesforce Certified Platform Developer I',
    issuer: 'Salesforce',
    badgeUrl: '/certifications/pd1-badge.png',
    credentialUrl: 'https://trailhead.salesforce.com/en/credentials/platformdeveloperi',
    earnedDate: '2024-09-20',
    description: 'Validates knowledge of Apex, Visualforce, Lightning components, and data modeling for custom application development.',
    skills: ['Apex Programming', 'Visualforce', 'Lightning Components', 'Data Modeling', 'Integration']
  },
  {
    id: 'platform-app-builder',
    name: 'Salesforce Certified Platform App Builder',
    issuer: 'Salesforce',
    badgeUrl: '/certifications/app-builder-badge.png',
    credentialUrl: 'https://trailhead.salesforce.com/en/credentials/platformappbuilder',
    earnedDate: '2024-11-10',
    description: 'Demonstrates expertise in designing, building, and deploying custom applications using the declarative features of the Lightning Platform.',
    skills: ['App Design', 'Business Logic', 'Process Automation', 'User Interface', 'Mobile Experience']
  }
];

export const upcomingCertifications: string[] = [
  'Salesforce Certified Platform Developer II',
  'Salesforce Certified JavaScript Developer I',
  'Salesforce Certified Sales Cloud Consultant',
  
  'ISC2 CC (Certified in Cybersecurity)'

];

export const trailheadProfile = {
  badges: 150,
  points: 45000,
  trails: 25,
  superbadges: 12,
  profileUrl: 'https://trailblazer.me/id/your-trailhead-id'
};

/**
 * Static mapping of project slug → GitHub repository URL.
 *
 * Used as a fallback when repo_url is not set in Supabase.
 * This also serves as a source of truth when re-running the seed script.
 */
export const GITHUB_REPOS: Record<string, string> = {
  "idemconnect-apex-backend":
    "https://github.com/Aiyeesha/iDEM-Connect",

  "fasha-apex-backend-optimization":
    "https://github.com/Aiyeesha/FASHA",

  "wirebright-visualforce-to-lightning":
    "https://github.com/Aiyeesha/WireBrite-Consulting-Migration-Backup",

  "avenir-telecom-lightning-app":
    "https://github.com/Aiyeesha/Avenir-TELECOM",

  "legarant-axg-salesforce-deployment":
    "https://github.com/Aiyeesha/legarant-axg-crm-sync",

  "parkit-java-testing":
    "https://github.com/Aiyeesha/Projet-12",
};

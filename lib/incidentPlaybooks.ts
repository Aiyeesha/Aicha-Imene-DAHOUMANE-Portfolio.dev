// lib/incidentPlaybooks.ts
// ------------------------
// Checklists de réponse à incident, condensées depuis les playbooks détaillés
// publiés dans github.com/Aiyeesha/playbook-reponse-incidents (playbooks/P01…P06).
// Utilisées pour pré-remplir incident_checklist_items à la création d'un incident
// (voir lib/supabase/incidents.ts → createIncident()).

export type IncidentType =
  | "malware"
  | "ransomware"
  | "data_breach"
  | "phishing"
  | "unauthorized_access"
  | "dos";

export type ChecklistPhase =
  | "detection"
  | "containment"
  | "eradication"
  | "recovery"
  | "post_incident";

export type ChecklistTemplateItem = {
  phase: ChecklistPhase;
  label: string;
};

export const INCIDENT_TYPE_LABELS: Record<IncidentType, string> = {
  malware: "Infection par malware",
  ransomware: "Attaque par ransomware",
  data_breach: "Fuite de données",
  phishing: "Hameçonnage (phishing)",
  unauthorized_access: "Accès non autorisé",
  dos: "Déni de service (DoS/DDoS)",
};

export const CHECKLIST_PHASE_LABELS: Record<ChecklistPhase, string> = {
  detection: "Détection & triage",
  containment: "Confinement",
  eradication: "Éradication",
  recovery: "Récupération",
  post_incident: "Post-incident",
};

const malware: ChecklistTemplateItem[] = [
  { phase: "detection", label: "Enregistrer l'horodatage et la source de l'alerte" },
  { phase: "detection", label: "Identifier le(s) poste(s) affecté(s) : hôte, IP, utilisateur" },
  { phase: "detection", label: "Attribuer une sévérité" },
  { phase: "containment", label: "Isoler le poste infecté du réseau" },
  { phase: "containment", label: "Désactiver le compte AD si les identifiants sont compromis" },
  { phase: "containment", label: "Bloquer l'IP/domaine C2 au pare-feu et DNS" },
  { phase: "eradication", label: "Analyse complète antivirus/EDR sur le poste isolé" },
  { phase: "eradication", label: "Corriger la vulnérabilité d'accès initial" },
  { phase: "eradication", label: "Vérifier l'absence de mécanismes de persistance" },
  { phase: "recovery", label: "Réimager ou restaurer depuis une sauvegarde saine" },
  { phase: "recovery", label: "Surveiller 72h après la récupération" },
  { phase: "post_incident", label: "Compléter le rapport d'incident" },
  { phase: "post_incident", label: "Ajouter les IOC aux listes de blocage" },
  { phase: "post_incident", label: "Post-mortem sous 5 jours ouvrés" },
];

const ransomware: ChecklistTemplateItem[] = [
  { phase: "detection", label: "Confirmer le ransomware (note, extensions inconnues)" },
  { phase: "detection", label: "Identifier le patient zéro et le rayon d'impact" },
  { phase: "detection", label: "Escalader immédiatement — toujours S1" },
  { phase: "containment", label: "Isoler TOUS les postes infectés simultanément" },
  { phase: "containment", label: "Désactiver l'accès aux lecteurs partagés" },
  { phase: "containment", label: "Révoquer toutes les sessions actives (VPN, RDP, Citrix)" },
  { phase: "containment", label: "Ne PAS payer la rançon sans autorisation Direction + Juridique" },
  { phase: "eradication", label: "Vérifier l'intégrité des sauvegardes (non chiffrées)" },
  { phase: "eradication", label: "Réimager les postes infectés — ne pas déchiffrer en place" },
  { phase: "eradication", label: "Réinitialiser TOUS les identifiants du domaine" },
  { phase: "recovery", label: "Restaurer par ordre de priorité depuis sauvegarde saine" },
  { phase: "recovery", label: "Surveiller pendant 7 jours" },
  { phase: "post_incident", label: "Notifier le Juridique (fuite de données probable)" },
  { phase: "post_incident", label: "Post-mortem sous 48h après récupération" },
];

const dataBreach: ChecklistTemplateItem[] = [
  { phase: "detection", label: "Confirmer l'accès/exfiltration réelle des données" },
  { phase: "detection", label: "Identifier quelles données, quel volume, qui, depuis quand" },
  { phase: "detection", label: "Notifier Juridique et DPO si données personnelles" },
  { phase: "containment", label: "Révoquer l'accès du compte/tiers compromis" },
  { phase: "containment", label: "Bloquer le canal d'exfiltration" },
  { phase: "containment", label: "Préserver tous les logs pertinents" },
  { phase: "eradication", label: "Révoquer tous les identifiants et jetons compromis" },
  { phase: "eradication", label: "Corriger la vulnérabilité d'accès initial" },
  { phase: "eradication", label: "Activer le MFA sur tous les comptes concernés" },
  { phase: "recovery", label: "Renforcer les contrôles d'accès (moindre privilège)" },
  { phase: "post_incident", label: "RGPD : notifier la CNIL sous 72h si requis" },
  { phase: "post_incident", label: "Analyse d'impact (AIPD) si nécessaire" },
];

const phishing: ChecklistTemplateItem[] = [
  { phase: "detection", label: "Obtenir l'email original avec en-têtes complets" },
  { phase: "detection", label: "Vérifier : lien cliqué ? pièce jointe ouverte ? identifiants saisis ?" },
  { phase: "containment", label: "Bloquer le domaine/IP expéditeur à la passerelle mail" },
  { phase: "containment", label: "Réinitialiser le mot de passe si identifiants saisis" },
  { phase: "containment", label: "Révoquer les sessions et jetons OAuth du compte" },
  { phase: "containment", label: "Activer le MFA si absent" },
  { phase: "eradication", label: "Purger l'email à l'échelle de l'organisation" },
  { phase: "eradication", label: "Bloquer tous les IOC (pare-feu, DNS, passerelle mail)" },
  { phase: "recovery", label: "Restaurer les règles de boîte mail modifiées par l'attaquant" },
  { phase: "recovery", label: "Surveiller le compte pendant 7 jours" },
  { phase: "post_incident", label: "Communication de sensibilisation aux utilisateurs concernés" },
  { phase: "post_incident", label: "Simulation de phishing sous 30 jours" },
];

const unauthorizedAccess: ChecklistTemplateItem[] = [
  { phase: "detection", label: "Identifier le(s) compte(s) et le type d'accès (externe/interne/privilégié)" },
  { phase: "detection", label: "Vérifier la source de connexion (IP, géoloc, appareil)" },
  { phase: "detection", label: "Escalader immédiatement si compte à privilèges" },
  { phase: "containment", label: "Désactiver le compte compromis" },
  { phase: "containment", label: "Révoquer toutes les sessions actives et jetons API" },
  { phase: "containment", label: "Bloquer l'IP source au pare-feu" },
  { phase: "eradication", label: "Réinitialiser tous les identifiants du compte compromis" },
  { phase: "eradication", label: "Révoquer et réémettre clés API, certificats, clés SSH" },
  { phase: "eradication", label: "Imposer le MFA sur le compte" },
  { phase: "recovery", label: "Réactiver après reset complet + inscription MFA" },
  { phase: "recovery", label: "Surveillance renforcée pendant 30 jours" },
  { phase: "post_incident", label: "Revoir la gouvernance des identités" },
];

const dos: ChecklistTemplateItem[] = [
  { phase: "detection", label: "Confirmer qu'il s'agit d'une attaque (pas un pic légitime)" },
  { phase: "detection", label: "Caractériser le trafic (volumétrique, applicatif, protocolaire)" },
  { phase: "detection", label: "Évaluer l'impact métier (service dégradé ou indisponible)" },
  { phase: "containment", label: "Activer la protection anti-DDoS (Cloudflare, AWS Shield…)" },
  { phase: "containment", label: "Bloquer/limiter en débit les IP sources malveillantes" },
  { phase: "containment", label: "Contacter le FAI/hébergeur si nécessaire" },
  { phase: "eradication", label: "Maintenir le filtrage jusqu'à confirmation de fin d'attaque" },
  { phase: "eradication", label: "Durcir la configuration réseau (rate limiting permanent)" },
  { phase: "recovery", label: "Retirer progressivement les mesures temporaires" },
  { phase: "recovery", label: "Surveiller 48-72h pour détecter une reprise" },
  { phase: "post_incident", label: "Évaluer le contrat/capacités anti-DDoS actuels" },
  { phase: "post_incident", label: "Si RDoS : transmettre les preuves aux autorités sans payer" },
];

export const INCIDENT_CHECKLIST_TEMPLATES: Record<IncidentType, ChecklistTemplateItem[]> = {
  malware,
  ransomware,
  data_breach: dataBreach,
  phishing,
  unauthorized_access: unauthorizedAccess,
  dos,
};

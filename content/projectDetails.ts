// Entry point of the per-project content. Edit content/project-details/<slug>.ts;
// add a new project there and register it below.
// Per-slug, per-locale project content: title / heroSubtitle / sections + gallery.
// Card metadata lives in content/projects.ts. Deep case studies (which replace
// `sections` for a given slug) live in content/projects/<slug>/<locale>.mdx —
// those slugs keep only title + heroSubtitle here; their sections were removed
// once the MDX existed.
// Gallery `src` values are repo-local paths under public/projects/<slug>/.
// Read path: lib/data/projectsSource.ts.
//
// Each project lives in its own file, content/project-details/<slug>.ts; this
// module keeps the shared types and assembles them in display order.

import type { GalleryImage } from "@/components/ImageGallery";

export type ProjectSection =
  | { type: "bullets"; title: string; items: string[] }
  | { type: "text"; title: string; paragraphs?: string[]; body?: string }
  | { type: "metrics"; title: string; items: { label: string; value: string; note?: string }[] }
  | { type: "timeline"; title: string; steps: { title?: string; label?: string; description: string }[] }
  | { type: "resources"; title: string; items: { label: string; href: string; note?: string }[] }
  | { type: "code"; title: string; language?: string; code: string; downloadUrl?: string };

export type ProjectDetails = {
  slug: string;
  locales?: {
    en?: { title?: string; heroSubtitle?: string; sections?: ProjectSection[] };
    fr?: { title?: string; heroSubtitle?: string; sections?: ProjectSection[] };
    es?: { title?: string; heroSubtitle?: string; sections?: ProjectSection[] };
  };
  gallery?: GalleryImage[];
};

import hardware_upgrade_hp_laptop from "@/content/project-details/hardware-upgrade-hp-laptop";
import hemebiotech_java_debug from "@/content/project-details/hemebiotech-java-debug";
import homelab_cowrie_honeypot from "@/content/project-details/homelab-cowrie-honeypot";
import homelab_network_sniffing from "@/content/project-details/homelab-network-sniffing";
import homelab_password_cracking_lab from "@/content/project-details/homelab-password-cracking-lab";
import it_ops_disk_backup from "@/content/project-details/it-ops-disk-backup";
import it_ops_roaming_profiles from "@/content/project-details/it-ops-roaming-profiles";
import it_ops_virtualization_lab from "@/content/project-details/it-ops-virtualization-lab";
import it_ops_workstation_setup from "@/content/project-details/it-ops-workstation-setup";
import parkit_java_testing from "@/content/project-details/parkit-java-testing";
import pochlib_ui from "@/content/project-details/pochlib-ui";
import python_network_scanner from "@/content/project-details/python-network-scanner";
import python_password_checker from "@/content/project-details/python-password-checker";
import risk_assessment_matrix from "@/content/project-details/risk-assessment-matrix";
import security_monitoring_dashboard from "@/content/project-details/security-monitoring-dashboard";
import second_brain_claude_code from "@/content/project-details/second-brain-claude-code";
import it_ops_rmm_supervision from "@/content/project-details/it-ops-rmm-supervision";
import workstation_mass_deployment from "@/content/project-details/workstation-mass-deployment";
import it_ops_incident_management from "@/content/project-details/it-ops-incident-management";
import it_ops_acronis_backup from "@/content/project-details/it-ops-acronis-backup";
import it_ops_network_security from "@/content/project-details/it-ops-network-security";
import nextjs_admin_dashboard from "@/content/project-details/nextjs-admin-dashboard";
import incident_management_dashboard from "@/content/project-details/incident-management-dashboard";
import it_ops_wifi_config from "@/content/project-details/it-ops-wifi-config";
import it_ops_hardware_procurement from "@/content/project-details/it-ops-hardware-procurement";
import it_ops_email_config from "@/content/project-details/it-ops-email-config";
import cyber_soc_curriculum from "@/content/project-details/cyber-soc-curriculum";
import vulnerability_assessment_report from "@/content/project-details/vulnerability-assessment-report";
import incident_response_tracker from "@/content/project-details/incident-response-tracker";
import cve_watchlist from "@/content/project-details/cve-watchlist";
import log_anomaly_detector from "@/content/project-details/log-anomaly-detector";
import cosmonote_clone from "@/content/project-details/cosmonote-clone";
import incident_response_playbook from "@/content/project-details/incident-response-playbook";
import risque360 from "@/content/project-details/risque360";
import bdr_prospection_tool from "@/content/project-details/bdr-prospection-tool";
import avenir_telecom_lightning_app from "@/content/project-details/avenir-telecom-lightning-app";
import digit_learning_salesforce_update from "@/content/project-details/digit-learning-salesforce-update";
import tours_for_life_salesforce_solution from "@/content/project-details/tours-for-life-salesforce-solution";
import idemconnect_apex_backend from "@/content/project-details/idemconnect-apex-backend";
import wirebright_visualforce_to_lightning from "@/content/project-details/wirebright-visualforce-to-lightning";
import ltp_apex_backend_prototype from "@/content/project-details/ltp-apex-backend-prototype";
import fasha_apex_backend_optimization from "@/content/project-details/fasha-apex-backend-optimization";
import legarant_axg_salesforce_deployment from "@/content/project-details/legarant-axg-salesforce-deployment";
import cicd_pipeline_setup from "@/content/project-details/cicd-pipeline-setup";
import industrak_salesforce from "@/content/project-details/industrak-salesforce";
import nova_manufacturing_classic_to_lightning from "@/content/project-details/nova-manufacturing-classic-to-lightning";

export const projectDetails: ProjectDetails[] = [
  hardware_upgrade_hp_laptop,
  hemebiotech_java_debug,
  homelab_cowrie_honeypot,
  homelab_network_sniffing,
  homelab_password_cracking_lab,
  it_ops_disk_backup,
  it_ops_roaming_profiles,
  it_ops_virtualization_lab,
  it_ops_workstation_setup,
  parkit_java_testing,
  pochlib_ui,
  python_network_scanner,
  python_password_checker,
  risk_assessment_matrix,
  security_monitoring_dashboard,
  second_brain_claude_code,
  it_ops_rmm_supervision,
  workstation_mass_deployment,
  it_ops_incident_management,
  it_ops_acronis_backup,
  it_ops_network_security,
  nextjs_admin_dashboard,
  incident_management_dashboard,
  it_ops_wifi_config,
  it_ops_hardware_procurement,
  it_ops_email_config,
  cyber_soc_curriculum,
  vulnerability_assessment_report,
  incident_response_tracker,
  cve_watchlist,
  log_anomaly_detector,
  cosmonote_clone,
  incident_response_playbook,
  risque360,
  bdr_prospection_tool,
  avenir_telecom_lightning_app,
  digit_learning_salesforce_update,
  tours_for_life_salesforce_solution,
  idemconnect_apex_backend,
  wirebright_visualforce_to_lightning,
  ltp_apex_backend_prototype,
  fasha_apex_backend_optimization,
  legarant_axg_salesforce_deployment,
  cicd_pipeline_setup,
  industrak_salesforce,
  nova_manufacturing_classic_to_lightning,
];

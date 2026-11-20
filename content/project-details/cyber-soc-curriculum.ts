// content/project-details/cyber-soc-curriculum.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "cyber-soc-curriculum",
  "gallery": [],
  "locales": {
    "en": {
      "title": "Cyber Curriculum — 70 SOC Projects",
      "sections": [
        {
          "body": "Theoretical cybersecurity training is no longer enough: recruiters and SOCs look for analysts who can demonstrate documented practical experience. I'm building this curriculum to create a portfolio of 70 hands-on projects covering all SOC Tier 1 to 3 competencies, from network monitoring to advanced threat hunting.",
          "type": "text",
          "title": "Context"
        },
        {
          "type": "bullets",
          "items": [
            "Certifications alone (CompTIA, CEH) are not enough without proven practical experience",
            "Public labs (TryHackMe, HackTheBox) don't produce documented portfolio deliverables",
            "No structured curriculum covering SIEM + forensics + threat hunting coherently",
            "Need real-world scenarios: malware analysis, network intrusions, log analysis, incident response"
          ],
          "title": "Problem Scope"
        },
        {
          "type": "bullets",
          "items": [
            "I'm documenting 70 projects covering: SIEM (Splunk, Elastic, Wazuh), network (Wireshark, Zeek), forensics (Autopsy, Volatility), threat hunting and red team basics",
            "I'm writing a detailed writeup for each project: context, methodology, tools, results",
            "I built a personal virtual lab: attack VMs (Kali) and defensive (Ubuntu SOC) on VMware",
            "I'm writing Python automation scripts: log parsers, SIEM alerts, IOC extractors",
            "I'm publishing progressively on GitHub and my portfolio website"
          ],
          "title": "Solution & Deliverables"
        },
        {
          "type": "bullets",
          "items": [
            "SIEM: Splunk Enterprise (trial), Elastic Stack (ELK), Wazuh (open source)",
            "Network: Wireshark, Zeek, Suricata IDS, Nmap",
            "Forensics: Autopsy, Volatility 3, FTK Imager, strings/binwalk",
            "Red Team basics: Metasploit, Nessus, Burp Suite Community",
            "Infrastructure: VMware Workstation, VirtualBox, Kali Linux, Ubuntu Server",
            "Scripting: Python 3, Bash, PowerShell"
          ],
          "title": "Tech Stack"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Module 1 — SIEM",
              "description": "Splunk and Elastic: log ingestion, dashboards, detection rules — completed"
            },
            {
              "label": "Module 2 — Network",
              "description": "Wireshark, Zeek, pcap capture analysis and intrusion detection — completed"
            },
            {
              "label": "Module 3 — Threat Hunting",
              "description": "Hypothesis-driven hunting, ATT&CK framework, SIEM pivots — in progress"
            },
            {
              "label": "Module 4 — Forensics",
              "description": "Memory and disk analysis, Windows artifacts — upcoming"
            },
            {
              "label": "Module 5 — Red Team Basics",
              "description": "Web pentest, basic exploitation, vulnerability reports — upcoming"
            }
          ],
          "title": "Timeline"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "SIEM and network modules",
              "label": "Projects completed",
              "value": "~20 / 70"
            },
            {
              "note": "Progressive GitHub publication",
              "label": "Writeups published",
              "value": "In progress"
            },
            {
              "note": "Splunk, Elastic, Wazuh, Wireshark, Zeek...",
              "label": "Tools mastered",
              "value": "12+"
            }
          ],
          "title": "Progress"
        }
      ]
    },
    "fr": {
      "title": "Curriculum Cyber — 70 Projets SOC",
      "sections": [
        {
          "body": "Les formations cybersécurité théoriques ne suffisent plus : les recruteurs et les SOC cherchent des analystes capables de démontrer une expérience pratique documentée. Je construis ce curriculum pour bâtir un portfolio de 70 projets hands-on couvrant l'ensemble des compétences SOC Tier 1 à 3, du monitoring réseau au threat hunting avancé.",
          "type": "text",
          "title": "Contexte"
        },
        {
          "type": "bullets",
          "items": [
            "Les certifications seules (CompTIA, CEH) ne suffisent pas sans expérience pratique prouvée",
            "Les labs publics (TryHackMe, HackTheBox) ne produisent pas de livrables portfolio documentés",
            "Pas de parcours structuré couvrant SIEM + forensics + threat hunting de façon cohérente",
            "Besoin de cas réels : malwares, intrusions réseau, analyse de logs, réponse à incident"
          ],
          "title": "Périmètre du Problème"
        },
        {
          "type": "bullets",
          "items": [
            "Je documente 70 projets couvrant : SIEM (Splunk, Elastic, Wazuh), réseau (Wireshark, Zeek), forensics (Autopsy, Volatility), threat hunting et bases red team",
            "Je rédige un writeup détaillé pour chaque projet : contexte, méthodologie, outils, résultats",
            "J'ai construit un lab virtuel personnel : VMs attaquantes (Kali) et défensives (Ubuntu SOC) sur VMware",
            "J'écris des scripts Python d'automatisation : parsers de logs, alertes SIEM, IOC extractors",
            "Je publie progressivement sur GitHub et mon portfolio web"
          ],
          "title": "Solution & Livrables"
        },
        {
          "type": "bullets",
          "items": [
            "SIEM : Splunk Enterprise (trial), Elastic Stack (ELK), Wazuh (open source)",
            "Réseau : Wireshark, Zeek, Suricata IDS, Nmap",
            "Forensics : Autopsy, Volatility 3, FTK Imager, strings/binwalk",
            "Red Team basics : Metasploit, Nessus, Burp Suite Community",
            "Infrastructure : VMware Workstation, VirtualBox, Kali Linux, Ubuntu Server",
            "Scripting : Python 3, Bash, PowerShell"
          ],
          "title": "Stack Technique"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Module 1 — SIEM",
              "description": "Splunk et Elastic : ingestion de logs, dashboards, règles de détection — terminé"
            },
            {
              "label": "Module 2 — Réseau",
              "description": "Wireshark, Zeek, analyse de captures pcap et détection d'intrusions — terminé"
            },
            {
              "label": "Module 3 — Threat Hunting",
              "description": "Hypothèse-driven hunting, ATT&CK framework, pivots SIEM — en cours"
            },
            {
              "label": "Module 4 — Forensics",
              "description": "Analyse mémoire, disques, artefacts Windows — à venir"
            },
            {
              "label": "Module 5 — Red Team Basics",
              "description": "Pentest web, exploitation basique, rapport de vulnérabilités — à venir"
            }
          ],
          "title": "Avancement"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Modules SIEM et réseau",
              "label": "Projets complétés",
              "value": "~20 / 70"
            },
            {
              "note": "Publication GitHub progressive",
              "label": "Writeups publiés",
              "value": "En cours"
            },
            {
              "note": "Splunk, Elastic, Wazuh, Wireshark, Zeek...",
              "label": "Outils maîtrisés",
              "value": "12+"
            }
          ],
          "title": "Progression"
        }
      ]
    }
  }
};

export default details;

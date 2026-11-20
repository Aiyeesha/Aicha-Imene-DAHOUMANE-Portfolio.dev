// content/project-details/it-ops-hardware-procurement.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "it-ops-hardware-procurement",
  "gallery": [
    {
      "alt": "Cover",
      "src": "/projects/it-ops-hardware-procurement/cover.webp"
    }
  ],
  "locales": {
    "en": {
      "title": "Hardware Procurement: Drafting a Multi-PC Quote",
      "heroSubtitle": "Hardware Sizing · Excel Devis · Component Research · Greta du Val d'Oise",
      "sections": [
        {
          "body": "As part of a group project during the TAI training at Greta du Val d'Oise, I was given a client brief describing a workstation use case (office productivity + light virtualization) and asked to produce a complete hardware procurement quote. The exercise covered the full B2B sourcing workflow: requirements analysis, compatible component research, technical validation, and formalizing the quote in a structured Excel document — the standard deliverable in professional IT procurement.",
          "type": "text",
          "title": "Context"
        },
        {
          "type": "bullets",
          "items": [
            "Mid-range desktop workstation: daily office productivity + 1-2 simultaneous VMs (VirtualBox)",
            "Multi-monitor support required with local professional file storage",
            "Budget constraint: under 1,000 € ex-VAT",
            "Windows 11 Pro compatibility and Active Directory domain join required",
            "Standard ATX tower form factor for easy enterprise maintenance"
          ],
          "title": "Scope & Constraints"
        },
        {
          "type": "bullets",
          "items": [
            "Brief analyzed and hardware constraints extracted (min RAM, SSD, GPU, TPM 2.0)",
            "Components researched across French B2B catalogues (LDLC Pro, Materiel.net, Inmac Wstore)",
            "Compatibility validated: CPU/motherboard socket, DDR generation, storage interface, TDP calculation",
            "Windows 11 requirements verified: TPM 2.0, Secure Boot, compatible CPU list",
            "Structured Excel quote: reference, supplier, unit price ex-VAT, quantity, total, VAT 20%, total inc-VAT",
            "Quote validated under 1,000 € ex-VAT and submitted for instructor review"
          ],
          "title": "Solution & Deliverables"
        },
        {
          "type": "bullets",
          "items": [
            "AMD Ryzen 5 / Intel Core i5 (12th-13th gen) — CPU selected on price/performance ratio",
            "16 GB DDR4 (2× 8 GB) — upgradeable to 32 GB for virtualization headroom",
            "512 GB M.2 NVMe SSD (OS) + 1 TB HDD (data)",
            "Windows 11 Pro OEM — licence included in the quote",
            "LDLC Pro / Materiel.net / Inmac Wstore — B2B supplier catalogues",
            "Excel — quote formalization with ex-VAT / inc-VAT calculations"
          ],
          "title": "Stack & Technologies"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Requirements analysis",
              "description": "Read and analyzed the client brief. Extracted hardware constraints: 16 GB RAM min, SSD for OS responsiveness, iGPU or discrete GPU, TPM 2.0, ATX tower format."
            },
            {
              "label": "Component research",
              "description": "Consulted French B2B catalogues (LDLC Pro, Materiel.net, Inmac Wstore). Identified candidates per category: CPU, motherboard, RAM, storage, PSU, case."
            },
            {
              "label": "Compatibility validation",
              "description": "Cross-checked CPU/motherboard socket, DDR generation support, M.2 NVMe vs SATA interface, TDP calculation, Windows 11 requirements (TPM 2.0, Secure Boot)."
            },
            {
              "label": "Quote formalization",
              "description": "Entered all components into Excel: reference, supplier, unit price ex-VAT, quantity, total ex-VAT, VAT 20%, total inc-VAT. Grand total verified for budget compliance."
            }
          ],
          "title": "Procurement Process"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Within client budget",
              "label": "Budget",
              "value": "< 1,000 € ex-VAT"
            },
            {
              "note": "Upgradeable to 32 GB for virtualization",
              "label": "RAM",
              "value": "16 GB DDR4"
            },
            {
              "note": "Fast OS + separate data drive",
              "label": "Storage",
              "value": "512 GB NVMe + 1 TB HDD"
            },
            {
              "note": "Ex-VAT / VAT / inc-VAT — validated",
              "label": "Deliverable",
              "value": "Complete Excel quote"
            }
          ],
          "title": "Quote Summary"
        }
      ]
    },
    "fr": {
      "title": "Devis matériel : Proposition d'acquisition de postes de travail",
      "heroSubtitle": "Dimensionnement matériel · Devis Excel · Recherche composants · Greta du Val d'Oise",
      "sections": [
        {
          "body": "Dans le cadre d'un projet de groupe pendant la formation TAI au Greta du Val d'Oise, j'ai reçu un cahier des charges client décrivant un cas d'usage de poste de travail (bureautique + virtualisation légère) et j'ai dû produire un devis matériel complet. L exercice couvrait l'intégralité du processus d'approvisionnement B2B : analyse des besoins, recherche de composants compatibles, validation des contraintes techniques et formalisation dans un tableau Excel structuré — livrable standard en contexte professionnel IT.",
          "type": "text",
          "title": "Contexte"
        },
        {
          "type": "bullets",
          "items": [
            "Poste de travail bureau milieu de gamme : bureautique quotidienne + 1-2 VM simultanées (VirtualBox)",
            "Support multi-moniteurs requis et stockage local de fichiers professionnels",
            "Contrainte budgétaire : moins de 1 000 € HT",
            "Compatibilité Windows 11 Pro et jonction à un domaine Active Directory existant",
            "Format ATX tour standard pour faciliter la maintenance en entreprise"
          ],
          "title": "Périmètre & Contraintes"
        },
        {
          "type": "bullets",
          "items": [
            "Analyse du cahier des charges et extraction des contraintes matérielles (RAM min, SSD, GPU, TPM 2.0)",
            "Recherche composants sur catalogues B2B français (LDLC Pro, Materiel.net, Inmac Wstore)",
            "Validation des compatibilités : socket CPU/carte mère, génération DDR, interface stockage, calcul TDP",
            "Vérification des prérequis Windows 11 : TPM 2.0, Secure Boot, liste CPU compatibles",
            "Devis Excel structuré : référence, fournisseur, prix HT, quantité, total HT, TVA 20%, total TTC",
            "Devis validé sous 1 000 € HT et présenté au formateur pour revue"
          ],
          "title": "Solution & Livrables"
        },
        {
          "type": "bullets",
          "items": [
            "AMD Ryzen 5 / Intel Core i5 (12e-13e gen) — CPU selon rapport qualité/prix",
            "16 Go DDR4 (2× 8 Go) — évolutif jusqu'à 32 Go pour la virtualisation",
            "512 Go SSD M.2 NVMe (OS) + 1 To HDD (données)",
            "Windows 11 Pro OEM — licence incluse dans le devis",
            "LDLC Pro / Materiel.net / Inmac Wstore — catalogues fournisseurs B2B",
            "Excel — formalisation du devis avec calculs HT/TTC"
          ],
          "title": "Stack et outils"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Analyse des besoins",
              "description": "Lecture du cahier des charges, extraction des contraintes : RAM min 16 Go, SSD pour l'OS, iGPU ou GPU discret, TPM 2.0, format ATX tour."
            },
            {
              "label": "Recherche de composants",
              "description": "Consultation des catalogues B2B (LDLC Pro, Materiel.net, Inmac Wstore). Identification des candidats par catégorie : CPU, carte mère, RAM, stockage, alimentation, boîtier."
            },
            {
              "label": "Validation des compatibilités",
              "description": "Vérification socket CPU/carte mère, génération DDR supportée, interface M.2 NVMe ou SATA, calcul TDP, prérequis Windows 11 (TPM 2.0, Secure Boot)."
            },
            {
              "label": "Formalisation du devis",
              "description": "Saisie dans Excel : référence, fournisseur, prix HT, quantité, total HT, TVA 20%, total TTC. Ligne récapitulative avec total global — conformité budgétaire vérifiée."
            }
          ],
          "title": "Processus d'approvisionnement"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Conforme à l'enveloppe client",
              "label": "Budget",
              "value": "< 1 000 € HT"
            },
            {
              "note": "Évolutif 32 Go — virtualisation prête",
              "label": "RAM",
              "value": "16 Go DDR4"
            },
            {
              "note": "OS rapide + données séparées",
              "label": "Stockage",
              "value": "512 Go NVMe + 1 To HDD"
            },
            {
              "note": "HT / TVA / TTC — validé formateur",
              "label": "Livrable",
              "value": "Devis Excel complet"
            }
          ],
          "title": "Récapitulatif"
        }
      ]
    },
    "es": {
      "title": "Aprovisionamiento de hardware IT: elaboración de un presupuesto Excel",
      "heroSubtitle": "Dimensionamiento de hardware · Presupuesto Excel · Investigación de componentes · Greta du Val d'Oise",
      "sections": [
        {
          "type": "text",
          "title": "Contexto",
          "paragraphs": [
            "En el marco de un proyecto en grupo durante la formación TAI en el Greta du Val d'Oise, recibí un pliego de condiciones de cliente describiendo un caso de uso de puesto de trabajo (ofimática + virtualización ligera) y tuve que elaborar un presupuesto de hardware completo. El ejercicio cubría todo el proceso de aprovisionamiento B2B: análisis de necesidades, búsqueda de componentes compatibles, validación de las limitaciones técnicas y formalización en una tabla Excel estructurada — entregable estándar en contexto profesional IT."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Puesto de trabajo de gama media: ofimática diaria + 1-2 VM simultáneas (VirtualBox)",
            "Soporte multi-monitor requerido y almacenamiento local de archivos profesionales",
            "Restricción presupuestaria: menos de 1.000 € sin IVA",
            "Compatibilidad Windows 11 Pro y unión a un dominio Active Directory existente",
            "Formato ATX torre estándar para facilitar el mantenimiento en empresa"
          ],
          "title": "Alcance y restricciones"
        },
        {
          "type": "bullets",
          "items": [
            "Análisis del pliego de condiciones y extracción de las restricciones de hardware (RAM mín., SSD, GPU, TPM 2.0)",
            "Búsqueda de componentes en catálogos B2B franceses (LDLC Pro, Materiel.net, Inmac Wstore)",
            "Validación de compatibilidades: zócalo CPU/placa base, generación DDR, interfaz de almacenamiento, cálculo de TDP",
            "Verificación de los requisitos de Windows 11: TPM 2.0, Secure Boot, lista de CPU compatibles",
            "Presupuesto Excel estructurado: referencia, proveedor, precio sin IVA, cantidad, total sin IVA, IVA 20%, total con IVA",
            "Presupuesto validado por debajo de 1.000 € sin IVA y presentado al formador para revisión"
          ],
          "title": "Solución y entregables"
        },
        {
          "type": "bullets",
          "items": [
            "AMD Ryzen 5 / Intel Core i5 (12ª-13ª gen) — CPU según relación calidad-precio",
            "16 GB DDR4 (2× 8 GB) — ampliable hasta 32 GB para virtualización",
            "SSD M.2 NVMe de 512 GB (SO) + HDD de 1 TB (datos)",
            "Windows 11 Pro OEM — licencia incluida en el presupuesto",
            "LDLC Pro / Materiel.net / Inmac Wstore — catálogos de proveedores B2B",
            "Excel — formalización del presupuesto con cálculos sin IVA/con IVA"
          ],
          "title": "Stack y tecnologías"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Análisis de necesidades",
              "description": "Lectura del pliego de condiciones, extracción de las restricciones: RAM mín. 16 GB, SSD para el SO, iGPU o GPU dedicada, TPM 2.0, formato ATX torre."
            },
            {
              "label": "Búsqueda de componentes",
              "description": "Consulta de catálogos B2B (LDLC Pro, Materiel.net, Inmac Wstore). Identificación de candidatos por categoría: CPU, placa base, RAM, almacenamiento, fuente de alimentación, chasis."
            },
            {
              "label": "Validación de compatibilidades",
              "description": "Verificación de zócalo CPU/placa base, generación DDR compatible, interfaz M.2 NVMe o SATA, cálculo de TDP, requisitos de Windows 11 (TPM 2.0, Secure Boot)."
            },
            {
              "label": "Formalización del presupuesto",
              "description": "Introducción en Excel: referencia, proveedor, precio sin IVA, cantidad, total sin IVA, IVA 20%, total con IVA. Línea de resumen con el total global — conformidad presupuestaria verificada."
            }
          ],
          "title": "Proceso de aprovisionamiento"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Conforme al límite del cliente",
              "label": "Presupuesto",
              "value": "< 1.000 € sin IVA"
            },
            {
              "note": "Ampliable a 32 GB — virtualización lista",
              "label": "RAM",
              "value": "16 GB DDR4"
            },
            {
              "note": "SO rápido + datos separados",
              "label": "Almacenamiento",
              "value": "512 GB NVMe + 1 TB HDD"
            },
            {
              "note": "Sin IVA / IVA / con IVA — validado por el formador",
              "label": "Entregable",
              "value": "Presupuesto Excel completo"
            }
          ],
          "title": "Resumen"
        }
      ]
    }
  }
};

export default details;

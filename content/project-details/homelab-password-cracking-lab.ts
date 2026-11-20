// content/project-details/homelab-password-cracking-lab.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "homelab-password-cracking-lab",
  "gallery": [
    {
      "alt": "Cover",
      "src": "/projects/homelab-password-cracking-lab/cover.webp"
    },
    {
      "alt": "Screenshot 1",
      "src": "/projects/homelab-password-cracking-lab/screenshot-1.webp"
    },
    {
      "alt": "Screenshot 2",
      "src": "/projects/homelab-password-cracking-lab/screenshot-2.webp"
    },
    {
      "alt": "Screenshot 3",
      "src": "/projects/homelab-password-cracking-lab/screenshot-3.webp"
    },
    {
      "alt": "Screenshot 4",
      "src": "/projects/homelab-password-cracking-lab/screenshot-4.webp"
    },
    {
      "alt": "Screenshot 5",
      "src": "/projects/homelab-password-cracking-lab/screenshot-5.webp"
    }
  ],
  "locales": {
    "en": {
      "title": "Password Cracking: Hashing, Salting & Stretching",
      "heroSubtitle": "From cryptographic theory to a measured demonstration, on an isolated lab",
      "sections": [
        {
          "type": "text",
          "title": "Context",
          "paragraphs": [
            "This project complements the honeypot lab with the 'compromised password' angle: how a password is actually stored, why it cannot be 'decrypted', and how industry-standard tools (John the Ripper, Hashcat) automate testing thousands of candidates per second.",
            "Everything ran on the lab's attacker machine (Kali Linux), with no network or external target — only hashes generated locally for the demonstration."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Understand and demonstrate the properties of a cryptographic hash function (determinism, avalanche effect, irreversibility).",
            "Concretely compare cracking speed between a fast algorithm (MD5) and a deliberately slow one (bcrypt).",
            "Implement the four main attack families: dictionary, dictionary + mutation rules, mask, pure brute force.",
            "Run a realistic multi-user case study (shadow-file style) with passwords of varying strength."
          ],
          "title": "Objectives"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "title": "Generating test hashes",
              "description": "I generated unsalted MD5 / SHA1 / SHA256 hashes, then a salted SHA-512 one via mkpasswd, personally verifying the avalanche effect and the role of the salt."
            },
            {
              "title": "Cracking with John the Ripper",
              "description": "I ran a dictionary attack (rockyou.txt, 14.3 million entries) against test MD5 hashes."
            },
            {
              "title": "Cracking with Hashcat",
              "description": "I ran an MD5 vs bcrypt benchmark, then dictionary, rule-based (best64) and mask/brute-force attacks with keyspace calculations."
            },
            {
              "title": "GPU-less environment troubleshooting",
              "description": "I resolved a chain of OpenCL failures on a VM with no dedicated GPU: a missing software driver, a misplaced environment variable, and insufficient RAM."
            },
            {
              "title": "Multi-user case study",
              "description": "I ran three accounts of increasing strength (a dictionary word, a complexified word, a five-word passphrase) against the same combined attack."
            }
          ],
          "title": "Methodology"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "MD5 vs bcrypt (benchmark)",
              "value": "3,087,100 H/s vs 119 H/s"
            },
            {
              "label": "bcrypt slowdown factor",
              "value": "about 25,900x"
            },
            {
              "label": "Weak password (dictionary)",
              "value": "cracked"
            },
            {
              "label": "5-word passphrase",
              "value": "not cracked (dictionary + rules exhausted)"
            }
          ],
          "title": "Measured results"
        },
        {
          "type": "text",
          "title": "Technical troubleshooting",
          "paragraphs": [
            "Hashcat requires a working OpenCL backend even for CPU-only use, which was absent by default on this GPU-less VM. Resolving it took me several steps: the expected package (pocl-opencl-icd) did not exist in Kali's repositories, so I installed the mesa-opencl-icd alternative (llvmpipe software rendering) instead.",
            "The OpenCL platform then stayed invisible to Hashcat (0 devices exposed) until I explicitly enabled it via the RUSTICL_ENABLE environment variable. My first attempt at making this persistent failed because I'd placed it in ~/.bashrc, while Kali's default shell is Zsh, which doesn't read that file.",
            "Once I got the device detected, the benchmark still failed with a memory allocation error, which I resolved by raising the VM's allocated RAM from ~2 GB to 8 GB in VMware settings."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Kali Linux on VMware Workstation Pro 17",
            "John the Ripper (dictionary attack, MD5 and SHA-512crypt formats)",
            "Hashcat (dictionary, best64 rules, mask, brute force, GPU/CPU benchmark)",
            "mkpasswd / OpenSSL (test hash generation)",
            "Mesa OpenCL (llvmpipe software rendering, GPU-less environment)"
          ],
          "title": "Stack and tools"
        }
      ]
    },
    "fr": {
      "title": "Cracker de mots de passe : hashing, salage et stretching",
      "heroSubtitle": "De la théorie cryptographique à la démonstration chiffrée, sur un lab isolé",
      "sections": [
        {
          "type": "text",
          "title": "Contexte",
          "paragraphs": [
            "Ce projet complète le lab honeypot par la dimension « mot de passe compromis » : comment un mot de passe est réellement stocké, pourquoi il ne peut pas être « déchiffré », et comment les outils standards du métier (John the Ripper, Hashcat) automatisent le test de milliers de candidats par seconde.",
            "L'ensemble a été mené sur la machine attaquante du lab (Kali Linux), sans réseau ni cible externe : uniquement des hashs générés localement pour la démonstration."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Comprendre et démontrer les propriétés d'une fonction de hachage cryptographique (déterminisme, effet avalanche, irréversibilité).",
            "Comparer concrètement la vitesse de cassage entre un algorithme rapide (MD5) et un algorithme volontairement lent (bcrypt).",
            "Mettre en œuvre les quatre grandes familles d'attaque : dictionnaire, dictionnaire + règles de mutation, masque, force brute pure.",
            "Exécuter un cas pratique multi-utilisateurs réaliste (type fichier /etc/shadow) avec des mots de passe de robustesse variable."
          ],
          "title": "Objectifs"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "title": "Génération de hashs de test",
              "description": "J'ai généré des hashs MD5 / SHA1 / SHA256 non salés, puis un SHA-512 salé via mkpasswd, en vérifiant personnellement l'effet avalanche et le rôle du sel."
            },
            {
              "title": "Cassage avec John the Ripper",
              "description": "J'ai lancé une attaque par dictionnaire (rockyou.txt, 14,3 millions d'entrées) sur des hashs MD5 de test."
            },
            {
              "title": "Cassage avec Hashcat",
              "description": "J'ai exécuté un benchmark MD5 vs bcrypt, puis des attaques par dictionnaire, par règles de mutation (best64) et par masque / force brute avec calcul de l'espace de recherche."
            },
            {
              "title": "Dépannage environnement sans GPU",
              "description": "J'ai résolu une chaîne de pannes OpenCL sur une VM sans carte graphique dédiée : pilote logiciel manquant, variable d'environnement mal placée, RAM insuffisante."
            },
            {
              "title": "Cas pratique multi-utilisateurs",
              "description": "J'ai soumis trois comptes de robustesse croissante (mot du dictionnaire, mot complexifié, passphrase de cinq mots) à la même attaque combinée."
            }
          ],
          "title": "Méthodologie"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "MD5 vs bcrypt (benchmark)",
              "value": "3 087 100 H/s contre 119 H/s"
            },
            {
              "label": "Facteur de ralentissement bcrypt",
              "value": "environ 25 900 fois"
            },
            {
              "label": "Mot de passe faible (dictionnaire)",
              "value": "cassé"
            },
            {
              "label": "Passphrase de 5 mots",
              "value": "non cassée (dictionnaire + règles épuisés)"
            }
          ],
          "title": "Résultats chiffrés"
        },
        {
          "type": "text",
          "title": "Dépannage technique",
          "paragraphs": [
            "Hashcat nécessite un backend OpenCL fonctionnel même pour un usage CPU pur, absent par défaut sur cette VM sans GPU. La résolution m'a demandé plusieurs étapes successives : le paquet attendu (pocl-opencl-icd) n'existant pas dans les dépôts Kali, j'ai installé l'alternative mesa-opencl-icd (rendu logiciel llvmpipe).",
            "La plateforme OpenCL restait ensuite invisible pour Hashcat (0 device exposé) jusqu'à ce que je l'active explicitement via la variable d'environnement RUSTICL_ENABLE. Ma première tentative de persistance a échoué car je l'avais placée dans ~/.bashrc, alors que le shell par défaut de Kali est Zsh, qui ne lit pas ce fichier.",
            "Une fois le device détecté, le benchmark échouait encore avec une erreur d'allocation mémoire, que j'ai résolue en portant la RAM allouée à la VM de ~2 Go à 8 Go dans les paramètres VMware."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Kali Linux sous VMware Workstation Pro 17",
            "John the Ripper (attaque par dictionnaire, formats MD5 et SHA-512crypt)",
            "Hashcat (dictionnaire, règles best64, masque, force brute, benchmark GPU/CPU)",
            "mkpasswd / OpenSSL (génération de hashs de test)",
            "Mesa OpenCL (rendu logiciel llvmpipe, environnement sans GPU dédié)"
          ],
          "title": "Stack et outils"
        }
      ]
    },
    "es": {
      "title": "Cracking de contraseñas: hashing, salado y stretching",
      "heroSubtitle": "De la teoría criptográfica a la demostración medida, en un laboratorio aislado",
      "sections": [
        {
          "type": "text",
          "title": "Contexto",
          "paragraphs": [
            "Este proyecto complementa el laboratorio de honeypot con el ángulo de la 'contraseña comprometida': cómo se almacena realmente una contraseña, por qué no puede 'desencriptarse', y cómo las herramientas estándar del sector (John the Ripper, Hashcat) automatizan la prueba de miles de candidatos por segundo.",
            "Todo se ejecutó en la máquina atacante del laboratorio (Kali Linux), sin red ni objetivo externo: solo hashes generados localmente para la demostración."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Comprender y demostrar las propiedades de una función de hash criptográfica (determinismo, efecto avalancha, irreversibilidad).",
            "Comparar de forma concreta la velocidad de cracking entre un algoritmo rápido (MD5) y uno deliberadamente lento (bcrypt).",
            "Implementar las cuatro grandes familias de ataque: diccionario, diccionario + reglas de mutación, máscara, fuerza bruta pura.",
            "Ejecutar un caso práctico multiusuario realista (tipo archivo /etc/shadow) con contraseñas de robustez variable."
          ],
          "title": "Objetivos"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "title": "Generación de hashes de prueba",
              "description": "Generé hashes MD5 / SHA1 / SHA256 sin salar, luego uno SHA-512 salado vía mkpasswd, verificando personalmente el efecto avalancha y el papel de la sal."
            },
            {
              "title": "Cracking con John the Ripper",
              "description": "Ejecuté un ataque por diccionario (rockyou.txt, 14,3 millones de entradas) sobre hashes MD5 de prueba."
            },
            {
              "title": "Cracking con Hashcat",
              "description": "Ejecuté un benchmark MD5 vs bcrypt, y luego ataques por diccionario, por reglas de mutación (best64) y por máscara/fuerza bruta con cálculo del espacio de búsqueda."
            },
            {
              "title": "Resolución de un entorno sin GPU",
              "description": "Resolví una cadena de fallos OpenCL en una VM sin tarjeta gráfica dedicada: controlador de software ausente, variable de entorno mal ubicada, RAM insuficiente."
            },
            {
              "title": "Caso práctico multiusuario",
              "description": "Sometí tres cuentas de robustez creciente (palabra de diccionario, palabra complejizada, passphrase de cinco palabras) al mismo ataque combinado."
            }
          ],
          "title": "Metodología"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "MD5 vs bcrypt (benchmark)",
              "value": "3.087.100 H/s frente a 119 H/s"
            },
            {
              "label": "Factor de ralentización de bcrypt",
              "value": "unas 25.900 veces"
            },
            {
              "label": "Contraseña débil (diccionario)",
              "value": "descifrada"
            },
            {
              "label": "Passphrase de 5 palabras",
              "value": "no descifrada (diccionario + reglas agotados)"
            }
          ],
          "title": "Resultados medidos"
        },
        {
          "type": "text",
          "title": "Resolución técnica",
          "paragraphs": [
            "Hashcat necesita un backend OpenCL funcional incluso para uso exclusivo de CPU, ausente por defecto en esta VM sin GPU. Resolverlo me llevó varios pasos: el paquete esperado (pocl-opencl-icd) no existía en los repositorios de Kali, así que instalé la alternativa mesa-opencl-icd (renderizado por software llvmpipe).",
            "La plataforma OpenCL seguía siendo invisible para Hashcat (0 dispositivos expuestos) hasta que la activé explícitamente mediante la variable de entorno RUSTICL_ENABLE. Mi primer intento de hacerla persistente falló porque la había colocado en ~/.bashrc, mientras que el shell por defecto de Kali es Zsh, que no lee ese archivo.",
            "Una vez detectado el dispositivo, el benchmark seguía fallando con un error de asignación de memoria, que resolví aumentando la RAM asignada a la VM de ~2 GB a 8 GB en la configuración de VMware."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Kali Linux sobre VMware Workstation Pro 17",
            "John the Ripper (ataque por diccionario, formatos MD5 y SHA-512crypt)",
            "Hashcat (diccionario, reglas best64, máscara, fuerza bruta, benchmark GPU/CPU)",
            "mkpasswd / OpenSSL (generación de hashes de prueba)",
            "Mesa OpenCL (renderizado por software llvmpipe, entorno sin GPU dedicada)"
          ],
          "title": "Stack y herramientas"
        }
      ]
    }
  }
};

export default details;

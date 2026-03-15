# Portfolio Updated Files

Ce dossier contient des fichiers modifiés et des ressources pour corriger et améliorer votre portfolio Next.js.

## Contenu

- `components/Hero.tsx` : exemple de composant avec le bouton « Télécharger le CV » dynamique. Il construit le chemin du CV en fonction de la langue (`locale`) et du track (`itops` ou `salesforce`). Adaptez cette logique à votre composant actuel.
- `public/certifications/` : trois fichiers SVG pour représenter vos certifications :
  - `salesforce.svg` : pictogramme de nuage pour représenter Salesforce.
  - `comptia-security.svg` : pictogramme de bouclier pour CompTIA Security+.
  - `linguaskill.svg` : pictogramme de langage/éducation pour Linguaskill (Cambridge University).

## Instructions

1. **Intégration des SVG** : placez les fichiers SVG dans `public/certifications` de votre projet Next.js et importez-les dans vos pages/sections appropriées.
2. **Mise à jour du bouton « Télécharger le CV »** : utilisez le composant fourni (`Hero.tsx`) comme référence pour générer dynamiquement l’URL du CV en fonction de la langue et du track. N’oubliez pas de nommer vos fichiers PDF selon le schéma `cv-<locale>-<track>.pdf` (par exemple `cv-en-itops.pdf`).
3. **Renommage des images de projets** : renommez les fichiers d’images dans `public/projects/<slug>/` pour les normaliser (par exemple `cover.webp`, `screenshot-1.webp`, etc.) et mettez à jour les chemins d’import correspondants dans votre code ou dans votre base de données Supabase.
4. Après ces modifications, testez l’interface pour vérifier que tout s’affiche correctement, notamment le bouton de CV et les nouvelles icônes de certifications.

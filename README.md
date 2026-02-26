# Portfolio — Next.js (App Router) + next-intl

Portfolio professionnel (FR/EN) basé sur **Next.js App Router**, avec contenus structurés (projets, études de cas, blog) et des composants orientés conversion (CTA, contact, etc.).

## 🌐 Démo
- FR : https://portfolio-next-one-gold.vercel.app/fr
- EN : https://portfolio-next-one-gold.vercel.app/en

> Pensez à personnaliser : contenu, images, PDF (CV), liens, témoignages.

---

## ✅ Prérequis
- Node.js 18+ (recommandé : 20+)
- pnpm (recommandé) ou npm

---

## ▶️ Lancer en local

```bash
cd portfolio-optimized
pnpm install
pnpm dev
```

Ouvrir : http://localhost:3000/fr

---

## 🔧 Variables d’environnement (optionnelles mais recommandées)

Créer un fichier `.env.local` à la racine de `portfolio-optimized/` :

```bash
# Lien Calendly (bouton "Appel")
NEXT_PUBLIC_CALENDLY_URL=

# Lien du CV PDF (si vide, l’UI affiche "CV disponible sur demande")
NEXT_PUBLIC_CV_PDF_URL=

# Avatar externe (sinon /public/avatar.webp)
NEXT_PUBLIC_AVATAR_URL=

# Nom du site (metadata)
NEXT_PUBLIC_SITE_NAME=
```

### CV (important)
- Si vous fournissez un CV local, placez-le dans `public/cv.pdf`.
- Recommandation : utilisez `NEXT_PUBLIC_CV_PDF_URL` pour pointer vers un PDF hébergé (Drive/Notion/CDN), afin d’éviter tout “placeholder”.

---

## ✉️ Formulaire de contact

Le formulaire est prévu pour fonctionner en mode “forwarding” via une URL (ex : Formspree).

Variables attendues (voir le code du handler API) :
- `FORMSPREE_ENDPOINT` : URL Formspree (ou équivalent)

> Si vous préférez SMTP / SendGrid / Resend : adaptez le handler côté serveur.

---

## 🧩 Contenu

- Projets : `content/projects.ts`
- Détails projets : `content/projectDetails.ts`
- Articles blog : `content/blog/posts/{fr|en}/*.mdx`
- Témoignages : `content/testimonials.ts`

---

## 🚀 Déploiement (Vercel)

1. Importer le repo dans Vercel
2. Configurer les variables d’environnement
3. Déployer

---

## 🧪 Qualité

- Préférez un seul H1 par page (le layout gère le H1 pour les articles)
- Évitez le contenu dupliqué (DOM) pour l’accessibilité/SEO
- Pensez à vérifier Lighthouse (Perf/SEO/A11y) avant publication

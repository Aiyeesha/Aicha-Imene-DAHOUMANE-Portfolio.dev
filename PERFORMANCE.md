# Guide d'optimisation des performances

Ce document explique les optimisations implémentées et comment maintenir d'excellentes performances.

## 🎯 Objectifs de performance

- **Lighthouse Performance** : > 90
- **First Contentful Paint (FCP)** : < 1.8s
- **Largest Contentful Paint (LCP)** : < 2.5s
- **Time to Interactive (TTI)** : < 3.8s
- **Cumulative Layout Shift (CLS)** : < 0.1

## ✅ Optimisations implémentées

### 1. Images optimisées

**Problème** : Les images non optimisées sont la cause #1 de mauvaise performance.

**Solution** : Utilisation systématique de `next/image`

```tsx
// ❌ Mauvaise pratique
<img src="/profile.jpg" alt="Profile" />

// ✅ Bonne pratique
import Image from 'next/image';

<Image
  src="/profile.jpg"
  alt="Profile picture"
  width={400}
  height={400}
  priority // Pour les images above-the-fold
  placeholder="blur"
  blurDataURL="data:image/..." // Placeholder pendant chargement
/>
```

**Avantages** :
- Format WebP automatique
- Lazy loading par défaut
- Responsive sizing
- Pas de CLS (layout shift)

### 2. Fonts optimisées

**Next.js 16 optimise automatiquement les fonts.**

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Affiche le fallback en attendant
  variable: '--font-inter',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

### 3. Code splitting automatique

Next.js fait du code splitting par route automatiquement.

**Pour les composants lourds** :

```tsx
import dynamic from 'next/dynamic';

// Composant chargé uniquement quand nécessaire
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false, // Désactiver SSR si pas nécessaire
});
```

### 4. Bundle analysis

**Analyser la taille du bundle** :

```bash
# Installer l'outil
npm install --save-dev @next/bundle-analyzer

# Ajouter dans next.config.mjs
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

# Analyser
ANALYZE=true npm run build
```

### 5. Preload des ressources critiques

```tsx
// app/layout.tsx
export default function RootLayout() {
  return (
    <html>
      <head>
        {/* Preload des ressources critiques */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>...</body>
    </html>
  );
}
```

### 6. Metadata pour SEO et performance

```tsx
// app/[locale]/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aïcha Imène DAHOUNANE - Salesforce Developer & Consultant',
  description: 'Développeuse et consultante Salesforce avec expertise DevOps. CI/CD, Apex, Flow, Lightning.',
  openGraph: {
    title: 'Aïcha Imène DAHOUNANE - Salesforce Developer',
    description: 'Portfolio et blog technique Salesforce',
    url: 'https://portfolio-aicha.com',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio Preview',
      },
    ],
  },
};
```

### 7. Analytics légers

Utilisation de **Vercel Analytics** au lieu de Google Analytics (plus léger).

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### 8. Compression Gzip/Brotli

**Automatique sur Vercel**, mais pour d'autres hébergeurs :

```js
// next.config.mjs
const nextConfig = {
  compress: true, // Active Gzip
};
```

### 9. Caching agressif

```tsx
// app/blog/[slug]/page.tsx
export const revalidate = 3600; // Revalidate toutes les heures

export async function generateStaticParams() {
  // Génère toutes les pages blog au build time
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

### 10. Lazy loading des sections

```tsx
'use client';

import { useEffect, useState } from 'react';

export default function HeavySection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Intersection Observer pour charger uniquement si visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('#heavy-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div id="heavy-section">
      {isVisible ? <HeavyContent /> : <div>Loading...</div>}
    </div>
  );
}
```

## 📊 Mesurer les performances

### Lighthouse

```bash
# Local
npm run build
npm run start
npx lighthouse http://localhost:3000 --view

# Production
npx lighthouse https://votre-site.com --view
```

### WebPageTest

[https://www.webpagetest.org/](https://www.webpagetest.org/)

### Vercel Analytics

Dashboard intégré dans Vercel pour :
- Real User Monitoring (RUM)
- Core Web Vitals
- Geographical performance

## 🔧 Checklist avant déploiement

- [ ] Toutes les images utilisent `next/image`
- [ ] Images avec `priority` pour above-the-fold
- [ ] Fonts optimisées avec `next/font`
- [ ] Bundle size < 200KB (First Load JS)
- [ ] Lighthouse score > 90
- [ ] Pas de console.log en production
- [ ] Metadata SEO complètes
- [ ] Sitemap et robots.txt
- [ ] Analytics configurés

## 🚀 Améliorations futures

### Service Worker pour PWA

```ts
// next.config.mjs
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA(nextConfig);
```

### Edge Functions

Migrer certaines API routes vers Edge Runtime :

```ts
// app/api/contact/route.ts
export const runtime = 'edge';

export async function POST(request: Request) {
  // Logic
}
```

### Image CDN

Utiliser Cloudflare Images ou Vercel Image Optimization :

```tsx
<Image
  src="https://cdn.cloudflare.com/image.jpg"
  loader={cloudflareLoader}
  ...
/>
```

## 📚 Ressources

- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Performance](https://web.dev/performance/)
- [Vercel Analytics](https://vercel.com/docs/analytics)
- [Core Web Vitals](https://web.dev/vitals/)

---

**Dernière mise à jour** : Février 2026

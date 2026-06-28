import type { Metadata } from "next";
import Link from "next/link";
import { getSiteUrl } from "@/lib/siteUrl";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const siteUrl = getSiteUrl();
  const title = isFr
    ? "Remerciements sécurité — Aïcha Imène DAHOUMANE"
    : "Security Acknowledgments — Aïcha Imène DAHOUMANE";
  return {
    title,
    robots: { index: false },
    alternates: {
      canonical: `${siteUrl}/${locale}/security/acknowledgments`,
      languages: {
        en: `${siteUrl}/en/security/acknowledgments`,
        fr: `${siteUrl}/fr/security/acknowledgments`,
      },
    },
  };
}

export default async function SecurityAcknowledgmentsPage({ params }: PageProps) {
  const { locale } = await params;
  const isFr = locale === "fr";

  return (
    <div className="py-14 max-w-2xl">
      <h1 className="text-3xl font-semibold text-strong">
        {isFr ? "Remerciements sécurité" : "Security Acknowledgments"}
      </h1>
      <p className="mt-4 text-sm text-muted leading-relaxed">
        {isFr
          ? "Cette page remercie les chercheurs en sécurité qui ont signalé des vulnérabilités de manière responsable via la politique de divulgation disponible dans le fichier "
          : "This page acknowledges security researchers who have responsibly disclosed vulnerabilities through the disclosure policy available in the "}
        <a
          href="/.well-known/security.txt"
          className="underline underline-offset-4 hover:opacity-70 transition-opacity"
        >
          security.txt
        </a>
        {isFr ? "." : " file."}
      </p>

      <div className="mt-10 card p-6">
        <p className="text-sm text-muted-2 italic">
          {isFr
            ? "Aucun rapport reçu à ce jour. Merci pour votre vigilance."
            : "No reports received to date. Thank you for your vigilance."}
        </p>
      </div>

      <div className="mt-10">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
        >
          ← {isFr ? "Retour à l'accueil" : "Back to home"}
        </Link>
      </div>
    </div>
  );
}

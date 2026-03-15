import Link from 'next/link';
import { useLocale } from 'next-intl';

interface HeroProps {
  /**
   * Track selected by the user. Possible values: 'itops' or 'salesforce'.
   */
  track: 'itops' | 'salesforce';
}

/**
 * Hero component with dynamic CV download button.
 * This example demonstrates how to build the URL to the CV PDF based on the
 * current locale and track. In your real project, integrate this logic in your
 * existing hero component or wherever the CV download button resides.
 */
export default function Hero({ track }: HeroProps) {
  const locale = useLocale(); // returns 'en' or 'fr' depending on the current locale

  // Build CV file path: cv-en-itops.pdf, cv-en-salesforce.pdf, etc.
  const cvUrl = `/cv/cv-${locale}-${track}.pdf`;

  return (
    <section className="hero">
      {/* Other hero content here */}

      <div className="mt-6 flex gap-4">
        <Link href={cvUrl} legacyBehavior>
          <a
            className="rounded-md border border-primary px-4 py-2 text-primary hover:bg-primary hover:text-background"
            download
          >
            Télécharger le CV
          </a>
        </Link>
      </div>
    </section>
  );
}

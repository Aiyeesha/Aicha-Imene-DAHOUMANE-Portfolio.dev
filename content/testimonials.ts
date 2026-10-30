export type Testimonial = {
  id: string;
  /** Display name (can be anonymized) */
  name: string;
  role: string;
  company?: string;
  /** Optional: context (project type, timeframe, collaboration) */
  context?: string;
  quote: string;
  /**
   * Unattributed template (name/role/company still in brackets): must NEVER
   * be rendered. components/Testimonials.tsx filters on this flag; do not
   * rely on NEXT_PUBLIC_SHOW_TESTIMONIALS alone to prevent accidental
   * publication.
   */
  isPlaceholder?: boolean;
};

// POLICY: only real, attributable testimonials go here, ideally collected
// through the invitation link (/api/admin/testimonial-invite). Never add
// invented or anonymized quotes: this repository is public, so anything in
// this file is published, whatever NEXT_PUBLIC_SHOW_TESTIMONIALS says.
export const testimonials: Testimonial[] = [];

/**
 * Single switch for every testimonials entry point (home section, navbar,
 * command palette): the env flag alone is not enough, there must also be at
 * least one publishable entry, otherwise an empty section would be shown.
 */
export const showTestimonials =
  process.env.NEXT_PUBLIC_SHOW_TESTIMONIALS === "true" &&
  testimonials.some((item) => !item.isPlaceholder);

/**
 * HomeCTA Widget
 * @module widgets/home-cta
 *
 * ✅ DIAMOND STANDARD: Widgets Layer Component
 *
 * Call-to-action section with gradient background encouraging
 * users to sign up for the platform.
 *
 * **Architecture Compliance:**
 * - FSD widgets/ layer (composite UI block)
 * - WCAG 2.2 compliant (semantic HTML, aria-labelledby)
 * - Internationalized (next-intl)
 * - Imports only from shared/ layer (FSD rules)
 *
 * **Accessibility:**
 * - Semantic <section> element with aria-labelledby
 * - Proper heading hierarchy
 * - High contrast gradient background with text
 *
 * @see {@link https://feature-sliced.design/docs/get-started/overview}
 * @see {@link https://www.w3.org/WAI/WCAG22/quickref/}
 */

import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui';

interface HomeCTAProps {
  onWaitlistClick: () => void;
}

/**
 * HomeCTA Component
 *
 * Final call-to-action section with signup button.
 *
 * @returns {JSX.Element} The CTA component
 */
export function HomeCTA({ onWaitlistClick }: HomeCTAProps) {
  const t = useTranslations();

  return (
    <section
      className="relative pb-6 pt-12 md:pb-8 md:pt-20"
      aria-labelledby="cta-heading"
    >
      <div className="container mx-auto px-4 text-center md:px-6">
        <h2
          id="cta-heading"
          className="mb-3 text-2xl font-bold sm:text-3xl md:mb-4 md:text-4xl"
        >
          {t('home.cta.title')}
        </h2>
        <p className="muted mb-6 text-base sm:text-lg md:mb-8 md:text-xl">
          {t('home.cta.subtitle')}
        </p>
        <Button
          onClick={onWaitlistClick}
          variant="default"
          className="btn-primary w-full px-6 py-3 text-base shadow-xl sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
        >
          {t('home.cta.button')}
        </Button>
        <p className="muted mt-3 text-xs sm:text-sm md:mt-4">
          {t('home.cta.disclaimer')}
        </p>
      </div>
    </section>
  );
}

/**
 * HomeStats Widget
 * @module widgets/home-stats
 *
 * ✅ DIAMOND STANDARD: Widgets Layer Component
 *
 * Statistics display section showing platform metrics
 * (users, jobs, revenue, rating).
 *
 * **Architecture Compliance:**
 * - FSD widgets/ layer (composite UI block)
 * - WCAG 2.2 compliant (semantic HTML, ARIA labels)
 * - Internationalized (next-intl)
 * - Imports only from shared/ layer (FSD rules)
 *
 * **Accessibility:**
 * - Semantic <section> element with aria-labelledby
 * - Screen-reader only heading
 * - ARIA labels for each stat value
 *
 * @see {@link https://feature-sliced.design/docs/get-started/overview}
 * @see {@link https://www.w3.org/WAI/WCAG22/quickref/}
 */

import { useTranslations } from 'next-intl';

/**
 * HomeStats Component
 *
 * Statistics section with 4 key platform metrics.
 *
 * @returns {JSX.Element} The stats component
 */
export function HomeStats() {
  const t = useTranslations();

  return (
    <section
      className="bg-slate-800 py-10 md:py-16"
      aria-labelledby="stats-heading"
    >
      <h2 id="stats-heading" className="sr-only">
        Platform Statistics
      </h2>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4 md:gap-8">
          <div>
            <p
              className="mb-1 text-2xl font-bold text-teal-400 sm:text-3xl md:mb-2 md:text-4xl"
              aria-label={`${t('home.stats.users.value')} ${t('home.stats.users.label')}`}
            >
              {t('home.stats.users.value')}
            </p>
            <p className="text-xs text-slate-400 sm:text-sm md:text-base">
              {t('home.stats.users.label')}
            </p>
          </div>
          <div>
            <p
              className="mb-1 text-2xl font-bold text-teal-400 sm:text-3xl md:mb-2 md:text-4xl"
              aria-label={`${t('home.stats.jobs.value')} ${t('home.stats.jobs.label')}`}
            >
              {t('home.stats.jobs.value')}
            </p>
            <p className="text-xs text-slate-400 sm:text-sm md:text-base">
              {t('home.stats.jobs.label')}
            </p>
          </div>
          <div>
            <p
              className="mb-1 text-2xl font-bold text-teal-400 sm:text-3xl md:mb-2 md:text-4xl"
              aria-label={`${t('home.stats.revenue.value')} ${t('home.stats.revenue.label')}`}
            >
              {t('home.stats.revenue.value')}
            </p>
            <p className="text-xs text-slate-400 sm:text-sm md:text-base">
              {t('home.stats.revenue.label')}
            </p>
          </div>
          <div>
            <p
              className="mb-1 text-2xl font-bold text-teal-400 sm:text-3xl md:mb-2 md:text-4xl"
              aria-label={`${t('home.stats.rating.value')} ${t('home.stats.rating.label')}`}
            >
              {t('home.stats.rating.value')}
            </p>
            <p className="text-xs text-slate-400 sm:text-sm md:text-base">
              {t('home.stats.rating.label')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

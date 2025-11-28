/**
 * HomeRoadmap Widget
 * @module widgets/home-roadmap
 *
 * ✅ DIAMOND STANDARD: Widgets Layer Component
 *
 * Roadmap section displaying feature release timeline.
 *
 * **Architecture Compliance:**
 * - FSD widgets/ layer (composite UI block)
 * - WCAG 2.2 compliant (semantic HTML, proper heading hierarchy)
 * - Imports only from shared/ layer (FSD rules)
 *
 * **Accessibility:**
 * - Semantic <section> element with aria-labelledby
 * - Proper heading hierarchy
 *
 * @see {@link https://feature-sliced.design/docs/get-started/overview}
 * @see {@link https://www.w3.org/WAI/WCAG22/quickref/}
 */

import { useTranslations } from 'next-intl';

/**
 * HomeRoadmap Component
 *
 * Displays 3-column grid of feature releases by quarter.
 *
 * @returns {JSX.Element} The roadmap component
 */
export function HomeRoadmap() {
  const t = useTranslations('home.roadmap');

  return (
    <section
      id="roadmap"
      className="relative pb-16 pt-6 md:pb-24 md:pt-8"
      aria-labelledby="roadmap-heading"
    >
      <div className="container mx-auto max-w-4xl px-6">
        <h3
          id="roadmap-heading"
          className="mb-6 text-center text-2xl font-bold"
        >
          {t('title')}
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Q4 2025 - Live */}
          <div className="card p-4 transition-colors hover:bg-white/5">
            <div className="mb-1 text-sm text-primary">
              {t('quarters.q4_2025.label')}
            </div>
            <div className="text-lg font-semibold">
              {t('quarters.q4_2025.title')}
            </div>
            <p className="muted mt-2 text-sm">
              {t('quarters.q4_2025.description')}
            </p>
          </div>

          {/* Q1 2026 - In Development */}
          <div className="card p-4 transition-colors hover:bg-white/5">
            <div className="mb-1 text-sm text-yellow-500">
              {t('quarters.q1_2026.label')}
            </div>
            <div className="text-lg font-semibold">
              {t('quarters.q1_2026.title')}
            </div>
            <p className="muted mt-2 text-sm">
              {t('quarters.q1_2026.description')}
            </p>
          </div>

          {/* Q2 2026 - Coming Soon */}
          <div className="card p-4 transition-colors hover:bg-white/5">
            <div className="mb-1 text-sm text-red-400">
              {t('quarters.q2_2026.label')}
            </div>
            <div className="text-lg font-semibold">
              {t('quarters.q2_2026.title')}
            </div>
            <p className="muted mt-2 text-sm">
              {t('quarters.q2_2026.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

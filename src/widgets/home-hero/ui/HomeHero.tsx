/**
 * HomeHero Widget
 * @module widgets/home-hero
 *
 * ✅ DIAMOND STANDARD: Widgets Layer Component
 *
 * Hero section for the home page with two-column layout,
 * status badge, benefit list, trust signals, and hero mockup.
 *
 * **Architecture Compliance:**
 * - FSD widgets/ layer (composite UI block)
 * - WCAG 2.2 compliant (semantic HTML, proper heading hierarchy)
 * - Imports only from shared/ layer (FSD rules)
 *
 * **Accessibility:**
 * - Semantic <section> element with aria-labelledby
 * - Proper heading hierarchy (h1 for main hero heading)
 * - aria-hidden for decorative gradient overlay
 *
 * @see {@link https://feature-sliced.design/docs/get-started/overview}
 * @see {@link https://www.w3.org/WAI/WCAG22/quickref/}
 */

import { useTranslations } from 'next-intl';

interface HomeHeroProps {
  onWaitlistClick: () => void;
}

/**
 * HomeHero Component
 *
 * Two-column hero section with title, benefits, and mockup card.
 *
 * @returns {JSX.Element} The hero component
 */
export function HomeHero({ onWaitlistClick }: HomeHeroProps) {
  const t = useTranslations('home.hero');

  return (
    <main className="mx-auto max-w-7xl px-6">
      <section
        className="grid grid-cols-1 items-center gap-10 py-16 md:grid-cols-2 md:py-24"
        aria-labelledby="hero-heading"
      >
        <div>
          {/* Status Badge */}
          <div className="mb-6 inline-flex items-center gap-2">
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
              {t('badge.label')}
            </span>
            <span className="text-sm text-muted-foreground">
              {t('badge.text')}
            </span>
          </div>

          {/* Hero Title */}
          <h1
            id="hero-heading"
            className="mb-6 text-4xl font-extrabold leading-tight text-foreground md:text-6xl"
          >
            {t('title')}
          </h1>

          {/* Hero Subtitle */}
          <p className="muted mb-8 max-w-xl text-lg">{t('subtitle')}</p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              onClick={onWaitlistClick}
              className="btn-primary px-8 py-4 text-base font-bold shadow-lg"
            >
              {t('cta.primary')}
            </button>
            <a
              href="#features"
              className="muted rounded-md border border-border px-6 py-4 text-center transition-colors hover:bg-card hover:text-foreground"
            >
              {t('cta.secondary')}
            </a>
          </div>

          {/* Quick Benefit List */}
          <ul className="mt-10 space-y-3 text-sm md:text-base">
            {['0', '1', '2'].map((idx) => (
              <li key={idx} className="flex gap-3">
                <strong className="text-primary">✓</strong>{' '}
                {t(`benefits.${idx}`)}
              </li>
            ))}
          </ul>

          {/* Trust / Microproof */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="card px-4 py-3">
              <div className="text-sm">
                <div className="muted text-xs">{t('trust.label')}</div>
                <div className="font-semibold">{t('trust.value')}</div>
              </div>
            </div>
            <div className="muted text-xs">{t('trust.disclaimer')}</div>
          </div>
        </div>

        {/* Hero Mockup */}
        <div className="relative flex justify-center md:justify-end">
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-teal-500/20 to-blue-500/20 opacity-50 blur-3xl"
            aria-hidden="true"
          ></div>
          <div className="card w-full max-w-lg border border-border bg-card/80 p-4 shadow-2xl backdrop-blur-sm md:p-6">
            <img
              className="h-auto w-full rounded-xl"
              alt={t('mockup.alt')}
              src="/GWDB.svg"
            />
            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="muted text-xs">{t('mockup.label')}</div>
                <div className="text-sm font-semibold">{t('mockup.title')}</div>
              </div>
              <div className="badge badge-live">{t('mockup.badge')}</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

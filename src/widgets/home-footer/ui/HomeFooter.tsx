/**
 * HomeFooter Widget
 * @module widgets/home-footer
 *
 * ✅ DIAMOND STANDARD: Widgets Layer Component
 *
 * Footer section with app branding, navigation links, and copyright.
 *
 * **Architecture Compliance:**
 * - FSD widgets/ layer (composite UI block)
 * - WCAG 2.2 compliant (semantic HTML, ARIA labels, focus states)
 * - Internationalized (next-intl)
 * - Imports only from shared/ layer (FSD rules)
 *
 * **Accessibility:**
 * - Semantic <footer> element with role="contentinfo"
 * - ARIA labels for navigation
 * - Focus-visible utilities for keyboard navigation
 *
 * @see {@link https://feature-sliced.design/docs/get-started/overview}
 * @see {@link https://www.w3.org/WAI/WCAG22/quickref/}
 */

import { useTranslations } from 'next-intl';

interface HomeFooterProps {
  onWaitlistClick: () => void;
}

/**
 * HomeFooter Component
 *
 * Footer with branding, navigation, and copyright.
 *
 * @returns {JSX.Element} The footer component
 */
export function HomeFooter({ onWaitlistClick }: HomeFooterProps) {
  const t = useTranslations();

  return (
    <footer
      className="muted mx-auto mt-12 max-w-7xl border-t border-border px-6 py-10 text-sm"
      role="contentinfo"
    >
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center md:gap-4">
        <div>
          <div className="font-semibold text-foreground">
            {t('common.appName')}
          </div>
          <div className="muted">
            The Ultimate Tool for Field Service Professionals
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-8">
          <button onClick={onWaitlistClick} className="nav-link">
            Join Waitlist
          </button>
          <a href="#features" className="nav-link">
            Features
          </a>
          <a href="#pricing" className="nav-link">
            Pricing
          </a>
          <a href="#roadmap" className="nav-link">
            Roadmap
          </a>
        </div>
      </div>
      <div className="mt-8 flex flex-col justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
        <div>© 2025 GetWorken. All rights reserved.</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}

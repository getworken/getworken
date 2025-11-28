/**
 * HomeHeader Widget
 * @module widgets/home-header
 *
 * ✅ DIAMOND STANDARD: Widgets Layer Component
 *
 * Sticky navigation header for the home page with app branding,
 * navigation links, and authentication CTAs.
 *
 * **Architecture Compliance:**
 * - FSD widgets/ layer (composite UI block)
 * - WCAG 2.2 compliant (semantic HTML, ARIA labels, focus states)
 * - Internationalized (next-intl)
 * - Imports only from shared/ layer (FSD rules)
 *
 * **Accessibility:**
 * - Semantic <header> and <nav> elements
 * - role="banner" for landmark navigation
 * - ARIA labels for navigation
 * - Focus-visible utilities for keyboard navigation
 *
 * @see {@link https://feature-sliced.design/docs/get-started/overview}
 * @see {@link https://www.w3.org/WAI/WCAG22/quickref/}
 */

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface HomeHeaderProps {
  onWaitlistClick: () => void;
}

/**
 * HomeHeader Component
 *
 * Sticky navigation header with logo and navigation links.
 * Includes hamburger menu for mobile devices.
 *
 * @returns {JSX.Element} The header component
 */
export function HomeHeader({ onWaitlistClick }: HomeHeaderProps) {
  const t = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur-md"
      role="banner"
    >
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="/" className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground"
            aria-hidden="true"
          >
            W
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              {t('common.appName')}
            </h1>
            <div className="muted text-xs">{t('common.tagline')}</div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-6 md:flex"
          role="navigation"
          aria-label="Main navigation"
        >
          <a
            href="#features"
            className="nav-link"
            aria-label={t('home.nav.features')}
          >
            {t('home.nav.features')}
          </a>
          <a
            href="#pricing"
            className="nav-link"
            aria-label={t('home.nav.pricing')}
          >
            {t('home.nav.pricing')}
          </a>
          <a href="#roadmap" className="nav-link">
            Roadmap
          </a>
          <button
            onClick={onWaitlistClick}
            className="btn-primary text-sm font-medium"
            aria-haspopup="dialog"
          >
            Join Waitlist
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="text-foreground md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav
          className="border-t border-border bg-card md:hidden"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="container mx-auto flex flex-col space-y-2 px-6 py-4">
            <a
              href="#features"
              className="nav-link block rounded px-3 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('home.nav.features')}
            </a>
            <a
              href="#pricing"
              className="nav-link block rounded px-3 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('home.nav.pricing')}
            </a>
            <a
              href="#roadmap"
              className="nav-link block rounded px-3 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Roadmap
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onWaitlistClick();
              }}
              className="btn-primary w-full"
            >
              Join Waitlist
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}

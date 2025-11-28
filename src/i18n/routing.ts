/**
 * Internationalization Routing Configuration
 * @module i18n/routing
 * 
 * ✅ DIAMOND STANDARD: i18n is mandatory from Day 1
 * 
 * This file configures the supported locales and routing behavior
 * for next-intl with Next.js 16
 */

import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

/**
 * Supported locales
 * - en: English (default)
 * - es: Spanish
 * - fr: French
 */
export const locales = ['en', 'es', 'fr'] as const;

/**
 * Default locale
 */
export const defaultLocale = 'en' as const;

/**
 * Routing configuration
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always', // Always show locale in URL: /en/dashboard
});

/**
 * Navigation helpers with locale support
 * Use these instead of Next.js built-in navigation
 * 
 * @example
 * import { Link, redirect } from '@/i18n/navigation';
 * 
 * <Link href="/dashboard">Dashboard</Link>
 * // → /en/dashboard (or current locale)
 */
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);

export type Locale = (typeof locales)[number];

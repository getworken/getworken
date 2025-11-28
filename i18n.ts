/**
 * next-intl Configuration
 * @module i18n
 * 
 * This is the main configuration file for next-intl
 * It must be in the root of the project
 */

import { getRequestConfig } from 'next-intl/server';
import { routing } from './src/i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that the incoming `locale` is valid
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

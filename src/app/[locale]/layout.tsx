/**
 * Root Layout Stub
 * @see {@link file://../src/app/RootLayout.tsx}
 *
 * ✅ DIAMOND STANDARD: app/ folder is for routing only
 * The actual layout implementation is in src/app/RootLayout.tsx
 */

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import RootLayout from '@/app/RootLayout';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <RootLayout params={params}>{children}</RootLayout>
    </NextIntlClientProvider>
  );
}

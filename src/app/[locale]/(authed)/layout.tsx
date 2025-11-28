/**
 * Authenticated Routes Layout
 * @module app/[locale]/(authed)/layout
 * 
 * ✅ DIAMOND STANDARD: App Router with Server-Side Authentication
 * - Part of the Next.js App Router (routing layer only)
 * - Checks for session cookie on the server
 * - Redirects to login if not authenticated
 * - All actual UI logic lives in src/widgets/dashboard-layout
 * 
 * Following Diamond Standard FSD:
 * - app/ folder is for routing stubs ONLY
 * - All business logic and UI is in src/ organized by FSD layers
 * 
 * @see {@link file://src/widgets/dashboard-layout}
 * @see {@link file://DIAMOND_STANDARD_REFERENCE.md}
 */

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DashboardLayout } from '@/widgets/dashboard-layout';
import { ClientNavigation } from '@/widgets/client-navigation';
import { logger } from '@/shared/lib/logger';

export default async function AuthedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await params in Next.js 15+
  const { locale } = await params;
  
  // Server-side authentication check
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('__session');

  logger.info({
    component: 'AuthedLayout',
    hasSession: !!sessionCookie,
    locale,
  }, 'Server-side auth check');

  // If no session cookie, redirect to login
  if (!sessionCookie) {
    logger.info({ component: 'AuthedLayout', locale }, 'No session - redirecting to login');
    redirect(`/${locale}/login`);
  }

  // Pass children to the layout component with role-specific navigation
  return (
    <DashboardLayout navigation={<ClientNavigation />}>
      {children}
    </DashboardLayout>
  );
}

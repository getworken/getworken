/**
 * Pre-Launch Guard Component
 * @module features/pre-launch
 *
 * Blocks access to all routes except homepage during pre-launch mode.
 * This runs client-side since Next.js 16 middleware is not executing.
 */

'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface PreLaunchGuardProps {
  locale: string;
}

/**
 * Client-side route guard for pre-launch mode
 * Redirects all non-homepage routes to homepage
 */
export function PreLaunchGuard({ locale }: PreLaunchGuardProps) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const LAUNCH_MODE = process.env.NEXT_PUBLIC_LAUNCH_MODE === 'true';

    // Skip if already in launch mode
    if (LAUNCH_MODE) {
      return;
    }

    // Get path without locale prefix
    const pathWithoutLocale = pathname?.replace(`/${locale}`, '') || '/';

    // Only allow homepage
    if (pathWithoutLocale !== '/') {
      console.log('[Pre-Launch Guard] Blocking access to:', pathWithoutLocale);
      router.replace(`/${locale}`);
    }
  }, [pathname, locale, router]);

  return null;
}

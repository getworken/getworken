/**
 * Next.js 16 Proxy for next-intl + Authentication
 * @see {@link https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing#step-2-configure-the-middleware}
 *
 * ⚠️ KNOWN ISSUE: This middleware is NOT executing in Next.js 16.0.1 with Turbopack
 *
 * Current Status:
 * - Middleware file exists and is properly configured
 * - Authentication logic is implemented below
 * - However, middleware is being BYPASSED by Next.js 16 + Turbopack
 * - Console logs never appear, redirects never execute
 *
 * Workaround:
 * - Server-side authentication is enforced in src/app/[locale]/(authed)/layout.tsx
 * - Layout checks for __session cookie and redirects if missing
 * - This provides Layer 2 (Server) protection instead of Layer 1 (Edge)
 *
 * Resolution Plan:
 * - Short-term: Document this limitation and rely on layout-based auth
 * - Long-term: Monitor Next.js releases for middleware fix
 * - Consider: Downgrade to Next.js 15.x if middleware is critical
 *
 * Related Issues:
 * - Next.js 16 + Turbopack middleware execution issues
 * - next-intl v4 + Next.js 16 integration challenges
 *
 * This file is required for Next.js 16 + next-intl 4.4+
 * It replaces the old middleware.ts pattern and includes authentication
 */

import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

/**
 * PRE-LAUNCH MODE: Only homepage accessible
 * Set NEXT_PUBLIC_LAUNCH_MODE=true to enable all routes
 */
const LAUNCH_MODE = process.env.NEXT_PUBLIC_LAUNCH_MODE === 'true';

/**
 * Routes accessible in pre-launch mode (waitlist only)
 */
const preLaunchRoutes = ['/'];

/**
 * Protected route patterns (blocked in pre-launch)
 * These routes require authentication after launch
 */
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/settings',
  '/getstarted',
  '/team',
  '/directory',
  '/chat',
];

/**
 * Public route patterns (blocked in pre-launch)
 * These routes are accessible without authentication after launch
 */
const publicRoutes = ['/login', '/signup', '/forgot-password'];

/**
 * Check if a path matches any pattern in the array
 */
function matchesRoute(path: string, routes: string[]): boolean {
  return routes.some((route) => {
    return path === route || path.startsWith(`${route}/`);
  });
}

/**
 * Get path without locale prefix
 */
function getPathWithoutLocale(pathname: string): string {
  const match = pathname.match(/^\/([a-z]{2})(\/|$)/);
  if (!match) return pathname;
  const locale = match[1];
  return pathname.replace(`/${locale}`, '') || '/';
}

/**
 * Get locale from pathname
 */
function getLocaleFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/([a-z]{2})(\/|$)/);
  return match?.[1] ?? null;
}

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get('user-agent') || '';

  console.log(
    '[Proxy/Middleware] Request:',
    pathname,
    'Launch Mode:',
    LAUNCH_MODE
  );

  // Block malicious bots and scrapers
  const suspiciousBots = [
    'python',
    'scrapy',
    'curl',
    'wget',
    'aiohttp',
    'httpx',
    'go-http-client',
    'axios',
  ];

  const isSuspiciousBot = suspiciousBots.some((bot) =>
    userAgent.toLowerCase().includes(bot.toLowerCase())
  );

  // Block requests with malformed URLs (e.g., URLs with quotes)
  const hasMalformedUrl = pathname.includes('%22') || pathname.includes('"');

  if (isSuspiciousBot || hasMalformedUrl) {
    console.log('[Proxy/Middleware] BLOCKED - Bot or malformed URL:', {
      pathname,
      userAgent,
      reason: hasMalformedUrl ? 'malformed-url' : 'suspicious-bot',
    });

    return new NextResponse('Forbidden', {
      status: 403,
      headers: {
        'X-Blocked-Reason': hasMalformedUrl
          ? 'malformed-url'
          : 'suspicious-bot',
      },
    });
  }

  // Skip middleware for static files, API routes, and monitoring
  if (
    pathname.includes('/_next') ||
    pathname.includes('/api/') ||
    pathname.includes('/static/') ||
    pathname.includes('/monitoring') ||
    pathname.includes('/sentry') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|woff|woff2|ttf|eot)$/)
  ) {
    console.log('[Proxy/Middleware] Skipping:', pathname);
    return intlMiddleware(request);
  }

  // Get path without locale for route matching
  const pathWithoutLocale = getPathWithoutLocale(pathname);
  const locale = getLocaleFromPath(pathname) || 'en';

  // PRE-LAUNCH MODE: Block everything except homepage
  if (!LAUNCH_MODE) {
    const isPreLaunchRoute = matchesRoute(pathWithoutLocale, preLaunchRoutes);

    if (!isPreLaunchRoute) {
      console.log(
        '[Proxy/Middleware] PRE-LAUNCH - Blocking access to:',
        pathWithoutLocale
      );
      const homeUrl = new URL(`/${locale}`, request.url);
      const response = NextResponse.redirect(homeUrl);
      response.headers.set('X-Middleware-Auth', 'pre-launch-blocked');
      return response;
    }

    // Allow homepage
    const response = intlMiddleware(request);
    if (response) {
      response.headers.set('X-Middleware-Auth', 'pre-launch-allowed');
    }
    return response;
  }

  // LAUNCH MODE: Normal authentication flow
  const isProtectedRoute = matchesRoute(pathWithoutLocale, protectedRoutes);
  const isPublicRoute = matchesRoute(pathWithoutLocale, publicRoutes);
  const sessionCookie = request.cookies.get('__session')?.value;

  console.log('[Proxy/Middleware] Auth check:', {
    path: pathWithoutLocale,
    locale,
    hasSessionCookie: !!sessionCookie,
    isProtectedRoute,
    isPublicRoute,
  });

  // Protected routes require authentication
  if (isProtectedRoute && !sessionCookie) {
    console.log(
      '[Proxy/Middleware] BLOCKING - Redirecting to login - no session'
    );
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set('from', pathWithoutLocale);
    const response = NextResponse.redirect(loginUrl);
    response.headers.set('X-Middleware-Auth', 'blocked-no-session');
    return response;
  }

  // Authenticated users trying to access public routes
  if (isPublicRoute && sessionCookie) {
    console.log(
      '[Proxy/Middleware] Redirecting to dashboard - already logged in'
    );
    const dashboardUrl = new URL(`/${locale}/dashboard`, request.url);
    const response = NextResponse.redirect(dashboardUrl);
    response.headers.set('X-Middleware-Auth', 'redirect-to-dashboard');
    return response;
  }

  // Continue with intl middleware
  const response = intlMiddleware(request);
  if (response) {
    response.headers.set('X-Middleware-Auth', 'allowed');
  }
  return response;
}

export const config = {
  // Match all routes except static files
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

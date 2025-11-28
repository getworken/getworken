/**
 * Client-side Instrumentation (Sentry RUM + Core Web Vitals)
 * @module instrumentation-client
 * 
 * ✅ DIAMOND STANDARD: Real User Monitoring (RUM)
 * 
 * Per Diamond Standard mandate: "Sentry **MUST** be integrated for production monitoring"
 * 
 * This file configures client-side Sentry initialization including:
 * - Real User Monitoring (RUM) for browser performance
 * - Core Web Vitals tracking (LCP, FID, CLS)
 * - Session Replay for debugging
 * - Error tracking with source maps
 * 
 * @see {@link https://docs.sentry.io/platforms/javascript/guides/nextjs/}
 */

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  // Sentry DSN - use environment variable for security
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || "https://3aac3368253c02e4707b7bc98e0bdca8@o4510340566417408.ingest.us.sentry.io/4510340595908608",

  // Environment configuration
  environment: process.env.NODE_ENV || 'development',
  
  // Release tracking (for deployment correlation)
  release: process.env.NEXT_PUBLIC_APP_VERSION || 'unknown',

  // RUM (Real User Monitoring) integrations
  integrations: [
    // Session Replay for visual debugging
    Sentry.replayIntegration({
      maskAllText: false, // Set to true in production for PII protection
      blockAllMedia: false,
    }),
    
    // Browser Tracing for performance monitoring
    Sentry.browserTracingIntegration({
      // Track navigation timing
      enableLongTask: true,
    }),
    
    // Core Web Vitals tracking (LCP, FID, CLS, TTFB, FCP)
    Sentry.reportingObserverIntegration(),
  ],

  // APM: Trace sampling rate
  // 100% in development, 10% in production (to reduce costs)
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Enable structured logging to Sentry
  enableLogs: true,
  
  // Session Replay sampling
  // Replay 10% of normal sessions (UX analysis)
  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Replay 100% of sessions with errors (debugging)
  replaysOnErrorSampleRate: 1.0,

  // Privacy: Send user info for better error tracking
  // ⚠️ Disable in production if strict PII requirements exist
  sendDefaultPii: process.env.NODE_ENV !== 'production',

  // Filter sensitive data before sending
  beforeSend(event, _hint) {
    // Remove sensitive query parameters
    if (event.request?.url) {
      const url = new URL(event.request.url);
      url.searchParams.delete('token');
      url.searchParams.delete('apiKey');
      url.searchParams.delete('password');
      event.request.url = url.toString();
    }
    
    // Remove cookies (potential PII)
    if (event.request?.cookies) {
      delete event.request.cookies;
    }
    
    return event;
  },

  // Ignore common non-critical errors
  ignoreErrors: [
    // Browser extensions
    'top.GLOBALS',
    'chrome-extension://',
    'moz-extension://',
    
    // Network errors
    'NetworkError',
    'Failed to fetch',
    
    // Non-critical UI errors
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
    
    // React hydration mismatches (usually harmless)
    'Hydration failed',
    'There was an error while hydrating',
    
    // Non-Error rejections
    'Non-Error promise rejection captured',
  ],
  
  // Transport options (batching)
  transport: Sentry.makeBrowserOfflineTransport(Sentry.makeFetchTransport),
});

// Export Sentry utilities for manual instrumentation
export { Sentry };

// Export router transition tracking for Next.js App Router
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

// Log initialization (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('📊 Sentry RUM initialized (client-side)');
  console.log('   - Core Web Vitals: Enabled');
  console.log('   - Session Replay: Enabled');
  console.log('   - Error Tracking: Enabled');
  console.log('   - Traces Sample Rate: 100%');
}

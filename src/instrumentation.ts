/**
 * Next.js Instrumentation Module
 * @module instrumentation
 * 
 * Registers Sentry error tracking for Node.js and Edge runtimes.
 * Automatically loaded by Next.js before application initialization.
 * 
 * ✅ DIAMOND STANDARD: Application instrumentation
 * @see {@link https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation}
 */

import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('../sentry.edge.config');
  }
}

export const onRequestError = Sentry.captureRequestError;

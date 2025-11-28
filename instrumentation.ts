/**
 * Server-side Instrumentation
 * @module instrumentation
 * 
 * ✅ DIAMOND STANDARD: Observability & Monitoring
 * 
 * This file is automatically loaded by Next.js on server startup
 * Use it to initialize logging, monitoring, and APM
 * 
 * Per Diamond Standard mandate: "Sentry **MUST** be integrated for production monitoring"
 * 
 * @see {@link https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation}
 */

import { logger } from '@/shared/lib/logger';
import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Initialize server-side logging
    logger.info('🚀 Server instrumentation initialized');
    
    // Initialize Sentry APM for server-side monitoring
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.init({
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        
        // Environment configuration
        environment: process.env.NODE_ENV || 'development',
        
        // APM (Application Performance Monitoring)
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0, // 10% in prod, 100% in dev
        
        // Enable profiling for performance insights
        profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
        
        // Enhanced error tracking
        integrations: [
          Sentry.httpIntegration(),
        ],
        
        // Filter out sensitive data
        beforeSend(event) {
          // Remove sensitive headers
          if (event.request?.headers) {
            delete event.request.headers['authorization'];
            delete event.request.headers['cookie'];
          }
          return event;
        },
        
        // Ignore common non-critical errors
        ignoreErrors: [
          'ResizeObserver loop limit exceeded',
          'Non-Error promise rejection captured',
        ],
        
        // Track release version (for deployment tracking)
        release: process.env.NEXT_PUBLIC_APP_VERSION || 'unknown',
      });
      
      logger.info({
        sentryEnabled: true,
        environment: process.env.NODE_ENV,
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      }, '📊 Sentry APM enabled for server');
    } else {
      logger.warn('⚠️  Sentry DSN not configured - APM disabled');
      logger.info('💡 Set NEXT_PUBLIC_SENTRY_DSN in .env.local to enable Sentry');
    }
    
    // Log system information
    logger.info({
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      memory: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB',
    }, '📋 Server environment info');
  }
}


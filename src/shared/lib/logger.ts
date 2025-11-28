/**
 * Structured Logger Configuration
 * @module shared/lib/logger
 * 
 * ✅ DIAMOND STANDARD: console.log() is PROHIBITED on the server
 * All server-side logging MUST use this structured logger (Pino)
 * 
 * Logs are JSON-formatted for ingestion by monitoring platforms (Sentry, Datadog, etc.)
 * 
 * @see {@link file://../../..../DIAMOND_STANDARD_REFERENCE.md#observability}
 */

import pino from 'pino';

/**
 * Create a Pino logger instance
 * In development: JSON format (Next.js 16 compatibility)
 * In production: JSON-formatted for monitoring platforms
 */
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label: string) => {
      return { level: label };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

/**
 * Create a child logger with additional context
 * 
 * @param bindings - Additional context to include in all logs
 * @returns Child logger instance
 * 
 * @example
 * const requestLogger = createLogger({ requestId: '123', userId: 'abc' });
 * requestLogger.info('Processing request');
 */
export const createLogger = (bindings: Record<string, any>) => {
  return logger.child(bindings);
};

export default logger;

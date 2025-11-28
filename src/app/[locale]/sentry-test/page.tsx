'use client';

import * as Sentry from '@sentry/nextjs';
import { Button } from '@/shared/ui';

/**
 * Test page for verifying Sentry error tracking
 *
 * This page allows you to manually trigger errors to verify that Sentry
 * is correctly capturing and reporting errors to your dashboard.
 *
 * @component
 * @example
 * // Navigate to /en/sentry-test to access this page
 */
export default function SentryTestPage() {
  const throwError = () => {
    throw new Error('Test error from Sentry test page');
  };

  const captureError = () => {
    try {
      throw new Error('Caught error sent to Sentry');
    } catch (error) {
      Sentry.captureException(error);
      alert('Error captured and sent to Sentry! Check your dashboard.');
    }
  };

  const captureMessage = () => {
    Sentry.captureMessage('Test message from Sentry test page', 'info');
    alert('Message sent to Sentry! Check your dashboard.');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Sentry Test Page</h1>

      <div className="max-w-md space-y-4">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            Use these buttons to test Sentry error tracking. Check your Sentry
            dashboard after clicking to verify errors are being captured.
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={throwError} variant="destructive" className="w-full">
            Throw Uncaught Error
          </Button>
          <p className="text-sm text-gray-600">
            Throws an error that will crash the component and be caught by
            Sentry's error boundary.
          </p>

          <Button onClick={captureError} variant="outline" className="w-full">
            Capture Handled Error
          </Button>
          <p className="text-sm text-gray-600">
            Manually captures and reports a caught error to Sentry.
          </p>

          <Button
            onClick={captureMessage}
            variant="secondary"
            className="w-full"
          >
            Send Info Message
          </Button>
          <p className="text-sm text-gray-600">
            Sends a custom message to Sentry (useful for debugging).
          </p>
        </div>

        <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <h3 className="mb-2 font-semibold text-yellow-800">What to Check:</h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-yellow-700">
            <li>Errors appear in your Sentry dashboard</li>
            <li>Stack traces are readable (source maps working)</li>
            <li>User context is attached (if configured)</li>
            <li>Environment is correct (development/production)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

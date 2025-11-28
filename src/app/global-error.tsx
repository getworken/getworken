/**
 * Global Error Handler Component
 * @module app/global-error
 * 
 * Catches unhandled errors in the Next.js app router.
 * Integrates with Sentry for error tracking and reporting.
 * 
 * ✅ DIAMOND STANDARD: App-layer error boundary
 * @see {@link https://nextjs.org/docs/app/building-your-application/routing/error-handling}
 */

"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
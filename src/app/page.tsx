/**
 * Root Page Component
 * @module app/page
 *
 * Root page that redirects to default locale.
 * Entry point for Next.js 13+ app router.
 *
 * ✅ DIAMOND STANDARD: App-layer root page
 */

import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to default locale
  redirect('/en');
}

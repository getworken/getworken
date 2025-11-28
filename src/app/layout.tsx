/**
 * Root Layout Component
 * @module app/layout
 *
 * Main application layout wrapper for Next.js 13+ app router.
 * Provides global metadata and HTML structure.
 *
 * ✅ DIAMOND STANDARD: App-layer root layout
 */

import type { Metadata } from 'next';
import './global.css';

export const metadata: Metadata = {
  title: 'GetWorken - Connect with Skilled Professionals',
  description:
    'Find and hire skilled professionals for your projects. Connect with contractors, freelancers, and service providers on GetWorken.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

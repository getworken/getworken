/**
 * Root Layout Component
 * @module app/RootLayout
 * 
 * ✅ DIAMOND STANDARD: FSD 'app' layer
 * This is the actual root layout that contains all providers
 * The app/layout.tsx file is just a stub that exports this
 */

import React from 'react';
import { AuthProvider } from './_providers';
import '../app/global.css';

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Root Layout with all app-level providers
 */
export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

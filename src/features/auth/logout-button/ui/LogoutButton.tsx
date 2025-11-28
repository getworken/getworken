/**
 * Logout Button Component
 * @module features/auth/logout-button/ui/LogoutButton
 * 
 * ✅ DIAMOND STANDARD: Feature UI Component
 * - Part of the 'auth' feature in the FSD features layer
 * - Handles user logout with loading states
 * - Uses locale-aware navigation (next-intl)
 * - WCAG 2.2 compliant with semantic HTML and focus states
 * - Fully documented with TSDoc
 * 
 * @see {@link file://src/features/auth/logout-button/ui/LogoutButton.stories.tsx}
 */

'use client';

import { type FC, useState } from 'react';
import { useLocale } from 'next-intl';
import { signOut } from 'firebase/auth';
import { auth } from '@/shared/lib/firebase/config';

/**
 * Props for the LogoutButton component
 */
export interface LogoutButtonProps {
  /**
   * Button variant style
   * @default 'danger'
   */
  variant?: 'danger' | 'ghost';
  
  /**
   * Show loading spinner when signing out
   * @default true
   */
  showLoadingState?: boolean;
  
  /**
   * Custom text for the button
   */
  children?: React.ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Callback fired after successful logout
   */
  onLogoutSuccess?: () => void;
  
  /**
   * Callback fired if logout fails
   */
  onLogoutError?: (error: Error) => void;
}

/**
 * Variant styles for the logout button
 */
const variantStyles = {
  danger: 'text-red-400 hover:bg-slate-700 focus-visible:ring-red-500',
  ghost: 'text-slate-400 hover:bg-slate-700 focus-visible:ring-slate-400',
} as const;

/**
 * LogoutButton Component
 * 
 * Handles user logout with proper error handling and loading states.
 * Part of the auth feature UI components.
 * 
 * @param props - LogoutButton props
 * @returns React component
 * 
 * @example
 * ```tsx
 * <LogoutButton>
 *   Sign Out
 * </LogoutButton>
 * ```
 * 
 * @example
 * ```tsx
 * <LogoutButton 
 *   variant="ghost"
 *   onLogoutSuccess={() => console.log('Logged out')}
 * >
 *   Logout
 * </LogoutButton>
 * ```
 */
export const LogoutButton: FC<LogoutButtonProps> = ({
  variant = 'danger',
  showLoadingState = true,
  children = 'Sign Out',
  className = '',
  onLogoutSuccess,
  onLogoutError,
}) => {
  const locale = useLocale();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  /**
   * Handles the logout process
   */
  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    
    try {
      // Step 1: Clear the session cookie server-side (wait for completion)
      const response = await fetch('/api/auth/session', { 
        method: 'DELETE',
        credentials: 'same-origin', // Ensure cookies are included
      });
      
      if (!response.ok) {
        throw new Error('Failed to clear session cookie');
      }
      
      // Step 2: Sign out from Firebase
      await signOut(auth);
      
      // Step 3: Callback for success
      onLogoutSuccess?.();
      
      // Step 4: Small delay to ensure cookie deletion propagates
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Step 5: Force a hard navigation to login to ensure middleware runs
      // This is more reliable than router.push() for logout
      window.location.href = `/${locale}/login`;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to sign out');
      onLogoutError?.(err);
      console.error('Logout error:', err);
      setIsLoggingOut(false);
    }
    // Note: No finally block - we're navigating away
  };

  const variantClass = variantStyles[variant];

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`
        w-full px-4 py-3 text-left flex items-center space-x-2
        transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClass}
        ${className}
      `}
      aria-label="Sign out of your account"
    >
      {showLoadingState && isLoggingOut ? (
        <>
          <svg
            className="w-4 h-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Signing out...</span>
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

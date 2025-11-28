'use client';

/**
 * Login Page Component
 * @module pages/login
 *
 * Following Diamond Standard v2.0:
 * - Client component for Firebase Auth operations
 * - Full TSDoc documentation with examples
 * - WCAG 2.2 accessibility compliant
 * - Locale-aware navigation via next-intl
 * - Input validation with Zod
 * - Handles email/password and Google OAuth sign-in
 * - Smart redirect using server-side API for fast onboarding check
 * - No console.log (Diamond Standard compliant)
 *
 * @see {@link file://DIAMOND_STANDARD_REFERENCE.md}
 */

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/shared/lib/firebase/config';
import { Link } from '@/i18n/navigation';
import { z } from 'zod';

/**
 * Client-side validation schema for login form
 * Validates email and password before authentication attempt
 */
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

/**
 * Login Page Component
 * Provides email/password and Google OAuth authentication
 * After successful login, calls server-side API to check onboarding status:
 * - Uses /api/auth/check-onboarding (Firebase Admin SDK - fast!)
 * - Redirects to /dashboard if customer.completed = true
 * - Redirects to /getstarted if customer.completed = false
 *
 * @returns React component
 *
 * @example
 * // Used in app/[locale]/(public)/login/page.tsx
 * export { default } from '@/pages/login';
 */
export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Handle form input changes
   *
   * @param e - Input change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Set session cookie after successful authentication
   * Required for server-side authentication checks in layout
   *
   * @param user - The authenticated Firebase user
   */
  const setSessionCookie = async (user: any): Promise<void> => {
    try {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Failed to set session cookie');
      }
    } catch (error) {
      // Log error but don't expose technical details to user
      console.error('Session cookie error:', error);
      throw new Error('Authentication error. Please try again.');
    }
  };

  /**
   * Check user's onboarding completion status via API route
   * Uses server-side Firebase Admin SDK for fast database reads
   *
   * @param userId - The authenticated user's UID
   * @returns '/dashboard' if completed, '/getstarted?verified=true' if not
   *
   * @example
   * const redirectPath = await checkOnboardingStatus(user.uid);
   * router.push(redirectPath); // Redirects to correct page instantly
   */
  const checkOnboardingStatus = async (userId: string): Promise<string> => {
    try {
      // Call server-side API route (uses Admin SDK - much faster than client SDK)
      const response = await fetch('/api/auth/check-onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: userId }),
      });

      if (!response.ok) {
        // On error, default to getstarted (safe fallback)
        return '/getstarted?verified=true';
      }

      const data = await response.json();

      // Return the redirect path from API
      // API returns: { completed: boolean, redirectTo: '/dashboard' | '/getstarted' }
      if (data.redirectTo === '/dashboard') {
        return '/dashboard';
      }

      return '/getstarted?verified=true';
    } catch (error) {
      // On network error, default to getstarted (safe fallback)
      return '/getstarted?verified=true';
    }
  };

  /**
   * Handle email/password sign in
   * 1. Validates input with Zod
   * 2. Authenticates with Firebase
   * 3. Sets session cookie for server-side auth
   * 4. Checks onboarding status via server-side API (FAST!)
   * 5. Redirects to dashboard (if completed) or getstarted (if not)
   *
   * @param e - Form submit event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate form data with Zod
      const validatedData = loginSchema.parse(formData);

      // Authenticate with Firebase
      const result = await signInWithEmailAndPassword(
        auth,
        validatedData.email,
        validatedData.password
      );

      // CRITICAL: Set session cookie before navigation
      // This ensures the (authed) layout can verify authentication
      await setSessionCookie(result.user);

      // Check onboarding status and redirect accordingly
      const redirectPath = await checkOnboardingStatus(result.user.uid);
      router.push(redirectPath);
    } catch (err: any) {
      // Handle Zod validation errors
      if (err instanceof z.ZodError) {
        const firstError = err.errors[0];
        setError(firstError?.message || 'Validation error');
        setLoading(false);
        return;
      }

      // Handle Firebase Auth errors with user-friendly messages
      if (
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password'
      ) {
        setError('Invalid email or password');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Invalid email or password');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network error. Please check your connection and try again.');
      } else {
        // Generic fallback error
        setError(err.message || 'Unable to sign in. Please try again.');
      }
      setLoading(false);
    }
  };

  /**
   * Handle Google OAuth sign in
   * Opens Google sign-in popup, creates/signs in user
   * Sets session cookie, checks onboarding, and redirects accordingly
   *
   * @example
   * // Triggered by "Sign in with Google" button
   * onClick={handleGoogleSignIn}
   */
  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // CRITICAL: Set session cookie before navigation
      // This ensures the (authed) layout can verify authentication
      await setSessionCookie(result.user);

      // Check onboarding status and redirect accordingly
      const redirectPath = await checkOnboardingStatus(result.user.uid);
      router.push(redirectPath);
    } catch (err: any) {
      // Handle Google OAuth specific errors
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled. Please try again.');
      } else if (err.code === 'auth/popup-blocked') {
        setError('Popup blocked. Please allow popups and try again.');
      } else if (err.code === 'auth/cancelled-popup-request') {
        // User cancelled, don't show error
        setError('');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network error. Please check your connection.');
      } else {
        setError(
          err.message || 'Unable to sign in with Google. Please try again.'
        );
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 shadow-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-slate-400">Sign in to your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="mb-6 rounded-lg border border-red-500/50 bg-red-500/10 p-4"
              role="alert"
              aria-live="polite"
            >
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="you@example.com"
                required
                disabled={loading}
                aria-required="true"
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your password"
                required
                disabled={loading}
                aria-required="true"
                autoComplete="current-password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 py-3 font-semibold text-white transition-all hover:from-teal-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-slate-800 px-4 text-slate-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex w-full items-center justify-center rounded-lg bg-white py-3 font-semibold text-slate-900 transition-all hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Sign in with Google"
          >
            <svg
              className="mr-2 h-5 w-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="rounded font-medium text-teal-400 transition-colors hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-800"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Force SSR for login page
 * Prevents static generation at build time
 */
export async function getServerSideProps() {
  return {
    props: {},
  };
}

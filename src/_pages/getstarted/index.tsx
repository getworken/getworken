'use client';

/**
 * Get Started / Onboarding Page
 * @module pages/getstarted
 *
 * Following Diamond Standard v2.0:
 * - Client component for user interaction
 * - Profile selection interface
 * - API Route pattern for Firestore operations
 * - Comprehensive Zod validation for all inputs
 * - Full TSDoc documentation with examples
 * - WCAG 2.2 accessibility compliant
 * - Locale-aware navigation via next-intl
 * - Structured error handling with user feedback
 * - Optimized for new users (skips Firestore check when ?new=true)
 *
 * @see {@link file://DIAMOND_STANDARD_REFERENCE.md}
 */

import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { auth, db } from '@/shared/lib/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { z } from 'zod';

/**
 * Client-side validation schema for profile selection
 * Validates the selected profile type before sending to API
 */
const profileSchema = z.object({
  profile: z.enum(['customer', 'business', 'contractor', 'employee'], {
    errorMap: () => ({ message: 'Invalid profile type selected' }),
  }),
});

/**
 * Get Started Page Component
 * Allows users to select their primary profile type after signup.
 * Validates selection, updates via API, and redirects to dashboard.
 *
 * @returns React component rendering onboarding interface
 *
 * @example
 * // Rendered after signup with new user optimization
 * <GetStartedPage /> // URL: /getstarted?new=true
 *
 * @example
 * // Rendered for returning users who haven't completed onboarding
 * <GetStartedPage /> // URL: /getstarted
 */
export default function GetStartedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  /**
   * Listen to auth state and check onboarding status
   * For new users (?new=true), skip Firestore check to improve performance
   * For verified users (?verified=true from login), skip check as well
   * Uses onAuthStateChanged for reliable auth state detection
   *
   * @throws Redirects to /login if user is not authenticated
   */
  useEffect(() => {
    const isNewUser = searchParams?.get('new') === 'true';
    const isVerified = searchParams?.get('verified') === 'true';
    let hasChecked = false;

    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser: User | null) => {
        // Prevent duplicate checks
        if (hasChecked) return;
        hasChecked = true;

        if (!currentUser) {
          // Not logged in, redirect to login
          router.push('/login');
          return;
        }

        setUser(currentUser);

        // Skip onboarding check for brand new users (just signed up)
        // OR for users coming from login page (already verified)
        if (isNewUser || isVerified) {
          setLoading(false);
          return;
        }

        // Check onboarding status for returning users (direct navigation)
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const customerProfile = userData.profiles?.customer;

            if (customerProfile?.completed) {
              // Already completed onboarding, go to dashboard
              router.push('/dashboard');
              return;
            }
          }
          setLoading(false);
        } catch (err: any) {
          // Handle offline errors gracefully
          if (err.code === 'unavailable' || err.message?.includes('offline')) {
            // Allow user to continue with onboarding even if offline
          }
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, [router, searchParams]);

  /**
   * Handle profile selection
   * Validates input with Zod, calls API to update profile, and redirects to dashboard
   *
   * @param profileType - The profile type selected ('Customer', 'Business', 'Contractor', 'Employee')
   * @throws Sets error state if validation fails or API request fails
   *
   * @example
   * handleProfileSetup('Customer') // Updates customer profile and redirects
   */
  const handleProfileSetup = async (profileType: string) => {
    if (!user) return;

    setProcessing(true);
    setError('');

    try {
      // Map display name to profile key
      const profileKey = profileType.toLowerCase();

      // Validate with Zod before sending to API
      const validatedData = profileSchema.parse({ profile: profileKey });

      // Call API to update the selected profile
      await markOnboardingCompleted(validatedData.profile);
      router.push('/dashboard');
    } catch (err: any) {
      // Handle Zod validation errors
      if (err instanceof z.ZodError) {
        const firstError = err.errors[0];
        setError(firstError?.message || 'Validation error');
        setProcessing(false);
        return;
      }

      // Handle API errors
      setError(err.message || 'Unable to set up profile. Please try again.');
      setProcessing(false);
    }
  };

  /**
   * Mark selected profile onboarding as completed via API
   * Calls /api/auth/update-profile to set uid, active, completed, and onboardingStep
   *
   * @param profileType - The profile type ('customer', 'business', 'contractor', 'employee')
   * @throws Error if API request fails or returns non-OK status
   *
   * @example
   * await markOnboardingCompleted('customer')
   * // Sets profiles.customer = { uid: userId, active: true, completed: true, onboardingStep: 1 }
   */
  const markOnboardingCompleted = async (profileType: string) => {
    if (!user) return;

    try {
      const response = await fetch('/api/auth/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          profile: profileType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }
    } catch (err) {
      // Re-throw to be handled by caller
      throw err;
    }
  };

  // Loading state
  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center" role="status" aria-live="polite">
          <svg
            className="mx-auto mb-4 h-12 w-12 animate-spin text-teal-400"
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
          <p className="text-lg text-white">Loading your profile...</p>
          <span className="sr-only">
            Please wait while we load your profile information
          </span>
        </div>
      </div>
    );
  }

  // Processing state
  if (processing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center" role="status" aria-live="polite">
          <svg
            className="mx-auto mb-4 h-12 w-12 animate-spin text-teal-400"
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
          <p className="text-lg text-white">Setting up your profile...</p>
          <span className="sr-only">
            Please wait while we configure your selected profile
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800 shadow-lg" role="banner">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-teal-400">GetWorken</h1>
          <button
            onClick={() => handleProfileSetup('Skip')}
            className="rounded px-3 py-2 text-sm text-slate-300 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            disabled={processing}
            aria-label="Skip profile setup for now"
            aria-busy={processing}
          >
            Skip for now →
          </button>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-6 py-16" role="main">
        {/* Error Message */}
        {error && (
          <div
            className="mx-auto mb-8 max-w-2xl rounded-lg border border-red-500/50 bg-red-500/10 p-4"
            role="alert"
            aria-live="assertive"
          >
            <p className="text-center text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Welcome Message */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            🎉 It&apos;s time to GetWorken! 🎉
          </h2>
          <p className="mb-2 text-xl text-slate-300">Your account is ready.</p>
          <p className="text-slate-400">
            Let&apos;s set up your first profile.
          </p>
        </div>

        {/* Profile Options Grid */}
        <div
          className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2"
          role="region"
          aria-label="Profile selection options"
        >
          {/* Business Profile */}
          <article className="group rounded-2xl border-2 border-slate-700 bg-slate-800 p-8 transition hover:border-teal-500">
            <div className="mb-4 text-6xl" aria-hidden="true">
              🏢
            </div>
            <h3 className="mb-3 text-2xl font-bold text-white">
              Business Owner
            </h3>
            <p className="mb-6 text-slate-400">
              Manage your field service business. Create estimates, schedule
              jobs, manage employees, and grow your business.
            </p>
            <ul
              className="mb-6 space-y-2 text-sm text-slate-300"
              aria-label="Business profile features"
            >
              <li className="flex items-center gap-2">
                <span className="text-teal-400" aria-hidden="true">
                  ✓
                </span>
                <span>Create & send estimates</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-400" aria-hidden="true">
                  ✓
                </span>
                <span>Schedule jobs & manage calendar</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-400" aria-hidden="true">
                  ✓
                </span>
                <span>Track employees & contractors</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-400" aria-hidden="true">
                  ✓
                </span>
                <span>Customer management (CRM)</span>
              </li>
            </ul>
            <button
              onClick={() => handleProfileSetup('Business')}
              disabled={processing}
              className="w-full rounded-lg bg-teal-600 py-3 font-semibold text-white shadow-lg transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50 group-hover:shadow-xl"
              aria-busy={processing}
              aria-label="Set up business owner profile"
            >
              Set Up My Business
            </button>
          </article>

          {/* Contractor Profile */}
          <article className="group rounded-2xl border-2 border-slate-700 bg-slate-800 p-8 transition hover:border-blue-500">
            <div className="mb-4 text-6xl" aria-hidden="true">
              🔧
            </div>
            <h3 className="mb-3 text-2xl font-bold text-white">
              Freelance Contractor
            </h3>
            <p className="mb-6 text-slate-400">
              Create your professional contractor profile. Showcase your skills,
              get hired for jobs, and manage your freelance work.
            </p>
            <ul
              className="mb-6 space-y-2 text-sm text-slate-300"
              aria-label="Contractor profile features"
            >
              <li className="flex items-center gap-2">
                <span className="text-blue-400" aria-hidden="true">
                  ✓
                </span>
                <span>Build your professional profile</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400" aria-hidden="true">
                  ✓
                </span>
                <span>List your skills & certifications</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400" aria-hidden="true">
                  ✓
                </span>
                <span>Get discovered by businesses</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400" aria-hidden="true">
                  ✓
                </span>
                <span>Manage your bookings</span>
              </li>
            </ul>
            <button
              onClick={() => handleProfileSetup('Contractor')}
              disabled={processing}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50 group-hover:shadow-xl"
              aria-busy={processing}
              aria-label="Create freelance contractor profile"
            >
              Create Contractor Profile
            </button>
          </article>

          {/* Employee Profile */}
          <article className="group rounded-2xl border-2 border-slate-700 bg-slate-800 p-8 transition hover:border-purple-500">
            <div className="mb-4 text-6xl" aria-hidden="true">
              👷
            </div>
            <h3 className="mb-3 text-2xl font-bold text-white">Employee</h3>
            <p className="mb-6 text-slate-400">
              Create your employee profile. Find employment opportunities, track
              your work schedule, and manage job assignments.
            </p>
            <ul
              className="mb-6 space-y-2 text-sm text-slate-300"
              aria-label="Employee profile features"
            >
              <li className="flex items-center gap-2">
                <span className="text-purple-400" aria-hidden="true">
                  ✓
                </span>
                <span>Create employment profile</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400" aria-hidden="true">
                  ✓
                </span>
                <span>View job assignments</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400" aria-hidden="true">
                  ✓
                </span>
                <span>Track your schedule</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400" aria-hidden="true">
                  ✓
                </span>
                <span>Apply for positions</span>
              </li>
            </ul>
            <button
              onClick={() => handleProfileSetup('Employee')}
              disabled={processing}
              className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white shadow-lg transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50 group-hover:shadow-xl"
              aria-busy={processing}
              aria-label="Create employee profile"
            >
              Create Employee Profile
            </button>
          </article>

          {/* Customer Portal */}
          <article className="group rounded-2xl border-2 border-slate-700 bg-slate-800 p-8 transition hover:border-green-500">
            <div className="mb-4 text-6xl" aria-hidden="true">
              🙋
            </div>
            <h3 className="mb-3 text-2xl font-bold text-white">Customer</h3>
            <p className="mb-6 text-slate-400">
              Browse services, view estimates, track jobs, and communicate with
              businesses. Your customer dashboard is ready to use!
            </p>
            <ul
              className="mb-6 space-y-2 text-sm text-slate-300"
              aria-label="Customer profile features"
            >
              <li className="flex items-center gap-2">
                <span className="text-green-400" aria-hidden="true">
                  ✓
                </span>
                <span>View estimates & quotes</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400" aria-hidden="true">
                  ✓
                </span>
                <span>Track active jobs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400" aria-hidden="true">
                  ✓
                </span>
                <span>Message businesses</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400" aria-hidden="true">
                  ✓
                </span>
                <span>Upload photos & documents</span>
              </li>
            </ul>
            <button
              onClick={() => handleProfileSetup('Customer')}
              disabled={processing}
              className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white shadow-lg transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50 group-hover:shadow-xl"
              aria-busy={processing}
              aria-label="Go to customer portal"
            >
              Go to Customer Portal
            </button>
            <p className="mt-2 text-center text-xs font-medium text-green-400">
              ✓ Ready to use - no setup needed!
            </p>
          </article>
        </div>
      </main>
    </div>
  );
}

/**
 * Force SSR for authenticated onboarding page
 * Prevents static generation at build time
 */
export async function getServerSideProps() {
  return {
    props: {},
  };
}

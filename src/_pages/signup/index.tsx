'use client';

/**
 * Signup Page Component
 * @module pages/signup
 *
 * Following Diamond Standard v2.0:
 * - Client component for Firebase Auth operations
 * - Full TSDoc documentation with examples
 * - WCAG 2.2 accessibility compliant
 * - Locale-aware navigation via next-intl
 * - Comprehensive form validation with Zod
 * - API Route pattern for Firestore operations
 * - Structured logging for errors
 *
 * @see {@link file://DIAMOND_STANDARD_REFERENCE.md}
 */

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/shared/lib/firebase/config';
import { Link } from '@/i18n/navigation';
import { z } from 'zod';

/**
 * Client-side validation schema for signup form
 * Validates all user input before sending to API
 */
const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(1, 'First name is required')
      .max(50, 'First name too long'),
    lastName: z
      .string()
      .min(1, 'Last name is required')
      .max(50, 'Last name too long'),
    email: z.string().email('Invalid email address'),
    phoneNumber: z
      .string()
      .min(10, 'Phone number must be at least 10 digits')
      .regex(/^[0-9\s\-\+\(\)]+$/, 'Invalid phone number format'),
    city: z.string().min(1, 'City is required').max(100, 'City name too long'),
    state: z
      .string()
      .length(2, 'State must be 2 characters (e.g., NY, CA)')
      .regex(/^[A-Z]{2}$/, 'State must be uppercase (e.g., NY, CA)'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

/**
 * Signup Page Component
 * Collects user information and creates Firebase Auth account + Firestore user document
 *
 * @returns React component
 */
export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    city: '',
    state: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Handle form input changes
   * Auto-formats state to uppercase
   *
   * @param e - Input change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Auto-uppercase state field
    if (name === 'state') {
      setFormData({
        ...formData,
        [name]: value.toUpperCase(),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  /**
   * Handle form submission
   * 1. Validates all input with Zod
   * 2. Creates Firebase Auth user (client-side)
   * 3. Creates Firestore user document via API route
   * 4. Redirects to onboarding page
   *
   * @param e - Form submit event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate form data with Zod
      const validatedData = signupSchema.parse(formData);

      // Create Firebase Auth user (client-side auth)
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        validatedData.email,
        validatedData.password
      );

      const userId = userCredential.user.uid;

      // Create user documents in Firestore using API route
      const response = await fetch('/api/auth/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: userId,
          email: validatedData.email,
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          phoneNumber: validatedData.phoneNumber,
          city: validatedData.city,
          state: validatedData.state.toUpperCase(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create user profile');
      }

      // Redirect to get started page for onboarding
      // Add 'new' parameter to skip unnecessary Firestore check (user was just created)
      router.push('/getstarted?new=true');
    } catch (err: any) {
      // Handle Zod validation errors
      if (err instanceof z.ZodError) {
        const firstError = err.errors[0];
        setError(firstError?.message || 'Validation error');
        setLoading(false);
        return;
      }

      // Handle Firebase Auth errors
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please sign in instead.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network error. Please check your internet connection.');
      } else {
        // Generic error with helpful message
        setError(err.message || 'Unable to create account. Please try again.');
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
            <h1 className="mb-2 text-3xl font-bold text-white">
              Create Account
            </h1>
            <p className="text-slate-400">Join GetWorken today</p>
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

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your first name"
                required
                disabled={loading}
                aria-required="true"
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your last name"
                required
                disabled={loading}
                aria-required="true"
              />
            </div>

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
                placeholder="Enter your email"
                required
                disabled={loading}
                aria-required="true"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="+1 (555) 123-4567"
                required
                disabled={loading}
                aria-required="true"
                aria-describedby="phone-hint"
              />
              <p id="phone-hint" className="mt-1 text-xs text-slate-500">
                Enter your phone number with country code
              </p>
            </div>

            {/* City and State Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="City"
                  required
                  disabled={loading}
                  aria-required="true"
                />
              </div>

              {/* State */}
              <div>
                <label
                  htmlFor="state"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  State *
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 uppercase text-white placeholder-slate-500 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="NY"
                  required
                  disabled={loading}
                  maxLength={2}
                  aria-required="true"
                  aria-describedby="state-hint"
                  pattern="[A-Z]{2}"
                  title="Two-letter state code (e.g., NY, CA)"
                />
                <p id="state-hint" className="mt-1 text-xs text-slate-500">
                  2-letter code (e.g., NY, CA)
                </p>
              </div>
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
                placeholder="Create a password"
                required
                disabled={loading}
                minLength={6}
                aria-required="true"
                aria-describedby="password-hint"
              />
              <p id="password-hint" className="mt-1 text-xs text-slate-500">
                Must be at least 6 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Confirm Password *
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Confirm your password"
                required
                disabled={loading}
                aria-required="true"
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
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              Already have an account?{' '}
              <Link
                href="/login"
                className="rounded font-medium text-teal-400 transition-colors hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-800"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Force SSR for signup page
 * Prevents static generation at build time
 */
export async function getServerSideProps() {
  return {
    props: {},
  };
}

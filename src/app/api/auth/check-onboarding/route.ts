/**
 * Check Onboarding Status API Route
 * @module api/auth/check-onboarding
 * 
 * Server-side endpoint to check if user has completed onboarding.
 * Uses Firebase Admin SDK for fast, server-side database reads.
 * 
 * @see {@link file://DIAMOND_STANDARD_REFERENCE.md}
 */

import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/shared/lib/firebase/admin';
import { z } from 'zod';

/**
 * Request validation schema
 */
const requestSchema = z.object({
  uid: z.string().min(1, 'User ID is required'),
});

/**
 * POST /api/auth/check-onboarding
 * Checks if user's customer profile is completed
 * 
 * @param request - Next.js request with { uid: string }
 * @returns { completed: boolean, redirectTo: '/dashboard' | '/getstarted' }
 * 
 * @example
 * const response = await fetch('/api/auth/check-onboarding', {
 *   method: 'POST',
 *   body: JSON.stringify({ uid: user.uid })
 * });
 * const { completed, redirectTo } = await response.json();
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body with Zod
    const validatedData = requestSchema.parse(body);
    const { uid } = validatedData;

    // Get user document from Firestore (server-side - FAST!)
    const userDoc = await adminDb.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      // User document doesn't exist - needs onboarding
      return NextResponse.json({
        completed: false,
        redirectTo: '/getstarted',
      });
    }

    const userData = userDoc.data();
    const customerProfile = userData?.profiles?.customer;

    // Check if customer profile is completed
    const completed = customerProfile?.completed === true;

    return NextResponse.json({
      completed,
      redirectTo: completed ? '/dashboard' : '/getstarted',
    });

  } catch (error: any) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0]?.message || 'Validation error' },
        { status: 400 }
      );
    }

    // Handle Firestore errors
    return NextResponse.json(
      { error: 'Failed to check onboarding status' },
      { status: 500 }
    );
  }
}

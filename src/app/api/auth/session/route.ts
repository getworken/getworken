/**
 * Auth Session API Route
 * @module app/api/auth/session/route
 * 
 * ✅ DIAMOND STANDARD: Defense in Depth - Layer 2 (Server)
 * 
 * This route handler manages authentication session cookies.
 * Used by AuthProvider to set/clear cookies for middleware authentication.
 * 
 * Security:
 * - POST: Verifies Firebase ID token with Admin SDK and sets httpOnly cookie
 * - DELETE: Clears session cookie
 * - Cookie is used by layout.tsx for route protection
 * 
 * @see {@link file://middleware.ts}
 * @see {@link file://src/app/_providers/AuthProvider.tsx}
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { adminAuth } from '@/shared/lib/firebase/admin';
import { logger } from '@/shared/lib/logger';

// Zod schema for session request validation
const SessionRequestSchema = z.object({
  idToken: z.string().min(1, 'ID token is required'),
});

/**
 * POST /api/auth/session
 * Set session cookie with Firebase ID token after verification
 * 
 * @param request - Contains idToken in body
 * @returns Success response
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input with Zod
    const validationResult = SessionRequestSchema.safeParse(body);
    
    if (!validationResult.success) {
      logger.error({
        component: 'SessionRoute',
        errors: validationResult.error.errors,
      }, 'Invalid session request');
      
      return NextResponse.json(
        { error: 'Invalid request', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { idToken } = validationResult.data;

    // Verify the Firebase ID token with Admin SDK
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(idToken);
      logger.info({
        component: 'SessionRoute',
        userId: decodedToken.uid,
      }, 'Token verified successfully');
    } catch (verifyError) {
      logger.error({
        component: 'SessionRoute',
        error: verifyError instanceof Error ? verifyError.message : String(verifyError),
      }, 'Token verification failed');
      
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Create a session cookie with the Admin SDK
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    // Set httpOnly cookie for middleware authentication
    const cookieStore = await cookies();
    cookieStore.set('__session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 5, // 5 days
      path: '/',
    });

    logger.info({
      component: 'SessionRoute',
      userId: decodedToken.uid,
    }, 'Session cookie set successfully');

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error({
      component: 'SessionRoute',
      error: error instanceof Error ? error.message : String(error),
    }, 'Failed to set session cookie');
    
    return NextResponse.json(
      { error: 'Failed to set session cookie' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/auth/session
 * Clear session cookie (logout)
 * 
 * @returns Success response
 */
export async function DELETE() {
  try {
    const cookieStore = await cookies();
    
    // Check if cookie exists before deletion
    const existingCookie = cookieStore.get('__session');
    logger.info({
      component: 'SessionRoute',
      hasCookie: !!existingCookie,
    }, 'Deleting session cookie');
    
    // Delete the session cookie multiple ways for redundancy
    cookieStore.delete('__session');
    cookieStore.delete({
      name: '__session',
      path: '/',
    });

    // Create response with cookie deletion headers
    const response = NextResponse.json({ success: true });
    
    // Set cookie to expire immediately with all possible variations
    response.cookies.set('__session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: -1, // Negative to ensure deletion
      path: '/',
      expires: new Date(0), // Set to epoch
    });
    
    // Also try without httpOnly in case browser needs it
    response.cookies.delete('__session');

    logger.info({ component: 'SessionRoute' }, 'Session cookie deleted successfully');
    
    return response;
  } catch (error) {
    logger.error({
      component: 'SessionRoute',
      error: error instanceof Error ? error.message : String(error),
    }, 'Failed to clear session cookie');
    
    return NextResponse.json(
      { error: 'Failed to clear session cookie' },
      { status: 500 }
    );
  }
}

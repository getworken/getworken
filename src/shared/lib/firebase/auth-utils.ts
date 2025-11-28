/**
 * Server-side Authentication Utilities
 * 
 * Following Platinum Standard:
 * - Verifies Firebase ID tokens on the server
 * - Provides authenticated user context for server actions
 * - Secure session management
 */

import { cookies, headers } from 'next/headers';
import { adminAuth } from './admin';

/**
 * Get the authenticated user from the request
 * Extracts and verifies the Firebase ID token from cookies or headers
 */
export async function getAuthenticatedUser() {
  try {
    // Try to get token from cookie first
    const cookieStore = await cookies();
    let token = cookieStore.get('firebaseIdToken')?.value;

    // Fallback to Authorization header
    if (!token) {
      const headersList = await headers();
      const authHeader = headersList.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return { authenticated: false, user: null, error: 'No authentication token found' };
    }

    // Verify the token with Firebase Admin
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    return {
      authenticated: true,
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email,
        emailVerified: decodedToken.email_verified,
      },
      error: null,
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      authenticated: false,
      user: null,
      error: error instanceof Error ? error.message : 'Authentication failed',
    };
  }
}

/**
 * Middleware to require authentication for server actions
 * Returns the authenticated user or throws an error
 */
export async function requireAuth() {
  const authResult = await getAuthenticatedUser();
  
  if (!authResult.authenticated || !authResult.user) {
    throw new Error('Authentication required');
  }
  
  return authResult.user;
}

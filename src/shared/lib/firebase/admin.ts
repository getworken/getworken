/**
 * Firebase Admin SDK Configuration
 * @module shared/lib/firebase/admin
 * 
 * This module provides the Firebase Admin SDK initialization for server-side operations.
 * The Admin SDK provides privileged access to Firebase services and should ONLY be used
 * in server-side code (Server Components, Server Actions, API Routes).
 * 
 * @security CRITICAL - This module uses 'server-only' to prevent client-side bundling
 * @see {@link https://firebase.google.com/docs/admin/setup}
 */

import 'server-only';

import { initializeApp, getApps, cert, type ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { logger } from '@/shared/lib/logger';

/**
 * Validate that we're in a server-side environment
 * This is a runtime safety check in addition to compile-time 'server-only' protection
 */
if (typeof window !== 'undefined') {
  throw new Error(
    '🚨 SECURITY ERROR: Firebase Admin SDK should NEVER be imported in client-side code! ' +
    'This module is for server-side use only (Server Components, Server Actions, API Routes).'
  );
}

/**
 * Get Admin SDK credentials from environment variables
 * Supports two methods:
 * 1. Full service account JSON (FIREBASE_SERVICE_ACCOUNT)
 * 2. Individual fields (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY)
 */
function getAdminCredentials(): ServiceAccount {
  // Method 1: Full service account JSON
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) as ServiceAccount;
    } catch (error) {
      throw new Error(
        'Failed to parse FIREBASE_SERVICE_ACCOUNT. Make sure it\'s valid JSON. ' +
        'Error: ' + String(error)
      );
    }
  }

  // Method 2: Individual fields
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Firebase Admin SDK configuration is missing. Please provide either:\n' +
      '1. FIREBASE_SERVICE_ACCOUNT (full JSON), OR\n' +
      '2. All three: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY\n\n' +
      'See FIREBASE_SETUP_NEW_ACCOUNT.md for detailed setup instructions.'
    );
  }

  // Validate private key format
  if (!privateKey.includes('BEGIN PRIVATE KEY')) {
    throw new Error(
      'FIREBASE_PRIVATE_KEY appears to be invalid. It should start with "-----BEGIN PRIVATE KEY-----"'
    );
  }

  return {
    projectId,
    clientEmail,
    privateKey: privateKey.replace(/\\n/g, '\n'), // Handle escaped newlines
  } as ServiceAccount;
}

/**
 * Initialize Firebase Admin SDK
 * Uses singleton pattern to prevent multiple initializations
 */
const initializeAdminApp = () => {
  // Check if already initialized
  if (getApps().length > 0) {
    return getApps()[0];
  }

  try {
    const credentials = getAdminCredentials();
    
    const appOptions: {
      credential: ReturnType<typeof cert>;
      projectId: string;
      storageBucket: string;
      databaseURL?: string;
    } = {
      credential: cert(credentials),
      // Use the actual project ID from credentials, NOT the database name
      projectId: credentials.projectId as string,
      storageBucket: `${credentials.projectId}.appspot.com`,
    };

    // Only add databaseURL if explicitly defined
    if (process.env.FIREBASE_DATABASE_URL) {
      appOptions.databaseURL = process.env.FIREBASE_DATABASE_URL;
    }
    
    return initializeApp(appOptions);
  } catch (error) {
    logger.error({ error }, 'Failed to initialize Firebase Admin SDK');
    throw error;
  }
};

/**
 * Firebase Admin App instance
 */
const adminApp = initializeAdminApp();

if (!adminApp) {
  throw new Error('Failed to initialize Firebase Admin App');
}

/**
 * Firebase Admin Auth instance
 * Use for user management, custom token generation, etc.
 * 
 * @example
 * ```typescript
 * import { adminAuth } from '@/shared/lib/firebase/admin';
 * 
 * // Get user by email
 * const user = await adminAuth.getUserByEmail('user@example.com');
 * 
 * // Create custom token
 * const token = await adminAuth.createCustomToken(uid);
 * 
 * // Delete user
 * await adminAuth.deleteUser(uid);
 * ```
 */
export const adminAuth = getAuth(adminApp);

/**
 * Firebase Admin Firestore instance
 * Use for server-side database operations with full privileges
 * 
 * **IMPORTANT:** Must match the client SDK database.
 * - If 'getworkenmain' is your DEFAULT database in Firebase Console, use: getFirestore(adminApp)
 * - If 'getworkenmain' is a NAMED database, use: getFirestore(adminApp, 'getworkenmain')
 * 
 * Client SDK always uses the DEFAULT database (cannot specify named databases).
 * Solution: Make 'getworkenmain' the default database OR use getFirestore(adminApp) without name.
 * 
 * @example
 * ```typescript
 * import { adminDb } from '@/shared/lib/firebase/admin';
 * 
 * // Get document
 * const userDoc = await adminDb.collection('users').doc(uid).get();
 * 
 * // Set document
 * await adminDb.collection('users').doc(uid).set({ name: 'John' });
 * 
 * // Query collection
 * const snapshot = await adminDb.collection('users')
 *   .where('role', '==', 'admin')
 *   .get();
 * ```
 */
// Use 'getworkenmain' database to match your Firebase configuration
export const adminDb = getFirestore(adminApp, 'getworkenmain');

/**
 * Firebase Admin Storage instance
 * Use for server-side file storage operations
 * 
 * @example
 * ```typescript
 * import { adminStorage } from '@/shared/lib/firebase/admin';
 * 
 * // Get bucket
 * const bucket = adminStorage.bucket();
 * 
 * // Upload file
 * await bucket.upload('path/to/file.jpg');
 * 
 * // Delete file
 * await bucket.file('path/to/file.jpg').delete();
 * ```
 */
export const adminStorage = getStorage(adminApp);

/**
 * Export the admin app instance for advanced use cases
 */
export { adminApp };

/**
 * Type exports for TypeScript support
 */
export type { ServiceAccount };

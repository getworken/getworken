/**
 * Firebase Admin SDK Configuration
 * @module shared/lib/firebase-admin
 * 
 * ⚠️ CRITICAL: This module is SERVER-ONLY
 * It contains sensitive Firebase Admin credentials and MUST NOT be bundled into client code.
 * The 'server-only' package ensures this file cannot be imported from client-side code.
 * 
 * This module implements the Diamond Standard Hybrid RBAC model:
 * - Static roles (admin, client, etc.) are stored as Custom Claims
 * - Dynamic permissions are stored in Firestore documents
 * 
 * @see {@link file://../../..../DIAMOND_STANDARD_REFERENCE.md}
 */

import 'server-only';

import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

/**
 * Valid user roles in the application
 * These are stored as Custom Claims for "free" permission checks
 */
export type UserRole = 'super-admin' | 'admin' | 'moderator' | 'support' | 'client';

/**
 * Firebase Admin App instance (singleton)
 */
let adminApp: App;

/**
 * Initialize Firebase Admin SDK
 * Uses service account credentials from environment variables
 * 
 * @returns Firebase Admin App instance
 */
function initializeFirebaseAdmin(): App {
  if (getApps().length > 0) {
    return getApps()[0]!;
  }

  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
  
  if (!serviceAccount) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT environment variable is not set. ' +
      'Please add your Firebase service account JSON to .env.local'
    );
  }

  let credentials;
  try {
    credentials = JSON.parse(serviceAccount);
  } catch (error) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT is not valid JSON. ' +
      'Ensure the entire service account JSON is properly escaped in .env.local'
    );
  }

  const config: any = {
    credential: cert(credentials),
  };
  
  if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    config.projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  }

  return initializeApp(config);
}

// Initialize the admin app
adminApp = initializeFirebaseAdmin();

/**
 * Firebase Admin Auth instance
 * Use this for managing users, custom claims, and authentication
 */
export const adminAuth: Auth = getAuth(adminApp);

/**
 * Firebase Admin Firestore instance
 * Use this for server-side database operations
 */
export const adminDb: Firestore = getFirestore(adminApp);

/**
 * Set custom claims (role) for a user
 * 
 * ✅ DIAMOND STANDARD: This implements the "Static Role" part of Hybrid RBAC
 * Static roles are stored in Firebase Custom Claims for instant, "free" permission checks
 * 
 * @param uid - User ID
 * @param role - User role to set
 * 
 * @example
 * await setUserRole(userId, 'admin');
 * 
 * @see {@link file://../../..../DIAMOND_STANDARD_REFERENCE.md#security-rbac}
 */
export async function setUserRole(uid: string, role: UserRole): Promise<void> {
  await adminAuth.setCustomUserClaims(uid, { role });
}

/**
 * Get a user's custom claims (including role)
 * 
 * @param uid - User ID
 * @returns User's custom claims object
 * 
 * @example
 * const claims = await getUserClaims(userId);
 * const role = claims.role as UserRole;
 */
export async function getUserClaims(uid: string): Promise<Record<string, any>> {
  const user = await adminAuth.getUser(uid);
  return user.customClaims || {};
}

/**
 * Get a user's role from custom claims
 * 
 * @param uid - User ID
 * @returns User's role or null if not set
 * 
 * @example
 * const role = await getUserRole(userId);
 * if (role === 'admin') { ... }
 */
export async function getUserRole(uid: string): Promise<UserRole | null> {
  const claims = await getUserClaims(uid);
  return (claims.role as UserRole) || null;
}

/**
 * Check if a user has a specific role
 * 
 * @param uid - User ID
 * @param role - Role to check for
 * @returns true if user has the role
 * 
 * @example
 * const isAdmin = await hasRole(userId, 'admin');
 */
export async function hasRole(uid: string, role: UserRole): Promise<boolean> {
  const userRole = await getUserRole(uid);
  return userRole === role;
}

/**
 * Check if a user is an admin (admin or super-admin)
 * 
 * @param uid - User ID
 * @returns true if user is an admin
 * 
 * @example
 * const canAccess = await isAdmin(userId);
 */
export async function isAdmin(uid: string): Promise<boolean> {
  const role = await getUserRole(uid);
  return role === 'admin' || role === 'super-admin';
}

/**
 * Check if a user is staff (admin, moderator, or support)
 * 
 * @param uid - User ID
 * @returns true if user is staff
 * 
 * @example
 * const isStaff = await isStaffMember(userId);
 */
export async function isStaffMember(uid: string): Promise<boolean> {
  const role = await getUserRole(uid);
  return role === 'admin' || role === 'super-admin' || role === 'moderator' || role === 'support';
}

/**
 * Verify an ID token and return the decoded token
 * Use this in API routes to authenticate requests
 * 
 * @param idToken - Firebase ID token from client
 * @returns Decoded token with user information and custom claims
 * 
 * @example
 * const decodedToken = await verifyIdToken(token);
 * const userId = decodedToken.uid;
 * const role = decodedToken.role as UserRole;
 */
export async function verifyIdToken(idToken: string) {
  return adminAuth.verifyIdToken(idToken);
}

export default adminApp;

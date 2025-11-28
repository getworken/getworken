/**
 * Firebase SDK public API
 * @module shared/lib/firebase
 * 
 * This is the public interface for Firebase operations
 * Part of the Diamond Standard shared layer
 * 
 * @security
 * - Client SDK (auth, db, storage) - Safe for client-side use
 * - Admin SDK - Server-side only! Never import in client components
 */

// Client SDK (safe for client-side use)
export { auth, db, storage } from './config';
export * from './auth';
export * from './firestore';

/**
 * Admin SDK (server-side only)
 * 
 * ⚠️ WARNING: Only import these in Server Components, Server Actions, or API Routes
 * The admin module will throw an error if imported in client-side code
 * 
 * @example
 * ```typescript
 * // ✅ CORRECT - Server Action
 * 'use server';
 * import { adminAuth, adminDb } from '@/shared/lib/firebase/admin';
 * 
 * // ❌ WRONG - Client Component
 * 'use client';
 * import { adminAuth } from '@/shared/lib/firebase/admin'; // Will throw error!
 * ```
 */
export type { ServiceAccount } from './admin';

// Note: We don't re-export adminAuth, adminDb, adminStorage here
// to make it explicit when you're using the Admin SDK.
// Import directly from './admin' when needed in server-side code.

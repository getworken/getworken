/**
 * Firebase Authentication Helpers
 * @module shared/lib/firebase/auth
 * 
 * Client-side authentication utilities following Diamond Standard
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  type UserCredential,
} from 'firebase/auth';
import { auth } from './config';

/**
 * Sign up a new user with email and password
 * 
 * @param email - User's email address
 * @param password - User's password
 * @param displayName - Optional display name
 * @returns Promise resolving to UserCredential
 * 
 * @example
 * const userCredential = await signUp('user@example.com', 'password123', 'John Doe');
 */
export const signUp = async (
  email: string,
  password: string,
  displayName?: string
): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
  if (displayName && userCredential.user) {
    await updateProfile(userCredential.user, { displayName });
  }
  
  return userCredential;
};

/**
 * Sign in an existing user with email and password
 * 
 * @param email - User's email address
 * @param password - User's password
 * @returns Promise resolving to UserCredential
 * 
 * @example
 * const userCredential = await signIn('user@example.com', 'password123');
 */
export const signIn = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Sign out the current user
 * 
 * @returns Promise resolving when sign out is complete
 * 
 * @example
 * await signOut();
 */
export const signOut = async (): Promise<void> => {
  return firebaseSignOut(auth);
};

/**
 * Send a password reset email to the user
 * 
 * @param email - User's email address
 * @returns Promise resolving when email is sent
 * 
 * @example
 * await resetPassword('user@example.com');
 */
export const resetPassword = async (email: string): Promise<void> => {
  return sendPasswordResetEmail(auth, email);
};

/**
 * Get the current user's ID token
 * This token includes custom claims (role, permissions)
 * 
 * @param forceRefresh - Force token refresh
 * @returns Promise resolving to ID token string or null
 * 
 * @example
 * const token = await getCurrentUserToken();
 */
export const getCurrentUserToken = async (
  forceRefresh = false
): Promise<string | null> => {
  const user = auth.currentUser;
  if (!user) return null;
  
  return user.getIdToken(forceRefresh);
};

/**
 * Get the current user's decoded token with custom claims
 * 
 * @returns Promise resolving to token result with claims
 * 
 * @example
 * const tokenResult = await getCurrentUserTokenResult();
 * const role = tokenResult?.claims.role;
 */
export const getCurrentUserTokenResult = async () => {
  const user = auth.currentUser;
  if (!user) return null;
  
  return user.getIdTokenResult();
};

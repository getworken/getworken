/**
 * Auth Provider
 * @module app/_providers/AuthProvider
 * 
 * ✅ DIAMOND STANDARD: Part of the FSD 'app' layer
 * Provides Firebase authentication context to the entire application
 * 
 * Security Flow:
 * - On login: Sets session cookie for middleware authentication
 * - On logout: Clears session cookie
 * - Works with middleware.ts for route protection
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/shared/lib/firebase';
import { User } from '@/entities/user';

interface AuthContextType {
  user: FirebaseUser | null;
  userData: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  isAuthenticated: false,
});

/**
 * Hook to access auth context
 * 
 * @example
 * const { user, isAuthenticated } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Set session cookie via API route
 * This enables server-side authentication checks in middleware
 */
async function setSessionCookie(idToken: string) {
  try {
    await fetch('/api/auth/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });
  } catch (error) {
    console.error('Failed to set session cookie:', error);
  }
}

/**
 * Clear session cookie via API route
 */
async function clearSessionCookie() {
  try {
    await fetch('/api/auth/session', {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Failed to clear session cookie:', error);
  }
}

/**
 * Auth Provider Component
 * Wraps the application to provide authentication state
 * 
 * ✅ DIAMOND STANDARD: Defense in Depth
 * - Sets session cookie for middleware (Layer 1: Edge)
 * - Provides client-side auth state for UI
 * - Syncs with Firebase Auth state changes
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // User is logged in - set session cookie for middleware
        try {
          const idToken = await firebaseUser.getIdToken();
          await setSessionCookie(idToken);
        } catch (error) {
          console.error('Failed to get ID token:', error);
        }

        // Fetch user data from Firestore
        try {
          const { getDocument } = await import('@/shared/lib/firebase');
          const data = await getDocument<User>('users', firebaseUser.uid);
          setUserData(data);
        } catch (error: any) {
          // Handle offline errors gracefully
          if (error.code === 'unavailable' || error.message?.includes('offline')) {
            console.warn('Firestore offline - user data will be fetched when online');
          } else {
            console.error('Error fetching user data:', error);
          }
          setUserData(null);
        }
      } else {
        // User is logged out - clear session cookie
        await clearSessionCookie();
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    userData,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

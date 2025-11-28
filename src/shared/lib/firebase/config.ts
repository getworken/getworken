/**
 * Firebase Client Configuration
 * @module shared/lib/firebase
 *
 * This module provides the Firebase client SDK initialization
 * following the Diamond Standard architecture.
 *
 * @see {@link https://firebase.google.com/docs/web/setup}
 */

import { initializeApp, getApps, getApp, FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/**
 * Validate required environment variables
 * @throws {Error} if any required Firebase environment variable is missing
 */
const validateFirebaseConfig = () => {
  const requiredVars = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  for (const [key, value] of Object.entries(requiredVars)) {
    if (!value) {
      throw new Error(
        `Missing required Firebase environment variable: NEXT_PUBLIC_FIREBASE_${key.replace(/[A-Z]/g, '_$&').toUpperCase()}`
      );
    }
  }

  return requiredVars as FirebaseOptions;
};

/**
 * Firebase configuration object
 * These values are validated and guaranteed to be defined
 */
const firebaseConfig = validateFirebaseConfig();

/**
 * Initialize Firebase app with modern cache configuration
 * Ensures singleton pattern - only one instance is created
 */
let app: ReturnType<typeof initializeApp>;
let db: ReturnType<typeof getFirestore>;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);

  /**
   * Initialize Firestore with modern persistent cache
   * Connects to the 'getworkenmain' database explicitly
   */
  db = initializeFirestore(
    app,
    {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
      }),
    },
    'getworkenmain'
  );
} else {
  app = getApp();
  db = getFirestore(app, 'getworkenmain');
}

/**
 * Firebase Auth instance
 */
export const auth = getAuth(app);

/**
 * Firebase Firestore instance with offline persistence
 * Configured to work across multiple tabs with automatic sync
 */
export { db };

/**
 * Firebase Storage instance
 */
export const storage = getStorage(app);

/**
 * Connect to Firebase Emulators in development
 * This is safe to call multiple times
 *
 * DISABLED: Uncomment when you want to use Firebase Emulators
 * Run `npm run emulators` first before enabling
 */
/*
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  const hasEmulatorConnection = (auth as any)._canInitEmulator;

  if (hasEmulatorConnection) {
    try {
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      connectFirestoreEmulator(db, 'localhost', 8080);
      connectStorageEmulator(storage, 'localhost', 9199);
    } catch (error) {
      // Emulators already connected, ignore
    }
  }
}
*/

export default app;

/**
 * Integration Tests for User Collection Security Rules
 * @module __tests__/integration/firestore-rules/user-rules
 * 
 * ✅ DIAMOND STANDARD: Integration Testing with Firebase Emulator
 * 
 * These tests verify that Firestore Security Rules correctly enforce
 * the Hybrid RBAC model for the users collection.
 * 
 * Run with: npm run test:integration
 * Requires: Firebase Emulator Suite running
 * 
 * @see {@link file://firestore.rules}
 * @see {@link https://firebase.google.com/docs/rules/unit-tests}
 */

import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { resolve } from 'path';

let testEnv: RulesTestEnvironment;

/**
 * Setup: Initialize test environment with Firestore rules
 */
beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'getworken-test',
    firestore: {
      rules: readFileSync(resolve(__dirname, '../../../firestore.rules'), 'utf8'),
      host: 'localhost',
      port: 8080,
    },
  });
});

/**
 * Teardown: Clean up test environment
 */
afterAll(async () => {
  await testEnv.cleanup();
});

/**
 * Reset Firestore data between tests
 */
afterEach(async () => {
  await testEnv.clearFirestore();
});

describe('User Collection Security Rules', () => {
  describe('Read Operations', () => {
    it('should allow user to read own document', async () => {
      const userId = 'user123';
      
      // Setup: Create user document as admin
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await setDoc(doc(db, 'users', userId), {
          uid: userId,
          email: 'user@example.com',
          role: 'client',
        });
      });

      // Test: User can read own document
      const userContext = testEnv.authenticatedContext(userId);
      const userDb = userContext.firestore();
      
      await assertSucceeds(getDoc(doc(userDb, 'users', userId)));
    });

    it('should deny user from reading other user documents', async () => {
      const userId1 = 'user123';
      const userId2 = 'user456';
      
      // Setup: Create user documents
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await setDoc(doc(db, 'users', userId2), {
          uid: userId2,
          email: 'user2@example.com',
          role: 'client',
        });
      });

      // Test: User cannot read other user's document
      const userContext = testEnv.authenticatedContext(userId1);
      const userDb = userContext.firestore();
      
      await assertFails(getDoc(doc(userDb, 'users', userId2)));
    });

    it('should allow admin to read any user document', async () => {
      const adminId = 'admin123';
      const userId = 'user456';
      
      // Setup: Create user document
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await setDoc(doc(db, 'users', userId), {
          uid: userId,
          email: 'user@example.com',
          role: 'client',
        });
      });

      // Test: Admin can read any user document
      const adminContext = testEnv.authenticatedContext(adminId, {
        role: 'admin',
      });
      const adminDb = adminContext.firestore();
      
      await assertSucceeds(getDoc(doc(adminDb, 'users', userId)));
    });

    it('should allow super-admin to read any user document', async () => {
      const superAdminId = 'superadmin123';
      const userId = 'user456';
      
      // Setup: Create user document
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await setDoc(doc(db, 'users', userId), {
          uid: userId,
          email: 'user@example.com',
          role: 'client',
        });
      });

      // Test: Super-admin can read any user document
      const superAdminContext = testEnv.authenticatedContext(superAdminId, {
        role: 'super-admin',
      });
      const superAdminDb = superAdminContext.firestore();
      
      await assertSucceeds(getDoc(doc(superAdminDb, 'users', userId)));
    });

    it('should deny unauthenticated read', async () => {
      const userId = 'user123';
      
      // Setup: Create user document
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await setDoc(doc(db, 'users', userId), {
          uid: userId,
          email: 'user@example.com',
          role: 'client',
        });
      });

      // Test: Unauthenticated user cannot read
      const unauthContext = testEnv.unauthenticatedContext();
      const unauthDb = unauthContext.firestore();
      
      await assertFails(getDoc(doc(unauthDb, 'users', userId)));
    });
  });

  describe('Write Operations', () => {
    it('should allow user to create own document on signup', async () => {
      const userId = 'newuser123';
      
      const userContext = testEnv.authenticatedContext(userId);
      const userDb = userContext.firestore();
      
      await assertSucceeds(
        setDoc(doc(userDb, 'users', userId), {
          uid: userId,
          email: 'newuser@example.com',
          role: 'client',
          createdAt: new Date(),
        })
      );
    });

    it('should allow user to update own document', async () => {
      const userId = 'user123';
      
      // Setup: Create user document
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await setDoc(doc(db, 'users', userId), {
          uid: userId,
          email: 'user@example.com',
          role: 'client',
          displayName: 'Old Name',
        });
      });

      // Test: User can update own document
      const userContext = testEnv.authenticatedContext(userId);
      const userDb = userContext.firestore();
      
      await assertSucceeds(
        updateDoc(doc(userDb, 'users', userId), {
          displayName: 'New Name',
        })
      );
    });

    it('should deny user from updating other user documents', async () => {
      const userId1 = 'user123';
      const userId2 = 'user456';
      
      // Setup: Create user document
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await setDoc(doc(db, 'users', userId2), {
          uid: userId2,
          email: 'user2@example.com',
          role: 'client',
        });
      });

      // Test: User cannot update other user's document
      const userContext = testEnv.authenticatedContext(userId1);
      const userDb = userContext.firestore();
      
      await assertFails(
        updateDoc(doc(userDb, 'users', userId2), {
          displayName: 'Hacked Name',
        })
      );
    });

    it('should deny user from changing own role', async () => {
      const userId = 'user123';
      
      // Setup: Create user document
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await setDoc(doc(db, 'users', userId), {
          uid: userId,
          email: 'user@example.com',
          role: 'client',
        });
      });

      // Test: User cannot escalate own role
      const userContext = testEnv.authenticatedContext(userId);
      const userDb = userContext.firestore();
      
      await assertFails(
        updateDoc(doc(userDb, 'users', userId), {
          role: 'admin', // Attempting privilege escalation
        })
      );
    });

    it('should allow admin to update user roles', async () => {
      const adminId = 'admin123';
      const userId = 'user456';
      
      // Setup: Create user document
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await setDoc(doc(db, 'users', userId), {
          uid: userId,
          email: 'user@example.com',
          role: 'client',
        });
      });

      // Test: Admin can update user role
      const adminContext = testEnv.authenticatedContext(adminId, {
        role: 'admin',
      });
      const adminDb = adminContext.firestore();
      
      await assertSucceeds(
        updateDoc(doc(adminDb, 'users', userId), {
          role: 'moderator',
        })
      );
    });
  });

  describe('Delete Operations', () => {
    it('should deny user from deleting own document', async () => {
      const userId = 'user123';
      
      // Setup: Create user document
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await setDoc(doc(db, 'users', userId), {
          uid: userId,
          email: 'user@example.com',
          role: 'client',
        });
      });

      // Test: User cannot delete own document
      const userContext = testEnv.authenticatedContext(userId);
      const userDb = userContext.firestore();
      
      await assertFails(deleteDoc(doc(userDb, 'users', userId)));
    });

    it('should allow super-admin to delete user documents', async () => {
      const superAdminId = 'superadmin123';
      const userId = 'user456';
      
      // Setup: Create user document
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await setDoc(doc(db, 'users', userId), {
          uid: userId,
          email: 'user@example.com',
          role: 'client',
        });
      });

      // Test: Super-admin can delete user documents
      const superAdminContext = testEnv.authenticatedContext(superAdminId, {
        role: 'super-admin',
      });
      const superAdminDb = superAdminContext.firestore();
      
      await assertSucceeds(deleteDoc(doc(superAdminDb, 'users', userId)));
    });
  });

  describe('Custom Claims RBAC', () => {
    it('should use Custom Claims for role checks (free operation)', async () => {
      const userId = 'moderator123';
      const targetUserId = 'user456';
      
      // Setup: Create target user document
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await setDoc(doc(db, 'users', targetUserId), {
          uid: targetUserId,
          email: 'user@example.com',
          role: 'client',
        });
      });

      // Test: Moderator (via Custom Claims) can read user documents
      const moderatorContext = testEnv.authenticatedContext(userId, {
        role: 'moderator', // This is a Custom Claim (no Firestore read)
      });
      const moderatorDb = moderatorContext.firestore();
      
      await assertSucceeds(getDoc(doc(moderatorDb, 'users', targetUserId)));
    });
  });
});

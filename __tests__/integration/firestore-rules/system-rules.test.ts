/**
 * Integration Test: System Collection Firestore Rules
 * @module __tests__/integration/firestore-rules/system-rules
 * 
 * ✅ DIAMOND STANDARD: Integration Testing with Firebase Emulators
 * 
 * Tests Firestore security rules for the _system collection.
 * Per Diamond Standard: "**This is the *only* way to test security rules**"
 * 
 * The _system collection is used for:
 * - Application initialization status
 * - Global configuration
 * - System-wide settings
 * - Testing and diagnostics
 * 
 * Security Model:
 * - READ: All authenticated users can read system documents
 * - WRITE: Only admins can write system documents
 * - UNAUTHENTICATED: No access
 * 
 * @requires Firebase Emulators running (npm run emulators)
 */

import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { setDoc, doc, getDoc, updateDoc, deleteDoc, getDocs, collection } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { resolve } from 'path';

let testEnv: RulesTestEnvironment;

// Test user IDs and roles
const USER_ID = 'regularUser';
const ADMIN_ID = 'adminUser';
const MODERATOR_ID = 'moderatorUser';
const SUPER_ADMIN_ID = 'superAdminUser';
const SUPPORT_ID = 'supportUser';

beforeAll(async () => {
  // Initialize test environment with Firestore rules
  testEnv = await initializeTestEnvironment({
    projectId: 'test-project-system-rules',
    firestore: {
      host: 'localhost',
      port: 8080,
      rules: readFileSync(resolve(__dirname, '../../../firestore.rules'), 'utf8'),
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

afterEach(async () => {
  await testEnv.clearFirestore();
});

describe('System Collection (_system) Rules', () => {
  describe('Read Operations', () => {
    beforeEach(async () => {
      // Seed system document
      await testEnv.withSecurityRulesDisabled(async (ctx) => {
        await setDoc(doc(ctx.firestore(), '_system', 'config'), {
          initialized: true,
          version: '1.0.0',
          lastUpdated: new Date(),
          features: {
            authentication: true,
            notifications: true,
          },
        });
      });
    });

    it('should allow authenticated regular user to read system documents', async () => {
      const context = testEnv.authenticatedContext(USER_ID, {
        role: 'customer',
      });

      const docRef = doc(context.firestore(), '_system', 'config');
      await assertSucceeds(getDoc(docRef));
    });

    it('should allow admin to read system documents', async () => {
      const context = testEnv.authenticatedContext(ADMIN_ID, {
        role: 'admin',
      });

      const docRef = doc(context.firestore(), '_system', 'config');
      await assertSucceeds(getDoc(docRef));
    });

    it('should allow super-admin to read system documents', async () => {
      const context = testEnv.authenticatedContext(SUPER_ADMIN_ID, {
        role: 'super-admin',
      });

      const docRef = doc(context.firestore(), '_system', 'config');
      await assertSucceeds(getDoc(docRef));
    });

    it('should allow moderator to read system documents', async () => {
      const context = testEnv.authenticatedContext(MODERATOR_ID, {
        role: 'moderator',
      });

      const docRef = doc(context.firestore(), '_system', 'config');
      await assertSucceeds(getDoc(docRef));
    });

    it('should allow support user to read system documents', async () => {
      const context = testEnv.authenticatedContext(SUPPORT_ID, {
        role: 'support',
      });

      const docRef = doc(context.firestore(), '_system', 'config');
      await assertSucceeds(getDoc(docRef));
    });

    it('should deny unauthenticated user from reading system documents', async () => {
      const context = testEnv.unauthenticatedContext();

      const docRef = doc(context.firestore(), '_system', 'config');
      await assertFails(getDoc(docRef));
    });

    it('should allow authenticated user to list system documents', async () => {
      const context = testEnv.authenticatedContext(USER_ID, {
        role: 'customer',
      });

      // Seed multiple documents
      await testEnv.withSecurityRulesDisabled(async (ctx) => {
        await setDoc(doc(ctx.firestore(), '_system', 'status'), {
          healthy: true,
          timestamp: new Date(),
        });
      });

      const collectionRef = collection(context.firestore(), '_system');
      await assertSucceeds(getDocs(collectionRef));
    });
  });

  describe('Write Operations - Admin Access', () => {
    it('should allow admin to create system documents', async () => {
      const context = testEnv.authenticatedContext(ADMIN_ID, {
        role: 'admin',
      });

      const docRef = doc(context.firestore(), '_system', 'newConfig');
      await assertSucceeds(setDoc(docRef, {
        setting: 'value',
        enabled: true,
        createdAt: new Date(),
      }));
    });

    it('should allow admin to update system documents', async () => {
      // Seed document
      await testEnv.withSecurityRulesDisabled(async (ctx) => {
        await setDoc(doc(ctx.firestore(), '_system', 'config'), {
          initialized: true,
          version: '1.0.0',
        });
      });

      const context = testEnv.authenticatedContext(ADMIN_ID, {
        role: 'admin',
      });

      const docRef = doc(context.firestore(), '_system', 'config');
      await assertSucceeds(updateDoc(docRef, {
        version: '1.1.0',
        updatedAt: new Date(),
      }));
    });

    it('should allow admin to delete system documents', async () => {
      // Seed document
      await testEnv.withSecurityRulesDisabled(async (ctx) => {
        await setDoc(doc(ctx.firestore(), '_system', 'tempConfig'), {
          temporary: true,
        });
      });

      const context = testEnv.authenticatedContext(ADMIN_ID, {
        role: 'admin',
      });

      const docRef = doc(context.firestore(), '_system', 'tempConfig');
      await assertSucceeds(deleteDoc(docRef));
    });

    it('should allow super-admin to write system documents', async () => {
      const context = testEnv.authenticatedContext(SUPER_ADMIN_ID, {
        role: 'super-admin',
      });

      const docRef = doc(context.firestore(), '_system', 'superConfig');
      await assertSucceeds(setDoc(docRef, {
        superAdminOnly: true,
        priority: 'high',
      }));
    });
  });

  describe('Write Operations - Moderator Access', () => {
    it('should allow moderator to write system documents (inherits admin rights)', async () => {
      const context = testEnv.authenticatedContext(MODERATOR_ID, {
        role: 'moderator',
      });

      const docRef = doc(context.firestore(), '_system', 'modConfig');
      await assertSucceeds(setDoc(docRef, {
        moderatorSetting: true,
      }));
    });

    it('should allow moderator to update system documents', async () => {
      // Seed document
      await testEnv.withSecurityRulesDisabled(async (ctx) => {
        await setDoc(doc(ctx.firestore(), '_system', 'config'), {
          initialized: true,
        });
      });

      const context = testEnv.authenticatedContext(MODERATOR_ID, {
        role: 'moderator',
      });

      const docRef = doc(context.firestore(), '_system', 'config');
      await assertSucceeds(updateDoc(docRef, {
        moderatorUpdated: true,
      }));
    });
  });

  describe('Write Operations - Support Access', () => {
    it('should allow support user to write system documents (inherits admin rights)', async () => {
      const context = testEnv.authenticatedContext(SUPPORT_ID, {
        role: 'support',
      });

      const docRef = doc(context.firestore(), '_system', 'supportConfig');
      await assertSucceeds(setDoc(docRef, {
        supportSetting: true,
      }));
    });
  });

  describe('Write Operations - Denied Access', () => {
    it('should deny regular user from creating system documents', async () => {
      const context = testEnv.authenticatedContext(USER_ID, {
        role: 'customer',
      });

      const docRef = doc(context.firestore(), '_system', 'userConfig');
      await assertFails(setDoc(docRef, {
        userSetting: 'not allowed',
      }));
    });

    it('should deny regular user from updating system documents', async () => {
      // Seed document
      await testEnv.withSecurityRulesDisabled(async (ctx) => {
        await setDoc(doc(ctx.firestore(), '_system', 'config'), {
          initialized: true,
          version: '1.0.0',
        });
      });

      const context = testEnv.authenticatedContext(USER_ID, {
        role: 'customer',
      });

      const docRef = doc(context.firestore(), '_system', 'config');
      await assertFails(updateDoc(docRef, {
        version: '2.0.0',
      }));
    });

    it('should deny regular user from deleting system documents', async () => {
      // Seed document
      await testEnv.withSecurityRulesDisabled(async (ctx) => {
        await setDoc(doc(ctx.firestore(), '_system', 'config'), {
          initialized: true,
        });
      });

      const context = testEnv.authenticatedContext(USER_ID, {
        role: 'customer',
      });

      const docRef = doc(context.firestore(), '_system', 'config');
      await assertFails(deleteDoc(docRef));
    });

    it('should deny unauthenticated user from writing system documents', async () => {
      const context = testEnv.unauthenticatedContext();

      const docRef = doc(context.firestore(), '_system', 'unauthConfig');
      await assertFails(setDoc(docRef, {
        setting: 'value',
      }));
    });

    it('should deny business user from writing system documents', async () => {
      const context = testEnv.authenticatedContext('businessUser', {
        role: 'business',
      });

      const docRef = doc(context.firestore(), '_system', 'businessConfig');
      await assertFails(setDoc(docRef, {
        businessSetting: 'not allowed',
      }));
    });

    it('should deny contractor from writing system documents', async () => {
      const context = testEnv.authenticatedContext('contractorUser', {
        role: 'contractor',
      });

      const docRef = doc(context.firestore(), '_system', 'contractorConfig');
      await assertFails(setDoc(docRef, {
        contractorSetting: 'not allowed',
      }));
    });

    it('should deny employee from writing system documents', async () => {
      const context = testEnv.authenticatedContext('employeeUser', {
        role: 'employee',
      });

      const docRef = doc(context.firestore(), '_system', 'employeeConfig');
      await assertFails(setDoc(docRef, {
        employeeSetting: 'not allowed',
      }));
    });
  });

  describe('System Initialization Document', () => {
    it('should allow admin to mark system as initialized', async () => {
      const context = testEnv.authenticatedContext(ADMIN_ID, {
        role: 'admin',
      });

      const docRef = doc(context.firestore(), '_system', 'initialization');
      await assertSucceeds(setDoc(docRef, {
        initialized: true,
        timestamp: new Date(),
        version: '1.0.0',
        environment: 'production',
      }));
    });

    it('should allow any authenticated user to check initialization status', async () => {
      // Seed initialization document
      await testEnv.withSecurityRulesDisabled(async (ctx) => {
        await setDoc(doc(ctx.firestore(), '_system', 'initialization'), {
          initialized: true,
          timestamp: new Date(),
        });
      });

      const context = testEnv.authenticatedContext(USER_ID, {
        role: 'customer',
      });

      const docRef = doc(context.firestore(), '_system', 'initialization');
      const snapshot = await assertSucceeds(getDoc(docRef));
      expect(snapshot.data()?.initialized).toBe(true);
    });
  });

  describe('System Feature Flags', () => {
    beforeEach(async () => {
      // Seed feature flags
      await testEnv.withSecurityRulesDisabled(async (ctx) => {
        await setDoc(doc(ctx.firestore(), '_system', 'features'), {
          authentication: true,
          profileSwitching: true,
          notifications: false,
          maintenance: false,
        });
      });
    });

    it('should allow authenticated user to read feature flags', async () => {
      const context = testEnv.authenticatedContext(USER_ID, {
        role: 'customer',
      });

      const docRef = doc(context.firestore(), '_system', 'features');
      const snapshot = await assertSucceeds(getDoc(docRef));
      expect(snapshot.data()?.authentication).toBe(true);
    });

    it('should allow admin to update feature flags', async () => {
      const context = testEnv.authenticatedContext(ADMIN_ID, {
        role: 'admin',
      });

      const docRef = doc(context.firestore(), '_system', 'features');
      await assertSucceeds(updateDoc(docRef, {
        notifications: true,
        maintenance: true,
      }));
    });

    it('should deny regular user from updating feature flags', async () => {
      const context = testEnv.authenticatedContext(USER_ID, {
        role: 'customer',
      });

      const docRef = doc(context.firestore(), '_system', 'features');
      await assertFails(updateDoc(docRef, {
        notifications: true,
      }));
    });
  });

  describe('System Diagnostics', () => {
    it('should allow admin to write diagnostic information', async () => {
      const context = testEnv.authenticatedContext(ADMIN_ID, {
        role: 'admin',
      });

      const docRef = doc(context.firestore(), '_system', 'diagnostics');
      await assertSucceeds(setDoc(docRef, {
        lastHealthCheck: new Date(),
        status: 'healthy',
        metrics: {
          activeUsers: 100,
          totalRequests: 5000,
        },
      }));
    });

    it('should allow any authenticated user to read diagnostics', async () => {
      // Seed diagnostics
      await testEnv.withSecurityRulesDisabled(async (ctx) => {
        await setDoc(doc(ctx.firestore(), '_system', 'diagnostics'), {
          status: 'healthy',
          timestamp: new Date(),
        });
      });

      const context = testEnv.authenticatedContext(USER_ID, {
        role: 'customer',
      });

      const docRef = doc(context.firestore(), '_system', 'diagnostics');
      await assertSucceeds(getDoc(docRef));
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing document gracefully for read', async () => {
      const context = testEnv.authenticatedContext(USER_ID, {
        role: 'customer',
      });

      const docRef = doc(context.firestore(), '_system', 'nonexistent');
      const snapshot = await assertSucceeds(getDoc(docRef));
      expect(snapshot.exists()).toBe(false);
    });

    it('should allow admin to overwrite existing system document', async () => {
      // Seed document
      await testEnv.withSecurityRulesDisabled(async (ctx) => {
        await setDoc(doc(ctx.firestore(), '_system', 'config'), {
          version: '1.0.0',
        });
      });

      const context = testEnv.authenticatedContext(ADMIN_ID, {
        role: 'admin',
      });

      const docRef = doc(context.firestore(), '_system', 'config');
      await assertSucceeds(setDoc(docRef, {
        version: '2.0.0',
        completelyNew: true,
      }));
    });

    it('should handle empty system document reads', async () => {
      // Seed empty document
      await testEnv.withSecurityRulesDisabled(async (ctx) => {
        await setDoc(doc(ctx.firestore(), '_system', 'empty'), {});
      });

      const context = testEnv.authenticatedContext(USER_ID, {
        role: 'customer',
      });

      const docRef = doc(context.firestore(), '_system', 'empty');
      const snapshot = await assertSucceeds(getDoc(docRef));
      expect(snapshot.exists()).toBe(true);
      expect(Object.keys(snapshot.data() || {}).length).toBe(0);
    });
  });
});

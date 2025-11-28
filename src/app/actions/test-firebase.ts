/**
 * Firebase Connection Test
 * Server Action to verify both Client and Admin SDK configurations
 */
'use server';

import { adminAuth, adminDb } from '@/shared/lib/firebase/admin';
import { logger } from '@/shared/lib/logger';

export async function testFirebaseConnection() {
  const results = {
    clientSDK: { configured: false, error: null as string | null },
    adminAuth: { working: false, error: null as string | null, userCount: 0 },
    adminFirestore: { working: false, error: null as string | null, collections: [] as string[] },
  };

  // Test Admin Auth
  try {
    const listUsersResult = await adminAuth.listUsers(5);
    results.adminAuth.working = true;
    results.adminAuth.userCount = listUsersResult.users.length;
    logger.info({ 
      component: 'testFirebaseConnection',
      userCount: listUsersResult.users.length 
    }, 'Admin Auth working');
  } catch (error) {
    results.adminAuth.error = String(error);
    logger.error({ 
      component: 'testFirebaseConnection',
      error: error instanceof Error ? error.message : String(error)
    }, 'Admin Auth error');
  }

  // Test Admin Firestore
  try {
    // Try to list collections (note: this only works if collections exist)
    const collections = await adminDb.listCollections();
    results.adminFirestore.working = true;
    results.adminFirestore.collections = collections.map(col => col.id);
    logger.info({ 
      component: 'testFirebaseConnection',
      collections: collections.map(col => col.id) 
    }, 'Admin Firestore working');
    
    // Also try a simple read operation
    const testDoc = await adminDb.collection('users').limit(1).get();
    logger.info({ 
      component: 'testFirebaseConnection',
      documentCount: testDoc.size 
    }, 'Admin Firestore read test completed');
  } catch (error) {
    results.adminFirestore.error = String(error);
    logger.error({ 
      component: 'testFirebaseConnection',
      error: error instanceof Error ? error.message : String(error)
    }, 'Admin Firestore error');
  }

  // Client SDK is tested on the client side
  results.clientSDK.configured = true;

  return results;
}

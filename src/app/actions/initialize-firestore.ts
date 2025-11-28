/**
 * Initialize Firestore Database
 * Server Action to create initial collections and verify Firestore setup
 */
'use server';

import { adminDb } from '@/shared/lib/firebase/admin';
import { logger } from '@/shared/lib/logger';

export async function initializeFirestore() {
  const results = {
    testCollection: { created: false, error: null as string | null },
    usersCollection: { created: false, error: null as string | null },
    profilesCollection: { created: false, error: null as string | null },
  };

  try {
    // Create a test document to initialize the database
    const testDocRef = adminDb.collection('_system').doc('initialized');
    await testDocRef.set({
      initialized: true,
      timestamp: new Date(),
      message: 'Firestore database initialized successfully'
    });
    results.testCollection.created = true;
    logger.info({ component: 'initializeFirestore' }, 'Created _system collection');

    // Create users collection structure (with a placeholder doc)
    const usersDocRef = adminDb.collection('users').doc('_placeholder');
    await usersDocRef.set({
      _placeholder: true,
      createdAt: new Date(),
      note: 'This is a placeholder document. Delete after first real user is created.'
    });
    results.usersCollection.created = true;
    logger.info({ component: 'initializeFirestore' }, 'Created users collection');

    // Create profiles collection structure
    const profilesDocRef = adminDb.collection('profiles').doc('_placeholder');
    await profilesDocRef.set({
      _placeholder: true,
      createdAt: new Date(),
      note: 'This is a placeholder document. Delete after first real profile is created.'
    });
    results.profilesCollection.created = true;
    logger.info({ component: 'initializeFirestore' }, 'Created profiles collection');

    logger.info({ component: 'initializeFirestore' }, 'Firestore database initialized with basic collections');

  } catch (error) {
    logger.error({ 
      component: 'initializeFirestore',
      error: error instanceof Error ? error.message : String(error)
    }, 'Error initializing Firestore');
    return { success: false, error: String(error), results };
  }

  return { success: true, results };
}

export async function listFirestoreCollections() {
  try {
    const collections = await adminDb.listCollections();
    const collectionNames = collections.map(col => col.id);
    
    logger.info({ 
      component: 'listFirestoreCollections',
      collections: collectionNames 
    }, 'Firestore collections retrieved');
    
    // Get document counts for each collection
    const collectionInfo = await Promise.all(
      collections.map(async (col) => {
        const snapshot = await col.get();
        return {
          name: col.id,
          documentCount: snapshot.size,
          documents: snapshot.docs.map(doc => {
            const data = doc.data();
            // Convert Firestore Timestamps to ISO strings for client compatibility
            const serializedData = Object.fromEntries(
              Object.entries(data).map(([key, value]) => {
                if (value && typeof value === 'object' && '_seconds' in value) {
                  // Firestore Timestamp - convert to ISO string
                  const timestamp = value as { _seconds: number; _nanoseconds: number };
                  return [key, new Date(timestamp._seconds * 1000).toISOString()];
                }
                return [key, value];
              })
            );
            return {
              id: doc.id,
              data: serializedData
            };
          })
        };
      })
    );

    return { success: true, collections: collectionInfo };
  } catch (error) {
    logger.error({ 
      component: 'listFirestoreCollections',
      error: error instanceof Error ? error.message : String(error)
    }, 'Error listing collections');
    return { success: false, error: String(error) };
  }
}

export async function testFirestoreOperations() {
  const results = {
    write: { success: false, error: null as string | null },
    read: { success: false, error: null as string | null, data: null as any },
    update: { success: false, error: null as string | null },
    delete: { success: false, error: null as string | null },
  };

  const testDocId = 'test-doc-' + Date.now();

  try {
    // 1. Write test
    await adminDb.collection('_system').doc(testDocId).set({
      testField: 'test value',
      createdAt: new Date(),
      number: 42
    });
    results.write.success = true;
    logger.info({ component: 'testFirestoreOperations' }, 'Write operation successful');

    // 2. Read test
    const docSnapshot = await adminDb.collection('_system').doc(testDocId).get();
    if (docSnapshot.exists) {
      results.read.success = true;
      const data = docSnapshot.data();
      // Serialize the data for client compatibility
      const serializedData = data ? Object.fromEntries(
        Object.entries(data).map(([key, value]) => {
          if (value && typeof value === 'object' && '_seconds' in value) {
            const timestamp = value as { _seconds: number; _nanoseconds: number };
            return [key, new Date(timestamp._seconds * 1000).toISOString()];
          }
          return [key, value];
        })
      ) : null;
      results.read.data = serializedData;
      logger.info({ 
        component: 'testFirestoreOperations',
        data: results.read.data 
      }, 'Read operation successful');
    }

    // 3. Update test
    await adminDb.collection('_system').doc(testDocId).update({
      testField: 'updated value',
      updatedAt: new Date()
    });
    results.update.success = true;
    logger.info({ component: 'testFirestoreOperations' }, 'Update operation successful');

    // 4. Delete test
    await adminDb.collection('_system').doc(testDocId).delete();
    results.delete.success = true;
    logger.info({ component: 'testFirestoreOperations' }, 'Delete operation successful');

  } catch (error) {
    logger.error({ 
      component: 'testFirestoreOperations',
      error: error instanceof Error ? error.message : String(error)
    }, 'Error in Firestore operations');
    const errorStr = String(error);
    if (!results.write.success) results.write.error = errorStr;
    else if (!results.read.success) results.read.error = errorStr;
    else if (!results.update.success) results.update.error = errorStr;
    else results.delete.error = errorStr;
  }

  return results;
}

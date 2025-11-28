/**
 * Firestore Database Diagnostic Tool
 * Server Action to diagnose Firestore connection issues
 */
'use server';

import { adminDb, adminApp } from '@/shared/lib/firebase/admin';
import { logger } from '@/shared/lib/logger';

export async function diagnoseFirestore() {
  const diagnostics = {
    appInitialized: false,
    projectId: '',
    databasePath: '',
    canConnect: false,
    errorDetails: null as any,
    suggestions: [] as string[],
  };

  try {
    // Check if app is initialized
    if (!adminApp) {
      throw new Error('Admin app is not initialized');
    }
    
    diagnostics.appInitialized = !!adminApp;
    diagnostics.projectId = adminApp.options.projectId || 'unknown';
    
    logger.info({ 
      component: 'diagnoseFirestore',
      projectId: diagnostics.projectId,
      database: 'getworkenmain (nam5)'
    }, 'Diagnosing Firestore connection');
    
    diagnostics.databasePath = 'projects/getworken-b6f27/databases/getworkenmain';

    // Try to get database info
    try {
      // Attempt a simple operation that doesn't require collections
      const testRef = adminDb.collection('_diagnostics').doc('test');
      
      // Try to set a document (this will create the collection if it doesn't exist)
      await testRef.set({
        test: true,
        timestamp: new Date(),
        message: 'Diagnostic test'
      });
      
      diagnostics.canConnect = true;
      logger.info({ component: 'diagnoseFirestore' }, 'Successfully wrote to Firestore');
      
      // Clean up the test document
      await testRef.delete();
      logger.info({ component: 'diagnoseFirestore' }, 'Successfully cleaned up test document');
      
    } catch (writeError: any) {
      diagnostics.errorDetails = {
        code: writeError.code,
        message: writeError.message,
        details: writeError.details || 'No additional details',
      };
      
      logger.error({ 
        component: 'diagnoseFirestore',
        code: writeError.code,
        message: writeError.message
      }, 'Firestore write error');
      
      // Analyze the error and provide suggestions
      if (writeError.code === 5 || writeError.message?.includes('NOT_FOUND')) {
        diagnostics.suggestions.push(
          '🔴 Database NOT_FOUND error detected',
          '📋 This usually means:',
          '  1. Firestore database is not created in Firebase Console',
          '  2. Database is in a different location than expected',
          '  3. Database ID is incorrect (for multi-database projects)',
          '',
          '✅ To fix:',
          '  1. Go to: https://console.firebase.google.com/project/' + diagnostics.projectId + '/firestore',
          '  2. If you see "Create database", click it and follow the wizard',
          '  3. If database exists, verify it\'s in "Native mode" not "Datastore mode"',
          '  4. For Firestore Enterprise Edition (nam5), ensure the database is properly provisioned'
        );
      } else if (writeError.code === 7 || writeError.message?.includes('PERMISSION_DENIED')) {
        diagnostics.suggestions.push(
          '🔴 PERMISSION_DENIED error detected',
          '📋 This usually means:',
          '  1. Service account doesn\'t have Firestore permissions',
          '  2. Security rules are blocking the write',
          '',
          '✅ To fix:',
          '  1. Verify service account has "Cloud Datastore User" role',
          '  2. Check that you\'re using the correct service account JSON'
        );
      }
    }
    
  } catch (error: any) {
    diagnostics.errorDetails = {
      message: error.message,
      stack: error.stack,
    };
    logger.error({ 
      component: 'diagnoseFirestore',
      error: error.message,
      stack: error.stack
    }, 'Fatal error during diagnostics');
    diagnostics.suggestions.push(
      '🔴 Fatal initialization error',
      '📋 Check that your Firebase Admin SDK credentials are correct',
      '  - FIREBASE_PROJECT_ID',
      '  - FIREBASE_CLIENT_EMAIL',
      '  - FIREBASE_PRIVATE_KEY'
    );
  }

  return diagnostics;
}

export async function checkFirestoreExists() {
  try {
    // Try to list collections - this will fail if database doesn't exist
    const collections = await adminDb.listCollections();
    
    return {
      exists: true,
      collectionCount: collections.length,
      collections: collections.map(c => c.id),
    };
  } catch (error: any) {
    return {
      exists: false,
      error: {
        code: error.code,
        message: error.message,
      },
    };
  }
}

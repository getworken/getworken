/**
 * Firebase Connection Test Page
 * Tests both Client SDK and Admin SDK connectivity
 */
'use client';

import { useEffect, useState } from 'react';
import { testFirebaseConnection } from '@/app/actions/test-firebase';
import { initializeFirestore, listFirestoreCollections, testFirestoreOperations } from '@/app/actions/initialize-firestore';
import { auth } from '@/shared/lib/firebase';

export default function FirebaseTestPage() {
  const [serverResults, setServerResults] = useState<any>(null);
  const [clientStatus, setClientStatus] = useState<string>('Testing...');
  const [isLoading, setIsLoading] = useState(true);
  const [firestoreInfo, setFirestoreInfo] = useState<any>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [operationResults, setOperationResults] = useState<any>(null);

  useEffect(() => {
    async function runTests() {
      setIsLoading(true);

      // Test Client SDK
      try {
        // Check if auth is initialized
        if (auth) {
          setClientStatus('✅ Client SDK initialized successfully');
          console.log('✅ Client SDK (Auth) initialized:', auth.app.name);
        } else {
          setClientStatus('❌ Client SDK failed to initialize');
        }
      } catch (error) {
        setClientStatus(`❌ Client SDK error: ${error}`);
        console.error('Client SDK error:', error);
      }

      // Test Server/Admin SDK
      try {
        const results = await testFirebaseConnection();
        setServerResults(results);
        
        // Also get Firestore collections info
        const collectionsResult = await listFirestoreCollections();
        setFirestoreInfo(collectionsResult);
      } catch (error) {
        console.error('Server test error:', error);
        setServerResults({ error: String(error) });
      }

      setIsLoading(false);
    }

    runTests();
  }, []);

  const handleInitializeFirestore = async () => {
    setIsInitializing(true);
    try {
      const result = await initializeFirestore();
      console.log('Initialize result:', result);
      
      // Refresh collections info
      const collectionsResult = await listFirestoreCollections();
      setFirestoreInfo(collectionsResult);
      
      alert(result.success ? '✅ Firestore initialized successfully!' : '❌ Error: ' + result.error);
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error: ' + String(error));
    }
    setIsInitializing(false);
  };

  const handleTestOperations = async () => {
    try {
      const results = await testFirestoreOperations();
      setOperationResults(results);
      console.log('Operation results:', results);
      
      // Refresh collections info
      const collectionsResult = await listFirestoreCollections();
      setFirestoreInfo(collectionsResult);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold text-white">
          🔥 Firebase Connection Test
        </h1>

        {/* Client SDK Test */}
        <div className="mb-6 rounded-lg bg-gray-800 p-6 shadow-xl">
          <h2 className="mb-4 text-xl font-semibold text-gray-100">
            Client SDK (Browser)
          </h2>
          <div className="font-mono text-sm">
            <p className={clientStatus.includes('✅') ? 'text-green-400' : 'text-red-400'}>
              {clientStatus}
            </p>
          </div>
        </div>

        {/* Admin SDK Tests */}
        <div className="rounded-lg bg-gray-800 p-6 shadow-xl">
          <h2 className="mb-4 text-xl font-semibold text-gray-100">
            Admin SDK (Server-Side)
          </h2>

          {isLoading ? (
            <p className="text-gray-300">Running server tests...</p>
          ) : (
            <div className="space-y-4 font-mono text-sm">
              {/* Admin Auth Test */}
              <div>
                <h3 className="mb-2 font-semibold text-gray-200">Admin Auth:</h3>
                {serverResults?.adminAuth?.working ? (
                  <div className="text-green-400">
                    <p>✅ Working</p>
                    <p className="ml-4 text-gray-300">
                      Found {serverResults.adminAuth.userCount} users
                    </p>
                  </div>
                ) : (
                  <div className="text-red-400">
                    <p>❌ Error</p>
                    <p className="ml-4 text-xs text-gray-400">{serverResults?.adminAuth?.error}</p>
                  </div>
                )}
              </div>

              {/* Admin Firestore Test */}
              <div>
                <h3 className="mb-2 font-semibold text-gray-200">Admin Firestore:</h3>
                {serverResults?.adminFirestore?.working ? (
                  <div className="text-green-400">
                    <p>✅ Working</p>
                    <p className="ml-4 text-gray-300">
                      Collections: {serverResults.adminFirestore.collections.length > 0 
                        ? serverResults.adminFirestore.collections.join(', ')
                        : 'None yet (database is empty)'}
                    </p>
                  </div>
                ) : (
                  <div className="text-yellow-400">
                    <p>⚠️ Connected but database is empty</p>
                    <p className="ml-4 text-xs text-gray-400">
                      {serverResults?.adminFirestore?.error?.includes('NOT_FOUND') 
                        ? 'Database has no collections yet - click "Initialize Database" below'
                        : serverResults?.adminFirestore?.error}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Firestore Collections Info */}
        {firestoreInfo && (
          <div className="mt-6 rounded-lg bg-gray-800 p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-semibold text-gray-100">
              📚 Firestore Collections
            </h2>
            
            {firestoreInfo.success ? (
              <div className="space-y-4">
                {firestoreInfo.collections && firestoreInfo.collections.length > 0 ? (
                  firestoreInfo.collections.map((col: any) => (
                    <div key={col.name} className="rounded border border-gray-700 bg-gray-900 p-4">
                      <h3 className="font-semibold text-gray-100">
                        {col.name} <span className="text-sm text-gray-400">({col.documentCount} docs)</span>
                      </h3>
                      {col.documents.length > 0 && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-sm text-gray-300 hover:text-white">
                            View documents
                          </summary>
                          <pre className="mt-2 overflow-auto rounded bg-black p-2 text-xs text-green-400">
                            {JSON.stringify(col.documents, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-300">No collections found. Click "Initialize Database" to create initial collections.</p>
                )}
              </div>
            ) : (
              <p className="text-red-400">Error: {firestoreInfo.error}</p>
            )}
          </div>
        )}

        {/* Firestore Actions */}
        <div className="mt-6 rounded-lg bg-gray-800 p-6 shadow-xl">
          <h2 className="mb-4 text-xl font-semibold text-gray-100">
            🔧 Firestore Actions
          </h2>
          
          <div className="space-y-4">
            <div>
              <button
                onClick={handleInitializeFirestore}
                disabled={isInitializing}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-600"
              >
                {isInitializing ? 'Initializing...' : '🚀 Initialize Database'}
              </button>
              <p className="mt-2 text-sm text-gray-300">
                Creates initial collections (users, profiles, _system) with placeholder documents
              </p>
            </div>

            <div>
              <button
                onClick={handleTestOperations}
                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                🧪 Test CRUD Operations
              </button>
              <p className="mt-2 text-sm text-gray-300">
                Tests Create, Read, Update, Delete operations
              </p>
            </div>
          </div>

          {/* Operation Results */}
          {operationResults && (
            <div className="mt-4 rounded border border-gray-700 bg-gray-900 p-4">
              <h3 className="mb-2 font-semibold text-gray-100">Test Results:</h3>
              <div className="space-y-2 text-sm">
                <div className={operationResults.write.success ? 'text-green-400' : 'text-red-400'}>
                  {operationResults.write.success ? '✅' : '❌'} Write: {operationResults.write.success ? 'Success' : operationResults.write.error}
                </div>
                <div className={operationResults.read.success ? 'text-green-400' : 'text-red-400'}>
                  {operationResults.read.success ? '✅' : '❌'} Read: {operationResults.read.success ? 'Success' : operationResults.read.error}
                </div>
                <div className={operationResults.update.success ? 'text-green-400' : 'text-red-400'}>
                  {operationResults.update.success ? '✅' : '❌'} Update: {operationResults.update.success ? 'Success' : operationResults.update.error}
                </div>
                <div className={operationResults.delete.success ? 'text-green-400' : 'text-red-400'}>
                  {operationResults.delete.success ? '✅' : '❌'} Delete: {operationResults.delete.success ? 'Success' : operationResults.delete.error}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-6 rounded-lg bg-blue-900 p-6">
          <h3 className="mb-2 font-semibold text-blue-100">✅ Success Criteria:</h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-blue-200">
            <li>Client SDK should show "✅ initialized successfully"</li>
            <li>Admin Auth should show "✅ Working"</li>
            <li>Admin Firestore should show "✅ Working"</li>
          </ul>
          
          <div className="mt-4">
            <h3 className="mb-2 font-semibold text-blue-100">📝 Note:</h3>
            <p className="text-sm text-blue-200">
              If you see errors, check the server terminal for detailed error messages.
              User count may be 0 if you haven't created any users yet - that's normal!
            </p>
          </div>
        </div>

        {/* Raw Results (for debugging) */}
        <details className="mt-6">
          <summary className="cursor-pointer text-sm text-gray-300 hover:text-white">
            Show raw test results
          </summary>
          <pre className="mt-2 overflow-auto rounded bg-black p-4 text-xs text-green-400">
            {JSON.stringify({ clientStatus, serverResults }, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}

/**
 * Serialize Firestore Timestamps to ISO strings
 * @module shared/lib/profile/serializeFirestoreData
 * 
 * ✅ DIAMOND STANDARD: Utility for Firestore data serialization
 * 
 * Firestore Timestamps cannot be sent to client components directly.
 * This utility converts them to ISO strings for React Server Components.
 * 
 * @param data - Firestore document data that may contain Timestamps
 * @returns Serialized data with Timestamps converted to ISO strings
 * 
 * @example
 * ```ts
 * const doc = await adminDb.collection('businesses').doc(id).get();
 * const data = serializeFirestoreData(doc.data());
 * ```
 */
export function serializeFirestoreData(data: any): any {
  if (!data) return data;
  
  // Handle arrays
  if (Array.isArray(data)) {
    return data.map(item => serializeFirestoreData(item));
  }
  
  // Handle non-object primitives
  if (typeof data !== 'object') {
    return data;
  }
  
  const serialized: any = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (value && typeof value === 'object' && '_seconds' in value) {
      // Convert Firestore Timestamp to ISO string
      const timestamp = value as { _seconds: number; _nanoseconds: number };
      serialized[key] = new Date(timestamp._seconds * 1000).toISOString();
    } else if (value && typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
      // Handle Firestore Timestamp objects with toDate method
      serialized[key] = value.toDate().toISOString();
    } else if (Array.isArray(value)) {
      // Recursively serialize arrays
      serialized[key] = value.map(item => serializeFirestoreData(item));
    } else if (value && typeof value === 'object') {
      // Recursively serialize nested objects
      serialized[key] = serializeFirestoreData(value);
    } else {
      serialized[key] = value;
    }
  }
  
  return serialized;
}

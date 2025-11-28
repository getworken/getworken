/**
 * Firebase Firestore Helpers
 * @module shared/lib/firebase/firestore
 * 
 * Client-side Firestore utilities following Diamond Standard
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  QueryConstraint,
  DocumentData,
  DocumentReference,
  CollectionReference,
} from 'firebase/firestore';
import { db } from './config';

/**
 * Get a document reference
 * 
 * @param collectionName - Name of the collection
 * @param docId - Document ID
 * @returns DocumentReference
 * 
 * @example
 * const userRef = getDocRef('users', userId);
 */
export const getDocRef = (
  collectionName: string,
  docId: string
): DocumentReference<DocumentData> => {
  return doc(db, collectionName, docId);
};

/**
 * Get a collection reference
 * 
 * @param collectionName - Name of the collection
 * @returns CollectionReference
 * 
 * @example
 * const usersRef = getCollectionRef('users');
 */
export const getCollectionRef = (
  collectionName: string
): CollectionReference<DocumentData> => {
  return collection(db, collectionName);
};

/**
 * Get a single document
 * 
 * @param collectionName - Name of the collection
 * @param docId - Document ID
 * @returns Promise resolving to document data or null
 * 
 * @example
 * const userData = await getDocument('users', userId);
 */
export const getDocument = async <T = DocumentData>(
  collectionName: string,
  docId: string
): Promise<T | null> => {
  const docRef = getDocRef(collectionName, docId);
  const docSnap = await getDoc(docRef);
  
  return docSnap.exists() ? (docSnap.data() as T) : null;
};

/**
 * Get multiple documents with query constraints
 * 
 * @param collectionName - Name of the collection
 * @param constraints - Query constraints (where, orderBy, limit, etc.)
 * @returns Promise resolving to array of documents
 * 
 * @example
 * const users = await getDocuments('users', [where('role', '==', 'admin')]);
 */
export const getDocuments = async <T = DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> => {
  const collectionRef = getCollectionRef(collectionName);
  const q = query(collectionRef, ...constraints);
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
};

/**
 * Create or update a document
 * 
 * @param collectionName - Name of the collection
 * @param docId - Document ID
 * @param data - Document data
 * @param merge - Whether to merge with existing data
 * @returns Promise resolving when operation completes
 * 
 * @example
 * await setDocument('users', userId, { name: 'John' }, true);
 */
export const setDocument = async (
  collectionName: string,
  docId: string,
  data: DocumentData,
  merge = false
): Promise<void> => {
  const docRef = getDocRef(collectionName, docId);
  return setDoc(docRef, data, { merge });
};

/**
 * Update specific fields in a document
 * 
 * @param collectionName - Name of the collection
 * @param docId - Document ID
 * @param data - Partial document data to update
 * @returns Promise resolving when operation completes
 * 
 * @example
 * await updateDocument('users', userId, { lastLogin: new Date() });
 */
export const updateDocument = async (
  collectionName: string,
  docId: string,
  data: Partial<DocumentData>
): Promise<void> => {
  const docRef = getDocRef(collectionName, docId);
  return updateDoc(docRef, data);
};

/**
 * Delete a document
 * 
 * @param collectionName - Name of the collection
 * @param docId - Document ID
 * @returns Promise resolving when operation completes
 * 
 * @example
 * await deleteDocument('users', userId);
 */
export const deleteDocument = async (
  collectionName: string,
  docId: string
): Promise<void> => {
  const docRef = getDocRef(collectionName, docId);
  return deleteDoc(docRef);
};

// Re-export commonly used Firestore functions
export { where, orderBy, limit, query };

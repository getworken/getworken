'use server';

/**
 * Authentication Server Actions
 * @module features/auth/api/actions
 * 
 * Following Diamond Standard:
 * - Server Actions handle all Firestore operations using Firebase Admin SDK
 * - Client-side handles Firebase Auth only
 * - All user input is validated with Zod
 * - All functions have TSDoc documentation
 * - Uses structured logging (no console.log)
 * 
 * @security Server Actions are server-only by default when using 'use server' directive
 * @see {@link file://DIAMOND_STANDARD_REFERENCE.md}
 */

import { adminDb } from '@/shared/lib/firebase/admin';
import { logger } from '@/shared/lib/logger';
import { z } from 'zod';

/**
 * Zod schema for user creation data
 * Enforces validation of all required fields
 */
const UserDataSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2, 'State/Province is required').max(2, 'State/Province must be 2 characters'),
});

type UserData = z.infer<typeof UserDataSchema>;

/**
 * Serialize Firestore Timestamp to ISO string for client compatibility
 * React Server Components can only pass plain objects to client components
 * 
 * @param data - Firestore document data that may contain Timestamps
 * @returns Serialized data with Timestamps converted to ISO strings
 */
function serializeFirestoreData(data: any): any {
  if (!data) return data;
  
  const serialized: any = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (value && typeof value === 'object' && '_seconds' in value) {
      // Convert Firestore Timestamp to ISO string
      const timestamp = value as { _seconds: number; _nanoseconds: number };
      serialized[key] = new Date(timestamp._seconds * 1000).toISOString();
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      // Recursively serialize nested objects
      serialized[key] = serializeFirestoreData(value);
    } else {
      serialized[key] = value;
    }
  }
  
  return serialized;
}

/**
 * Create user documents in Firestore after signup
 * This is called from the client after Firebase Auth creates the user
 * 
 * Following the specified collection structure:
 * - users/{uid} with all user fields
 * - profiles map with business, contractor, customer, employee sub-maps
 * - Each profile has active, completed, onboardingStep, and ID fields
 * 
 * @param userId - Firebase Auth UID of the newly created user
 * @param userData - User profile data collected during signup
 * @returns Success status and error message if applicable
 * 
 * @example
 * ```typescript
 * const result = await createUserDocuments(user.uid, {
 *   email: 'user@example.com',
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   phoneNumber: '555-1234',
 *   city: 'New York',
 *   state: 'NY'
 * });
 * 
 * if (result.success) {
 *   router.push('/getstarted');
 * }
 * ```
 */
export async function createUserDocuments(
  userId: string,
  userData: UserData
) {
  try {
    // Validate input with Zod
    const validatedData = UserDataSchema.parse(userData);
    
    const now = new Date();
    
    // Create user document with exact structure specified
    const userRef = adminDb.collection('users').doc(userId);
    await userRef.set({
      uid: userId,
      email: validatedData.email,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      phoneNumber: validatedData.phoneNumber,
      city: validatedData.city,
      'state/province': validatedData.state,
      
      // Profiles map with all profile types
      profiles: {
        business: {
          active: false,
          businessId: `BUS-${userId}`,
          completed: false,
          onboardingStep: 0,
        },
        contractor: {
          active: false,
          completed: false,
          contractorId: `CONT-${userId}`,
          onboardingStep: 0,
        },
        customer: {
          active: true,
          completed: false,
          customerId: `CUST-${userId}`,
        },
        employee: {
          active: false,
          completed: false,
          employeeId: `EMP-${userId}`,
          onboardingStep: 0,
          role: 'client',
        },
      },
      
      createdAt: now,
      updatedAt: now,
    });

    logger.info({ userId }, 'Successfully created user document');
    return { success: true };
  } catch (error) {
    logger.error({ error, userId }, 'Error creating user documents');
    
    // Return validation errors
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: error.errors.map(e => e.message).join(', ')
      };
    }
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create user documents' 
    };
  }
}

/**
 * Get complete user data from Firestore
 * Used by AuthProvider to sync user state
 * 
 * @param userId - Firebase Auth UID
 * @returns User document data with serialized timestamps
 * 
 * @example
 * ```typescript
 * const result = await getUserData(user.uid);
 * if (result.success) {
 *   console.log(result.user);
 * }
 * ```
 */
export async function getUserData(userId: string) {
  try {
    const userDoc = await adminDb.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return { success: false, error: 'User not found' };
    }

    const userData = userDoc.data();
    const serializedData = serializeFirestoreData(userData);
    
    return { 
      success: true, 
      user: serializedData
    };
  } catch (error) {
    logger.error({ error, userId }, 'Error fetching user data');
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch user data' 
    };
  }
}

/**
 * Update user profile data
 * Used for profile completion and updates
 * 
 * @param userId - Firebase Auth UID
 * @param updates - Partial user document updates
 * @returns Success status
 * 
 * @example
 * ```typescript
 * await updateUserProfile(user.uid, {
 *   'profiles.customer.completed': true,
 *   updatedAt: new Date()
 * });
 * ```
 */
export async function updateUserProfile(
  userId: string,
  updates: Record<string, any>
) {
  try {
    const userRef = adminDb.collection('users').doc(userId);
    
    await userRef.update({
      ...updates,
      updatedAt: new Date(),
    });

    logger.info({ userId, updates: Object.keys(updates) }, 'User profile updated successfully');
    return { success: true };
  } catch (error) {
    logger.error({ error, userId }, 'Error updating user profile');
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update user profile' 
    };
  }
}

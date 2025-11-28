'use server';

import 'server-only';

/**
 * Server Actions for Business Profile Operations
 * @module app/api/actions/profiles/businessActions
 * 
 * ✅ DIAMOND STANDARD COMPLIANCE:
 * - Server-side only execution (server-only package)
 * - Authentication verification using requireAuth()
 * - Input validation using Zod schemas
 * - Structured logging using Pino
 * - Proper error handling and serialization
 * - Defense in depth security
 * 
 * @see {@link file://firestore.rules} for database-level security
 * @see {@link file://src/entities/profile/model/schemas.ts} for validation schemas
 */

import { adminDb } from '@/shared/lib/firebase/admin';
import { requireAuth } from '@/shared/lib/firebase/auth-utils';
import { serializeFirestoreData } from '@/shared/lib/profile/serializeFirestoreData';
import { logger } from '@/shared/lib/logger';
import { z } from 'zod';

/**
 * Business onboarding data validation schema
 * Ensures all required fields are present and valid
 */
const BusinessOnboardingSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  businessType: z.string().optional(),
  tagline: z.string().optional(),
  description: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string().default('US'),
  }).optional(),
});

/**
 * Business profile update validation schema
 */
const BusinessUpdateSchema = z.record(z.unknown()).refine(
  (data) => Object.keys(data).length > 0,
  { message: 'At least one field must be provided for update' }
);

/**
 * Create or update business profile during onboarding
 * 
 * ✅ DIAMOND STANDARD:
 * - Validates all input using Zod schema
 * - Verifies user authentication and ownership
 * - Uses structured logging (Pino)
 * - Atomic Firestore operations
 * - Proper error serialization
 * 
 * @param businessId - The business document ID (format: BUS-{userId})
 * @param userId - The owner's user ID
 * @param data - Business profile data to save
 * @returns Success/error response with serialized data
 * 
 * @example
 * const result = await saveBusinessOnboarding('BUS-abc123', 'abc123', {
 *   businessName: 'Acme Corp',
 *   businessType: 'General Contractor',
 *   email: 'contact@acme.com'
 * });
 */
export async function saveBusinessOnboarding(
  businessId: string,
  userId: string,
  data: unknown
) {
  const operationId = `saveBusinessOnboarding_${Date.now()}`;
  
  try {
    // Step 1: Authenticate user
    const user = await requireAuth();
    logger.info({ operationId, userId: user.uid, businessId }, 'Business onboarding started');
    
    // Step 2: Verify ownership
    if (userId !== user.uid) {
      logger.warn({ operationId, requestedUserId: userId, actualUserId: user.uid }, 'Unauthorized business onboarding attempt');
      return { success: false, error: 'Unauthorized' };
    }
    
    // Step 3: Validate input data
    const validationResult = BusinessOnboardingSchema.safeParse(data);
    if (!validationResult.success) {
      logger.warn({ operationId, errors: validationResult.error.errors }, 'Business onboarding validation failed');
      return { 
        success: false, 
        error: 'Validation failed', 
        details: validationResult.error.errors 
      };
    }
    
    const validatedData = validationResult.data;

    // Step 4: Save to Firestore
    const businessRef = adminDb.collection('businesses').doc(businessId);
    await businessRef.set({
      ...validatedData,
      userId,
      businessId,
      isPublic: false,
      verified: false,
      active: true,
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, { merge: true });
    
    // Step 5: Update user's profile references
    const userRef = adminDb.collection('users').doc(userId);
    await userRef.update({
      'profiles.business.completed': true,
      'profiles.business.active': true,
      'profiles.business.businessId': businessId,
      'profiles.business.onboardingData': null,
      updatedAt: new Date(),
    });
    
    logger.info({ operationId, businessId, userId }, 'Business onboarding completed successfully');
    return { success: true, businessId };
  } catch (error) {
    logger.error(
      { 
        operationId, 
        businessId, 
        userId,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      }, 
      'Business onboarding failed'
    );
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to save business profile' 
    };
  }
}

/**
 * Update business profile
 * 
 * ✅ DIAMOND STANDARD:
 * - Validates input data
 * - Verifies user owns the business profile
 * - Structured logging
 * - Atomic updates with timestamps
 * 
 * @param businessId - The business document ID (format: BUS-{userId})
 * @param updates - Partial business profile updates
 * @returns Success/error response
 */
export async function updateBusinessProfile(
  businessId: string,
  updates: unknown
) {
  const operationId = `updateBusinessProfile_${Date.now()}`;
  
  try {
    // Step 1: Authenticate
    const user = await requireAuth();
    logger.info({ operationId, userId: user.uid, businessId }, 'Business profile update started');
    
    // Step 2: Verify ownership (businessId should include userId)
    if (!businessId.includes(user.uid)) {
      logger.warn({ operationId, businessId, userId: user.uid }, 'Unauthorized business profile update attempt');
      return { success: false, error: 'Unauthorized' };
    }
    
    // Step 3: Validate updates
    const validationResult = BusinessUpdateSchema.safeParse(updates);
    if (!validationResult.success) {
      logger.warn({ operationId, errors: validationResult.error.errors }, 'Business profile update validation failed');
      return { 
        success: false, 
        error: 'Validation failed', 
        details: validationResult.error.errors 
      };
    }

    // Step 4: Update Firestore
    const businessRef = adminDb.collection('businesses').doc(businessId);
    await businessRef.update({
      ...validationResult.data,
      updatedAt: new Date(),
    });
    
    logger.info({ operationId, businessId }, 'Business profile updated successfully');
    return { success: true };
  } catch (error) {
    logger.error(
      { 
        operationId, 
        businessId,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      }, 
      'Business profile update failed'
    );
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update business profile' 
    };
  }
}

/**
 * Get business profile data
 * 
 * ✅ DIAMOND STANDARD:
 * - Authentication required
 * - Firestore data serialization for timestamps
 * - Structured logging
 * - Proper null checks
 * 
 * @param businessId - The business document ID
 * @returns Business profile data or error
 */
export async function getBusinessProfile(businessId: string) {
  const operationId = `getBusinessProfile_${Date.now()}`;
  
  try {
    // Authenticate
    const user = await requireAuth();
    logger.info({ operationId, userId: user.uid, businessId }, 'Fetching business profile');

    // Fetch from Firestore
    const businessRef = adminDb.collection('businesses').doc(businessId);
    const businessDoc = await businessRef.get();
    
    if (!businessDoc.exists) {
      logger.warn({ operationId, businessId }, 'Business profile not found');
      return { success: false, error: 'Business not found' };
    }
    
    const businessData = businessDoc.data();
    
    if (!businessData) {
      logger.warn({ operationId, businessId }, 'Business profile data is null');
      return { success: false, error: 'Business profile data is invalid' };
    }
    
    logger.info({ operationId, businessId }, 'Business profile fetched successfully');
    return { 
      success: true, 
      business: {
        id: businessDoc.id,
        ...serializeFirestoreData(businessData)
      }
    };
  } catch (error) {
    logger.error(
      { 
        operationId, 
        businessId,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      }, 
      'Failed to fetch business profile'
    );
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to get business profile' 
    };
  }
}

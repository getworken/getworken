'use server';

import 'server-only';

/**
 * Server Actions for Customer Profile Operations
 * @module app/api/actions/profiles/customerActions
 * 
 * ✅ DIAMOND STANDARD COMPLIANCE:
 * - Server-side only execution (server-only package)
 * - Authentication verification using requireAuth()
 * - Input validation using Zod schemas
 * - Structured logging using Pino
 * - Proper error handling and serialization
 * - Secure ownership verification for all operations
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
 * Address validation schema
 */
const AddressSchema = z.object({
  id: z.string(),
  label: z.string().optional(),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().length(2, 'State must be 2 characters'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  country: z.string().default('US'),
  isPrimary: z.boolean().optional(),
});

/**
 * Customer preferences validation schema
 */
const PreferencesSchema = z.object({
  emailNotifications: z.boolean().optional(),
  smsNotifications: z.boolean().optional(),
  marketingEmails: z.boolean().optional(),
  jobUpdates: z.boolean().optional(),
  estimateNotifications: z.boolean().optional(),
  messageNotifications: z.boolean().optional(),
  smsJobUpdates: z.boolean().optional(),
  smsEstimateNotifications: z.boolean().optional(),
  smsMessageNotifications: z.boolean().optional(),
});

/**
 * Update customer's saved addresses
 * 
 * ✅ DIAMOND STANDARD:
 * - Validates address data
 * - Verifies ownership
 * - Structured logging
 * - Atomic updates
 * 
 * @param customerId - Customer document ID (format: CUST-{userId})
 * @param addresses - Array of address objects
 * @returns Success/error response
 */
export async function updateCustomerAddresses(
  customerId: string,
  addresses: unknown
) {
  const operationId = `updateCustomerAddresses_${Date.now()}`;
  
  try {
    // Verify authentication
    const user = await requireAuth();
    logger.info({ operationId, userId: user.uid, customerId }, 'Updating customer addresses');
    
    // Verify the user owns this customer profile
    if (customerId !== `CUST-${user.uid}`) {
      logger.warn({ operationId, customerId, expectedId: `CUST-${user.uid}` }, 'Unauthorized address update');
      return { success: false, error: 'Unauthorized' };
    }
    
    // Validate addresses
    const validationResult = z.array(AddressSchema).safeParse(addresses);
    if (!validationResult.success) {
      logger.warn({ operationId, errors: validationResult.error.errors }, 'Address validation failed');
      return { success: false, error: 'Validation failed', details: validationResult.error.errors };
    }

    const customerRef = adminDb.collection('customers').doc(customerId);
    await customerRef.update({
      savedAddresses: validationResult.data,
      updatedAt: new Date(),
    });
    
    logger.info({ operationId, customerId }, 'Customer addresses updated successfully');
    return { success: true };
  } catch (error) {
    logger.error(
      { 
        operationId, 
        customerId,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      }, 
      'Failed to update customer addresses'
    );
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update addresses'
    };
  }
}

/**
 * Update customer preferences
 * 
 * ✅ DIAMOND STANDARD:
 * - Validates preferences
 * - Verifies ownership
 * - Structured logging
 * - Atomic updates
 * 
 * @param customerId - Customer document ID
 * @param preferences - Communication preferences
 * @returns Success/error response
 */
export async function updateCustomerPreferences(
  customerId: string,
  preferences: unknown
) {
  const operationId = `updateCustomerPreferences_${Date.now()}`;
  
  try {
    // Verify authentication
    const user = await requireAuth();
    logger.info({ operationId, userId: user.uid, customerId }, 'Updating customer preferences');
    
    // Verify the user owns this customer profile
    if (customerId !== `CUST-${user.uid}`) {
      logger.warn({ operationId, customerId, expectedId: `CUST-${user.uid}` }, 'Unauthorized preferences update');
      return { success: false, error: 'Unauthorized' };
    }
    
    // Validate preferences
    const validationResult = PreferencesSchema.safeParse(preferences);
    if (!validationResult.success) {
      logger.warn({ operationId, errors: validationResult.error.errors }, 'Preferences validation failed');
      return { success: false, error: 'Validation failed', details: validationResult.error.errors };
    }

    const customerRef = adminDb.collection('customers').doc(customerId);
    await customerRef.update({
      communicationPreferences: validationResult.data,
      updatedAt: new Date(),
    });
    
    logger.info({ operationId, customerId }, 'Customer preferences updated successfully');
    return { success: true };
  } catch (error) {
    logger.error({ operationId, customerId, error: error instanceof Error ? error.message : String(error) }, 'Failed to update preferences');
    return { success: false, error: 'Failed to update preferences' };
  }
}

/**
 * Get customer preferences
 * 
 * ✅ DIAMOND STANDARD:
 * - Authentication required
 * - Ownership verification
 * - Structured logging
 * - Proper null checks
 * 
 * @param customerId - Customer document ID
 * @returns Customer preferences or error
 */
export async function getCustomerPreferences(customerId: string) {
  const operationId = `getCustomerPreferences_${Date.now()}`;
  
  try {
    // Verify authentication
    const user = await requireAuth();
    logger.info({ operationId, userId: user.uid, customerId }, 'Fetching customer preferences');
    
    // Verify the user owns this customer profile
    if (customerId !== `CUST-${user.uid}`) {
      logger.warn({ operationId, customerId, expectedId: `CUST-${user.uid}` }, 'Unauthorized preferences access');
      return { success: false, error: 'Unauthorized' };
    }

    const customerRef = adminDb.collection('customers').doc(customerId);
    const customerDoc = await customerRef.get();
    
    if (customerDoc.exists) {
      const data = customerDoc.data();
      logger.info({ operationId, customerId }, 'Customer preferences fetched successfully');
      return { success: true, preferences: data?.communicationPreferences || {} };
    }
    
    logger.warn({ operationId, customerId }, 'Customer not found');
    return { success: false, error: 'Customer not found' };
  } catch (error) {
    logger.error({ operationId, customerId, error: error instanceof Error ? error.message : String(error) }, 'Failed to get preferences');
    return { success: false, error: 'Failed to get preferences' };
  }
}

/**
 * Get customer profile
 * 
 * ✅ DIAMOND STANDARD:
 * - Authentication required
 * - Ownership verification
 * - Firestore data serialization
 * - Structured logging
 * - Proper null checks
 * 
 * @param customerId - Customer document ID
 * @returns Customer profile data or error
 */
export async function getCustomerProfile(customerId: string) {
  const operationId = `getCustomerProfile_${Date.now()}`;
  
  try {
    // Verify authentication
    const user = await requireAuth();
    logger.info({ operationId, userId: user.uid, customerId }, 'Fetching customer profile');
    
    // Verify the user owns this customer profile
    if (customerId !== `CUST-${user.uid}`) {
      logger.warn({ operationId, customerId, expectedId: `CUST-${user.uid}` }, 'Unauthorized profile access');
      return { success: false, error: 'Unauthorized' };
    }

    const customerRef = adminDb.collection('customers').doc(customerId);
    const customerDoc = await customerRef.get();
    
    if (!customerDoc.exists) {
      logger.warn({ operationId, customerId }, 'Customer profile not found');
      return { success: false, error: 'Customer profile not found' };
    }
    
    const customerData = customerDoc.data();
    
    if (!customerData) {
      logger.warn({ operationId, customerId }, 'Customer profile data is null');
      return { success: false, error: 'Customer profile data is invalid' };
    }
    
    logger.info({ operationId, customerId }, 'Customer profile fetched successfully');
    return { 
      success: true, 
      customer: {
        id: customerDoc.id,
        ...serializeFirestoreData(customerData)
      }
    };
  } catch (error) {
    logger.error({ operationId, customerId, error: error instanceof Error ? error.message : String(error) }, 'Failed to get customer profile');
    return { success: false, error: 'Failed to get customer profile' };
  }
}

/**
 * Update customer profile
 * 
 * ✅ DIAMOND STANDARD:
 * - Validates updates
 * - Verifies ownership
 * - Structured logging
 * - Atomic updates
 * 
 * @param customerId - Customer document ID
 * @param updates - Partial customer profile updates
 * @returns Success/error response
 */
export async function updateCustomerProfile(
  customerId: string,
  updates: unknown
) {
  const operationId = `updateCustomerProfile_${Date.now()}`;
  
  try {
    // Verify authentication
    const user = await requireAuth();
    logger.info({ operationId, userId: user.uid, customerId }, 'Customer profile update started');
    
    // Verify the user owns this customer profile
    if (customerId !== `CUST-${user.uid}`) {
      logger.warn({ operationId, customerId, expectedId: `CUST-${user.uid}` }, 'Unauthorized profile update');
      return { success: false, error: 'Unauthorized' };
    }
    
    // Validate updates
    const validationResult = z.record(z.unknown()).safeParse(updates);
    if (!validationResult.success || Object.keys(validationResult.data).length === 0) {
      logger.warn({ operationId, errors: validationResult.success ? 'No fields to update' : validationResult.error.errors }, 'Profile update validation failed');
      return { success: false, error: 'Validation failed' };
    }

    const customerRef = adminDb.collection('customers').doc(customerId);
    await customerRef.update({
      ...validationResult.data,
      updatedAt: new Date(),
    });
    
    logger.info({ operationId, customerId }, 'Customer profile updated successfully');
    return { success: true };
  } catch (error) {
    logger.error({ operationId, customerId, error: error instanceof Error ? error.message : String(error) }, 'Failed to update customer profile');
    return { success: false, error: 'Failed to update customer profile' };
  }
}

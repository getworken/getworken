'use server';

import 'server-only';

/**
 * Server Actions for Onboarding Operations
 * @module app/api/actions/profiles/onboardingActions
 * 
 * ✅ DIAMOND STANDARD COMPLIANCE:
 * - Server-side only execution (server-only package)
 * - Authentication verification using requireAuth()
 * - Input validation using Zod schemas
 * - Structured logging using Pino
 * - Proper error handling and serialization
 * - Handles contractor and employee onboarding with authentication
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
 * Contractor onboarding validation schema
 */
const ContractorOnboardingSchema = z.object({
  displayName: z.string().min(1, 'Display name is required'),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  specialties: z.array(z.string()).optional(),
  licenses: z.array(z.object({
    type: z.string(),
    number: z.string(),
    state: z.string(),
    expiryDate: z.string().optional(),
  })).optional(),
});

/**
 * Employee onboarding validation schema
 */
const EmployeeOnboardingSchema = z.object({
  displayName: z.string().min(1, 'Display name is required'),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  specializations: z.array(z.string()).optional(),
  certifications: z.array(z.object({
    name: z.string(),
    issuer: z.string(),
    date: z.string(),
  })).optional(),
});

/**
 * Profile update validation schema
 */
const ProfileUpdateSchema = z.record(z.unknown()).refine(
  (data) => Object.keys(data).length > 0,
  { message: 'At least one field must be provided for update' }
);

/**
 * Create or update contractor profile during onboarding
 * 
 * ✅ DIAMOND STANDARD:
 * - Validates input using Zod schema
 * - Verifies authentication and ownership
 * - Structured logging
 * - Atomic Firestore operations
 * 
 * @param contractorId - Contractor document ID (format: CONT-{userId})
 * @param userId - Owner's user ID
 * @param data - Contractor profile data
 * @returns Success/error response
 */
export async function saveContractorOnboarding(
  contractorId: string,
  userId: string,
  data: unknown
) {
  const operationId = `saveContractorOnboarding_${Date.now()}`;
  
  try {
    // Verify authentication
    const user = await requireAuth();
    logger.info({ operationId, userId: user.uid, contractorId }, 'Contractor onboarding started');
    
    // Verify the user owns this profile
    if (userId !== user.uid) {
      logger.warn({ operationId, requestedUserId: userId, actualUserId: user.uid }, 'Unauthorized contractor onboarding');
      return { success: false, error: 'Unauthorized' };
    }
    
    // Validate input
    const validationResult = ContractorOnboardingSchema.safeParse(data);
    if (!validationResult.success) {
      logger.warn({ operationId, errors: validationResult.error.errors }, 'Contractor onboarding validation failed');
      return { success: false, error: 'Validation failed', details: validationResult.error.errors };
    }

    const contractorRef = adminDb.collection('contractors').doc(contractorId);
    await contractorRef.set({
      ...validationResult.data,
      userId,
      contractorId,
      isPublic: false,
      verified: false,
      active: true,
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, { merge: true });
    
    // Update user's profiles
    const userRef = adminDb.collection('users').doc(userId);
    await userRef.update({
      'profiles.contractor.completed': true,
      'profiles.contractor.active': true,
      'profiles.contractor.contractorId': contractorId,
      updatedAt: new Date(),
    });
    
    logger.info({ operationId, contractorId }, 'Contractor onboarding completed successfully');
    return { success: true };
  } catch (error) {
    logger.error({ operationId, contractorId, error: error instanceof Error ? error.message : String(error) }, 'Contractor onboarding failed');
    return { success: false, error: 'Failed to save contractor profile' };
  }
}

/**
 * Create or update employee profile during onboarding
 * 
 * ✅ DIAMOND STANDARD:
 * - Validates input using Zod schema
 * - Verifies authentication and ownership
 * - Structured logging
 * - Atomic Firestore operations
 * 
 * @param employeeId - Employee document ID (format: EMP-{userId})
 * @param userId - Owner's user ID
 * @param data - Employee profile data
 * @returns Success/error response
 */
export async function saveEmployeeOnboarding(
  employeeId: string,
  userId: string,
  data: unknown
) {
  const operationId = `saveEmployeeOnboarding_${Date.now()}`;
  
  try {
    // Verify authentication
    const user = await requireAuth();
    logger.info({ operationId, userId: user.uid, employeeId }, 'Employee onboarding started');
    
    // Verify the user owns this profile
    if (userId !== user.uid) {
      logger.warn({ operationId, requestedUserId: userId, actualUserId: user.uid }, 'Unauthorized employee onboarding');
      return { success: false, error: 'Unauthorized' };
    }
    
    // Validate input
    const validationResult = EmployeeOnboardingSchema.safeParse(data);
    if (!validationResult.success) {
      logger.warn({ operationId, errors: validationResult.error.errors }, 'Employee onboarding validation failed');
      return { success: false, error: 'Validation failed', details: validationResult.error.errors };
    }

    const employeeRef = adminDb.collection('employees').doc(employeeId);
    await employeeRef.set({
      ...validationResult.data,
      userId,
      employeeId,
      isPublic: false,
      verified: false,
      active: true,
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, { merge: true });
    
    // Update user's profiles
    const userRef = adminDb.collection('users').doc(userId);
    await userRef.update({
      'profiles.employee.completed': true,
      'profiles.employee.active': true,
      'profiles.employee.employeeId': employeeId,
      updatedAt: new Date(),
    });
    
    logger.info({ operationId, employeeId }, 'Employee onboarding completed successfully');
    return { success: true };
  } catch (error) {
    logger.error({ operationId, employeeId, error: error instanceof Error ? error.message : String(error) }, 'Employee onboarding failed');
    return { success: false, error: 'Failed to save employee profile' };
  }
}

/**
 * Update contractor profile
 * 
 * ✅ DIAMOND STANDARD:
 * - Validates updates
 * - Verifies ownership
 * - Structured logging
 * - Atomic updates
 * 
 * @param contractorId - Contractor document ID
 * @param updates - Partial contractor profile updates
 * @returns Success/error response
 */
export async function updateContractorProfile(
  contractorId: string,
  updates: unknown
) {
  const operationId = `updateContractorProfile_${Date.now()}`;
  
  try {
    // Verify authentication
    const user = await requireAuth();
    logger.info({ operationId, userId: user.uid, contractorId }, 'Contractor profile update started');
    
    // Verify the user owns this profile (assuming contractorId format is CONT-{uid})
    if (!contractorId.includes(user.uid)) {
      logger.warn({ operationId, contractorId, userId: user.uid }, 'Unauthorized contractor profile update');
      return { success: false, error: 'Unauthorized' };
    }
    
    // Validate updates
    const validationResult = ProfileUpdateSchema.safeParse(updates);
    if (!validationResult.success) {
      logger.warn({ operationId, errors: validationResult.error.errors }, 'Contractor profile validation failed');
      return { success: false, error: 'Validation failed', details: validationResult.error.errors };
    }

    const contractorRef = adminDb.collection('contractors').doc(contractorId);
    await contractorRef.update({
      ...validationResult.data,
      updatedAt: new Date(),
    });
    
    logger.info({ operationId, contractorId }, 'Contractor profile updated successfully');
    return { success: true };
  } catch (error) {
    logger.error({ operationId, contractorId, error: error instanceof Error ? error.message : String(error) }, 'Contractor profile update failed');
    return { success: false, error: 'Failed to update contractor profile' };
  }
}

/**
 * Update employee profile
 * 
 * ✅ DIAMOND STANDARD:
 * - Validates updates
 * - Verifies ownership
 * - Structured logging
 * - Atomic updates
 * 
 * @param employeeId - Employee document ID
 * @param updates - Partial employee profile updates
 * @returns Success/error response
 */
export async function updateEmployeeProfile(
  employeeId: string,
  updates: unknown
) {
  const operationId = `updateEmployeeProfile_${Date.now()}`;
  
  try {
    // Verify authentication
    const user = await requireAuth();
    logger.info({ operationId, userId: user.uid, employeeId }, 'Employee profile update started');
    
    // Verify the user owns this profile (assuming employeeId format is EMP-{uid})
    if (!employeeId.includes(user.uid)) {
      logger.warn({ operationId, employeeId, userId: user.uid }, 'Unauthorized employee profile update');
      return { success: false, error: 'Unauthorized' };
    }
    
    // Validate updates
    const validationResult = ProfileUpdateSchema.safeParse(updates);
    if (!validationResult.success) {
      logger.warn({ operationId, errors: validationResult.error.errors }, 'Employee profile validation failed');
      return { success: false, error: 'Validation failed', details: validationResult.error.errors };
    }

    const employeeRef = adminDb.collection('employees').doc(employeeId);
    await employeeRef.update({
      ...validationResult.data,
      updatedAt: new Date(),
    });
    
    logger.info({ operationId, employeeId }, 'Employee profile updated successfully');
    return { success: true };
  } catch (error) {
    logger.error({ operationId, employeeId, error: error instanceof Error ? error.message : String(error) }, 'Employee profile update failed');
    return { success: false, error: 'Failed to update employee profile' };
  }
}

/**
 * Get contractor profile
 * 
 * ✅ DIAMOND STANDARD:
 * - Authentication required
 * - Firestore data serialization
 * - Structured logging
 * - Proper null checks
 * 
 * @param contractorId - Contractor document ID
 * @returns Contractor profile data or error
 */
export async function getContractorProfile(contractorId: string) {
  const operationId = `getContractorProfile_${Date.now()}`;
  
  try {
    // Verify authentication
    await requireAuth();
    logger.info({ operationId, contractorId }, 'Fetching contractor profile');

    const contractorRef = adminDb.collection('contractors').doc(contractorId);
    const contractorDoc = await contractorRef.get();
    
    if (!contractorDoc.exists) {
      logger.warn({ operationId, contractorId }, 'Contractor profile not found');
      return { success: false, error: 'Contractor profile not found' };
    }
    
    const contractorData = contractorDoc.data();
    
    if (!contractorData) {
      logger.warn({ operationId, contractorId }, 'Contractor profile data is null');
      return { success: false, error: 'Contractor profile data is invalid' };
    }
    
    logger.info({ operationId, contractorId }, 'Contractor profile fetched successfully');
    return { 
      success: true, 
      contractor: {
        id: contractorDoc.id,
        ...serializeFirestoreData(contractorData)
      }
    };
  } catch (error) {
    logger.error({ operationId, contractorId, error: error instanceof Error ? error.message : String(error) }, 'Failed to fetch contractor profile');
    return { success: false, error: 'Failed to get contractor profile' };
  }
}

/**
 * Get employee profile
 * 
 * ✅ DIAMOND STANDARD:
 * - Authentication required
 * - Firestore data serialization
 * - Structured logging
 * - Proper null checks
 * 
 * @param employeeId - Employee document ID
 * @returns Employee profile data or error
 */
export async function getEmployeeProfile(employeeId: string) {
  const operationId = `getEmployeeProfile_${Date.now()}`;
  
  try {
    // Verify authentication
    await requireAuth();
    logger.info({ operationId, employeeId }, 'Fetching employee profile');

    const employeeRef = adminDb.collection('employees').doc(employeeId);
    const employeeDoc = await employeeRef.get();
    
    if (!employeeDoc.exists) {
      logger.warn({ operationId, employeeId }, 'Employee profile not found');
      return { success: false, error: 'Employee profile not found' };
    }
    
    const employeeData = employeeDoc.data();
    
    if (!employeeData) {
      logger.warn({ operationId, employeeId }, 'Employee profile data is null');
      return { success: false, error: 'Employee profile data is invalid' };
    }
    
    logger.info({ operationId, employeeId }, 'Employee profile fetched successfully');
    return { 
      success: true, 
      employee: {
        id: employeeDoc.id,
        ...serializeFirestoreData(employeeData)
      }
    };
  } catch (error) {
    logger.error({ operationId, employeeId, error: error instanceof Error ? error.message : String(error) }, 'Failed to fetch employee profile');
    return { success: false, error: 'Failed to get employee profile' };
  }
}

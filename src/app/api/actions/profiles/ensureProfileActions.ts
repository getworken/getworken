'use server';
import 'server-only';

import { requireAuth } from '@/shared/lib/firebase/auth-utils';
import { adminDb as db } from '@/shared/lib/firebase/admin';
import { logger } from '@/shared/lib/logger';

/**
 * ✅ DIAMOND STANDARD: Ensures user profile documents exist in Firestore
 * 
 * Creates initial profile documents if they don't exist. This is called automatically
 * when a user logs in or accesses their dashboard for the first time.
 * 
 * Security: Requires authentication, only creates profiles for authenticated user
 * Validation: Checks if documents already exist before creating
 * Observability: Structured logging with operation ID
 * 
 * @param role - User's role type (business, contractor, employee, customer)
 * @returns Success indicator with created profile IDs
 * 
 * @example
 * const result = await ensureProfileExists('business');
 * if (result.success) {
 *   console.log('Profile ready:', result.profileId);
 * }
 */
export async function ensureProfileExists(
  role: 'business' | 'contractor' | 'employee' | 'customer'
) {
  const operationId = `ensureProfileExists_${Date.now()}`;
  
  try {
    const user = await requireAuth();
    logger.info({ operationId, userId: user.uid, role }, 'Checking profile existence');

    const userId = user.uid;
    const email = user.email || '';

    // Check if user document exists
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    let profileId = '';
    let profileExists = false;

    // Determine profile ID and check existence
    switch (role) {
      case 'business':
        profileId = `BUS-${userId}`;
        const businessDoc = await db.collection('businesses').doc(profileId).get();
        profileExists = businessDoc.exists;
        break;
      case 'contractor':
        profileId = `CONT-${userId}`;
        const contractorDoc = await db.collection('contractors').doc(profileId).get();
        profileExists = contractorDoc.exists;
        break;
      case 'employee':
        profileId = `EMP-${userId}`;
        const employeeDoc = await db.collection('employees').doc(profileId).get();
        profileExists = employeeDoc.exists;
        break;
      case 'customer':
        profileId = `CUST-${userId}`;
        const customerDoc = await db.collection('customers').doc(profileId).get();
        profileExists = customerDoc.exists;
        break;
    }

    // If profile exists, return early
    if (profileExists) {
      logger.info({ operationId, userId, profileId }, 'Profile already exists');
      return { success: true, profileId, created: false };
    }

    // Create profile document
    logger.info({ operationId, userId, profileId }, 'Creating new profile');

    const baseTimestamp = new Date();
    const userData: any = {
      uid: userId,
      email,
      role,
      staffMember: false,
      profiles: {},
      createdAt: userDoc.exists ? userDoc.data()?.createdAt : baseTimestamp,
      updatedAt: baseTimestamp
    };

    switch (role) {
      case 'business':
        await db.collection('businesses').doc(profileId).set({
          businessId: profileId,
          ownerId: userId,
          businessName: 'My Business',
          displayName: 'My Business',
          email,
          phone: '',
          website: '',
          address: { street: '', city: '', state: '', zipCode: '' },
          bio: '',
          description: '',
          location: { address: '', city: '', state: '', zipCode: '' },
          contact: { email, phone: '' },
          services: [],
          team: [],
          testimonials: [],
          jobListings: [],
          portfolio: [],
          socialMedia: [],
          companyValues: [],
          isPublic: false,
          completed: false,
          type: 'business',
          createdAt: baseTimestamp,
          updatedAt: baseTimestamp
        });
        userData.profiles = { business: { businessId: profileId, completed: false } };
        break;

      case 'contractor':
        await db.collection('contractors').doc(profileId).set({
          contractorId: profileId,
          ownerId: userId,
          firstName: '',
          lastName: '',
          displayName: 'My Profile',
          email,
          phone: '',
          phoneNumber: '',
          title: '',
          bio: '',
          professionalBio: '',
          specializations: [],
          specialties: [],
          skills: [],
          experience: 0,
          hourlyRate: 0,
          availability: 'available',
          location: { address: '', city: '', state: '', zipCode: '' },
          contact: { email, phone: '' },
          profileImage: '',
          rating: 0,
          reviewCount: 0,
          totalProjects: 0,
          certifications: [],
          licenses: [],
          training: [],
          equipment: [],
          portfolio: [],
          serviceAreas: [],
          isPublic: false,
          completed: false,
          type: 'contractor',
          createdAt: baseTimestamp,
          updatedAt: baseTimestamp
        });
        userData.profiles = { contractor: { contractorId: profileId, completed: false } };
        break;

      case 'employee':
        await db.collection('employees').doc(profileId).set({
          employeeId: profileId,
          businessId: '', // Will be set when invited to a business
          ownerId: userId,
          firstName: '',
          lastName: '',
          displayName: 'My Profile',
          email,
          phone: '',
          phoneNumber: '',
          position: '',
          title: '',
          department: '',
          bio: '',
          skills: [],
          specializations: [],
          hireDate: baseTimestamp,
          profileImage: '',
          contact: { email, phone: '' },
          permissions: {
            canCreateJobs: false,
            canManageTeam: false,
            canViewFinancials: false,
            canManageClients: false
          },
          certifications: [],
          isPublic: false,
          completed: false,
          type: 'employee',
          createdAt: baseTimestamp,
          updatedAt: baseTimestamp
        });
        userData.profiles = { employee: { employeeId: profileId, completed: false } };
        break;

      case 'customer':
        await db.collection('customers').doc(profileId).set({
          customerId: profileId,
          ownerId: userId,
          firstName: '',
          lastName: '',
          displayName: 'My Profile',
          email,
          phoneNumber: '',
          profileImage: '',
          location: { address: '', city: '', state: '', zipCode: '' },
          contact: { email, phone: '' },
          preferences: {
            notificationChannels: ['email'],
            preferredContactTime: 'anytime',
            language: 'en',
            communicationPreference: 'email'
          },
          addresses: [],
          paymentMethods: [],
          recentJobs: [],
          activityLog: [],
          interactionHistory: [],
          totalSpent: 0,
          totalJobs: 0,
          type: 'customer',
          createdAt: baseTimestamp,
          updatedAt: baseTimestamp
        });
        userData.profiles = { customer: { customerId: profileId, completed: false } };
        break;
    }

    // Update user document
    await userRef.set(userData, { merge: true });

    logger.info({ operationId, userId, profileId }, 'Profile created successfully');
    return { success: true, profileId, created: true };

  } catch (error) {
    logger.error({
      operationId,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, 'Failed to ensure profile exists');
    return { success: false, error: 'Failed to create profile' };
  }
}

/**
 * ✅ DIAMOND STANDARD: Gets user's profile ID for their role
 * 
 * Retrieves the profile ID from the user document. If profile doesn't exist,
 * automatically creates it.
 * 
 * @param role - User's role type
 * @returns Profile ID for the user's role
 * 
 * @example
 * const profileId = await getUserProfileId('business');
 * // Returns: 'BUS-abc123'
 */
export async function getUserProfileId(
  role: 'business' | 'contractor' | 'employee' | 'customer'
) {
  const operationId = `getUserProfileId_${Date.now()}`;
  
  try {
    const user = await requireAuth();
    logger.info({ operationId, userId: user.uid, role }, 'Getting profile ID');

    // Try to get from user document first
    const userDoc = await db.collection('users').doc(user.uid).get();
    
    if (userDoc.exists) {
      const userData = userDoc.data();
      const profileData = userData?.profiles?.[role];
      
      if (profileData) {
        const profileId = 
          role === 'business' ? profileData.businessId :
          role === 'contractor' ? profileData.contractorId :
          role === 'employee' ? profileData.employeeId :
          profileData.customerId;
        
        if (profileId) {
          logger.info({ operationId, userId: user.uid, profileId }, 'Profile ID found');
          return { success: true, profileId };
        }
      }
    }

    // Profile doesn't exist, create it
    logger.info({ operationId, userId: user.uid }, 'Profile not found, creating...');
    const createResult = await ensureProfileExists(role);
    
    if (createResult.success) {
      return { success: true, profileId: createResult.profileId };
    }

    return { success: false, error: 'Failed to get or create profile' };

  } catch (error) {
    logger.error({
      operationId,
      error: error instanceof Error ? error.message : String(error)
    }, 'Failed to get profile ID');
    return { success: false, error: 'Failed to get profile ID' };
  }
}

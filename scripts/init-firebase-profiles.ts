// Firebase Profile Data Initialization Script
// Run this to create initial profile documents in Firestore

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin (replace with your service account)
// Download from: Firebase Console > Project Settings > Service Accounts
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

/**
 * Creates initial profile documents for a user
 * This creates placeholder documents so the app can fetch real data
 */
async function createUserProfiles(userId: string, email: string, role: 'business' | 'contractor' | 'employee' | 'customer') {
  console.log(`\n🚀 Creating profiles for user: ${userId} (${role})`);

  try {
    // 1. Create/Update user document
    const userRef = db.collection('users').doc(userId);
    const userData = {
      uid: userId,
      email,
      role,
      staffMember: false,
      profiles: {},
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // 2. Create profile document based on role
    switch (role) {
      case 'business': {
        const businessId = `BUS-${userId}`;
        const businessRef = db.collection('businesses').doc(businessId);
        
        await businessRef.set({
          businessId,
          ownerId: userId,
          businessName: 'My Business',
          displayName: 'My Business',
          email,
          phone: '',
          website: '',
          address: {
            street: '',
            city: '',
            state: '',
            zipCode: ''
          },
          bio: '',
          description: '',
          location: {
            address: '',
            city: '',
            state: '',
            zipCode: ''
          },
          contact: {
            email,
            phone: ''
          },
          services: [],
          team: [],
          testimonials: [],
          jobListings: [],
          isPublic: false,
          completed: false,
          type: 'business',
          createdAt: new Date(),
          updatedAt: new Date()
        });

        userData.profiles = {
          business: { businessId, completed: false }
        };

        console.log(`✅ Created business profile: ${businessId}`);
        break;
      }

      case 'contractor': {
        const contractorId = `CONT-${userId}`;
        const contractorRef = db.collection('contractors').doc(contractorId);
        
        await contractorRef.set({
          contractorId,
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
          location: {
            address: '',
            city: '',
            state: '',
            zipCode: ''
          },
          contact: {
            email,
            phone: ''
          },
          profileImage: '',
          rating: 0,
          reviewCount: 0,
          totalProjects: 0,
          certifications: [],
          licenses: [],
          portfolio: [],
          serviceAreas: [],
          isPublic: false,
          completed: false,
          type: 'contractor',
          createdAt: new Date(),
          updatedAt: new Date()
        });

        userData.profiles = {
          contractor: { contractorId, completed: false }
        };

        console.log(`✅ Created contractor profile: ${contractorId}`);
        break;
      }

      case 'employee': {
        const employeeId = `EMP-${userId}`;
        const businessId = `BUS-${userId}`; // Will need to be updated with actual business
        const employeeRef = db.collection('employees').doc(employeeId);
        
        await employeeRef.set({
          employeeId,
          businessId,
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
          hireDate: new Date(),
          profileImage: '',
          contact: {
            email,
            phone: ''
          },
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
          createdAt: new Date(),
          updatedAt: new Date()
        });

        userData.profiles = {
          employee: { employeeId, completed: false }
        };

        console.log(`✅ Created employee profile: ${employeeId}`);
        break;
      }

      case 'customer': {
        const customerId = `CUST-${userId}`;
        const customerRef = db.collection('customers').doc(customerId);
        
        await customerRef.set({
          customerId,
          ownerId: userId,
          firstName: '',
          lastName: '',
          displayName: 'My Profile',
          email,
          phoneNumber: '',
          profileImage: '',
          location: {
            address: '',
            city: '',
            state: '',
            zipCode: ''
          },
          contact: {
            email,
            phone: ''
          },
          preferences: {
            notificationChannels: ['email'],
            preferredContactTime: 'anytime',
            language: 'en',
            communicationPreference: 'email'
          },
          addresses: [],
          paymentMethods: [],
          recentJobs: [],
          totalSpent: 0,
          totalJobs: 0,
          type: 'customer',
          createdAt: new Date(),
          updatedAt: new Date()
        });

        userData.profiles = {
          customer: { customerId, completed: false }
        };

        console.log(`✅ Created customer profile: ${customerId}`);
        break;
      }
    }

    // Save user document
    await userRef.set(userData, { merge: true });
    console.log(`✅ Updated user document`);

    return { success: true };
  } catch (error) {
    console.error('❌ Error creating profiles:', error);
    return { success: false, error };
  }
}

/**
 * Example usage - Replace with your actual user data
 */
async function main() {
  console.log('🔥 Firebase Profile Initialization Script\n');

  // Example: Create profiles for different user types
  // Replace these with your actual authenticated user IDs from Firebase Auth
  
  // Example business user
  await createUserProfiles(
    'YOUR_FIREBASE_AUTH_USER_ID_HERE',
    'business@example.com',
    'business'
  );

  // Example contractor user
  // await createUserProfiles(
  //   'contractor-user-id',
  //   'contractor@example.com',
  //   'contractor'
  // );

  // Example employee user
  // await createUserProfiles(
  //   'employee-user-id',
  //   'employee@example.com',
  //   'employee'
  // );

  // Example customer user
  // await createUserProfiles(
  //   'customer-user-id',
  //   'customer@example.com',
  //   'customer'
  // );

  console.log('\n✨ Profile initialization complete!');
  process.exit(0);
}

// Run the script
main().catch(console.error);

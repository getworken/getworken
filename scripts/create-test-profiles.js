/**
 * Quick Firebase Profile Creator
 * Run this script to manually create profile documents for testing
 * 
 * Usage:
 * 1. Make sure you're in the getworken-main directory
 * 2. Run: node scripts/create-test-profiles.js
 * 3. Replace YOUR_USER_ID with your actual Firebase Auth user ID
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = {
  "type": "service_account",
  "project_id": "getworken-b6f27",
  "private_key_id": "b6fa76add4baf193acd1be745c9633d761a6930c",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC3WkEu5zMOaaTD\n3QvPTEDG4wguF7KAOQ5gL6YAPLZ8TyR9XKRf8pxKWKLzDoxCTP/YUtlJDMmYvkGX\nMV/c0BMyjjVXaMoBSQgXm/Xp/A7e1PoSE7YOqLx+aU4TRvR2IGG2mykT4oZTojtu\nDv90kt74lXQ5nba2kpea+7ChHwewxHylKdoUtr4jkmKEDhUdRtEslcAJqpQp6NDa\nn8KXoM+eUy32OqfVWUAq1/kHYZqvErNUkWelB8LhcU1XKg4ymO6wgGswt+2nhuFJ\nj9vdQcLursY5fPH7hlwFETW8h0MxAhvrETy+dgCu0ZF+vg7iPZCs1oyXnYYxSydP\nLuqpOeZNAgMBAAECggEAA9whjSmO2JnUFHooen0MzA28KVmUXMCsEyL4UqmfNIS8\nrEBGsZe7lJEYdRd0T8er3H5PVrYEicj6O9hClV/IAljIugYEYqc1RWdMyQKRFD3V\njzXdBPf7vTQy/D2SfejL8HqEZd0Z837HKNel/GqZyQ/puiDI15UZyJ3N0nEtye8q\nihjxu44m3AOGag9bb7s98IMZo+TK8jSBGnagXVgVDNtXJcAOP+BFZWhYrdU/2Oml\nuxsuSQyT6biFwFLwM0jss7olykUUi6B4vdmAy4yNI8QF5RRvLeWlKJcJVy8f59/0\nkz3Yrj0yg6t3Da7wzPiMm97T+ooPO5EA4PAMQdC7HQKBgQDdolzJBRQ//+fioUVx\nocoZGF4kj4SgmIYepCPn9nOSAydduBEnVbgarnXVvtdYtQey3dxjvfpCoAOqHY7E\nyJXUmS2Z4CHMNLsnyWrL3T62uUH0jIKB4U/0e5WbSxynOp/tPsZgJEnwd0oMGUg4\nKVNOArw0mm3tHtBYKx6QE7KOVwKBgQDTyFMBQiBYAjH/MJKNA55NniMLbZL2Six1\nLBTH5PGqyK7AJRMshJrJgvy/m83rerlsz1sC/nUrdvjWd0R5jeyXN8LbYX7ouU1r\nQv2q7SUfkivA1U5CZSVycORUU0VL7YC3BGnNL4CY3qddGp9AMbTWaOSfmxVqYen+\n9l6uufYB+wKBgQCmRvl1lunqWgOOc4+2ALuuuClpJINMOSHmOx71GGD8WoFePoog\nCJ9m5RxikBrf4nE0MF74Nb9b3NDi/+nsmNBP/9vGZfD1U1pWLzaAXCyAydxBrGj9\nKBzkPxOuvltw2vrA8yfBWXhfgB99lDoqaFanYEXy8SknjMaiXzc+wIhlYQKBgQCg\nkdzlMlbFg3yWyCQFCH5IySI28vAfDiPg/vgOivX0D8323uVHto6JRGgPerjI1jaq\nWhjeD0GVH9IRAUKIiuObz2pM3QHUv1IEhjlAFCc2ZaQIw3Ffg8K9nvxvNuduZvdV\nS+JP8LkmroHkZF/j0wwSGFtm67V0ACLi7bbh8RqlawKBgQCQZGy7VHnNcIfkJAKc\nGjUUsN+WgcGi3CSAO85qELFAAEjZOvABUhnX0rdKGUt+hbSu0zDVqFoCehldI4Hf\nHIg0IldTO/wd6YLs0I9oNy2Nhn6krIMQtBnuWdTwxeHvIQa6/AsHdXX+pneP2w34\n/O9MfnPEij2uLZXtH/I9x0xcwA==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@getworken-b6f27.iam.gserviceaccount.com",
  "client_id": "115185884171602616836",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40getworken-b6f27.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://getworken-b6f27.firebaseio.com`
});

const db = admin.firestore();
// Use the correct database name
db.settings({ databaseId: 'getworkenmain' });

/**
 * Create profile documents for a user
 */
async function createProfiles(userId, email, role = 'business') {
  console.log(`\n🚀 Creating ${role} profile for user: ${userId}`);
  
  try {
    const timestamp = admin.firestore.Timestamp.now();
    
    // Create user document
    const userRef = db.collection('users').doc(userId);
    const userData = {
      uid: userId,
      email: email,
      role: role,
      staffMember: false,
      profiles: {},
      createdAt: timestamp,
      updatedAt: timestamp
    };

    // Create profile based on role
    switch (role) {
      case 'business': {
        const businessId = `BUS-${userId}`;
        console.log(`📝 Creating business document: ${businessId}`);
        
        await db.collection('businesses').doc(businessId).set({
          businessId,
          ownerId: userId,
          businessName: 'My Business',
          displayName: 'My Business',
          email: email,
          phone: '',
          website: '',
          address: { street: '', city: '', state: '', zipCode: '' },
          bio: '',
          description: '',
          location: { address: '', city: '', state: '', zipCode: '' },
          contact: { email: email, phone: '' },
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
          createdAt: timestamp,
          updatedAt: timestamp
        });
        
        userData.profiles = { business: { businessId, completed: false } };
        console.log(`✅ Business profile created: ${businessId}`);
        break;
      }

      case 'contractor': {
        const contractorId = `CONT-${userId}`;
        console.log(`📝 Creating contractor document: ${contractorId}`);
        
        await db.collection('contractors').doc(contractorId).set({
          contractorId,
          ownerId: userId,
          firstName: '',
          lastName: '',
          displayName: 'My Profile',
          email: email,
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
          contact: { email: email, phone: '' },
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
          createdAt: timestamp,
          updatedAt: timestamp
        });
        
        userData.profiles = { contractor: { contractorId, completed: false } };
        console.log(`✅ Contractor profile created: ${contractorId}`);
        break;
      }

      case 'employee': {
        const employeeId = `EMP-${userId}`;
        console.log(`📝 Creating employee document: ${employeeId}`);
        
        await db.collection('employees').doc(employeeId).set({
          employeeId,
          businessId: '',
          ownerId: userId,
          firstName: '',
          lastName: '',
          displayName: 'My Profile',
          email: email,
          phone: '',
          phoneNumber: '',
          position: '',
          title: '',
          department: '',
          bio: '',
          skills: [],
          specializations: [],
          hireDate: timestamp,
          profileImage: '',
          contact: { email: email, phone: '' },
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
          createdAt: timestamp,
          updatedAt: timestamp
        });
        
        userData.profiles = { employee: { employeeId, completed: false } };
        console.log(`✅ Employee profile created: ${employeeId}`);
        break;
      }

      case 'customer': {
        const customerId = `CUST-${userId}`;
        console.log(`📝 Creating customer document: ${customerId}`);
        
        await db.collection('customers').doc(customerId).set({
          customerId,
          ownerId: userId,
          firstName: '',
          lastName: '',
          displayName: 'My Profile',
          email: email,
          phoneNumber: '',
          profileImage: '',
          location: { address: '', city: '', state: '', zipCode: '' },
          contact: { email: email, phone: '' },
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
          createdAt: timestamp,
          updatedAt: timestamp
        });
        
        userData.profiles = { customer: { customerId, completed: false } };
        console.log(`✅ Customer profile created: ${customerId}`);
        break;
      }
    }

    // Save user document
    console.log(`📝 Updating user document: ${userId}`);
    await userRef.set(userData, { merge: true });
    console.log(`✅ User document updated`);
    
    return { success: true };
  } catch (error) {
    console.error('❌ Error:', error.message);
    return { success: false, error };
  }
}

// Main execution
async function main() {
  console.log('🔥 Firebase Profile Creator');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  // REPLACE THESE WITH YOUR ACTUAL VALUES
  // Get your user ID from Firebase Auth Console: https://console.firebase.google.com/project/getworken-b6f27/authentication/users
  
  const TEST_USER_ID = 'WNTHB6MfY8bDmKP6Ok0Uv9EA7zi1'; // ← PUT YOUR USER ID HERE
  const TEST_EMAIL = 'karterley@gmail.com'; // ← PUT YOUR EMAIL HERE
  
  if (TEST_USER_ID === 'YOUR_USER_ID_HERE') {
    console.log('\n⚠️  WARNING: Please edit this file and replace:');
    console.log('   - YOUR_USER_ID_HERE with your actual Firebase Auth user ID');
    console.log('   - your-email@example.com with your actual email\n');
    console.log('💡 Find your user ID:');
    console.log('   1. Go to: https://console.firebase.google.com/project/getworken-b6f27/authentication/users');
    console.log('   2. Click on your user');
    console.log('   3. Copy the "User UID"\n');
    process.exit(1);
  }
  
  console.log(`\n👤 User: ${TEST_EMAIL}`);
  console.log(`🆔 ID: ${TEST_USER_ID}`);
  console.log(`🗄️  Database: getworkenmain\n`);
  
  // Create profiles for all types (uncomment the ones you need)
  await createProfiles(TEST_USER_ID, TEST_EMAIL, 'business');
  await createProfiles(TEST_USER_ID, TEST_EMAIL, 'contractor');
  await createProfiles(TEST_USER_ID, TEST_EMAIL, 'employee');
  await createProfiles(TEST_USER_ID, TEST_EMAIL, 'customer');
  
  console.log('\n✨ Done! Check Firebase Console:');
  console.log('   https://console.firebase.google.com/project/getworken-b6f27/firestore/databases/getworkenmain/data\n');
  
  process.exit(0);
}

main().catch((error) => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});

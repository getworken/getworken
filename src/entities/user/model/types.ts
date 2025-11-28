/**
 * User Entity Type Definitions
 * @module entities/user/model/types
 * 
 * ✅ DIAMOND STANDARD: Domain entity types
 * These types represent the core user data structure in the application
 */

import { UserRole, ProfileType, Timestamps } from '@/shared/types';

/**
 * User profile configuration
 * ✅ DIAMOND STANDARD: Dynamic permissions stored in Firestore
 */
export interface UserProfiles {
  business: {
    active: boolean;
    businessId?: string;
  };
  contractor: {
    active: boolean;
    contractorId?: string;
  };
  employee: {
    active: boolean;
    employeeId?: string;
  };
  customer: {
    active: boolean;
    customerId?: string;
  };
}

/**
 * Core user document structure
 * This matches the Firestore document schema
 */
export interface User extends Timestamps {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  
  /**
   * Static role (stored in Custom Claims)
   * ✅ DIAMOND STANDARD: This is the "free" check in Hybrid RBAC
   */
  role: UserRole;
  
  /**
   * Whether user is a staff member
   */
  staffMember: boolean;
  
  /**
   * Dynamic profile permissions
   * ✅ DIAMOND STANDARD: These are the "costs 1 read" checks in Hybrid RBAC
   */
  profiles: UserProfiles;
  
  /**
   * Current active profile
   */
  activeProfile: ProfileType;
  
  /**
   * Email verification status
   */
  emailVerified: boolean;
  
  /**
   * User preferences
   */
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    language?: string;
    notifications?: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
  };
  
  /**
   * Last login timestamp
   */
  lastLogin?: Date;
  
  /**
   * Account status
   */
  status: 'active' | 'suspended' | 'banned';
}

/**
 * User creation data (subset of User)
 */
export type CreateUserData = Omit<
  User,
  'uid' | 'createdAt' | 'updatedAt' | 'lastLogin'
> & {
  uid: string;
};

/**
 * User update data (partial User)
 */
export type UpdateUserData = Partial<
  Omit<User, 'uid' | 'createdAt' | 'email'>
>;

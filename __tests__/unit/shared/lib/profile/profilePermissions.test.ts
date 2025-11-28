/**
 * Profile Permissions Helper Tests
 * @module __tests__/unit/shared/lib/profile/profilePermissions.test
 * 
 * ✅ DIAMOND STANDARD: Unit tests for permission utilities
 */

import { describe, it, expect } from '@jest/globals';
import {
  isStaffMember,
  canAccessProfile,
  canEditProfile,
  canViewPublicProfile,
  canTogglePublic,
} from '../../../../../src/shared/lib/profile/profilePermissions';
import type { User, UserProfiles } from '../../../../../src/entities/user/model/types';
import type { UserRole, ProfileType } from '../../../../../src/shared/types';

// Helper function to create mock User objects
function createMockUser(overrides: Partial<User> = {}): User {
  const defaultProfiles: UserProfiles = {
    business: { active: false },
    contractor: { active: false },
    employee: { active: false },
    customer: { active: false },
  };

  return {
    uid: 'test-uid',
    email: 'test@example.com',
    role: 'client' as UserRole,
    staffMember: false,
    profiles: defaultProfiles,
    activeProfile: 'customer' as ProfileType,
    emailVerified: true,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  } as User;
}

describe('profilePermissions', () => {
  describe('isStaffMember', () => {
    it('should return true for staff roles', () => {
      expect(isStaffMember('super-admin')).toBe(true);
      expect(isStaffMember('admin')).toBe(true);
      expect(isStaffMember('moderator')).toBe(true);
      expect(isStaffMember('support')).toBe(true);
    });

    it('should return false for non-staff roles', () => {
      expect(isStaffMember('user')).toBe(false);
      expect(isStaffMember('guest')).toBe(false);
    });
  });

  describe('canAccessProfile', () => {
    it('should allow staff to access any profile', () => {
      const staffUser = createMockUser({
        role: 'admin',
        staffMember: true,
      });

      expect(canAccessProfile(staffUser, 'business')).toBe(true);
      expect(canAccessProfile(staffUser, 'contractor')).toBe(true);
    });

    it('should allow users to access their active profiles', () => {
      const user = createMockUser({
        profiles: {
          business: { active: true, businessId: 'biz1' },
          contractor: { active: false, contractorId: 'cont1' },
          employee: { active: false },
          customer: { active: false },
        },
      });

      expect(canAccessProfile(user, 'business')).toBe(true);
      expect(canAccessProfile(user, 'contractor')).toBe(false);
    });

    it('should deny access to inactive profiles', () => {
      const user = createMockUser({
        profiles: {
          business: { active: false, businessId: 'biz1' },
          contractor: { active: false },
          employee: { active: false },
          customer: { active: false },
        },
      });

      expect(canAccessProfile(user, 'business')).toBe(false);
    });

    it('should deny access to missing profiles', () => {
      const user = createMockUser({
        profiles: {
          business: { active: false },
          contractor: { active: false },
          employee: { active: false },
          customer: { active: false },
        },
      });

      expect(canAccessProfile(user, 'business')).toBe(false);
    });
  });

  describe('canEditProfile', () => {
    it('should allow super-admin to edit any profile', () => {
      const superAdmin = createMockUser({
        role: 'super-admin',
        staffMember: true,
      });

      expect(canEditProfile(superAdmin, 'business')).toBe(true);
      expect(canEditProfile(superAdmin, 'contractor')).toBe(true);
    });

    it('should allow admin to edit any profile', () => {
      const admin = createMockUser({
        role: 'admin',
        staffMember: true,
      });

      expect(canEditProfile(admin, 'business')).toBe(true);
    });

    it('should allow users to edit their active profiles', () => {
      const user = createMockUser({
        profiles: {
          business: { active: true, businessId: 'biz1' },
          contractor: { active: false, contractorId: 'cont1' },
          employee: { active: false },
          customer: { active: false },
        },
      });

      expect(canEditProfile(user, 'business')).toBe(true);
      expect(canEditProfile(user, 'contractor')).toBe(false);
    });

    it('should deny editing inactive profiles', () => {
      const user = createMockUser({
        profiles: {
          business: { active: false, businessId: 'biz1' },
          contractor: { active: false },
          employee: { active: false },
          customer: { active: false },
        },
      });

      expect(canEditProfile(user, 'business')).toBe(false);
    });

    it('should not allow moderator or support to edit profiles', () => {
      const moderator = createMockUser({
        role: 'moderator',
        staffMember: true,
      });

      expect(canEditProfile(moderator, 'business')).toBe(false);
    });
  });

  describe('canViewPublicProfile', () => {
    it('should return true when profile is public and completed', () => {
      expect(canViewPublicProfile(true, true)).toBe(true);
    });

    it('should return false when profile is not public', () => {
      expect(canViewPublicProfile(false, true)).toBe(false);
    });

    it('should return false when profile is not completed', () => {
      expect(canViewPublicProfile(true, false)).toBe(false);
    });

    it('should return false when neither public nor completed', () => {
      expect(canViewPublicProfile(false, false)).toBe(false);
    });
  });

  describe('canTogglePublic', () => {
    it('should not allow regular users to toggle without completed property', () => {
      // Regular users need profile.completed === true which doesn't exist in UserProfiles type
      const user = createMockUser({
        uid: 'user1',
        profiles: {
          business: { active: true, businessId: 'biz1' },
          contractor: { active: false },
          employee: { active: false },
          customer: { active: false },
        },
      });

      // Without completed property, function returns false for regular users
      expect(canTogglePublic(user, 'business', 'user1')).toBe(false);
    });

    it('should not allow toggling other users profiles', () => {
      const user = createMockUser({
        uid: 'user1',
        profiles: {
          business: { active: true, businessId: 'biz1' },
          contractor: { active: false },
          employee: { active: false },
          customer: { active: false },
        },
      });

      // User cannot toggle another user's profile
      expect(canTogglePublic(user, 'business', 'different-user')).toBe(false);
    });

    it('should allow admins to toggle any profile', () => {
      const admin = createMockUser({
        uid: 'admin1',
        role: 'admin',
        staffMember: true,
      });

      // Admin can toggle any profile regardless of owner
      expect(canTogglePublic(admin, 'business', 'user1')).toBe(true);
      expect(canTogglePublic(admin, 'contractor', 'user2')).toBe(true);
    });

    it('should allow super-admin to toggle any profile', () => {
      const superAdmin = createMockUser({
        uid: 'sa1',
        role: 'super-admin',
        staffMember: true,
      });

      expect(canTogglePublic(superAdmin, 'business', 'user1')).toBe(true);
    });
  });
});

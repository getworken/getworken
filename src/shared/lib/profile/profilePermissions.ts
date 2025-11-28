/**
 * Profile Permission Helpers
 * @module shared/lib/profile/profilePermissions
 * 
 * ✅ DIAMOND STANDARD: Profile permission checking utilities
 */

import type { UserRole, ProfileType } from '@/shared/types';
import type { User } from '@/entities/user/model/types';

/**
 * Check if user is staff (admin, super-admin, moderator, or support)
 * 
 * @param role - User's role
 * @returns True if user is staff
 * 
 * @example
 * ```ts
 * if (isStaffMember(user.role)) {
 *   // Allow access
 * }
 * ```
 */
export function isStaffMember(role: UserRole): boolean {
  return ['super-admin', 'admin', 'moderator', 'support'].includes(role);
}

/**
 * Check if user can access a specific profile type
 * 
 * @param user - User object
 * @param profileType - Profile type to check
 * @returns True if user can access the profile
 * 
 * @example
 * ```ts
 * if (canAccessProfile(user, 'business')) {
 *   // Show business profile
 * }
 * ```
 */
export function canAccessProfile(user: User, profileType: ProfileType): boolean {
  // Staff can access any profile
  if (isStaffMember(user.role)) {
    return true;
  }
  
  // User can access their own active profiles
  const profile = user.profiles?.[profileType];
  return profile?.active === true;
}

/**
 * Check if user can edit a specific profile type
 * 
 * @param user - User object
 * @param profileType - Profile type to check
 * @returns True if user can edit the profile
 * 
 * @example
 * ```ts
 * if (canEditProfile(user, 'business')) {
 *   // Show edit buttons
 * }
 * ```
 */
export function canEditProfile(user: User, profileType: ProfileType): boolean {
  // Super admins and admins can edit any profile
  if (['super-admin', 'admin'].includes(user.role)) {
    return true;
  }
  
  // User can edit their own active profiles
  const profile = user.profiles?.[profileType];
  return profile?.active === true;
}

/**
 * Check if user can view public profile
 * 
 * @param isPublic - Whether the profile is public
 * @param completed - Whether the profile is completed
 * @returns True if profile can be viewed publicly
 * 
 * @example
 * ```ts
 * if (canViewPublicProfile(profile.isPublic, profile.completed)) {
 *   // Show public profile button
 * }
 * ```
 */
export function canViewPublicProfile(isPublic: boolean, completed: boolean): boolean {
  return isPublic === true && completed === true;
}

/**
 * Check if user can toggle profile public status
 * 
 * @param user - User object
 * @param profileType - Profile type to check
 * @param profileUserId - User ID of the profile owner
 * @returns True if user can toggle public status
 * 
 * @example
 * ```ts
 * if (canTogglePublic(user, 'business', profile.userId)) {
 *   // Show public toggle
 * }
 * ```
 */
export function canTogglePublic(
  user: User,
  profileType: ProfileType,
  profileUserId: string
): boolean {
  // Admins can toggle any profile
  if (['super-admin', 'admin'].includes(user.role)) {
    return true;
  }
  
  // User can toggle their own profile
  if (user.uid === profileUserId) {
    const profile = user.profiles?.[profileType];
    return profile?.active === true;
  }
  
  return false;
}

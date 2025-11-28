/**
 * Profile Helper Utilities
 * @module shared/lib/profile/profileHelpers
 * 
 * ✅ DIAMOND STANDARD: Profile utility functions
 */

import type { ProfileType } from '@/shared/types';

/**
 * Get display name for profile type
 * 
 * @param profileType - Profile type
 * @returns Human-readable profile type name
 * 
 * @example
 * ```ts
 * getProfileTypeName('business') // "Business"
 * ```
 */
export function getProfileTypeName(profileType: ProfileType): string {
  const names: Record<ProfileType, string> = {
    business: 'Business',
    contractor: 'Contractor',
    employee: 'Employee',
    customer: 'Customer',
  };
  return names[profileType];
}

/**
 * Get profile color theme
 * 
 * @param profileType - Profile type
 * @returns Tailwind color class
 * 
 * @example
 * ```ts
 * getProfileColor('business') // "teal"
 * ```
 */
export function getProfileColor(profileType: ProfileType): string {
  const colors: Record<ProfileType, string> = {
    business: 'teal',
    contractor: 'emerald',
    employee: 'blue',
    customer: 'purple',
  };
  return colors[profileType];
}

/**
 * Get full name from profile
 * 
 * @param profile - Profile object with firstName and lastName
 * @returns Full name or display name
 * 
 * @example
 * ```ts
 * getFullName({ firstName: 'John', lastName: 'Doe' }) // "John Doe"
 * ```
 */
export function getFullName(profile: {
  firstName?: string;
  lastName?: string;
  displayName?: string;
}): string {
  if (profile.displayName) {
    return profile.displayName;
  }
  return [profile.firstName, profile.lastName].filter(Boolean).join(' ');
}

/**
 * Format phone number for display
 * 
 * @param phone - Raw phone number
 * @returns Formatted phone number
 * 
 * @example
 * ```ts
 * formatPhoneNumber('1234567890') // "(123) 456-7890"
 * ```
 */
export function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

/**
 * Get profile route path
 * 
 * @param profileType - Profile type
 * @param profileId - Profile ID (optional)
 * @returns Route path
 * 
 * @example
 * ```ts
 * getProfileRoute('business', 'biz_123') // "/profile/business/biz_123"
 * ```
 */
export function getProfileRoute(profileType: ProfileType, profileId?: string): string {
  if (profileId) {
    return `/profile/${profileType}/${profileId}`;
  }
  return `/profile/${profileType}`;
}

/**
 * Check if profile has required data for specific section
 * 
 * @param profile - Profile object
 * @param section - Section name
 * @returns True if section has data
 */
export function hasSectionData(profile: Record<string, any>, section: string): boolean {
  const data = profile[section];
  if (data === undefined || data === null) return false;
  if (Array.isArray(data)) return data.length > 0;
  if (typeof data === 'object') return Object.keys(data).length > 0;
  return true;
}

/**
 * Generate initials from name
 * 
 * @param name - Full name
 * @returns Two-letter initials
 * 
 * @example
 * ```ts
 * getInitials('John Doe') // "JD"
 * ```
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(p => p.length > 0);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return (parts[0]?.[0] || '?').toUpperCase();
  const first = parts[0]?.[0] || '';
  const last = parts[parts.length - 1]?.[0] || '';
  return (first + last).toUpperCase() || '?';
}

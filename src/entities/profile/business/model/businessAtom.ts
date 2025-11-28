/**
 * Business Profile State
 * @module entities/profile/business/model/businessAtom
 * 
 * ✅ DIAMOND STANDARD: Business-specific state management with Jotai
 */

import { atom } from 'jotai';
import type { BusinessProfile } from '@/entities/profile/model/types';

/**
 * Current business profile atom
 */
export const businessProfileAtom = atom<BusinessProfile | null>(null);

/**
 * Business profile list atom
 */
export const businessProfileListAtom = atom<BusinessProfile[]>([]);

/**
 * Business profile loading state
 */
export const businessProfileLoadingAtom = atom<boolean>(false);

/**
 * Business profile error state
 */
export const businessProfileErrorAtom = atom<string | null>(null);

/**
 * Business profile search query
 */
export const businessSearchQueryAtom = atom<string>('');

/**
 * Filtered business profiles (derived atom)
 */
export const filteredBusinessProfilesAtom = atom((get) => {
  const profiles = get(businessProfileListAtom);
  const query = get(businessSearchQueryAtom).toLowerCase();
  
  if (!query) return profiles;
  
  return profiles.filter(
    (profile) =>
      profile.displayName?.toLowerCase().includes(query) ||
      profile.email?.toLowerCase().includes(query) ||
      profile.phone?.toLowerCase().includes(query)
  );
});

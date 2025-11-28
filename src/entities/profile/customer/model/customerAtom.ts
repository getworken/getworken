/**
 * Customer Profile State
 * @module entities/profile/customer/model/customerAtom
 * 
 * ✅ DIAMOND STANDARD: Customer-specific state management with Jotai
 */

import { atom } from 'jotai';
import type { CustomerProfile } from '@/entities/profile/model/types';

/**
 * Current customer profile atom
 */
export const customerProfileAtom = atom<CustomerProfile | null>(null);

/**
 * Customer profile list atom
 */
export const customerProfileListAtom = atom<CustomerProfile[]>([]);

/**
 * Customer profile loading state
 */
export const customerProfileLoadingAtom = atom<boolean>(false);

/**
 * Customer profile error state
 */
export const customerProfileErrorAtom = atom<string | null>(null);

/**
 * Customer profile search query
 */
export const customerSearchQueryAtom = atom<string>('');

/**
 * Filtered customer profiles (derived atom)
 */
export const filteredCustomerProfilesAtom = atom((get) => {
  const profiles = get(customerProfileListAtom);
  const query = get(customerSearchQueryAtom).toLowerCase();
  
  if (!query) return profiles;
  
  return profiles.filter(
    (profile) =>
      profile.displayName?.toLowerCase().includes(query) ||
      profile.email?.toLowerCase().includes(query)
  );
});

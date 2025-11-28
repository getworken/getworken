/**
 * Contractor Profile State
 * @module entities/profile/contractor/model/contractorAtom
 * 
 * ✅ DIAMOND STANDARD: Contractor-specific state management with Jotai
 */

import { atom } from 'jotai';
import type { ContractorProfile } from '@/entities/profile/model/types';

/**
 * Current contractor profile atom
 */
export const contractorProfileAtom = atom<ContractorProfile | null>(null);

/**
 * Contractor profile list atom
 */
export const contractorProfileListAtom = atom<ContractorProfile[]>([]);

/**
 * Contractor profile loading state
 */
export const contractorProfileLoadingAtom = atom<boolean>(false);

/**
 * Contractor profile error state
 */
export const contractorProfileErrorAtom = atom<string | null>(null);

/**
 * Contractor profile search query
 */
export const contractorSearchQueryAtom = atom<string>('');

/**
 * Filtered contractor profiles (derived atom)
 */
export const filteredContractorProfilesAtom = atom((get) => {
  const profiles = get(contractorProfileListAtom);
  const query = get(contractorSearchQueryAtom).toLowerCase();
  
  if (!query) return profiles;
  
  return profiles.filter(
    (profile) =>
      profile.displayName?.toLowerCase().includes(query) ||
      profile.email?.toLowerCase().includes(query) ||
      profile.specialties?.some((s) => s.toLowerCase().includes(query))
  );
});

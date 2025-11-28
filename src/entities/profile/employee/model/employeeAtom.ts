/**
 * Employee Profile State
 * @module entities/profile/employee/model/employeeAtom
 * 
 * ✅ DIAMOND STANDARD: Employee-specific state management with Jotai
 */

import { atom } from 'jotai';
import type { EmployeeProfile } from '@/entities/profile/model/types';

/**
 * Current employee profile atom
 */
export const employeeProfileAtom = atom<EmployeeProfile | null>(null);

/**
 * Employee profile list atom
 */
export const employeeProfileListAtom = atom<EmployeeProfile[]>([]);

/**
 * Employee profile loading state
 */
export const employeeProfileLoadingAtom = atom<boolean>(false);

/**
 * Employee profile error state
 */
export const employeeProfileErrorAtom = atom<string | null>(null);

/**
 * Employee profile search query
 */
export const employeeSearchQueryAtom = atom<string>('');

/**
 * Filtered employee profiles (derived atom)
 */
export const filteredEmployeeProfilesAtom = atom((get) => {
  const profiles = get(employeeProfileListAtom);
  const query = get(employeeSearchQueryAtom).toLowerCase();
  
  if (!query) return profiles;
  
  return profiles.filter(
    (profile) =>
      profile.displayName?.toLowerCase().includes(query) ||
      profile.email?.toLowerCase().includes(query) ||
      profile.position?.toLowerCase().includes(query)
  );
});

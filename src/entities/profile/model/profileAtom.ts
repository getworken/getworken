/**
 * Profile State Management (Jotai Atoms)
 * @module entities/profile/model/profileAtom
 * 
 * ✅ DIAMOND STANDARD: Global state management for profiles
 */

import { atom } from 'jotai';
import type { ProfileType } from '@/shared/types';

/**
 * Active profile type atom
 * Tracks which profile type is currently selected
 */
export const activeProfileAtom = atom<ProfileType>('customer');

/**
 * Profile loading state atom
 * Tracks if profile data is being fetched
 */
export const profileLoadingAtom = atom<boolean>(false);

/**
 * Profile error state atom
 * Stores any error messages from profile operations
 */
export const profileErrorAtom = atom<string | null>(null);

/**
 * Profile data refresh trigger atom
 * Increment to trigger a refetch of profile data
 */
export const profileRefreshAtom = atom<number>(0);

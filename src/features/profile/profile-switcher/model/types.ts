/**
 * Profile Switcher Types
 * @module features/profile/profile-switcher/model/types
 * 
 * ✅ DIAMOND STANDARD: Feature-level types
 */

import { ProfileType } from '@/shared/types';

/**
 * Profile configuration for a single profile type
 */
export interface ProfileConfig {
  type: ProfileType;
  label: string;
  setupLabel: string;
  variant: 'profile-business' | 'profile-contractor' | 'profile-employee' | 'profile-customer';
  active: boolean;
  profileId?: string;
}

/**
 * Profile switcher state
 */
export interface ProfileSwitcherState {
  activeProfile: ProfileType;
  profiles: Record<ProfileType, ProfileConfig>;
  isLoading: boolean;
}

/**
 * Profile switch action
 */
export interface ProfileSwitchAction {
  profileType: ProfileType;
  profileId?: string;
}

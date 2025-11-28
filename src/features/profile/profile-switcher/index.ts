/**
 * Profile Switcher Feature - Public API
 * @module features/profile/profile-switcher
 * 
 * ✅ DIAMOND STANDARD: Feature layer public API
 * 
 * This feature allows users to switch between their different profile types:
 * - Business
 * - Contractor
 * - Employee
 * - Customer
 * 
 * @example
 * ```tsx
 * import { ProfileSwitcher } from '@/features/profile/profile-switcher';
 * 
 * function MyComponent() {
 *   const { user } = useAuth();
 *   
 *   const handleSwitch = async (profileType: ProfileType) => {
 *     await updateActiveProfile(profileType);
 *   };
 *   
 *   return (
 *     <ProfileSwitcher
 *       activeProfile={user.activeProfile}
 *       profiles={user.profiles}
 *       onProfileSwitch={handleSwitch}
 *     />
 *   );
 * }
 * ```
 */

export { ProfileSwitcher, type ProfileSwitcherProps } from './ui/ProfileSwitcher';
export type {
  ProfileConfig,
  ProfileSwitcherState,
  ProfileSwitchAction,
} from './model/types';

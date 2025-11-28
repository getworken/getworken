/**
 * Profile Switcher Feature
 * @module features/profile/profile-switcher
 *
 * ✅ DIAMOND STANDARD: Feature layer component
 * Allows users to switch between different profile types (business, contractor, employee, customer)
 *
 * @example
 * ```tsx
 * <ProfileSwitcher
 *   activeProfile="business"
 *   profiles={userProfiles}
 *   onProfileSwitch={handleSwitch}
 * />
 * ```
 */

'use client';

import { Button } from '@/shared/ui';
import { ProfileType } from '@/shared/types';
import { UserProfiles } from '@/entities/user/model/types';

export interface ProfileSwitcherProps {
  /**
   * Currently active profile
   */
  activeProfile: ProfileType;

  /**
   * User's profile configuration from Firestore
   */
  profiles: UserProfiles;

  /**
   * Callback when user switches profile
   */
  onProfileSwitch: (profileType: ProfileType) => Promise<void>;

  /**
   * Loading state (e.g., during profile switch)
   */
  isLoading?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Profile button configuration
 */
const PROFILE_CONFIGS = {
  business: {
    label: 'Business',
    setupLabel: 'Set up Business Profile',
    variant: 'outline' as const,
  },
  contractor: {
    label: 'Contractor',
    setupLabel: 'Set up Contractor Profile',
    variant: 'outline' as const,
  },
  employee: {
    label: 'Employee',
    setupLabel: 'Set up Employee Profile',
    variant: 'outline' as const,
  },
  customer: {
    label: 'Customer',
    setupLabel: 'Set up Customer Profile',
    variant: 'outline' as const,
  },
} as const;

/**
 * ProfileSwitcher Component
 *
 * Displays buttons for each profile type with visual indicators:
 * - Selected: Bright profile color (teal, emerald, blue, purple)
 * - Active (not selected): Gray with green border
 * - Inactive (not set up): Gray with yellow border, dimmed
 */
export function ProfileSwitcher({
  activeProfile,
  profiles,
  onProfileSwitch,
  isLoading = false,
  className = '',
}: ProfileSwitcherProps) {
  const handleProfileClick = async (profileType: ProfileType) => {
    // Don't switch if clicking the already active profile
    if (profileType === activeProfile) return;

    // Don't allow switching to inactive profiles
    if (!profiles[profileType].active) return;

    await onProfileSwitch(profileType);
  };

  return (
    <div
      className={`flex flex-col gap-3 ${className}`}
      role="group"
      aria-label="Profile Switcher"
    >
      <div className="mb-1 text-sm font-medium text-slate-300">
        Active Profile
      </div>

      <div className="flex flex-col gap-2">
        {(Object.keys(PROFILE_CONFIGS) as ProfileType[]).map((profileType) => {
          const config =
            PROFILE_CONFIGS[profileType as keyof typeof PROFILE_CONFIGS];
          const profileData = profiles[profileType];
          const isSelected = profileType === activeProfile;
          const isActive = profileData.active;
          const isInactive = !profileData.active;

          return (
            <Button
              key={profileType}
              variant={config.variant}
              onClick={() => handleProfileClick(profileType)}
              disabled={isLoading || isInactive}
              className={`w-full justify-start text-left ${isSelected ? 'border-primary' : ''} ${isInactive ? 'opacity-50' : ''}`}
              aria-current={isSelected ? 'true' : undefined}
              aria-label={
                isInactive
                  ? `${config.label} profile not set up`
                  : isSelected
                    ? `${config.label} profile (currently active)`
                    : `Switch to ${config.label} profile`
              }
            >
              <span className="flex items-center gap-2">
                {isSelected && (
                  <span className="text-xs" aria-hidden="true">
                    ●
                  </span>
                )}
                <span>{isInactive ? config.setupLabel : config.label}</span>
                {isActive && !isSelected && (
                  <span
                    className="ml-auto text-xs text-green-400"
                    aria-label="Active"
                  >
                    ✓
                  </span>
                )}
                {isInactive && (
                  <span
                    className="ml-auto text-xs text-yellow-400"
                    aria-label="Inactive"
                  >
                    ⚠
                  </span>
                )}
              </span>
            </Button>
          );
        })}
      </div>

      {isLoading && (
        <div className="mt-2 text-center text-xs text-slate-400" role="status">
          Switching profile...
        </div>
      )}
    </div>
  );
}

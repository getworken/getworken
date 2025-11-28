/**
 * ProfileBadge Component
 * @module entities/profile/ui/ProfileBadge
 * 
 * ✅ DIAMOND STANDARD: Profile type badge indicator
 */

'use client';

import type { ProfileType } from '@/shared/types';
import { getProfileTypeName, getProfileColor } from '@/shared/lib/profile/profileHelpers';

interface ProfileBadgeProps {
  /**
   * Profile type
   */
  type: ProfileType;
  /**
   * Badge size
   */
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5',
};

/**
 * Profile type badge component
 * 
 * @example
 * ```tsx
 * <ProfileBadge type="business" size="md" />
 * ```
 */
export function ProfileBadge({ type, size = 'md' }: ProfileBadgeProps) {
  const color = getProfileColor(type);
  const name = getProfileTypeName(type);

  return (
    <span
      className={`
        inline-flex items-center rounded-full font-medium
        ${sizeClasses[size]}
        bg-${color}-100 text-${color}-800
      `}
    >
      {name}
    </span>
  );
}

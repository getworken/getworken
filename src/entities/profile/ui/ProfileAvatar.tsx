/**
 * ProfileAvatar Component
 * @module entities/profile/ui/ProfileAvatar
 * 
 * ✅ DIAMOND STANDARD: Profile avatar with fallback
 */

'use client';

import Image from 'next/image';
import { getInitials } from '@/shared/lib/profile/profileHelpers';

interface ProfileAvatarProps {
  /**
   * Profile name for fallback
   */
  name: string;
  /**
   * Avatar image URL
   */
  imageUrl?: string;
  /**
   * Avatar size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Avatar shape
   */
  shape?: 'circle' | 'square';
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-16 w-16 text-base',
  xl: 'h-24 w-24 text-xl',
};

/**
 * Profile avatar component with initials fallback
 * 
 * @example
 * ```tsx
 * <ProfileAvatar
 *   name="John Doe"
 *   imageUrl="/avatar.jpg"
 *   size="lg"
 *   shape="circle"
 * />
 * ```
 */
export function ProfileAvatar({ name, imageUrl, size = 'md', shape = 'circle' }: ProfileAvatarProps) {
  const initials = getInitials(name);

  if (imageUrl) {
    return (
      <div className={`${sizeClasses[size]} relative overflow-hidden ${shape === 'circle' ? 'rounded-full' : 'rounded-lg'}`}>
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`
        ${sizeClasses[size]} flex items-center justify-center
        bg-teal-100 font-semibold text-teal-700
        ${shape === 'circle' ? 'rounded-full' : 'rounded-lg'}
      `}
    >
      {initials}
    </div>
  );
}

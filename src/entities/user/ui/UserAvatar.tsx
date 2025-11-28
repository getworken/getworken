/**
 * UserAvatar Component
 * @module entities/user/ui/UserAvatar
 * 
 * ✅ DIAMOND STANDARD: Entity UI Component
 * - Part of the 'user' entity in the FSD entities layer
 * - Displays user avatar with initials fallback
 * - WCAG 2.2 compliant with semantic HTML
 * - Fully documented with TSDoc
 * 
 * @see {@link file://src/entities/user/ui/UserAvatar.stories.tsx}
 */

import { type FC } from 'react';

/**
 * Props for the UserAvatar component
 */
export interface UserAvatarProps {
  /**
   * User's display name (used for generating initials)
   */
  displayName?: string;
  
  /**
   * User's email (fallback for generating initials)
   */
  email?: string;
  
  /**
   * URL to the user's profile photo
   */
  photoURL?: string;
  
  /**
   * Size variant of the avatar
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Size mapping for avatar dimensions
 */
const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
} as const;

/**
 * Extracts initials from user data
 * Priority: displayName > email > fallback 'U'
 * 
 * @param displayName - User's display name
 * @param email - User's email address
 * @returns Single uppercase initial character
 * 
 * @example
 * getInitial('John Doe') // 'J'
 * getInitial(undefined, 'jane@example.com') // 'J'
 * getInitial() // 'U'
 */
function getInitial(displayName?: string, email?: string): string {
  if (displayName && displayName.length > 0) {
    return displayName.charAt(0).toUpperCase();
  }
  if (email && email.length > 0) {
    return email.charAt(0).toUpperCase();
  }
  return 'U';
}

/**
 * UserAvatar Component
 * 
 * Displays a user's avatar with fallback to initials.
 * Part of the user entity UI components.
 * 
 * @param props - UserAvatar props
 * @returns React component
 * 
 * @example
 * ```tsx
 * <UserAvatar 
 *   displayName="John Doe" 
 *   email="john@example.com"
 *   photoURL="/avatars/john.jpg"
 *   size="md"
 * />
 * ```
 * 
 * @example
 * ```tsx
 * // Without photo - shows initials
 * <UserAvatar 
 *   displayName="Jane Smith"
 *   size="lg"
 * />
 * ```
 */
export const UserAvatar: FC<UserAvatarProps> = ({
  displayName,
  email,
  photoURL,
  size = 'md',
  className = '',
}) => {
  const initial = getInitial(displayName, email);
  const sizeClass = sizeClasses[size];

  if (photoURL) {
    return (
      <img
        src={photoURL}
        alt={displayName || email || 'User avatar'}
        className={`${sizeClass} rounded-full object-cover flex-shrink-0 ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 ${className}`}
      aria-label={`${displayName || email || 'User'} avatar`}
      role="img"
    >
      <span className="text-white font-bold" aria-hidden="true">
        {initial}
      </span>
    </div>
  );
};

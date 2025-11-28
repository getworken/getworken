/**
 * Dashboard Navigation Hook
 * @module widgets/dashboard-navigation/model/useNavigationItems
 * 
 * ✅ DIAMOND STANDARD: Widget layer business logic
 * 
 * Manages navigation item visibility based on:
 * - User role (from Custom Claims)
 * - User profiles (from Firestore)
 * - Firebase configuration
 */

'use client';

import { useMemo } from 'react';
import { useAuth } from '@/app/_providers/AuthProvider';
import { NavItem, NavVisibilityConfig } from './types';

/**
 * Base navigation items configuration
 * Following Diamond Standard - tabs are client-side state, not routes
 * URL stays as /dashboard for all tabs
 */
const BASE_NAV_ITEMS: NavItem[] = [
  {
    id: 'overview',
    labelKey: 'overview',
    iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
  {
    id: 'profile',
    labelKey: 'profile',
    iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  },
  {
    id: 'directory',
    labelKey: 'directory',
    iconPath: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  },
  {
    id: 'team',
    labelKey: 'team',
    iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    // Visible to all roles - removed business:active requirement
  },
  {
    id: 'chat',
    labelKey: 'chat',
    iconPath: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  },
];

/**
 * Hook to get navigation items with Firebase-based visibility
 * 
 * @returns Navigation visibility configuration
 * 
 * @example
 * ```tsx
 * function MyNav() {
 *   const { visibleItems, isLoading } = useNavigationItems();
 *   
 *   if (isLoading) return <div>Loading...</div>;
 *   
 *   return (
 *     <nav>
 *       {visibleItems.map(item => (
 *         <NavLink key={item.id} {...item} />
 *       ))}
 *     </nav>
 *   );
 * }
 * ```
 */
export function useNavigationItems(): NavVisibilityConfig {
  const { user, userData, loading } = useAuth();

  const visibleItems = useMemo(() => {
    // If still loading, show all items to prevent flickering
    // They'll be filtered once userData loads
    if (loading) {
      return BASE_NAV_ITEMS;
    }

    // If not authenticated or no user data, show only items without permissions
    if (!userData || !user) {
      return BASE_NAV_ITEMS.filter(item => !item.requiredPermissions);
    }

    return BASE_NAV_ITEMS.filter((item) => {
      // No permissions required - always visible
      if (!item.requiredPermissions || item.requiredPermissions.length === 0) {
        return true;
      }

      // Check permissions
      return item.requiredPermissions.every((permission) => {
        const [profile, requirement] = permission.split(':');
        
        // Handle profile:active permission
        if (requirement === 'active') {
          return userData.profiles?.[profile as keyof typeof userData.profiles]?.active === true;
        }
        
        // Handle role-based permissions
        if (profile === 'role') {
          return userData.role === requirement;
        }
        
        return false;
      });
    });
  }, [userData, user, loading]);

  return {
    isLoading: loading,
    visibleItems,
  };
}

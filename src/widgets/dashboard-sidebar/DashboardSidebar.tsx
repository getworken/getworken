/**
 * Dashboard Sidebar Widget
 * @module widgets/dashboard-sidebar
 * 
 * ✅ DIAMOND STANDARD: Widget Layer Component
 * - Part of the FSD widgets layer - composite UI block
 * - Composes DashboardNavigation widget and ProfileSwitcher feature
 * - Provides sidebar layout for authenticated dashboard
 * - Integrates next-intl for i18n
 * - WCAG 2.2 compliant with semantic HTML and ARIA
 * - Fully documented with TSDoc
 * 
 * @see {@link file://src/widgets/dashboard-sidebar/DashboardSidebar.stories.tsx}
 */

'use client';

import { type FC, type ReactNode } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { UserAvatar } from '@/entities/user';
import { LogoutButton } from '@/features/auth/logout-button';
import { useAuth } from '@/app/_providers/AuthProvider';

/**
 * Props for the DashboardSidebar component
 */
export interface DashboardSidebarProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Navigation widget to render (ClientNavigation, AdminNavigation, etc.)
   * If not provided, sidebar will only show logo and user menu
   */
  children?: ReactNode;
  
  /**
   * Callback when account menu opens
   */
  onAccountMenuOpen?: () => void;
  
  /**
   * Callback when account menu closes
   */
  onAccountMenuClose?: () => void;
}

/**
 * DashboardSidebar Component
 * 
 * Provides reusable persistent sidebar for authenticated dashboard.
 * Accepts role-specific navigation widget as children.
 * Includes branding and account menu with logout.
 * 
 * Following Diamond Standard - Reusable layout component:
 * - Pass ClientNavigation for client users
 * - Pass AdminNavigation for admin users
 * - Pass ModeratorNavigation for moderators, etc.
 * 
 * @param props - DashboardSidebar props
 * @returns React component
 * 
 * @example
 * ```tsx
 * // Client dashboard
 * <DashboardSidebar>
 *   <ClientNavigation />
 * </DashboardSidebar>
 * ```
 * 
 * @example
 * ```tsx
 * // Admin dashboard
 * <DashboardSidebar>
 *   <AdminNavigation />
 * </DashboardSidebar>
 * ```
 */
export const DashboardSidebar: FC<DashboardSidebarProps> = ({
  className = '',
  children,
  onAccountMenuOpen,
  onAccountMenuClose,
}) => {
  const t = useTranslations('dashboard');
  const tCommon = useTranslations('common');
  const tAuth = useTranslations('auth');
  const { user, userData } = useAuth();

  /**
   * Gets display name for the user
   */
  const getDisplayName = (): string => {
    if (userData?.displayName) return userData.displayName;
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0] || 'User';
    return 'User';
  };

  return (
    <aside
      className={`w-64 bg-slate-900 shadow-xl fixed left-0 top-0 h-screen flex flex-col z-40 ${className}`}
      aria-label="Dashboard navigation"
    >
      {/* Logo and Header */}
      <div className="px-8 py-6 border-b border-slate-700 flex-shrink-0">
        <h1 className="text-3xl font-bold text-teal-400">
          {tCommon('appName')}
        </h1>
        <p className="text-slate-400 mt-1">{t('clientDashboard')}</p>
      </div>

      {/* Navigation Links - Role-specific navigation widget passed as children */}
      {children && (
        <div className="flex-1 overflow-y-auto pt-4">
          {children}
        </div>
      )}

      {/* Account Menu Footer */}
      <div className={`p-4 border-t border-slate-700 flex-shrink-0 ${!children ? 'mt-auto' : ''}`}>
        <details
          className="group"
          onToggle={(e) => {
            const details = e.currentTarget as HTMLDetailsElement;
            if (details.open) {
              onAccountMenuOpen?.();
            } else {
              onAccountMenuClose?.();
            }
          }}
        >
          <summary className="list-none cursor-pointer">
            <div className="w-full flex items-center space-x-3 p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <UserAvatar
                {...(userData?.displayName && { displayName: userData.displayName })}
                {...(user?.displayName && !userData?.displayName && { displayName: user.displayName })}
                {...(user?.email && { email: user.email })}
                {...(userData?.photoURL && { photoURL: userData.photoURL })}
                {...(user?.photoURL && !userData?.photoURL && { photoURL: user.photoURL })}
                size="md"
              />
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-white truncate">
                  {getDisplayName()}
                </p>
              </div>
              <svg
                className="w-4 h-4 text-slate-400 transition-transform group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </summary>

          {/* Account Menu Dropdown */}
          <div className="mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden">
            <Link
              href="/dashboard/settings"
              className="w-full px-4 py-3 text-left text-white hover:bg-slate-700 flex items-center space-x-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{t('accountSettings')}</span>
            </Link>
            
            <div className="border-t border-slate-700">
              <LogoutButton variant="danger">
                {tAuth('signOut')}
              </LogoutButton>
            </div>
          </div>
        </details>
      </div>
    </aside>
  );
};

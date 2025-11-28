/**
 * Client Navigation Widget
 * @module widgets/client-navigation
 * 
 * ✅ DIAMOND STANDARD: Widget Layer Component
 * - Role-specific navigation for client users
 * - Part of the FSD widgets layer - composite UI block
 * - Provides navigation with Firebase-based visibility
 * - Integrates next-intl for i18n
 * - Tab-based navigation (no URL changes)
 * - WCAG 2.2 compliant with semantic HTML and ARIA
 * 
 * @example
 * ```tsx
 * <ClientNavigation className="flex-1" />
 * ```
 */

'use client';

import { type FC } from 'react';
import { useTranslations } from 'next-intl';
import { useNavigationItems } from '../model/useNavigationItems';
import { useDashboard } from '@/widgets/dashboard-layout';

/**
 * Props for the ClientNavigation component
 */
export interface ClientNavigationProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Currently active tab ID
   */
  activeTab?: string;
  /**
   * Callback when a tab is clicked
   */
  onTabChange?: (tabId: string) => void;
}

/**
 * ClientNavigation Component
 * 
 * Provides tab navigation for client role users with Firebase-based visibility control.
 * Navigation items are filtered based on user permissions and profiles.
 * Uses client-side state for tab switching - URL stays as /dashboard
 * 
 * @param props - ClientNavigation props
 * @returns React component
 * 
 * @example
 * ```tsx
 * const [activeTab, setActiveTab] = useState('overview');
 * <ClientNavigation activeTab={activeTab} onTabChange={setActiveTab} />
 * ```
 * 
 * @example
 * ```tsx
 * <ClientNavigation className="flex-1 p-4" />
 * ```
 */
export const ClientNavigation: FC<ClientNavigationProps> = ({
  className = '',
  activeTab: activeTabProp,
  onTabChange,
}) => {
  const t = useTranslations('dashboard');
  const { visibleItems, isLoading } = useNavigationItems();
  const { activeTab: contextActiveTab, setActiveTab } = useDashboard();
  
  // Use prop if provided, otherwise use context
  const activeTab = activeTabProp ?? contextActiveTab;
  const handleTabClick = onTabChange ?? setActiveTab;

  // Render navigation even while loading to prevent blank state
  return (
    <nav
      className={`p-4 space-y-1 ${className}`}
      aria-label="Dashboard sections"
      role="tablist"
      {...(isLoading && { 'aria-busy': 'true' })}
    >
      {visibleItems.map((item) => {
        const active = activeTab === item.id;
        
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            {...(active && { 'aria-selected': 'true' })}
            {...(!active && { 'aria-selected': 'false' })}
            onClick={() => handleTabClick(item.id as any)}
            className={`
              w-full flex items-center space-x-3 px-4 py-3 rounded-lg
              transition-all duration-200 text-sm font-medium text-left
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900
              ${
                active
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }
            `}
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={item.iconPath}
              />
            </svg>
            <span>{t(item.labelKey)}</span>
          </button>
        );
      })}
    </nav>
  );
};

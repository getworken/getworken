/**
 * Dashboard Layout Widget
 * @module widgets/dashboard-layout
 * 
 * ✅ DIAMOND STANDARD: Widget Layer Component
 * - Part of the FSD widgets layer - composite layout component
 * - Provides the main dashboard layout structure (sidebar + content area)
 * - Composes DashboardSidebar widget with main content area
 * - Client-side component for interactivity
 * - WCAG 2.2 compliant with semantic HTML and ARIA landmarks
 * - Fully documented with TSDoc
 * 
 * **Note:** This component does NOT handle authentication.
 * Authentication is handled by:
 * - middleware.ts (checks session cookie)
 * - app/[locale]/(authed)/layout.tsx (server-side auth check)
 * 
 * This component only provides the visual layout structure.
 * 
 * @see {@link file://src/widgets/dashboard-layout/DashboardLayout.stories.tsx}
 */

'use client';

import { type FC, type ReactNode } from 'react';
import { DashboardSidebar } from '@/widgets/dashboard-sidebar';
import { DashboardProvider } from './model/DashboardContext';

/**
 * Props for the DashboardLayout component
 */
export interface DashboardLayoutProps {
  /**
   * Page content to render in the main area
   */
  children: ReactNode;
  
  /**
   * Role-specific navigation widget to render in sidebar
   * (ClientNavigation, AdminNavigation, etc.)
   */
  navigation?: ReactNode;
  
  /**
   * Additional CSS classes for the container
   */
  className?: string;
}

/**
 * DashboardLayout Component
 * 
 * Provides reusable layout structure for dashboard pages (sidebar + content area).
 * 
 * **Important:** This component does NOT handle authentication!
 * - Authentication is already handled by middleware.ts and server layout
 * - This component only provides the visual layout
 * 
 * **Reusable Design:**
 * - Pass role-specific navigation widget via `navigation` prop
 * - For client users: pass ClientNavigation
 * - For admin users: pass AdminNavigation
 * - For moderators: pass ModeratorNavigation, etc.
 * 
 * Following Diamond Standard:
 * - This is a widget (composite UI block) in the FSD architecture
 * - It composes other widgets (DashboardSidebar) and provides layout structure
 * - Used by the app/(authed)/layout.tsx routing stub
 * 
 * @param props - DashboardLayout props
 * @returns React component
 * 
 * @example
 * ```tsx
 * // Client dashboard
 * import { ClientNavigation } from '@/widgets/client-navigation';
 * 
 * <DashboardLayout navigation={<ClientNavigation />}>
 *   <ClientDashboardPage />
 * </DashboardLayout>
 * ```
 * 
 * @example
 * ```tsx
 * // Admin dashboard
 * import { AdminNavigation } from '@/widgets/admin-navigation';
 * 
 * <DashboardLayout navigation={<AdminNavigation />}>
 *   <AdminDashboardPage />
 * </DashboardLayout>
 * ```
 */
export const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
  navigation,
  className = '',
}) => {
  return (
    <DashboardProvider>
      <div className={`dashboard-container h-screen bg-slate-800 flex overflow-hidden ${className}`}>
        {/* Persistent Sidebar with Role-Specific Navigation */}
        <DashboardSidebar>
          {navigation}
        </DashboardSidebar>

        {/* Main Content Area */}
        <main 
          className="flex-1 ml-64 flex flex-col overflow-hidden"
          role="main"
          aria-label="Dashboard content"
        >
          {children}
        </main>
      </div>
    </DashboardProvider>
  );
};

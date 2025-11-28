/**
 * Client Navigation Widget - Public API
 * @module widgets/client-navigation
 * 
 * ✅ DIAMOND STANDARD: Widget layer public API
 * 
 * Provides navigation tabs for client role users.
 * Role-specific navigation - other roles will have their own navigation widgets
 * (AdminNavigation, ModeratorNavigation, etc.)
 * 
 * Navigation items are filtered based on user permissions and active profiles.
 * 
 * @example
 * ```tsx
 * import { ClientNavigation } from '@/widgets/client-navigation';
 * 
 * function ClientDashboard() {
 *   return (
 *     <DashboardLayout>
 *       <ClientNavigation className="flex-1" />
 *     </DashboardLayout>
 *   );
 * }
 * ```
 */

export {
  ClientNavigation,
  type ClientNavigationProps,
} from './ui/ClientNavigation';

export { useNavigationItems } from './model/useNavigationItems';

export type { NavItem, NavVisibilityConfig } from './model/types';

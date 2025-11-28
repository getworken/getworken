/**
 * Dashboard Navigation Types
 * @module widgets/dashboard-navigation/model/types
 * 
 * ✅ DIAMOND STANDARD: Widget layer types
 */

/**
 * Navigation item configuration
 * Following Diamond Standard - tabs are client-side state, href is optional
 */
export interface NavItem {
  /** Unique identifier for the nav item */
  id: string;
  /** i18n translation key */
  labelKey: string;
  /** Route path (optional - if not provided, navigation is state-based) */
  href?: string;
  /** SVG icon path data */
  iconPath: string;
  /** Whether this item requires specific permissions */
  requiredPermissions?: string[];
  /** Minimum role required to see this item */
  minRole?: string;
}

/**
 * Navigation visibility configuration from Firebase
 */
export interface NavVisibilityConfig {
  /** Whether navigation is loading */
  isLoading: boolean;
  /** Filtered navigation items based on permissions */
  visibleItems: NavItem[];
  /** Error if failed to load config */
  error?: string;
}

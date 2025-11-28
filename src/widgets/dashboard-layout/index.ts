/**
 * Dashboard Layout Widget Public API
 * @module widgets/dashboard-layout
 * 
 * ✅ DIAMOND STANDARD: Widget public API
 * Following FSD principles - widgets export their public interface through index.ts
 * 
 * This layout is used by the app router for authenticated routes:
 * @see {@link file://app/[locale]/(authed)/layout.tsx}
 * @see {@link file://DIAMOND_STANDARD_REFERENCE.md}
 */

export { DashboardLayout, type DashboardLayoutProps } from './DashboardLayout';
export { DashboardProvider, useDashboard, type DashboardTab } from './model/DashboardContext';

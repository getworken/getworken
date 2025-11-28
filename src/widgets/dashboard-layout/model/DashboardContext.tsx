/**
 * Dashboard Context
 * @module widgets/dashboard-layout/model/DashboardContext
 * 
 * ✅ DIAMOND STANDARD: Widget layer state management
 * Manages dashboard tab state across the layout
 * Following Diamond Standard - URL stays as /dashboard, tabs are client-side state
 */

'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

/**
 * Dashboard tab IDs
 */
export type DashboardTab = 'overview' | 'profile' | 'directory' | 'team' | 'chat';

/**
 * Dashboard context value
 */
interface DashboardContextValue {
  /** Currently active tab */
  activeTab: DashboardTab;
  /** Function to change active tab */
  setActiveTab: (tab: DashboardTab) => void;
}

/**
 * Dashboard context
 */
const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

/**
 * Props for DashboardProvider
 */
interface DashboardProviderProps {
  children: ReactNode;
}

/**
 * Dashboard Provider Component
 * Provides tab state to the dashboard layout and navigation
 * 
 * @param props - Provider props
 * @returns React component
 * 
 * @example
 * ```tsx
 * <DashboardProvider>
 *   <DashboardLayout>
 *     <DashboardPage />
 *   </DashboardLayout>
 * </DashboardProvider>
 * ```
 */
export function DashboardProvider({ children }: DashboardProviderProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');

  return (
    <DashboardContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </DashboardContext.Provider>
  );
}

/**
 * Hook to use dashboard context
 * 
 * @returns Dashboard context value
 * @throws Error if used outside DashboardProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { activeTab, setActiveTab } = useDashboard();
 *   return <button onClick={() => setActiveTab('profile')}>Profile</button>;
 * }
 * ```
 */
export function useDashboard(): DashboardContextValue {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}

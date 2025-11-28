/**
 * ProfileTabLayout Component
 * @module widgets/profile/ProfileTabLayout
 * 
 * ✅ DIAMOND STANDARD: Main tab layout wrapper for profile types
 * 
 * Provides a responsive tab interface for switching between different profile types
 * (Business, Contractor, Employee, Customer) with active state management.
 */

'use client';

import React from 'react';
import type { ProfileType } from '@/shared/types';
import { ProfileBadge } from '@/entities/profile/ui/ProfileBadge';

interface ProfileTabLayoutProps {
  /**
   * Currently active profile tab
   */
  activeTab: ProfileType;
  /**
   * Callback when tab changes
   */
  onTabChange: (tab: ProfileType) => void;
  /**
   * Tab content to render
   */
  children: React.ReactNode;
}

const profileTabs: Array<{ type: ProfileType; label: string }> = [
  { type: 'business', label: 'Business' },
  { type: 'contractor', label: 'Contractor' },
  { type: 'employee', label: 'Employee' },
  { type: 'customer', label: 'Customer' },
];

/**
 * Main profile tab layout component
 * 
 * Renders a tabbed interface for switching between profile types with
 * active state indication using ProfileBadge components.
 * 
 * @example
 * ```tsx
 * <ProfileTabLayout
 *   activeTab="business"
 *   onTabChange={(tab) => setActiveTab(tab)}
 * >
 *   <BusinessProfileWidget profileId={profileId} />
 * </ProfileTabLayout>
 * ```
 */
export function ProfileTabLayout({
  activeTab,
  onTabChange,
  children,
}: ProfileTabLayoutProps) {
  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <nav className="flex space-x-4 px-6 py-4 overflow-x-auto" aria-label="Profile tabs">
          {profileTabs.map((tab) => (
            <button
              key={tab.type}
              onClick={() => onTabChange(tab.type)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                transition-colors whitespace-nowrap
                ${
                  activeTab === tab.type
                    ? 'bg-blue-50 text-blue-700 border-2 border-blue-500'
                    : 'text-gray-600 hover:bg-gray-50 border-2 border-transparent'
                }
              `}
              aria-current={activeTab === tab.type ? 'page' : undefined}
            >
              <span>{tab.label}</span>
              <ProfileBadge type={tab.type} size="sm" />
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content Area */}
      <div className="p-6 bg-gray-50 min-h-screen">
        {children}
      </div>
    </div>
  );
}

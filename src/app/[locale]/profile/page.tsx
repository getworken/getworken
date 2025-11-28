/**
 * Profile Page
 * @module app/profile/page
 * 
 * ✅ DIAMOND STANDARD: Main profile page with tab navigation
 */

'use client';

import { useState } from 'react';
import { useAtom } from 'jotai';
import { activeProfileAtom } from '@/entities/profile/model/profileAtom';
import { ProfileTabLayout } from '@/widgets/profile/ProfileTabLayout';
import { BusinessProfileWidget } from '@/widgets/profile/BusinessProfileWidget';
import { ContractorProfileWidget } from '@/widgets/profile/ContractorProfileWidget';
import { EmployeeProfileWidget } from '@/widgets/profile/EmployeeProfileWidget';
import { CustomerProfileWidget } from '@/widgets/profile/CustomerProfileWidget';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';
import type { ProfileType } from '@/shared/types';

/**
 * Main profile page component
 * Displays profile tabs and renders the appropriate profile widget
 */
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useAtom(activeProfileAtom);
  const [profileId] = useState<string>(''); // TODO: Get from auth context or URL

  const renderProfileContent = () => {
    switch (activeTab) {
      case 'business':
        return <BusinessProfileWidget profileId={profileId} />;
      case 'contractor':
        return <ContractorProfileWidget profileId={profileId} />;
      case 'employee':
        return <EmployeeProfileWidget profileId={profileId} />;
      case 'customer':
        return <CustomerProfileWidget profileId={profileId} />;
      default:
        return <BusinessProfileWidget profileId={profileId} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="mt-2 text-gray-600">
              Manage your profile information across different account types
            </p>
          </div>

          <ProfileTabLayout
            activeTab={activeTab || 'business'}
            onTabChange={(tab) => setActiveTab(tab as ProfileType)}
          >
            {renderProfileContent()}
          </ProfileTabLayout>
        </div>
      </div>
    </ErrorBoundary>
  );
}

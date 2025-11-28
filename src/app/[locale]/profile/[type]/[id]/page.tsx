/**
 * Dynamic Profile Page
 * @module app/profile/[type]/[id]/page
 * 
 * ✅ DIAMOND STANDARD: Dynamic profile page with type and ID routing
 */

'use client';

import { useParams } from 'next/navigation';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';
import { BusinessProfileWidget } from '@/widgets/profile/BusinessProfileWidget';
import { ContractorProfileWidget } from '@/widgets/profile/ContractorProfileWidget';
import { EmployeeProfileWidget } from '@/widgets/profile/EmployeeProfileWidget';
import { CustomerProfileWidget } from '@/widgets/profile/CustomerProfileWidget';
import type { ProfileType } from '@/shared/types';

/**
 * Dynamic profile page component
 * Route: /profile/[type]/[id]
 */
export default function DynamicProfilePage() {
  const params = useParams();
  
  if (!params) {
    return <div>Invalid URL</div>;
  }
  
  const profileType = params.type as ProfileType;
  const profileId = params.id as string;

  const renderProfile = () => {
    switch (profileType) {
      case 'business':
        return <BusinessProfileWidget profileId={profileId} />;
      case 'contractor':
        return <ContractorProfileWidget profileId={profileId} />;
      case 'employee':
        return <EmployeeProfileWidget profileId={profileId} />;
      case 'customer':
        return <CustomerProfileWidget profileId={profileId} />;
      default:
        return (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-red-800">Invalid profile type: {profileType}</p>
          </div>
        );
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {renderProfile()}
        </div>
      </div>
    </ErrorBoundary>
  );
}

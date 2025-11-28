/**
 * CustomerProfileWidget Component
 * @module widgets/profile/CustomerProfileWidget
 * 
 * ✅ DIAMOND STANDARD: Complete customer profile widget
 * 
 * Comprehensive customer profile display with all 11 customer sections:
 * - Basic Information
 * - Service & Orders
 * - Reviews & Loyalty
 * - Preferences & Documents
 */

'use client';

import { useState, useEffect } from 'react';
import { getCustomerProfile } from '@/entities/profile/customer/api/actions';
import { ensureProfileExists } from '@/app/api/actions/profiles/ensureProfileActions';
import type { CustomerProfile } from '@/entities/profile/model/types';
import { CustomerInformation } from '@/features/profile/customer-sections/CustomerInformation';
import { CustomerAddresses } from '@/features/profile/customer-sections/CustomerAddresses';
import { CustomerPaymentMethods } from '@/features/profile/customer-sections/CustomerPaymentMethods';
import { CustomerServiceRequests } from '@/features/profile/customer-sections/CustomerServiceRequests';
import { CustomerOrderHistory } from '@/features/profile/customer-sections/CustomerOrderHistory';
import { CustomerReviews } from '@/features/profile/customer-sections/CustomerReviews';
import { CustomerLoyalty } from '@/features/profile/customer-sections/CustomerLoyalty';
import { CustomerPreferences } from '@/features/profile/customer-sections/CustomerPreferences';
import { CustomerNotes } from '@/features/profile/customer-sections/CustomerNotes';
import { CustomerActivityLog } from '@/features/profile/customer-sections/CustomerActivityLog';
import { CustomerDocuments } from '@/features/profile/customer-sections/CustomerDocuments';

interface CustomerProfileWidgetProps {
  /**
   * Customer profile ID
   */
  profileId: string;
}

/**
 * Complete customer profile widget
 * 
 * Fetches and displays all customer profile sections organized in
 * logical groups with proper loading states and error handling.
 * 
 * @example
 * ```tsx
 * <CustomerProfileWidget profileId="customer-123" />
 * ```
 */
export function CustomerProfileWidget({ profileId }: CustomerProfileWidgetProps) {
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        setError(null);
        
        // Ensure profile exists first
        const ensureResult = await ensureProfileExists('customer');
        if (!ensureResult.success) {
          setError('Failed to initialize profile');
          return;
        }
        
        // Now load the profile
        const result = await getCustomerProfile(profileId, 'current-user');
        if (result.success) {
          setProfile(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load customer profile');
      } finally {
        setLoading(false);
      }
    }

    if (profileId) {
      loadProfile();
    }
  }, [profileId]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading customer profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <svg
          className="w-12 h-12 text-red-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Profile</h3>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  // No profile state
  if (!profile) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <p className="text-yellow-800">Customer profile not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Basic Information Group */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
        <CustomerInformation profile={profile} />
        <CustomerAddresses profile={profile} />
        <CustomerPaymentMethods profile={profile} />
      </div>

      {/* Service & Orders Group */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Service & Orders</h2>
        <CustomerServiceRequests profile={profile} />
        <CustomerOrderHistory profile={profile} />
      </div>

      {/* Reviews & Loyalty Group */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Reviews & Loyalty</h2>
        <CustomerReviews profile={profile} />
        <CustomerLoyalty profile={profile} />
      </div>

      {/* Preferences & Activity Group */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Preferences & Activity</h2>
        <CustomerPreferences profile={profile} />
        <CustomerNotes profile={profile} />
        <CustomerActivityLog profile={profile} />
      </div>

      {/* Documents */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
        <CustomerDocuments profile={profile} />
      </div>
    </div>
  );
}

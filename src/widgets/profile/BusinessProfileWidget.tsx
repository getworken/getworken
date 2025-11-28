/**
 * BusinessProfileWidget Component
 * @module widgets/profile/BusinessProfileWidget
 * 
 * ✅ DIAMOND STANDARD: Complete business profile widget
 * 
 * Comprehensive business profile display with all 6 business sections:
 * - Business Information
 * - Business Services
 * - Business Team
 * - Business Testimonials
 * - Business Job Listings
 * - Business Branding
 */

'use client';

import { useState, useEffect } from 'react';
import { getBusinessProfile } from '@/entities/profile/business/api/actions';
import { ensureProfileExists } from '@/app/api/actions/profiles/ensureProfileActions';
import type { BusinessProfile } from '@/entities/profile/model/types';
import { BusinessInformation } from '@/features/profile/business-sections/BusinessInformation';
import { BusinessServices } from '@/features/profile/business-sections/BusinessServices';
import { BusinessTeam } from '@/features/profile/business-sections/BusinessTeam';
import { BusinessTestimonials } from '@/features/profile/business-sections/BusinessTestimonials';
import { BusinessJobListings } from '@/features/profile/business-sections/BusinessJobListings';
import { BusinessBranding } from '@/features/profile/business-sections/BusinessBranding';

interface BusinessProfileWidgetProps {
  /**
   * Business profile ID
   */
  profileId: string;
}

/**
 * Complete business profile widget
 * 
 * Fetches and displays all business profile sections with proper
 * loading states and error handling. Automatically ensures profile exists.
 * 
 * @example
 * ```tsx
 * <BusinessProfileWidget profileId="business-123" />
 * ```
 */
export function BusinessProfileWidget({ profileId }: BusinessProfileWidgetProps) {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        setError(null);
        
        // Ensure profile exists first
        const ensureResult = await ensureProfileExists('business');
        if (!ensureResult.success) {
          setError('Failed to initialize profile');
          return;
        }
        
        // Now load the profile
        const result = await getBusinessProfile(profileId, 'current-user');
        if (result.success) {
          setProfile(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load business profile');
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading business profile...</p>
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
        <p className="text-yellow-800">Business profile not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Business Information */}
      <section>
        <BusinessInformation profile={profile} />
      </section>

      {/* Business Services */}
      <section>
        <BusinessServices profile={profile} isEditing={false} />
      </section>

      {/* Business Team */}
      <section>
        <BusinessTeam profile={profile} isEditing={false} />
      </section>

      {/* Business Testimonials */}
      <section>
        <BusinessTestimonials profile={profile} isEditing={false} />
      </section>

      {/* Business Job Listings */}
      <section>
        <BusinessJobListings profile={profile} isEditing={false} />
      </section>

      {/* Business Branding */}
      <section>
        <BusinessBranding profile={profile} isEditing={false} />
      </section>
    </div>
  );
}

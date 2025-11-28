/**
 * ContractorProfileWidget Component
 * @module widgets/profile/ContractorProfileWidget
 * 
 * ✅ DIAMOND STANDARD: Complete contractor profile widget
 * 
 * Comprehensive contractor profile display with all 17 contractor sections:
 * - Basic Information
 * - Skills & Specialties
 * - Experience & Portfolio
 * - Licenses & Certifications
 * - Insurance & Background
 * - Rates & Availability
 */

'use client';

import { useState, useEffect } from 'react';
import { getContractorProfile } from '@/entities/profile/contractor/api/actions';
import type { ContractorProfile } from '@/entities/profile/model/types';
import { ContractorInformation } from '@/features/profile/contractor-sections/ContractorInformation';
import { ContractorSkills } from '@/features/profile/contractor-sections/ContractorSkills';
import { ContractorSpecialties } from '@/features/profile/contractor-sections/ContractorSpecialties';
import { ContractorExperience } from '@/features/profile/contractor-sections/ContractorExperience';
import { ContractorPortfolio } from '@/features/profile/contractor-sections/ContractorPortfolio';
import { ContractorLicenses } from '@/features/profile/contractor-sections/ContractorLicenses';
import { ContractorCertifications } from '@/features/profile/contractor-sections/ContractorCertifications';
import { ContractorInsurance } from '@/features/profile/contractor-sections/ContractorInsurance';
import { ContractorBackgroundCheck } from '@/features/profile/contractor-sections/ContractorBackgroundCheck';
import { ContractorRates } from '@/features/profile/contractor-sections/ContractorRates';
import { ContractorAvailability } from '@/features/profile/contractor-sections/ContractorAvailability';
import { ContractorLanguages } from '@/features/profile/contractor-sections/ContractorLanguages';
import { ContractorEquipment } from '@/features/profile/contractor-sections/ContractorEquipment';
import { ContractorReferences } from '@/features/profile/contractor-sections/ContractorReferences';
import { ContractorTraining } from '@/features/profile/contractor-sections/ContractorTraining';
import { ContractorDocuments } from '@/features/profile/contractor-sections/ContractorDocuments';
import { ContractorPreferences } from '@/features/profile/contractor-sections/ContractorPreferences';

interface ContractorProfileWidgetProps {
  /**
   * Contractor profile ID
   */
  profileId: string;
}

/**
 * Complete contractor profile widget
 * 
 * Fetches and displays all contractor profile sections organized in
 * logical groups with proper loading states and error handling.
 * 
 * @example
 * ```tsx
 * <ContractorProfileWidget profileId="contractor-123" />
 * ```
 */
export function ContractorProfileWidget({ profileId }: ContractorProfileWidgetProps) {
  const [profile, setProfile] = useState<ContractorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        setError(null);
        const result = await getContractorProfile(profileId, 'current-user');
        if (result.success && result.data) {
          setProfile(result.data);
        } else {
          setError(!result.success ? result.error : 'Failed to load contractor profile');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load contractor profile');
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contractor profile...</p>
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
        <p className="text-yellow-800">Contractor profile not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Basic Information Group */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
        <ContractorInformation profile={profile} />
        <ContractorLanguages profile={profile} />
      </div>

      {/* Skills & Specialties Group */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Skills & Specialties</h2>
        <ContractorSkills profile={profile} />
        <ContractorSpecialties profile={profile} />
        <ContractorEquipment profile={profile} />
      </div>

      {/* Experience & Portfolio Group */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Experience & Portfolio</h2>
        <ContractorExperience profile={profile} />
        <ContractorPortfolio profile={profile} />
        <ContractorReferences profile={profile} />
      </div>

      {/* Licenses & Certifications Group */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Licenses & Certifications</h2>
        <ContractorLicenses profile={profile} />
        <ContractorCertifications profile={profile} />
        <ContractorTraining profile={profile} />
      </div>

      {/* Insurance & Background Group */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Insurance & Background</h2>
        <ContractorInsurance profile={profile} />
        <ContractorBackgroundCheck profile={profile} />
      </div>

      {/* Rates & Availability Group */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Rates & Availability</h2>
        <ContractorRates profile={profile} />
        <ContractorAvailability profile={profile} />
        <ContractorPreferences profile={profile} />
      </div>

      {/* Documents */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
        <ContractorDocuments profile={profile} />
      </div>
    </div>
  );
}

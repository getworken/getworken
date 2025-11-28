/**
 * EmployeeProfileWidget Component
 * @module widgets/profile/EmployeeProfileWidget
 * 
 * ✅ DIAMOND STANDARD: Complete employee profile widget
 * 
 * Comprehensive employee profile display with all 6 employee sections:
 * - Employee Information
 * - Employee Schedule
 * - Employee Performance
 * - Employee Training
 * - Employee Certifications
 * - Employee Documents
 */

'use client';

import { useState, useEffect } from 'react';
import { getEmployeeProfile } from '@/entities/profile/employee/api/actions';
import { ensureProfileExists } from '@/app/api/actions/profiles/ensureProfileActions';
import type { EmployeeProfile } from '@/entities/profile/model/types';
import { EmployeeInformation } from '@/features/profile/employee-sections/EmployeeInformation';
import { EmployeeSchedule } from '@/features/profile/employee-sections/EmployeeSchedule';
import { EmployeePerformance } from '@/features/profile/employee-sections/EmployeePerformance';
import { EmployeeTraining } from '@/features/profile/employee-sections/EmployeeTraining';
import { EmployeeCertifications } from '@/features/profile/employee-sections/EmployeeCertifications';
import { EmployeeDocuments } from '@/features/profile/employee-sections/EmployeeDocuments';

interface EmployeeProfileWidgetProps {
  /**
   * Employee profile ID
   */
  profileId: string;
}

/**
 * Complete employee profile widget
 * 
 * Fetches and displays all employee profile sections with proper
 * loading states and error handling.
 * 
 * @example
 * ```tsx
 * <EmployeeProfileWidget profileId="employee-123" />
 * ```
 */
export function EmployeeProfileWidget({ profileId }: EmployeeProfileWidgetProps) {
  const [profile, setProfile] = useState<EmployeeProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        setError(null);
        
        // Ensure profile exists first
        const ensureResult = await ensureProfileExists('employee');
        if (!ensureResult.success) {
          setError('Failed to initialize profile');
          return;
        }
        
        // Now load the profile
        const result = await getEmployeeProfile(profileId, 'current-user');
        if (result.success) {
          setProfile(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load employee profile');
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading employee profile...</p>
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
        <p className="text-yellow-800">Employee profile not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Employee Information */}
      <section>
        <EmployeeInformation profile={profile} />
      </section>

      {/* Employee Schedule */}
      <section>
        <EmployeeSchedule profile={profile} />
      </section>

      {/* Employee Performance */}
      <section>
        <EmployeePerformance profile={profile} />
      </section>

      {/* Employee Training */}
      <section>
        <EmployeeTraining profile={profile} />
      </section>

      {/* Employee Certifications */}
      <section>
        <EmployeeCertifications profile={profile} />
      </section>

      {/* Employee Documents */}
      <section>
        <EmployeeDocuments profile={profile} />
      </section>
    </div>
  );
}

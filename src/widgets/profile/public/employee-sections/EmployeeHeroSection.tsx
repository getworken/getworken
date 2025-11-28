/**
 * Employee Hero Section Component
 * @module widgets/profile/public/employee-sections/EmployeeHeroSection
 *
 * Displays employee's hero banner with profile photo, name, position, and tenure.
 * Primary visual header for employee public profile pages within organization.
 *
 * ✅ DIAMOND STANDARD: Widget section component
 */

'use client';

import { useState, useEffect } from 'react';

interface EmployeeHeroProps {
  firstName: string;
  lastName: string;
  position?: string;
  email: string;
  phoneNumber?: string;
  city?: string;
  state?: string;
  hourlyRate?: number;
  isVerified?: boolean;
  availabilityStatus?: string;
  employeeId?: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  state: string;
  memberSince: string | null;
}

export default function EmployeeHeroSection({
  firstName,
  lastName,
  position,
  email,
  phoneNumber,
  city,
  state,
  hourlyRate,
  isVerified,
  availabilityStatus,
  employeeId,
}: EmployeeHeroProps) {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!employeeId) return;

      // Extract UID from employee ID (remove EMP- prefix)
      const uid = employeeId.replace('EMP-', '');

      const response = await fetch(`/api/users/get-user-data?uid=${uid}`);
      const result = await response.json();
      if (result.success && result.user) {
        setUserData(result.user);
      }
    };
    fetchUserData();
  }, [employeeId]);

  // Helper function for status color
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    // Green - Available
    if (statusLower === 'available') {
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
    // Yellow - Limited availability
    else if (
      statusLower === 'limited time' ||
      statusLower.includes('limited')
    ) {
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
    // Orange - Busy
    else if (statusLower === 'busy' || statusLower.includes('busy')) {
      return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    }
    // Red - Unavailable
    else {
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  return (
    <div className="rounded-lg bg-slate-700 p-6">
      <div className="flex items-start space-x-6">
        <div className="relative flex-shrink-0">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 text-5xl font-bold shadow-lg">
            👤
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-bold text-white">
              {userData
                ? `${userData.firstName} ${userData.lastName}`
                : `${firstName} ${lastName}`}
            </h3>
            {isVerified ? (
              <span className="rounded bg-teal-500/20 px-2 py-1 text-xs text-teal-400">
                ✓ Verified
              </span>
            ) : (
              <span className="rounded bg-red-500/20 px-2 py-1 text-xs text-red-400">
                ✗ Unverified
              </span>
            )}
            {availabilityStatus && (
              <span
                className={`rounded px-2 py-1 text-xs capitalize ${getStatusColor(availabilityStatus)}`}
              >
                {availabilityStatus}
              </span>
            )}
          </div>
          <p className="mb-3 text-slate-400">{position || 'Employee'}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-300">
            <span>📧 {userData?.email || email}</span>
            {(userData?.phoneNumber || phoneNumber) && (
              <span>📱 {userData?.phoneNumber || phoneNumber}</span>
            )}
            {(userData?.city || userData?.state || city || state) && (
              <span>
                📍 {userData?.city || city}
                {(userData?.city || city) && (userData?.state || state)
                  ? ', '
                  : ''}
                {userData?.state || state}
              </span>
            )}
            {(hourlyRate ?? 0) > 0 && (
              <span className="font-semibold text-teal-400">
                💰 ${hourlyRate}/hr
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

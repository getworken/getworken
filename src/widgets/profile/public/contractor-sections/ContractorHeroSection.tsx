/**
 * Contractor Hero Section Component
 * @module widgets/profile/public/contractor-sections/ContractorHeroSection
 *
 * Displays contractor's hero banner with profile photo, name, title, and rating.
 * Primary visual header for contractor public profile pages.
 *
 * ✅ DIAMOND STANDARD: Widget section component
 */

'use client';

import { useState, useEffect } from 'react';

interface ContractorHeroSectionProps {
  firstName: string;
  lastName: string;
  professionalTitle: string;
  isVerified: boolean;
  availabilityStatus: string;
  email?: string;
  phoneNumber?: string;
  city?: string;
  state?: string;
  hourlyRate?: number;
  yearsExperience?: number;
  contractorId?: string;
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

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'available':
      return 'bg-emerald-500/20 text-emerald-400';
    case 'busy':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'unavailable':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-slate-500/20 text-slate-400';
  }
};

export default function ContractorHeroSection({
  firstName,
  lastName,
  professionalTitle,
  isVerified,
  availabilityStatus,
  email,
  phoneNumber,
  city,
  state,
  hourlyRate,
  yearsExperience,
  contractorId,
}: ContractorHeroSectionProps) {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!contractorId) return;

      // Extract UID from contractor ID (remove CONT- prefix)
      const uid = contractorId.replace('CONT-', '');

      const response = await fetch(`/api/users/get-user-data?uid=${uid}`);
      const result = await response.json();
      if (result.success && result.user) {
        setUserData(result.user);
      }
    };
    fetchUserData();
  }, [contractorId]);

  return (
    <div className="rounded-lg bg-slate-700 p-6">
      <div className="flex items-start space-x-6">
        <div className="relative flex-shrink-0">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-5xl font-bold shadow-lg">
            👷
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
              <span className="rounded bg-emerald-500/20 px-2 py-1 text-xs text-emerald-400">
                ✓ Verified
              </span>
            ) : (
              <span className="rounded bg-red-500/20 px-2 py-1 text-xs text-red-400">
                ✗ Unverified
              </span>
            )}
            <span
              className={`rounded px-2 py-1 text-xs capitalize ${getStatusColor(availabilityStatus)}`}
            >
              {availabilityStatus}
            </span>
          </div>
          <p className="mb-3 text-slate-400">{professionalTitle}</p>
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
              <span className="font-semibold text-emerald-400">
                💰 ${hourlyRate}/hr
              </span>
            )}
            {(yearsExperience ?? 0) > 0 && (
              <span className="font-semibold text-purple-400">
                🎯 {yearsExperience} years experience
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

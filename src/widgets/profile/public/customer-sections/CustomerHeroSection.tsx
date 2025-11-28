/**
 * Customer Hero Section Component
 * @module widgets/profile/public/customer-sections/CustomerHeroSection
 *
 * Displays customer's hero banner with profile photo, name, and member since date.
 * Primary visual header for customer public profile pages.
 *
 * ✅ DIAMOND STANDARD: Widget section component
 */

'use client';

import { useState, useEffect } from 'react';

interface CustomerHeroSectionProps {
  profile: any;
  customerId: string;
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

export default function CustomerHeroSection({
  profile,
  customerId,
}: CustomerHeroSectionProps) {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!customerId) return;

      // Extract UID from customer ID (remove CUST- prefix)
      const uid = customerId.replace('CUST-', '');

      const response = await fetch(`/api/users/get-user-data?uid=${uid}`);
      const result = await response.json();
      if (result.success && result.user) {
        setUserData(result.user);
      }
    };
    fetchUserData();
  }, [customerId]);

  // Calculate tier based on completed jobs
  const getTierBadge = () => {
    if (profile.stats.completedJobs >= 10)
      return { emoji: '🏆', text: 'Gold Customer', color: 'yellow' };
    if (profile.stats.completedJobs >= 5)
      return { emoji: '⭐', text: 'Silver Customer', color: 'purple' };
    return null;
  };

  const tier = getTierBadge();

  return (
    <div className="rounded-lg bg-slate-700 p-6">
      <div className="flex items-start space-x-6">
        <div className="relative flex-shrink-0">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-5xl font-bold shadow-lg">
            👤
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-bold text-white">
              {userData
                ? `${userData.firstName} ${userData.lastName}`
                : `${profile.firstName} ${profile.lastName}`}
            </h3>
            <span className="rounded bg-purple-500/20 px-2 py-1 text-xs text-purple-400">
              Customer
            </span>
            {tier && (
              <span
                className={`px-2 py-1 bg-${tier.color}-500/20 text-${tier.color}-400 rounded text-xs`}
              >
                {tier.emoji} {tier.text}
              </span>
            )}
          </div>
          <p className="mb-3 text-slate-400">
            Member since{' '}
            {userData?.memberSince
              ? new Date(userData.memberSince).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })
              : profile.accountInfo?.memberSince
                ? new Date(profile.accountInfo.memberSince).toLocaleDateString(
                    'en-US',
                    { month: 'long', year: 'numeric' }
                  )
                : 'N/A'}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-300">
            <span>📧 {userData?.email || profile.email}</span>
            {(userData?.phoneNumber || profile.phoneNumber) && (
              <span>📱 {userData?.phoneNumber || profile.phoneNumber}</span>
            )}
            {(userData?.city ||
              userData?.state ||
              profile.city ||
              profile.state) && (
              <span>
                📍 {userData?.city || profile.city}
                {(userData?.city || profile.city) &&
                (userData?.state || profile.state)
                  ? ', '
                  : ''}
                {userData?.state || profile.state}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

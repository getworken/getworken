"use client";
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { CustomerProfile } from '@/entities/profile/model/types';

// Dynamic imports for section components following platinum standards
const CustomerHeroSection = dynamic(() => import('./customer-sections/CustomerHeroSection'), {
  loading: () => <div className="bg-slate-700 rounded-lg p-6 animate-pulse h-32" />
});

const CustomerStatsSection = dynamic(() => import('./customer-sections/CustomerStatsSection'), {
  loading: () => <div className="bg-slate-700 rounded-lg p-4 animate-pulse h-24" />
});

const CustomerPublicAddressesSection = dynamic(() => import('./customer-sections/CustomerPublicAddressesSection'), {
  loading: () => <div className="bg-slate-700/50 rounded-lg p-6 animate-pulse h-40" />
});

interface PublicCustomerProfileProps {
  profile: CustomerProfile;
  customerId: string;
  onClose: () => void;
}

export default function PublicCustomerProfile({ profile, customerId, onClose }: PublicCustomerProfileProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Public Customer Profile</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profile Header */}
          <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-32" />}>
            <CustomerHeroSection profile={profile} customerId={customerId} />
          </Suspense>

          {/* Stats */}
          <Suspense fallback={<div className="bg-slate-700 rounded-lg p-4 animate-pulse h-24" />}>
            <CustomerStatsSection profile={profile} />
          </Suspense>

          {/* Public Addresses */}
          {profile.savedAddresses && profile.savedAddresses.some((addr: any) => addr.isPublic) && (
            <Suspense fallback={<div className="bg-slate-700/50 rounded-lg p-6 animate-pulse h-40" />}>
              <CustomerPublicAddressesSection profile={profile} />
            </Suspense>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center pt-4">
            <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:opacity-90 transition font-semibold">
              Contact Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

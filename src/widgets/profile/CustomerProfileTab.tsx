/**
 * CustomerProfileTab Component
 * @module widgets/profile/CustomerProfileTab
 * 
 * ✅ DIAMOND STANDARD: Customer profile tab assembly (read-only)
 */

'use client';

import { Suspense, lazy } from 'react';

const CustomerHeaderSection = lazy(() => import('@/features/profile/customer-sections/ui/CustomerHeaderSection').then(m => ({ default: m.CustomerHeaderSection })));
const CustomerActivityStatsSection = lazy(() => import('@/features/profile/customer-sections/ui/CustomerActivityStatsSection').then(m => ({ default: m.CustomerActivityStatsSection })));
const CustomerPersonalInfoSection = lazy(() => import('@/features/profile/customer-sections/ui/CustomerPersonalInfoSection').then(m => ({ default: m.CustomerPersonalInfoSection })));
const CustomerPreferencesSection = lazy(() => import('@/features/profile/customer-sections/ui/CustomerPreferencesSection').then(m => ({ default: m.CustomerPreferencesSection })));
const CustomerAddressesPaymentSection = lazy(() => import('@/features/profile/customer-sections/ui/CustomerAddressesPaymentSection').then(m => ({ default: m.CustomerAddressesPaymentSection })));
const CustomerRecentActivitySection = lazy(() => import('@/features/profile/customer-sections/ui/CustomerRecentActivitySection').then(m => ({ default: m.CustomerRecentActivitySection })));

export interface CustomerProfileTabProps {
  customerProfile: any;
  addresses?: any[];
  paymentMethods?: any[];
  recentActivity?: any[];
}

export function CustomerProfileTab({
  customerProfile,
  addresses = [],
  paymentMethods = [],
  recentActivity = []
}: CustomerProfileTabProps) {
  if (!customerProfile) {
    return (
      <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-8 text-center">
        <p className="text-yellow-300 text-lg mb-2">🚧 No Customer Profile</p>
        <p className="text-yellow-200 text-sm">You don&apos;t have a customer profile yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-32" />}>
        <CustomerHeaderSection customerProfile={customerProfile} />
      </Suspense>

      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-slate-700 rounded-lg p-6 animate-pulse h-32" />
          ))}
        </div>
      }>
        <CustomerActivityStatsSection />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-64" />}>
          <CustomerPersonalInfoSection customerProfile={customerProfile} />
        </Suspense>

        <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-64" />}>
          <CustomerPreferencesSection />
        </Suspense>
      </div>

      <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-64" />}>
        <CustomerAddressesPaymentSection 
          addresses={addresses}
          paymentMethods={paymentMethods}
        />
      </Suspense>

      <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-96" />}>
        <CustomerRecentActivitySection activities={recentActivity} />
      </Suspense>
    </div>
  );
}

/**
 * ContractorProfileTab Component
 * @module widgets/profile/ContractorProfileTab
 * 
 * ✅ DIAMOND STANDARD: Contractor profile tab assembly
 */

'use client';

import { Suspense, lazy } from 'react';

const ContractorHeaderSection = lazy(() => import('@/features/profile/contractor-sections/ui/ContractorHeaderSection').then(m => ({ default: m.ContractorHeaderSection })));
const ContractorStatsOverviewSection = lazy(() => import('@/features/profile/contractor-sections/ui/ContractorStatsOverviewSection').then(m => ({ default: m.ContractorStatsOverviewSection })));
const ContractorProfileDetailsSection = lazy(() => import('@/features/profile/contractor-sections/ui/ContractorProfileDetailsSection').then(m => ({ default: m.ContractorProfileDetailsSection })));
const ContractorPersonalInfoSection = lazy(() => import('@/features/profile/contractor-sections/ui/ContractorPersonalInfoSection').then(m => ({ default: m.ContractorPersonalInfoSection })));
const ContractorLicensesSection = lazy(() => import('@/features/profile/contractor-sections/ui/ContractorLicensesSection').then(m => ({ default: m.ContractorLicensesSection })));
const ContractorCertificationsSection = lazy(() => import('@/features/profile/contractor-sections/ui/ContractorCertificationsSection').then(m => ({ default: m.ContractorCertificationsSection })));
const ContractorAvailabilityScheduleSection = lazy(() => import('@/features/profile/contractor-sections/ui/ContractorAvailabilityScheduleSection').then(m => ({ default: m.ContractorAvailabilityScheduleSection })));

export interface ContractorProfileTabProps {
  contractorProfile: any;
  updateContractorProfile: (updates: any) => void;
  instantSaveContractorProfile: (updates: any) => Promise<void>;
  licenses?: any[];
  certifications?: any[];
  setShowSpecializationModal?: (show: boolean) => void;
  setShowContractorJobHistoryModal?: (show: boolean) => void;
}

export function ContractorProfileTab({
  contractorProfile,
  updateContractorProfile,
  instantSaveContractorProfile,
  licenses = [],
  certifications = [],
  setShowSpecializationModal,
  setShowContractorJobHistoryModal
}: ContractorProfileTabProps) {
  if (!contractorProfile) {
    return (
      <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-8 text-center">
        <p className="text-yellow-300 text-lg mb-2">🚧 No Contractor Profile</p>
        <p className="text-yellow-200 text-sm">You don&apos;t have a contractor profile yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-32" />}>
        <ContractorHeaderSection contractorProfile={contractorProfile} />
      </Suspense>

      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-slate-700 rounded-lg p-6 animate-pulse h-32" />
          ))}
        </div>
      }>
        <ContractorStatsOverviewSection />
      </Suspense>

      <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-96" />}>
        <ContractorProfileDetailsSection
          contractorProfile={contractorProfile}
          updateContractorProfile={updateContractorProfile}
          setShowSpecializationModal={setShowSpecializationModal}
          setShowContractorJobHistoryModal={setShowContractorJobHistoryModal}
        />
      </Suspense>

      <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-64" />}>
        <ContractorPersonalInfoSection
          contractorProfile={contractorProfile}
          updateContractorProfile={updateContractorProfile}
        />
      </Suspense>

      <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-64" />}>
        <ContractorLicensesSection licenses={licenses} />
      </Suspense>

      <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-96" />}>
        <ContractorCertificationsSection certifications={certifications} />
      </Suspense>

      <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-96" />}>
        <ContractorAvailabilityScheduleSection 
          contractorProfile={contractorProfile}
          updateContractorProfile={updateContractorProfile}
          instantSaveContractorProfile={instantSaveContractorProfile}
        />
      </Suspense>
    </div>
  );
}

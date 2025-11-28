/**
 * EmployeeProfileTab Component
 * @module widgets/profile/EmployeeProfileTab
 * 
 * ✅ DIAMOND STANDARD: Employee profile tab assembly
 */

'use client';

import { Suspense, lazy } from 'react';

const EmployeeHeaderSection = lazy(() => import('@/features/profile/employee-sections/ui/EmployeeHeaderSection').then(m => ({ default: m.EmployeeHeaderSection })));
const EmployeeStatsOverviewSection = lazy(() => import('@/features/profile/employee-sections/ui/EmployeeStatsOverviewSection').then(m => ({ default: m.EmployeeStatsOverviewSection })));
const EmployeeProfileDetailsSection = lazy(() => import('@/features/profile/employee-sections/ui/EmployeeProfileDetailsSection').then(m => ({ default: m.EmployeeProfileDetailsSection })));
const EmployeePersonalInfoSection = lazy(() => import('@/features/profile/employee-sections/ui/EmployeePersonalInfoSection').then(m => ({ default: m.EmployeePersonalInfoSection })));
const EmployeeCertificationsSection = lazy(() => import('@/features/profile/employee-sections/ui/EmployeeCertificationsSection').then(m => ({ default: m.EmployeeCertificationsSection })));
const EmployeeAvailabilityScheduleSection = lazy(() => import('@/features/profile/employee-sections/ui/EmployeeAvailabilityScheduleSection').then(m => ({ default: m.EmployeeAvailabilityScheduleSection })));

export interface EmployeeProfileTabProps {
  employeeProfile: any;
  updateEmployeeProfile: (updates: any) => void;
  instantSaveEmployeeProfile: (updates: any) => Promise<void>;
  certifications?: any[];
  setShowSkillsModal?: (show: boolean) => void;
  setShowPermissionsModal?: (show: boolean) => void;
  setShowEmployeeJobHistoryModal?: (show: boolean) => void;
}

export function EmployeeProfileTab({
  employeeProfile,
  updateEmployeeProfile,
  instantSaveEmployeeProfile,
  certifications = [],
  setShowSkillsModal,
  setShowPermissionsModal,
  setShowEmployeeJobHistoryModal
}: EmployeeProfileTabProps) {
  if (!employeeProfile) {
    return (
      <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-8 text-center">
        <p className="text-yellow-300 text-lg mb-2">🚧 No Employee Profile</p>
        <p className="text-yellow-200 text-sm">You don&apos;t have an employee profile yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-32" />}>
        <EmployeeHeaderSection employeeProfile={employeeProfile} />
      </Suspense>

      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-slate-700 rounded-lg p-6 animate-pulse h-32" />
          ))}
        </div>
      }>
        <EmployeeStatsOverviewSection />
      </Suspense>

      <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-96" />}>
        <EmployeeProfileDetailsSection
          employeeProfile={employeeProfile}
          updateEmployeeProfile={updateEmployeeProfile}
          setShowSkillsModal={setShowSkillsModal}
          setShowPermissionsModal={setShowPermissionsModal}
          setShowEmployeeJobHistoryModal={setShowEmployeeJobHistoryModal}
        />
      </Suspense>

      <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-64" />}>
        <EmployeePersonalInfoSection
          employeeProfile={employeeProfile}
          updateEmployeeProfile={updateEmployeeProfile}
        />
      </Suspense>

      <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-96" />}>
        <EmployeeCertificationsSection certifications={certifications} />
      </Suspense>

      <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-96" />}>
        <EmployeeAvailabilityScheduleSection 
          employeeProfile={employeeProfile}
          updateEmployeeProfile={updateEmployeeProfile}
          instantSaveEmployeeProfile={instantSaveEmployeeProfile}
        />
      </Suspense>
    </div>
  );
}

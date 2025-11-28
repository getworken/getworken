/**
 * Public Employee Profile Widget
 * @module widgets/profile/public/PublicEmployeeProfile
 * 
 * Main public-facing employee profile display widget.
 * Aggregates employee information sections into complete public profile view.
 * Includes hero, stats, contact, skills, and availability sections.
 * 
 * ✅ DIAMOND STANDARD: Widget-layer component with FSD compliance
 * 
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#widgets-layer}
 */

"use client";
import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for section components following platinum standards
const EmployeeHeroSection = dynamic(() => import('./employee-sections/EmployeeHeroSection'), {
  loading: () => <div className="bg-slate-700 rounded-lg p-6 animate-pulse h-32" />
});

const EmployeeStatsSection = dynamic(() => import('./employee-sections/EmployeeStatsSection'), {
  loading: () => <div className="bg-slate-700 rounded-lg p-4 animate-pulse h-24" />
});

const EmployeeAvailabilitySection = dynamic(() => import('./employee-sections/EmployeeAvailabilitySection'), {
  loading: () => <div className="bg-slate-700 rounded-lg p-6 animate-pulse h-48" />
});

// import EmployeeJobHistoryModal from '../../../modals/EmployeeJobHistoryModal'; // TODO: Implement modal

interface PublicEmployeeProfileProps {
  profile: any;
  employeeId: string;
  onClose: () => void;
}

export default function PublicEmployeeProfile({ profile, employeeId, onClose }: PublicEmployeeProfileProps) {
  const [canCreateEstimates, setCanCreateEstimates] = useState(false);
  const [_showJobHistory, _setShowJobHistory] = useState(false);

  // TODO: Fetch business permissions for this employee using server action
  // This requires a new server action to check employee permissions across businesses
  useEffect(() => {
    // Temporarily disable permissions check - needs server action implementation
    setCanCreateEstimates(false);
  }, [employeeId]);

  // Count visible stats for dynamic grid
  const visibleStatsCount = Object.values(profile.statsVisibility).filter(Boolean).length;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Public Employee Profile</h2>
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
            <EmployeeHeroSection
              firstName={profile.firstName}
              lastName={profile.lastName}
              position={profile.position}
              email={profile.email}
              phoneNumber={profile.phoneNumber}
              city={profile.city}
              state={profile.state}
              hourlyRate={profile.hourlyRate}
              isVerified={profile.isVerified}
              availabilityStatus={profile.availability?.status}
              employeeId={employeeId}
            />
          </Suspense>

          {/* Stats */}
          <Suspense fallback={<div className="h-24 bg-slate-700/30 rounded-lg animate-pulse" />}>
            <EmployeeStatsSection
              stats={profile.stats}
              statsVisibility={profile.statsVisibility}
              visibleStatsCount={visibleStatsCount}
            />
          </Suspense>

          {/* Certifications (Full Width) */}
          <div className="bg-slate-700/50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Certifications
            </h4>
            {profile.certifications && profile.certifications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {profile.certifications.map((cert: any, index: number) => (
                  <div key={index} className="flex flex-col bg-slate-800/50 p-4 rounded-lg">
                    <span className="text-white font-medium">{cert.name}</span>
                    {cert.expirationDate && (
                      <span className="text-xs text-slate-400 mt-1">
                        Expires: {new Date(cert.expirationDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm">No certifications added yet</p>
            )}
          </div>

          {/* Row: Skills & Specializations | Resume */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Skills & Specializations */}
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Skills & Specializations
              </h4>
              {profile.specializations && profile.specializations.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.specializations.map((spec: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm">
                      {spec}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-sm">No skills added yet</p>
              )}
            </div>

            {/* Resume */}
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume
              </h4>
              {'resumeUrl' in profile && profile['resumeUrl' as keyof typeof profile] ? (
                <div className="flex flex-col items-center justify-center py-2">
                  <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <a
                    href={String(profile['resumeUrl' as keyof typeof profile])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition text-sm font-medium"
                  >
                    View Resume
                  </a>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3 py-4">
                  <div className="w-10 h-10 bg-slate-600/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-slate-400 text-sm">Resume Unavailable</span>
                </div>
              )}
            </div>
          </div>

          {/* Availability & Schedule (Full Width) */}
          <Suspense fallback={<div className="h-48 bg-slate-700/30 rounded-lg animate-pulse" />}>
            <EmployeeAvailabilitySection
              availability={profile.availability}
              preferences={profile.preferences}
            />
          </Suspense>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center pt-4">
            <button
              onClick={() => _setShowJobHistory(true)}
              className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition font-semibold flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Job History
            </button>
            <button className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold">
              Contact Employee
            </button>
            {canCreateEstimates && (
              <button className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition font-semibold flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Request Quote
              </button>
            )}
          </div>
        </div>

        {/* Job History Modal - TODO: Implement */}
        {/* <JobHistoryModal 
          isOpen={showJobHistory}
          onClose={() => setShowJobHistory(false)}
          employeeId={employeeId}
        /> */}
      </div>
    </div>
  );
}

/**
 * Public Contractor Profile Widget
 * @module widgets/profile/public/PublicContractorProfile
 * 
 * Main public-facing contractor profile display widget.
 * Aggregates contractor information sections into complete public profile view.
 * Includes hero, stats, contact, experience, specializations, and training sections.
 * 
 * ✅ DIAMOND STANDARD: Widget-layer component with FSD compliance
 * 
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#widgets-layer}
 */

"use client";

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for section components following platinum standards
const ContractorHeroSection = dynamic(() => import('./contractor-sections/ContractorHeroSection'), {
  loading: () => <div className="bg-slate-700 rounded-lg p-6 animate-pulse h-32" />
});

const ContractorStatsSection = dynamic(() => import('./contractor-sections/ContractorStatsSection'), {
  loading: () => <div className="bg-slate-700 rounded-lg p-4 animate-pulse h-24" />
});

const ContractorExperienceSection = dynamic(() => import('./contractor-sections/ContractorExperienceSection'), {
  loading: () => <div className="bg-slate-700 rounded-lg p-6 animate-pulse h-32" />
});

const ContractorSpecializationsSection = dynamic(() => import('./contractor-sections/ContractorSpecializationsSection'), {
  loading: () => <div className="bg-slate-700 rounded-lg p-6 animate-pulse h-48" />
});

const ContractorAvailabilitySection = dynamic(() => import('./contractor-sections/ContractorAvailabilitySection'), {
  loading: () => <div className="bg-slate-700 rounded-lg p-6 animate-pulse h-48" />
});

const ContractorJobPreferencesSection = dynamic(() => import('./contractor-sections/ContractorJobPreferencesSection'), {
  loading: () => <div className="bg-slate-700 rounded-lg p-6 animate-pulse h-48" />
});

// import ContractorJobHistoryModal from '../../../modals/ContractorJobHistoryModal'; // TODO: Implement ContractorJobHistoryModal

interface ServiceArea {
  area: string;
  radius?: string;
}

interface Certification {
  name: string;
  number?: string;
  expirationDate?: string;
  status?: 'Active' | 'Expiring Soon' | 'Expired';
}

interface ContractorProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  city?: string;
  state?: string;
  professionalTitle?: string;
  hourlyRate?: number;
  yearsExperience?: number;
  isVerified?: boolean;
  stats?: {
    rating?: number;
    jobsCompleted?: number;
    satisfaction?: number;
    experience?: number;
  };
  statsVisibility?: {
    showRating?: boolean;
    showJobsCompleted?: boolean;
    showSatisfaction?: boolean;
    showExperience?: boolean;
  };
  availability?: {
    status?: string;
    workingHours?: { start: string; end: string };
    daysAvailable?: {
      monday?: boolean;
      tuesday?: boolean;
      wednesday?: boolean;
      thursday?: boolean;
      friday?: boolean;
      saturday?: boolean;
      sunday?: boolean;
    };
    maxDistance?: string;
    acceptEmergency?: boolean;
    acceptEmergencyJobs?: boolean;
    notes?: string;
  };
  specialties?: string[];
  preferredJobTypes?: string[];
  serviceAreas?: (ServiceArea | string)[];
  licenses?: string[];
  training?: string[];
  certifications?: (Certification | string)[];
  equipment?: string[];
  personalInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    city?: string;
    state?: string;
  };
}

export interface PublicContractorProfileProps {
  profile: ContractorProfile;
  contractorId?: string;
  onClose: () => void;
}

export default function PublicContractorProfile({ profile, contractorId, onClose }: PublicContractorProfileProps) {
  // TODO: Implement job history modal
  const [canCreateEstimates, setCanCreateEstimates] = useState(false);

  // TODO: Fetch business permissions for this contractor using server action
  // This requires a new server action to check contractor permissions across businesses
  useEffect(() => {
    // Temporarily disable permissions check - needs server action implementation
    setCanCreateEstimates(false);
  }, [contractorId]);

  // Extract data with flexible mapping
  const firstName = profile.firstName || profile.personalInfo?.name?.split(' ')[0] || 'Contractor';
  const lastName = profile.lastName || profile.personalInfo?.name?.split(' ').slice(1).join(' ') || '';
  const email = profile.email || profile.personalInfo?.email || '';
  const phoneNumber = profile.phoneNumber || profile.personalInfo?.phone || '';
  const city = profile.city || profile.personalInfo?.city || '';
  const state = profile.state || profile.personalInfo?.state || '';
  const professionalTitle = profile.professionalTitle || 'Contractor';
  const hourlyRate = profile.hourlyRate || 0;
  const isVerified = profile.isVerified || false;

  // Stats
  const stats = {
    rating: profile.stats?.rating || 0,
    jobsCompleted: profile.stats?.jobsCompleted || 0,
    satisfaction: profile.stats?.satisfaction || 0,
    experience: profile.stats?.experience || 0,
  };

  const statsVisibility = profile.statsVisibility || {
    showRating: true,
    showJobsCompleted: true,
    showSatisfaction: true,
    showExperience: true,
  };

  // Count visible stats for dynamic grid
  const visibleStatsCount = Object.values(statsVisibility).filter(Boolean).length;

  // Years of professional experience (separate from platform experience)
  const yearsExperience = profile.yearsExperience || 0;

  // Availability
  const availabilityStatus = profile.availability?.status || 'Available';
  const workingHours = profile.availability?.workingHours || { start: '09:00', end: '17:00' };
  const daysAvailable = profile.availability?.daysAvailable || {};
  const maxDistance = profile.availability?.maxDistance || '';
  const acceptEmergency = profile.availability?.acceptEmergency || profile.availability?.acceptEmergencyJobs || false;
  const availabilityNotes = profile.availability?.notes || '';

  // Professional info
  const specialties = profile.specialties || [];
  const preferredJobTypes = profile.preferredJobTypes || [];
  const serviceAreas = profile.serviceAreas || [];
  const licenses = profile.licenses || [];
  const training = profile.training || [];
  const certifications = profile.certifications || [];
  const equipment = profile.equipment || [];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-white">Public Contractor Profile</h2>
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
          {/* Hero Section */}
          <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-32" />}>
            <ContractorHeroSection 
              firstName={firstName}
              lastName={lastName}
              professionalTitle={professionalTitle}
              isVerified={isVerified}
              availabilityStatus={availabilityStatus}
              email={email}
              phoneNumber={phoneNumber}
              city={city}
              state={state}
              hourlyRate={hourlyRate}
              yearsExperience={yearsExperience}
              {...(contractorId ? { contractorId } : {})}
            />
          </Suspense>

          {/* Stats */}
          <Suspense fallback={<div className="h-24 bg-slate-700/30 rounded-lg animate-pulse" />}>
            <ContractorStatsSection
              stats={stats}
              statsVisibility={statsVisibility}
              visibleStatsCount={visibleStatsCount}
            />
          </Suspense>

          {/* Row 1: Professional Experience | Preferred Job Types */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Suspense fallback={<div className="h-48 bg-slate-700/30 rounded-lg animate-pulse" />}>
              <ContractorExperienceSection
                yearsExperience={yearsExperience}
              />
            </Suspense>

            <Suspense fallback={<div className="h-48 bg-slate-700/30 rounded-lg animate-pulse" />}>
              <ContractorJobPreferencesSection
                preferredJobTypes={preferredJobTypes}
                serviceAreas={[]}
                maxDistance=""
              />
            </Suspense>
          </div>

          {/* Row 2: Specializations | Licenses & Certifications */}
          <Suspense fallback={<div className="h-48 bg-slate-700/30 rounded-lg animate-pulse" />}>
            <ContractorSpecializationsSection
              specialties={specialties}
              licenses={licenses}
              certifications={certifications}
            />
          </Suspense>

          {/* Row 3: Availability & Schedule (Full Width) */}
          <Suspense fallback={<div className="h-48 bg-slate-700/30 rounded-lg animate-pulse" />}>
            <ContractorAvailabilitySection
              daysAvailable={daysAvailable}
              workingHours={workingHours}
              acceptEmergencyJobs={acceptEmergency}
              availabilityNotes={availabilityNotes}
            />
          </Suspense>

          {/* Row 3: Service Areas | Training & Education */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Suspense fallback={<div className="h-48 bg-slate-700/30 rounded-lg animate-pulse" />}>
              <div className="bg-slate-700/50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Service Areas
                </h4>
                {serviceAreas.length > 0 ? (
                  <>
                    <div className="space-y-2">
                      {serviceAreas.map((area: ServiceArea | string, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-600 rounded-lg">
                          <span className="text-white font-medium">{typeof area === 'string' ? area : area.area}</span>
                          {typeof area !== 'string' && area.radius && (
                            <span className="text-slate-300 text-sm">{area.radius}</span>
                          )}
                        </div>
                      ))}
                    </div>
                    {maxDistance && (
                      <div className="mt-3 text-sm text-slate-400">
                        Max travel distance: <span className="text-white font-medium">{maxDistance} miles</span>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-slate-400 text-center py-2">No service areas specified</p>
                )}
              </div>
            </Suspense>

            <Suspense fallback={<div className="h-48 bg-slate-700/30 rounded-lg animate-pulse" />}>
              <div className="bg-slate-700/50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Training & Education
                </h4>
                {training.length > 0 ? (
                  <div className="space-y-2">
                    {training.map((item: string, index: number) => (
                      <div key={index} className="p-3 bg-slate-600 rounded-lg">
                        <span className="text-white font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-center py-2">No training or education listed</p>
                )}
              </div>
            </Suspense>
          </div>

          {/* Equipment */}
          <Suspense fallback={<div className="h-48 bg-slate-700/30 rounded-lg animate-pulse" />}>
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Equipment & Tools
              </h4>
              {equipment.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {equipment.map((item: string, index: number) => (
                    <div key={index} className="flex items-center p-3 bg-slate-600 rounded-lg">
                      <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center mr-3">
                        <span className="text-emerald-400 text-lg">🔧</span>
                      </div>
                      <span className="text-white font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-center py-2">No equipment or tools listed</p>
              )}
            </div>
          </Suspense>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center pt-4">
            {/* TODO: Implement job history modal */}
            {/* <button 
              onClick={() => setShowJobHistory(true)}
              className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition font-semibold flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Job History
            </button> */}
            <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:opacity-90 transition font-semibold">
              Contact Contractor
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

        {/* Job History Modal - TODO: Implement JobHistoryModal component */}
        {/* {showJobHistory && contractorId && (
          <JobHistoryModal 
            isOpen={showJobHistory}
            onClose={() => setShowJobHistory(false)}
            contractorId={contractorId}
          />
        )} */}
      </div>
    </div>
  );
}

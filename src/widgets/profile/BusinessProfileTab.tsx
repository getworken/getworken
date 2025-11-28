/**
 * BusinessProfileTab Component
 * @module widgets/profile/BusinessProfileTab
 * 
 * ✅ DIAMOND STANDARD: Business profile tab assembly
 * 
 * Assembles all business profile sections into a complete profile view.
 */

'use client';

import { Suspense, lazy } from 'react';
import { BusinessManagementSections } from '@/features/profile/business-sections/ui/BusinessManagementSections';

// Lazy load section components
const BusinessHeaderSection = lazy(() => import('@/features/profile/business-sections/ui/BusinessHeaderSection').then(m => ({ default: m.BusinessHeaderSection })));
const BusinessQuickStatsSection = lazy(() => import('@/features/profile/business-sections/ui/BusinessQuickStatsSection').then(m => ({ default: m.BusinessQuickStatsSection })));
const BusinessInfoSection = lazy(() => import('@/features/profile/business-sections/ui/BusinessInfoSection').then(m => ({ default: m.BusinessInfoSection })));
const BusinessAboutSection = lazy(() => import('@/features/profile/business-sections/ui/BusinessAboutSection').then(m => ({ default: m.BusinessAboutSection })));
const BusinessBrandingSection = lazy(() => import('@/features/profile/business-sections/ui/BusinessBrandingSection').then(m => ({ default: m.BusinessBrandingSection })));

export interface BusinessProfileTabProps {
  businessInfo: any;
  setBusinessInfo: (info: any) => void;
  branding: any;
  setBranding: (branding: any) => void;
  businessStatsVisibility: any;
  setBusinessStatsVisibility: (visibility: any) => void;
  testimonials: any[];
  setTestimonials: (testimonials: any[]) => void;
  companyValues: any[];
  setCompanyValues: (values: any[]) => void;
  serviceAreas: any[];
  setServiceAreas: (areas: any[]) => void;
  socialMedia: any[];
  setSocialMedia: (media: any[]) => void;
  services: any[];
  setServices: (services: any[]) => void;
  displayTeamMembers: any[];
  setDisplayTeamMembers: (members: any[]) => void;
  jobListings: any[];
  setJobListings: (listings: any[]) => void;
  isHiring: boolean;
  setIsHiring: (hiring: boolean) => void;
  setShowServiceModal?: (show: boolean) => void;
  setShowTestimonialModal?: (show: boolean) => void;
  setShowValueModal?: (show: boolean) => void;
  setShowServiceAreaModal?: (show: boolean) => void;
  setShowSocialMediaModal?: (show: boolean) => void;
  setShowTeamModal?: (show: boolean) => void;
  setShowJobModal?: (show: boolean) => void;
}

export function BusinessProfileTab({
  businessInfo,
  setBusinessInfo,
  branding,
  setBranding,
  businessStatsVisibility,
  setBusinessStatsVisibility,
  testimonials,
  setTestimonials,
  companyValues,
  setCompanyValues,
  serviceAreas,
  setServiceAreas,
  socialMedia,
  setSocialMedia,
  services,
  setServices,
  displayTeamMembers,
  setDisplayTeamMembers,
  jobListings,
  setJobListings,
  isHiring,
  setIsHiring,
  setShowServiceModal,
  setShowTestimonialModal,
  setShowValueModal,
  setShowServiceAreaModal,
  setShowSocialMediaModal,
  setShowTeamModal,
  setShowJobModal
}: BusinessProfileTabProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-32" />}>
        <BusinessHeaderSection businessInfo={businessInfo} isHiring={isHiring} />
      </Suspense>

      {/* Quick Stats */}
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-slate-700 rounded-lg p-6 animate-pulse h-32" />
          ))}
        </div>
      }>
        <BusinessQuickStatsSection
          businessStatsVisibility={businessStatsVisibility}
          setBusinessStatsVisibility={setBusinessStatsVisibility}
        />
      </Suspense>

      {/* Business Info */}
      <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-64" />}>
        <BusinessInfoSection businessInfo={businessInfo} setBusinessInfo={setBusinessInfo} />
      </Suspense>

      {/* About Section */}
      <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-40" />}>
        <BusinessAboutSection
          story={businessInfo?.story}
          mission={businessInfo?.mission}
          onUpdateStory={(story) => setBusinessInfo({ ...businessInfo, story })}
          onUpdateMission={(mission) => setBusinessInfo({ ...businessInfo, mission })}
        />
      </Suspense>

      {/* Branding */}
      <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-96" />}>
        <BusinessBrandingSection branding={branding} setBranding={setBranding} />
      </Suspense>

      {/* Management Sections */}
      <BusinessManagementSections
        testimonials={testimonials}
        setTestimonials={setTestimonials}
        companyValues={companyValues}
        setCompanyValues={setCompanyValues}
        serviceAreas={serviceAreas}
        setServiceAreas={setServiceAreas}
        socialMedia={socialMedia}
        setSocialMedia={setSocialMedia}
        services={services}
        setServices={setServices}
        displayTeamMembers={displayTeamMembers}
        setDisplayTeamMembers={setDisplayTeamMembers}
        jobListings={jobListings}
        setJobListings={setJobListings}
        isHiring={isHiring}
        setIsHiring={setIsHiring}
        setShowServiceModal={setShowServiceModal}
        setShowTestimonialModal={setShowTestimonialModal}
        setShowValueModal={setShowValueModal}
        setShowServiceAreaModal={setShowServiceAreaModal}
        setShowSocialMediaModal={setShowSocialMediaModal}
        setShowTeamModal={setShowTeamModal}
        setShowJobModal={setShowJobModal}
      />
    </div>
  );
}

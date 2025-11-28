/**
 * Public Business Profile Widget
 * @module widgets/profile/public/PublicBusinessProfile
 * 
 * Main public-facing business profile display widget.
 * Aggregates business information sections into complete public profile view.
 * Includes hero, stats, about, services, team, and jobs sections.
 * 
 * ✅ DIAMOND STANDARD: Widget-layer component with FSD compliance
 * 
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#widgets-layer}
 */

"use client";
import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for section components following platinum standards
const BusinessHeroSection = dynamic(() => import('./business-sections/BusinessHeroSection'), {
  loading: () => <div className="bg-slate-700 rounded-lg p-6 animate-pulse h-32" />
});

const BusinessStatsSection = dynamic(() => import('./business-sections/BusinessStatsSection'), {
  loading: () => <div className="bg-slate-700 rounded-lg p-4 animate-pulse h-24" />
});

const BusinessNavigationTabs = dynamic(() => import('./business-sections/BusinessNavigationTabs'), {
  loading: () => <div className="bg-slate-700 rounded-lg p-1 animate-pulse h-12" />
});

const BusinessAboutSection = dynamic(() => import('./business-sections/BusinessAboutSection'), {
  loading: () => <div className="bg-slate-700 rounded-lg p-6 animate-pulse h-64" />
});

const BusinessServicesSection = dynamic(() => import('./business-sections/BusinessServicesSection'), {
  loading: () => <div className="bg-slate-700 rounded-lg p-6 animate-pulse h-64" />
});

const BusinessTeamSection = dynamic(() => import('./business-sections/BusinessTeamSection'), {
  loading: () => <div className="bg-slate-700 rounded-lg p-6 animate-pulse h-64" />
});

const BusinessJobsSection = dynamic(() => import('./business-sections/BusinessJobsSection'), {
  loading: () => <div className="bg-slate-700 rounded-lg p-6 animate-pulse h-64" />
});

const BusinessContactSection = dynamic(() => import('./business-sections/BusinessContactSection'), {
  loading: () => <div className="bg-slate-700 rounded-lg p-6 animate-pulse h-64" />
});

export interface PublicBusinessProfileProps {
  onClose: () => void;
  businessInfo: any;
  branding: any;
  testimonials: any[];
  companyValues: any[];
  serviceAreas: any[];
  socialMedia: any[];
  services: any[];
  teamMembers: any;
  jobListings: any[];
  businessStatsVisibility: any;
  isHiring: boolean;
}

export default function PublicBusinessProfile({
  onClose,
  businessInfo,
  branding,
  services,
  teamMembers,
  jobListings,
  businessStatsVisibility
}: PublicBusinessProfileProps) {
  const [activeTab, setActiveTab] = useState('about');

  // Get all team members from the teamMembers object
  const allTeamMembers = [
    ...(teamMembers?.contractors || []),
    ...(teamMembers?.employees || [])
  ];

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'about':
        return (
          <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-64" />}>
            <BusinessAboutSection branding={branding} businessInfo={businessInfo} />
          </Suspense>
        );
      case 'services':
        return (
          <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-64" />}>
            <BusinessServicesSection branding={branding} businessInfo={businessInfo} services={services} />
          </Suspense>
        );
      case 'team':
        return (
          <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-64" />}>
            <BusinessTeamSection branding={branding} businessInfo={businessInfo} allTeamMembers={allTeamMembers} />
          </Suspense>
        );
      case 'jobs':
        return (
          <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-64" />}>
            <BusinessJobsSection branding={branding} businessInfo={businessInfo} jobs={jobListings} />
          </Suspense>
        );
      case 'contact':
        return (
          <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-64" />}>
            <BusinessContactSection branding={branding} businessInfo={businessInfo} onClose={onClose} />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<div className="bg-slate-700 rounded-lg p-6 animate-pulse h-64" />}>
            <BusinessAboutSection branding={branding} businessInfo={businessInfo} />
          </Suspense>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-white">Public Business Profile</h2>
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
            <BusinessHeroSection branding={branding} businessInfo={businessInfo} businessStatsVisibility={businessStatsVisibility} />
          </Suspense>

          {/* Stats Section */}
          <Suspense fallback={<div className="bg-slate-700 rounded-lg p-4 animate-pulse h-24" />}>
            <BusinessStatsSection 
              branding={branding} 
              businessStatsVisibility={businessStatsVisibility} 
              businessInfo={businessInfo} 
              allTeamMembers={allTeamMembers} 
            />
          </Suspense>

          {/* Navigation Tabs */}
          <Suspense fallback={<div className="bg-slate-700 rounded-lg p-1 animate-pulse h-12" />}>
            <BusinessNavigationTabs branding={branding} activeTab={activeTab} setActiveTab={setActiveTab} />
          </Suspense>

          {/* Dynamic Section Content */}
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
}

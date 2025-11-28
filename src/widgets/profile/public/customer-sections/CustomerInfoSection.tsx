/**
 * Customer Info Section Component
 * @module widgets/profile/public/customer-sections/CustomerInfoSection
 * 
 * Displays customer's basic information and profile details.
 * Shows general customer information for service provider reference.
 * 
 * ✅ DIAMOND STANDARD: Widget section component
 */

"use client";

interface CustomerInfoSectionProps {
  profile: any;
}

export default function CustomerInfoSection({ profile }: CustomerInfoSectionProps) {
  return (
    <div className="bg-slate-700/50 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Customer Information
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 rounded-lg p-4">
          <label className="text-sm text-slate-400 mb-1 block">Full Name</label>
          <p className="text-white font-medium">{profile.firstName} {profile.lastName}</p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4">
          <label className="text-sm text-slate-400 mb-1 block">Location</label>
          <p className="text-white font-medium">{profile.city}{profile.city && profile.state ? ', ' : ''}{profile.state}</p>
        </div>
      </div>
    </div>
  );
}
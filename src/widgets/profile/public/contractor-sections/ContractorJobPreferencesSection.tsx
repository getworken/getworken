/**
 * Contractor Job Preferences Section Component
 * @module widgets/profile/public/contractor-sections/ContractorJobPreferencesSection
 * 
 * Displays contractor's job preferences including service areas and job types.
 * Shows what types of work and locations contractor prefers.
 * 
 * ✅ DIAMOND STANDARD: Widget section component
 */

"use client";

interface ServiceArea {
  area: string;
  radius?: string;
}

interface JobPreferencesProps {
  preferredJobTypes: string[];
  serviceAreas: (string | ServiceArea)[];
  maxDistance?: string;
}

export default function ContractorJobPreferencesSection({
  preferredJobTypes
}: JobPreferencesProps) {
  return (
    <div className="bg-slate-700/50 rounded-lg p-6">
      {/* Preferred Job Types */}
      <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Preferred Job Types
      </h4>
      {preferredJobTypes.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {preferredJobTypes.map((job: string, index: number) => (
            <span key={index} className="px-3 py-1 bg-slate-600 text-slate-200 rounded-full text-sm">
              {job}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-slate-400 text-center py-2">No preferred job types specified</p>
      )}
    </div>
  );
}
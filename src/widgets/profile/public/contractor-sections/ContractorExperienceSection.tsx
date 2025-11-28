/**
 * Contractor Experience Section Component
 * @module widgets/profile/public/contractor-sections/ContractorExperienceSection
 * 
 * Displays contractor's years of experience and work history summary.
 * Shows professional experience level and tenure in the trade.
 * 
 * ✅ DIAMOND STANDARD: Widget section component
 */

"use client";

interface ExperienceSectionProps {
  yearsExperience?: number;
}

export default function ContractorExperienceSection({
  yearsExperience
}: ExperienceSectionProps) {
  return (
    <div className="bg-slate-700/50 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Professional Experience
      </h4>
      {yearsExperience && yearsExperience > 0 ? (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">🏆</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{yearsExperience} Years</div>
            <div className="text-slate-400 text-sm">Professional experience in the field</div>
          </div>
        </div>
      ) : (
        <div className="text-slate-400 text-center py-4">
          No experience information provided yet
        </div>
      )}
    </div>
  );
}

/**
 * Employee Skills Section Component
 * @module widgets/profile/public/employee-sections/EmployeeSkillsSection
 * 
 * Displays employee's skills, specializations, and competencies.
 * Shows technical abilities and areas of expertise within the trade.
 * 
 * ✅ DIAMOND STANDARD: Widget section component
 */

"use client";

interface SkillsSectionProps {
  specializations: string[];
  certifications: Array<{
    name: string;
    expirationDate: Date | null;
  }>;
}

export default function EmployeeSkillsSection({
  specializations,
  certifications
}: SkillsSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Skills & Specializations */}
      {specializations.length > 0 && (
        <div className="bg-slate-700/50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Skills & Specializations
          </h4>
          <div className="flex flex-wrap gap-2">
            {specializations.map((spec: string, index: number) => (
              <span key={index} className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm">
                {spec}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="bg-slate-700/50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Certifications
          </h4>
          <div className="space-y-2">
            {certifications.map((cert, index: number) => (
              <div key={index} className="flex items-center justify-between bg-slate-800/50 p-3 rounded-lg">
                <span className="text-white">{cert.name}</span>
                {cert.expirationDate && (
                  <span className="text-xs text-slate-400">
                    Expires: {new Date(cert.expirationDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
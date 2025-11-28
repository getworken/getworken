/**
 * ContractorProfessionalBioSection Component
 * @module features/profile/contractor-sections/ui/ContractorProfessionalBioSection
 * 
 * ✅ DIAMOND STANDARD: Contractor professional biography section
 */

'use client';


export interface ContractorProfessionalBioSectionProps {
  bio?: string;
  onUpdateBio?: (bio: string) => void;
}

export function ContractorProfessionalBioSection({ bio = '', onUpdateBio }: ContractorProfessionalBioSectionProps) {
  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">Professional Bio</h3>
      <textarea
        value={bio}
        onChange={(e) => onUpdateBio?.(e.target.value)}
        placeholder="Describe your professional background, expertise, and what makes you stand out..."
        className="w-full h-40 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <p className="text-slate-400 text-sm mt-2">
        {bio.length}/500 characters
      </p>
    </div>
  );
}

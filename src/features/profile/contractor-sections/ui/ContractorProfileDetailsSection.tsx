/**
 * ContractorProfileDetailsSection Component
 * @module features/profile/contractor-sections/ui/ContractorProfileDetailsSection
 * 
 * ✅ DIAMOND STANDARD: Contractor profile details with bio and specializations
 */

'use client';


export interface ContractorProfileDetailsSectionProps {
  contractorProfile: any;
  updateContractorProfile: (updates: any) => void;
  onAddSpecialization?: (() => void) | undefined;
  setShowSpecializationModal?: ((show: boolean) => void) | undefined;
  setShowContractorJobHistoryModal?: ((show: boolean) => void) | undefined;
}

export function ContractorProfileDetailsSection({ 
  contractorProfile,
  updateContractorProfile,
  onAddSpecialization,
  setShowSpecializationModal
}: ContractorProfileDetailsSectionProps) {
  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-6">Profile Details</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="contractor-bio" className="block text-sm font-medium text-slate-300 mb-2">
            Professional Bio
          </label>
          <textarea
            id="contractor-bio"
            value={contractorProfile?.bio || ''}
            onChange={(e) => updateContractorProfile({ bio: e.target.value })}
            placeholder="Tell clients about your experience and expertise..."
            className="w-full h-32 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-slate-300">
              Specializations
            </label>
            <button
              onClick={() => {
                if (setShowSpecializationModal) {
                  setShowSpecializationModal(true);
                } else if (onAddSpecialization) {
                  onAddSpecialization();
                }
              }}
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded transition-colors"
            >
              + Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {contractorProfile?.specializations?.length ? (
              contractorProfile.specializations.map((spec: string, index: number) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm"
                >
                  {spec}
                </span>
              ))
            ) : (
              <p className="text-slate-400 text-sm">No specializations added yet</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="years-experience" className="block text-sm font-medium text-slate-300 mb-2">
              Years of Experience
            </label>
            <input
              id="years-experience"
              type="number"
              value={contractorProfile?.yearsOfExperience || ''}
              onChange={(e) => updateContractorProfile({ yearsOfExperience: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="hourly-rate" className="block text-sm font-medium text-slate-300 mb-2">
              Hourly Rate
            </label>
            <input
              id="hourly-rate"
              type="text"
              value={contractorProfile?.hourlyRate || ''}
              onChange={(e) => updateContractorProfile({ hourlyRate: e.target.value })}
              placeholder="$50/hr"
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

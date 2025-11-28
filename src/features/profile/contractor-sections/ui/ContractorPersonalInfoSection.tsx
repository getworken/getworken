/**
 * ContractorPersonalInfoSection Component
 * @module features/profile/contractor-sections/ui/ContractorPersonalInfoSection
 * 
 * ✅ DIAMOND STANDARD: Contractor personal contact information
 */

'use client';


export interface ContractorPersonalInfoSectionProps {
  contractorProfile: any;
  updateContractorProfile: (updates: any) => void;
}

export function ContractorPersonalInfoSection({ contractorProfile, updateContractorProfile }: ContractorPersonalInfoSectionProps) {
  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-6">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="first-name" className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
          <input
            id="first-name"
            type="text"
            value={contractorProfile?.firstName || ''}
            onChange={(e) => updateContractorProfile({ firstName: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label htmlFor="last-name" className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
          <input
            id="last-name"
            type="text"
            value={contractorProfile?.lastName || ''}
            onChange={(e) => updateContractorProfile({ lastName: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label htmlFor="contractor-email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
          <input
            id="contractor-email"
            type="email"
            value={contractorProfile?.email || ''}
            onChange={(e) => updateContractorProfile({ email: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label htmlFor="contractor-phone" className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
          <input
            id="contractor-phone"
            type="tel"
            value={contractorProfile?.phone || ''}
            onChange={(e) => updateContractorProfile({ phone: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="contractor-location" className="block text-sm font-medium text-slate-300 mb-2">Location</label>
          <input
            id="contractor-location"
            type="text"
            value={contractorProfile?.location || ''}
            onChange={(e) => updateContractorProfile({ location: e.target.value })}
            placeholder="City, State"
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * ContractorLicensesSection Component
 * @module features/profile/contractor-sections/ui/ContractorLicensesSection
 * 
 * ✅ DIAMOND STANDARD: Contractor licenses management
 */

'use client';


export interface License {
  id: string;
  type: string;
  number: string;
  state: string;
  expiration: string;
}

export interface ContractorLicensesSectionProps {
  licenses: License[];
  onAddLicense?: () => void;
  onRemoveLicense?: (id: string) => void;
}

export function ContractorLicensesSection({ licenses, onAddLicense, onRemoveLicense }: ContractorLicensesSectionProps) {
  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Licenses</h3>
        <button
          onClick={onAddLicense}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
        >
          + Add License
        </button>
      </div>
      {licenses.length === 0 ? (
        <p className="text-slate-400 text-center py-8">No licenses added yet</p>
      ) : (
        <div className="space-y-3">
          {licenses.map((license) => (
            <div key={license.id} className="bg-slate-800 rounded-lg p-4 flex items-start justify-between">
              <div>
                <h4 className="text-white font-semibold">{license.type}</h4>
                <p className="text-slate-400 text-sm">License #: {license.number}</p>
                <p className="text-slate-400 text-sm">State: {license.state} • Expires: {license.expiration}</p>
              </div>
              <button
                onClick={() => onRemoveLicense?.(license.id)}
                className="text-red-400 hover:text-red-300"
                aria-label="Remove license"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

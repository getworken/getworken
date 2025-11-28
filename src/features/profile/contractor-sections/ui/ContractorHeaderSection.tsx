/**
 * ContractorHeaderSection Component
 * @module features/profile/contractor-sections/ui/ContractorHeaderSection
 * 
 * ✅ DIAMOND STANDARD: Contractor profile header with avatar and status
 */

'use client';


export interface ContractorHeaderSectionProps {
  contractorProfile: any;
  onEditAvatar?: () => void;
}

export function ContractorHeaderSection({ contractorProfile, onEditAvatar }: ContractorHeaderSectionProps) {
  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <div className="flex items-start space-x-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-5xl font-bold shadow-lg">
            🔧
          </div>
          {onEditAvatar && (
            <button 
              onClick={onEditAvatar}
              className="absolute bottom-0 right-0 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-xs hover:bg-slate-600 transition-colors"
              aria-label="Edit contractor avatar"
            >
              ✏️
            </button>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-2xl font-bold text-white">
              {contractorProfile?.firstName} {contractorProfile?.lastName}
            </h3>
            {contractorProfile?.isVerified && (
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">
                ✓ Verified
              </span>
            )}
            <span className={`px-2 py-1 rounded text-xs ${
              contractorProfile?.status === 'active' 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-yellow-500/20 text-yellow-400'
            }`}>
              {contractorProfile?.status || 'Active'}
            </span>
          </div>
          <p className="text-slate-400 mb-3">{contractorProfile?.title || 'Contractor'}</p>
          <div className="flex items-center space-x-4 text-sm text-slate-300">
            {contractorProfile?.email && <span>📧 {contractorProfile.email}</span>}
            {contractorProfile?.phone && <span>📱 {contractorProfile.phone}</span>}
            {contractorProfile?.location && <span>📍 {contractorProfile.location}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

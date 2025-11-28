/**
 * CustomerHeaderSection Component
 * @module features/profile/customer-sections/ui/CustomerHeaderSection
 * 
 * ✅ DIAMOND STANDARD: Customer profile header
 */

'use client';


export interface CustomerHeaderSectionProps {
  customerProfile: any;
}

export function CustomerHeaderSection({ customerProfile }: CustomerHeaderSectionProps) {
  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <div className="flex items-start space-x-6">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-5xl font-bold shadow-lg">
          👤
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-2xl font-bold text-white">
              {customerProfile?.firstName} {customerProfile?.lastName}
            </h3>
            {customerProfile?.isVerified && (
              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                ✓ Verified Customer
              </span>
            )}
            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
              Member since {customerProfile?.memberSince || 'N/A'}
            </span>
          </div>
          <p className="text-slate-400 mb-3">Customer Account</p>
          <div className="flex items-center space-x-4 text-sm text-slate-300">
            {customerProfile?.email && <span>📧 {customerProfile.email}</span>}
            {customerProfile?.phone && <span>📱 {customerProfile.phone}</span>}
            {customerProfile?.customerId && <span>🆔 {customerProfile.customerId}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

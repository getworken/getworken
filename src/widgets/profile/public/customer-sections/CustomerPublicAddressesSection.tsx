/**
 * Customer Public Addresses Section Component
 * @module widgets/profile/public/customer-sections/CustomerPublicAddressesSection
 * 
 * Displays customer's service addresses where work can be performed.
 * Shows property locations available for service appointments.
 * 
 * ✅ DIAMOND STANDARD: Widget section component
 */

"use client";

interface CustomerPublicAddressesSectionProps {
  profile: any;
}

export default function CustomerPublicAddressesSection({ profile }: CustomerPublicAddressesSectionProps) {
  // Filter only public addresses
  const publicAddresses = profile.savedAddresses?.filter((addr: any) => addr.isPublic) || [];

  if (publicAddresses.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-700/50 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Service Locations
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {publicAddresses.map((address: any) => (
          <div key={address.id} className={`p-4 bg-slate-800/50 rounded-lg ${address.isDefault ? 'border-l-4 border-purple-500' : ''}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white font-medium">{address.label}</span>
              {address.isDefault && (
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">Primary</span>
              )}
            </div>
            <p className="text-slate-300 text-sm">
              {address.street}<br/>
              {address.city}, {address.state} {address.zipCode}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

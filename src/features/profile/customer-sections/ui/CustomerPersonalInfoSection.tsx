/**
 * CustomerPersonalInfoSection Component
 * @module features/profile/customer-sections/ui/CustomerPersonalInfoSection
 * 
 * ✅ DIAMOND STANDARD: Customer personal information (read-only)
 */

'use client';


export interface CustomerPersonalInfoSectionProps {
  customerProfile: any;
}

export function CustomerPersonalInfoSection({ customerProfile }: CustomerPersonalInfoSectionProps) {
  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between py-3 border-b border-slate-600">
      <span className="text-slate-400">{label}</span>
      <span className="text-white font-medium">{value || 'Not set'}</span>
    </div>
  );

  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-6">Personal Information</h3>
      <div className="space-y-1">
        <InfoRow label="First Name" value={customerProfile?.firstName} />
        <InfoRow label="Last Name" value={customerProfile?.lastName} />
        <InfoRow label="Email" value={customerProfile?.email} />
        <InfoRow label="Phone" value={customerProfile?.phone} />
        <InfoRow label="Customer ID" value={customerProfile?.customerId} />
        <InfoRow label="Member Since" value={customerProfile?.memberSince} />
      </div>
    </div>
  );
}

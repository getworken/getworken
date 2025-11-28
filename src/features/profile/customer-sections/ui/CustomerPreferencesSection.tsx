/**
 * CustomerPreferencesSection Component
 * @module features/profile/customer-sections/ui/CustomerPreferencesSection
 * 
 * ✅ DIAMOND STANDARD: Customer preferences and settings
 */

'use client';


export interface CustomerPreferencesSectionProps {
  preferences?: {
    communication: string;
    notifications: boolean;
    language: string;
    timezone: string;
  };
}

export function CustomerPreferencesSection({ preferences }: CustomerPreferencesSectionProps) {
  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between py-3 border-b border-slate-600">
      <span className="text-slate-400">{label}</span>
      <span className="text-white font-medium">{value || 'Not set'}</span>
    </div>
  );

  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-6">Preferences</h3>
      <div className="space-y-1">
        <InfoRow label="Communication" value={preferences?.communication || 'Email'} />
        <InfoRow label="Notifications" value={preferences?.notifications ? 'Enabled' : 'Disabled'} />
        <InfoRow label="Language" value={preferences?.language || 'English'} />
        <InfoRow label="Timezone" value={preferences?.timezone || 'Not set'} />
      </div>
    </div>
  );
}

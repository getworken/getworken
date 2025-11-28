/**
 * EmployeeHeaderSection Component
 * @module features/profile/employee-sections/ui/EmployeeHeaderSection
 * 
 * ✅ DIAMOND STANDARD: Employee profile header
 */

'use client';


export interface EmployeeHeaderSectionProps {
  employeeProfile: any;
  onEditAvatar?: () => void;
}

export function EmployeeHeaderSection({ employeeProfile, onEditAvatar }: EmployeeHeaderSectionProps) {
  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <div className="flex items-start space-x-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-5xl font-bold shadow-lg">
            👤
          </div>
          {onEditAvatar && (
            <button 
              onClick={onEditAvatar}
              className="absolute bottom-0 right-0 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-xs hover:bg-slate-600 transition-colors"
              aria-label="Edit employee avatar"
            >
              ✏️
            </button>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-2xl font-bold text-white">
              {employeeProfile?.firstName} {employeeProfile?.lastName}
            </h3>
            {employeeProfile?.isVerified && (
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                ✓ Verified
              </span>
            )}
            <span className={`px-2 py-1 rounded text-xs ${
              employeeProfile?.status === 'active' 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-yellow-500/20 text-yellow-400'
            }`}>
              {employeeProfile?.status || 'Active'}
            </span>
          </div>
          <p className="text-slate-400 mb-3">{employeeProfile?.position || 'Employee'}</p>
          <div className="flex items-center space-x-4 text-sm text-slate-300">
            {employeeProfile?.email && <span>📧 {employeeProfile.email}</span>}
            {employeeProfile?.phone && <span>📱 {employeeProfile.phone}</span>}
            {employeeProfile?.employeeId && <span>🆔 {employeeProfile.employeeId}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

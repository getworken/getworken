/**
 * EmployeePersonalInfoSection Component
 * @module features/profile/employee-sections/ui/EmployeePersonalInfoSection
 * 
 * ✅ DIAMOND STANDARD: Employee personal information
 */

'use client';


export interface EmployeePersonalInfoSectionProps {
  employeeProfile: any;
  updateEmployeeProfile: (updates: any) => void;
}

export function EmployeePersonalInfoSection({ employeeProfile, updateEmployeeProfile }: EmployeePersonalInfoSectionProps) {
  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-6">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="emp-first-name" className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
          <input
            id="emp-first-name"
            type="text"
            value={employeeProfile?.firstName || ''}
            onChange={(e) => updateEmployeeProfile({ firstName: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="emp-last-name" className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
          <input
            id="emp-last-name"
            type="text"
            value={employeeProfile?.lastName || ''}
            onChange={(e) => updateEmployeeProfile({ lastName: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="emp-email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
          <input
            id="emp-email"
            type="email"
            value={employeeProfile?.email || ''}
            onChange={(e) => updateEmployeeProfile({ email: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="emp-phone" className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
          <input
            id="emp-phone"
            type="tel"
            value={employeeProfile?.phone || ''}
            onChange={(e) => updateEmployeeProfile({ phone: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="employee-id" className="block text-sm font-medium text-slate-300 mb-2">Employee ID</label>
          <input
            id="employee-id"
            type="text"
            value={employeeProfile?.employeeId || ''}
            onChange={(e) => updateEmployeeProfile({ employeeId: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="start-date" className="block text-sm font-medium text-slate-300 mb-2">Start Date</label>
          <input
            id="start-date"
            type="date"
            value={employeeProfile?.startDate || ''}
            onChange={(e) => updateEmployeeProfile({ startDate: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

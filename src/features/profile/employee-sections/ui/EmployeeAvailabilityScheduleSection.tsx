/**
 * EmployeeAvailabilityScheduleSection Component
 * @module features/profile/employee-sections/ui/EmployeeAvailabilityScheduleSection
 * 
 * ✅ DIAMOND STANDARD: Employee availability and schedule management (GetWork-alpha exact match)
 */

'use client';


export interface EmployeeAvailabilityScheduleSectionProps {
  employeeProfile: any;
  updateEmployeeProfile: (updates: any) => void;
  instantSaveEmployeeProfile: (updates: any) => Promise<void>;
}

export function EmployeeAvailabilityScheduleSection({ 
  employeeProfile, 
  updateEmployeeProfile, 
  instantSaveEmployeeProfile 
}: EmployeeAvailabilityScheduleSectionProps) {
  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-6">Availability & Schedule</h3>
      
      {/* Status */}
      <div className="mb-6">
        <div>
          <label htmlFor="employee-status" className="block text-sm font-medium text-slate-300 mb-2">Current Status</label>
          <select 
            id="employee-status"
            value={employeeProfile?.availability?.status || 'Available'} 
            onChange={(e) => updateEmployeeProfile({ 
              availability: { ...employeeProfile?.availability, status: e.target.value } 
            })} 
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white"
          >
            <option value="Available">✅ Available</option>
            <option value="Limited Openings">⚠️ Limited Openings</option>
            <option value="Fully Booked">📋 Fully Booked</option>
            <option value="Unavailable">🚫 Unavailable</option>
          </select>
        </div>
      </div>

      {/* Working Hours */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-3">Working Hours</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="start-time" className="block text-xs text-slate-400 mb-1">Start Time</label>
            <input 
              id="start-time"
              type="time" 
              value={employeeProfile?.availability?.workingHours?.start || '09:00'} 
              onChange={(e) => updateEmployeeProfile({ 
                availability: { 
                  ...employeeProfile?.availability, 
                  workingHours: { ...employeeProfile?.availability?.workingHours, start: e.target.value } 
                } 
              })} 
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white" 
            />
          </div>
          <div>
            <label htmlFor="end-time" className="block text-xs text-slate-400 mb-1">End Time</label>
            <input 
              id="end-time"
              type="time" 
              value={employeeProfile?.availability?.workingHours?.end || '17:00'} 
              onChange={(e) => updateEmployeeProfile({ 
                availability: { 
                  ...employeeProfile?.availability, 
                  workingHours: { ...employeeProfile?.availability?.workingHours, end: e.target.value } 
                } 
              })} 
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white" 
            />
          </div>
        </div>
      </div>

      {/* Days Available */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-3">Days Available</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { key: 'monday' as const, label: 'Monday', short: 'Mon' },
            { key: 'tuesday' as const, label: 'Tuesday', short: 'Tue' },
            { key: 'wednesday' as const, label: 'Wednesday', short: 'Wed' },
            { key: 'thursday' as const, label: 'Thursday', short: 'Thu' },
            { key: 'friday' as const, label: 'Friday', short: 'Fri' },
            { key: 'saturday' as const, label: 'Saturday', short: 'Sat' },
            { key: 'sunday' as const, label: 'Sunday', short: 'Sun' },
          ].map(day => (
            <button
              key={day.key}
              type="button"
              onClick={() => updateEmployeeProfile({ 
                availability: { 
                  ...employeeProfile?.availability, 
                  daysAvailable: { 
                    ...employeeProfile?.availability?.daysAvailable, 
                    [day.key]: !employeeProfile?.availability?.daysAvailable?.[day.key] 
                  } 
                } 
              })}
              className={`p-3 rounded-lg border-2 transition-all ${
                employeeProfile?.availability?.daysAvailable?.[day.key]
                  ? 'bg-orange-600/20 border-orange-600 text-orange-400'
                  : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500'
              }`}
            >
              <div className="font-semibold">{day.short}</div>
              <div className="text-xs hidden md:block">{day.label.slice(0, 3)}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Overtime */}
      <div className="mb-4">
        <label className="flex items-center justify-between p-3 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-750">
          <div>
            <span className="text-slate-200 font-medium">Available for Overtime</span>
            <p className="text-xs text-slate-400 mt-1">Willing to work extra hours when needed</p>
          </div>
          <input 
            type="checkbox" 
            checked={employeeProfile?.availability?.acceptOvertime || false} 
            onChange={async (e) => {
              const updates = { 
                availability: { ...employeeProfile?.availability, acceptOvertime: e.target.checked } 
              };
              updateEmployeeProfile(updates);
              await instantSaveEmployeeProfile(updates);
            }} 
            className="w-5 h-5"
          />
        </label>
      </div>

      {/* Schedule Notes */}
      <div>
        <label htmlFor="employee-schedule-notes" className="block text-sm font-medium text-slate-300 mb-2">Additional Notes</label>
        <textarea 
          id="employee-schedule-notes"
          value={employeeProfile?.availability?.notes || ''} 
          onChange={(e) => updateEmployeeProfile({ 
            availability: { ...employeeProfile?.availability, notes: e.target.value } 
          })} 
          className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white h-20 resize-none" 
          placeholder="Any special scheduling requirements or preferences..."
        />
      </div>
    </div>
  );
}

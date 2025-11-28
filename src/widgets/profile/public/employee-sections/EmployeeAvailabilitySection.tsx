/**
 * Employee Availability Section Component
 * @module widgets/profile/public/employee-sections/EmployeeAvailabilitySection
 * 
 * Displays employee's working hours, availability schedule, and shift preferences.
 * Shows when employee is available for scheduling and work assignments.
 * 
 * ✅ DIAMOND STANDARD: Widget section component
 */

"use client";

interface AvailabilityProps {
  availability?: {
    daysAvailable?: {
      monday?: boolean;
      tuesday?: boolean;
      wednesday?: boolean;
      thursday?: boolean;
      friday?: boolean;
      saturday?: boolean;
      sunday?: boolean;
    };
    workingHours?: {
      start: string;
      end: string;
    };
    hoursPerWeek?: string;
    notes?: string;
  };
  preferences?: {
    preferredHours?: string;
    overtimeAvailable?: boolean;
  };
}

export default function EmployeeAvailabilitySection({
  availability,
  preferences
}: AvailabilityProps) {
  return (
    <div className="bg-slate-700/50 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Availability & Schedule
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Days Available */}
        {availability?.daysAvailable && Object.keys(availability.daysAvailable).length > 0 && (
          <div>
            <p className="text-xs text-slate-500 mb-2">Days Available</p>
            <div className="space-y-2">
              {/* Weekdays (Mon-Fri) */}
              <div className="flex gap-1">
                {[
                  { key: 'monday' as const, label: 'Mon' },
                  { key: 'tuesday' as const, label: 'Tue' },
                  { key: 'wednesday' as const, label: 'Wed' },
                  { key: 'thursday' as const, label: 'Thu' },
                  { key: 'friday' as const, label: 'Fri' },
                ].map(day => (
                  availability.daysAvailable?.[day.key] && (
                    <span key={day.key} className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm font-medium whitespace-nowrap">
                      {day.label}
                    </span>
                  )
                ))}
              </div>
              {/* Weekend (Sat-Sun) */}
              <div className="flex gap-2">
                {[
                  { key: 'saturday' as const, label: 'Sat' },
                  { key: 'sunday' as const, label: 'Sun' },
                ].map(day => (
                  availability.daysAvailable?.[day.key] && (
                    <span key={day.key} className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm font-medium whitespace-nowrap">
                      {day.label}
                    </span>
                  )
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Working Hours */}
        {availability?.workingHours && (availability.workingHours.start || availability.workingHours.end) && (
          <div>
            <p className="text-xs text-slate-500 mb-2">Working Hours</p>
            <p className="text-white text-lg font-medium">
              {availability.workingHours.start} - {availability.workingHours.end}
            </p>
            {preferences?.preferredHours && (
              <p className="text-slate-400 text-sm mt-1">Prefers: {preferences.preferredHours}</p>
            )}
          </div>
        )}

        {/* Additional Info */}
        <div>
          <p className="text-xs text-slate-500 mb-2">Additional Info</p>
          <div className="flex flex-wrap gap-2">
            {availability?.daysAvailable?.saturday && availability?.daysAvailable?.sunday && (
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Weekends Available
              </span>
            )}
            {preferences?.overtimeAvailable && (
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Overtime Available
              </span>
            )}
          </div>
        </div>

        {/* Additional Notes */}
        {availability?.notes && (
          <div>
            <p className="text-xs text-slate-500 mb-1">Notes</p>
            <div className="text-slate-300 text-sm">{availability.notes}</div>
          </div>
        )}
      </div>
    </div>
  );
}
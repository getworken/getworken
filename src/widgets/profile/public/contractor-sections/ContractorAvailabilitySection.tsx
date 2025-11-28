/**
 * Contractor Availability Section Component
 * @module widgets/profile/public/contractor-sections/ContractorAvailabilitySection
 * 
 * Displays contractor's working hours, availability calendar, and scheduling preferences.
 * Shows when contractor is available for work and preferred work days.
 * 
 * ✅ DIAMOND STANDARD: Widget section component
 */

"use client";

interface AvailabilityProps {
  workingHours: { start: string; end: string };
  daysAvailable?: {
    monday?: boolean;
    tuesday?: boolean;
    wednesday?: boolean;
    thursday?: boolean;
    friday?: boolean;
    saturday?: boolean;
    sunday?: boolean;
  };
  maxDistance?: string;
  acceptEmergencyJobs?: boolean;
  notes?: string;
  availabilityNotes?: string;
}

export default function ContractorAvailabilitySection({
  workingHours,
  daysAvailable,
  maxDistance,
  acceptEmergencyJobs,
  notes,
  availabilityNotes
}: AvailabilityProps) {
  // Check if both weekend days are available
  const weekendsAvailable = daysAvailable?.saturday && daysAvailable?.sunday;
  
  // Use availabilityNotes if provided, otherwise fall back to notes
  const displayNotes = availabilityNotes || notes;

  return (
    <div className="bg-slate-700/50 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Availability & Schedule
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Days Available */}
        {daysAvailable && Object.keys(daysAvailable).length > 0 && (
          <div>
            <p className="text-xs text-slate-500 mb-2">Days Available</p>
            <div className="space-y-2">
              {/* Monday - Friday */}
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'monday' as const, label: 'Mon' },
                  { key: 'tuesday' as const, label: 'Tue' },
                  { key: 'wednesday' as const, label: 'Wed' },
                  { key: 'thursday' as const, label: 'Thu' },
                  { key: 'friday' as const, label: 'Fri' },
                ].map((day) => (
                  <span
                    key={day.key}
                    className={`px-2 py-1 rounded text-xs ${
                      daysAvailable[day.key] 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-slate-600 text-slate-500'
                    }`}
                  >
                    {day.label}
                  </span>
                ))}
              </div>
              {/* Saturday - Sunday */}
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'saturday' as const, label: 'Sat' },
                  { key: 'sunday' as const, label: 'Sun' },
                ].map((day) => (
                  <span
                    key={day.key}
                    className={`px-2 py-1 rounded text-xs ${
                      daysAvailable[day.key] 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-slate-600 text-slate-500'
                    }`}
                  >
                    {day.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Working Hours */}
        <div>
          <p className="text-xs text-slate-500 mb-2">Working Hours</p>
          <div className="text-white font-medium">
            {workingHours.start} - {workingHours.end}
          </div>
        </div>

        {/* Weekend & Emergency Availability */}
        <div className="space-y-3">
          {/* Weekends Available */}
          {weekendsAvailable && (
            <div>
              <p className="text-xs text-slate-500 mb-2">Weekends Available</p>
              <span className="px-2 py-1 rounded text-xs bg-emerald-500/20 text-emerald-400">
                Available
              </span>
            </div>
          )}

          {/* Emergency Jobs */}
          {typeof acceptEmergencyJobs !== 'undefined' && (
            <div>
              <p className="text-xs text-slate-500 mb-2">Emergency Jobs</p>
              <span className={`px-2 py-1 rounded text-xs ${
                acceptEmergencyJobs 
                  ? 'bg-emerald-500/20 text-emerald-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {acceptEmergencyJobs ? 'Available' : 'Not Available'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {maxDistance && (
          <div>
            <p className="text-xs text-slate-500 mb-1">Travel Distance</p>
            <div className="text-white font-medium">Up to {maxDistance} miles</div>
          </div>
        )}
        
        {displayNotes && (
          <div>
            <p className="text-xs text-slate-500 mb-1">Notes</p>
            <div className="text-slate-300 text-sm">{displayNotes}</div>
          </div>
        )}
      </div>
    </div>
  );
}
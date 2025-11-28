/**
 * EmployeeSchedule Component
 * @module features/profile/employee-sections/EmployeeSchedule
 *
 * ✅ DIAMOND STANDARD: Employee work schedule display
 */

'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { Button } from '@/shared/ui';
import type { EmployeeProfile } from '@/entities/profile/model/types';

interface EmployeeScheduleProps {
  /**
   * Employee profile data
   */
  profile: EmployeeProfile;
  /**
   * Whether the section is in editing mode
   */
  isEditing?: boolean;
  /**
   * Callback when edit is triggered
   */
  onEdit?: () => void;
}

/**
 * Employee schedule section component
 *
 * Displays employee's work schedule including days available, shift times, and availability status
 *
 * @example
 * ```tsx
 * <EmployeeSchedule
 *   profile={employeeProfile}
 *   isEditing={false}
 *   onEdit={handleEdit}
 * />
 * ```
 */
export function EmployeeSchedule({
  profile,
  isEditing = false,
  onEdit,
}: EmployeeScheduleProps) {
  const schedule = profile.availabilitySchedule;
  const daysOfWeek = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ] as const;

  const formatTime = (time: string | undefined) => {
    if (!time) return 'N/A';
    try {
      const parts = time.split(':');
      if (parts.length !== 2) return time;
      const [hours, minutes] = parts;
      const hour = parseInt(hours || '0', 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes || '00'} ${ampm}`;
    } catch {
      return time;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Work Schedule</CardTitle>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Employee availability and work hours
            </p>
          </div>
          {onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!schedule ? (
          <div className="py-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-500">
              No schedule configured yet
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {daysOfWeek.map((day) => {
              const daySchedule = schedule[day];
              const isAvailable = daySchedule?.available;

              return (
                <div
                  key={day}
                  className={`flex items-center justify-between rounded-lg border p-4 ${
                    isAvailable
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        isAvailable ? 'bg-green-100' : 'bg-gray-200'
                      }`}
                    >
                      {isAvailable ? (
                        <svg
                          className="h-5 w-5 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium capitalize text-gray-900">
                        {day}
                      </p>
                      {isAvailable && daySchedule && (
                        <p className="text-xs text-gray-600">
                          {formatTime(daySchedule.start)} -{' '}
                          {formatTime(daySchedule.end)}
                        </p>
                      )}
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      isAvailable ? 'text-green-700' : 'text-gray-500'
                    }`}
                  >
                    {isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

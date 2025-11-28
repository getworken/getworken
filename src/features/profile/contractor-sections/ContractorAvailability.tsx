/**
 * Contractor Availability Feature Component
 * @module features/profile/contractor-sections/ContractorAvailability
 *
 * Displays and manages contractor work schedule and availability:
 * - Weekly schedule (days/hours available)
 * - Blackout dates and vacation periods
 * - Response time preferences
 * - Service area coverage hours
 *
 * ✅ DIAMOND STANDARD: Feature-layer component with FSD compliance
 *
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#features-layer}
 */

'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { ContractorProfile } from '@/entities/profile/model/types';

/**
 * ContractorAvailability Component
 *
 * Displays contractor availability schedule including days and hours available.
 *
 * @component
 * @param {Object} props - Component props
 * @param {ContractorProfile} props.profile - The contractor profile data
 * @param {boolean} [props.isEditing] - Whether the component is in edit mode
 * @param {() => void} [props.onEdit] - Callback function when edit is triggered
 */
interface ContractorAvailabilityProps {
  profile: ContractorProfile;
  isEditing?: boolean;
  onEdit?: () => void;
}

export function ContractorAvailability({
  profile,
  isEditing,
  onEdit,
}: ContractorAvailabilityProps) {
  const daysAvailable = profile.schedule?.daysAvailable || [];
  const hoursAvailable = profile.schedule?.hoursAvailable || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Availability</CardTitle>
          {isEditing && onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <label className="mb-3 block text-sm font-medium text-gray-700">
              Days Available
            </label>
            {daysAvailable.length === 0 ? (
              <p className="text-gray-500">No days specified</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {daysAvailable.map((day: string, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-lg bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-800"
                  >
                    {day}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-gray-700">
              Hours Available
            </label>
            {hoursAvailable.length === 0 ? (
              <p className="text-gray-500">No hours specified</p>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {hoursAvailable.map((hours: any, index: number) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-3"
                  >
                    <p className="text-sm text-gray-900">{hours}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

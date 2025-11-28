/**
 * Contractor Equipment Feature Component
 * @module features/profile/contractor-sections/ContractorEquipment
 *
 * Displays and manages contractor equipment inventory:
 * - Equipment names and types
 * - Equipment condition status
 * - Maintenance records
 * - Availability for jobs
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
 * ContractorEquipment Component
 *
 * Displays contractor equipment with details including name, type, and condition.
 *
 * @component
 * @param {Object} props - Component props
 * @param {ContractorProfile} props.profile - The contractor profile data
 * @param {boolean} [props.isEditing] - Whether the component is in edit mode
 * @param {() => void} [props.onEdit] - Callback function when edit is triggered
 */
interface ContractorEquipmentProps {
  profile: ContractorProfile;
  isEditing?: boolean;
  onEdit?: () => void;
}

export function ContractorEquipment({
  profile,
  isEditing,
  onEdit,
}: ContractorEquipmentProps) {
  const equipment = profile.equipment || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Equipment</CardTitle>
          {isEditing && onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {equipment.length === 0 ? (
          <p className="py-8 text-center text-gray-500">
            No equipment added yet
          </p>
        ) : (
          <div className="space-y-4">
            {equipment.map((item, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 p-4"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <p className="text-gray-900">{item.name}</p>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Type
                    </label>
                    <p className="text-gray-900">{item.type}</p>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Condition
                    </label>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        item.condition === 'Excellent'
                          ? 'bg-green-100 text-green-800'
                          : item.condition === 'Good'
                            ? 'bg-blue-100 text-blue-800'
                            : item.condition === 'Fair'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.condition}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

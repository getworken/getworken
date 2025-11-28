/**
 * Contractor Specialties Feature Component
 * @module features/profile/contractor-sections/ContractorSpecialties
 *
 * Displays contractor trade specializations and expertise areas:
 * - Primary trade specialties
 * - Sub-specialty skills
 * - Service categories offered
 * - Visual tag-based display
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
 * ContractorSpecialties Component
 *
 * Displays contractor specialties as colored tags.
 *
 * @component
 * @param {Object} props - Component props
 * @param {ContractorProfile} props.profile - The contractor profile data
 * @param {boolean} [props.isEditing] - Whether the component is in edit mode
 * @param {() => void} [props.onEdit] - Callback function when edit is triggered
 */
interface ContractorSpecialtiesProps {
  profile: ContractorProfile;
  isEditing?: boolean;
  onEdit?: () => void;
}

const tagColors = [
  'bg-blue-100 text-blue-800',
  'bg-green-100 text-green-800',
  'bg-purple-100 text-purple-800',
  'bg-yellow-100 text-yellow-800',
  'bg-pink-100 text-pink-800',
  'bg-indigo-100 text-indigo-800',
  'bg-red-100 text-red-800',
  'bg-teal-100 text-teal-800',
];

export function ContractorSpecialties({
  profile,
  isEditing,
  onEdit,
}: ContractorSpecialtiesProps) {
  const specialties = profile.specialties || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Specialties</CardTitle>
          {isEditing && onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {specialties.length === 0 ? (
          <p className="py-8 text-center text-gray-500">
            No specialties added yet
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty, index) => (
              <span
                key={index}
                className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium ${
                  tagColors[index % tagColors.length]
                }`}
              >
                {specialty}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

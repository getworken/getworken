/**
 * Contractor Training Feature Component
 * @module features/profile/contractor-sections/ContractorTraining
 *
 * Displays and manages contractor training and continuing education:
 * - Training program names and providers
 * - Completion dates
 * - Training hours accumulated
 * - Continuing education requirements
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
 * ContractorTraining Component
 *
 * Displays contractor training programs with details including program name, provider, completion date, and hours.
 *
 * @component
 * @param {Object} props - Component props
 * @param {ContractorProfile} props.profile - The contractor profile data
 * @param {boolean} [props.isEditing] - Whether the component is in edit mode
 * @param {() => void} [props.onEdit] - Callback function when edit is triggered
 */
interface ContractorTrainingProps {
  profile: ContractorProfile;
  isEditing?: boolean;
  onEdit?: () => void;
}

export function ContractorTraining({
  profile,
  isEditing,
  onEdit,
}: ContractorTrainingProps) {
  const training = profile.training || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Training</CardTitle>
          {isEditing && onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {training.length === 0 ? (
          <p className="py-8 text-center text-gray-500">
            No training programs added yet
          </p>
        ) : (
          <div className="space-y-4">
            {training.map((program, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 p-4"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Program
                    </label>
                    <p className="text-gray-900">{program.program}</p>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Provider
                    </label>
                    <p className="text-gray-900">{program.provider}</p>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Completion Date
                    </label>
                    <p className="text-gray-900">
                      {program.completionDate
                        ? new Date(program.completionDate).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Hours
                    </label>
                    <p className="text-gray-900">{program.hours} hours</p>
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

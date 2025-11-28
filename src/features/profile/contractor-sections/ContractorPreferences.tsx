/**
 * Contractor Preferences Feature Component
 * @module features/profile/contractor-sections/ContractorPreferences
 *
 * Displays contractor work preferences and requirements:
 * - Preferred service areas and travel radius
 * - Job type preferences (residential, commercial, industrial)
 * - Minimum job size requirements
 * - Payment preferences and terms
 *
 * ✅ DIAMOND STANDARD: Feature-layer component with FSD compliance
 *
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#features-layer}
 */

'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { ContractorProfile } from '@/entities/profile/model/types';
import { MapPin, Briefcase, Star } from 'lucide-react';

/**
 * Props for the ContractorPreferences component
 */
interface ContractorPreferencesProps {
  /** The contractor profile data */
  profile: ContractorProfile;
  /** Whether the component is in editing mode */
  isEditing?: boolean;
  /** Callback function when edit is triggered */
  onEdit?: () => void;
}

/**
 * ContractorPreferences Component
 *
 * Displays the contractor's work preferences including travel radius,
 * preferred job types, and preferred project categories.
 *
 * @component
 * @example
 * ```tsx
 * <ContractorPreferences
 *   profile={contractorProfile}
 *   isEditing={false}
 *   onEdit={() => console.log('Edit clicked')}
 * />
 * ```
 */
export function ContractorPreferences({
  profile,
  isEditing = false,
  onEdit,
}: ContractorPreferencesProps) {
  const preferences = profile.preferences;
  const travelRadius = preferences?.travelRadius;
  const jobTypes = preferences?.jobTypes || [];
  const preferredProjects = preferences?.preferredProjects || [];

  const hasPreferences =
    travelRadius || jobTypes.length > 0 || preferredProjects.length > 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Work Preferences</CardTitle>
          {isEditing && onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!hasPreferences ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-4">
              <Star className="h-8 w-8 text-gray-400" />
            </div>
            <p className="font-medium text-gray-500">No preferences set</p>
            <p className="mt-1 text-sm text-gray-400">
              Add your work preferences to help match with suitable projects
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {travelRadius && (
              <div className="rounded-lg border border-gray-200 p-5 transition-colors hover:border-blue-300">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-blue-100 p-2.5">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1 font-semibold text-gray-900">
                      Travel Radius
                    </h4>
                    <p className="text-gray-600">
                      Willing to travel up to{' '}
                      <span className="font-semibold text-blue-600">
                        {travelRadius} miles
                      </span>{' '}
                      for projects
                    </p>
                  </div>
                </div>
              </div>
            )}

            {jobTypes.length > 0 && (
              <div className="rounded-lg border border-gray-200 p-5">
                <div className="mb-4 flex items-start gap-3">
                  <div className="rounded-full bg-green-100 p-2.5">
                    <Briefcase className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1 font-semibold text-gray-900">
                      Preferred Job Types
                    </h4>
                    <p className="mb-3 text-sm text-gray-600">
                      Types of work arrangements preferred
                    </p>
                  </div>
                </div>
                <div className="ml-11 flex flex-wrap gap-2">
                  {jobTypes.map((type: any, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {preferredProjects.length > 0 && (
              <div className="rounded-lg border border-gray-200 p-5">
                <div className="mb-4 flex items-start gap-3">
                  <div className="rounded-full bg-purple-100 p-2.5">
                    <Star className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1 font-semibold text-gray-900">
                      Preferred Projects
                    </h4>
                    <p className="mb-3 text-sm text-gray-600">
                      Project categories of interest
                    </p>
                  </div>
                </div>
                <div className="ml-11 flex flex-wrap gap-2">
                  {preferredProjects.map((project: any, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full border border-purple-200 bg-purple-100 px-3 py-1.5 text-sm font-medium text-purple-700"
                    >
                      {project}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Contractor Experience Feature Component
 * @module features/profile/contractor-sections/ContractorExperience
 *
 * Displays contractor work history and experience metrics:
 * - Years of experience
 * - Total completed projects
 * - Job success rate
 * - Experience level indicators
 *
 * ✅ DIAMOND STANDARD: Feature-layer component with FSD compliance
 *
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#features-layer}
 */

'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { ContractorProfile } from '@/entities/profile/model/types';
import { Briefcase, Award, TrendingUp } from 'lucide-react';

/**
 * Props for the ContractorExperience component
 */
interface ContractorExperienceProps {
  /** The contractor profile data */
  profile: ContractorProfile;
  /** Whether the component is in editing mode */
  isEditing?: boolean;
  /** Callback function when edit is triggered */
  onEdit?: () => void;
}

/**
 * ContractorExperience Component
 *
 * Displays the contractor's years of experience and total number
 * of completed projects with visual statistics.
 *
 * @component
 * @example
 * ```tsx
 * <ContractorExperience
 *   profile={contractorProfile}
 *   isEditing={false}
 *   onEdit={() => console.log('Edit clicked')}
 * />
 * ```
 */
export function ContractorExperience({
  profile,
  isEditing = false,
  onEdit,
}: ContractorExperienceProps) {
  const yearsOfExperience = profile.yearsOfExperience || 0;
  const projectsCount = profile.pastProjectsCount || 0;
  const hasExperience = yearsOfExperience > 0 || projectsCount > 0;

  const getExperienceLevel = (years: number): string => {
    if (years < 2) return 'Entry Level';
    if (years < 5) return 'Intermediate';
    if (years < 10) return 'Experienced';
    return 'Expert';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Experience</CardTitle>
          {isEditing && onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!hasExperience ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-4">
              <Briefcase className="h-8 w-8 text-gray-400" />
            </div>
            <p className="font-medium text-gray-500">No experience data</p>
            <p className="mt-1 text-sm text-gray-400">
              Add your years of experience and completed projects
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {yearsOfExperience > 0 && (
                <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-blue-50 to-white p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full bg-blue-100 p-3">
                      <Award className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Years of Experience
                      </p>
                      <p className="text-xs text-gray-500">
                        {getExperienceLevel(yearsOfExperience)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-blue-600">
                      {yearsOfExperience}
                    </span>
                    <span className="text-lg text-gray-500">
                      {yearsOfExperience === 1 ? 'year' : 'years'}
                    </span>
                  </div>
                </div>
              )}

              {projectsCount > 0 && (
                <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-green-50 to-white p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-3">
                      <Briefcase className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Completed Projects
                      </p>
                      <p className="text-xs text-gray-500">Total delivered</p>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-green-600">
                      {projectsCount}
                    </span>
                    <span className="text-lg text-gray-500">
                      {projectsCount === 1 ? 'project' : 'projects'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {yearsOfExperience > 0 && projectsCount > 0 && (
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-purple-100 p-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="mb-1 font-medium text-purple-900">
                      Track Record
                    </p>
                    <p className="text-sm text-purple-700">
                      Averaging approximately{' '}
                      <span className="font-semibold">
                        {(projectsCount / yearsOfExperience).toFixed(1)}{' '}
                        projects per year
                      </span>{' '}
                      demonstrating consistent delivery and reliability
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

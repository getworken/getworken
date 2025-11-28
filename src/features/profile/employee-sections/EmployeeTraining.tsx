/**
 * EmployeeTraining Component
 * @module features/profile/employee-sections/EmployeeTraining
 *
 * ✅ DIAMOND STANDARD: Employee training records display
 */

'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { Button } from '@/shared/ui';
import type { EmployeeProfile } from '@/entities/profile/model/types';

interface EmployeeTrainingProps {
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
 * Employee training section component
 *
 * Displays employee's training programs, completion dates, and hours
 *
 * @example
 * ```tsx
 * <EmployeeTraining
 *   profile={employeeProfile}
 *   isEditing={false}
 *   onEdit={handleEdit}
 * />
 * ```
 */
export function EmployeeTraining({
  profile,
  isEditing = false,
  onEdit,
}: EmployeeTrainingProps) {
  // Note: Training is stored as Training[] in ContractorProfile but not explicitly in EmployeeProfile
  // We'll check for it anyway in case the data structure extends it
  const training = (profile as any).training || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Training & Education</CardTitle>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Completed training programs and educational courses
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
        {training.length === 0 ? (
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-500">
              No training records added yet
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {training.map((item: any) => (
              <div
                key={item.id}
                className="flex items-start gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {item.institution}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                    {item.completionDate && (
                      <span>
                        Completed:{' '}
                        {new Date(item.completionDate).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          }
                        )}
                      </span>
                    )}
                    {item.hours && <span>{item.hours} hours</span>}
                  </div>
                  {item.certificateUrl && (
                    <a
                      href={item.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800"
                    >
                      View certificate
                      <svg
                        className="ml-1 h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Business Job Listings Feature Component
 * @module features/profile/business-sections/BusinessJobListings
 *
 * Displays and manages business job openings:
 * - Job titles and descriptions
 * - Requirements and qualifications
 * - Salary ranges and benefits
 * - Post/edit/remove job listings
 *
 * ✅ DIAMOND STANDARD: Feature-layer component with FSD compliance
 *
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#features-layer}
 */

'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { BusinessProfile } from '@/entities/profile/model/types';

/**
 * Business Job Listings Component
 *
 * Displays active job openings for a business.
 * Shows job title, description, requirements, and salary range.
 *
 * @component
 * @example
 * ```tsx
 * <BusinessJobListings
 *   profile={businessProfile}
 *   isEditing={false}
 *   onEdit={() => handleEdit()}
 * />
 * ```
 */

/**
 * Props for the BusinessJobListings component
 */
interface BusinessJobListingsProps {
  /** The business profile containing job listings data */
  profile: BusinessProfile;
  /** Whether the component is in editing mode */
  isEditing: boolean;
  /** Callback function triggered when edit is requested */
  onEdit?: () => void;
}

/**
 * Displays job listings with details and requirements
 *
 * @param {BusinessJobListingsProps} props - Component props
 * @returns {JSX.Element} Rendered job listings section
 */
export function BusinessJobListings({
  profile,
  isEditing,
  onEdit,
}: BusinessJobListingsProps) {
  const jobListings = profile.jobListings || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Job Openings</CardTitle>
          {isEditing && onEdit && (
            <Button onClick={onEdit} size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {jobListings.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <p>No job openings available at this time.</p>
            {isEditing && onEdit && (
              <Button onClick={onEdit} variant="link" className="mt-4">
                Post Job Opening
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {jobListings.map((job, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {job.title}
                  </h3>
                  {job.salaryRange && (
                    <span className="ml-4 whitespace-nowrap rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                      {job.salaryRange}
                    </span>
                  )}
                </div>

                {job.description && (
                  <div className="mb-4">
                    <p className="leading-relaxed text-gray-700">
                      {job.description}
                    </p>
                  </div>
                )}

                {job.requirements && job.requirements.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-gray-900">
                      Requirements:
                    </h4>
                    <ul className="list-inside list-disc space-y-1">
                      {job.requirements.map((requirement, reqIndex) => (
                        <li key={reqIndex} className="text-sm text-gray-700">
                          {requirement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4 border-t border-gray-200 pt-4">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    Apply Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

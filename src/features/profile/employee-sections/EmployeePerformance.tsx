/**
 * EmployeePerformance Component
 * @module features/profile/employee-sections/EmployeePerformance
 *
 * ✅ DIAMOND STANDARD: Employee performance reviews and metrics display
 */

'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { Button } from '@/shared/ui';
import type { EmployeeProfile } from '@/entities/profile/model/types';

interface EmployeePerformanceProps {
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
 * Employee performance section component
 *
 * Displays employee's performance reviews including reviewer, rating, comments, and date,
 * plus performance metrics
 *
 * @example
 * ```tsx
 * <EmployeePerformance
 *   profile={employeeProfile}
 *   isEditing={false}
 *   onEdit={handleEdit}
 * />
 * ```
 */
export function EmployeePerformance({
  profile,
  isEditing = false,
  onEdit,
}: EmployeePerformanceProps) {
  // Note: Reviews and metrics arrays are not explicitly in EmployeeProfile type
  // We'll check for them anyway in case the data structure extends it
  const reviews = (profile as any).reviews || [];
  const metrics = (profile as any).metrics || {};

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) /
        reviews.length
      : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Performance Reviews</CardTitle>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Employee performance reviews and metrics
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
        {/* Performance Metrics */}
        {Object.keys(metrics).length > 0 && (
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.averageRating !== undefined && (
              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-xs font-medium text-blue-600">
                  Average Rating
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {metrics.averageRating.toFixed(1)}
                </p>
              </div>
            )}
            {metrics.totalReviews !== undefined && (
              <div className="rounded-lg bg-green-50 p-4">
                <p className="text-xs font-medium text-green-600">
                  Total Reviews
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {metrics.totalReviews}
                </p>
              </div>
            )}
            {metrics.completedProjects !== undefined && (
              <div className="rounded-lg bg-purple-50 p-4">
                <p className="text-xs font-medium text-purple-600">
                  Completed Projects
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {metrics.completedProjects}
                </p>
              </div>
            )}
            {metrics.onTimeCompletion !== undefined && (
              <div className="rounded-lg bg-orange-50 p-4">
                <p className="text-xs font-medium text-orange-600">
                  On-Time Completion
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {metrics.onTimeCompletion}%
                </p>
              </div>
            )}
          </div>
        )}

        {/* Reviews */}
        {reviews.length === 0 ? (
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-500">
              No performance reviews yet
            </p>
          </div>
        ) : (
          <div>
            {/* Average Rating Summary */}
            {averageRating > 0 && (
              <div className="mb-6 flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Overall Rating
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    {renderStars(Math.round(averageRating))}
                    <span className="text-lg font-semibold text-gray-900">
                      {averageRating.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({reviews.length}{' '}
                      {reviews.length === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Individual Reviews */}
            <div className="space-y-4">
              {reviews.map((review: any) => (
                <div
                  key={review.id}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900">
                          {review.reviewer}
                        </p>
                        {renderStars(review.rating)}
                      </div>
                      {review.date && (
                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(review.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                  {review.comment && (
                    <p className="mt-3 text-sm text-gray-700">
                      {review.comment}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Customer Reviews Feature Component
 * @module features/profile/customer-sections/CustomerReviews
 *
 * Displays customer-written reviews and ratings:
 * - Star ratings (1-5)
 * - Review text and date
 * - Business reviewed
 * - Review response tracking
 *
 * ✅ DIAMOND STANDARD: Feature-layer component with FSD compliance
 *
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#features-layer}
 */

'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { CustomerProfile } from '@/entities/profile/model/types';

/**
 * CustomerReviews Component
 *
 * Displays customer reviews with rating, comment, date, and business information.
 * Shows star ratings and review details in a card layout.
 *
 * @component
 * @param {Object} props - Component props
 * @param {CustomerProfile} props.profile - Customer profile data
 * @param {boolean} [props.isEditing=false] - Whether the component is in editing mode
 * @param {() => void} [props.onEdit] - Callback function when edit button is clicked
 */
interface CustomerReviewsProps {
  profile: CustomerProfile;
  isEditing?: boolean;
  onEdit?: () => void;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({
  profile,
  isEditing = false,
  onEdit,
}) => {
  const reviews = profile.reviews || [];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star: number) => (
          <span
            key={star}
            className={`text-lg ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Reviews</CardTitle>
          {onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-sm text-gray-500">No reviews yet</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review: any, index: number) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-white p-4"
              >
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex-1">
                    {renderStars(review.rating)}
                    <p className="mt-1 text-sm text-gray-600">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {review.business}
                  </span>
                </div>
                {isEditing ? (
                  <textarea
                    defaultValue={review.comment}
                    className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                ) : (
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

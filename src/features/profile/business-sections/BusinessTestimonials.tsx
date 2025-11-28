/**
 * Business Testimonials Feature Component
 * @module features/profile/business-sections/BusinessTestimonials
 *
 * Displays customer testimonials and reviews:
 * - Customer name and rating
 * - Review text and date
 * - Star rating visualization
 * - Add/edit/remove testimonial functionality
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
 * Business Testimonials Component
 *
 * Displays customer testimonials and reviews for a business.
 * Shows customer name, rating, comment, and date.
 *
 * @component
 * @example
 * ```tsx
 * <BusinessTestimonials
 *   profile={businessProfile}
 *   isEditing={false}
 *   onEdit={() => handleEdit()}
 * />
 * ```
 */

/**
 * Props for the BusinessTestimonials component
 */
interface BusinessTestimonialsProps {
  /** The business profile containing testimonials data */
  profile: BusinessProfile;
  /** Whether the component is in editing mode */
  isEditing: boolean;
  /** Callback function triggered when edit is requested */
  onEdit?: () => void;
}

/**
 * Renders star rating display
 *
 * @param {number} rating - Rating value (1-5)
 * @returns {JSX.Element} Star rating display
 */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-5 w-5 ${
            star <= rating ? 'fill-current text-yellow-400' : 'text-gray-300'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

/**
 * Displays customer testimonials with ratings and comments
 *
 * @param {BusinessTestimonialsProps} props - Component props
 * @returns {JSX.Element} Rendered testimonials section
 */
export function BusinessTestimonials({
  profile,
  isEditing,
  onEdit,
}: BusinessTestimonialsProps) {
  const testimonials = profile.testimonials || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Testimonials</CardTitle>
          {isEditing && onEdit && (
            <Button onClick={onEdit} size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {testimonials.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <p>No testimonials yet.</p>
            {isEditing && onEdit && (
              <Button onClick={onEdit} variant="link" className="mt-4">
                Add Testimonials
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {testimonial.customerName}
                    </h3>
                    {testimonial.date && (
                      <p className="mt-1 text-sm text-gray-500">
                        {new Date(testimonial.date).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </p>
                    )}
                  </div>
                  {testimonial.rating && (
                    <StarRating rating={testimonial.rating} />
                  )}
                </div>
                {testimonial.comment && (
                  <p className="leading-relaxed text-gray-700">
                    "{testimonial.comment}"
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

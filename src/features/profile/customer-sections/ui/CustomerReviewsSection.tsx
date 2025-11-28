/**
 * CustomerReviewsSection Component
 * @module features/profile/customer-sections/ui/CustomerReviewsSection
 * 
 * ✅ DIAMOND STANDARD: Customer reviews and feedback given
 */

'use client';


export interface Review {
  id: string;
  jobTitle: string;
  provider: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CustomerReviewsSectionProps {
  reviews: Review[];
}

export function CustomerReviewsSection({ reviews }: CustomerReviewsSectionProps) {
  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">Reviews Given</h3>
      {reviews.length === 0 ? (
        <p className="text-slate-400 text-center py-8">No reviews yet</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-slate-800 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-white font-medium">{review.jobTitle}</h4>
                  <p className="text-slate-400 text-sm">Provider: {review.provider}</p>
                </div>
                <div className="text-right">
                  <div className="text-yellow-400">{renderStars(review.rating)}</div>
                  <p className="text-slate-500 text-xs">{review.date}</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm mt-2 italic">"{review.comment}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

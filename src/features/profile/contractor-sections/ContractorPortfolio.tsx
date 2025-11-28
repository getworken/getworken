/**
 * Contractor Portfolio Feature Component
 * @module features/profile/contractor-sections/ContractorPortfolio
 *
 * Displays contractor work portfolio and completed projects:
 * - Project images and galleries
 * - Project titles and descriptions
 * - Completion dates
 * - Before/after comparisons
 *
 * ✅ DIAMOND STANDARD: Feature-layer component with FSD compliance
 *
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#features-layer}
 */

'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { ContractorProfile } from '@/entities/profile/model/types';
import { Calendar, Image } from 'lucide-react';

/**
 * Props for the ContractorPortfolio component
 */
interface ContractorPortfolioProps {
  /** The contractor profile data */
  profile: ContractorProfile;
  /** Whether the component is in editing mode */
  isEditing?: boolean;
  /** Callback function when edit is triggered */
  onEdit?: () => void;
}

/**
 * ContractorPortfolio Component
 *
 * Displays the contractor's portfolio items including project images,
 * titles, descriptions, and completion dates.
 *
 * @component
 * @example
 * ```tsx
 * <ContractorPortfolio
 *   profile={contractorProfile}
 *   isEditing={false}
 *   onEdit={() => console.log('Edit clicked')}
 * />
 * ```
 */
export function ContractorPortfolio({
  profile,
  isEditing = false,
  onEdit,
}: ContractorPortfolioProps) {
  const portfolio = profile.portfolio || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Portfolio</CardTitle>
          {isEditing && onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {portfolio.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-4">
              <Image className="h-8 w-8 text-gray-400" />
            </div>
            <p className="font-medium text-gray-500">No portfolio items yet</p>
            <p className="mt-1 text-sm text-gray-400">
              Add your completed projects to showcase your work
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {portfolio.map((item: any, index: number) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-md"
              >
                {item.imageUrls && item.imageUrls.length > 0 && (
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={item.imageUrls[0]}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                    {item.imageUrls.length > 1 && (
                      <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                        +{item.imageUrls.length - 1} more
                      </div>
                    )}
                  </div>
                )}
                <div className="p-4">
                  <h4 className="mb-2 font-semibold text-gray-900">
                    {item.title}
                  </h4>
                  <p className="mb-3 line-clamp-3 text-sm text-gray-600">
                    {item.description}
                  </p>
                  {item.completionDate && (
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>
                        Completed{' '}
                        {new Date(item.completionDate).toLocaleDateString()}
                      </span>
                    </div>
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

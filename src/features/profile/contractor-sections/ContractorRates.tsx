/**
 * Contractor Rates Feature Component
 * @module features/profile/contractor-sections/ContractorRates
 *
 * Displays contractor pricing and rate information:
 * - Hourly rates by service type
 * - Daily/project rates
 * - Emergency service rates
 * - Pricing tier structure
 *
 * ✅ DIAMOND STANDARD: Feature-layer component with FSD compliance
 *
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#features-layer}
 */

'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { ContractorProfile } from '@/entities/profile/model/types';
import { DollarSign, Clock, Calendar } from 'lucide-react';

/**
 * Props for the ContractorRates component
 */
interface ContractorRatesProps {
  /** The contractor profile data */
  profile: ContractorProfile;
  /** Whether the component is in editing mode */
  isEditing?: boolean;
  /** Callback function when edit is triggered */
  onEdit?: () => void;
}

/**
 * ContractorRates Component
 *
 * Displays the contractor's hourly and daily rates in a grid layout
 * with clear pricing information.
 *
 * @component
 * @example
 * ```tsx
 * <ContractorRates
 *   profile={contractorProfile}
 *   isEditing={false}
 *   onEdit={() => console.log('Edit clicked')}
 * />
 * ```
 */
export function ContractorRates({
  profile,
  isEditing = false,
  onEdit,
}: ContractorRatesProps) {
  const hasRates = profile.hourlyRate || profile.dailyRate;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Rates</CardTitle>
          {isEditing && onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!hasRates ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-4">
              <DollarSign className="h-8 w-8 text-gray-400" />
            </div>
            <p className="font-medium text-gray-500">No rates set</p>
            <p className="mt-1 text-sm text-gray-400">
              Add your hourly or daily rates to help clients understand your
              pricing
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {profile.hourlyRate && (
              <div className="rounded-lg border border-gray-200 p-6 transition-all hover:border-blue-300 hover:shadow-md">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-blue-100 p-3">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Hourly Rate
                    </p>
                    <p className="text-xs text-gray-500">Per hour of work</p>
                  </div>
                </div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">
                    ${profile.hourlyRate}
                  </span>
                  <span className="ml-2 text-gray-500">/hour</span>
                </div>
              </div>
            )}

            {profile.dailyRate && (
              <div className="rounded-lg border border-gray-200 p-6 transition-all hover:border-green-300 hover:shadow-md">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-green-100 p-3">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Daily Rate
                    </p>
                    <p className="text-xs text-gray-500">Per day of work</p>
                  </div>
                </div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">
                    ${profile.dailyRate}
                  </span>
                  <span className="ml-2 text-gray-500">/day</span>
                </div>
              </div>
            )}
          </div>
        )}

        {hasRates && (
          <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-4">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Note:</span> Rates may vary based
              on project complexity, duration, and location. Contact for custom
              quotes.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

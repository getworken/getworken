/**
 * Contractor Insurance Feature Component
 * @module features/profile/contractor-sections/ContractorInsurance
 *
 * Displays and manages contractor insurance policies:
 * - Insurance type (General Liability, Workers Comp, etc.)
 * - Provider information
 * - Policy numbers and coverage amounts
 * - Expiration dates with renewal tracking
 *
 * ✅ DIAMOND STANDARD: Feature-layer component with FSD compliance
 *
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#features-layer}
 */

'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { ContractorProfile } from '@/entities/profile/model/types';

/**
 * ContractorInsurance Component
 *
 * Displays contractor insurance policies with details including type, provider, policy number, coverage amount, and expiration date.
 *
 * @component
 * @param {Object} props - Component props
 * @param {ContractorProfile} props.profile - The contractor profile data
 * @param {boolean} [props.isEditing] - Whether the component is in edit mode
 * @param {() => void} [props.onEdit] - Callback function when edit is triggered
 */
interface ContractorInsuranceProps {
  profile: ContractorProfile;
  isEditing?: boolean;
  onEdit?: () => void;
}

export function ContractorInsurance({
  profile,
  isEditing,
  onEdit,
}: ContractorInsuranceProps) {
  const insurance = profile.insurance || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Insurance</CardTitle>
          {isEditing && onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {insurance.length === 0 ? (
          <p className="py-8 text-center text-gray-500">
            No insurance policies added yet
          </p>
        ) : (
          <div className="space-y-4">
            {insurance.map((policy, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 p-4"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Type
                    </label>
                    <p className="text-gray-900">{policy.type}</p>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Provider
                    </label>
                    <p className="text-gray-900">{policy.provider}</p>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Policy Number
                    </label>
                    <p className="text-gray-900">{policy.policyNumber}</p>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Coverage
                    </label>
                    <p className="text-gray-900">{policy.coverage}</p>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Expiration Date
                    </label>
                    <p className="text-gray-900">{policy.expirationDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

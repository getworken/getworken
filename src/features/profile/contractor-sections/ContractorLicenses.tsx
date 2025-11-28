/**
 * Contractor Licenses Feature Component
 * @module features/profile/contractor-sections/ContractorLicenses
 *
 * Displays and manages contractor professional licenses:
 * - License name and number
 * - Issuing state/jurisdiction
 * - Expiration dates with status indicators
 * - Verification status and compliance tracking
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
 * ContractorLicenses Component
 *
 * Displays contractor licenses with details including name, number, state, expiration date, and verification status.
 *
 * @component
 * @param {Object} props - Component props
 * @param {ContractorProfile} props.profile - The contractor profile data
 * @param {boolean} [props.isEditing] - Whether the component is in edit mode
 * @param {() => void} [props.onEdit] - Callback function when edit is triggered
 */
interface ContractorLicensesProps {
  profile: ContractorProfile;
  isEditing?: boolean;
  onEdit?: () => void;
}

export function ContractorLicenses({
  profile,
  isEditing,
  onEdit,
}: ContractorLicensesProps) {
  const licenses = profile.licenses || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Licenses</CardTitle>
          {isEditing && onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {licenses.length === 0 ? (
          <p className="py-8 text-center text-gray-500">
            No licenses added yet
          </p>
        ) : (
          <div className="space-y-4">
            {licenses.map((license, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 p-4"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      License Name
                    </label>
                    <p className="text-gray-900">{license.name}</p>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      License Number
                    </label>
                    <p className="text-gray-900">{license.number}</p>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <p className="text-gray-900">{license.state}</p>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Expiration Date
                    </label>
                    <p className="text-gray-900">
                      {license.expirationDate
                        ? new Date(license.expirationDate).toLocaleDateString()
                        : 'Not specified'}
                    </p>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        license.verified
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {license.verified ? 'Verified' : 'Pending Verification'}
                    </span>
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

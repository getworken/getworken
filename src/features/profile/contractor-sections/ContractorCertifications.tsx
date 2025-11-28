/**
 * Contractor Certifications Feature Component
 * @module features/profile/contractor-sections/ContractorCertifications
 *
 * Displays and manages contractor professional certifications:
 * - Certification name and issuing organization
 * - Issue and expiration dates
 * - Verification status
 * - Continuing education tracking
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
 * ContractorCertifications Component
 *
 * Displays contractor certifications with details including name, issuer, issue date, expiration date, and verification status.
 *
 * @component
 * @param {Object} props - Component props
 * @param {ContractorProfile} props.profile - The contractor profile data
 * @param {boolean} [props.isEditing] - Whether the component is in edit mode
 * @param {() => void} [props.onEdit] - Callback function when edit is triggered
 */
interface ContractorCertificationsProps {
  profile: ContractorProfile;
  isEditing?: boolean;
  onEdit?: () => void;
}

export function ContractorCertifications({
  profile,
  isEditing,
  onEdit,
}: ContractorCertificationsProps) {
  const certifications = profile.certifications || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Certifications</CardTitle>
          {isEditing && onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {certifications.length === 0 ? (
          <p className="py-8 text-center text-gray-500">
            No certifications added yet
          </p>
        ) : (
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 p-4"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Certification Name
                    </label>
                    <p className="text-gray-900">{cert.name}</p>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Issuer
                    </label>
                    <p className="text-gray-900">
                      {cert.issuer || cert.issuingOrganization}
                    </p>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Issue Date
                    </label>
                    <p className="text-gray-900">
                      {cert.issueDate
                        ? new Date(cert.issueDate).toLocaleDateString()
                        : 'Not specified'}
                    </p>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Expiration Date
                    </label>
                    <p className="text-gray-900">
                      {cert.expirationDate
                        ? new Date(cert.expirationDate).toLocaleDateString()
                        : 'Not specified'}
                    </p>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        cert.verified
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {cert.verified ? 'Verified' : 'Pending Verification'}
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

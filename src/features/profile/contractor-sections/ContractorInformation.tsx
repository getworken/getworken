/**
 * Contractor Information Feature Component
 * @module features/profile/contractor-sections/ContractorInformation
 *
 * Displays and manages basic contractor information including:
 * - Personal/business name and contact details
 * - Physical address and service area
 * - Professional bio and description
 * - Years of experience
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
 * ContractorInformation Component
 *
 * Displays basic contractor information including name, contact details, address, and bio.
 *
 * @component
 * @param {Object} props - Component props
 * @param {ContractorProfile} props.profile - The contractor profile data
 * @param {boolean} [props.isEditing] - Whether the component is in edit mode
 * @param {() => void} [props.onEdit] - Callback function when edit is triggered
 */
interface ContractorInformationProps {
  profile: ContractorProfile;
  isEditing?: boolean;
  onEdit?: () => void;
}

export function ContractorInformation({
  profile,
  isEditing,
  onEdit,
}: ContractorInformationProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Basic Information</CardTitle>
          {isEditing && onEdit && (
            <Button onClick={onEdit} size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Name
            </label>
            <p className="text-gray-900">
              {profile.displayName ||
                `${profile.firstName} ${profile.lastName}` ||
                'Not provided'}
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="text-gray-900">{profile.email || 'Not provided'}</p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Phone
            </label>
            <p className="text-gray-900">{profile.phone || 'Not provided'}</p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Address
            </label>
            <p className="text-gray-900">
              {profile.location?.address || 'Not provided'}
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Bio
            </label>
            <p className="whitespace-pre-wrap text-gray-900">
              {profile.bio || 'No bio provided'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * BusinessInformation Component
 * @module features/profile/business-sections/BusinessInformation
 *
 * Displays business profile information using shadcn/ui Card components.
 * Includes business name, email, phone, address, website, and description.
 *
 * ✅ DIAMOND STANDARD v2.0 Compliant:
 * - Uses shadcn/ui Card composition pattern
 * - Barrel exports from @/shared/ui
 * - Proper TypeScript interfaces
 * - TSDoc documentation
 *
 * @see {@link https://ui.shadcn.com/docs/components/card} shadcn Card docs
 */

'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/shared/ui';
import { Button } from '@/shared/ui';
import type { BusinessProfile } from '@/entities/profile/model/types';

/**
 * Props for BusinessInformation component
 */
interface BusinessInformationProps {
  /** Business profile data to display */
  profile: BusinessProfile;
  /** Callback when edit button is clicked */
  onEdit?: () => void;
}

/**
 * Business information display section
 *
 * @example
 * ```tsx
 * <BusinessInformation profile={businessProfile} onEdit={handleEdit} />
 * ```
 */
export function BusinessInformation({
  profile,
  onEdit,
}: BusinessInformationProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>
              Core business details and contact information
            </CardDescription>
          </div>
          {onEdit && (
            <Button onClick={onEdit} size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Business Name
            </label>
            <p className="mt-1 text-gray-900">
              {profile.displayName || 'Not provided'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-gray-900">
              {profile.email || 'Not provided'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <p className="mt-1 text-gray-900">
              {profile.phone || 'Not provided'}
            </p>
          </div>

          {profile.website && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Website
              </label>
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-teal-600 hover:text-teal-700"
              >
                {profile.website}
              </a>
            </div>
          )}

          {profile.address && (
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <p className="mt-1 text-gray-900">
                {profile.address.street}, {profile.address.city},{' '}
                {profile.address.state} {profile.address.zipCode}
              </p>
            </div>
          )}

          {profile.description && (
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <p className="mt-1 text-gray-600">{profile.description}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

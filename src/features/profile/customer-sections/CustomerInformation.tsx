/**
 * Customer Information Feature Component
 * @module features/profile/customer-sections/CustomerInformation
 *
 * Displays and manages basic customer information:
 * - Full name and contact details
 * - Email and phone number
 * - Account creation date
 * - Customer status and tier
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
 * CustomerInformation Component
 *
 * Displays basic customer information including name, email, and phone number.
 * Supports editing mode for updating customer details.
 *
 * @component
 * @param {Object} props - Component props
 * @param {CustomerProfile} props.profile - Customer profile data
 * @param {boolean} [props.isEditing=false] - Whether the component is in editing mode
 * @param {() => void} [props.onEdit] - Callback function when edit button is clicked
 */
interface CustomerInformationProps {
  profile: CustomerProfile;
  isEditing?: boolean;
  onEdit?: () => void;
}

export const CustomerInformation: React.FC<CustomerInformationProps> = ({
  profile,
  isEditing = false,
  onEdit,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Customer Information</CardTitle>
          {onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                defaultValue={profile.name}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{profile.name}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                defaultValue={profile.email}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{profile.email}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Phone
            </label>
            {isEditing ? (
              <input
                type="tel"
                defaultValue={profile.phone}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{profile.phone}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

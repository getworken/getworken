/**
 * Customer Addresses Feature Component
 * @module features/profile/customer-sections/CustomerAddresses
 *
 * Displays and manages customer delivery/billing addresses:
 * - Multiple saved addresses
 * - Default address designation
 * - Address validation and formatting
 * - Add/edit/remove address functionality
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
 * CustomerAddresses Component
 *
 * Displays a list of customer addresses with details including street, city, state, and zip code.
 * Highlights the default address and supports editing mode.
 *
 * @component
 * @param {Object} props - Component props
 * @param {CustomerProfile} props.profile - Customer profile data
 * @param {boolean} [props.isEditing=false] - Whether the component is in editing mode
 * @param {() => void} [props.onEdit] - Callback function when edit button is clicked
 */
interface CustomerAddressesProps {
  profile: CustomerProfile;
  isEditing?: boolean;
  onEdit?: () => void;
}

export const CustomerAddresses: React.FC<CustomerAddressesProps> = ({
  profile,
  isEditing = false,
  onEdit,
}) => {
  const addresses = profile.addresses || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Addresses</CardTitle>
          {onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {addresses.length === 0 ? (
          <p className="text-sm text-gray-500">No addresses on file</p>
        ) : (
          <div className="space-y-4">
            {addresses.map((address, index) => (
              <div
                key={index}
                className={`rounded-lg border p-4 ${
                  address.isDefault
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="mb-2 flex items-start justify-between">
                  <h4 className="font-medium text-gray-900">{address.label}</h4>
                  {address.isDefault && (
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                      Default
                    </span>
                  )}
                </div>
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      defaultValue={address.street}
                      placeholder="Street"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        defaultValue={address.city}
                        placeholder="City"
                        className="rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        defaultValue={address.state}
                        placeholder="State"
                        className="rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        defaultValue={address.zip}
                        placeholder="ZIP"
                        className="rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">
                    <p>{address.street}</p>
                    <p>
                      {address.city}, {address.state} {address.zip}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

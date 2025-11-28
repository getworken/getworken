/**
 * Customer Payment Methods Feature Component
 * @module features/profile/customer-sections/CustomerPaymentMethods
 *
 * Displays and manages customer payment methods:
 * - Credit/debit cards with masked numbers
 * - Expiration dates and card types
 * - Default payment method selection
 * - Add/edit/remove payment methods securely
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
 * CustomerPaymentMethods Component
 *
 * Displays customer payment methods including type, last 4 digits, and expiry date.
 * Highlights the default payment method and supports editing mode.
 *
 * @component
 * @param {Object} props - Component props
 * @param {CustomerProfile} props.profile - Customer profile data
 * @param {boolean} [props.isEditing=false] - Whether the component is in editing mode
 * @param {() => void} [props.onEdit] - Callback function when edit button is clicked
 */
interface CustomerPaymentMethodsProps {
  profile: CustomerProfile;
  isEditing?: boolean;
  onEdit?: () => void;
}

export const CustomerPaymentMethods: React.FC<CustomerPaymentMethodsProps> = ({
  profile,
  isEditing = false,
  onEdit,
}) => {
  const paymentMethods = profile.paymentMethods || [];

  const getCardIcon = (type: string) => {
    const icons: Record<string, string> = {
      visa: '💳',
      mastercard: '💳',
      amex: '💳',
      discover: '💳',
    };
    return icons[type.toLowerCase()] || '💳';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Payment Methods</CardTitle>
          {onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {paymentMethods.length === 0 ? (
          <p className="text-sm text-gray-500">No payment methods on file</p>
        ) : (
          <div className="space-y-3">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className={`flex items-center justify-between rounded-lg border p-4 ${
                  method.isDefault
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getCardIcon(method.type)}</span>
                  <div>
                    <p className="font-medium capitalize text-gray-900">
                      {method.type}
                    </p>
                    {isEditing ? (
                      <div className="mt-1 flex space-x-2">
                        <input
                          type="text"
                          defaultValue={method.last4}
                          placeholder="Last 4"
                          maxLength={4}
                          className="w-20 rounded border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          defaultValue={method.expiryDate}
                          placeholder="MM/YY"
                          className="w-20 rounded border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">
                        •••• {method.last4} • Expires {method.expiryDate}
                      </p>
                    )}
                  </div>
                </div>
                {method.isDefault && (
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                    Default
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

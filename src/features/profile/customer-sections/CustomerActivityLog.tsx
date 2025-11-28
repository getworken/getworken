/**
 * Customer Activity Log Feature Component
 * @module features/profile/customer-sections/CustomerActivityLog
 *
 * Displays chronological customer activity history:
 * - Login/logout events
 * - Profile updates
 * - Order placements
 * - Interaction timestamps
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
 * CustomerActivityLog Component
 *
 * Displays customer activity log with action details, timestamps, and descriptions.
 * Shows activities in a chronological timeline format.
 *
 * @component
 * @param {Object} props - Component props
 * @param {CustomerProfile} props.profile - Customer profile data
 * @param {boolean} [props.isEditing=false] - Whether the component is in editing mode
 * @param {() => void} [props.onEdit] - Callback function when edit button is clicked
 */
interface CustomerActivityLogProps {
  profile: CustomerProfile;
  isEditing?: boolean;
  onEdit?: () => void;
}

export const CustomerActivityLog: React.FC<CustomerActivityLogProps> = ({
  profile,
  onEdit,
}) => {
  const activityLogs = profile.activityLog || [];

  const getActivityIcon = (action: string) => {
    const icons: Record<string, string> = {
      login: '🔐',
      logout: '🚪',
      'profile-update': '✏️',
      'order-placed': '🛒',
      'order-cancelled': '❌',
      'payment-made': '💳',
      'review-posted': '⭐',
      'document-uploaded': '📄',
    };
    return icons[action.toLowerCase()] || '📝';
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Activity Log</CardTitle>
          {onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activityLogs.length === 0 ? (
          <p className="text-sm text-gray-500">No activity recorded</p>
        ) : (
          <div className="space-y-3">
            {activityLogs.map((log: any, index: number) => {
              const { date, time } = formatTimestamp(log.timestamp);
              return (
                <div
                  key={index}
                  className="flex items-start space-x-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
                >
                  <span className="text-2xl">
                    {getActivityIcon(log.action)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium capitalize text-gray-900">
                        {log.action.replace('-', ' ')}
                      </p>
                      <span className="text-xs text-gray-500">{time}</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-600">{date}</p>
                    {log.details && (
                      <p className="mt-2 text-sm text-gray-700">
                        {log.details}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

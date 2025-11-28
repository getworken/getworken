/**
 * Customer Service Requests Feature Component
 * @module features/profile/customer-sections/CustomerServiceRequests
 *
 * Displays customer support tickets and service requests:
 * - Request titles and descriptions
 * - Priority levels (low, medium, high, urgent)
 * - Status tracking (open, in-progress, resolved)
 * - Request submission dates and resolution times
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
 * CustomerServiceRequests Component
 *
 * Displays customer service requests with title, date, status, and priority.
 * Shows requests in a card layout with color-coded priority and status indicators.
 *
 * @component
 * @param {Object} props - Component props
 * @param {CustomerProfile} props.profile - Customer profile data
 * @param {boolean} [props.isEditing=false] - Whether the component is in editing mode
 * @param {() => void} [props.onEdit] - Callback function when edit button is clicked
 */
interface CustomerServiceRequestsProps {
  profile: CustomerProfile;
  isEditing?: boolean;
  onEdit?: () => void;
}

export const CustomerServiceRequests: React.FC<
  CustomerServiceRequestsProps
> = ({ profile, onEdit }) => {
  const serviceRequests = profile.serviceRequests || [];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      open: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    };
    return colors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      high: 'text-red-600',
      medium: 'text-yellow-600',
      low: 'text-green-600',
    };
    return colors[priority.toLowerCase()] || 'text-gray-600';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Service Requests</CardTitle>
          {onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {serviceRequests.length === 0 ? (
          <p className="text-sm text-gray-500">No service requests found</p>
        ) : (
          <div className="space-y-3">
            {serviceRequests.map((request: any, index: number) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <div className="mb-2 flex items-start justify-between">
                  <h4 className="font-medium text-gray-900">{request.title}</h4>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">
                      {new Date(request.date).toLocaleDateString()}
                    </span>
                    <span
                      className={`font-medium ${getPriorityColor(
                        request.priority
                      )}`}
                    >
                      {request.priority} Priority
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
};

/**
 * Customer Loyalty Feature Component
 * @module features/profile/customer-sections/CustomerLoyalty
 *
 * Displays customer loyalty program information:
 * - Points balance and tier status
 * - Rewards earned and available
 * - Membership benefits
 * - Progress to next tier
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
 * CustomerLoyalty Component
 *
 * Displays customer loyalty program information including points, tier, rewards, and membership details.
 * Shows progress bars and membership status.
 *
 * @component
 * @param {Object} props - Component props
 * @param {CustomerProfile} props.profile - Customer profile data
 * @param {boolean} [props.isEditing=false] - Whether the component is in editing mode
 * @param {() => void} [props.onEdit] - Callback function when edit button is clicked
 */
interface CustomerLoyaltyProps {
  profile: CustomerProfile;
  isEditing?: boolean;
  onEdit?: () => void;
}

export const CustomerLoyalty: React.FC<CustomerLoyaltyProps> = ({
  profile,
  onEdit,
}) => {
  const loyalty = profile.loyalty || {};

  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      bronze: 'bg-amber-700 text-white',
      silver: 'bg-gray-400 text-white',
      gold: 'bg-yellow-500 text-white',
      platinum: 'bg-purple-600 text-white',
    };
    return colors[tier?.toLowerCase()] || 'bg-gray-500 text-white';
  };

  const calculateProgress = () => {
    const points = loyalty.points || 0;
    const nextTierPoints = 1000; // Example threshold
    return Math.min((points / nextTierPoints) * 100, 100);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Loyalty Program</CardTitle>
          {onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Points and Tier */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-2xl font-bold text-gray-900">
              {loyalty.points || 0}
            </h4>
            <p className="text-sm text-gray-600">Total Points</p>
          </div>
          {loyalty.tier && (
            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold uppercase ${getTierColor(
                loyalty.tier
              )}`}
            >
              {loyalty.tier}
            </span>
          )}
        </div>

        {/* Progress to Next Tier */}
        <div>
          <div className="mb-2 flex justify-between text-sm text-gray-600">
            <span>Progress to Next Tier</span>
            <span>{calculateProgress().toFixed(0)}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-blue-600 transition-all"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
        </div>

        {/* Membership Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="mb-1 text-xs text-gray-600">Member Since</p>
            <p className="text-sm font-medium text-gray-900">
              {loyalty.membershipStartDate
                ? new Date(loyalty.membershipStartDate).toLocaleDateString()
                : 'N/A'}
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="mb-1 text-xs text-gray-600">Lifetime Value</p>
            <p className="text-sm font-medium text-gray-900">
              ${loyalty.lifetimeValue?.toFixed(2) || '0.00'}
            </p>
          </div>
        </div>

        {/* Available Rewards */}
        {loyalty.rewards && loyalty.rewards.length > 0 && (
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-900">
              Available Rewards
            </h4>
            <div className="space-y-2">
              {loyalty.rewards.map((reward: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {reward.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {reward.description}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-green-600">
                    {reward.pointsCost} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

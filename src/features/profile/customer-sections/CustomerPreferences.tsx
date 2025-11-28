/**
 * Customer Preferences Feature Component
 * @module features/profile/customer-sections/CustomerPreferences
 *
 * Displays and manages customer preferences and settings:
 * - Communication preferences (email, SMS, phone)
 * - Notification settings and frequency
 * - Privacy and marketing opt-ins
 * - Language and timezone preferences
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
 * CustomerPreferences Component
 *
 * Displays customer preferences including communication preferences, notifications, and privacy settings.
 * Supports editing mode with toggle switches for boolean preferences.
 *
 * @component
 * @param {Object} props - Component props
 * @param {CustomerProfile} props.profile - Customer profile data
 * @param {boolean} [props.isEditing=false] - Whether the component is in editing mode
 * @param {() => void} [props.onEdit] - Callback function when edit button is clicked
 */
interface CustomerPreferencesProps {
  profile: CustomerProfile;
  isEditing?: boolean;
  onEdit?: () => void;
}

export const CustomerPreferences: React.FC<CustomerPreferencesProps> = ({
  profile,
  isEditing = false,
  onEdit,
}) => {
  const preferences = profile.preferences || {};

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Preferences</CardTitle>
          {onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Communication Preferences */}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            Communication Preferences
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Email Notifications</span>
              {isEditing ? (
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    defaultChecked={preferences.emailNotifications}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                </label>
              ) : (
                <span
                  className={`text-sm font-medium ${
                    preferences.emailNotifications
                      ? 'text-green-600'
                      : 'text-gray-400'
                  }`}
                >
                  {preferences.emailNotifications ? 'Enabled' : 'Disabled'}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">SMS Notifications</span>
              {isEditing ? (
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    defaultChecked={preferences.smsNotifications}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                </label>
              ) : (
                <span
                  className={`text-sm font-medium ${
                    preferences.smsNotifications
                      ? 'text-green-600'
                      : 'text-gray-400'
                  }`}
                >
                  {preferences.smsNotifications ? 'Enabled' : 'Disabled'}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">
                Marketing Communications
              </span>
              {isEditing ? (
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    defaultChecked={preferences.marketingCommunications}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                </label>
              ) : (
                <span
                  className={`text-sm font-medium ${
                    preferences.marketingCommunications
                      ? 'text-green-600'
                      : 'text-gray-400'
                  }`}
                >
                  {preferences.marketingCommunications ? 'Enabled' : 'Disabled'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            Privacy Settings
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Profile Visibility</span>
              {isEditing ? (
                <select
                  defaultValue={preferences.profileVisibility || 'private'}
                  className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="contacts">Contacts Only</option>
                </select>
              ) : (
                <span className="text-sm font-medium capitalize text-gray-900">
                  {preferences.profileVisibility || 'Private'}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Data Sharing</span>
              {isEditing ? (
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    defaultChecked={preferences.dataSharing}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                </label>
              ) : (
                <span
                  className={`text-sm font-medium ${
                    preferences.dataSharing ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  {preferences.dataSharing ? 'Enabled' : 'Disabled'}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

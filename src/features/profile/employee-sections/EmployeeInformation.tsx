/**
 * EmployeeInformation Component
 * @module features/profile/employee-sections/EmployeeInformation
 *
 * ✅ DIAMOND STANDARD: Employee basic information display
 */

'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { Button } from '@/shared/ui';
import type { EmployeeProfile } from '@/entities/profile/model/types';

interface EmployeeInformationProps {
  /**
   * Employee profile data
   */
  profile: EmployeeProfile;
  /**
   * Whether the section is in editing mode
   */
  isEditing?: boolean;
  /**
   * Callback when edit is triggered
   */
  onEdit?: () => void;
}

/**
 * Employee basic information section component
 *
 * Displays employee's basic details including name, contact info, position, and department
 *
 * @example
 * ```tsx
 * <EmployeeInformation
 *   profile={employeeProfile}
 *   isEditing={false}
 *   onEdit={handleEdit}
 * />
 * ```
 */
export function EmployeeInformation({
  profile,
  isEditing = false,
  onEdit,
}: EmployeeInformationProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Employee Information</CardTitle>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Basic employee details and contact information
            </p>
          </div>
          {onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {profile.firstName} {profile.lastName}
            </p>
          </div>

          {/* Employee ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee ID
            </label>
            <p className="mt-1 text-sm text-gray-900">{profile.employeeId}</p>
          </div>

          {/* Email */}
          {profile.contact?.email && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-1 text-sm text-gray-900">
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {profile.contact.email}
                </a>
              </p>
            </div>
          )}

          {/* Phone */}
          {profile.contact?.phone && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <p className="mt-1 text-sm text-gray-900">
                <a
                  href={`tel:${profile.contact.phone}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {profile.contact.phone}
                </a>
              </p>
            </div>
          )}

          {/* Position */}
          {profile.position && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <p className="mt-1 text-sm text-gray-900">{profile.position}</p>
            </div>
          )}

          {/* Department */}
          {profile.department && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <p className="mt-1 text-sm text-gray-900">{profile.department}</p>
            </div>
          )}

          {/* Title */}
          {profile.title && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <p className="mt-1 text-sm text-gray-900">{profile.title}</p>
            </div>
          )}

          {/* Hire Date */}
          {profile.hireDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Hire Date
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(profile.hireDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}

          {/* Bio */}
          {profile.bio && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <p className="mt-1 text-sm text-gray-900">{profile.bio}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

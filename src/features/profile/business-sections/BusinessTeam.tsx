/**
 * Business Team Feature Component
 * @module features/profile/business-sections/BusinessTeam
 *
 * Displays and manages business team members:
 * - Team member profiles (name, role, photo)
 * - Contact information
 * - Role descriptions and responsibilities
 * - Team member invitation and management
 *
 * ✅ DIAMOND STANDARD: Feature-layer component with FSD compliance
 *
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#features-layer}
 */

'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { BusinessProfile } from '@/entities/profile/model/types';

/**
 * Business Team Component
 *
 * Displays and manages team members of a business.
 * Shows member details including name, role, email, and avatar.
 *
 * @component
 * @example
 * ```tsx
 * <BusinessTeam
 *   profile={businessProfile}
 *   isEditing={false}
 *   onEdit={() => handleEdit()}
 * />
 * ```
 */

/**
 * Props for the BusinessTeam component
 */
interface BusinessTeamProps {
  /** The business profile containing team members data */
  profile: BusinessProfile;
  /** Whether the component is in editing mode */
  isEditing: boolean;
  /** Callback function triggered when edit is requested */
  onEdit?: () => void;
}

/**
 * Displays team members with their details and avatar placeholders
 *
 * @param {BusinessTeamProps} props - Component props
 * @returns {JSX.Element} Rendered team members section
 */
export function BusinessTeam({
  profile,
  isEditing,
  onEdit,
}: BusinessTeamProps) {
  const teamMembers = profile.teamMembers || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Team Members</CardTitle>
          {isEditing && onEdit && (
            <Button onClick={onEdit} size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {teamMembers.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <p>No team members listed yet.</p>
            {isEditing && onEdit && (
              <Button onClick={onEdit} variant="link" className="mt-4">
                Add Team Members
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-lg font-semibold text-white">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  {member.role && (
                    <p className="mt-1 text-sm text-gray-600">{member.role}</p>
                  )}
                  {member.email && (
                    <p className="mt-1 truncate text-sm text-gray-500">
                      {member.email}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

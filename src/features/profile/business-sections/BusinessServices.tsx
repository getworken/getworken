/**
 * Business Services Feature Component
 * @module features/profile/business-sections/BusinessServices
 *
 * Displays and manages services offered by the business:
 * - Service name and description
 * - Pricing information
 * - Service categories
 * - Add/edit/remove service functionality
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
 * Business Services Component
 *
 * Displays and manages the services offered by a business.
 * Shows service name, description, and pricing in a grid layout.
 *
 * @component
 * @example
 * ```tsx
 * <BusinessServices
 *   profile={businessProfile}
 *   isEditing={false}
 *   onEdit={() => handleEdit()}
 * />
 * ```
 */

/**
 * Props for the BusinessServices component
 */
interface BusinessServicesProps {
  /** The business profile containing services data */
  profile: BusinessProfile;
  /** Whether the component is in editing mode */
  isEditing: boolean;
  /** Callback function triggered when edit is requested */
  onEdit?: () => void;
}

/**
 * Displays business services in a grid layout with service cards
 *
 * @param {BusinessServicesProps} props - Component props
 * @returns {JSX.Element} Rendered business services section
 */
export function BusinessServices({
  profile,
  isEditing,
  onEdit,
}: BusinessServicesProps) {
  const services = profile.services || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Services</CardTitle>
          {isEditing && onEdit && (
            <Button onClick={onEdit} size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {services.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <p>No services listed yet.</p>
            {isEditing && onEdit && (
              <Button onClick={onEdit} variant="link" className="mt-4">
                Add Services
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {service.name}
                </h3>
                {service.description && (
                  <p className="mb-3 line-clamp-3 text-sm text-gray-600">
                    {service.description}
                  </p>
                )}
                {service.price && (
                  <p className="font-medium text-blue-600">${service.price}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

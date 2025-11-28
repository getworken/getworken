/**
 * Business Branding Feature Component
 * @module features/profile/business-sections/BusinessBranding
 *
 * Displays and manages business branding assets:
 * - Company logo and images
 * - Brand color scheme
 * - Tagline and mission statement
 * - Visual identity elements
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
 * Business Branding Component
 *
 * Displays and manages business branding elements.
 * Shows logo, color scheme, and tagline.
 *
 * @component
 * @example
 * ```tsx
 * <BusinessBranding
 *   profile={businessProfile}
 *   isEditing={false}
 *   onEdit={() => handleEdit()}
 * />
 * ```
 */

/**
 * Props for the BusinessBranding component
 */
interface BusinessBrandingProps {
  /** The business profile containing branding data */
  profile: BusinessProfile;
  /** Whether the component is in editing mode */
  isEditing: boolean;
  /** Callback function triggered when edit is requested */
  onEdit?: () => void;
}

/**
 * Renders a color swatch with label
 *
 * @param {object} props - Color swatch props
 * @param {string} props.label - Label for the color
 * @param {string} props.color - Hex color value
 * @returns {JSX.Element} Color swatch display
 */
function ColorSwatch({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center space-x-3">
      <div
        className="h-12 w-12 rounded-lg border-2 border-gray-200 shadow-sm"
        style={{ background: color }}
        title={color}
        aria-label={`Color swatch for ${label}`}
      />
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="font-mono text-xs text-gray-500">{color}</p>
      </div>
    </div>
  );
}

/**
 * Displays business branding including logo, colors, and tagline
 *
 * @param {BusinessBrandingProps} props - Component props
 * @returns {JSX.Element} Rendered branding section
 */
export function BusinessBranding({
  profile,
  isEditing,
  onEdit,
}: BusinessBrandingProps) {
  const { logo, tagline, branding } = profile;
  const primaryColor = branding?.primaryColor || '#14b8a6';
  const secondaryColor = branding?.secondaryColor || '#0d9488';

  const hasBranding = logo || branding || tagline;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Branding</CardTitle>
          {isEditing && onEdit && (
            <Button onClick={onEdit} size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!hasBranding ? (
          <div className="py-8 text-center text-muted-foreground">
            <p>No branding information set.</p>
            {isEditing && onEdit && (
              <Button onClick={onEdit} variant="link" className="mt-4">
                Add Branding
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {logo && (
              <div>
                <h4 className="mb-3 text-sm font-semibold text-gray-900">
                  Logo
                </h4>
                <div className="inline-block rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                  <img
                    src={logo}
                    alt="Business Logo"
                    className="max-h-24 max-w-full object-contain"
                  />
                </div>
              </div>
            )}

            {(primaryColor || secondaryColor) && (
              <div>
                <h4 className="mb-3 text-sm font-semibold text-gray-900">
                  Color Scheme
                </h4>
                <div className="flex flex-wrap gap-6">
                  {primaryColor && (
                    <ColorSwatch label="Primary Color" color={primaryColor} />
                  )}
                  {secondaryColor && (
                    <ColorSwatch
                      label="Secondary Color"
                      color={secondaryColor}
                    />
                  )}
                </div>
              </div>
            )}

            {tagline && (
              <div>
                <h4 className="mb-3 text-sm font-semibold text-gray-900">
                  Tagline
                </h4>
                <p className="text-lg italic text-gray-700">"{tagline}"</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

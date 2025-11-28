/**
 * Contractor References Feature Component
 * @module features/profile/contractor-sections/ContractorReferences
 *
 * Displays contractor professional references and testimonials:
 * - Reference name and company
 * - Contact information (phone, email)
 * - Relationship and project details
 * - Verification status
 *
 * ✅ DIAMOND STANDARD: Feature-layer component with FSD compliance
 *
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#features-layer}
 */

'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { ContractorProfile } from '@/entities/profile/model/types';
import { Building2, Mail, Phone, User } from 'lucide-react';

/**
 * Props for the ContractorReferences component
 */
interface ContractorReferencesProps {
  /** The contractor profile data */
  profile: ContractorProfile;
  /** Whether the component is in editing mode */
  isEditing?: boolean;
  /** Callback function when edit is triggered */
  onEdit?: () => void;
}

/**
 * ContractorReferences Component
 *
 * Displays the contractor's professional references with contact information
 * including name, company, phone, and email.
 *
 * @component
 * @example
 * ```tsx
 * <ContractorReferences
 *   profile={contractorProfile}
 *   isEditing={false}
 *   onEdit={() => console.log('Edit clicked')}
 * />
 * ```
 */
export function ContractorReferences({
  profile,
  isEditing = false,
  onEdit,
}: ContractorReferencesProps) {
  const references = profile.references || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>References</CardTitle>
          {isEditing && onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {references.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-4">
              <User className="h-8 w-8 text-gray-400" />
            </div>
            <p className="font-medium text-gray-500">No references added</p>
            <p className="mt-1 text-sm text-gray-400">
              Add professional references to build trust
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {references.map((reference: any, index: number) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-300"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 rounded-full bg-blue-100 p-2">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="mb-1 font-semibold text-gray-900">
                      {reference.name}
                    </h4>
                    {reference.company && (
                      <div className="mb-2 flex items-center text-sm text-gray-600">
                        <Building2 className="mr-1.5 h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{reference.company}</span>
                      </div>
                    )}
                    <div className="space-y-1">
                      {reference.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
                          <a
                            href={`tel:${reference.phone}`}
                            className="truncate hover:text-blue-600"
                          >
                            {reference.phone}
                          </a>
                        </div>
                      )}
                      {reference.email && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
                          <a
                            href={`mailto:${reference.email}`}
                            className="truncate hover:text-blue-600"
                          >
                            {reference.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

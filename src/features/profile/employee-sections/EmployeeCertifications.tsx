/**
 * EmployeeCertifications Component
 * @module features/profile/employee-sections/EmployeeCertifications
 *
 * ✅ DIAMOND STANDARD: Employee certifications display
 */

'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { Button } from '@/shared/ui';
import type {
  EmployeeProfile,
  Certification,
} from '@/entities/profile/model/types';

interface EmployeeCertificationsProps {
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
 * Employee certifications section component
 *
 * Displays employee's certifications including name, issuer, dates, and verification status
 *
 * @example
 * ```tsx
 * <EmployeeCertifications
 *   profile={employeeProfile}
 *   isEditing={false}
 *   onEdit={handleEdit}
 * />
 * ```
 */
export function EmployeeCertifications({
  profile,
  isEditing = false,
  onEdit,
}: EmployeeCertificationsProps) {
  const certifications = profile.certifications || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Certifications</CardTitle>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Professional certifications and credentials
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
        {certifications.length === 0 ? (
          <div className="py-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-500">
              No certifications added yet
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {certifications.map((cert: Certification) => (
              <div
                key={cert.id}
                className="flex items-start gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <svg
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">
                        {cert.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {cert.issuingOrganization}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                    {cert.issueDate && (
                      <span>
                        Issued:{' '}
                        {new Date(cert.issueDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    )}
                    {cert.expirationDate && (
                      <span>
                        Expires:{' '}
                        {new Date(cert.expirationDate).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'short',
                          }
                        )}
                      </span>
                    )}
                    {cert.credentialId && (
                      <span className="font-mono">ID: {cert.credentialId}</span>
                    )}
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800"
                    >
                      View credential
                      <svg
                        className="ml-1 h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
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

/**
 * EmployeeDocuments Component
 * @module features/profile/employee-sections/EmployeeDocuments
 *
 * ✅ DIAMOND STANDARD: Employee documents display
 */

'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { Button } from '@/shared/ui';
import type { EmployeeProfile } from '@/entities/profile/model/types';

interface EmployeeDocumentsProps {
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
 * Employee documents section component
 *
 * Displays employee's documents including name, type, URL, and upload date
 *
 * @example
 * ```tsx
 * <EmployeeDocuments
 *   profile={employeeProfile}
 *   isEditing={false}
 *   onEdit={handleEdit}
 * />
 * ```
 */
export function EmployeeDocuments({
  profile,
  isEditing = false,
  onEdit,
}: EmployeeDocumentsProps) {
  // Note: Documents array is not explicitly in EmployeeProfile type
  // We'll check for it anyway in case the data structure extends it
  const documents = (profile as any).documents || [];

  const getDocumentIcon = (type?: string) => {
    switch (type?.toLowerCase()) {
      case 'pdf':
        return (
          <svg
            className="h-6 w-6 text-red-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
          </svg>
        );
      case 'doc':
      case 'docx':
        return (
          <svg
            className="h-6 w-6 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
          </svg>
        );
      case 'image':
      case 'jpg':
      case 'png':
        return (
          <svg
            className="h-6 w-6 text-purple-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="h-6 w-6 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Documents</CardTitle>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Employee documents and files
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
        {documents.length === 0 ? (
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
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-500">
              No documents uploaded yet
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {documents.map((doc: any) => (
              <div
                key={doc.id}
                className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                    {getDocumentIcon(doc.type)}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-medium text-gray-900">
                    {doc.name}
                  </h4>
                  <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-xs text-gray-500">
                    {doc.type && <span className="uppercase">{doc.type}</span>}
                    {doc.uploadDate && (
                      <span>
                        •{' '}
                        {new Date(doc.uploadDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                  {doc.url && (
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800"
                    >
                      Download
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
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
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

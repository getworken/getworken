/**
 * Contractor Documents Feature Component
 * @module features/profile/contractor-sections/ContractorDocuments
 *
 * Displays and manages contractor document library:
 * - Uploaded certifications and licenses
 * - Insurance documents
 * - Contract templates
 * - Download functionality
 *
 * ✅ DIAMOND STANDARD: Feature-layer component with FSD compliance
 *
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#features-layer}
 */

'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { ContractorProfile } from '@/entities/profile/model/types';
import { FileText, Download, Calendar } from 'lucide-react';

/**
 * Props for the ContractorDocuments component
 */
interface ContractorDocumentsProps {
  /** The contractor profile data */
  profile: ContractorProfile;
  /** Whether the component is in editing mode */
  isEditing?: boolean;
  /** Callback function when edit is triggered */
  onEdit?: () => void;
}

/**
 * ContractorDocuments Component
 *
 * Displays the contractor's uploaded documents including certifications,
 * licenses, and other important files with download functionality.
 *
 * @component
 * @example
 * ```tsx
 * <ContractorDocuments
 *   profile={contractorProfile}
 *   isEditing={false}
 *   onEdit={() => console.log('Edit clicked')}
 * />
 * ```
 */
export function ContractorDocuments({
  profile,
  isEditing = false,
  onEdit,
}: ContractorDocumentsProps) {
  const documents = profile.documents || [];

  const getDocumentIcon = (_type: string) => {
    return <FileText className="h-5 w-5" />;
  };

  const getDocumentTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      certification: 'bg-green-100 text-green-700',
      license: 'bg-blue-100 text-blue-700',
      insurance: 'bg-purple-100 text-purple-700',
      other: 'bg-gray-100 text-gray-700',
    };
    return colors[type.toLowerCase()] || colors.other;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Documents</CardTitle>
          {isEditing && onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <p className="font-medium text-gray-500">No documents uploaded</p>
            <p className="mt-1 text-sm text-gray-400">
              Upload certifications, licenses, and insurance documents
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((document: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-all hover:border-gray-300 hover:shadow-sm"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div
                    className={`rounded-lg p-2 ${getDocumentTypeColor(document.type)}`}
                  >
                    {getDocumentIcon(document.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate font-medium text-gray-900">
                      {document.name}
                    </h4>
                    <div className="mt-1 flex items-center gap-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${getDocumentTypeColor(document.type)}`}
                      >
                        {document.type}
                      </span>
                      {document.uploadDate && (
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span>
                            {new Date(document.uploadDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {document.url && (
                  <a
                    href={document.url}
                    download
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

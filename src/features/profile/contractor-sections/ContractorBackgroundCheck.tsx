/**
 * Contractor Background Check Feature Component
 * @module features/profile/contractor-sections/ContractorBackgroundCheck
 *
 * Displays contractor background verification and compliance status:
 * - Criminal background check status
 * - Drug screening results
 * - Driving record verification
 * - Compliance verification dates
 *
 * ✅ DIAMOND STANDARD: Feature-layer component with FSD compliance
 *
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#features-layer}
 */

'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { ContractorProfile } from '@/entities/profile/model/types';
import { Shield, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

/**
 * Props for the ContractorBackgroundCheck component
 */
interface ContractorBackgroundCheckProps {
  /** The contractor profile data */
  profile: ContractorProfile;
  /** Whether the component is in editing mode */
  isEditing?: boolean;
  /** Callback function when edit is triggered */
  onEdit?: () => void;
}

/**
 * ContractorBackgroundCheck Component
 *
 * Displays the contractor's background check status, verification date,
 * and a verified badge if applicable.
 *
 * @component
 * @example
 * ```tsx
 * <ContractorBackgroundCheck
 *   profile={contractorProfile}
 *   isEditing={false}
 *   onEdit={() => console.log('Edit clicked')}
 * />
 * ```
 */
export function ContractorBackgroundCheck({
  profile,
  isEditing = false,
  onEdit,
}: ContractorBackgroundCheckProps) {
  const backgroundCheck = profile.backgroundCheck;
  const status = backgroundCheck?.status || 'not_started';
  const date = backgroundCheck?.date;
  const verified = backgroundCheck?.verified || false;

  const getStatusConfig = (status: string) => {
    const configs: Record<
      string,
      {
        icon: React.ReactNode;
        color: string;
        bgColor: string;
        borderColor: string;
        label: string;
        description: string;
      }
    > = {
      verified: {
        icon: <CheckCircle className="h-6 w-6" />,
        color: 'text-green-700',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        label: 'Verified',
        description: 'Background check completed and verified successfully',
      },
      pending: {
        icon: <Clock className="h-6 w-6" />,
        color: 'text-yellow-700',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        label: 'Pending',
        description: 'Background check in progress',
      },
      failed: {
        icon: <XCircle className="h-6 w-6" />,
        color: 'text-red-700',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        label: 'Not Passed',
        description: 'Background check did not meet requirements',
      },
      not_started: {
        icon: <AlertCircle className="h-6 w-6" />,
        color: 'text-gray-700',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200',
        label: 'Not Started',
        description: 'Background check has not been initiated',
      },
    };
    return configs[status] || configs.not_started;
  };

  const statusConfig = getStatusConfig(status);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Background Check</CardTitle>
          {isEditing && onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {status === 'not_started' ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-4">
              <Shield className="h-8 w-8 text-gray-400" />
            </div>
            <p className="font-medium text-gray-500">No background check</p>
            <p className="mt-1 text-sm text-gray-400">
              Complete a background check to build trust with clients
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {statusConfig && (
              <div
                className={`rounded-lg border p-6 ${statusConfig.borderColor} ${statusConfig.bgColor}`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`rounded-full bg-white p-3 ${statusConfig.color}`}
                  >
                    {statusConfig.icon}
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <h3
                        className={`text-lg font-semibold ${statusConfig.color}`}
                      >
                        {statusConfig.label}
                      </h3>
                      {verified && (
                        <span className="inline-flex items-center rounded-full border border-green-300 bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${statusConfig.color} mb-3`}>
                      {statusConfig.description}
                    </p>
                    {date && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>
                          Completed on{' '}
                          {new Date(date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {status === 'verified' && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <div>
                    <p className="mb-1 text-sm font-medium text-blue-900">
                      Trusted Professional
                    </p>
                    <p className="text-sm text-blue-700">
                      This contractor has completed a comprehensive background
                      check, providing additional assurance for your projects.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

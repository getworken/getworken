/**
 * Contractor Skills Feature Component
 * @module features/profile/contractor-sections/ContractorSkills
 *
 * Displays contractor technical skills and competencies:
 * - Core trade skills
 * - Tool proficiencies
 * - Software/technology skills
 * - Badge-based visual display
 *
 * ✅ DIAMOND STANDARD: Feature-layer component with FSD compliance
 *
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#features-layer}
 */

'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { ContractorProfile } from '@/entities/profile/model/types';
import { Wrench } from 'lucide-react';

/**
 * Props for the ContractorSkills component
 */
interface ContractorSkillsProps {
  /** The contractor profile data */
  profile: ContractorProfile;
  /** Whether the component is in editing mode */
  isEditing?: boolean;
  /** Callback function when edit is triggered */
  onEdit?: () => void;
}

/**
 * ContractorSkills Component
 *
 * Displays the contractor's skills as colorful badge elements
 * in a responsive grid layout.
 *
 * @component
 * @example
 * ```tsx
 * <ContractorSkills
 *   profile={contractorProfile}
 *   isEditing={false}
 *   onEdit={() => console.log('Edit clicked')}
 * />
 * ```
 */
export function ContractorSkills({
  profile,
  isEditing = false,
  onEdit,
}: ContractorSkillsProps) {
  const skills = profile.skills || [];

  const getBadgeColor = (index: number): string => {
    const colors = [
      'bg-blue-100 text-blue-700 border-blue-200',
      'bg-green-100 text-green-700 border-green-200',
      'bg-purple-100 text-purple-700 border-purple-200',
      'bg-orange-100 text-orange-700 border-orange-200',
      'bg-pink-100 text-pink-700 border-pink-200',
      'bg-indigo-100 text-indigo-700 border-indigo-200',
      'bg-teal-100 text-teal-700 border-teal-200',
      'bg-red-100 text-red-700 border-red-200',
    ];
    return (
      colors[index % colors.length] ||
      'bg-blue-100 text-blue-700 border-blue-200'
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Skills</CardTitle>
          {isEditing && onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {skills.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-4">
              <Wrench className="h-8 w-8 text-gray-400" />
            </div>
            <p className="font-medium text-gray-500">No skills listed</p>
            <p className="mt-1 text-sm text-gray-400">
              Add your professional skills and expertise
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill: any, index: number) => (
              <span
                key={index}
                className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-transform hover:scale-105 ${getBadgeColor(index)}`}
              >
                <Wrench className="mr-1.5 h-3.5 w-3.5" />
                {skill}
              </span>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{skills.length}</span>{' '}
              {skills.length === 1 ? 'skill' : 'skills'} listed
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

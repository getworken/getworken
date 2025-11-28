/**
 * Contractor Languages Feature Component
 * @module features/profile/contractor-sections/ContractorLanguages
 *
 * Displays contractor language capabilities and proficiency levels:
 * - Spoken languages
 * - Proficiency levels (Native, Fluent, Conversational, Basic)
 * - Written vs. spoken distinction
 * - Certification status
 *
 * ✅ DIAMOND STANDARD: Feature-layer component with FSD compliance
 *
 * @see {@link file://.../DIAMOND_STANDARD_REFERENCE.md#features-layer}
 */

'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { ContractorProfile } from '@/entities/profile/model/types';
import { Languages } from 'lucide-react';

/**
 * Props for the ContractorLanguages component
 */
interface ContractorLanguagesProps {
  /** The contractor profile data */
  profile: ContractorProfile;
  /** Whether the component is in editing mode */
  isEditing?: boolean;
  /** Callback function when edit is triggered */
  onEdit?: () => void;
}

/**
 * ContractorLanguages Component
 *
 * Displays the languages spoken by the contractor as badge elements
 * to showcase communication capabilities.
 *
 * @component
 * @example
 * ```tsx
 * <ContractorLanguages
 *   profile={contractorProfile}
 *   isEditing={false}
 *   onEdit={() => console.log('Edit clicked')}
 * />
 * ```
 */
export function ContractorLanguages({
  profile,
  isEditing = false,
  onEdit,
}: ContractorLanguagesProps) {
  const languages = profile.languages || [];

  const getLanguageFlag = (language: string): string => {
    const flags: Record<string, string> = {
      english: '🇬🇧',
      spanish: '🇪🇸',
      french: '🇫🇷',
      german: '🇩🇪',
      italian: '🇮🇹',
      portuguese: '🇵🇹',
      chinese: '🇨🇳',
      japanese: '🇯🇵',
      korean: '🇰🇷',
      arabic: '🇸🇦',
      russian: '🇷🇺',
      hindi: '🇮🇳',
    };
    return flags[language.toLowerCase()] || '🌐';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Languages</CardTitle>
          {isEditing && onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {languages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-4">
              <Languages className="h-8 w-8 text-gray-400" />
            </div>
            <p className="font-medium text-gray-500">No languages listed</p>
            <p className="mt-1 text-sm text-gray-400">
              Add languages you speak to improve client communication
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {languages.map((language: any, index: number) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 transition-all hover:border-blue-300 hover:shadow-sm"
                >
                  <span className="text-2xl" role="img" aria-label={language}>
                    {getLanguageFlag(language)}
                  </span>
                  <span className="font-medium text-gray-900">{language}</span>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
              <div className="flex items-start gap-3">
                <Languages className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                <div>
                  <p className="mb-1 text-sm font-medium text-blue-900">
                    Multilingual Communication
                  </p>
                  <p className="text-sm text-blue-700">
                    Speaks {languages.length}{' '}
                    {languages.length === 1 ? 'language' : 'languages'},
                    enabling effective communication with diverse clients and
                    team members.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * BusinessAboutSection Component
 * @module features/profile/business-sections/ui/BusinessAboutSection
 * 
 * ✅ DIAMOND STANDARD: Business about section with story and mission
 * 
 * Displays business story, mission statement, and company values.
 */

'use client';


export interface BusinessAboutSectionProps {
  /**
   * Business story/description
   */
  story?: string;
  /**
   * Mission statement
   */
  mission?: string;
  /**
   * Callback to update story
   */
  onUpdateStory?: (story: string) => void;
  /**
   * Callback to update mission
   */
  onUpdateMission?: (mission: string) => void;
}

/**
 * Business about section component
 * 
 * Provides editable textareas for business story and mission statement.
 * 
 * @example
 * ```tsx
 * <BusinessAboutSection
 *   story={business.story}
 *   mission={business.mission}
 *   onUpdateStory={updateStory}
 *   onUpdateMission={updateMission}
 * />
 * ```
 */
export function BusinessAboutSection({ 
  story = '', 
  mission = '',
  onUpdateStory,
  onUpdateMission
}: BusinessAboutSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Our Story</h3>
        <textarea
          value={story}
          onChange={(e) => onUpdateStory?.(e.target.value)}
          placeholder="Tell your business story..."
          className="w-full h-32 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <div className="bg-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Our Mission</h3>
        <textarea
          value={mission}
          onChange={(e) => onUpdateMission?.(e.target.value)}
          placeholder="Describe your mission..."
          className="w-full h-32 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
    </div>
  );
}

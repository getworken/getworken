/**
 * BusinessHeaderSection Component
 * @module features/profile/business-sections/ui/BusinessHeaderSection
 * 
 * ✅ DIAMOND STANDARD: Business profile header with avatar and status badges
 * 
 * Displays business avatar, name, verification status, and hiring status
 * with editing capabilities.
 */

'use client';

import type { BusinessProfile } from '@/entities/profile/model/types';

export interface BusinessHeaderSectionProps {
  /**
   * Business profile data
   */
  businessInfo: BusinessProfile;
  /**
   * Whether business is currently hiring
   */
  isHiring: boolean;
  /**
   * Callback when avatar edit is clicked
   */
  onEditAvatar?: () => void;
}

/**
 * Business profile header component
 * 
 * Renders the top section of a business profile with avatar,
 * company name, verification badges, and quick contact info.
 * 
 * @example
 * ```tsx
 * <BusinessHeaderSection
 *   businessInfo={business}
 *   isHiring={true}
 *   onEditAvatar={() => console.log('Edit avatar')}
 * />
 * ```
 */
export function BusinessHeaderSection({ 
  businessInfo, 
  isHiring,
  onEditAvatar 
}: BusinessHeaderSectionProps) {
  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <div className="flex items-start space-x-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-5xl font-bold shadow-lg">
            🏢
          </div>
          {onEditAvatar && (
            <button 
              onClick={onEditAvatar}
              className="absolute bottom-0 right-0 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-xs hover:bg-slate-600 transition-colors"
              aria-label="Edit business avatar"
            >
              ✏️
            </button>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-2xl font-bold text-white">{businessInfo.businessName || 'Unnamed Business'}</h3>
            {businessInfo.verified ? (
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">
                ✓ Verified Business
              </span>
            ) : (
              <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">
                ✗ Unverified
              </span>
            )}
            {isHiring ? (
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                ✅ Hiring
              </span>
            ) : (
              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">
                ⏸️ Not Hiring
              </span>
            )}
          </div>
          <p className="text-slate-400 mb-3">{businessInfo.industry || 'Industry not specified'}</p>
          <div className="flex items-center space-x-4 text-sm text-slate-300">
            {businessInfo.email && <span>📧 {businessInfo.email}</span>}
            {businessInfo.phone && <span>📱 {businessInfo.phone}</span>}
            {businessInfo.address && (
              <span>📍 {businessInfo.address.city}, {businessInfo.address.state}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

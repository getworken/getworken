/**
 * Business Hero Section Component
 * @module widgets/profile/public/business-sections/BusinessHeroSection
 * 
 * Displays prominent business header with branding and key information.
 * Part of public business profile widget composition.
 * 
 * ✅ DIAMOND STANDARD: Widget section component
 */

"use client";

interface BusinessHeroSectionProps {
  branding: any;
  businessInfo: any;
  businessStatsVisibility: any;
}

export default function BusinessHeroSection({ branding, businessInfo, businessStatsVisibility }: BusinessHeroSectionProps) {
  if (!branding?.showHero) return null;

  return (
    <div className="rounded-lg p-8 text-white relative overflow-hidden bg-gradient-to-br from-teal-500 to-cyan-600">
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-4xl">
            🏢
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-2">{businessInfo.name || 'Business Name'}</h3>
            <p className="text-lg opacity-90">{businessInfo.tagline || branding.heroHeadline}</p>
          </div>
        </div>
        {branding.heroSubheadline && (
          <p className="text-lg opacity-80 mb-4">{branding.heroSubheadline}</p>
        )}
        {businessStatsVisibility?.showEstablished && businessInfo.established && (
          <div className="flex items-center gap-2 opacity-90">
            <span>📅</span>
            <span>Established {businessInfo.established}</span>
          </div>
        )}
      </div>
    </div>
  );
}
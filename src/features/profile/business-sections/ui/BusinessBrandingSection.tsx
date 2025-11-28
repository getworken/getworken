/**
 * BusinessBrandingSection Component
 * @module features/profile/business-sections/ui/BusinessBrandingSection
 * 
 * ✅ DIAMOND STANDARD: Business branding customization section
 * 
 * Allows customization of brand colors, hero image, and branding toggles.
 */

'use client';


export interface BusinessBrandingData {
  primaryColor?: string;
  secondaryColor?: string;
  heroImage?: string;
  logoUrl?: string;
}

export interface BusinessBrandingSectionProps {
  /**
   * Branding data
   */
  branding: BusinessBrandingData;
  /**
   * Callback to update branding
   */
  setBranding: (branding: BusinessBrandingData) => void;
}

/**
 * Business branding customization component
 * 
 * Provides color pickers and image upload for brand customization.
 * 
 * @example
 * ```tsx
 * <BusinessBrandingSection
 *   branding={branding}
 *   setBranding={updateBranding}
 * />
 * ```
 */
export function BusinessBrandingSection({ branding, setBranding }: BusinessBrandingSectionProps) {
  const updateBranding = (field: keyof BusinessBrandingData, value: string) => {
    setBranding({
      ...branding,
      [field]: value
    });
  };

  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-6">Branding</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="primary-color" className="block text-sm font-medium text-slate-300 mb-2">
            Primary Color
          </label>
          <div className="flex gap-2">
            <input
              id="primary-color"
              type="color"
              value={branding.primaryColor || '#14b8a6'}
              onChange={(e) => updateBranding('primaryColor', e.target.value)}
              className="w-16 h-10 bg-slate-800 border border-slate-600 rounded cursor-pointer"
            />
            <input
              type="text"
              value={branding.primaryColor || '#14b8a6'}
              onChange={(e) => updateBranding('primaryColor', e.target.value)}
              className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="#14b8a6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="secondary-color" className="block text-sm font-medium text-slate-300 mb-2">
            Secondary Color
          </label>
          <div className="flex gap-2">
            <input
              id="secondary-color"
              type="color"
              value={branding.secondaryColor || '#06b6d4'}
              onChange={(e) => updateBranding('secondaryColor', e.target.value)}
              className="w-16 h-10 bg-slate-800 border border-slate-600 rounded cursor-pointer"
            />
            <input
              type="text"
              value={branding.secondaryColor || '#06b6d4'}
              onChange={(e) => updateBranding('secondaryColor', e.target.value)}
              className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="#06b6d4"
            />
          </div>
        </div>
        <div>
          <label htmlFor="hero-image" className="block text-sm font-medium text-slate-300 mb-2">
            Hero Image URL
          </label>
          <input
            id="hero-image"
            type="url"
            value={branding.heroImage || ''}
            onChange={(e) => updateBranding('heroImage', e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="https://example.com/hero.jpg"
          />
        </div>
        <div>
          <label htmlFor="logo-url" className="block text-sm font-medium text-slate-300 mb-2">
            Logo URL
          </label>
          <input
            id="logo-url"
            type="url"
            value={branding.logoUrl || ''}
            onChange={(e) => updateBranding('logoUrl', e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="https://example.com/logo.png"
          />
        </div>
      </div>
      {branding.primaryColor && branding.secondaryColor && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-slate-300 mb-3">Preview</h4>
          <div 
            className="h-20 rounded-lg flex items-center justify-center text-white font-bold"
            style={{
              background: `linear-gradient(to right, ${branding.primaryColor}, ${branding.secondaryColor})`
            }}
          >
            Brand Preview
          </div>
        </div>
      )}
    </div>
  );
}

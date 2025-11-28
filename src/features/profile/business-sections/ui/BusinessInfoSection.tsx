/**
 * BusinessInfoSection Component
 * @module features/profile/business-sections/ui/BusinessInfoSection
 * 
 * ✅ DIAMOND STANDARD: Business information form section
 * 
 * Editable form for business details including name, type, contact info, and address.
 */

'use client';

import type { BusinessProfile } from '@/entities/profile/model/types';

export interface BusinessInfoSectionProps {
  /**
   * Business profile data
   */
  businessInfo: BusinessProfile;
  /**
   * Callback to update business info
   */
  setBusinessInfo: (info: BusinessProfile) => void;
}

/**
 * Business information form component
 * 
 * Provides editable inputs for all business contact and location information.
 * 
 * @example
 * ```tsx
 * <BusinessInfoSection
 *   businessInfo={business}
 *   setBusinessInfo={updateBusiness}
 * />
 * ```
 */
export function BusinessInfoSection({ businessInfo, setBusinessInfo }: BusinessInfoSectionProps) {
  const updateField = (field: keyof BusinessProfile, value: any) => {
    setBusinessInfo({
      ...businessInfo,
      [field]: value
    });
  };

  const updateAddress = (field: string, value: string) => {
    setBusinessInfo({
      ...businessInfo,
      address: {
        ...(businessInfo.address || { street: '', city: '', state: '', zipCode: '', country: '' }),
        [field]: value
      }
    });
  };

  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-6">Business Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="business-name" className="block text-sm font-medium text-slate-300 mb-2">
            Business Name
          </label>
          <input
            id="business-name"
            type="text"
            value={businessInfo.businessName || ''}
            onChange={(e) => updateField('businessName', e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label htmlFor="business-industry" className="block text-sm font-medium text-slate-300 mb-2">
            Industry
          </label>
          <input
            id="business-industry"
            type="text"
            value={businessInfo.industry || ''}
            onChange={(e) => updateField('industry', e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label htmlFor="business-email" className="block text-sm font-medium text-slate-300 mb-2">
            Email Address
          </label>
          <input
            id="business-email"
            type="email"
            value={businessInfo.email || ''}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label htmlFor="business-phone" className="block text-sm font-medium text-slate-300 mb-2">
            Phone Number
          </label>
          <input
            id="business-phone"
            type="tel"
            value={businessInfo.phone || ''}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label htmlFor="business-website" className="block text-sm font-medium text-slate-300 mb-2">
            Website
          </label>
          <input
            id="business-website"
            type="url"
            value={businessInfo.website || ''}
            onChange={(e) => updateField('website', e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label htmlFor="business-license" className="block text-sm font-medium text-slate-300 mb-2">
            License Number
          </label>
          <input
            id="business-license"
            type="text"
            value={businessInfo.licenseNumber || ''}
            onChange={(e) => updateField('licenseNumber', e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="business-street" className="block text-sm font-medium text-slate-300 mb-2">
            Street Address
          </label>
          <input
            id="business-street"
            type="text"
            value={businessInfo.address?.street || ''}
            onChange={(e) => updateAddress('street', e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label htmlFor="business-city" className="block text-sm font-medium text-slate-300 mb-2">
            City
          </label>
          <input
            id="business-city"
            type="text"
            value={businessInfo.address?.city || ''}
            onChange={(e) => updateAddress('city', e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label htmlFor="business-state" className="block text-sm font-medium text-slate-300 mb-2">
            State
          </label>
          <input
            id="business-state"
            type="text"
            value={businessInfo.address?.state || ''}
            onChange={(e) => updateAddress('state', e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label htmlFor="business-zip" className="block text-sm font-medium text-slate-300 mb-2">
            Zip Code
          </label>
          <input
            id="business-zip"
            type="text"
            value={businessInfo.address?.zipCode || ''}
            onChange={(e) => updateAddress('zipCode', e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label htmlFor="business-country" className="block text-sm font-medium text-slate-300 mb-2">
            Country
          </label>
          <input
            id="business-country"
            type="text"
            value={businessInfo.address?.country || ''}
            onChange={(e) => updateAddress('country', e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>
    </div>
  );
}

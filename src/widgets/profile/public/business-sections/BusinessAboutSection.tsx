/**
 * Business About Section Component
 * @module widgets/profile/public/business-sections/BusinessAboutSection
 * 
 * Displays business description, mission, values, and branding information.
 * Part of public business profile widget composition.
 * 
 * ✅ DIAMOND STANDARD: Widget section component
 */

"use client";

interface BusinessAboutSectionProps {
  branding: any;
  businessInfo: any;
}

export default function BusinessAboutSection({ businessInfo }: BusinessAboutSectionProps) {
  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-4">About {businessInfo.businessName}</h3>
      
      {businessInfo.businessDescription && (
        <div className="mb-6">
          <p className="text-slate-300 leading-relaxed">
            {businessInfo.businessDescription}
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {businessInfo.businessAddress && (
          <div>
            <h4 className="text-lg font-medium text-white mb-2">📍 Location</h4>
            <p className="text-slate-300">{businessInfo.businessAddress}</p>
          </div>
        )}
        
        {businessInfo.businessPhone && (
          <div>
            <h4 className="text-lg font-medium text-white mb-2">📞 Phone</h4>
            <p className="text-slate-300">{businessInfo.businessPhone}</p>
          </div>
        )}
        
        {businessInfo.businessEmail && (
          <div>
            <h4 className="text-lg font-medium text-white mb-2">📧 Email</h4>
            <p className="text-slate-300">{businessInfo.businessEmail}</p>
          </div>
        )}
        
        {businessInfo.businessWebsite && (
          <div>
            <h4 className="text-lg font-medium text-white mb-2">🌐 Website</h4>
            <a 
              href={businessInfo.businessWebsite} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              {businessInfo.businessWebsite}
            </a>
          </div>
        )}
      </div>

      {businessInfo.workingHours && (
        <div className="mt-6">
          <h4 className="text-lg font-medium text-white mb-3">🕒 Working Hours</h4>
          <div className="space-y-1">
            {Object.entries(businessInfo.workingHours).map(([day, hours]) => (
              <div key={day} className="flex justify-between text-slate-300">
                <span className="capitalize">{day}:</span>
                <span>{hours as string}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
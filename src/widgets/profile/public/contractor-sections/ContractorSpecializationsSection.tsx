/**
 * Contractor Specializations Section Component
 * @module widgets/profile/public/contractor-sections/ContractorSpecializationsSection
 * 
 * Displays contractor's specializations, licenses, and certifications.
 * Shows professional qualifications and areas of expertise.
 * 
 * ✅ DIAMOND STANDARD: Widget section component
 */

"use client";

interface Certification {
  name: string;
  number?: string;
  expirationDate?: string;
  status?: 'Active' | 'Expiring Soon' | 'Expired';
}

interface SpecializationsCertificationsProps {
  specialties: string[];
  licenses: string[];
  certifications: (string | Certification)[];
}

export default function ContractorSpecializationsSection({
  specialties,
  licenses,
  certifications
}: SpecializationsCertificationsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Specializations */}
      <div className="bg-slate-700/50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Specializations
        </h4>
        {specialties.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty: string, index: number) => (
              <span key={index} className="px-3 py-1 bg-slate-600 text-slate-200 rounded-full text-sm">
                {specialty}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-center py-2">No information provided yet</p>
        )}
      </div>

      {/* Licenses & Certifications */}
      <div className="bg-slate-700/50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          Licenses & Certifications
        </h4>
        {(licenses.length > 0 || certifications.length > 0) ? (
          <div className="space-y-3">
            {/* Licenses */}
            {licenses.length > 0 && (
              <div>
                <p className="text-xs text-slate-500 mb-2">Licenses</p>
                <div className="space-y-2">
                  {licenses.map((license: string, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-600 rounded">
                      <span className="text-white font-medium">{license}</span>
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Certifications */}
            {certifications.length > 0 && (
              <div>
                <p className="text-xs text-slate-500 mb-2">Certifications</p>
                <div className="space-y-2">
                  {certifications.map((cert: string | Certification, index: number) => (
                    <div key={index} className="p-2 bg-slate-600 rounded">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{typeof cert === 'string' ? cert : cert.name}</span>
                        {typeof cert !== 'string' && cert.status && (
                          <span className={`text-xs px-2 py-1 rounded ${
                            cert.status === 'Active' ? 'bg-green-500/20 text-green-400' : 
                            cert.status === 'Expiring Soon' ? 'bg-yellow-500/20 text-yellow-400' : 
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {cert.status}
                          </span>
                        )}
                      </div>
                      {typeof cert !== 'string' && (cert.number || cert.expirationDate) && (
                        <div className="text-xs text-slate-400 mt-1">
                          {cert.number && `#${cert.number}`}
                          {cert.number && cert.expirationDate && ' • '}
                          {cert.expirationDate && `Expires: ${new Date(cert.expirationDate).toLocaleDateString()}`}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-slate-400 text-center py-2">No information provided yet</p>
        )}
      </div>
    </div>
  );
}
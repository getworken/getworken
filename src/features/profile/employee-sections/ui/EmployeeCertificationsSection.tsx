/**
 * EmployeeCertificationsSection Component
 * @module features/profile/employee-sections/ui/EmployeeCertificationsSection
 * 
 * ✅ DIAMOND STANDARD: Employee certifications management
 */

'use client';


export interface EmployeeCertification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiration?: string;
}

export interface EmployeeCertificationsSectionProps {
  certifications: EmployeeCertification[];
  onAddCertification?: () => void;
  onRemoveCertification?: (id: string) => void;
}

export function EmployeeCertificationsSection({ certifications, onAddCertification, onRemoveCertification }: EmployeeCertificationsSectionProps) {
  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Certifications</h3>
        <button
          onClick={onAddCertification}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          + Add Certification
        </button>
      </div>
      {certifications.length === 0 ? (
        <p className="text-slate-400 text-center py-8">No certifications added yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <div key={cert.id} className="bg-slate-800 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-white font-semibold">{cert.name}</h4>
                <button
                  onClick={() => onRemoveCertification?.(cert.id)}
                  className="text-red-400 hover:text-red-300"
                  aria-label="Remove certification"
                >
                  ✕
                </button>
              </div>
              <p className="text-slate-400 text-sm">{cert.issuer}</p>
              <p className="text-slate-500 text-xs mt-1">
                Issued: {cert.date}
                {cert.expiration && ` • Expires: ${cert.expiration}`}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Contractor Training & Equipment Section Component
 * @module widgets/profile/public/contractor-sections/ContractorTrainingEquipmentSection
 * 
 * Displays contractor's training programs and equipment inventory.
 * Shows professional development and tools available for work.
 * 
 * ✅ DIAMOND STANDARD: Widget section component
 */

"use client";

interface TrainingEquipmentProps {
  training: string[];
  equipment: string[];
}

export default function ContractorTrainingEquipmentSection({
  training,
  equipment
}: TrainingEquipmentProps) {
  return (
    <div className="space-y-6">
      {/* Training */}
      <div className="bg-slate-700/50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Training & Education
        </h4>
        {training.length > 0 ? (
          <div className="space-y-2">
            {training.map((item: string, index: number) => (
              <div key={index} className="p-3 bg-slate-600 rounded-lg">
                <span className="text-white font-medium">{item}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-center py-2">No training or education listed</p>
        )}
      </div>

      {/* Equipment */}
      <div className="bg-slate-700/50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          Equipment & Tools
        </h4>
        {equipment.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {equipment.map((item: string, index: number) => (
              <div key={index} className="flex items-center p-3 bg-slate-600 rounded-lg">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-emerald-400 text-lg">🔧</span>
                </div>
                <span className="text-white font-medium">{item}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-center py-2">No equipment or tools listed</p>
        )}
      </div>
    </div>
  );
}
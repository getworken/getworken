/**
 * ContractorTrainingSection Component
 * @module features/profile/contractor-sections/ui/ContractorTrainingSection
 * 
 * ✅ DIAMOND STANDARD: Contractor training and education history
 */

'use client';


export interface Training {
  id: string;
  program: string;
  institution: string;
  year: string;
  description?: string;
}

export interface ContractorTrainingSectionProps {
  training: Training[];
  onAddTraining?: () => void;
  onRemoveTraining?: (id: string) => void;
}

export function ContractorTrainingSection({ training, onAddTraining, onRemoveTraining }: ContractorTrainingSectionProps) {
  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Training & Education</h3>
        <button
          onClick={onAddTraining}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
        >
          + Add Training
        </button>
      </div>
      {training.length === 0 ? (
        <p className="text-slate-400 text-center py-8">No training records added yet</p>
      ) : (
        <div className="space-y-3">
          {training.map((item) => (
            <div key={item.id} className="bg-slate-800 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-white font-semibold">{item.program}</h4>
                  <p className="text-slate-400 text-sm">{item.institution}</p>
                  <p className="text-slate-500 text-xs">{item.year}</p>
                  {item.description && (
                    <p className="text-slate-300 text-sm mt-2">{item.description}</p>
                  )}
                </div>
                <button
                  onClick={() => onRemoveTraining?.(item.id)}
                  className="text-red-400 hover:text-red-300"
                  aria-label="Remove training"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

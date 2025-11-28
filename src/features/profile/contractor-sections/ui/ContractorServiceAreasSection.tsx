/**
 * ContractorServiceAreasSection Component
 * @module features/profile/contractor-sections/ui/ContractorServiceAreasSection
 * 
 * ✅ DIAMOND STANDARD: Contractor service areas management
 */

'use client';


export interface ServiceArea {
  id: string;
  name: string;
  radius?: number;
}

export interface ContractorServiceAreasSectionProps {
  serviceAreas: ServiceArea[];
  onAddArea?: () => void;
  onRemoveArea?: (id: string) => void;
}

export function ContractorServiceAreasSection({ serviceAreas, onAddArea, onRemoveArea }: ContractorServiceAreasSectionProps) {
  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Service Areas</h3>
        <button
          onClick={onAddArea}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
        >
          + Add Area
        </button>
      </div>
      {serviceAreas.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🗺️</div>
          <p className="text-slate-400">No service areas defined yet</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {serviceAreas.map((area) => (
            <span
              key={area.id}
              className="px-3 py-2 bg-emerald-600 text-white rounded-full text-sm flex items-center gap-2"
            >
              📍 {area.name}
              {area.radius && <span className="text-xs">({area.radius} mi)</span>}
              <button
                onClick={() => onRemoveArea?.(area.id)}
                className="hover:text-red-300"
                aria-label="Remove area"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
